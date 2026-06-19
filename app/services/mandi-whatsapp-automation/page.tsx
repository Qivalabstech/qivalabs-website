import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import WhatsAppMockup from '@/components/WhatsAppMockup';
import CTABand from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'Mandi WhatsApp Automation (QIVA) — AI Staff for Wholesale Trade | QivaLabs',
  description:
    'Replace your ₹10,000–₹15,000/month WhatsApp employee with QIVA — three AI bots (Customer, Supplier, Owner) that handle orders, rates, and payments 24/7 in mandi Hinglish. ₹20,000 setup + ₹4,000/month.',
  keywords: [
    'mandi WhatsApp automation',
    'WhatsApp AI bot for mandi business',
    'AI staff replacement India',
    'wholesale trade WhatsApp bot',
    'QIVA bot',
    'AI mandi software',
    'Hinglish AI bot WhatsApp',
  ],
  openGraph: {
    title: 'Mandi WhatsApp Automation — QIVA | QivaLabs',
    description:
      'Three AI bots. Your WhatsApp number. 24/7 in Hinglish. Replace ₹15k/month staff for ₹4,000/month. Business badho, cost nahi.',
  },
};

const BOTS = [
  {
    name: 'Customer Bot',
    color: '#7C5CFF',
    desc: 'Handles all incoming customer messages on your WhatsApp — daily rates, stock availability, order placement, and delivery tracking. Remembers each customer\'s history and preferences.',
    features: [
      'Sends daily rate cards automatically at your set time',
      'Accepts and confirms orders with quantity, price, and delivery slot',
      'Handles payment follow-ups without awkward conversations',
      'Responds in Hinglish that matches the customer\'s own tone',
      'Remembers order history: "Ramesh bhai, aapka usual 50kg?"',
    ],
  },
  {
    name: 'Supplier Bot',
    color: '#22D3EE',
    desc: 'Manages communication with your suppliers — tracks deliveries, confirms stock levels, and handles payment status queries so you never lose a supplier relationship over a missed reply.',
    features: [
      'Confirms delivery schedules and ETAs with suppliers',
      'Tracks pending dues and payment status on both sides',
      'Sends stock-in confirmations to the owner when goods arrive',
      'Handles supplier queries 24/7, even on weekends',
      'Escalates disputes directly to the owner\'s WhatsApp',
    ],
  },
  {
    name: 'Owner Bot',
    color: '#FF7849',
    desc: 'Your personal business intelligence layer on WhatsApp. Ask it anything about your business at any time — pending orders, total dues, top customers, today\'s revenue — and get an instant answer.',
    features: [
      '"Aaj kitna order aaya?" — instant daily summary on demand',
      'Shows pending dues from customers and to suppliers',
      'Alerts you to large orders, low stock, or payment delays',
      'Weekly and monthly performance summaries sent automatically',
      'No dashboard to log into — everything on your phone',
    ],
  },
];

const PRICING_INCLUSIONS = [
  'All three bots (Customer, Supplier, Owner)',
  'Runs on your existing WhatsApp Business number',
  'Trained on your customer/supplier data during onboarding',
  'Personalized Hinglish responses, not generic templates',
  'Unlimited messages — no per-chat billing',
  'Setup complete in under 30 minutes',
  'Monthly rate catalogue updates',
  'WhatsApp support from QivaLabs team',
  'Owner Bot dashboard on your phone',
  'No long-term contract — cancel with 30 days notice',
];

const mandiJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Mandi WhatsApp Automation (QIVA)',
  description:
    'AI-powered WhatsApp automation for Indian mandi and wholesale trade businesses. Three bots — Customer, Supplier, Owner — replacing human WhatsApp staff.',
  brand: { '@type': 'Brand', name: 'QivaLabs' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '4000',
    priceValidUntil: '2027-01-01',
    description: '₹20,000 one-time setup + ₹4,000/month subscription',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://qivalabs.com/services' },
      { '@type': 'ListItem', position: 3, name: 'Mandi WhatsApp Automation', item: 'https://qivalabs.com/services/mandi-whatsapp-automation' },
    ],
  },
};

