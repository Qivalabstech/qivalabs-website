import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import CTABand from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'AI CRM Automation — Intelligent Triage for Support & Sales Teams | QivaLabs',
  description:
    'An AI layer that sits on top of your existing CRM — Zoho, HubSpot, Freshdesk, or custom. Triages inbound emails and messages into three tiers: fully auto-resolved, AI-drafted, or human-escalated.',
  keywords: [
    'AI CRM automation India',
    'AI email triage for support teams',
    'AI layer on top of CRM',
    'intelligent CRM automation',
    'AI customer support triage',
    'QivaLabs CRM',
  ],
  openGraph: {
    title: 'AI CRM Automation | QivaLabs',
    description:
      'An AI triage layer that sits on your existing CRM. Three tiers — auto-resolve, AI-draft, human-escalate. No migration. No stack disruption.',
  },
};

const TIERS = [
  {
    tier: 'Tier 1',
    label: 'Fully Auto-Resolved',
    color: '#22D3EE',
    icon: '🤖',
    desc: 'High-confidence queries are handled entirely by AI — response drafted, sent, and logged — with zero human involvement required.',
    examples: ['Order status enquiries', 'FAQ and pricing questions', 'Password resets and account lookups', 'Standard refund and return requests'],
  },
  {
    tier: 'Tier 2',
    label: 'AI-Assisted',
    color: '#A78BFA',
    icon: '✍️',
    desc: 'AI drafts a response and surfaces it to an agent for review. The agent reads, optionally edits, and sends in one click. Reduces effort by 70–80%.',
    examples: ['Complex or multi-part customer queries', 'Queries requiring account-specific data', 'Responses that need a human tone or judgment', 'Upsell or retention opportunities'],
  },
  {
    tier: 'Tier 3',
    label: 'Human-Escalated',
    color: '#FF7849',
    icon: '🧑',
    desc: 'Sensitive, legal, or highly unusual issues are flagged and routed directly to the right human — no AI response, no delay in escalation.',
    examples: ['Legal or compliance issues', 'Angry customer or churn risk', 'Multi-department escalations', 'Fraud or security concerns'],
  },
];

const BENEFITS = [
  { icon: '⚡', title: 'Cut response time by 80%', body: 'Most Tier 1 queries are resolved before a human even opens the inbox.' },
  { icon: '🔌', title: 'No stack disruption', body: 'Works on top of your existing CRM — Zoho, HubSpot, Freshdesk, or a custom setup. No migration.' },
  { icon: '🎯', title: 'Higher agent quality', body: 'Agents stop doing mechanical triage and focus on complex, high-value customer conversations.' },
  { icon: '📊', title: 'Full audit trail', body: 'Every AI decision is logged and reviewable. Know exactly what was auto-resolved and why.' },
  { icon: '📈', title: 'Scales without headcount', body: 'Handle 10× more inbound without hiring. The AI handles the volume spike, your team handles the quality bar.' },
  { icon: '🛡️', title: 'No hallucination risk in customer-facing replies', body: 'Tier 1 auto-resolve only fires on high-confidence responses. Anything uncertain routes to Tier 2 for human review.' },
];

const crmJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'AI CRM Automation',
  description: 'An AI triage layer for existing CRM systems — auto-resolves, AI-drafts, or human-escalates inbound customer queries.',
  brand: { '@type': 'Brand', name: 'QivaLabs' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://qivalabs.com/services' },
      { '@type': 'ListItem', position: 3, name: 'AI CRM Automation', item: 'https://qivalabs.com/services/ai-crm-automation' },
    ],
  },
};

export default function AICRMPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crmJsonLd) }}
      />

      <Navbar />

      <main className="pt-28 pb-0">

        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.07) 0%, transparent 70%)',
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
              <span className="text-text-primary">AI CRM Automation</span>
            </nav>

            <div className="max-w-3xl">
              <ScrollReveal>
                <span className="tag mb-4 inline-flex" style={{ background: 'rgba(34,211,238,0.12)', color: '#22D3EE', borderColor: 'rgba(34,211,238,0.35)' }}>
                  AI CRM Automation
                </span>
                <h1
                  className="font-heading font-bold text-text-primary mb-6 leading-[1.05]"
                  style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}
                >
                  An AI layer on top of your{' '}
                  <span style={{ color: '#22D3EE' }}>existing CRM.</span>{' '}
                  Not a replacement.
                </h1>
                <p className="text-text-muted text-xl leading-relaxed mb-8">
                  Stop drowning in inbound tickets. QivaLabs adds an intelligent AI triage layer to
                  your current CRM — automatically resolving what it can, drafting what it&apos;s unsure of,
                  and escalating the rest — without disrupting a single workflow your team already runs.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/onboard-crm"
                    className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base"
                    style={{ background: 'linear-gradient(135deg, #22D3EE, #7C5CFF)' }}
                  >
                    Onboard for CRM Service →
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-text-primary text-base border transition-all duration-200 hover:border-accent-cyan"
                    style={{ borderColor: 'rgba(34, 211, 238, 0.3)', background: 'rgba(34, 211, 238, 0.06)' }}
                  >
                    Talk to the Team
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  {['Works on existing CRM', 'No migration required', 'Zoho / HubSpot / Freshdesk', 'Custom integrations'].map((pill) => (
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
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Tiers */}
        <section className="py-16" aria-labelledby="tiers-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 id="tiers-heading" className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
                Tiered AI handling — built for real teams.
              </h2>
              <p className="text-text-muted mt-4 max-w-2xl mx-auto">
                The right tier is selected automatically based on confidence score and query type.
                No manual routing. No rules engine to maintain.
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {TIERS.map((tier) => (
                <StaggerItem key={tier.tier}>
                  <div
                    className="glass rounded-2xl p-7 flex flex-col gap-4 h-full"
                    style={{ borderColor: `${tier.color}30` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: `${tier.color}15` }}
                      >
                        {tier.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold font-mono-accent" style={{ color: tier.color }}>{tier.tier}</span>
                        <h3 className="font-heading font-bold text-text-primary text-base">{tier.label}</h3>
                      </div>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{tier.desc}</p>
                    <div className="mt-auto">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 font-mono-accent">Examples</p>
                      <ul className="flex flex-col gap-1.5">
                        {tier.examples.map((ex) => (
                          <li key={ex} className="flex items-start gap-2 text-xs text-text-muted">
                            <span className="flex-shrink-0" style={{ color: tier.color }}>→</span>
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Benefits */}
        <section className="py-16" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 id="benefits-heading" className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
                What your team actually gains.
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
              {BENEFITS.map((benefit) => (
                <StaggerItem key={benefit.title}>
                  <div className="glass rounded-2xl p-6 flex flex-col gap-3 h-full">
                    <span className="text-3xl">{benefit.icon}</span>
                    <h3 className="font-heading font-bold text-text-primary text-base">{benefit.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{benefit.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
