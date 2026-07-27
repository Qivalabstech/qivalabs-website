# QivaLabs Website — Redesign Strategy

This document covers the deliverables that aren't code: sitemap, homepage brief, portfolio
system design, service page strategy, and the SEO checklist. It describes what was actually
built in this rebuild (plain HTML/CSS/vanilla JS, no gradients, no build step), not a
hypothetical plan — see [DEPLOYMENT.md](DEPLOYMENT.md) for shipping it.

## 1. Website structure & sitemap

```
/                               Home
/about.html                     Company story, founders, values, mission
/services/                      Services index (31 services, filterable by category)
/services/<slug>.html           31 individual service pages (see full list below)
/portfolio/                     Portfolio index (6 projects, filterable by category)
/portfolio/<slug>.html          6 project case-study pages
/contact.html                   Contact form + details
/privacy-policy.html            Legal (placeholder — needs counsel review)
/terms-of-service.html          Legal (placeholder — needs counsel review)
/404.html                       Custom not-found page
/sitemap.xml, /robots.txt       Auto-listing every URL above
```

Service categories (used for filtering + internal linking): **Digital & Marketing**,
**Software Development**, **AI & Automation**, **IT Infrastructure**, **Support & Consulting**.

Portfolio categories: AI Product, AI Automation, Hospitality Website, Education Technology,
AI Integration, Web Application.

