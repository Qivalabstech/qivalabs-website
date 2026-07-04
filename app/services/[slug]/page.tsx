import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';
import { SERVICES, getServiceBySlug } from '@/lib/services-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `https://qivalabs.com/services/${service.slug}`,
    },
    alternates: {
      canonical: `https://qivalabs.com/services/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  const related = service.relatedSlugs
    .map((s) => SERVICES.find((svc) => svc.slug === s))
    .filter(Boolean) as typeof SERVICES;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `https://qivalabs.com/services/${service.slug}`,
        name: service.title,
        description: service.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'QivaLabs LLP',
          url: 'https://qivalabs.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Udaipur',
            addressRegion: 'Rajasthan',
            addressCountry: 'IN',
          },
        },
        areaServed: { '@type': 'Country', name: 'India' },
        url: `https://qivalabs.com/services/${service.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://qivalabs.com/services' },
          { '@type': 'ListItem', position: 3, name: service.title, item: `https://qivalabs.com/services/${service.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              background: 'radial-gradient(circle, rgba(11, 155, 170, 0.09) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-xs mb-8"
              style={{ color: '#8BAFC0' }}
              aria-label="Breadcrumb"
            >
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <Link href="/services" style={{ color: '#8BAFC0' }}>Services</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>{service.title}</span>
            </nav>

            <ScrollReveal>
              <span className="tag mb-4 inline-flex">{service.category}</span>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl">{service.icon}</span>
              </div>
              <h1
                className="font-bold leading-tight mb-5"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2rem, 5vw, 3.4rem)',
                  color: '#ffffff',
                }}
              >
                {service.h1}
              </h1>
              <p
                className="text-xl leading-relaxed max-w-3xl mb-8"
                style={{ color: '#8BAFC0' }}
              >
                {service.tagline}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                  color: '#0A1628',
                  boxShadow: '0 0 24px rgba(22, 196, 214, 0.25)',
                }}
              >
                Get a free quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Problem / Solution */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <div className="grid lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div
                className="p-6 rounded-xl h-full"
                style={{
                  backgroundColor: 'rgba(11, 58, 74, 0.4)',
                  border: '1px solid rgba(11, 155, 170, 0.15)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚠️</span>
                  <h2
                    className="font-semibold text-lg"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                  >
                    The Challenge
                  </h2>
                </div>
                <p className="text-base leading-relaxed" style={{ color: '#8BAFC0' }}>
                  {service.problemStatement}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div
                className="p-6 rounded-xl h-full"
                style={{
                  backgroundColor: 'rgba(11, 155, 170, 0.08)',
                  border: '1px solid rgba(11, 155, 170, 0.25)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">✅</span>
                  <h2
                    className="font-semibold text-lg"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                  >
                    The QivaLabs Approach
                  </h2>
                </div>
                <p className="text-base leading-relaxed" style={{ color: '#8BAFC0' }}>
                  {service.solutionStatement}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>

        {/* Body content */}
        <SectionWrapper>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main body */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <h2
                  className="font-bold mb-6"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                    color: '#ffffff',
                  }}
                >
                  How we deliver {service.shortTitle}
                </h2>
                <div
                  className="prose prose-invert max-w-none"
                  style={{ color: '#A0C0C8' }}
                >
                  {service.bodyContent.split('\n\n').map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed mb-5"
                      style={{ color: '#A0C0C8' }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar: what's included */}
            <div>
              <ScrollReveal delay={0.1}>
                <div
                  className="p-6 rounded-xl sticky top-24"
                  style={{
                    backgroundColor: '#0F2742',
                    border: '1px solid rgba(11, 155, 170, 0.2)',
                  }}
                >
                  <h3
                    className="font-semibold mb-5 text-base"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#16C4D6' }}
                  >
                    What&apos;s included
                  </h3>
                  <ul className="space-y-3">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="flex-shrink-0 mt-0.5"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0B9BAA"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm leading-relaxed" style={{ color: '#A0C0C8' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(11, 155, 170, 0.15)' }}>
                    <Link
                      href="/contact"
                      className="block w-full text-center py-3 rounded-lg font-semibold text-sm transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                        color: '#0A1628',
                      }}
                    >
                      Get a quote for this service
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </SectionWrapper>

        {/* Related services */}
        {related.length > 0 && (
          <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
            <ScrollReveal className="mb-8">
              <h2
                className="font-bold"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  color: '#ffffff',
                }}
              >
                Related services
              </h2>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((rel) => (
                <StaggerItem key={rel.slug}>
                  <Link
                    href={`/services/${rel.slug}`}
                    className="flex items-start gap-3 p-4 rounded-xl card-angular hover-card"
                    style={{
                      backgroundColor: 'rgba(15, 39, 66, 0.7)',
                      border: '1px solid rgba(11, 155, 170, 0.15)',
                    }}
                  >
                    <span className="text-xl flex-shrink-0">{rel.icon}</span>
                    <div>
                      <p
                        className="text-sm font-medium mb-1"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#C9D6D9' }}
                      >
                        {rel.shortTitle}
                      </p>
                      <p className="text-xs" style={{ color: '#0B9BAA' }}>Learn more →</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </SectionWrapper>
        )}

        {/* Final CTA */}
        <SectionWrapper>
          <ScrollReveal className="text-center">
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                color: '#ffffff',
              }}
            >
              Ready to get started with {service.shortTitle}?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8BAFC0' }}>
              Tell us about your project. We&apos;ll get back to you with a clear scope and
              investment estimate within 48 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                  color: '#0A1628',
                  boxShadow: '0 0 24px rgba(22, 196, 214, 0.2)',
                }}
              >
                Get a free quote
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                style={{
                  backgroundColor: 'rgba(11, 155, 170, 0.1)',
                  color: '#C9D6D9',
                  border: '1px solid rgba(11, 155, 170, 0.25)',
                }}
              >
                Browse all services
              </Link>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
