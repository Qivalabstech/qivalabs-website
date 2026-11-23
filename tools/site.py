#!/usr/bin/env python3
"""QivaLabs static site builder (Neon Arcade theme).

Re-wraps every existing page in the shared shell (head, header, footer,
scripts), normalises URLs to the clean www form that Vercel serves, and
generates the pages that have their own templates: home, portfolio index,
blog, 404, sitemap, robots, llms.txt.

Run from the repo root:  python3 tools/site.py
"""
import html, json, re, pathlib, datetime
import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = 'https://www.qivalabs.com'
TODAY = datetime.date.today().isoformat()
CSS_V = '20261123d'
EMAIL = 'sales@qivalabs.com'
PHONE = '+91 72318 73730'

# ---------------------------------------------------------------- helpers
def clean_url(p):
    """'/services/x.html' -> '/services/x', '/portfolio/' -> '/portfolio', '/index.html' -> '/'"""
    if not p.startswith('/') or p.startswith('//'): return p
    path, frag = (p.split('#', 1) + [''])[:2]
    q = ''
    if '?' in path: path, q = path.split('?', 1); q = '?' + q
    if path.startswith(('/assets/', '/admin', '/demo/', '/api/')) or re.search(r'\.(png|jpe?g|webp|svg|ico|xml|txt|pdf|css|js|woff2?)$', path):
        return p
    path = re.sub(r'\.html$', '', path)
    path = re.sub(r'/index$', '/', path)
    if path != '/' and path.endswith('/'): path = path[:-1]
    return path + q + ('#' + frag if frag else '')

def fix_links(s):
    s = re.sub(r'href="(/[^"]*)"', lambda m: 'href="%s"' % clean_url(m.group(1)), s)
    s = s.replace('https://qivalabs.com/', SITE + '/').replace('"https://qivalabs.com"', '"%s"' % SITE)
    s = re.sub(r'(https://www\.qivalabs\.com/[^"\s]*?)\.html', r'\1', s)
    s = s.replace('hello@qivalabs.com', EMAIL)
    return s

def esc(s): return html.escape(s, quote=True)

NAV = [('/', 'Home'), ('/services', 'Services'), ('/portfolio', 'Portfolio'), ('/blog', 'Blog'), ('/about', 'About'), ('/career', 'Career'), ('/contact', 'Contact')]

def header(active):
    def cur(u): return ' aria-current="page"' if (u == active or (u != '/' and active.startswith(u + '/'))) else ''
    links = '\n        '.join('<a href="%s"%s>%s</a>' % (u, cur(u), t) for u, t in NAV)
    mob = '\n    '.join('<a href="%s">%s</a>' % (u, t) for u, t in NAV)
    return f'''  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <div class="container">
      <a href="/" class="brand" aria-label="QivaLabs home">
        <span class="brand__mark"><img src="/assets/img/qiva-mark.png" alt="" width="24" height="26"></span><span class="brand__word">Qiva<span class="accent">Labs</span></span>
      </a>
      <nav class="nav-links" aria-label="Primary">
        {links}
      </nav>
      <div class="nav-cta">
        <button class="hud-coins" data-coin-hud aria-label="Q-coins collected"><span class="coin"></span><span data-coin-count>0</span></button>
        <button class="play-btn" data-open-game aria-label="Play Bug Squash"><i class="ph-bold ph-game-controller" aria-hidden="true"></i><span>PLAY</span></button>
        <a href="/contact" class="btn btn--primary btn--sm" data-magnetic>Start a project</a>
        <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i class="ph-bold ph-list" aria-hidden="true"></i></button>
      </div>
    </div>
  </header>
  <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile">
    {mob}
    <a href="/contact" class="btn btn--primary btn--block mt-3">Start a project</a>
  </nav>'''

FOOT_SERVICES = [('website-design-development', 'Website design and development'), ('mobile-app-development', 'Mobile app development'), ('custom-software-development', 'Custom software development'),
                 ('crm-erp-solutions', 'CRM and ERP software'), ('ai-integrated-automation', 'AI automation and chatbots'), ('business-automation', 'WhatsApp and business automation'),
                 ('ecommerce-solutions', 'E-commerce development'), ('seo-performance-optimization', 'SEO and performance')]

def footer(cta=True):
    sv = '\n          '.join('<li><a href="/services/%s">%s</a></li>' % (s, t) for s, t in FOOT_SERVICES)
    return f'''  <footer class="site-footer">
    <div class="container">
      {'<div class="footer-cta">' if cta else '<div class="footer-cta" hidden>'}
        <div><span class="eyebrow">Player 2 wanted</span><h3 class="mt-2">Got a project in mind? Let's build it.</h3><p class="mt-2">Tell us what you need. You get a clear scope and estimate within 48 hours.</p></div>
        <div class="cluster"><a href="/contact" class="btn btn--primary">Start a project <i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a><a href="https://wa.me/917231873730" class="btn btn--ghost" rel="noopener">WhatsApp us</a></div>
      </div>
      <div class="footer-grid">
        <div>
          <a href="/" class="brand"><span class="brand__mark"><img src="/assets/img/qiva-mark.png" alt="" width="24" height="26"></span><span class="brand__word">Qiva<span class="accent">Labs</span></span></a>
          <p class="mt-3" style="max-width:34ch;font-size:.95rem;">Software, app, website and AI development company. Based in Udaipur, India, building for startups and businesses in the USA, UK, Australia, Europe and the UAE.</p>
          <div class="social-row">
            <a href="https://www.instagram.com/qivalabs.ai/" aria-label="Instagram" rel="noopener"><i class="ph-bold ph-instagram-logo" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/company/qivalabs" aria-label="LinkedIn" rel="noopener"><i class="ph-bold ph-linkedin-logo" aria-hidden="true"></i></a>
            <a href="https://twitter.com/qivalabs" aria-label="X" rel="noopener"><i class="ph-bold ph-x-logo" aria-hidden="true"></i></a>
          </div>
        </div>
        <div><h4>Services</h4><ul class="footer-services">
          {sv}
        </ul></div>
        <div><h4>Company</h4><ul class="footer-links">
          <li><a href="/about">About us</a></li><li><a href="/portfolio">Portfolio</a></li><li><a href="/blog">Blog</a></li><li><a href="/career">Career</a></li><li><a href="/services">All 31 services</a></li><li><a href="/contact">Contact</a></li>
        </ul></div>
        <div><h4>Contact</h4><ul class="footer-links">
          <li><a href="mailto:{EMAIL}">{EMAIL}</a></li><li><a href="tel:+917231873730">{PHONE}</a></li><li><span style="color:var(--text-soft);font-size:.95rem;">We work with: <a href="/software-development-company-usa">USA</a> · <a href="/software-development-company-uk">UK</a> · <a href="/software-development-company-australia">Australia</a> · <a href="/software-development-company-europe">Europe</a> · <a href="/app-development-company-dubai">Dubai</a></span></li><li><span style="color:var(--text-soft);font-size:.95rem;">Udaipur, Rajasthan 313001, India</span></li>
        </ul></div>
      </div>
      <div class="footer-bottom">
        <span>&copy; <span data-year>2026</span> QivaLabs LLP. All rights reserved.</span>
        <span><a href="/privacy-policy">Privacy policy</a> &nbsp;·&nbsp; <a href="/terms-of-service">Terms of service</a> &nbsp;·&nbsp; <span style="font-size:.8rem;opacity:.7;" title="Konami code">Try ↑ ↑ ↓ ↓ ← → ← → B A</span></span>
      </div>
    </div>
  </footer>'''

ORG = {"@context": "https://schema.org", "@type": "ProfessionalService", "@id": SITE + "/#org", "name": "QivaLabs LLP", "alternateName": "QivaLabs", "url": SITE + "/",
       "logo": SITE + "/assets/img/logo.svg", "image": SITE + "/assets/img/og-image.png", "telephone": PHONE, "email": EMAIL,
       "address": {"@type": "PostalAddress", "addressLocality": "Udaipur", "addressRegion": "Rajasthan", "postalCode": "313001", "addressCountry": "IN"},
       "areaServed": [{"@type": "Country", "name": n} for n in ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Germany", "Netherlands", "Ireland", "France", "India"]], "priceRange": "$$",
       "sameAs": ["https://www.linkedin.com/company/qivalabs", "https://www.instagram.com/qivalabs.ai/", "https://twitter.com/qivalabs"],
       "knowsAbout": ["Website design", "Mobile app development", "Custom software development", "ERP software", "CRM software", "AI automation", "WhatsApp Business API", "Cloud migration", "SEO"]}

def page(url, title, desc, main, ld=(), og_image=None, robots='index, follow', og_type='website', extra_head=''):
    canon = SITE + ('/' if url == '/' else url)
    ogi = og_image or SITE + '/assets/img/og-image.png'
    lds = '\n  '.join('<script type="application/ld+json">%s</script>' % (x if isinstance(x, str) else json.dumps(x, ensure_ascii=False)) for x in ld)
    return f'''<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{canon}">
  <meta name="robots" content="{robots}">
  <meta name="theme-color" content="#0B0B12">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="preload" href="/assets/fonts/unbounded-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/space-grotesk-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/style.css?v={CSS_V}">
  <meta property="og:type" content="{og_type}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{canon}">
  <meta property="og:site_name" content="QivaLabs">
  <meta property="og:locale" content="en_IN">
  <meta property="og:image" content="{ogi}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(desc)}">
  <meta name="twitter:image" content="{ogi}">
  {lds}
  {extra_head}
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2123400382455908" crossorigin="anonymous"></script>
</head>
<body>
{header(url)}
  <main id="main">
{main}
  </main>
{footer('section--amber' not in main)}
  <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
  <script src="https://unpkg.com/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://unpkg.com/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
  <script src="/assets/js/main.js?v={CSS_V}"></script>
  <script src="/assets/js/arcade.js?v={CSS_V}"></script>
</body>
</html>
'''

def breadcrumbs(items):
    return {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + u} for i, (n, u) in enumerate(items)]}

