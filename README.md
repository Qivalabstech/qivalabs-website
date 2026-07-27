# QivaLabs Marketing Website

Static HTML/CSS/vanilla-JS marketing site for **QivaLabs LLP** — a full-service software and
digital solutions company based in Udaipur, Rajasthan, India.

No build step, no framework, no gradients — see [STRATEGY.md](STRATEGY.md) for the design/SEO
strategy and [DEPLOYMENT.md](DEPLOYMENT.md) for hosting instructions.

---

## Quick start

Any static file server works. For local development:

```bash
python3 -m http.server 8080
# → http://localhost:8080
```

or `npx serve .`, or open `index.html` directly (all links are root-relative, so a local server
is recommended over `file://`).

## Quick start (API server — leads)

The `/server` folder is a separate Express.js app that handles contact-form submissions. Deploy
it independently (Render, Railway, etc.):

```bash
cd server
npm install
node index.js                  # http://localhost:3001
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for how the frontend forms connect to this API.

---

## Site map

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about.html` | Company story, founders, values |
| `/services/` | All 31 services, filterable by category |
| `/services/<slug>.html` | Individual service pages |
| `/portfolio/` | Portfolio grid, filterable by category |
| `/portfolio/<slug>.html` | Project case-study pages |
| `/contact.html` | Contact form + details |
| `/privacy-policy.html`, `/terms-of-service.html` | Legal (placeholder — needs counsel review) |
| `/404.html` | Custom not-found page |
| `/sitemap.xml`, `/robots.txt` | Hand-maintained (see DEPLOYMENT.md to regenerate) |

---

## Tech stack

- **HTML5 / CSS3** — flat design system in `assets/css/style.css` (CSS custom properties, no
  preprocessor, no gradients)
- **Vanilla JavaScript** — `assets/js/main.js` (~4KB): nav toggle, scroll-reveal via
  IntersectionObserver, portfolio/service filtering, contact-form submit handler
- **Express.js** — standalone `/server` for lead-capture API (unchanged from the previous build)
- Zero UI frameworks, zero build tooling for the frontend

## Customisation checklist

| Item | Location | Status |
|------|----------|--------|
| Logo | `assets/img/logo.svg` | ✅ In place |
| Favicon | `favicon.ico` | ✅ In place |
| OG image | `assets/img/og-image.png` (1200×630) | ⚠️ Add before launch |
| Privacy Policy | `privacy-policy.html` | ⚠️ Replace placeholder with counsel-reviewed copy |
| Terms of Service | `terms-of-service.html` | ⚠️ Replace placeholder with counsel-reviewed copy |
| WhatsApp / phone | `+91 72318 73730` (in `assets/js/layout` markup) | ✅ Correct |

## Notes on prior architecture

This site previously ran on Next.js 16 with a Supabase-backed admin panel and blog. That
implementation is preserved in git history (see `git log`). Real blog content (10 posts,
already keyword-researched) lives in `content/blog/*.mdx` and `supabase-schema.sql` documents
the old CMS schema — both kept as reference for a future phase. See STRATEGY.md → "Deferred
scope" for what was intentionally not carried over in this rebuild.
