'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';

const CONTACT_DETAILS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.05.06h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@qivalabs.com',
    href: 'mailto:hello@qivalabs.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Office',
    value: 'Udaipur, Rajasthan 313001, India',
    href: 'https://maps.google.com/?q=Udaipur,Rajasthan,India',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(15, 39, 66, 0.8)',
    border: '1px solid rgba(11, 155, 170, 0.25)',
    borderRadius: '0.5rem',
    color: '#C9D6D9',
    fontSize: '0.9rem',
    outline: 'none',
    fontFamily: 'var(--font-inter)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.375rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#8BAFC0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section
          className="relative py-20 overflow-hidden"
          style={{ backgroundColor: '#0A1628' }}
        >
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(11, 155, 170, 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#8BAFC0' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>Contact</span>
            </nav>
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Let&apos;s talk</span>
              <h1
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  color: '#ffffff',
                }}
              >
                Start the{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  conversation.
                </span>
              </h1>
              <p className="text-xl leading-relaxed max-w-2xl" style={{ color: '#8BAFC0' }}>
                Tell us about your project. We&apos;ll respond within 48 hours with a clear scope
                and investment estimate — no obligation.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact grid */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <ScrollReveal>
                <h2
                  className="font-bold mb-6"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: '1.5rem',
                    color: '#ffffff',
                  }}
                >
                  Get in touch
                </h2>

                <div className="space-y-5">
                  {CONTACT_DETAILS.map((detail) => (
                    <a
                      key={detail.label}
                      href={detail.href}
                      target={detail.href.startsWith('http') ? '_blank' : undefined}
                      rel={detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-4 p-4 rounded-xl transition-all"
                      style={{
                        backgroundColor: 'rgba(11, 155, 170, 0.06)',
                        border: '1px solid rgba(11, 155, 170, 0.15)',
                      }}
                    >
                      <span style={{ color: '#0B9BAA', marginTop: '2px' }}>{detail.icon}</span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#8BAFC0' }}>
                          {detail.label}
                        </p>
                        <p className="text-sm" style={{ color: '#C9D6D9' }}>{detail.value}</p>
                      </div>
                    </a>
                  ))}
                </div>

                <div
                  className="mt-8 p-5 rounded-xl"
                  style={{
                    backgroundColor: 'rgba(11, 155, 170, 0.06)',
                    border: '1px solid rgba(11, 155, 170, 0.15)',
                  }}
                >
                  <h3
                    className="font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                  >
                    Response time
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
                    We respond to all enquiries within{' '}
                    <span style={{ color: '#16C4D6' }}>48 business hours</span>. For urgent
                    requirements, call us directly.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                <div
                  className="p-8 rounded-2xl"
                  style={{
                    backgroundColor: '#0F2742',
                    border: '1px solid rgba(11, 155, 170, 0.2)',
                  }}
                >
                  {status === 'success' ? (
                    <div className="text-center py-12">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'rgba(11, 155, 170, 0.15)' }}
                      >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16C4D6" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3
                        className="font-bold mb-2 text-xl"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                      >
                        Message sent!
                      </h3>
                      <p style={{ color: '#8BAFC0' }}>
                        Thank you for reaching out. We&apos;ll be in touch within 48 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h2
                        className="font-bold mb-6"
                        style={{
                          fontFamily: 'var(--font-space-grotesk)',
                          fontSize: '1.3rem',
                          color: '#ffffff',
                        }}
                      >
                        Tell us about your project
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label style={labelStyle} htmlFor="name">Full name *</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={labelStyle} htmlFor="email">Email address *</label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={labelStyle} htmlFor="phone">Phone number</label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            style={inputStyle}
                          />
                        </div>
                        <div>
                          <label style={labelStyle} htmlFor="company">Company / Business</label>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            value={form.company}
                            onChange={handleChange}
                            placeholder="Your company name"
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle} htmlFor="service">Service of interest</label>
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          style={inputStyle}
                        >
                          <option value="">Select a service (optional)</option>
                          <option value="custom-software">Custom Software Development</option>
                          <option value="website">Website Design & Development</option>
                          <option value="mobile-app">Mobile App Development</option>
                          <option value="ai-automation">AI & Automation</option>
                          <option value="digital-marketing">Digital Marketing</option>
                          <option value="ecommerce">E-commerce Solutions</option>
                          <option value="cloud">Cloud Solutions & DevOps</option>
                          <option value="consulting">IT Consulting</option>
                          <option value="other">Other / Multiple Services</option>
                        </select>
                      </div>

                      <div>
                        <label style={labelStyle} htmlFor="message">Project details *</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Describe your project, challenge, or question..."
                          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-sm" style={{ color: '#FF7B7B' }}>
                          Something went wrong. Please try again or email us directly at hello@qivalabs.com
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-4 rounded-lg font-semibold text-sm transition-all"
                        style={{
                          background: status === 'sending'
                            ? 'rgba(11, 155, 170, 0.4)'
                            : 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                          color: '#0A1628',
                          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {status === 'sending' ? 'Sending...' : 'Send message →'}
                      </button>

                      <p className="text-xs text-center" style={{ color: '#8BAFC0' }}>
                        By submitting this form you agree to our{' '}
                        <Link href="/privacy-policy" style={{ color: '#0B9BAA' }}>Privacy Policy</Link>.
                      </p>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
