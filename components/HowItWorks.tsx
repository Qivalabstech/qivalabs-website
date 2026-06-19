'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const STEPS = [
  {
    number: '01',
    icon: '📱',
    title: 'Onboard Your WhatsApp',
    description:
      'We connect QIVA Bot to your existing business WhatsApp number in under 30 minutes. No new number, no app for your customers.',
    color: '#7C5CFF',
  },
  {
    number: '02',
    icon: '🧠',
    title: 'QIVA Learns Your Business',
    description:
      'We feed QIVA your customer list, today\'s rates, payment terms, and supplier catalogue. It speaks your mandi language from day one.',
    color: '#22D3EE',
  },
  {
    number: '03',
    icon: '⚡',
    title: 'Bots Handle Chats 24/7',
    description:
      'Customer Bot answers rate queries and takes orders. Supplier Bot manages your supply side. All day, all night — without you lifting a finger.',
    color: '#A78BFA',
  },
  {
    number: '04',
    icon: '👁️',
    title: 'You Stay in Control',
    description:
      'The Owner Bot gives you a daily WhatsApp digest — total sales, overdue payments, top buyers. Override or intervene anytime from your phone.',
    color: '#FF7849',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">

      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124, 92, 255, 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-16">
          <p className="text-accent-coral text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Simple Onboarding
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
            Up &amp; running in{' '}
            <span className="gradient-text">30 minutes.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            No technical expertise needed. We handle the entire setup — you just start getting more done.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {STEPS.map((step, idx) => (
            <StaggerItem key={step.number}>
              <div className="relative flex flex-col h-full">
                {/* Connector line (desktop only) */}
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[calc(100%+0px)] w-full h-px z-0"
                    style={{
                      background: `linear-gradient(90deg, ${step.color}55, transparent)`,
                      width: 'calc(100% - 56px)',
                      left: '56px',
                    }}
                    aria-hidden="true"
                  />
                )}

                <motion.div
                  className="glass rounded-2xl p-6 h-full flex flex-col"
                  style={{ borderColor: `${step.color}22` }}
                  whileHover={{ y: -4, boxShadow: `0 20px 40px ${step.color}22` }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  {/* Step number */}
                  <span
                    className="text-xs font-bold tracking-widest mb-4 font-heading"
                    style={{ color: `${step.color}99` }}
                  >
                    STEP {step.number}
                  </span>

                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ background: `${step.color}18` }}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mt-auto">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA below steps */}
        <ScrollReveal className="mt-14 text-center" delay={0.3}>
          <a
            href="https://wa.me/917231873730?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20QIVA%20Bot%20onboarding"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
          >
            Start Onboarding — WhatsApp Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