# ---------------------------------------------------------------- projects + previews
PROJECTS = [
    dict(slug='storaazi-beauty-catalogue', name='Storaazi', kind='Beauty catalogue website', cat='web', img='storaazi', url='storaazi.com', tags=['Catalogue', 'UI/UX', 'Animation'],
         desc='Editorial beauty catalogue for makeup, skincare and personal care brands, with search, filters and a brand directory.'),
    dict(slug='sm-trades-interior-decor', name='SM Trades', kind='Interior decor brand website', cat='web', img='smtrades', url='smtradesonline.com', tags=['Luxury UI', 'Product site'],
         desc='Luxury site for wallpapers, wall decor, planters and home accents in onyx, espresso and champagne gold.'),
    dict(slug='wee-care-solutions-kitchen-appliances', name='Wee Care Solutions', kind='Kitchen appliance brand, Texas', cat='web', img='weecare', url='weecaresolution.com', tags=['16 pages', 'Catalogue'],
         desc='Sixteen-page site for a Texas kitchen appliance brand: filterable catalogue, product pages, journal, FAQ and warranty.'),
    dict(slug='stashfin-kitchen-appliances', name='Stashfin', kind='Kitchen appliance brand, USA', cat='web', img='stashfin', url='stashfinltd.com', tags=['Product site', 'Copywriting'],
         desc='Product site for a nine-appliance line-up written for American homes, led by the warranty and replaceable parts.'),
    dict(slug='qiva-bot-mandi-whatsapp-automation', name='QIVA Bot for mandi traders', kind='WhatsApp AI automation', cat='ai', mock='chat', tags=['WhatsApp API', 'AI bots'],
         desc='Three WhatsApp bots on one backend: customer orders, supplier stock updates and daily numbers for the owner.'),
    dict(slug='qiva-pos-demo', name='Qiva POS', kind='Billing and POS software', cat='software', img='pos', url='pos.qivalabs.com', tags=['GST billing', 'Inventory'],
         desc='Point of sale for restaurants and shops: GST invoices, barcode billing, inventory, kitchen orders and sales reports.'),
    dict(slug='jharokha-haveli', name='Jharokha Haveli', kind='Heritage hotel website, Udaipur', cat='web', mock='hotel', tags=['Next.js', 'Hospitality', 'SEO'],
         desc='Full-screen heritage hotel site with room pages, direct enquiries and a local guide. Now the main booking channel.'),
    dict(slug='qivalabs-school-connect', name='School Connect', kind='School management software', cat='software', mock='school', tags=['Attendance', 'Fees', 'WhatsApp'],
         desc='Attendance, fee payments, notices, homework and results in one system, with parent updates sent on WhatsApp.'),
    dict(slug='surbhi-ed-tech-platform', name='Surbhi Ed-Tech', kind='E-learning platform', cat='software', mock='lms', tags=['Next.js 16', 'Payments'],
         desc='Thirteen-page learning platform with a course catalogue, student login and portal, and online payments.'),
    dict(slug='ai-crm-automation', name='AI CRM Automation', kind='AI layer for Zoho, HubSpot, Freshdesk', cat='ai', mock='kanban', tags=['LLM', 'CRM'],
         desc='Reads every incoming query and routes it: answered automatically, drafted for an agent, or escalated to a person.'),
    dict(slug='print-support-platform', name='Print Support Platform', kind='Real-time support web app', cat='software', mock='kanban2', tags=['React', 'Socket.io'],
         desc='Live chat between customers and agents, agent dashboards and job tracking for a printer help desk.'),
    dict(slug='waitji-ai', name='WaitJI AI', kind='AI ad marketplace (our product)', cat='ai', mock='term', tags=['SaaS', 'Dev tools'],
         desc='Developers earn when sponsored lines show while their AI coding tools are busy. Built and run by QivaLabs.'),
]

def preview(p, big=False):
    cls = 'pv pv--tall' if big else 'pv'
    if p.get('img') == 'pos':
        return f'<div class="{cls}"><div class="pv__bar"><i></i><i></i><i></i><span>{p["url"]}</span></div><div class="pv__screen" style="background-image:url(/assets/img/portfolio/pos-dashboard.webp);--dur:10s"></div></div>'
    if p.get('img'):
        i = p['img']
        return (f'<div class="{cls}"><div class="pv__bar"><i></i><i></i><i></i><span>{p["url"]}</span></div>'
                f'<div class="pv__screen" style="background-image:url(/assets/img/portfolio/{i}-scroll.webp)"></div>'
                f'<div class="pv__phone"><div class="pv__screen" style="background-image:url(/assets/img/portfolio/{i}-mobile.webp)"></div></div></div>')
    m = p['mock']
    bar = '<div class="pv__bar"><i></i><i></i><i></i><span>%s</span></div>'
    if m == 'chat':
        body = ('<div class="mock mock-chat"><div class="head">QIVA Bot · Mandi orders</div>'
                '<div class="b in">Bhai, 40 kg pyaaz aur 25 kg aloo chahiye kal subah<small>06:12</small></div>'
                '<div class="b out">Done ✅ Onion ₹22/kg, Potato ₹18/kg. Total ₹1,330. Confirm?<small>06:12</small></div>'
                '<div class="b in">Haan confirm<small>06:13</small></div>'
                '<div class="b out">Order #4821 booked. Delivery 7 AM. 🚚<small>06:13</small></div>'
                '<div class="b out">Owner report: 38 orders today, top item Onion.<small>21:00</small></div></div>')
        return f'<div class="{cls}">' + bar % 'WhatsApp Business API' + body + '</div>'
    if m == 'hotel':
        return f'<div class="{cls}">' + bar % 'jharokhahaveli.com' + '<div class="mock mock-hotel"><div class="sun"></div><div class="title">JHAROKHA HAVELI<small>HERITAGE STAY · UDAIPUR</small></div><div class="arches"></div><div class="book">Check availability</div></div></div>'
    if m == 'lms':
        cards = ''.join('<div class="c"><div class="img"></div><div class="ln"></div><div class="ln" style="width:60%%"></div><div class="prog"><i style="animation-delay:-%ss"></i></div></div>' % d for d in (0, 1.3, 2.6))
        return f'<div class="{cls}">' + bar % 'surbhi.app/courses' + f'<div class="mock mock-lms"><div class="top"><span>My courses</span><span>🔔 3</span></div>{cards}<div class="pay"><span>Advanced Excel · ₹1,499</span><b>Pay now</b></div></div></div>'
    if m in ('kanban', 'kanban2'):
        cols = ['Auto-resolved', 'Agent assisted', 'Escalated'] if m == 'kanban' else ['New chats', 'In progress', 'Resolved']
        inbox = 'Incoming: "Where is my refund?" → routing…' if m == 'kanban' else 'Live chat: customer #2291 is typing…'
        colhtml = ''.join('<div class="col"><h5>%s</h5><div class="t"></div><div class="t"></div><div class="t"></div><div class="t"></div></div>' % c for c in cols)
        return f'<div class="{cls}">' + bar % ('crm.qivalabs.ai' if m == 'kanban' else 'support desk') + f'<div class="mock mock-kanban"><div class="inbox">{inbox}</div>{colhtml}</div></div>'
    if m == 'school':
        rows = ''.join('<div class="row"><i></i>%s</div>' % n for n in ('Aarav S.', 'Diya M.', 'Kabir R.', 'Meera J.', 'Vihaan P.'))
        return f'<div class="{cls}">' + bar % 'School Connect' + f'<div class="mock mock-school"><div class="ph"><h6>Class 7-B · Attendance</h6>{rows}</div><div class="notif"><b>WhatsApp</b><br>Aarav reached school at 7:52 AM ✅</div></div></div>'
    if m == 'term':
        return f'<div class="{cls}">' + bar % 'terminal' + ('<div class="mock mock-term"><div><span class="g">➜</span> claude "refactor the billing module"</div>'
                '<div><span class="spin y">✻</span> Thinking… <span class="typing p">Sponsored: Ship faster with Hakscan</span></div>'
                '<div style="opacity:.6">  publisher earns 50% of this impression</div><div><span class="g">✔</span> 12 files updated</div></div></div>')
    return ''

def work_card(p, n):
    tags = ''.join('<span class="tag tag--neutral">%s</span>' % t for t in p['tags'])
    return f'''        <a class="work-card filter-item" data-category="{p['cat']}" href="/portfolio/{p['slug']}" data-reveal>
          {preview(p)}
          <div class="pv-label"><h3>{p['name']}</h3><span class="lvl">LVL {n:02d}</span></div>
          <p class="pixel" style="font-size:.7rem;color:var(--lime);margin-top:.3rem;">{p['kind']}</p>
          <p>{p['desc']}</p>
          <div class="card__tags">{tags}</div>
        </a>'''

# ---------------------------------------------------------------- home
LEVELS = [
    ('01', 'Software development', 'ph-code', '#C6FF3D', 92, 'Custom systems built around how your business already works.',
     [('custom-software-development', 'Custom software'), ('crm-erp-solutions', 'CRM and ERP'), ('enterprise-web-applications', 'Web apps'), ('saas-product-development', 'SaaS products'), ('mobile-app-development', 'Mobile apps'), ('loan-origination-software', 'Loan origination (LOS)'), ('api-development-integration', 'APIs')]),
    ('02', 'AI and automation', 'ph-robot', '#FF3D9A', 88, 'Bots and workflows that take repeat work off your team.',
     [('ai-integrated-automation', 'AI chatbots'), ('business-automation', 'WhatsApp automation'), ('business-process-automation', 'Process automation')]),
    ('03', 'Websites and marketing', 'ph-browser', '#3DE8FF', 95, 'Websites, stores and brand work that bring customers in.',
     [('website-design-development', 'Website design'), ('ecommerce-solutions', 'E-commerce'), ('ui-ux-design', 'UI/UX'), ('branding-identity', 'Branding'), ('digital-marketing', 'Digital marketing'), ('seo-performance-optimization', 'SEO')]),
    ('04', 'Cloud and security', 'ph-cloud', '#FFE14D', 80, 'Cloud, data and security that keep things running.',
     [('cloud-solutions-migration', 'Cloud migration'), ('devops-infrastructure', 'DevOps'), ('cybersecurity-solutions', 'Cyber security'), ('data-analytics-bi', 'Data and BI'), ('database-design-management', 'Databases'), ('hosting-domain-management', 'Hosting')]),
    ('05', 'Support and growth', 'ph-lifebuoy', '#8B5CFF', 85, 'Help after launch, from people who know your system.',
     [('maintenance-amc', 'Maintenance and AMC'), ('24-7-technical-support', '24/7 support'), ('it-consulting', 'IT consulting'), ('dedicated-account-management', 'Account management'), ('quality-assurance-testing', 'QA and testing')]),
]

