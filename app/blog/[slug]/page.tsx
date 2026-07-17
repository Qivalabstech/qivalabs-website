import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import SectionWrapper from '@/components/SectionWrapper';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedDate,
    dateModified: post.updatedDate ?? post.publishedDate,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'QivaLabs LLP',
      url: 'https://qivalabs.com',
    },
    url: `https://qivalabs.com/blog/${post.slug}`,
    keywords: post.keywords.join(', '),
  };

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: `https://qivalabs.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `https://qivalabs.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate ?? post.publishedDate,
      authors: [post.author],
    },
    other: {
      'script:ld+json': JSON.stringify(blogJsonLd),
    },
  };
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
        color: '#ffffff',
        fontWeight: 700,
        lineHeight: 1.25,
        marginBottom: '1rem',
        marginTop: '2rem',
      }}
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
        color: '#ffffff',
        fontWeight: 700,
        lineHeight: 1.3,
        marginBottom: '0.75rem',
        marginTop: '2.5rem',
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      style={{
        fontFamily: 'var(--font-space-grotesk)',
        fontSize: '1.1rem',
        color: '#C9D6D9',
        fontWeight: 600,
        lineHeight: 1.4,
        marginBottom: '0.5rem',
        marginTop: '1.75rem',
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      style={{
        color: '#A0C0C8',
        lineHeight: 1.8,
        fontSize: '1rem',
        marginBottom: '1.25rem',
      }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      style={{
        color: '#A0C0C8',
        paddingLeft: '1.5rem',
        marginBottom: '1.25rem',
        listStyleType: 'disc',
      }}
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      style={{
        color: '#A0C0C8',
        paddingLeft: '1.5rem',
        marginBottom: '1.25rem',
        listStyleType: 'decimal',
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: '0.4rem', lineHeight: 1.7 }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: '#C9D6D9', fontWeight: 600 }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      style={{ color: '#16C4D6', textDecoration: 'underline', textDecorationColor: 'rgba(22,196,214,0.4)' }}
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      style={{
        borderLeft: '3px solid #0B9BAA',
        paddingLeft: '1.25rem',
        color: '#8BAFC0',
        fontStyle: 'italic',
        marginBottom: '1.25rem',
      }}
      {...props}
    />
  ),
  hr: () => (
    <hr style={{ borderColor: 'rgba(11, 155, 170, 0.2)', margin: '2rem 0' }} />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedDate,
        dateModified: post.updatedDate ?? post.publishedDate,
        author: { '@type': 'Person', name: post.author },
        publisher: {
          '@type': 'Organization',
          name: 'QivaLabs LLP',
          url: 'https://qivalabs.com',
          logo: 'https://qivalabs.com/opengraph-image',
        },
        url: `https://qivalabs.com/blog/${post.slug}`,
        keywords: post.keywords.join(', '),
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://qivalabs.com/blog/${post.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://qivalabs.com/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: `https://qivalabs.com/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section
          className="relative py-16 overflow-hidden"
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8 flex-wrap" style={{ color: '#8BAFC0' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: '#8BAFC0' }}>Blog</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>{post.title}</span>
            </nav>

            <ScrollReveal>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded mb-5 inline-flex"
                style={{
                  backgroundColor: 'rgba(11, 155, 170, 0.12)',
                  color: '#0B9BAA',
                  border: '1px solid rgba(11, 155, 170, 0.2)',
                }}
              >
                {post.category}
              </span>
              <h1
                className="font-bold leading-tight mb-5"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                  color: '#ffffff',
                }}
              >
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#8BAFC0' }}>
                <span>{post.author}</span>
                <span style={{ color: '#0B9BAA' }}>·</span>
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <span style={{ color: '#0B9BAA' }}>·</span>
                <span>{post.readingTime}</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Body */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main content */}
              <article className="lg:col-span-3">
                <MDXRemote source={post.content} components={mdxComponents} />
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div
                  className="sticky top-24 p-5 rounded-xl"
                  style={{
                    backgroundColor: '#0F2742',
                    border: '1px solid rgba(11, 155, 170, 0.2)',
                  }}
                >
                  <h3
                    className="font-semibold mb-3 text-sm"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#16C4D6' }}
                  >
                    About QivaLabs
                  </h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: '#8BAFC0' }}>
                    QivaLabs LLP is a full-service software and digital solutions company in
                    Udaipur, Rajasthan. We build custom software, mobile apps, AI automation,
                    and digital marketing solutions for businesses across India.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full text-center py-2.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                      color: '#0A1628',
                    }}
                  >
                    Talk to us →
                  </Link>

                  <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(11, 155, 170, 0.12)' }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: '#8BAFC0' }}>Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {post.keywords.slice(0, 4).map((kw) => (
                        <span
                          key={kw}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{
                            backgroundColor: 'rgba(11, 155, 170, 0.1)',
                            color: '#8BAFC0',
                            border: '1px solid rgba(11, 155, 170, 0.15)',
                          }}
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </SectionWrapper>

        {/* CTA */}
        <SectionWrapper>
          <ScrollReveal className="text-center">
            <div
              className="max-w-2xl mx-auto p-8 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #0B3A4A 0%, #0B9BAA 50%, #0B3A4A 100%)',
              }}
            >
              <h2
                className="font-bold mb-3"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  color: '#ffffff',
                }}
              >
                Ready to talk about your project?
              </h2>
              <p className="mb-6 text-base" style={{ color: 'rgba(232, 238, 240, 0.8)' }}>
                We respond within 48 hours with a clear scope and investment estimate.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm"
                style={{ backgroundColor: '#0A1628', color: '#16C4D6' }}
              >
                Start the conversation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
