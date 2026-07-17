'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';

interface JobListing {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  is_commission_based: boolean;
  description: string;
  requirements: string[];
  is_active: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  'contract': 'Contract',
  'commission': 'Commission-Based',
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

export default function CareerDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    resume_url: '',
    cover_note: '',
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/career/jobs?slug=${slug}`);
        if (!res.ok) { setLoading(false); return; }
        const data = await res.json();
        setJob(data.job ?? null);
      } catch {
        /* fall through */
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job) return;
    setSubmitStatus('sending');
    try {
      const res = await fetch('/api/career/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: job.id, ...form }),
      });
      setSubmitStatus(res.ok ? 'success' : 'error');
    } catch {
      setSubmitStatus('error');
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A1628' }}>
          <div style={{ color: '#8BAFC0' }}>Loading…</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A1628' }}>
          <div className="text-center">
            <h1 style={{ color: '#ffffff', fontFamily: 'var(--font-space-grotesk)', fontSize: '2rem', marginBottom: '1rem' }}>
              Role not found
            </h1>
            <Link href="/career" style={{ color: '#16C4D6' }}>← Back to Careers</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const descriptionParagraphs = job.description.split(/\n\n+/).filter(Boolean);

  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden" style={{ backgroundColor: '#0A1628' }}>
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(11, 155, 170, 0.07) 0%, transparent 70%)', filter: 'blur(60px)' }}
            aria-hidden="true"
          />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8 flex-wrap" style={{ color: '#8BAFC0' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <Link href="/career" style={{ color: '#8BAFC0' }}>Careers</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>{job.title}</span>
            </nav>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-5">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded"
                  style={{
                    backgroundColor: 'rgba(11, 155, 170, 0.12)',
                    color: '#0B9BAA',
                    border: '1px solid rgba(11, 155, 170, 0.2)',
                  }}
                >
                  {job.department}
                </span>
                {job.is_commission_based && (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: 'rgba(22, 196, 214, 0.12)',
                      color: '#16C4D6',
                      border: '1px solid rgba(22, 196, 214, 0.2)',
                    }}
                  >
                    {TYPE_LABELS[job.employment_type]}
                  </span>
                )}
              </div>
              <h1
                className="font-bold leading-tight mb-4"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  color: '#ffffff',
                }}
              >
                {job.title}
              </h1>
              <p className="text-base" style={{ color: '#8BAFC0' }}>{job.location}</p>
            </ScrollReveal>
          </div>
        </section>

        {/* Content + Application Form */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Job details */}
            <div>
              <ScrollReveal>
                <h2
                  className="font-bold mb-5"
                  style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.3rem', color: '#ffffff' }}
                >
                  About this role
                </h2>

                <div className="space-y-4">
                  {descriptionParagraphs.map((para, i) => {
                    const isBold = para.startsWith('**') && para.endsWith('**');
                    if (isBold) {
                      return (
                        <p key={i} className="text-sm font-semibold" style={{ color: '#C9D6D9' }}>
                          {para.replace(/\*\*/g, '')}
                        </p>
                      );
                    }
                    return (
                      <p key={i} className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
                        {para}
                      </p>
                    );
                  })}
                </div>

                {job.requirements.length > 0 && (
                  <div className="mt-8">
                    <h3
                      className="font-semibold mb-4"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#16C4D6', fontSize: '0.95rem' }}
                    >
                      What we&apos;re looking for
                    </h3>
                    <ul className="space-y-3">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B9BAA" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="text-sm leading-relaxed" style={{ color: '#A0C0C8' }}>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ScrollReveal>
            </div>

            {/* Application form */}
            <div>
              <ScrollReveal delay={0.1}>
                <div
                  className="p-7 rounded-2xl"
                  style={{ backgroundColor: '#0F2742', border: '1px solid rgba(11, 155, 170, 0.2)' }}
                >
                  {submitStatus === 'success' ? (
                    <div className="text-center py-10">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: 'rgba(11, 155, 170, 0.15)' }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16C4D6" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h3 className="font-bold mb-2 text-lg" style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}>
                        Application submitted!
                      </h3>
                      <p style={{ color: '#8BAFC0', fontSize: '0.9rem' }}>
                        We&apos;ll review your application and get back to you within 5 business days.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h2
                        className="font-bold mb-2"
                        style={{ fontFamily: 'var(--font-space-grotesk)', fontSize: '1.1rem', color: '#ffffff' }}
                      >
                        Apply for this role
                      </h2>
                      <p className="text-sm mb-5" style={{ color: '#8BAFC0' }}>
                        Fill in your details below and we&apos;ll be in touch.
                      </p>

                      <div>
                        <label style={labelStyle} htmlFor="applicant_name">Full name *</label>
                        <input
                          id="applicant_name" name="applicant_name" type="text" required
                          value={form.applicant_name} onChange={handleChange}
                          placeholder="Your name" style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="email">Email address *</label>
                        <input
                          id="email" name="email" type="email" required
                          value={form.email} onChange={handleChange}
                          placeholder="you@example.com" style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="phone">Phone number</label>
                        <input
                          id="phone" name="phone" type="tel"
                          value={form.phone} onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX" style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="resume_url">Resume / Portfolio link</label>
                        <input
                          id="resume_url" name="resume_url" type="url"
                          value={form.resume_url} onChange={handleChange}
                          placeholder="https://drive.google.com/… or LinkedIn URL"
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle} htmlFor="cover_note">Cover note *</label>
                        <textarea
                          id="cover_note" name="cover_note" required rows={4}
                          value={form.cover_note} onChange={handleChange}
                          placeholder="Why are you interested in this role? What's your relevant background?"
                          style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                        />
                      </div>

                      {submitStatus === 'error' && (
                        <p className="text-sm" style={{ color: '#FF7B7B' }}>
                          Something went wrong. Please email us at hello@qivalabs.com
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submitStatus === 'sending'}
                        className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all"
                        style={{
                          background: submitStatus === 'sending' ? 'rgba(11, 155, 170, 0.4)' : 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                          color: '#0A1628',
                          cursor: submitStatus === 'sending' ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {submitStatus === 'sending' ? 'Submitting…' : 'Submit application →'}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionWrapper>

        {/* Back to careers */}
        <SectionWrapper>
          <ScrollReveal className="text-center">
            <Link
              href="/career"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: '#8BAFC0' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to all open roles
            </Link>
          </ScrollReveal>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
