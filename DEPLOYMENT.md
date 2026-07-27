# Deployment Guide

The site is now a plain static HTML/CSS/JS bundle at the repo root — no build step, no
Node runtime required to serve it. The lead-capture API in `server/` is unchanged and still
deploys separately.

## What's in the repo now

```
index.html, about.html, contact.html, 404.html, privacy-policy.html, terms-of-service.html
services/            31 service pages + index.html
portfolio/           6 project pages + index.html
assets/css/style.css assets/js/main.js   assets/img/logo.svg
robots.txt, sitemap.xml, favicon.ico
server/              Express lead-capture API (unchanged, deploy separately)
content/blog/        Real MDX blog content, not yet published as static pages (see STRATEGY.md)
supabase-schema.sql  Only relevant if the admin/portfolio CMS is rebuilt later
```

## Hosting the static frontend

Any static host works since there's no server-side rendering or build step:

- **Vercel / Netlify / Cloudflare Pages** (recommended) — connect the repo, leave the build
  command empty, set the output directory to `/`. Get automatic CDN, HTTPS, and instant cache
  invalidation on push.
- **GitHub Pages** — works as-is; set the Pages source to the repo root.
- **Any static file server / S3+CloudFront / nginx** — just copy the files as-is.

No environment variables are needed for the frontend itself.

## Wiring up the contact form

`assets/js/main.js` posts form submissions as JSON to `<API_BASE><endpoint>`, where `endpoint`
comes from the form's `data-lead-form` attribute (currently `/api/contact` on `contact.html`).

- If the API is deployed on the **same domain** as the static site (e.g. reverse-proxied at
  `/api/*`), leave `window.QIVA_API_URL` unset — requests go to a relative path.
- If the API is on a **different domain** (e.g. Render, as in the original setup), set it before
  `main.js` loads:
  ```html
  <script>window.QIVA_API_URL = 'https://qivalabs-api.onrender.com';</script>
  <script src="/assets/js/main.js" defer></script>
  ```
  Add that line near the top of `<body>` in whichever pages have a `data-lead-form`
  (currently just `contact.html`).
- Deploy `server/` to Render/Railway/Fly exactly as before: `cd server && npm install && node
  index.js`, with `ALLOWED_ORIGIN` set to the static site's production URL so CORS allows it.

## Regenerating or editing pages

The 31 service pages and 6 portfolio pages were produced from structured data by a one-off
generator script (kept outside this repo, not part of the shipped site — there is no build
step for visitors or for deployment). To add/edit a service or project without hand-editing
every HTML file:

1. The real data model is documented in `STRATEGY.md` §3–4 (same shape as `lib/services-data.ts`
   / the portfolio array used to have under the old Next.js app).
2. Recreate a small Node script following that shape — read the data, render each page with the
   shared header/footer markup from the existing HTML as a template, write the `.html` files.
3. Regenerate `sitemap.xml` at the same time (list every `.html` file under the site).

For a single small edit (fixing a typo, changing one paragraph), it's simpler to just edit the
target `.html` file directly — there's no template to fall out of sync with.

## Performance checklist before launch

- [ ] Add `public/og-image.png` (1200×630) and update the `og:image` meta tag path used across
      all pages (currently points at `/assets/img/og-image.png`, which doesn't exist yet)
- [ ] Run Lighthouse on `/`, one service page, and one portfolio page — the design has no
      images/JS frameworks so Core Web Vitals should be strong by default, but verify
- [ ] Confirm Google Fonts (`Space Grotesk`, `Inter`) load fast enough, or self-host them if the
      CDN round-trip shows up in LCP
- [ ] Submit `sitemap.xml` in Google Search Console once the domain is live
- [ ] Replace the placeholder legal copy in `privacy-policy.html` / `terms-of-service.html` with
      counsel-reviewed text before collecting real form submissions
- [ ] Point DNS / hosting at the new static build once verified (see "Hosting" above)

## Rollback

Every change in this rebuild is a normal git diff against `main` (nothing was force-pushed or
rewritten) — `git log` shows the full history of the previous Next.js implementation, so
reverting is a standard `git revert` / branch checkout if needed.