**Not included in this pass** (real content exists in `content/blog/*.mdx` and the old
`app/career/` but wasn't migrated — see "Deferred scope" below): `/blog/`, `/career/`.

## 2. Homepage design brief

- **Hero** — H1 stating the core positioning ("Software and digital solutions that move your
  business forward"), one-sentence value prop, two CTAs (Start a project / View our work).
  Dark navy section with a subtle grid pattern (CSS only, no image) — the one deliberately
  "designed" section; everything else is white/near-white for a clean, minimal feel.
- **Stats strip** — 60+ projects delivered, 31 services, 5 practice areas, 1 accountable team.
  Real numbers pulled from the existing site's own copy, not invented.
- **Services overview** — 6 featured services (one from each high-traffic category) as cards,
  linking to `/services/`.
- **Portfolio highlights** — 3 most recent projects as cards, linking to `/portfolio/`.
- **How we work** — the 4 existing brand values (Outcomes over activity, Honest advice, Built
  to last, Partnership mindset) as a trust-building section before the final CTA.
- **Closing CTA** — dark section mirroring the hero, single strong call to contact.

Animation: every section uses `[data-reveal]` — a fade + 18px translateY on scroll via
IntersectionObserver, staggered within groups. All motion respects `prefers-reduced-motion`.

## 3. Portfolio system design

**Data structure** (see the generator's `data/portfolio.js` — content lives directly in the
static HTML now, no CMS):

```
{ slug, title, category, icon, tags[], summary, highlight, link, isExternal,
  challenge, solution, techStack[], outcome, role }
```

**Filtering**: client-side only, vanilla JS. Category buttons in a `.filter-bar` toggle
`hidden` on `.filter-item` elements matching `data-category` — no page reload, no framework.

**Card template** (index page): icon + category tag → title → summary → tech tags → highlight
line → external-link indicator if applicable.

**Detail page template**: hero (icon, title, tags, external link if any) → Challenge / Solution
two-column cards → tech stack + QivaLabs' role → Outcome callout → 3 related-project cards →
CTA.

Trade-off from dropping the Next.js/Supabase admin panel: portfolio content is now edited by
hand in HTML (or regenerated from `data/portfolio.js`, see below) rather than through a CMS UI.
Given the brief's own stack guidance ("CMS optional"), this was accepted as part of choosing a
zero-build static site — flagged explicitly rather than silently dropped.

## 4. Service pages strategy

All 31 services keep their original real content (problem/solution framing, body copy, "what's
included" checklist, related-service cross-links) — this wasn't rewritten, only re-templated
into static HTML with meta titles/descriptions already following the 50–60 / 150–160 character
guidance.

**Primary target keywords actually in use** (from existing meta descriptions — e.g.
`custom software development company Udaipur`, `website design development Udaipur`,
`mobile app development company Udaipur`, `AI integrated automation Udaipur`,
`digital marketing services Udaipur`, `cloud solutions migration Udaipur`, `CRM ERP solutions
Udaipur`, `cybersecurity solutions Udaipur`) all pair a service term with **Udaipur** /
**Rajasthan** / **India** — consistent local-SEO positioning across all 31 pages.

**Secondary / long-tail keywords** already validated by the existing blog content (kept as
reference, not yet re-published in this rebuild):
`AI chatbot development India`, `CRM vs ERP India`, `custom software development cost India`,
`cloud migration India`, `n8n vs Zapier vs Make India`, `loan origination software India`,
`mobile app development cost India 2026`, `local SEO India`, `WhatsApp Business API India`,
`website design company Rajasthan`.

**Content outline per service page** (applied to all 31): H1 with service + location → tagline
→ Problem statement → QivaLabs' approach → 4–6 paragraph body naturally repeating the target
keyword 2–3 times → "What's included" bullet list (8 items, each a specific deliverable a buyer
would search for) → 4 related-service internal links → CTA. Every page carries `Service`
schema plus a `BreadcrumbList`.

## 5. SEO checklist

**On-page**
- [x] One H1 per page, H2/H3 hierarchy inside body content
- [x] Meta titles ≤60 chars, meta descriptions 150–160 chars, unique per page (31 services + 6
      projects + 5 core pages = 42 unique pairs)
- [x] Keyword-rich URL slugs (`/services/custom-software-development.html`, not `/services/1`)
- [x] Internal linking: every service links to 4 related services; every project links to 3
      other projects; footer links to all 31 services from every page
- [x] Canonical tag on every page
- [x] Open Graph + Twitter Card tags on every page
- [ ] `og-image.png` (1200×630) — referenced in meta tags but not yet designed/added (same gap
      the previous build had — flagged in its README as a pre-launch TODO)

**Schema markup**
- [x] `ProfessionalService` (Organization + LocalBusiness fields) on the homepage, with address,
      phone, sameAs social links
- [x] `Service` schema on all 31 service pages
- [x] `CreativeWork` schema on all 6 project pages
- [x] `BreadcrumbList` on every non-home page
- [x] `AboutPage` / `ContactPage` schema where relevant

**Technical**
- [x] `sitemap.xml` listing all 42 pages, `robots.txt` pointing to it
- [x] Semantic HTML (`<header>`, `<nav>`, `<main>`, `<footer>`, landmark `aria-label`s)
- [x] Skip-to-content link for keyboard/screen-reader users
- [x] Zero layout-shifting web fonts (`font-display: swap`, `preconnect` to Google Fonts)
- [x] No render-blocking JS — single deferred `main.js`, ~4KB, no framework runtime
- [x] All images use explicit width/height or are inline SVG (no CLS from image loading)
- [ ] Compressed/responsive image set — N/A currently since the site has no photography; add
      `loading="lazy"` + `srcset` when real project screenshots are added
- [ ] robots/sitemap should be regenerated (or hand-edited) any time a page is added or removed

**Content**
- [x] 300+ words of unique body copy on every service and project page
- [x] Alt text on all `<img>` tags (logo, founder avatars use text-based initials instead of
      images, so no alt-text gap there)
- [ ] Blog (10 real, keyword-researched MDX posts already written in `content/blog/`) — not
      migrated to static HTML in this pass; see "Deferred scope"

## Deferred scope (explicitly out of this rebuild)

Dropped when moving from the Next.js + Supabase build to plain HTML/CSS/JS, per the "no
gradients / no build tooling" brief:

- **Blog** (`/blog/`) — 10 real posts exist as MDX in `content/blog/` with genuine keyword
  research already done (see §4). Converting them to static HTML pages follows the same
  generator pattern used for services/portfolio; not done yet to keep this pass scoped to the
  brief's required deliverables (home, services, portfolio, project pages).
- **Career pages** (`/career/`) — existed on the old site, not part of the brief's requested
  output, not migrated.
- **Admin panel + Supabase-backed portfolio CMS** — inherent trade-off of a zero-build static
  site; content is now edited directly in HTML or via the one-off generator script described in
  DEPLOYMENT.md.
