'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const FEATURES = [
  {
    icon: '📱',
    title: 'Runs on YOUR WhatsApp',
    description:
      'Messages go out from your number — your name, your trust. Customers and suppliers never know it\'s AI.',
    gradient: 'linear-gradient(135deg, #7C5CFF22, #7C5CFF08)',
    accent: '#7C5CFF',
  },
  {
    icon: '🗣️',
    title: 'Speaks Mandi Hinglish',
    description:
      'Not corporate English. QIVA understands "bhai 2 bag tamatar dedo" and replies the way your staff would.',
    gradient: 'linear-gradient(135deg, #22D3EE22, #22D3EE08)',
    accent: '#22D3EE',
  },
  {
    icon: '🧠',
    title: 'Remembers Every Relationship',
    description:
      'Credit limits, preferred delivery times, last order date — QIVA knows every customer and supplier detail.',
    gradient: 'linear-gradient(135deg, #FF784922, #FF784908)',
    accent: '#FF7849',
  },
  {
    icon: '🚫',
    title: 'No App for Customers',
    description:
      'Your buyers and suppliers use WhatsApp — an app they already have. Zero friction, 100% adoption.',
    gradient: 'linear-gradient(135deg, #7C5CFF22, #7C5CFF08)',
    accent: '#7C5CFF',
  },
  {
    icon: '🔒',
    title: 'Your Data, Your Control',
    description:
      'Business data stays on your WhatsApp. You can override bots anytime and export your records on demand.',
    gradient: 'linear-gradient(135deg, #22D3EE22, #22D3EE08)',
    accent: '#22D3EE',
  },
  {
    icon: '⚡',
    title: 'Zero Errors, Zero Delays',
    description:
      'AI doesn\'t get tired, doesn\'t miscalculate rates, and doesn\'t delay messages during busy hours.',
    gradient: 'linear-gradient(135deg, #FF784922, #FF784908)',
    accent: '#FF7849',
  },
];

export default function Differentiators() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-16">
          <p className="text-accent-cyan text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Why QIVA
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
            Built for mandi traders,{' '}
            <span className="gradient-text-violet-cyan">not generic businesses.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Generic chatbots speak English and need app installations. QIVA is purpose-built
            for Indian wholesale trade.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.08}>
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                className="glass rounded-2xl p-6 h-full flex flex-col gap-4 cursor-default"
                style={{
                  background: feature.gradient,
                  borderColor: `${feature.accent}28`,
                }}
                whileHover={{ y: -4, boxShadow: `0 16px 40px ${feature.accent}18` }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${feature.accent}18` }}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