FAQ = [
    ('What does QivaLabs do?', 'QivaLabs is a software, app and AI development company based in India. We design and build custom software, mobile apps, websites, AI agents and automation for startups and businesses in the USA, UK, Australia, Europe and the UAE, and we maintain them after launch.'),
    ('Do you work with clients in the US, UK, Australia, Europe and Dubai?', 'Yes, that is our main focus. Brands in the United States such as Wee Care Solutions in Texas and Stashfin run on sites we built. Projects run fully online, with calls in your working hours, quotes in your currency, your NDA signed before the first detailed call, and all code and IP assigned to you.'),
    ('How do you handle time zones?', 'We are on India time (UTC+5:30). That gives near-full overlap with Dubai, four to five hours with the UK and Europe, your afternoon in Australia, and your morning in the US. Written updates and demo links arrive before your next working day.'),
    ('How quickly will I get a quote?', 'Send us a short brief and you get a written scope, a timeline and a fixed quote within 48 hours. There is no obligation.'),
    ('Can you build an ERP or billing system for a small business?', 'Yes. We build ERP, CRM, inventory and billing software sized for small and mid-sized businesses, and we can start from a ready product like Qiva POS when that saves you money.'),
    ('Do you offer support after the website or app goes live?', 'Yes. We offer maintenance plans (AMC), 24/7 technical support and a named account manager, so the people who built your system also look after it.'),
]

def home(posts):
    lv = ''
    for num, name, icon, col, w, blurb, links in LEVELS:
        li = ''.join('<li><a href="/services/%s">%s</a></li>' % (s, t) for s, t in links)
        lv += f'''        <div class="card level" style="--c:{col}" data-reveal>
          <div class="level__top"><span class="level__icon"><i class="ph-bold {icon}" aria-hidden="true"></i></span><span class="level__num">WORLD {num}</span></div>
          <h3>{name}</h3><p>{blurb}</p>
          <div class="xp" style="--w:{w}%"><i></i></div>
          <ul>{li}</ul>
        </div>
'''
    feat = '\n'.join(work_card(p, i + 1) for i, p in enumerate(PROJECTS[:6]))
    blog = ''.join(post_card(p) for p in posts[:3])
    faq = ''.join(f'<details class="card" data-reveal><summary style="cursor:pointer;font-family:var(--font-heading);font-weight:700;">{q}</summary><p class="mt-2">{a}</p></details>' for q, a in FAQ)
    services_ticker = ''.join('<span>%s</span>' % t for t in ['Custom software', 'Mobile apps', 'AI agents', 'Website design', 'SaaS', 'E-commerce', 'AI chatbots', 'CRM and ERP', 'Cloud migration', 'Automation', 'UI/UX', 'Cyber security'])
    return f'''    <section class="hero home-hero">
      <div class="container split">
        <div class="hero__content">
          <span class="eyebrow" data-reveal>Player 1: your business</span>
          <h1 data-text-reveal>Software that levels up your business.</h1>
          <p class="lede" data-reveal>We build custom software, mobile apps, websites and AI agents for startups and growing businesses in the USA, UK, Australia, Europe and the UAE. One senior team from first call to launch, and a fixed quote within 48 hours.</p>
          <div class="cluster mt-4" data-reveal>
            <a href="/contact" class="btn btn--primary" data-magnetic>Start a project <i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a>
            <a href="/portfolio" class="btn btn--ghost">See the work</a>
          </div>
          <div class="float-badges" data-reveal>
            <span class="tag tag--lime">60+ projects</span><span class="tag">31 services</span><span class="tag">USA · UK · AU · EU · UAE</span><span class="tag tag--pink">48h quote</span>
          </div>
        </div>
        <div data-reveal>
          <div data-bug-game></div>
          <p class="pixel text-center" style="font-size:.68rem;color:var(--muted);margin-top:1.2rem;">Squash the bugs. We do this for a living.</p>
        </div>
      </div>
    </section>

    <section class="crossing-banner" aria-label="What we build">
      <div class="crossing-row"><div class="crossing-row__track">{services_ticker}{services_ticker}</div></div>
      <div class="crossing-row crossing-row--reverse crossing-row--alt"><div class="crossing-row__track">{services_ticker}{services_ticker}</div></div>
    </section>

    <section class="section section--tight">
      <div class="container">
        <div class="stats" data-reveal-group>
          <div data-reveal><div class="stat__value"><span data-count-to="60" data-count-suffix="+">0</span></div><div class="stat__label">Projects delivered</div></div>
          <div data-reveal><div class="stat__value"><span data-count-to="31">0</span></div><div class="stat__label">Services under one roof</div></div>
          <div data-reveal><div class="stat__value"><span data-count-to="6">0</span></div><div class="stat__label">Products we built ourselves</div></div>
          <div data-reveal><div class="stat__value"><span data-count-to="48" data-count-suffix="h">0</span></div><div class="stat__label">To a written quote</div></div>
        </div>
      </div>
    </section>

{regions_section()}
    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Level select</span>
          <h2 class="mt-3">Five worlds. One team.</h2>
          <p>Pick what you need. A website, an app, an ERP, a WhatsApp bot or all of them together. The same people plan it, build it and look after it.</p>
        </div>
        <div class="levels">
{lv}        </div>
        <div class="cluster mt-4"><a href="/services" class="btn btn--ghost">All 31 services <i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Hall of fame</span>
          <h2 class="mt-3">Live projects, playing on loop.</h2>
          <p>Every preview below is real work. Hover a card to pause it, click to read the full story.</p>
        </div>
        <div class="work-grid">
{feat}
        </div>
        <div class="cluster mt-4"><a href="/portfolio" class="btn btn--primary">See all 12 projects <i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Our own games</span>
          <h2 class="mt-3">Products we build and run.</h2>
          <p>We put our own money into these. Running live products keeps us honest about what launching and supporting software really takes.</p>
        </div>
        <div class="grid grid--4" data-reveal-group>
          <a class="card product" href="/portfolio/waitji-ai" data-reveal><span class="product__logo" style="background:linear-gradient(135deg,#4F46E5,#FF6B4A)">W</span><h3>WaitJI AI</h3><p>Ad marketplace that pays developers while their AI coding tools think.</p><span class="tag tag--lime">Live</span></a>
          <a class="card product" href="https://hakscan.online" rel="noopener" data-reveal><span class="product__logo" style="background:#101826;border:2px solid var(--lime);color:var(--lime)">H</span><h3>Hakscan</h3><p>Security scans for apps built with AI coding tools, before real users find the holes.</p><span class="tag tag--lime">Live</span></a>
          <a class="card product" href="/portfolio/qivalabs-school-connect" data-reveal><span class="product__logo" style="background:#107880">S</span><h3>School Connect</h3><p>School management software with attendance, fees and parent updates on WhatsApp.</p><span class="tag">Demo</span></a>
          <a class="card product" href="/portfolio/qiva-pos-demo" data-reveal><span class="product__logo" style="background:#FF3D9A">P</span><h3>Qiva POS</h3><p>Billing software for restaurants and shops, with GST invoices and inventory.</p><span class="tag">Demo</span></a>
        </div>
      </div>
    </section>

    <section class="section section--deep">
      <div class="container">
        <div class="section-head section-head--center" data-reveal>
          <span class="eyebrow">Quest map</span>
          <h2 class="mt-3">How a project runs.</h2>
        </div>
        <div class="quest" data-reveal-group>
          <div class="quest__step" data-reveal><div class="quest__node">01</div><h3>Talk</h3><p>A call or a WhatsApp message is enough. We ask about your business before the technology.</p></div>
          <div class="quest__step" data-reveal><div class="quest__node">02</div><h3>Scope and quote</h3><p>Within 48 hours you get a written scope, a timeline and a fixed price.</p></div>
          <div class="quest__step" data-reveal><div class="quest__node">03</div><h3>Design and build</h3><p>You see the screens first, then working links as we build. Feedback comes early.</p></div>
          <div class="quest__step" data-reveal><div class="quest__node">04</div><h3>Launch and support</h3><p>We take it live, then maintenance plans and 24/7 support keep it running.</p></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Guides</span>
          <h2 class="mt-3">From the blog.</h2>
          <p>Straight answers on costs, timelines and tools, written by the people who build the software.</p>
        </div>
        <div class="grid grid--3" data-reveal-group>
{blog}
        </div>
        <div class="cluster mt-4"><a href="/blog" class="btn btn--ghost">All articles <i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a></div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container" style="max-width:56rem;">
        <div class="section-head" data-reveal><span class="eyebrow">FAQ</span><h2 class="mt-3">Questions people ask us.</h2></div>
        <div class="stack">{faq}</div>
      </div>
    </section>

    <section class="section section--amber">
      <div class="container text-center">
        <p class="pixel" style="font-size:.8rem;">INSERT COIN TO CONTINUE</p>
        <h2 class="mt-2">Ready, player two?</h2>
        <p class="lede mt-2">Tell us what you want to build. You get a clear scope and a fixed quote in 48 hours.</p>
        <div class="cluster mt-4" style="justify-content:center;"><a href="/contact" class="btn btn--primary">Start a project</a><a href="https://wa.me/917231873730" class="btn btn--ghost" rel="noopener">WhatsApp us</a></div>
      </div>
    </section>
'''

# ---------------------------------------------------------------- portfolio index
def portfolio_index():
    cards = '\n'.join(work_card(p, i + 1) for i, p in enumerate(PROJECTS))
    return f'''    <section class="hero">
      <div class="container hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Portfolio</span></nav>
        <span class="eyebrow" data-reveal>Hall of fame</span>
        <h1 data-text-reveal>Work that's live and running.</h1>
        <p class="lede" data-reveal>Websites, apps, billing software and AI automation we've designed, built and launched, for clients in the USA and India and for our own products. Every preview plays on loop.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="filter-bar" data-filter-bar=".work-card" data-reveal>
          <button class="filter-btn is-active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="web">Websites</button>
          <button class="filter-btn" data-filter="software">Software and apps</button>
          <button class="filter-btn" data-filter="ai">AI and automation</button>
        </div>
        <div class="work-grid">
{cards}
        </div>
      </div>
    </section>
    <section class="section section--amber">
      <div class="container text-center">
        <p class="pixel" style="font-size:.8rem;">NEXT LEVEL</p>
        <h2 class="mt-2">Your project could be level 13.</h2>
        <div class="cluster mt-4" style="justify-content:center;"><a href="/contact" class="btn btn--primary">Start a project</a></div>
      </div>
    </section>
'''

