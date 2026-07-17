import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Technology & Business Insights | QivaLabs',
  description:
    "Practical insights on software development, AI automation, digital marketing, and business technology from QivaLabs LLP — Udaipur's full-service IT company.",
  alternates: { canonical: 'https://qivalabs.com/blog' },
  openGraph: {
    title: 'Blog — QivaLabs | Technology & Business Insights',
    description: 'Practical technology and business insights from QivaLabs LLP, Udaipur.',
    url: 'https://qivalabs.com/blog',
    type: 'website',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Software Development': '#0B9BAA',
  'AI & Automation': '#16C4D6',
  'Website Development': '#0B9BAA',
  'Digital Marketing': '#16C4D6',
  'IT Infrastructure': '#0B9BAA',
};

export default function BlogPage() {
  const posts = getAllPosts();

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
              <span className="tag mb-4 inline-flex">QivaLabs Blog</span>
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
                Practical, opinionated content on software development, AI automation, digital
                marketing, and business technology — written from the perspective of people
                who actually build these things for businesses across India.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Posts grid */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          {posts.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <article
                      className="flex flex-col h-full p-6 rounded-xl card-angular"
                      style={{
                        backgroundColor: '#0F2742',
                        border: '1px solid rgba(11, 155, 170, 0.18)',
                      }}
                    >
                      {/* Category */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded"
                          style={{
                            backgroundColor: 'rgba(11, 155, 170, 0.12)',
                            color: CATEGORY_COLORS[post.category] ?? '#0B9BAA',
                            border: '1px solid rgba(11, 155, 170, 0.2)',
                          }}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs" style={{ color: '#4A6E80' }}>
                          {post.readingTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        className="font-bold mb-3 text-base leading-snug flex-none"
                        style={{
                          fontFamily: 'var(--font-space-grotesk)',
                          color: '#ffffff',
                          transition: 'color 0.2s',
                        }}
                      >
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#8BAFC0' }}>
                        {post.excerpt}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(11, 155, 170, 0.12)' }}>
                        <time
                          className="text-xs"
                          style={{ color: '#4A6E80' }}
                          dateTime={post.publishedDate}
                        >
                          {new Date(post.publishedDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </time>
                        <span className="text-xs font-medium" style={{ color: '#16C4D6' }}>
                          Read →
                        </span>
                      </div>
                    </article>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerReveal>
          ) : (
            <ScrollReveal className="text-center py-16">
              <p style={{ color: '#8BAFC0' }}>Blog posts are on the way. Check back soon.</p>
            </ScrollReveal>
          )}
        </SectionWrapper>

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
              Have a specific technology challenge?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8BAFC0' }}>
              Reach out directly — we&apos;re always happy to have a no-obligation conversation
              about your project or situation.
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
