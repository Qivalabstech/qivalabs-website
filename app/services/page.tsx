import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import CTABand from '@/components/CTABand';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'Services — AI Business Solutions | QivaLabs',
  description:
    'QivaLabs offers three AI products: Mandi WhatsApp Automation (AI staff for wholesale trade), AI CRM Automation (intelligent triage for support teams), and WaitJI AI (monetize dev-tool wait time).',
  openGraph: {
    title: 'Services — AI Business Solutions | QivaLabs',
    description:
      'Mandi WhatsApp Automation, AI CRM Automation, WaitJI AI — three purpose-built AI products from QivaLabs, your AI business solutions partner.',
  },
};

const SERVICES = [
  {
    tag: 'QIVA',
    tagColor: 'rgba(124,92,255,0.15)',
    title: 'Mandi WhatsApp Automation',
    description:
      'Three AI bots — Customer, Supplier, Owner — that replace your ₹10,000–₹15,000/month WhatsApp employee and run 24/7 under your own number, in Hinglish.',
    bullets: [
      'Customer Bot handles orders, daily rates, payment follow-ups',
      'Supplier Bot manages stock tracking, deliveries, dues',
      'Owner Bot delivers daily insights and on-demand analytics via WhatsApp',
      'Remembers every relationship ("Ramesh bhai, hamesha 50kg lete ho")',
      'White-labeled under your WhatsApp number — not QivaLabs-branded',
      '₹20,000 one-time setup + ₹4,000/month',
    ],
    ctaLabel: 'Enroll for Mandi Automation',
    ctaHref: '/enroll-mandi',
    accentColor: '#7C5CFF',
    glowColor: 'rgba(124, 92, 255, 0.15)',
    delay: 0,
  },
  {
    tag: 'CRM AI',
    tagColor: 'rgba(34,211,238,0.12)',
    title: 'AI CRM Automation',
    description:
      'An intelligent AI layer that sits on top of your existing CRM — not a replacement. Triages inbound messages and emails automatically so your team focuses on high-value work.',
    bullets: [
      'Tier 1: Fully auto-resolved (high-confidence, no human needed)',
      'Tier 2: AI-drafted response — agent reviews and sends',
      'Tier 3: Escalated to human — complex or sensitive issues',
      'Works with Zoho, HubSpot, Freshdesk, custom setups',
      'Cuts response time and triage load without replacing your stack',
      'Built for teams running support or inside-sales operations',
    ],
    ctaLabel: 'Onboard for CRM Service',
    ctaHref: '/onboard-crm',
    accentColor: '#22D3EE',
    glowColor: 'rgba(34, 211, 238, 0.12)',
    delay: 0.1,
  },
  {
    tag: 'WAITJI',
    tagColor: 'rgba(255,120,73,0.12)',
    title: 'WaitJI AI',
    description:
      "India's first AI ad marketplace monetizing the idle seconds inside developer tools — the wait time while Claude Code, Copilot, or other AI coding assistants think.",
    bullets: [
      'Captures developer attention during natural wait/idle states',
      'Non-intrusive — reaches users at a natural pause point',
      'Full platform at waitjiai.in — separate product, separate site',
      'Built and maintained by the QivaLabs team',
    ],
    ctaLabel: 'Visit waitjiai.in',
    ctaHref: 'https://waitjiai.in',
    external: true,
    accentColor: '#FF7849',
    glowColor: 'rgba(255, 120, 73, 0.12)',
    delay: 0.2,
  },
];

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'QivaLabs Services',
  url: 'https://qivalabs.com/services',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://qivalabs.com/services' },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <Navbar />

      <main className="pt-28 pb-0">

        {/* Header */}
        <section className="relative py-16 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.07) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-text-muted mb-8 font-mono-accent" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text-primary">Services</span>
            </nav>

            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Our Products</span>
              <h1
                className="font-heading font-bold text-text-primary mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                Three products.<br />
                <span className="gradient-text-violet-cyan">One partner.</span>
              </h1>
              <p className="text-text-muted text-xl leading-relaxed max-w-3xl">
                Whether you trade commodities in a mandi, run a customer support team, or build developer
                tools — QivaLabs has a purpose-built AI product for you. Same team, same commitment to
                outcomes over demos.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Service cards */}
        <section className="py-10 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6 mb-20">
              {SERVICES.map((service) => (
                <ServiceCard key={service.tag} {...service} />
              ))}
            </div>

            {/* Deep-dive links */}
            <ScrollReveal className="text-center">
              <p className="text-text-muted text-sm mb-6">
                Want the full breakdown?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/services/mandi-whatsapp-automation"
                  className="px-6 py-3 rounded-full text-sm font-semibold border text-text-muted hover:text-text-primary hover:border-accent-violet transition-all"
                  style={{ borderColor: 'rgba(124,92,255,0.3)' }}
                >
                  Mandi Automation deep-dive →
                </Link>
                <Link
                  href="/services/ai-crm-automation"
                  className="px-6 py-3 rounded-full text-sm font-semibold border text-text-muted hover:text-text-primary hover:border-accent-cyan transition-all"
                  style={{ borderColor: 'rgba(34,211,238,0.3)' }}
                >
                  AI CRM deep-dive →
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