export default function MandiAutomationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mandiJsonLd) }}
      />

      <Navbar />

      <main className="pt-28 pb-0">

        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-text-muted mb-8 font-mono-accent" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-text-primary">Mandi WhatsApp Automation</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <span className="tag mb-4 inline-flex" style={{ background: 'rgba(124,92,255,0.15)', color: '#A78BFA', borderColor: 'rgba(124,92,255,0.35)' }}>
                  QIVA — Mandi WhatsApp Automation
                </span>
                <h1
                  className="font-heading font-bold text-text-primary mb-6 leading-[1.05]"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
                >
                  Replace your{' '}
                  <span className="gradient-text-violet-cyan">₹15,000/month</span>{' '}
                  WhatsApp employee with AI.
                </h1>
                <p className="text-text-muted text-lg leading-relaxed mb-6">
                  Three AI bots — Customer, Supplier, Owner — that run on your own WhatsApp number,
                  speak mandi Hinglish, remember every relationship, and handle orders, rates, and
                  payments 24 hours a day, 7 days a week.
                </p>
                <p
                  className="font-heading font-bold text-2xl mb-8"
                  style={{
                    background: 'linear-gradient(135deg, #FF7849, #FFB347)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  &ldquo;Business badho, cost nahi.&rdquo;
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/enroll-mandi"
                    className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base"
                    style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
                  >
                    Enroll for Mandi Automation →
                  </Link>
                  <a
                    href="https://wa.me/917231873730?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20QIVA%20Mandi%20WhatsApp%20Automation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-text-primary text-base border transition-all duration-200 hover:border-accent-violet"
                    style={{ borderColor: 'rgba(124, 92, 255, 0.3)', background: 'rgba(124, 92, 255, 0.06)' }}
                  >
                    Ask on WhatsApp
                  </a>
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  {['₹20,000 one-time setup', '₹4,000/month', '24/7 uptime', 'Your WhatsApp number', 'Hindi / Hinglish'].map((pill) => (
                    <span
                      key={pill}
                      className="text-xs px-3 py-1 rounded-full text-text-muted font-mono-accent"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="flex justify-center lg:justify-end">
                <WhatsAppMockup />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Three Bots */}
        <section className="py-16" aria-labelledby="bots-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 id="bots-heading" className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
                Three bots. One WhatsApp number.
              </h2>
              <p className="text-text-muted mt-4 max-w-2xl mx-auto">
                All three run under your business&apos;s own WhatsApp identity — customers and suppliers
                never know they&apos;re talking to AI.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {BOTS.map((bot) => (
                <StaggerItem key={bot.name}>
                  <div
                    className="glass rounded-2xl p-7 flex flex-col gap-4 h-full"
                    style={{ borderColor: `${bot.color}30` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl"
                      style={{ background: `${bot.color}20`, color: bot.color }}
                    >
                      🤖
                    </div>
                    <h3 className="font-heading font-bold text-text-primary text-xl" style={{ color: bot.color }}>
                      {bot.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">{bot.desc}</p>
                    <ul className="flex flex-col gap-2 mt-auto">
                      {bot.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                          <span style={{ color: bot.color }} className="flex-shrink-0 font-bold mt-0.5">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Pricing */}
        <section className="py-16" aria-labelledby="pricing-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,92,255,0.12), rgba(34,211,238,0.06))',
                  border: '1px solid rgba(124, 92, 255, 0.3)',
                  boxShadow: '0 0 80px rgba(124, 92, 255, 0.1)',
                }}
              >
                <div className="px-8 pt-8 pb-6 border-b border-[rgba(124,92,255,0.2)]">
                  <span id="pricing-heading" className="text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block font-mono-accent" style={{ background: 'rgba(124,92,255,0.2)', color: '#A78BFA' }}>
                    QIVA — Simple Pricing
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-3">
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-heading font-bold text-5xl text-text-primary">₹4,000</span>
                        <span className="text-text-muted text-lg">/month</span>
                        <span className="text-sm px-3 py-0.5 rounded-full ml-2" style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}>
                          + ₹20,000 one-time setup
                        </span>
                      </div>
                      <p className="text-text-muted text-sm mt-2">No hidden charges. No per-message billing. No feature tiers.</p>
                    </div>
                    <Link
                      href="/enroll-mandi"
                      className="btn-glow flex-shrink-0 px-7 py-3.5 rounded-full font-semibold text-white"
                      style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
                    >
                      Enroll Now →
                    </Link>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-5 font-mono-accent">
                    Everything included
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {PRICING_INCLUSIONS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted">
                        <span className="mt-0.5 text-accent-cyan font-bold flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mx-8 mb-8 rounded-2xl p-5" style={{ background: 'rgba(255, 120, 73, 0.07)', border: '1px solid rgba(255, 120, 73, 0.2)' }}>
                  <p className="text-sm text-text-muted leading-relaxed">
                    <strong className="text-text-primary">ROI in plain math:</strong>{' '}
                    A human WhatsApp employee costs ₹10,000–₹15,000/month. QIVA costs ₹4,000/month.
                    You save{' '}
                    <strong style={{ color: '#FF7849' }}>₹6,000–₹11,000 every single month</strong> — and
                    your setup fee is recovered in the <strong className="text-text-primary">first 2–3 months.</strong>
                  </p>
                </div>
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