# ---------------------------------------------------------------- blog
COVERS = ['linear-gradient(135deg,#C6FF3D,#22c3a6)', 'linear-gradient(135deg,#FF3D9A,#8B5CFF)', 'linear-gradient(135deg,#3DE8FF,#4F46E5)', 'linear-gradient(135deg,#FFE14D,#FF7A59)', 'linear-gradient(135deg,#8B5CFF,#FF3D9A)', 'linear-gradient(135deg,#22c3a6,#3DE8FF)']

def load_posts():
    posts = []
    for f in sorted((ROOT / 'content' / 'posts').glob('*.md')):
        raw = f.read_text()
        m = re.match(r'---\n(.*?)\n---\n(.*)', raw, re.S)
        meta = {}
        for line in m.group(1).splitlines():
            if ':' in line:
                k, v = line.split(':', 1); meta[k.strip()] = v.strip().strip('"')
        meta['body'] = m.group(2)
        meta['words'] = len(re.findall(r'\w+', meta['body']))
        posts.append(meta)
    posts.sort(key=lambda p: p['date'], reverse=True)
    for i, p in enumerate(posts): p['cover'] = COVERS[i % len(COVERS)]
    return posts

def post_card(p):
    mins = max(3, round(p['words'] / 220))
    return f'''          <a class="card post-card" href="/blog/{p['slug']}" data-reveal>
            <div class="post-cover" style="--cv:{p['cover']}"><b>{esc(p['cover_text'])}</b></div>
            <span class="meta">{esc(p['category'])} · {mins} min read</span>
            <h3>{esc(p['title'])}</h3>
            <p>{esc(p['excerpt'])}</p>
          </a>
'''

def blog_index(posts):
    cards = ''.join(post_card(p) for p in posts)
    return f'''    <section class="hero">
      <div class="container hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Blog</span></nav>
        <span class="eyebrow" data-reveal>Guides and playbooks</span>
        <h1 data-text-reveal>The QivaLabs blog.</h1>
        <p class="lede" data-reveal>Plain answers on what software, apps and AI cost, how long they take, and how to hire a development team you can trust.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="grid grid--3" data-reveal-group>
{cards}
        </div>
      </div>
    </section>
'''

def render_post(p, posts):
    md = markdown.Markdown(extensions=['tables', 'sane_lists', 'toc'], extension_configs={'toc': {'toc_depth': '2'}})
    body = md.convert(p['body'])
    body = fix_links(body)
    toc = ''.join('<li><a href="#%s">%s</a></li>' % (t['id'], t['name']) for t in md.toc_tokens)
    mins = max(3, round(p['words'] / 220))
    others = ''.join(post_card(q) for q in posts if q['slug'] != p['slug'])[:0]
    rel = [q for q in posts if q['slug'] != p['slug']][:3]
    relh = ''.join(post_card(q) for q in rel)
    svc = p.get('service', '/services')
    svcname = p.get('service_name', 'our services')
    return f'''    <section class="hero" style="padding-bottom:3rem;">
      <div class="container hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog">Blog</a><span>/</span><span>{esc(p['category'])}</span></nav>
        <span class="eyebrow" data-reveal>{esc(p['category'])} · {mins} min read</span>
        <h1 style="font-size:clamp(2rem,4.6vw,3.6rem);max-width:22ch;" data-reveal>{esc(p['title'])}</h1>
        <p class="lede" data-reveal>{esc(p['excerpt'])}</p>
        <div class="author-box mt-4" data-reveal><img src="/assets/img/team-rajamuddin.jpg" alt="Rajamuddin" width="56" height="56"><div><strong>Rajamuddin</strong><p style="font-size:.9rem;">CTO and Designated Partner, QivaLabs · Updated {datetime.date.fromisoformat(p.get('updated', p['date'])).strftime('%d %b %Y')}</p></div></div>
      </div>
    </section>
    <section class="section" style="padding-top:2rem;">
      <div class="container article">
        <article class="prose">
{body}
          <div class="card mt-4" style="border-color:var(--lime);box-shadow:var(--shadow-hard-pink);">
            <span class="eyebrow">Need help with this?</span>
            <h3 class="mt-2">Talk to the team that builds {esc(svcname)}.</h3>
            <p class="mt-2">Send us a short brief. You get a written scope, timeline and fixed quote within 48 hours.</p>
            <div class="cluster mt-3"><a class="btn btn--primary btn--sm" href="/contact">Get a quote</a><a class="btn btn--ghost btn--sm" href="{svc}">See the service</a></div>
          </div>
        </article>
        <aside class="toc"><div class="card"><h4>ON THIS PAGE</h4><ol>{toc}</ol></div></aside>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <div class="section-head" data-reveal><h2>Keep reading</h2></div>
        <div class="grid grid--3" data-reveal-group>
{relh}
        </div>
      </div>
    </section>
'''

# ---------------------------------------------------------------- SEO title overrides
# ---------------------------------------------------------------- global markets
# Inserted into site.py. Targets the US, UK, Australia, Europe and the UAE.

AREA_SERVED = [{"@type": "Country", "name": n} for n in
               ["United States", "United Kingdom", "Australia", "United Arab Emirates", "Germany", "Netherlands", "Ireland", "France", "India"]]

GLOBAL_LINE = 'businesses in the USA, UK, Australia, Europe and the UAE'

# Exact sentence swaps on legacy service/about pages (old India/Udaipur framing -> global).
GLOBAL_SWAPS = [
    (' for US, UK, Australian, European and UAE Businesses', ' for Businesses Worldwide'),
    ('Mobile App Development in Udaipur, India', 'Mobile App Development Company'),
    ('Custom Software Development in Udaipur', 'Custom Software Development Company'),
    ('Business Automation Services in Udaipur', 'Business Automation Services'),
    ('Digital Marketing Services in Udaipur', 'Digital Marketing Services'),
    ('IT Consulting Services in Udaipur', 'IT Consulting Services'),
    ('UI/UX Design Services in Udaipur', 'UI/UX Design Services'),
    ('Cybersecurity Solutions for Businesses in India', 'Cybersecurity Solutions for Growing Businesses'),
    ('E-commerce Solutions for Indian Businesses', 'E-commerce Development Solutions'),
    ('Website Design &amp; Development in Udaipur', 'Website Design &amp; Development Company'),
    ('Website Design & Development in Udaipur', 'Website Design & Development Company'),
    ('your target customers in Udaipur and across India', 'your target customers, wherever they are'),
    ('QivaLabs works with businesses across Udaipur and India to identify', 'QivaLabs works with businesses in the US, UK, Australia, Europe, the UAE and India to identify'),
    ('QivaLabs helps businesses in Udaipur and across India navigate', 'QivaLabs helps businesses in the US, UK, Australia, Europe, the UAE and India navigate'),
    ('QivaLabs works with SMEs and mid-market companies across Udaipur and India to', 'QivaLabs works with SMEs and mid-market companies in the US, UK, Australia, Europe, the UAE and India to'),
    ('across Udaipur, Rajasthan, and other', 'in the US, India and other'),
    ('SMEs in India are frequently targeted', 'Small and mid-sized businesses are frequently targeted'),
    ('designed for the reality of Indian SME budgets and threat environments', 'designed for the budgets and threat environments of small and mid-sized businesses'),
    ('DPDP (India\'s Digital Personal Data Protection Act)', 'UK GDPR, Australia\'s Privacy Act, the UAE PDPL or India\'s DPDP Act'),
    ('development teams across Udaipur and India', 'development teams in the US, UK, Australia, Europe, the UAE and India'),
    ('Most businesses in Udaipur invest in a website', 'Most small businesses invest in a website'),
    ('Customers in Udaipur, Rajasthan, and across India search online', 'Customers search online'),
    ('For local businesses in Udaipur and Rajasthan, we specialise in local SEO tactics', 'For businesses that serve a city or region, we specialise in local SEO tactics'),
    ('your payment needs become specific to India', 'your payment, tax or shipping needs become specific to your market'),
    ('E-commerce in India is growing rapidly', 'E-commerce keeps growing in every market we work in'),
    ('across Udaipur and India.', 'in the US, India and beyond.'),
    ('We understand the specific considerations of the Indian market:', 'We build for the market you sell in, whether that means Stripe, PayPal and Apple Pay with sales tax or VAT for US, UK and European stores, or, for Indian stores,'),
    ('where over 70% of Indian e-commerce traffic originates', 'where most e-commerce traffic now comes from'),
    ('QivaLabs offers independent IT consulting services to businesses in Udaipur and across India.', 'QivaLabs offers independent IT consulting to businesses in the US, UK, Australia, Europe, the UAE and India.'),
    ('In India\'s rapidly evolving payments landscape, the right', 'The right'),
    ('We have integration experience with all major Indian payment processors, Razorpay, PayU, Cashfree, CCAvenue, as well as international gateways including Stripe for global businesses',
     'We integrate Stripe, PayPal and Square for US, UK, European and Australian businesses, and Razorpay, PayU, Cashfree and CCAvenue for Indian ones'),
    ('This is particularly valuable for established businesses in Udaipur and Rajasthan that have', 'This is particularly valuable for established businesses that have'),
    ('for businesses across Udaipur and India, from simple', 'for businesses in the US, UK, India and beyond, from simple'),
    ('We support integration with all major business software used in India: Zoho suite, Tally,', 'We support integration with the business software our clients run: Salesforce, HubSpot, Xero, Zoho, Tally,'),
    ('We work with businesses across Udaipur, Rajasthan, and throughout India, from local service providers to multi-city enterprises.', 'We work with ' + GLOBAL_LINE + ', from founders with a first product to established companies.'),
    ('Built in Udaipur.', 'Built in India.'),
    ('Trusted across India.', 'Shipped for clients worldwide.'),
    ('businesses in India need reliable, high-quality technology partners', 'growing businesses everywhere need reliable, high-quality technology partners'),
    ('helping businesses in Udaipur and Rajasthan automate', 'helping businesses automate'),
]
GLOBAL_HEADING = re.compile(r'([A-Z][^<>\n]{2,60}?) in Udaipur and across India')

def globalize(main):
    for a, b in GLOBAL_SWAPS: main = main.replace(a, b)
    main = GLOBAL_HEADING.sub(lambda m: m.group(1) + ' for Businesses Worldwide', main)
    return main

def globalize_meta(t):
    t = re.sub(r' \| QivaLabs Udaipur', ' | QivaLabs', t)
    t = re.sub(r' \| QivaLabs India', ' | QivaLabs', t)
    t = re.sub(r'( Udaipur)?( India)?(?= \| QivaLabs)', '', t)
    t = re.sub(r',? in Udaipur(,? (Rajasthan|India))*', '', t)
    t = re.sub(r'(across|in|throughout) India', 'in the US, UK, Australia, Europe and the UAE', t)
    t = t.replace('for Indian businesses', 'for growing businesses').replace('Indian businesses', 'growing businesses')
    return t

