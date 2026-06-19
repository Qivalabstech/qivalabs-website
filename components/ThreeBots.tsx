'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const BOTS = [
  {
    emoji: '🛒',
    name: 'Customer Bot',
    tagline: 'Your 24/7 sales & order assistant',
    color: '#7C5CFF',
    glow: 'rgba(124, 92, 255, 0.2)',
    gradient: 'linear-gradient(135deg, rgba(124,92,255,0.15), rgba(124,92,255,0.04))',
    capabilities: [
      'Answers rate queries instantly in Hindi / Hinglish',
      'Takes & confirms orders on WhatsApp — no app needed',
      'Sends payment reminders & outstanding balance updates',
    ],
  },
  {
    emoji: '🤝',
    name: 'Supplier Bot',
    tagline: 'Manages your entire supply side',
    color: '#22D3EE',
    glow: 'rgba(34, 211, 238, 0.2)',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(34,211,238,0.03))',
    capabilities: [
      'Tracks incoming stock & confirms delivery schedules',
      'Shares today\'s purchase rates & inventory levels',
      'Follows up on pending supplier payments & dues',
    ],
  },
  {
    emoji: '👁️',
    name: 'Owner Bot',
    tagline: 'Your real-time business dashboard',
    color: '#FF7849',
    glow: 'rgba(255, 120, 73, 0.2)',
    gradient: 'linear-gradient(135deg, rgba(255,120,73,0.12), rgba(255,120,73,0.03))',
    capabilities: [
      'Daily summary: sales, collections, top customers',
      'Alerts for large orders, overdue payments & anomalies',
      'Override & control bots anytime from your WhatsApp',
    ],
  },
];

export default function ThreeBots() {
  return (
    <section id="bots" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-16">
          <p className="text-accent-violet text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Meet the Team
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
            Teen bots, ek business —{' '}
            <span className="gradient-text-violet-cyan">hamesha active.</span>
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            All three bots run on your own WhatsApp number — your customers and suppliers
            see messages from <em>you</em>, not from a bot brand.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
          {BOTS.map((bot) => (
            <StaggerItem key={bot.name}>
              <motion.div
                className="card-glow glass rounded-2xl p-7 h-full flex flex-col cursor-default"
                style={{
                  background: bot.gradient,
                  border: `1px solid ${bot.glow}`,
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `${bot.glow}` }}
                >
                  {bot.emoji}
                </div>

                {/* Name & tagline */}
                <h3
                  className="font-heading font-bold text-xl mb-1"
                  style={{ color: bot.color }}
                >
                  {bot.name}
                </h3>
                <p className="text-text-muted text-sm mb-5">{bot.tagline}</p>

                {/* Capabilities */}
                <ul className="flex flex-col gap-3 mt-auto">
                  {bot.capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <span
                        className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: bot.color }}
                      />
                      {cap}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Bottom note */}
        <ScrollReveal className="mt-12 text-center" delay={0.2}>
          <p className="text-text-muted text-sm">
            All bots share one unified memory — a customer placing an order via Customer Bot
            is automatically reflected in the Owner Bot daily report.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
