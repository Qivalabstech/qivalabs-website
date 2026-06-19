'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const STEPS = [
  {
    number: '01',
    title: 'Pick your product',
    body: 'Choose Mandi WhatsApp Automation, AI CRM Automation, or WaitJI AI — or talk to us about a combination that fits your business.',
    color: '#7C5CFF',
  },
  {
    number: '02',
    title: 'Enroll or onboard',
    body: 'Fill a short form. A QivaLabs founder calls you back within the hour to understand your exact workflow, team size, and data.',
    color: '#22D3EE',
  },
  {
    number: '03',
    title: 'We set it up in days',
    body: 'Our team configures the AI on your existing number or CRM. No migration. No six-week implementation. Live in under 30 minutes for mandi bots.',
    color: '#A78BFA',
  },
  {
    number: '04',
    title: 'Your business runs itself',
    body: 'Customers get instant Hinglish replies. Your team handles only what needs a human. You get daily insight on your phone, on WhatsApp.',
    color: '#FF7849',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 overflow-hidden" aria-labelledby="how-it-works-heading">

      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(124, 92, 255, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-16">
          <p className="text-accent-cyan text-sm font-semibold uppercase tracking-[0.15em] mb-3 font-mono-accent">
            How It Works
          </p>
          <h2
            id="how-it-works-heading"
            className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight"
          >
            From inquiry to live AI<br />in days, not months.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">

          {/* Connector line (desktop only) */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, rgba(124,92,255,0.3), rgba(34,211,238,0.3), rgba(255,120,73,0.3))' }}
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="glass rounded-2xl p-6 flex flex-col gap-4 relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Step number */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-mono-accent font-bold text-base"
                style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}40` }}
              >
                {step.number}
              </div>

              <h3 className="font-heading font-bold text-text-primary text-lg">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