# Global titles for the money pages (title, description).
GLOBAL_TITLES = {
    '/services/mobile-app-development': ('Mobile App Development Company | iOS, Android and Flutter Apps | QivaLabs', 'Mobile app development company building iOS, Android and Flutter apps for startups and businesses in the USA, UK, Australia, Europe and Dubai. Senior team, fixed quote in 48 hours.'),
    '/services/website-design-development': ('Website Design and Development Company | Fast, SEO-Ready Sites | QivaLabs', 'Website design and development for businesses in the USA, UK, Australia, Europe and the UAE. Fast, mobile-first sites built to rank and convert, with a fixed quote in 48 hours.'),
    '/services/custom-software-development': ('Custom Software Development Company | Web Apps and Platforms | QivaLabs', 'Custom software development for startups and growing businesses in the US, UK, Australia, Europe and the UAE: web apps, portals, internal tools and platforms, built by one senior team.'),
    '/services/ai-integrated-automation': ('AI Development Company | AI Agents, Chatbots and Automation | QivaLabs', 'AI development company building AI agents, chatbots and workflow automation for businesses in the USA, UK, Australia, Europe and Dubai. From a two-week pilot to production.'),
    '/services/business-automation': ('Business Automation and WhatsApp Bots | n8n, Make and Custom Workflows | QivaLabs', 'Business automation with n8n, Make, Zapier, custom workflows and the WhatsApp Business API. Order bots, reminders, reporting and CRM sync for teams worldwide.'),
    '/services/crm-erp-solutions': ('Custom CRM and ERP Development Company | QivaLabs', 'Custom CRM and ERP development and integration for small and mid-sized businesses: sales pipelines, inventory, billing and reporting in one system.'),
    '/services/saas-product-development': ('SaaS Development Company | MVP to Launch and Scale | QivaLabs', 'SaaS product development for founders in the USA, UK, Australia and Europe: MVP scoping, multi-tenant architecture, subscriptions and launch, with a fixed-price first version.'),
    '/services/ecommerce-solutions': ('Ecommerce Development Company | Shopify and Custom Stores | QivaLabs', 'Ecommerce development: Shopify and custom online stores with payments, inventory, shipping and multi-currency checkout for brands in the US, UK, Europe, Australia and the UAE.'),
    '/services/ui-ux-design': ('UI/UX Design Agency | App and Web Product Design | QivaLabs', 'UI/UX design for apps, SaaS products and websites: research, wireframes, design systems and clickable prototypes your developers can build from.'),
    '/services/enterprise-web-applications': ('Enterprise Web Application Development | QivaLabs', 'Enterprise web application development: secure portals, dashboards and internal platforms with roles, audit trails and integrations.'),
    '/services/cloud-solutions-migration': ('Cloud Migration Services | AWS, Azure and Google Cloud | QivaLabs', 'Cloud migration and setup on AWS, Azure and Google Cloud, hosted in your region (US, UK, EU, Sydney or UAE) with monitoring, backups and cost alerts.'),
    '/services/seo-performance-optimization': ('Technical SEO and Website Performance Services | QivaLabs', 'Technical SEO, Core Web Vitals and site speed work for businesses in the USA, UK, Australia and Europe: audits, fixes, schema and content that ranks.'),
    '/services/digital-marketing': ('Digital Marketing Agency | SEO, Paid Ads and Content | QivaLabs', 'Digital marketing for growing businesses: SEO, Google and Meta ads, content and email, tied to leads and revenue you can measure.'),
    '/services/cybersecurity-solutions': ('Cyber Security Services for Small Businesses | Audits and Hardening | QivaLabs', 'Cyber security audits, vulnerability scans, website hardening and incident support for small and mid-sized businesses in the US, UK, Australia, Europe and the UAE.'),
    '/services/dedicated-account-management': ('Dedicated Development Team and Account Manager | QivaLabs', 'Hire a dedicated development team with a named account manager: developers, designers and QA who work as an extension of your company.'),
    '/services/maintenance-amc': ('Website and App Maintenance Plans | QivaLabs', 'Monthly maintenance plans for websites, apps and software: updates, backups, security patches, monitoring and small changes from the team that knows your code.'),
    '/services': ('31 Software, App, Web and AI Development Services | QivaLabs', 'All QivaLabs services: software, mobile apps, websites, AI agents and automation, ERP and CRM, cloud, security and support for businesses in the USA, UK, Australia, Europe and the UAE.'),
    '/about': ('About QivaLabs | Software, App and AI Development Company', 'QivaLabs LLP is a software, app and AI development company based in India, working with startups and businesses in the USA, UK, Australia, Europe and the UAE.'),
    '/career': ('Careers at QivaLabs | Engineering, Design and Sales Roles', 'Open roles at QivaLabs: software engineering, design, AI and sales roles, remote-friendly from Udaipur, India, working with clients in the USA, UK, Australia, Europe and the UAE.'),
    '/contact': ('Contact QivaLabs | Get a Software, App or AI Quote in 48 Hours', 'Tell QivaLabs what you want to build. Email sales@qivalabs.com or WhatsApp +91 72318 73730. Calls in US, UK, European, Australian and UAE working hours.'),
}

CONTACT_TZ = '''
    <section class="section section--alt">
      <div class="container" style="max-width:62rem;">
        <div class="section-head" data-reveal><span class="eyebrow">Time zones</span><h2 class="mt-3">We work while you do.</h2>
          <p>Our team is on India time (UTC+5:30). Here is how that lines up with you. Book a call in your hours and we will be there.</p></div>
        <div class="card prose" data-reveal>
          <table>
            <thead><tr><th>Where you are</th><th>Time difference</th><th>Best time to talk</th></tr></thead>
            <tbody>
              <tr><td><a href="/app-development-company-dubai">Dubai and the UAE</a></td><td>We are 1.5 hours ahead</td><td>Any time in your working day</td></tr>
              <tr><td><a href="/software-development-company-europe">Europe (CET)</a></td><td>We are 3.5 to 4.5 hours ahead</td><td>Your morning to mid-afternoon</td></tr>
              <tr><td><a href="/software-development-company-uk">United Kingdom</a></td><td>We are 4.5 to 5.5 hours ahead</td><td>Your morning to early afternoon</td></tr>
              <tr><td><a href="/software-development-company-australia">Australia (Sydney)</a></td><td>We are 4.5 to 5.5 hours behind</td><td>Your afternoon</td></tr>
              <tr><td><a href="/software-development-company-usa">USA (Eastern)</a></td><td>We are 9.5 to 10.5 hours ahead</td><td>Your morning, our evening</td></tr>
            </tbody>
          </table>
          <p>The range depends on daylight saving in your country.</p>
        </div>
      </div>
    </section>'''

# Overseas client work shown on market pages.
INTL_WORK = ['wee-care-solutions-kitchen-appliances', 'stashfin-kitchen-appliances', 'storaazi-beauty-catalogue']

