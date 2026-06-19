'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

interface FormState {
  name: string;
  business: string;
  phone: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    business: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Server error');
      setStatus('success');
      setForm({ name: '', business: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  const inputBase =
    'w-full px-4 py-3 rounded-xl text-text-primary text-sm outline-none transition-all duration-200 placeholder:text-text-muted/50';
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(124, 92, 255, 0.2)',
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal className="text-center mb-14">
          <p className="text-accent-cyan text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Let's Talk
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary mb-4 leading-tight">
            Ready to replace your WhatsApp staff?
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Drop us a message and we'll set up a 20-minute call to show QIVA Bot in action on your WhatsApp.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">

          {/* Form */}
          <ScrollReveal delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm text-text-muted mb-1.5">
                  Your Name <span aria-hidden="true" className="text-accent-coral">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ramesh Agarwal"
                  value={form.name}
                  onChange={handleChange}
                  className={inputBase}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.2)')}
                />
              </div>

              <div>
                <label htmlFor="business" className="block text-sm text-text-muted mb-1.5">
                  Business Name <span aria-hidden="true" className="text-accent-coral">*</span>
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  required
                  autoComplete="organization"
                  placeholder="Agarwal Trading Co."
                  value={form.business}
                  onChange={handleChange}
                  className={inputBase}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.2)')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm text-text-muted mb-1.5">
                  WhatsApp Number <span aria-hidden="true" className="text-accent-coral">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputBase}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.2)')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-text-muted mb-1.5">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your business — what products you trade, your monthly volume, etc."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputBase} resize-none`}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.6)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(124, 92, 255, 0.2)')}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                className="btn-glow w-full py-3.5 rounded-xl font-semibold text-white text-base relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #7C5CFF, #22D3EE)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm py-2 px-4 rounded-xl"
                    style={{ background: 'rgba(34, 211, 238, 0.1)', color: '#22D3EE' }}
                  >
                    ✓ Message sent! We'll WhatsApp you within 24 hours.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-sm py-2 px-4 rounded-xl"
                    style={{ background: 'rgba(255, 120, 73, 0.1)', color: '#FF7849' }}
                  >
                    Something went wrong. Please WhatsApp us directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </ScrollReveal>

          {/* Contact details */}
          <ScrollReveal delay={0.2} className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-7 flex flex-col gap-5">
              <h3 className="font-heading font-bold text-text-primary text-xl mb-1">
                Direct Contact
              </h3>

              <ContactItem
                icon="📞"
                label="Phone"
                value="+91 7231 873 730"
                href="tel:+917231873730"
              />
              <ContactItem
                icon="✉️"
                label="Email"
                value="sales@qivalabs.com"
                href="mailto:sales@qivalabs.com"
              />
              <ContactItem
                icon="🌐"
                label="Website"
                value="qivalabs.com"
                href="https://qivalabs.com"
              />
              <ContactItem
                icon="📍"
                label="Location"
                value="Udaipur, Rajasthan, India"
              />
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917231873730?text=Hi%2C%20I%27m%20interested%20in%20QIVA%20Bot%20for%20my%20wholesale%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow flex items-center justify-center gap-3 p-5 rounded-2xl font-semibold text-white text-base"
              style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            <p className="text-text-muted text-xs text-center">
              We typically reply within 30 minutes during business hours (9 AM – 9 PM IST).
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xl w-8 text-center flex-shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-text-muted text-xs mb-0.5">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-text-primary text-sm font-medium hover:text-accent-cyan transition-colors break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-text-primary text-sm font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}
