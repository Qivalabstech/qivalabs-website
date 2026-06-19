'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

export default function CTABand() {
  return (
    <section className="relative py-24 overflow-hidden" aria-label="Call to action">

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(124, 92, 255, 0.08) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,92,255,0.3), transparent)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <ScrollReveal>
          <p className="text-accent-violet text-sm font-semibold uppercase tracking-[0.15em] mb-4 font-mono-accent">
            Ready to Ship Serious Software?
          </p>

          <h2
            className="font-heading font-bold text-text-primary mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
          >
            Start with one product.<br />
            <span className="gradient-text-violet-cyan">Scale with three.</span>
          </h2>

          <p className="text-text-muted text-lg mb-10 max-w-2xl mx-auto">
            Whether you're a mandi owner who wants 24/7 AI staff, a support team drowning in tickets,
            or a developer-tool startup looking to monetize wait time — there's a QivaLabs product for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/enroll-mandi"
                className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-base"
                style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Enroll for Mandi Automation
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/onboard-crm"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-text-primary text-base border transition-all duration-200 hover:border-accent-coral hover:text-accent-coral"
                style={{ borderColor: 'rgba(255, 120, 73, 0.4)', background: 'rgba(255, 120, 73, 0.06)' }}
              >
                Onboard for CRM Service
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-text-muted text-base border transition-all duration-200 hover:border-accent-violet hover:text-text-primary"
                style={{ borderColor: 'rgba(124, 92, 255, 0.25)', background: 'rgba(124, 92, 255, 0.04)' }}
              >
                Talk to the Team
              </Link>
            </motion.div>
          </div>

          {/* Small trust line */}
          <p className="mt-8 text-text-muted text-sm">
            Questions? Call{' '}
            <a href="tel:+917231873730" className="text-accent-cyan hover:underline">+91 7231 873 730</a>
            {' '}or email{' '}
            <a href="mailto:sales@qivalabs.com" className="text-accent-cyan hover:underline">sales@qivalabs.com</a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
