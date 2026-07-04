import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import SectionWrapper, { SectionHeader } from '@/components/SectionWrapper';
import GeometricBackground from '@/components/GeometricBackground';
import { LogoMark } from '@/components/Logo';
import AnimatedCounter from '@/components/AnimatedCounter';
import { getFeaturedServices, SERVICES } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'QivaLabs — Full-Service Software & Digital Solutions | Udaipur, India',
  description:
    'QivaLabs LLP is a full-service IT company in Udaipur, Rajasthan. We build custom software, mobile apps, websites, AI automation, and digital marketing solutions for businesses across India.',
  openGraph: {
    title: 'QivaLabs — Full-Service Software & Digital Solutions | Udaipur',
    description:
      'Custom software, mobile apps, AI automation, and digital marketing from QivaLabs LLP — Udaipur\'s full-service IT partner.',
  },
};

const STATS = [
  { value: 5, suffix: '+', label: 'Years experience' },
  { value: 60, suffix: '+', label: 'Projects delivered' },
  { value: 31, suffix: '', label: 'Services offered' },
  { value: 100, suffix: '%', label: 'Client satisfaction' },
];

const DIFFERENTIATORS = [
  {
    icon: '⚡',
    title: 'End-to-end ownership',
    description:
      'From design and development to deployment, maintenance, and marketing — one partner handles everything.',
  },
  {
    icon: '🎯',
    title: 'Outcome-first thinking',
    description:
      'We measure success by business results: leads generated, processes automated, costs reduced — not lines of code.',
  },
  {
    icon: '🧩',
    title: 'Built for India',
    description:
      'UPI payments, GST compliance, Hindi/English interfaces, Indian cloud regions — we build for how Indian businesses actually operate.',
  },
  {
    icon: '🔒',
    title: 'Transparent delivery',
    description:
      'Fixed-scope projects or retainer arrangements with clear milestones, live progress visibility, and no surprise invoices.',
  },
];

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://qivalabs.com/#organization',
      name: 'QivaLabs LLP',
      url: 'https://qivalabs.com',
      logo: 'https://qivalabs.com/og-image.png',
      description:
        'Full-service software and digital solutions company based in Udaipur, Rajasthan, India.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Udaipur',
        addressRegion: 'Rajasthan',
        postalCode: '313001',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'hello@qivalabs.com',
      },
      sameAs: [
        'https://linkedin.com/company/qivalabs',
        'https://instagram.com/qivalabs',
        'https://twitter.com/qivalabs',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://qivalabs.com/#localbusiness',
      name: 'QivaLabs LLP',
      url: 'https://qivalabs.com',
      telephone: '+91-98765-43210',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Udaipur',
        addressRegion: 'Rajasthan',
        postalCode: '313001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 24.5854,
        longitude: 73.7125,
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://qivalabs.com/#website',
      url: 'https://qivalabs.com',
      name: 'QivaLabs',
      publisher: { '@id': 'https://qivalabs.com/#organization' },
    },
  ],
};

