import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';
import MotionCard from '@/components/MotionCard';
import { SERVICE_CATEGORIES, getServicesByCategory } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'All Services — Software, Digital & IT Solutions | QivaLabs',
  description:
    'Explore all 31 services from QivaLabs LLP — custom software, mobile apps, AI automation, digital marketing, cloud solutions, cybersecurity, and more. Udaipur, India.',
  alternates: { canonical: 'https://qivalabs.com/services' },
  openGraph: {
    title: 'All Services — QivaLabs | Udaipur, India',
    description:
      'Full-service IT and digital solutions — 31 services across software development, digital marketing, AI automation, and IT infrastructure.',
    url: 'https://qivalabs.com/services',
    type: 'website',
  },
};

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'QivaLabs Services',
  url: 'https://qivalabs.com/services',
  description: 'All services offered by QivaLabs LLP — full-service IT and digital solutions company in Udaipur, India.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://qivalabs.com/services' },
    ],
  },
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Digital & Marketing': 'Websites, branding, SEO, and digital campaigns that grow your online presence and generate leads.',
  'Software Development': 'Custom software, mobile apps, e-commerce, APIs, and enterprise platforms built to your exact spec.',
  'IT Infrastructure': 'Cloud, DevOps, databases, hosting, and cybersecurity — reliable infrastructure that scales with you.',
  'AI & Automation': 'AI integrations, workflow automation, and business process automation that reduce manual work.',
  'Support & Consulting': 'IT consulting, maintenance, technical support, and account management for ongoing peace of mind.',
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />

      <Navbar />

      <main className="pt-16">
        {/* Header */}
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
              <Link href="/" className="hover-link" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>Services</span>
            </nav>

            <ScrollReveal>
              <span className="tag mb-4 inline-flex">31 services</span>
              <h1
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  color: '#ffffff',
                }}
              >
                Everything your business needs —{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  one partner.
                </span>
              </h1>
              <p className="text-xl leading-relaxed max-w-3xl" style={{ color: '#8BAFC0' }}>
                From your first website to your most complex enterprise platform — QivaLabs has
                the capability to cover every dimension of your digital and technology needs.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Services by category */}
        {SERVICE_CATEGORIES.map((category, catIdx) => {
          const services = getServicesByCategory(category);
          return (
            <SectionWrapper
              key={category}
              style={{
                backgroundColor: catIdx % 2 === 0 ? '#0D2035' : '#0A1628',
              } as React.CSSProperties}
            >
              <ScrollReveal className="mb-10">
                <span className="tag mb-3 inline-flex">{category}</span>
                <h2
                  className="font-bold mb-3"
                  style={{
                    fontFamily: 'var(--font-space-grotesk)',
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                    color: '#ffffff',
                  }}
                >
                  {category}
                </h2>
                <p className="text-base" style={{ color: '#8BAFC0' }}>
                  {CATEGORY_DESCRIPTIONS[category]}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service, i) => (
                  <MotionCard
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    icon={service.icon}
                    title={service.title}
                    tagline={service.tagline}
                    index={i}
                  />
                ))}
              </div>
            </SectionWrapper>
          );
        })}

        {/* CTA */}
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
              Not sure what you need?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8BAFC0' }}>
              Tell us about your business challenge and we&apos;ll recommend the right combination
              of services with a clear scope and investment estimate.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                color: '#0A1628',
                boxShadow: '0 0 24px rgba(22, 196, 214, 0.25)',
              }}
            >
              Talk to us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
