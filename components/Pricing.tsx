'use client';

import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import AnimatedCounter from './AnimatedCounter';

const INCLUSIONS = [
  'Customer Bot — orders, rates, payment follow-ups',
  'Supplier Bot — stock tracking, deliveries, dues',
  'Owner Bot — daily digest, alerts, full control',
  'Runs on your existing WhatsApp number',
  'Trained on your customer & supplier data',
  'Speaks Hindi & mandi Hinglish',
  'Unlimited messages — no per-chat charges',
  'Onboarding support (setup in under 30 min)',
  'Monthly rate & catalogue updates',
  'WhatsApp support from the QIVA team',
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(124, 92, 255, 0.08), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-14">
          <p className="text-accent-violet text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Simple, Transparent Pricing
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
            One price. Everything included.
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            No hidden charges. No per-message billing. No feature tiers.
          </p>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <motion.div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(124,92,255,0.12), rgba(34,211,238,0.06))',
                border: '1px solid rgba(124, 92, 255, 0.35)',
                boxShadow: '0 0 80px rgba(124, 92, 255, 0.12), 0 40px 80px rgba(0,0,0,0.3)',
              }}
              whileHover={{ boxShadow: '0 0 100px rgba(124, 92, 255, 0.18), 0 40px 80px rgba(0,0,0,0.4)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Header stripe */}
              <div
                className="px-8 pt-8 pb-6 border-b"
                style={{ borderColor: 'rgba(124, 92, 255, 0.2)' }}
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                      style={{ background: 'rgba(124, 92, 255, 0.2)', color: '#A78BFA' }}
                    >
                      QIVA Bot — Full Stack AI Staff
                    </span>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading font-bold text-5xl text-text-primary">
                        ₹<AnimatedCounter to={4000} duration={1400} />
                      </span>
                      <span className="text-text-muted text-lg">/month</span>
                      <span
                        className="ml-2 text-sm px-3 py-0.5 rounded-full"
                        style={{ background: 'rgba(34,211,238,0.1)', color: '#22D3EE' }}
                      >
                        + ₹20,000 one-time setup
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/917231873730?text=Hi%2C%20I%27d%20like%20to%20talk%20about%20QIVA%20Bot%20pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow flex-shrink-0 px-7 py-3.5 rounded-full font-semibold text-white text-base"
                    style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
                  >
                    Talk to Us →
                  </a>
                </div>
              </div>

              {/* Inclusions */}
              <div className="p-8">
                <p className="text-text-muted text-sm font-semibold uppercase tracking-wider mb-5">
                  Everything Included
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {INCLUSIONS.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-text-muted"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <span className="mt-0.5 text-accent-cyan font-bold flex-shrink-0">✓</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* ROI block */}
              <div
                className="mx-8 mb-8 rounded-2xl p-5"
                style={{
                  background: 'rgba(255, 120, 73, 0.07)',
                  border: '1px solid rgba(255, 120, 73, 0.2)',
                }}
              >
                <p className="text-sm text-text-muted leading-relaxed">
                  <strong className="text-text-primary">ROI in plain math:</strong>{' '}
                  A human WhatsApp employee costs ₹10,000–₹15,000/month. QIVA costs ₹4,000/month.
                  You save <strong style={{ color: '#FF7849' }}>₹6,000–₹11,000 every month</strong> —
                  that's your setup fee recovered in the <strong className="text-text-primary">first 2–3 months.</strong>
                </p>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Trust note */}
          <ScrollReveal className="text-center mt-8" delay={0.2}>
            <p className="text-text-muted text-sm">
              Questions? Call us at{' '}
              <a href="tel:+917231873730" className="text-accent-cyan hover:underline">+91 7231 873 730</a>
              {' '}or WhatsApp{' '}
              <a
                href="https://wa.me/917231873730"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline"
              >
                chat with our team
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