MARKETS = [
  dict(url='/software-development-company-usa', code='US', country='United States', short='USA', flag='US',
       title='Software Development Company for US Businesses | Apps, Web and AI | QivaLabs',
       desc='Software, mobile app, website and AI development for US startups and small businesses. Senior team, live US client sites, calls in your morning and a fixed quote in 48 hours.',
       h1='Software, app and AI development for US businesses.',
       lede='We build custom software, mobile apps, websites and AI agents for American startups and small businesses. You get one senior team, calls in your morning, and a fixed quote within 48 hours of your first message.',
       why=[('ph-flag', 'We already ship for US brands', 'Wee Care Solutions in Pottsboro, Texas and the Stashfin kitchenware brand both run on sites we designed and built. You can open them and click around.'),
            ('ph-clock', 'Your morning is our evening', 'Eastern time is 9.5 to 10.5 hours behind us. We hold calls between 8 and 11 am Eastern, and work continues while you sleep, so feedback you send at night is often done by morning.'),
            ('ph-currency-dollar', 'Fixed price for a fixed scope', 'You get a written scope, a timeline with milestones and one price. No open-ended hourly billing on a first project.'),
            ('ph-git-branch', 'You own everything', 'Source code, design files, domains and cloud accounts sit in your name. Weekly demo links show progress as it happens.'),
            ('ph-robot', 'AI where it pays', 'AI agents, chatbots and automation built on OpenAI, Anthropic or open models, with a short pilot first so you see results before you commit.'),
            ('ph-chat-circle-dots', 'One team, start to finish', 'The people on your discovery call are the people who design, build and support the product.')],
       tz='Eastern time is 9.5 hours behind India in summer and 10.5 hours in winter. Pacific time is 12.5 to 13.5 hours behind. In practice we overlap with your morning, and you get updates at the start of your day.',
       services=['custom-software-development', 'mobile-app-development', 'ai-integrated-automation', 'saas-product-development', 'website-design-development', 'ecommerce-solutions'],
       law_h='Contracts, data and compliance for US clients',
       law='''<p>We sign your NDA before we see anything sensitive, and the contract assigns all intellectual property to your company. The US has no single federal privacy law, so we build to the rules that apply to you: California's CCPA and CPRA if you collect data from California residents, HIPAA safeguards if you handle health information, and PCI DSS rules by keeping card data with Stripe or your payment provider rather than on your servers.</p>
<p>We host in a US region on AWS, Google Cloud, Azure or Vercel, in your account. Accessibility matters too: we design to WCAG 2.2 AA so your site works for every visitor and stands up better to ADA complaints.</p>''',
       faq=[('Why hire a team in India instead of a US agency?', 'Cost is the obvious reason. 2026 rate surveys put senior US developers at about $75 to $150 or more an hour, against roughly $18 to $45 in India. The real test is delivery: ask any offshore team for live work, references and how they handle time zones. We show you all three before you pay anything.'),
                ('Can you work with our in-house developers?', 'Yes. We can join your GitHub, Jira or Linear, follow your code review process and work as an extra squad, or take one product end to end.'),
                ('How do payments work?', 'Usually a deposit to start, then milestone payments as each part is delivered and approved. We invoice in US dollars.'),
                ('Do you sign NDAs and assign IP?', 'Yes. We sign your NDA before the first detailed call, and the contract assigns all code, designs and content to you.')]),
  dict(url='/software-development-company-uk', code='GB', country='United Kingdom', short='UK', flag='GB',
       title='Software and App Development Company for UK Businesses | QivaLabs',
       desc='Software, app, website and AI development for UK startups and SMEs. UK GDPR-aware contracts, 4 to 5 hours of working-day overlap and a fixed quote in 48 hours.',
       h1='Software and app development for UK businesses.',
       lede='We design and build web platforms, mobile apps, websites and AI automation for UK startups, agencies and SMEs. Our working day overlaps yours by four to five hours, and every project starts with a fixed quote.',
       why=[('ph-clock', 'A real overlap with your day', 'We are 4.5 hours ahead of the UK in summer and 5.5 in winter. Your morning and lunchtime are our afternoon, so stand-ups and reviews happen live.'),
            ('ph-shield-check', 'UK GDPR from day one', 'We sign a data processing agreement, keep personal data in a UK or EU region, and use the ICO transfer mechanisms when our team needs access.'),
            ('ph-handshake', 'White label for agencies', 'UK agencies use us as their build team. We work under your brand, in your tools, and never contact your client unless you want us to.'),
            ('ph-currency-gbp', 'Quotes in pounds', 'Written scope, milestones and a fixed price in GBP. No surprises on the invoice.'),
            ('ph-git-branch', 'You own the code', 'Repositories, design files and hosting accounts are in your name from the first commit.'),
            ('ph-robot', 'AI and automation', 'AI agents, chatbots and workflow automation that take repeat work off your team, starting with a short paid pilot.')],
       tz='The UK is 4.5 hours behind India during British Summer Time and 5.5 hours behind in winter. A 9 am start in London is 1:30 or 2:30 pm for us, so we share the whole of your morning and early afternoon.',
       services=['custom-software-development', 'website-design-development', 'mobile-app-development', 'ai-integrated-automation', 'ecommerce-solutions', 'dedicated-account-management'],
       law_h='Contracts, data and UK GDPR',
       law='''<p>Personal data of UK residents falls under the UK GDPR and the Data Protection Act 2018, and cookies and marketing emails under PECR. India does not have a UK adequacy decision, so when our team needs access to personal data we sign the ICO's International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual Clauses. Better still, the data itself stays in a UK region such as AWS London, in your account.</p>
<p>The contract assigns all intellectual property to you, we sign your NDA before the first detailed call, and we invoice in pounds.</p>''',
       faq=[('Can you work as a white-label partner for our agency?', 'Yes, it is one of the most common ways UK agencies work with us. You stay the client contact, and we design and build under your brand.'),
                ('How do you handle UK GDPR?', 'We sign a data processing agreement, keep production data in a UK or EU region, limit who can access it, and use the ICO transfer agreement for any access from India.'),
                ('How much cheaper is this than a UK agency?', 'Rate surveys for 2026 put UK and Western European developers at roughly $60 to $120 an hour, and Indian teams at about $18 to $45. Your saving depends on the project, so we give you a fixed quote you can compare like for like.'),
                ('Will we have the same people throughout?', 'Yes. The team on your discovery call stays on the project.')]),
  dict(url='/software-development-company-australia', code='AU', country='Australia', short='Australia', flag='AU',
       title='App and Software Development Company for Australian Businesses | QivaLabs',
       desc='Mobile apps, websites, custom software and AI automation for Australian startups and SMEs. Your afternoon is our morning, Privacy Act-aware builds and a fixed quote in 48 hours.',
       h1='App and software development for Australian businesses.',
       lede='We build mobile apps, websites, custom software and AI automation for Australian startups and small businesses. Your afternoon is our morning, and every project starts with a written scope and a fixed price in AUD.',
       why=[('ph-sun-horizon', 'Your afternoon, our morning', 'Sydney is 4.5 to 5.5 hours ahead of us. We start our day while you are still at work, so afternoon calls and same-day changes are normal.'),
            ('ph-currency-circle-dollar', 'Fixed price in AUD', 'One written scope, clear milestones and a fixed price in Australian dollars.'),
            ('ph-device-mobile', 'Apps that pass review', 'Flutter, React Native or native apps, tested on real devices and taken through App Store and Google Play review for you.'),
            ('ph-shield-check', 'Privacy Act-aware', 'We build to the Australian Privacy Principles and host in the Sydney or Melbourne cloud region when your data needs to stay onshore.'),
            ('ph-git-branch', 'You own it all', 'Code, designs, domains and cloud accounts are in your company\'s name.'),
            ('ph-robot', 'AI and automation', 'AI agents, chatbots and workflow automation, starting with a short pilot so you see the result before a full build.')],
       tz='Sydney is 5.5 hours ahead of India during Australian daylight saving and 4.5 hours ahead the rest of the year. Perth is 2.5 hours ahead. Your 2 pm in Sydney is our morning, so we overlap with your whole afternoon.',
       services=['mobile-app-development', 'website-design-development', 'custom-software-development', 'ai-integrated-automation', 'ecommerce-solutions', 'saas-product-development'],
       law_h='Contracts, data and the Privacy Act',
       law='''<p>If your business is covered by the Privacy Act 1988, the Australian Privacy Principles apply to how personal information is collected, stored and sent overseas. APP 8 makes you responsible for overseas recipients, so we sign a data handling agreement, keep production data in an Australian cloud region in your account, and limit access to the people who need it. We also design so you can meet the Notifiable Data Breaches scheme if something goes wrong.</p>
<p>All intellectual property is assigned to you, we sign your NDA before the first detailed call, and invoices are in Australian dollars.</p>''',
       faq=[('Can you build our app for both iPhone and Android?', 'Yes. Most clients choose Flutter or React Native, so one codebase runs on both platforms. We also take the app through App Store and Google Play review.'),
                ('Can our data stay in Australia?', 'Yes. We set up hosting in the AWS, Azure or Google Cloud Sydney or Melbourne regions, in your account.'),
                ('How do meetings work across the time difference?', 'We hold calls in your afternoon, which is our morning. Written updates and demo links arrive before you start your next day.'),
                ('How do payments work?', 'A deposit to start, then milestone payments as each part is approved. We invoice in AUD.')]),
  dict(url='/software-development-company-europe', code='EU', country='Europe', short='Europe', flag='EU',
       title='Software Development Partner for European Businesses | GDPR-Aware | QivaLabs',
       desc='Software, app, website and AI development for European startups and SMEs in Germany, the Netherlands, Ireland, France and beyond. GDPR-aware, EU hosting, fixed quotes in EUR.',
       h1='Software development for European businesses.',
       lede='We build web platforms, mobile apps, online stores and AI automation for startups and SMEs across Europe. Our day overlaps yours by five hours or more, data stays in EU regions, and every project starts with a fixed quote in euros.',
       why=[('ph-clock', 'Five or more hours of overlap', 'Central European Time is 3.5 to 4.5 hours behind us. Your whole morning and early afternoon are live working time together.'),
            ('ph-shield-check', 'GDPR built in', 'Data processing agreements, Standard Contractual Clauses for any access from India, and production data kept in an EU region in your account.'),
            ('ph-wheelchair', 'Accessibility Act ready', 'We design to WCAG 2.2 AA, which helps online stores and digital services meet the European Accessibility Act.'),
            ('ph-currency-eur', 'Fixed price in EUR', 'Written scope, milestones and one price in euros.'),
            ('ph-translate', 'Multilingual by default', 'Sites and apps built for several languages and currencies from the start, not bolted on later.'),
            ('ph-git-branch', 'You own the code', 'Repositories, designs and cloud accounts are in your name from the first day.')],
       tz='Central European Time (Berlin, Amsterdam, Paris) is 3.5 hours behind India in summer and 4.5 hours in winter. Ireland and Portugal follow UK time, 4.5 to 5.5 hours behind. A 9 am start in Berlin is 12:30 or 1:30 pm for us.',
       services=['custom-software-development', 'saas-product-development', 'ecommerce-solutions', 'website-design-development', 'ai-integrated-automation', 'mobile-app-development'],
       law_h='Contracts, data and GDPR',
       law='''<p>Personal data of people in the EU is covered by the GDPR. India has no EU adequacy decision, so when our team needs access we sign the European Commission's Standard Contractual Clauses alongside a data processing agreement. Production data stays in an EU region such as Frankfurt, Dublin or Amsterdam, in your cloud account.</p>
<p>The European Accessibility Act has applied since 28 June 2025 to many online shops and digital services, so we design and test to WCAG 2.2 AA. All intellectual property is assigned to you, and invoices are in euros.</p>''',
       faq=[('Which European countries do you work with?', 'Any of them. Most enquiries come from Germany, the Netherlands, Ireland and France, and we work in English.'),
                ('How do you handle GDPR when the team is in India?', 'We sign a data processing agreement and the EU Standard Contractual Clauses, keep production data in an EU region, and limit access to named people.'),
                ('Can you build multilingual sites and stores?', 'Yes. We set up language and currency handling from the start, with translations you or your agency supply.'),
                ('How is this different from a nearshore team in Eastern Europe?', 'Eastern European rates in 2026 run roughly $45 to $90 an hour for senior developers, India about $18 to $45. You lose an hour or two of overlap. We suggest comparing fixed quotes for the same scope.')]),
  dict(url='/app-development-company-dubai', code='AE', country='United Arab Emirates', short='Dubai and UAE', flag='AE',
       title='Mobile App and Website Development Company for Dubai and the UAE | QivaLabs',
       desc='Mobile app, website, ecommerce and AI development for businesses in Dubai, Abu Dhabi and across the UAE. Arabic and English, near-full working-day overlap, fixed quote in 48 hours.',
       h1='Mobile app, website and AI development for Dubai and the UAE.',
       lede='We build mobile apps, websites, online stores and AI chatbots for businesses in Dubai, Abu Dhabi and Sharjah. We are only 1.5 hours ahead of you, we build in Arabic and English, and every project starts with a fixed quote in AED.',
       why=[('ph-clock', 'Almost the same working day', 'The UAE is 1.5 hours behind India, with no daylight saving. Your whole Monday to Friday is our working day too.'),
            ('ph-translate', 'Arabic and English', 'Right-to-left layouts, Arabic typography and bilingual content built in from the first screen.'),
            ('ph-whatsapp-logo', 'WhatsApp-first', 'Customers in the UAE live on WhatsApp. We build WhatsApp ordering, booking and support bots on the official Business API.'),
            ('ph-storefront', 'Stores that sell', 'Ecommerce sites with local payment gateways, cash on delivery and courier integrations.'),
            ('ph-currency-circle-dollar', 'Fixed price in AED', 'A written scope, clear milestones and a fixed price in dirhams.'),
            ('ph-robot', 'AI chatbots and agents', 'AI assistants for real estate, clinics, retail and services that answer in Arabic and English and pass hot leads to your team.')],
       tz='The UAE runs on Gulf Standard Time (UTC+4) all year, 1.5 hours behind India. Since 2022 the UAE works Monday to Friday, the same week as us, so nearly the whole working day overlaps.',
       services=['mobile-app-development', 'website-design-development', 'ecommerce-solutions', 'ai-integrated-automation', 'business-automation', 'custom-software-development'],
       law_h='Contracts, data and UAE rules',
       law='''<p>Personal data on the UAE mainland is covered by Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the PDPL). Companies in the DIFC and ADGM follow their own data protection laws instead. The PDPL's executive regulations had still not been published in 2026, but we build to its principles now: clear consent, limited access and secure hosting, with a UAE cloud region in your account when your data must stay in the country.</p>
<p>The contract assigns all intellectual property to you, we sign your NDA before the first detailed call, and invoices are in AED.</p>''',
       faq=[('Do you build apps in Arabic?', 'Yes. We build bilingual Arabic and English apps and websites with proper right-to-left layouts.'),
                ('Can you integrate UAE payment gateways?', 'Yes. We connect the gateway your bank or provider supports, plus Apple Pay, Google Pay and cash on delivery where you need them.'),
                ('Do you work with businesses in Abu Dhabi and Sharjah too?', 'Yes, anywhere in the UAE and the wider GCC. Projects run online, with calls in your working hours.'),
                ('How long does a mobile app take?', 'A first version usually takes 10 to 16 weeks, depending on features. You get a timeline with milestones in the fixed quote.')]),
]

