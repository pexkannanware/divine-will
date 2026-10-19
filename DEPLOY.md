# Automatic DigitalOcean deployment

Push to `main` to build and deploy, or run **Deploy DigitalOcean** manually from
GitHub Actions with `main` selected. Other branches cannot deploy.

## Confirmed production settings

| Setting | Value |
| --- | --- |
| Repository | `pexkannanware/divine-will` |
| Website | https://thedivinewill.in |
| SSH destination | `root@178.128.102.157` |
| Architecture | `linux/amd64` |
| Application / Compose project | `/var/www/divine-will` / `divine-will` |
| Service / container | `web` / `divine-will-web` |
| Image | `divine-will:<40-character commit SHA>`; active alias `divine-will:latest` |
| Shared network | Existing external network `shared_web` |
| Shared nginx Compose directory | `/var/www/s4hana-elevate/kannanwarerevamp` |

The Next.js standalone image builds with Node 22.22.0. No application secrets or
custom environment variables are required by the source. The image sets
`NODE_ENV`, `PORT`, `HOSTNAME`, and the build argument `DEPLOY_REVISION`.
Google Fonts require network access during the build. `.env*` files are excluded
from the Docker build context; local environment files are never transferred.

## GitHub settings

Actions must be enabled. Under **Settings → Secrets and variables → Actions**, set:

- `DO_SSH_PRIVATE_KEY`: the dedicated `github-divine-will-deploy` OpenSSH private key.
  Its public key is authorized on this Droplet; keep the private key only in secrets.
- `DO_SSH_KNOWN_HOSTS`: the verified host entry for `178.128.102.157`.
  Obtain this from a trusted administrator or compare its fingerprint through the
  DigitalOcean console before changing it. Never bypass host verification.

Both secrets have been configured for this repository. No repository variables,
registry credentials, published application ports, or server-side git credentials
are needed. The dedicated key provides root SSH access for Docker deployment;
only trusted maintainers should be able to modify `main` or run workflows.

## Deployment behavior

`.github/workflows/deploy-digitalocean.yml` builds on GitHub's amd64 runner, tags the
image with the commit SHA, compresses a Docker archive, then transfers it with
strict SSH host verification. Deployments are queued using Actions concurrency
and serialized with `/var/www/divine-will/.deploy.lock` on the server.
Nginx operations also hold `/var/lock/shared-web-proxy.lock`; other deployment
scripts must use this lock to coordinate their own proxy reloads.

`scripts/deploy-droplet.sh` checks the existing container's working directory,
Compose project and service labels before modifying it. It saves the previous
Compose file and image ID under `releases/<SHA>-<run ID>-<attempt>/`, retaining the
image with `divine-will:rollback-<SHA>`. It installs `docker-compose.production.yml`
as the server's `docker-compose.yml`, updates only `web`, and waits for its HTTP
health check. It then tests and reloads nginx, verifies the HTTPS homepage, and
checks that `/api/health` returns the new SHA. Only then does it atomically write
`.deployed-revision`.

Failures after replacement restore the previous Compose file and image alias,
recreate only this app, and test/reload nginx again. Failed rollbacks are clearly
reported in Actions logs. The archive is deleted on script exit. Image backups
and release metadata remain for manual recovery; there is no global Docker
cleanup. Monitor disk space and remove only reviewed, obsolete Divine Will
releases/images when necessary. The current Droplet has limited free disk space.
The script requires Linux, Bash, flock, curl, Docker, and Docker Compose v2+.

A failed Actions run may be rerun; each attempt uses a separate release directory.
For manual recovery, inspect the failed release's `previous-image` and
`previous-compose.yml`, retag that saved image as `divine-will:latest`, restore the
saved Compose file, and run the same service-only Compose update under the deploy
lock. Test and reload the proxy afterward. The saved previous image's original
revision can be checked through `/api/health` if it has that endpoint (the initial
legacy image does not). Do not use `docker compose down` or global prune commands.

## Validation and verification

```bash
actionlint
bash -n scripts/deploy-droplet.sh
shellcheck scripts/deploy-droplet.sh
python3 -m unittest discover -s tests -v
docker compose -f docker-compose.production.yml config --quiet
npm run typecheck
docker build --platform linux/amd64 --build-arg DEPLOY_REVISION="$(git rev-parse HEAD)" -t divine-will:check .
curl --fail https://thedivinewill.in/api/health
```

The isolated deployment tests execute the actual Bash script with Docker/HTTP
command doubles: success, failed health, failed public HTTPS, mismatched public
revision, and refusal to replace a container owned by another site. They do not
restart the production site. Actions performs the real production Docker build,
Compose validation, container health check, and public revision check.

The existing shared nginx routes and TLS certificates are already provisioned;
this workflow never edits their configuration or restarts other hosted services.
Verify https://kannanware.com, https://keaasglobal.com and https://kapplabs.com after
deploying. `kannanware.in` failed DNS resolution during the initial baseline check.