export default function HomePage() {
  const featured = getFeaturedServices();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <Navbar />

      <main>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex flex-col justify-center overflow-hidden"
          style={{ backgroundColor: '#0A1628' }}
        >
          <GeometricBackground />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
            <div className="max-w-4xl">
              <ScrollReveal delay={0.05}>
                <span className="tag mb-6 inline-flex">Udaipur, Rajasthan · India</span>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <h1
                  className="font-bold leading-tight mb-6"
                  style={{
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                    fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
                    color: '#ffffff',
                  }}
                >
                  End-to-End Software{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #0B9BAA 0%, #16C4D6 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    &amp; Digital Solutions
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p
                  className="text-xl leading-relaxed mb-10 max-w-2xl"
                  style={{ color: '#8BAFC0' }}
                >
                  From custom software and mobile apps to AI automation and digital marketing —
                  QivaLabs is your full-service IT partner for building, automating, and scaling
                  your business.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.28}>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                      color: '#0A1628',
                      boxShadow: '0 0 24px rgba(22, 196, 214, 0.3)',
                    }}
                  >
                    Explore our services
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all"
                    style={{
                      backgroundColor: 'rgba(11, 155, 170, 0.12)',
                      color: '#16C4D6',
                      border: '1px solid rgba(11, 155, 170, 0.35)',
                    }}
                  >
                    Get a free quote
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="relative z-10 w-full"
            style={{ borderTop: '1px solid rgba(11, 155, 170, 0.15)' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {STATS.map(({ value, suffix, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{
                        fontFamily: 'var(--font-space-grotesk)',
                        background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      <AnimatedCounter to={value} suffix={suffix} />
                    </div>
                    <div className="text-xs uppercase tracking-wider" style={{ color: '#8BAFC0' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Services ─────────────────────────────────────── */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <SectionHeader
            tag="What we build"
            h2="Services that move businesses forward"
            description="We cover the full technology and digital spectrum — so your growth isn't limited by needing multiple vendors."
          />

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {featured.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block p-6 rounded-xl card-angular card-glow h-full"
                  style={{
                    backgroundColor: '#0F2742',
                    border: '1px solid rgba(11, 155, 170, 0.18)',
                  }}
                >
                  <span className="text-3xl mb-4 block">{service.icon}</span>
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                  >
                    {service.shortTitle}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
                    {service.tagline}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium"
                    style={{ color: '#0B9BAA' }}
                  >
                    Learn more
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <ScrollReveal className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all"
              style={{
                backgroundColor: 'rgba(11, 155, 170, 0.12)',
                color: '#16C4D6',
                border: '1px solid rgba(11, 155, 170, 0.3)',
              }}
            >
              View all {SERVICES.length}+ services
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </SectionWrapper>

        {/* ── Why QivaLabs ──────────────────────────────────────────── */}
        <SectionWrapper>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Why QivaLabs</span>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  color: '#ffffff',
                }}
              >
                One partner.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Everything you need.
                </span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#8BAFC0' }}>
                Most businesses need 4–6 vendors to cover technology, design, marketing, and
                operations support. QivaLabs delivers it all — from a single team that knows your
                business end to end.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DIFFERENTIATORS.map((d) => (
                <StaggerItem key={d.title}>
                  <div
                    className="p-5 rounded-xl h-full"
                    style={{
                      backgroundColor: 'rgba(11, 155, 170, 0.06)',
                      border: '1px solid rgba(11, 155, 170, 0.15)',
                    }}
                  >
                    <span className="text-2xl mb-3 block">{d.icon}</span>
                    <h3
                      className="font-semibold mb-2 text-base"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                    >
                      {d.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
                      {d.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </SectionWrapper>

        {/* ── About teaser ──────────────────────────────────────────── */}
        <SectionWrapper
          style={{ backgroundColor: '#0D2035' } as React.CSSProperties}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              {/* Large logo mark as visual element */}
              <div
                className="rounded-2xl p-12 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(11, 155, 170, 0.1) 0%, rgba(11, 58, 74, 0.3) 100%)',
                  border: '1px solid rgba(11, 155, 170, 0.2)',
                  minHeight: '280px',
                }}
              >
                <LogoMark size={160} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <span className="tag mb-4 inline-flex">About QivaLabs</span>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  color: '#ffffff',
                }}
              >
                Built in Udaipur.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Trusted across India.
                </span>
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: '#8BAFC0' }}>
                QivaLabs LLP was founded in Udaipur, Rajasthan by a team of engineers and
                strategists who believe that great technology should be accessible to every
                business — not just the ones with Fortune 500 budgets.
              </p>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#8BAFC0' }}>
                Today we serve clients across industries — retail, finance, hospitality,
                manufacturing, healthcare, and more — delivering software that actually gets used,
                and outcomes that actually matter.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                  color: '#0A1628',
                }}
              >
                Our story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </SectionWrapper>

        {/* ── CTA Band ──────────────────────────────────────────────── */}
        <SectionWrapper>
          <ScrollReveal>
            <div
              className="rounded-2xl px-8 py-16 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0B3A4A 0%, #0B9BAA 50%, #0B3A4A 100%)',
              }}
            >
              {/* Geometric overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 20px)',
                }}
              />
              <div className="relative z-10">
                <h2
                  className="font-bold mb-4"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
                    color: '#ffffff',
                  }}
                >
                  Ready to build something great?
                </h2>
                <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'rgba(232, 238, 240, 0.8)' }}>
                  Tell us about your project and we&apos;ll come back with a clear proposal — scope,
                  timeline, and investment — within 48 hours.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                    style={{ backgroundColor: '#0A1628', color: '#16C4D6' }}
                  >
                    Start the conversation
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                    style={{ backgroundColor: 'rgba(10, 22, 40, 0.4)', color: '#E8EEF0', border: '1px solid rgba(232, 238, 240, 0.2)' }}
                  >
                    Browse all services
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
