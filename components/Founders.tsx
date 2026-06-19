'use client';

import { motion } from 'framer-motion';
import ScrollReveal, { StaggerContainer, StaggerItem } from './ScrollReveal';

const FOUNDERS = [
  {
    name: 'Asad Sheikh',
    role: 'CEO & Co-Founder',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #7C5CFF, #A78BFA)',
    bio: 'Leads product vision, customer discovery, and go-to-market strategy for QIVA Bot.',
  },
  {
    name: 'Rajamuddin',
    role: 'CTO & Co-Founder',
    initials: 'RJ',
    gradient: 'linear-gradient(135deg, #22D3EE, #7C5CFF)',
    bio: 'Architects the AI infrastructure powering all three bots and the WhatsApp integration layer.',
  },
  {
    name: 'Arman Hussain',
    role: 'COO & Co-Founder',
    initials: 'AH',
    gradient: 'linear-gradient(135deg, #FF7849, #FFB347)',
    bio: 'Drives operations, onboarding, and keeps QIVA running smoothly for every merchant on the platform.',
  },
];

export default function Founders() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Subtle glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(124, 92, 255, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Company credibility block */}
        <ScrollReveal>
          <div
            className="glass rounded-2xl p-8 md:p-10 mb-16 text-center max-w-3xl mx-auto"
            style={{ border: '1px solid rgba(124, 92, 255, 0.2)' }}
          >
            <span className="text-3xl mb-4 block">🇮🇳</span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-3">
              QivaLabs LLP
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Incorporated February 2026 in Udaipur, Rajasthan — a DPIIT-recognised GenAI startup
              building AI tools for Indian wholesale and mandi businesses.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'DPIIT Recognised · DIPP247112',
                'LLPIN: ACV-6746',
                'Udaipur, Rajasthan',
                'Est. Feb 2026',
              ].map((badge) => (
                <span
                  key={badge}
                  className="text-xs px-3 py-1.5 rounded-full text-text-muted"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="text-center mb-12">
          <p className="text-accent-coral text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            The Team
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight">
            Founders who understand mandi.
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" staggerDelay={0.12}>
          {FOUNDERS.map((founder) => (
            <StaggerItem key={founder.name}>
              <motion.div
                className="glass rounded-2xl p-7 text-center h-full flex flex-col items-center gap-4"
                whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(124, 92, 255, 0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                  style={{ background: founder.gradient }}
                >
                  {founder.initials}
                </div>

                <div>
                  <h3 className="font-heading font-bold text-text-primary text-lg">{founder.name}</h3>
                  <p className="text-accent-violet text-sm font-medium">{founder.role}</p>
                </div>

                <p className="text-text-muted text-sm leading-relaxed">{founder.bio}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