def market_page(m):
    why = ''.join(f'<div class="card" data-reveal><span class="card__icon"><i class="ph-bold {ic}" aria-hidden="true"></i></span><h3 class="mt-3">{esc(t)}</h3><p class="mt-2">{esc(b)}</p></div>' for ic, t, b in m['why'])
    svc_names = dict(FOOT_SERVICES + [('saas-product-development', 'SaaS product development'), ('dedicated-account-management', 'Dedicated development team'), ('ecommerce-solutions', 'E-commerce development')])
    svcs = ''.join(f'<a class="card product" href="/services/{s}" data-reveal><h3>{esc(svc_names.get(s, s.replace("-", " ").capitalize()))}</h3><span class="tag tag--lime mt-2">See the service</span></a>' for s in m['services'])
    work = '\n'.join(work_card(p, i + 1) for i, p in enumerate([x for s in INTL_WORK for x in PROJECTS if x['slug'] == s]))
    faq = ''.join(f'<details class="card" data-reveal><summary style="cursor:pointer;font-family:var(--font-heading);font-weight:700;">{esc(q)}</summary><p class="mt-2">{esc(a)}</p></details>' for q, a in m['faq'])
    others = ' · '.join(f'<a href="{x["url"]}">{x["short"]}</a>' for x in MARKETS if x['url'] != m['url'])
    return f'''    <section class="hero">
      <div class="container hero__content">
        <nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> / <span>{esc(m['short'])}</span></nav>
        <span class="eyebrow" data-reveal>Region select: {esc(m['short'])}</span>
        <h1 data-text-reveal>{esc(m['h1'])}</h1>
        <p class="lede" data-reveal>{esc(m['lede'])}</p>
        <div class="cluster mt-4" data-reveal><a href="/contact" class="btn btn--primary" data-magnetic>Get a fixed quote <i class="ph-bold ph-arrow-right" aria-hidden="true"></i></a><a href="/portfolio" class="btn btn--ghost">See the work</a></div>
        <div class="float-badges" data-reveal><span class="tag tag--lime">48h quote</span><span class="tag">You own the code</span><span class="tag tag--pink">Senior team</span></div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal><span class="eyebrow">Why us</span><h2 class="mt-3">Why {esc(m['short'])} companies work with us.</h2></div>
        <div class="grid grid--3" data-reveal-group>{why}</div>
      </div>
    </section>
    <section class="section section--deep">
      <div class="container" style="max-width:56rem;">
        <div class="section-head" data-reveal><span class="eyebrow">Time zones</span><h2 class="mt-3">How our hours line up with yours.</h2></div>
        <p class="lede" data-reveal>{esc(m['tz'])}</p>
        <p class="mt-3" data-reveal>Full table on the <a href="/contact">contact page</a>.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="section-head" data-reveal><span class="eyebrow">Most requested</span><h2 class="mt-3">What {esc(m['short'])} clients ask us to build.</h2></div>
        <div class="grid grid--3" data-reveal-group>{svcs}</div>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container">
        <div class="section-head" data-reveal><span class="eyebrow">Overseas clients</span><h2 class="mt-3">Live work for clients outside India.</h2><p>Hover a preview to pause it. Click to read the case study.</p></div>
        <div class="work-grid">
{work}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container" style="max-width:56rem;">
        <div class="section-head" data-reveal><span class="eyebrow">The fine print</span><h2 class="mt-3">{esc(m['law_h'])}</h2></div>
        <div class="prose" data-reveal>{m['law']}
<p>Want the numbers first? Read our guides to <a href="/blog/outsourcing-software-development-to-india-guide">outsourcing software development to India</a> and <a href="/blog/app-development-cost-2026">app development cost in 2026</a>.</p></div>
      </div>
    </section>
    <section class="section section--alt">
      <div class="container" style="max-width:56rem;">
        <div class="section-head" data-reveal><span class="eyebrow">FAQ</span><h2 class="mt-3">Questions {esc(m['short'])} clients ask.</h2></div>
        <div class="stack">{faq}</div>
        <p class="mt-4" style="font-size:.95rem;">Other regions: {others}</p>
      </div>
    </section>
    <section class="section section--amber">
      <div class="container text-center">
        <p class="pixel" style="font-size:.8rem;">INSERT COIN TO CONTINUE</p>
        <h2 class="mt-2">Tell us what you want to build.</h2>
        <p class="lede mt-2">Send a short brief. You get a written scope, a timeline and a fixed price within 48 hours.</p>
        <div class="cluster mt-4" style="justify-content:center;"><a href="/contact" class="btn btn--primary">Start a project</a><a href="mailto:{EMAIL}" class="btn btn--ghost">Email {EMAIL}</a></div>
      </div>
    </section>'''

def market_ld(m):
    area = {"@type": "Country", "name": m['country']} if m['code'] != 'EU' else [{"@type": "Country", "name": n} for n in ["Germany", "Netherlands", "Ireland", "France", "Spain", "Italy", "Belgium", "Sweden"]]
    return [breadcrumbs([('Home', '/'), (m['short'], m['url'])]),
            {"@context": "https://schema.org", "@type": "Service", "name": m['h1'].rstrip('.'), "serviceType": "Software, mobile app, website and AI development", "provider": {"@id": SITE + "/#org"}, "areaServed": area, "url": SITE + m['url'], "description": m['desc']},
            {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in m['faq']]}]

def regions_section():
    cards = ''.join(f'<a class="card product" href="{m["url"]}" data-reveal><span class="pixel" style="font-size:.7rem;color:var(--lime);">REGION {i + 1:02d}</span><h3 class="mt-2">{esc(m["short"])}</h3><p>{esc(m["tz"].split(". ")[0])}.</p></a>' for i, m in enumerate(MARKETS))
    cards += '<a class="card product" href="/contact" data-reveal><span class="pixel" style="font-size:.7rem;color:var(--pink);">ANYWHERE ELSE</span><h3 class="mt-2">Somewhere else?</h3><p>We work fully online. Send a brief and we will find hours that suit you.</p></a>'
    return f'''
    <section class="section section--deep">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="eyebrow">Choose your region</span>
          <h2 class="mt-3">Built in India. Shipped worldwide.</h2>
          <p>Our focus is clients in the USA, UK, Australia, Europe and the UAE. Pick your region to see time zones, contracts and the work we have shipped for overseas clients.</p>
        </div>
        <div class="grid grid--3" data-reveal-group>{cards}</div>
      </div>
    </section>
'''

TITLES = {
    '/services/mobile-app-development': ('Mobile App Development Company in Udaipur | Android and iOS | QivaLabs', 'Mobile app development company in Udaipur building Android, iOS and cross-platform apps for startups and businesses across Rajasthan and India. Get a fixed quote in 48 hours.'),
    '/services/website-design-development': ('Website Design and Development Company in Udaipur | QivaLabs', 'Website design and development company in Udaipur. Fast, mobile-first business websites, landing pages and e-commerce stores built to rank on Google and turn visitors into leads.'),
    '/services/custom-software-development': ('Custom Software Development Company in Udaipur, India | QivaLabs', 'Custom software development in Udaipur for businesses across India: web apps, internal tools, billing and inventory systems built around how your team works. Fixed quote in 48 hours.'),
    '/services/crm-erp-solutions': ('ERP and CRM Software Development for Small Business in India | QivaLabs', 'ERP, CRM and inventory management software for small and mid-sized businesses in Udaipur and across India. Custom or ready-made, with billing, stock, sales and HR in one system.'),
    '/services/cloud-solutions-migration': ('Cloud Migration Services for Small Business in India | QivaLabs', 'Cloud migration for small businesses in India: move from shared hosting or office servers to AWS, Azure or Google Cloud with backups, security and predictable monthly costs.'),
    '/services/ai-integrated-automation': ('AI Automation and AI Chatbot Development in India | QivaLabs', 'AI automation and AI chatbot development for Indian businesses: WhatsApp and website chatbots, document processing and AI that plugs into your CRM. Built in Udaipur.'),
    '/services/business-automation': ('WhatsApp Business API and Business Automation Services | QivaLabs', 'Business automation with the WhatsApp Business API, n8n and custom workflows: automatic orders, reminders, invoices and reports for small businesses in India.'),
    '/services/cybersecurity-solutions': ('Cyber Security Services in Udaipur | Audits and Hardening | QivaLabs', 'Cyber security services in Udaipur: security audits, vulnerability scans, website hardening and secure setup for small and mid-sized businesses across India.'),
    '/services/loan-origination-software': ('Loan Origination Software (LOS) Development in India | QivaLabs', 'Loan origination software for NBFCs and lenders in India: digital onboarding, KYC, credit rules, approvals and disbursal workflows, including auto and car loan LOS.'),
    '/services/ecommerce-solutions': ('E-commerce Website Development Company in Udaipur | QivaLabs', 'E-commerce website development in Udaipur: online stores with payments, inventory, shipping and WhatsApp order updates for brands selling in India and abroad.'),
    '/services/seo-performance-optimization': ('SEO Services in Udaipur | Local SEO and Site Speed | QivaLabs', 'SEO services in Udaipur: technical SEO, local SEO, Google Business Profile, content and page-speed work that helps small businesses rank and get calls.'),
    '/portfolio/qiva-pos-demo': ('Billing Software for Restaurants and Shops in India | Free Qiva POS Demo', 'Try Qiva POS free: billing software for restaurants and retail shops in India with GST invoices, barcode billing, inventory, kitchen orders and sales reports.'),
    '/portfolio/qivalabs-school-connect': ('School Management Software in India | QivaLabs School Connect', 'School Connect is school management software for India: attendance, online fee payment, notices, homework, results and parent updates on WhatsApp.'),
    '/about': ('About QivaLabs | Software Development Company in Udaipur', 'QivaLabs LLP is a DPIIT-recognised software and digital solutions company in Udaipur, Rajasthan, building websites, apps, ERP and AI automation for businesses in India and abroad.'),
    '/contact': ('Contact QivaLabs | Get a Software or Website Quote in 48 Hours', 'Contact QivaLabs in Udaipur for website, app, ERP or AI automation projects. Call +91 72318 73730 or email sales@qivalabs.com. Written quote within 48 hours.'),
    '/services': ('31 Software, App and Website Development Services | QivaLabs Udaipur', 'All QivaLabs services: website design, mobile apps, custom software, ERP and CRM, AI automation, cloud, cyber security, SEO and support, from one team in Udaipur.'),
}

