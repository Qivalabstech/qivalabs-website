'use client';

import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

const STATS = [
  {
    value: 24,
    suffix: '/7',
    label: 'AI Uptime',
    desc: 'Your business never sleeps — bots handle queries round the clock, every day of the year.',
    color: '#7C5CFF',
  },
  {
    value: 1,
    prefix: '<',
    suffix: 's',
    label: 'Response Time',
    desc: 'Under one second from customer message to AI reply — faster than any human employee.',
    color: '#22D3EE',
  },
  {
    value: 11,
    prefix: '₹',
    suffix: 'k/mo saved',
    label: 'Cost Savings',
    desc: 'Mandi automation replaces a ₹10,000–₹15,000/month employee at just ₹4,000/month.',
    color: '#FF7849',
  },
  {
    value: 3,
    suffix: ' products',
    label: 'One Partner',
    desc: 'Mandi WhatsApp Automation, AI CRM, and WaitJI AI — all backed by the same team.',
    color: '#A78BFA',
  },
];

const WHY_ITEMS = [
  {
    icon: '🤖',
    title: 'AI that remembers context',
    body: 'Not a dumb FAQ bot. Our AI remembers customer relationships, order history, and preferences — just like a good employee would.',
  },
  {
    icon: '💬',
    title: 'Speaks your language',
    body: 'Hinglish, Hindi, or English — QIVA adapts to how your customers actually talk, not how a textbook says they should.',
  },
  {
    icon: '🔒',
    title: 'Your brand, not ours',
    body: 'The mandi bot runs under your WhatsApp number, white-labeled. Your customers never know it\'s powered by QivaLabs.',
  },
  {
    icon: '📊',
    title: 'Real business outcomes',
    body: 'We measure success in rupees saved, response times cut, and leads closed — not in "AI features shipped."',
  },
  {
    icon: '⚡',
    title: 'No stack disruption for CRM',
    body: 'Our AI CRM layer sits on top of what you already use — Zoho, HubSpot, custom tools. Zero migration required.',
  },
  {
    icon: '🇮🇳',
    title: 'Built for Indian businesses',
    body: 'Incorporated in Udaipur, Rajasthan. DPIIT-recognised. We understand mandi culture, Indian payment patterns, and local business needs.',
  },
];

export default function OutcomesSection() {
  return (
    <section className="relative py-24 overflow-hidden" aria-labelledby="outcomes-heading">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Stats row */}
        <ScrollReveal className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="glass rounded-2xl p-6 text-center flex flex-col gap-2"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="font-heading font-bold leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: stat.color }}
                >
                  {stat.prefix && <span className="text-2xl">{stat.prefix}</span>}
                  <AnimatedCounter to={stat.value} duration={1600} />
                  <span className="text-xl">{stat.suffix}</span>
                </div>
                <p className="font-semibold text-text-primary text-sm font-heading">{stat.label}</p>
                <p className="text-text-muted text-xs leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Why QivaLabs */}
        <ScrollReveal className="text-center mb-12">
          <p className="text-accent-coral text-sm font-semibold uppercase tracking-[0.15em] mb-3 font-mono-accent">
            Why QivaLabs
          </p>
          <h2
            id="outcomes-heading"
            className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight"
          >
            Serious software.<br />Measurable results.
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {WHY_ITEMS.map((item) => (
            <StaggerItem key={item.title}>
              <div
                className="glass rounded-2xl p-6 flex flex-col gap-3 h-full transition-all duration-300 hover:border-[rgba(124,92,255,0.35)]"
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-heading font-bold text-text-primary text-base">{item.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
