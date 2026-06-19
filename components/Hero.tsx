'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import AuroraBackground from './AuroraBackground';
import WhatsAppMockup from './WhatsAppMockup';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  };
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero"
    >
      <AuroraBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6 max-w-xl">

            {/* Badge */}
            <motion.div {...fadeUp(0)}>
              <span className="tag">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-violet animate-pulse" />
                DPIIT-Recognised · DIPP247112 · GenAI SaaS · Udaipur, Rajasthan
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="font-heading font-bold leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
            >
              <span className="gradient-text-violet-cyan">Your AI</span>
              <br />
              Business Solutions
              <br />
              Partner.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              {...fadeUp(0.2)}
              className="text-text-muted text-lg leading-relaxed"
            >
              We build AI systems that{' '}
              <strong className="text-text-primary">run your business</strong> — not just chatbots.
              Replace ₹15k/month staff with 24/7 AI, automate your CRM triage, and reach customers
              where they already are: WhatsApp.
            </motion.p>

            {/* Tagline */}
            <motion.div {...fadeUp(0.3)}>
              <p
                className="inline-block font-mono-accent text-sm font-bold tracking-widest uppercase"
                style={{ color: '#A78BFA' }}
              >
                Three products. One partner.
              </p>
            </motion.div>

            {/* Dual CTA row */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mt-2">
              <Link
                href="/enroll-mandi"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-base"
                style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enroll for Mandi Automation
              </Link>

              <Link
                href="/onboard-crm"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-text-primary text-base border transition-all duration-200 hover:border-accent-coral hover:text-accent-coral"
                style={{ borderColor: 'rgba(255, 120, 73, 0.4)', background: 'rgba(255, 120, 73, 0.06)' }}
              >
                Onboard for CRM Service
              </Link>
            </motion.div>

            {/* Trust pills */}
            <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3 mt-1">
              {[
                '24/7 uptime',
                '< 1s response time',
                '₹6–11k/month savings',
                'Hindi / Hinglish',
                'Your WhatsApp number',
              ].map((pill) => (
                <span
                  key={pill}
                  className="text-xs px-3 py-1 rounded-full text-text-muted font-mono-accent"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {pill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — WhatsApp mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex justify-center lg:justify-end"
          >
            <WhatsAppMockup />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0B0B12)' }}
      />
    </section>
  );
}