# ---------------------------------------------------------------- build
def extract(s, pat, flags=re.S):
    m = re.search(pat, s, flags); return m.group(1) if m else ''

def build():
    posts = load_posts()
    written = []
    skip = {'index.html', '404.html', 'portfolio/index.html'}
    for f in sorted(ROOT.rglob('*.html')):
        rel = f.relative_to(ROOT).as_posix()
        if rel.startswith(('node_modules/', 'tools/', 'blog/', 'server/', 'content/')) or rel in skip or '/' + rel[:-5] in [m['url'] for m in MARKETS]: continue
        s = f.read_text()
        main = extract(s, r'<main id="main">\n?(.*?)\n?\s*</main>')
        if not main: print('no main', rel); continue
        url = clean_url('/' + rel)
        title = html.unescape(extract(s, r'<title>(.*?)</title>'))
        desc = html.unescape(extract(s, r'<meta name="description" content="(.*?)"'))
        if url in TITLES: title, desc = TITLES[url]
        if url in GLOBAL_TITLES: title, desc = GLOBAL_TITLES[url]
        elif rel.startswith('services/') or rel in ('about.html', 'contact.html'): title, desc = globalize_meta(title), globalize_meta(desc)
        lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
        lds = [fix_links(x) for x in lds]
        robots = extract(s, r'<meta name="robots" content="(.*?)"') or 'index, follow'
        main = fix_links(main)
        if rel.startswith('services/') or rel in ('about.html', 'contact.html'):
            main = globalize(main)
            lds = [globalize(x).replace('"areaServed":"IN"', '"areaServed":' + json.dumps(AREA_SERVED)) for x in lds]
        if rel == 'contact.html':
            main = re.sub(r'\s*<section class="section section--alt">\s*<div class="container" style="max-width:62rem;">\s*<div class="section-head" data-reveal><span class="eyebrow">Time zones</span>.*?</section>', '', main, flags=re.S) + CONTACT_TZ
        # animated preview on case-study pages
        if rel.startswith('portfolio/'):
            slug = rel[len('portfolio/'):-5]
            p = next((x for x in PROJECTS if x['slug'] == slug), None)
            main = re.sub(r'\s*<section class="section pv-feature"[^>]*>.*?</section>', '', main, flags=re.S)
            if p:
                feat = f'\n    <section class="section pv-feature" style="padding-bottom:0;"><div class="container" style="max-width:980px;" data-reveal>{preview(p, big=True)}<p class="pixel text-center mt-3" style="font-size:.68rem;color:var(--muted);">LIVE PREVIEW · HOVER TO PAUSE</p></div></section>'
                main = re.sub(r'(</section>)', r'\1' + feat, main, count=1)
        ogi = None
        if rel.startswith('portfolio/'):
            p = next((x for x in PROJECTS if x['slug'] == rel[10:-5]), None)
            if p and p.get('img') and p['img'] != 'pos': ogi = f"{SITE}/assets/img/portfolio/{p['img']}-og.jpg"
        out = page(url, title, desc, main, lds, og_image=ogi, robots=robots)
        f.write_text(out)
        if 'noindex' not in robots: written.append(url)
    # market pages
    for m in MARKETS:
        (ROOT / (m['url'].strip('/') + '.html')).write_text(page(m['url'], m['title'], m['desc'], market_page(m), market_ld(m)))
        written.append(m['url'])
    # home
    ld_home = [ORG, {"@context": "https://schema.org", "@type": "WebSite", "@id": SITE + "/#website", "url": SITE + "/", "name": "QivaLabs", "publisher": {"@id": SITE + "/#org"}},
               {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ]}]
    (ROOT / 'index.html').write_text(page('/', 'QivaLabs | Software, App and AI Development Company for US, UK and UAE Businesses',
        'QivaLabs builds custom software, mobile apps, websites and AI agents for startups and businesses in the USA, UK, Australia, Europe and Dubai. Senior team, live overseas client work, fixed quote in 48 hours.', home(posts), ld_home))
    written.insert(0, '/')
    # portfolio index
    ld_pf = [breadcrumbs([('Home', '/'), ('Portfolio', '/portfolio')]), {"@context": "https://schema.org", "@type": "ItemList", "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": SITE + '/portfolio/' + p['slug'], "name": p['name']} for i, p in enumerate(PROJECTS)]}]
    (ROOT / 'portfolio' / 'index.html').write_text(page('/portfolio', 'Portfolio | Websites, Apps and Software We Built | QivaLabs',
        'QivaLabs portfolio: live websites, mobile apps, billing software, school software and AI automation built for clients in the USA and India. Every project shown with an animated preview.', portfolio_index(), ld_pf))
    written.append('/portfolio')
    # blog
    bdir = ROOT / 'blog'; bdir.mkdir(exist_ok=True)
    for old in bdir.glob('*.html'): old.unlink()
    ld_b = [breadcrumbs([('Home', '/'), ('Blog', '/blog')]), {"@context": "https://schema.org", "@type": "Blog", "name": "QivaLabs Blog", "url": SITE + "/blog", "publisher": {"@id": SITE + "/#org"}}]
    (bdir / 'index.html').write_text(page('/blog', 'Blog | Software, App and AI Development Guides | QivaLabs',
        'Guides from QivaLabs on app and software development cost, AI agents, outsourcing to India, ERP vs CRM, cloud migration and automation, for businesses in the US, UK, Australia, Europe and the UAE.', blog_index(posts), ld_b))
    written.append('/blog')
    for p in posts:
        url = '/blog/' + p['slug']
        ld = [breadcrumbs([('Home', '/'), ('Blog', '/blog'), (p['title'], url)]),
              {"@context": "https://schema.org", "@type": "BlogPosting", "headline": p['title'], "description": p['description'], "datePublished": p['date'], "dateModified": p.get('updated', p['date']),
               "author": {"@type": "Person", "name": "Rajamuddin", "jobTitle": "Founder and CTO", "url": SITE + "/about"}, "publisher": {"@id": SITE + "/#org"},
               "mainEntityOfPage": SITE + url, "image": SITE + "/assets/img/og-image.png", "keywords": p.get('keywords', ''), "articleSection": p['category'], "inLanguage": "en"}]
        (bdir / (p['slug'] + '.html')).write_text(page(url, p['seo_title'], p['description'], render_post(p, posts), ld, og_type='article'))
        written.append(url)
    # 404
    nf = '''    <section class="hero hero--center notfound">
      <div class="container hero__content">
        <h1>404</h1>
        <h2 class="mt-3">This level doesn't exist.</h2>
        <p class="lede mt-2">The page moved or never spawned. Squash a few bugs while you're here, or head back.</p>
        <div class="cluster mt-4" style="justify-content:center;"><a href="/" class="btn btn--primary">Back to home</a><a href="/services" class="btn btn--ghost">Our services</a></div>
        <div style="max-width:620px;margin:3rem auto 0;" data-bug-game></div>
      </div>
    </section>'''
    (ROOT / '404.html').write_text(page('/404', 'Page not found | QivaLabs', 'This page could not be found.', nf, robots='noindex, follow'))
    # sitemap
    pri = lambda u: '1.0' if u == '/' else ('0.9' if u in ('/services', '/portfolio', '/contact', '/blog') or u in TITLES or u in GLOBAL_TITLES or u in [m['url'] for m in MARKETS] else ('0.8' if u.startswith(('/services/', '/blog/')) else '0.6'))
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    seen = set()
    for u in written:
        if u in seen or u == '/404': continue
        seen.add(u); sm.append(f'  <url><loc>{SITE}{u if u != "/" else "/"}</loc><lastmod>{TODAY}</lastmod><priority>{pri(u)}</priority></url>')
    sm.append('</urlset>'); (ROOT / 'sitemap.xml').write_text('\n'.join(sm) + '\n')
    (ROOT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /demo/\n\nSitemap: {SITE}/sitemap.xml\n')
    # llms.txt
    lines = ['# QivaLabs', '', '> QivaLabs LLP is a software, mobile app, website and AI development company based in Udaipur, India. It builds custom software, mobile apps, websites, SaaS products, AI agents and automation for startups and businesses in the USA, UK, Australia, Europe and the UAE, as well as India. Contact: ' + EMAIL + ', ' + PHONE + '.', '', '## Key pages']
    for u in ['/services', '/portfolio', '/blog', '/about', '/contact']: lines.append(f'- [{u.strip("/").title()}]({SITE}{u})')
    lines += ['', '## Regions'] + [f'- [{m["h1"].rstrip(".")}]({SITE}{m["url"]})' for m in MARKETS]
    lines += ['', '## Services'] + [f'- [{t}]({SITE}/services/{s})' for s, t in FOOT_SERVICES] + ['', '## Articles'] + [f'- [{p["title"]}]({SITE}/blog/{p["slug"]})' for p in posts]
    (ROOT / 'llms.txt').write_text('\n'.join(lines) + '\n')
    print('pages', len(written), 'posts', len(posts))

if __name__ == '__main__':
    build()
