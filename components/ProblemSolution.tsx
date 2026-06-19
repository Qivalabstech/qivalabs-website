'use client';

import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

const humanPain = [
  'Leaves at 7 PM — chats go unanswered',
  'Goes on leave during peak season',
  'Forgets customer preferences & credit history',
  'Makes entry errors in orders & payments',
  'Quits — you start from scratch',
  'Knows your buyer list — security risk',
];

const qivaWin = [
  'Answers every message instantly, 24/7',
  'Zero leave, zero absenteeism, ever',
  'Remembers every customer, every order, every balance',
  'Zero errors — structured, logged transactions',
  'No attrition — your business knowledge stays',
  'Data stays with you, on your number',
];

export default function ProblemSolution() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-16">
          <p className="text-accent-cyan text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            The Real Cost of a WhatsApp Employee
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
            Stop paying more for less.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A human WhatsApp staffer costs ₹10,000–₹15,000/month and works 8 hours a day.
            QIVA works 24/7 at ₹4,000/month and never forgets a thing.
          </p>
        </ScrollReveal>

        {/* Counter row */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" staggerDelay={0.1}>
          {[
            { value: 15000, prefix: '₹', suffix: '/mo', label: 'Human staff cost' },
            { value: 4000,  prefix: '₹', suffix: '/mo', label: 'QIVA Bot cost' },
            { value: 8,     suffix: 'hrs/day', label: 'Human availability' },
            { value: 24,    suffix: 'hrs/day', label: 'QIVA availability' },
          ].map((stat, i) => (
            <StaggerItem key={i}>
              <div className="glass text-center p-5 rounded-2xl">
                <div
                  className="font-heading font-bold text-3xl md:text-4xl"
                  style={{
                    background: i < 2
                      ? (i === 0 ? 'linear-gradient(135deg, #FF7849, #FFB347)' : 'linear-gradient(135deg, #7C5CFF, #22D3EE)')
                      : (i === 2 ? 'linear-gradient(135deg, #FF7849, #FFB347)' : 'linear-gradient(135deg, #7C5CFF, #22D3EE)'),
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <AnimatedCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-text-muted text-sm mt-1">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Side by side comparison */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          {/* Human employee — red-ish */}
          <ScrollReveal delay={0.1}>
            <div
              className="rounded-2xl p-6 border h-full"
              style={{
                background: 'rgba(255, 120, 73, 0.05)',
                borderColor: 'rgba(255, 120, 73, 0.25)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(255, 120, 73, 0.15)' }}
                >
                  👤
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-lg">Human WhatsApp Staff</h3>
                  <p className="text-sm font-semibold" style={{ color: '#FF7849' }}>₹10,000 – ₹15,000 / month</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {humanPain.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="mt-0.5 text-base" style={{ color: '#FF7849' }}>✗</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* QIVA — violet */}
          <ScrollReveal delay={0.2}>
            <div
              className="rounded-2xl p-6 border h-full"
              style={{
                background: 'rgba(124, 92, 255, 0.06)',
                borderColor: 'rgba(124, 92, 255, 0.3)',
                boxShadow: '0 0 40px rgba(124, 92, 255, 0.08)',
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
                >
                  Q
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-lg">QIVA Bot (AI Staff)</h3>
                  <p className="text-sm font-semibold text-accent-violet">₹4,000 / month</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {qivaWin.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="mt-0.5 text-base text-accent-cyan">✓</span>
                    <span>
                      {i === 0 && <><strong className="text-text-primary">Instant response</strong>, not just {'"'}fast{'"'}.</>}
                      {i !== 0 && point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* ROI line */}
        <ScrollReveal className="mt-10 text-center" delay={0.3}>
          <p
            className="inline-block text-sm font-semibold px-6 py-3 rounded-full"
            style={{
              background: 'rgba(34, 211, 238, 0.08)',
              border: '1px solid rgba(34, 211, 238, 0.25)',
              color: '#22D3EE',
            }}
          >
            💰 Save ₹6,000–₹11,000 every month — that's ₹72,000–₹1,32,000 per year in your pocket.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
