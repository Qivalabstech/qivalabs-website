import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import SectionWrapper, { SectionHeader } from '@/components/SectionWrapper';
import FounderCards from '@/components/FounderCards';
import { LogoMark } from '@/components/Logo';

export const metadata: Metadata = {
  title: 'About QivaLabs — Full-Service IT Company in Udaipur, India',
  description:
    'Learn about QivaLabs LLP — our story, our founders, and our mission to deliver world-class software and digital solutions from Udaipur, Rajasthan to businesses across India.',
  openGraph: {
    title: 'About QivaLabs — Full-Service IT Company in Udaipur',
    description: 'Meet the team behind QivaLabs LLP and learn about our story, mission, and values.',
  },
};

const FOUNDERS = [
  {
    name: 'Asad Sheikh',
    role: 'CEO & Designated Partner',
    description:
      'Asad leads QivaLabs\' commercial strategy and client relationships. With a background in business development and technology, he drives the firm\'s growth initiatives and ensures that every engagement is aligned with measurable client outcomes.',
    initials: 'AS',
  },
  {
    name: 'Rajamuddin',
    role: 'CTO & Designated Partner',
    description:
      'Rajamuddin heads the technical architecture and engineering practice at QivaLabs. He oversees the design and delivery of all software products and platforms — ensuring technical excellence, scalability, and long-term maintainability across every project.',
    initials: 'R',
  },
  {
    name: 'Arman Hussain',
    role: 'COO',
    description:
      'Arman manages QivaLabs\' operations, project delivery, and quality assurance. He ensures that projects are delivered on-time, within scope, and to the standard clients expect — coordinating teams, timelines, and client communication across all active engagements.',
    initials: 'AH',
  },
];

const VALUES = [
  {
    icon: '🎯',
    title: 'Outcomes over activity',
    description: 'We measure our work by the business results it produces — not the hours logged or the features shipped.',
  },
  {
    icon: '🔍',
    title: 'Honest advice',
    description: 'We tell clients what they need to hear, not what they want to hear. Independent recommendations, always.',
  },
  {
    icon: '⚡',
    title: 'Built to last',
    description: 'Every system we build is designed for long-term maintainability. We write code that the next engineer can understand.',
  },
  {
    icon: '🤝',
    title: 'Partnership mindset',
    description: 'Our best client relationships are long-term. We invest in understanding your business, not just your current ticket.',
  },
];

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About QivaLabs LLP',
  url: 'https://qivalabs.com/about',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://qivalabs.com/about' },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
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
              background: 'radial-gradient(circle, rgba(11, 155, 170, 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#8BAFC0' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>About</span>
            </nav>
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">About us</span>
              <h1
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
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
              </h1>
              <p className="text-xl leading-relaxed max-w-3xl" style={{ color: '#8BAFC0' }}>
                QivaLabs LLP is a full-service software and digital solutions company based in
                Udaipur, Rajasthan. We work with businesses of all sizes — from local SMEs to
                multi-city enterprises — delivering technology that makes a measurable difference.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Our story */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div
                className="rounded-2xl p-12 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(11, 155, 170, 0.1) 0%, rgba(11, 58, 74, 0.4) 100%)',
                  border: '1px solid rgba(11, 155, 170, 0.2)',
                  minHeight: '280px',
                }}
              >
                <LogoMark size={140} />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2
                className="font-bold mb-5"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  color: '#ffffff',
                }}
              >
                Our story
              </h2>
              <div className="space-y-4 text-base leading-relaxed" style={{ color: '#8BAFC0' }}>
                <p>
                  QivaLabs was born from a simple observation: businesses in India need reliable,
                  high-quality technology partners who understand their context — their market,
                  their constraints, and their ambitions — not just generic development shops that
                  treat every project as a ticket.
                </p>
                <p>
                  We started with a focus on AI and automation, helping businesses in Udaipur and
                  Rajasthan automate repetitive workflows and unlock the value locked in their data.
                  Over time, our clients needed more: websites, mobile apps, e-commerce platforms,
                  cloud infrastructure, digital marketing. We built the capability to serve all of
                  it — under one roof, from one team that knows your business.
                </p>
                <p>
                  Today, QivaLabs is a full-service IT and digital solutions company with expertise
                  spanning software development, AI integration, digital marketing, cloud
                  infrastructure, and business consulting. Our mission hasn&apos;t changed: make
                  great technology accessible to every business that&apos;s serious about growth.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>

        {/* Founders */}
        <SectionWrapper>
          <SectionHeader
            tag="Our team"
            h2="Meet the founders"
            description="QivaLabs is led by three partners who bring together commercial strategy, technical architecture, and operational excellence."
          />

          <FounderCards founders={FOUNDERS} />
        </SectionWrapper>

        {/* Mission */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Mission</span>
              <h2
                className="font-bold mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  color: '#ffffff',
                }}
              >
                Make world-class software accessible{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  to every serious business.
                </span>
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: '#8BAFC0' }}>
                We believe that the quality of software your business runs on shouldn&apos;t be
                determined by its size or location. QivaLabs brings the technical standards and
                delivery disciplines of tier-1 technology firms to businesses in Udaipur,
                Rajasthan, and across India.
              </p>
            </ScrollReveal>
          </div>
        </SectionWrapper>

        {/* Values */}
        <SectionWrapper>
          <SectionHeader
            tag="Values"
            h2="How we work"
          />
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div
                  className="p-5 rounded-xl h-full"
                  style={{
                    backgroundColor: 'rgba(11, 155, 170, 0.06)',
                    border: '1px solid rgba(11, 155, 170, 0.15)',
                  }}
                >
                  <span className="text-2xl mb-3 block">{v.icon}</span>
                  <h3
                    className="font-semibold mb-2 text-base"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
                    {v.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <ScrollReveal className="text-center">
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                color: '#ffffff',
              }}
            >
              Let&apos;s build something together
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8BAFC0' }}>
              We&apos;d love to hear about your business and how QivaLabs might help. No sales
              pressure — just an honest conversation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                  color: '#0A1628',
                }}
              >
                Get in touch
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                style={{
                  backgroundColor: 'rgba(11, 155, 170, 0.1)',
                  color: '#C9D6D9',
                  border: '1px solid rgba(11, 155, 170, 0.25)',
                }}
              >
                View our work
              </Link>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
