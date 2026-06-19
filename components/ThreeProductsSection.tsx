'use client';

import ScrollReveal from './ScrollReveal';
import ServiceCard from './ServiceCard';

const PRODUCTS = [
  {
    tag: 'QIVA',
    tagColor: 'rgba(124,92,255,0.15)',
    title: 'Mandi WhatsApp Automation',
    description:
      'Replace your ₹10,000–₹15,000/month WhatsApp employee with three AI bots that run under your own WhatsApp number — not QivaLabs-branded. 24/7, in Hinglish.',
    bullets: [
      'Customer Bot — handles queries, daily rates, and orders',
      'Supplier Bot — stock tracking, payments, delivery updates',
      'Owner Bot — real-time insights on sales, dues & stock on demand',
      'Personalized Hinglish ("Ramesh bhai, hamesha 50kg lete ho")',
      '₹20,000 setup + ₹4,000/month — saves ₹6–11k every month',
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
      'An AI layer that sits on top of your existing CRM — not a replacement. Triages inbound emails and messages automatically so your team spends time closing deals, not sorting tickets.',
    bullets: [
      'Tier 1: Fully auto-resolved (high-confidence responses)',
      'Tier 2: AI-drafted, agent-reviewed before sending',
      'Tier 3: Escalated to humans — no bottleneck, ever',
      'Built for teams already running support/sales operations',
      'Cuts triage time without replacing your existing stack',
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
      "India's first AI ad marketplace that monetizes the wait time inside developer tools — the idle seconds while your AI coding assistant thinks. A standalone product with its own platform.",
    bullets: [
      'Targets developers during tool idle/wait states',
      'Non-intrusive — reaches users when they\'re already paused',
      'Standalone platform at waitjiai.in',
      'Separate product, separate site — built by QivaLabs',
    ],
    ctaLabel: 'Visit waitjiai.in',
    ctaHref: 'https://waitjiai.in',
    external: true,
    accentColor: '#FF7849',
    glowColor: 'rgba(255, 120, 73, 0.12)',
    delay: 0.2,
  },
];

export default function ThreeProductsSection() {
  return (
    <section className="relative py-24 overflow-hidden" aria-labelledby="products-heading">

      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124, 92, 255, 0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-16">
          <p className="text-accent-violet text-sm font-semibold uppercase tracking-[0.15em] mb-3 font-mono-accent">
            Three Products, One Partner
          </p>
          <h2
            id="products-heading"
            className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight"
          >
            AI systems for every layer of your business.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Whether you run a mandi, a support team, or a developer-tool startup — QivaLabs has
            a purpose-built AI product for you.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <ServiceCard key={product.tag} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
