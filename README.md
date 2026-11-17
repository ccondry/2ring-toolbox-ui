# 2ring-toolbox-ui

dCloud 2Ring Dashboards & Wallboards Instant Demo toolbox UI. Built with Vue 2,
Buefy and rollup.

## Development

```sh
npm install
npm run dev
```

The dev server runs at http://localhost:8001/2ring/ and reloads on changes.
Paste a JWT into the login prompt to sign in.

## Production

```sh
npm run build
```

The built site is written to `dist/2ring`. `install.sh` and `update.sh` build
it and copy it to `/var/www/toolbox/2ring`.
