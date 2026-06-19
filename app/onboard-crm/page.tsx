import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Onboard for AI CRM Automation | QivaLabs',
  description:
    'Onboard your support or sales team for QivaLabs AI CRM Automation — an intelligent triage layer that auto-resolves, AI-drafts, or escalates inbound customer queries on your existing CRM.',
  robots: { index: false, follow: true },
};

const CRM_FORM_FIELDS = [
  {
    id: 'companyName',
    label: 'Company name',
    type: 'text' as const,
    placeholder: 'Acme Solutions Pvt. Ltd.',
    required: true,
    autoComplete: 'organization',
  },
  {
    id: 'contactPerson',
    label: 'Your name',
    type: 'text' as const,
    placeholder: 'Priya Sharma',
    required: true,
    autoComplete: 'name',
  },
  {
    id: 'email',
    label: 'Work email',
    type: 'email' as const,
    placeholder: 'priya@acme.com',
    required: true,
    autoComplete: 'email',
  },
  {
    id: 'currentCRM',
    label: 'Current CRM / tool in use',
    type: 'text' as const,
    placeholder: 'e.g. Zoho CRM, HubSpot, Freshdesk, custom',
    required: true,
  },
  {
    id: 'teamSize',
    label: 'Support / sales team size',
    type: 'select' as const,
    placeholder: 'Select team size',
    required: true,
    options: [
      '1–5 agents',
      '6–20 agents',
      '21–50 agents',
      '51–100 agents',
      '100+ agents',
    ],
  },
  {
    id: 'automationGoal',
    label: 'What do you want automated?',
    type: 'textarea' as const,
    placeholder: 'e.g. "We get 500 support emails a day — 60% are the same 10 questions. Our agents spend 3 hours just triaging and copy-pasting template responses..."',
    required: false,
    rows: 4,
  },
];

export default function OnboardCRMPage() {
  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <nav className="flex items-center gap-2 text-xs text-text-muted mb-10 font-mono-accent" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services/ai-crm-automation" className="hover:text-text-primary transition-colors">AI CRM Automation</Link>
            <span>/</span>
            <span className="text-text-primary">Onboard</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — context */}
            <ScrollReveal className="lg:sticky lg:top-28">
              <span className="tag mb-5 inline-flex" style={{ background: 'rgba(34,211,238,0.12)', color: '#22D3EE', borderColor: 'rgba(34,211,238,0.35)' }}>
                AI CRM Automation
              </span>
              <h1
                className="font-heading font-bold text-text-primary mb-5 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Stop triaging.{' '}
                <span style={{ color: '#22D3EE' }}>Start closing.</span>
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                Fill this form and a QivaLabs engineer will reach out to understand your current CRM setup
                and design the right AI triage configuration for your team. No sales pitch — just a technical
                conversation.
              </p>

              {/* How it works */}
              <div className="glass rounded-2xl p-6 mb-6" style={{ borderColor: 'rgba(34,211,238,0.2)' }}>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 font-mono-accent">The three tiers</p>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      tier: 'Tier 1',
                      label: 'Auto-resolved',
                      color: '#22D3EE',
                      desc: 'High-confidence queries resolved and logged — zero human effort',
                    },
                    {
                      tier: 'Tier 2',
                      label: 'AI-drafted, agent-reviewed',
                      color: '#A78BFA',
                      desc: 'AI drafts, agent approves and sends in one click',
                    },
                    {
                      tier: 'Tier 3',
                      label: 'Human-escalated',
                      color: '#FF7849',
                      desc: 'Complex or sensitive issues routed directly to the right human',
                    },
                  ].map((t) => (
                    <div key={t.tier} className="flex items-start gap-3 text-sm">
                      <span
                        className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-bold font-mono-accent"
                        style={{ background: `${t.color}20`, color: t.color }}
                      >
                        {t.tier}
                      </span>
                      <div>
                        <p className="text-text-primary font-semibold">{t.label}</p>
                        <p className="text-text-muted text-xs mt-0.5">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits summary */}
              <div className="glass rounded-2xl p-6" style={{ borderColor: 'rgba(124,92,255,0.2)' }}>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 font-mono-accent">What you get</p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    'Works on top of your existing CRM — no migration',
                    'Cuts triage time by 70–80%',
                    'Agents focus on complex, high-value conversations',
                    'Full audit trail — every AI decision is logged',
                    'Scales without additional headcount',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="text-accent-cyan font-bold flex-shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-8">
                <h2 className="font-heading font-bold text-text-primary text-xl mb-6">
                  Tell us about your team
                </h2>
                <LeadForm
                  fields={CRM_FORM_FIELDS}
                  endpoint="/leads/crm"
                  submitLabel="Onboard for CRM Service →"
                  successMessage="Received! A QivaLabs engineer will reach out within 24 hours to discuss your CRM setup and design your AI triage configuration."
                />
                <p className="text-text-muted text-xs mt-5 text-center">
                  Prefer email?{' '}
                  <a href="mailto:sales@qivalabs.com" className="text-accent-cyan hover:underline">
                    sales@qivalabs.com
                  </a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
