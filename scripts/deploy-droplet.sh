#!/usr/bin/env bash
set -Eeuo pipefail
umask 077
release_dir=$(realpath "${1:?release directory required}")
revision=${2:?commit SHA required}
[[ "$revision" =~ ^[a-f0-9]{40}$ ]] || exit 1
[[ "$release_dir" =~ ^/var/www/divine-will/releases/$revision-[0-9]+-[0-9]+$ ]] || exit 1
app_dir=/var/www/divine-will
proxy_dir=/var/www/s4hana-elevate/kannanwarerevamp
compose=(docker compose --project-directory "$app_dir" -p divine-will -f "$app_dir/docker-compose.yml")
proxy=(docker compose --project-directory "$proxy_dir")
exec 9>"$app_dir/.deploy.lock"
flock -w 600 9
# Coordinate nginx operations with other deployments using this same lock.
exec 8>/var/lock/shared-web-proxy.lock
flock -w 600 8
trap 'rm -f "$release_dir/image.tar.gz"' EXIT

docker network inspect shared_web >/dev/null
"${proxy[@]}" exec -T web nginx -t
previous_image=$(docker inspect --format '{{.Image}}' divine-will-web 2>/dev/null || true)
if [[ -n "$previous_image" ]]; then
  owner=$(docker inspect --format '{{index .Config.Labels "com.docker.compose.project.working_dir"}}' divine-will-web)
  project=$(docker inspect --format '{{index .Config.Labels "com.docker.compose.project"}}' divine-will-web)
  service=$(docker inspect --format '{{index .Config.Labels "com.docker.compose.service"}}' divine-will-web)
  [[ "$owner" == "$app_dir" && "$project" == divine-will && "$service" == web ]] || {
    echo 'Refusing to replace a container owned by another deployment.' >&2; exit 1;
  }
  [[ -f "$app_dir/docker-compose.yml" ]] || { echo 'Previous Compose configuration missing.' >&2; exit 1; }
fi
# Backups remain in the release directory for manual recovery, including failed releases.
if [[ -f "$release_dir/previous-compose.yml" || -f "$release_dir/succeeded" ]]; then
  echo 'Release already attempted; use a fresh commit SHA.' >&2; exit 1
fi
if [[ -f "$app_dir/docker-compose.yml" ]]; then
  cp "$app_dir/docker-compose.yml" "$release_dir/previous-compose.yml"
fi
if [[ -n "$previous_image" ]]; then
  docker tag "$previous_image" "divine-will:rollback-$revision"
  printf '%s\n' "$previous_image" > "$release_dir/previous-image"
fi
docker load --input "$release_dir/image.tar.gz" >/dev/null
[[ $(docker image inspect "divine-will:$revision" --format '{{index .Config.Labels "org.opencontainers.image.revision"}}') == "$revision" ]] || exit 1
docker compose -f "$release_dir/docker-compose.production.yml" config --quiet
reload_proxy() {
  "${proxy[@]}" exec -T web nginx -t
  "${proxy[@]}" exec -T web nginx -s reload
}
rollback() {
  trap - ERR
  set +e
  echo 'Deployment failed; restoring previous deployment.' >&2
  "${compose[@]}" logs --tail 50 web
  local failed=0
  if [[ -n "$previous_image" ]]; then
    docker tag "$previous_image" divine-will:latest || failed=1
    cp "$release_dir/previous-compose.yml" "$app_dir/docker-compose.yml" || failed=1
    "${compose[@]}" up -d --no-build --pull never --wait --wait-timeout 120 web || failed=1
  else
    "${compose[@]}" rm -s -f web || failed=1
    if [[ -f "$release_dir/previous-compose.yml" ]]; then
      cp "$release_dir/previous-compose.yml" "$app_dir/docker-compose.yml" || failed=1
    else
      rm -f "$app_dir/docker-compose.yml"
    fi
  fi
  reload_proxy || failed=1
  curl --fail --silent --show-error --retry 3 --retry-delay 3 --retry-all-errors --connect-timeout 10 --max-time 30 https://thedivinewill.in/ >/dev/null || failed=1
  if (( failed )); then echo "ROLLBACK INCOMPLETE: inspect $release_dir" >&2;
  else echo 'Previous deployment restored.' >&2; fi
  exit 1
}
trap rollback ERR
cp "$release_dir/docker-compose.production.yml" "$app_dir/docker-compose.yml"
docker tag "divine-will:$revision" divine-will:latest
"${compose[@]}" up -d --no-build --pull never --wait --wait-timeout 120 web
reload_proxy
curl --fail --silent --show-error --retry 5 --retry-delay 3 --retry-all-errors \
  --connect-timeout 10 --max-time 30 https://thedivinewill.in/ >/dev/null
actual=$(curl --fail --silent --show-error --retry 5 --retry-delay 3 --retry-all-errors \
  --connect-timeout 10 --max-time 30 "https://thedivinewill.in/api/health?release=$revision")
[[ "$actual" == "{\"status\":\"ok\",\"revision\":\"$revision\"}" ]] || rollback
printf '%s\n' "$revision" > "$app_dir/.deployed-revision.tmp"
mv "$app_dir/.deployed-revision.tmp" "$app_dir/.deployed-revision"
touch "$release_dir/succeeded"
trap - ERR
echo "Deployed $revision to https://thedivinewill.in"
