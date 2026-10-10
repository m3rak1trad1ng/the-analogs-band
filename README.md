# The Analogs — band site

One page, static. Copied from the Carper Diem site on 2026-10-09; same
structure, its own content and colors.

## Editing it

**Everything you'd want to change lives in [`app/content.ts`](app/content.ts).**
Band name, the hook line, lineup, shows, videos, photos, booking email.
Anything in [square brackets] there is a placeholder that has not been filled in.

Colors are the variables at the top of [`app/globals.css`](app/globals.css).

## Running it locally

```
npm install
npm run dev
```

It is also in `AI_SERVER/.claude/launch.json` as `the-analogs`, port 3022.

## Seeing it on the dashboard

`AI_SERVER/scripts/personal_site_preview.sh` builds a copy and publishes it to a
private link shown on the Sites page (admin and Sanctuary). It runs every half
hour and only rebuilds when something in this folder changed.

## Publishing

Not decided yet. `next.config.mjs` sets `output: "export"`, so the build is plain
files in `out/` that any static host can serve. `.github/workflows/deploy.yml`
is the GitHub Pages route carried over from Carper Diem; it does nothing until
this folder has a GitHub remote.

## Domain

`www.theanalogsband.com` (registered at GoDaddy). `public/CNAME` names it for
GitHub Pages and is harmless on any other host.
