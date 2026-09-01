# Deploy thedivinewill.in — same droplet as kannanware, separate container

This site runs in its own Docker container (`divine-will-web`), fully independent from the
`s4hana-elevate-*` containers (own image, own restarts, own volumes — none shared). It shares
only two things with kannanware on the droplet: the public IP, and the front-door nginx
(inside kannanware's `web` container) that owns ports 80/443 and routes by domain name.

## 1) Copy the project to the droplet

From your Mac:

```bash
rsync -avz --exclude node_modules --exclude .next --exclude .vercel \
  "/Users/santhosh/Desktop/divine-will/" your-user@droplet-ip:/var/www/divine-will/
```

(Or `git init` this folder, push to a new GitHub repo, and `git clone` it on the droplet
instead — whichever you prefer. `rsync` is fastest for a first deploy.)

## 2) Create the shared Docker network (one-time, only if it doesn't exist yet)

```bash
docker network create shared_web
```

This is what lets kannanware's nginx reach this container by name without publishing any
port for it on the host.

## 3) Attach kannanware's `web` service to that network

Edit `/var/www/s4hana-elevate/kannanwarerevamp/docker-compose.yml` — add `networks:` to the
`web` service (keep `default` so it can still reach `wordpress` as before) and declare the
external network at the bottom of the file:

```yaml
services:
  web:
    # ...existing config unchanged...
    networks:
      - default
      - shared_web

networks:
  shared_web:
    external: true
```

Apply it (this briefly recreates only the `web` container — a few seconds of downtime for
kannanware, same as any normal redeploy):

```bash
cd /var/www/s4hana-elevate/kannanwarerevamp
docker compose up -d web
```

## 4) Build and start the divine-will container

```bash
cd /var/www/divine-will
docker compose up -d --build
```

It won't be reachable from the internet yet — no host port is published, no nginx route
exists for it yet. That's expected.

## 5) DNS

In your DNS provider for `thedivinewill.in`, add A records pointing at the same droplet IP
kannanware uses:

- `A` record: `thedivinewill.in` → droplet IP
- `A` record: `www.thedivinewill.in` → droplet IP

Wait for propagation (`dig thedivinewill.in`) before the next step.

## 6) Add an HTTP-only nginx route first (needed for the cert challenge)

Edit `/var/www/s4hana-elevate/kannanwarerevamp/nginx.conf` and append this new `server`
block (don't touch anything else in the file):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name thedivinewill.in www.thedivinewill.in;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://divine-will-web:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Reload:

```bash
cd /var/www/s4hana-elevate/kannanwarerevamp
docker compose exec web nginx -t
docker compose exec web nginx -s reload
```

Check `http://thedivinewill.in` loads the Next.js site over plain HTTP at this point.

## 7) Issue the SSL certificate

Reuses the same `certbot` sidecar and shared `letsencrypt`/`certbot-webroot` volumes
kannanware already has running — no new certbot setup needed.

```bash
cd /var/www/s4hana-elevate/kannanwarerevamp
docker compose exec certbot certbot certonly --webroot -w /var/www/certbot \
  -d thedivinewill.in -d www.thedivinewill.in
```

## 8) Switch the nginx block to HTTPS

Replace the `server` block you added in step 6 with these two blocks (redirect + real
HTTPS block):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name thedivinewill.in www.thedivinewill.in;

    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files $uri =404;
    }

    location / {
        return 301 https://thedivinewill.in$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name thedivinewill.in www.thedivinewill.in;

    ssl_certificate /etc/letsencrypt/live/thedivinewill.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/thedivinewill.in/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    location / {
        proxy_pass http://divine-will-web:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Reload again:

```bash
docker compose exec web nginx -t
docker compose exec web nginx -s reload
```

Renewal is automatic — the existing `certbot` sidecar's 12h renew loop and `web`'s 12h nginx
reload (see kannanware's `DEPLOY_DIGITALOCEAN_DROPLET.md` §11) already cover any cert in the
shared `letsencrypt` volume, this one included. Nothing extra to configure.

## 9) Verify

```bash
curl -I https://thedivinewill.in
curl -I https://kannanware.com   # confirm kannanware still fine
```

## Future updates (after source changes)

```bash
cd /var/www/divine-will
git pull            # or re-rsync
docker compose up -d --build
```

Kannanware's containers are never touched by this flow.
