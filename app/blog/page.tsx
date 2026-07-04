import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';

export const metadata: Metadata = {
  title: 'Blog — Technology & Business Insights | QivaLabs',
  description:
    'Insights on software development, AI, digital marketing, and business technology from QivaLabs LLP — Udaipur\'s full-service IT and digital solutions company.',
  openGraph: {
    title: 'Blog — QivaLabs | Technology & Business Insights',
    description: 'Practical technology and business insights from QivaLabs LLP, Udaipur.',
  },
};

const COMING_SOON_TOPICS = [
  { icon: '🤖', topic: 'AI & Automation', description: 'Practical AI integration for Indian SMEs — what works, what doesn\'t, and what to try first.' },
  { icon: '🚀', topic: 'Software Development', description: 'Architecture decisions, tech stack choices, and lessons from building real products.' },
  { icon: '📣', topic: 'Digital Marketing', description: 'SEO, paid ads, and content strategies that generate real leads in the Indian market.' },
  { icon: '☁️', topic: 'Cloud & Infrastructure', description: 'Cost-effective cloud setups, DevOps pipelines, and infrastructure decisions for growing teams.' },
  { icon: '💡', topic: 'Business Technology', description: 'How technology decisions shape business outcomes — from CRM to ERP to custom software.' },
  { icon: '🔒', topic: 'Cybersecurity', description: 'Practical security guidance for businesses that can\'t afford a dedicated security team.' },
];

export default function BlogPage() {
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
              background: 'radial-gradient(circle, rgba(11, 155, 170, 0.07) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#8BAFC0' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>Blog</span>
            </nav>
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Coming soon</span>
              <h1
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  color: '#ffffff',
                }}
              >
                Insights from the{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  QivaLabs team.
                </span>
              </h1>
              <p className="text-xl leading-relaxed max-w-2xl" style={{ color: '#8BAFC0' }}>
                Practical technology and business content is coming soon. We&apos;ll be covering
                software development, AI & automation, digital marketing, and business strategy
                for Indian businesses.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Topics preview */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <ScrollReveal className="mb-10">
            <h2
              className="font-bold mb-3"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#ffffff',
              }}
            >
              Topics we&apos;ll be covering
            </h2>
            <p style={{ color: '#8BAFC0' }}>
              Practical, opinionated content based on what we see building software and digital
              products for real businesses every day.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMING_SOON_TOPICS.map((topic) => (
              <div
                key={topic.topic}
                className="p-5 rounded-xl card-angular"
                style={{
                  backgroundColor: 'rgba(15, 39, 66, 0.7)',
                  border: '1px solid rgba(11, 155, 170, 0.15)',
                }}
              >
                <span className="text-2xl mb-3 block">{topic.icon}</span>
                <h3
                  className="font-semibold mb-2"
                  style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                >
                  {topic.topic}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8BAFC0' }}>
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Notify CTA */}
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
              Can&apos;t wait? Talk to us directly.
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8BAFC0' }}>
              If you have a specific technology challenge you want to discuss, reach out — we&apos;re
              always happy to have a no-obligation conversation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
              style={{
                background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                color: '#0A1628',
              }}
            >
              Get in touch
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
