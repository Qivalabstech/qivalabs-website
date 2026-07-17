import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import SectionWrapper, { SectionHeader } from '@/components/SectionWrapper';
import { supabase, type JobListing } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Careers at QivaLabs — Join Our Team | Udaipur, India',
  description:
    'Explore open roles at QivaLabs LLP in Udaipur, Rajasthan. We\'re building India\'s most capable small software team — come build with us.',
  alternates: { canonical: 'https://qivalabs.com/career' },
  openGraph: {
    title: 'Careers at QivaLabs — Join Our Team',
    description: 'Open roles at QivaLabs LLP — Udaipur, Rajasthan.',
    url: 'https://qivalabs.com/career',
    type: 'website',
  },
};

const FALLBACK_JOBS: JobListing[] = [
  {
    id: 'bda-seed',
    title: 'Business Development Associate (Commission-Based)',
    slug: 'business-development-associate',
    department: 'Sales & Business Development',
    location: 'Udaipur, Rajasthan (Remote / Hybrid)',
    employment_type: 'commission',
    is_commission_based: true,
    description: 'Identify businesses that need websites, apps, AI automation, or digital marketing, and introduce them to QivaLabs. 10% commission on every project you bring in — no ceiling.',
    requirements: [],
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getActiveJobs(): Promise<JobListing[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return FALLBACK_JOBS;
    }
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error || !data?.length) return FALLBACK_JOBS;
    return data;
  } catch {
    return FALLBACK_JOBS;
  }
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  'contract': 'Contract',
  'commission': 'Commission-Based',
};

const careerJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'QivaLabs Careers',
  url: 'https://qivalabs.com/career',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://qivalabs.com/career' },
    ],
  },
};

export default async function CareerPage() {
  const jobs = await getActiveJobs();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careerJsonLd) }}
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
              background: 'radial-gradient(circle, rgba(11, 155, 170, 0.07) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: '#8BAFC0' }} aria-label="Breadcrumb">
              <Link href="/" style={{ color: '#8BAFC0' }}>Home</Link>
              <span>/</span>
              <span style={{ color: '#C9D6D9' }}>Careers</span>
            </nav>
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">We&apos;re hiring</span>
              <h1
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  color: '#ffffff',
                }}
              >
                Build with{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  QivaLabs.
                </span>
              </h1>
              <p className="text-xl leading-relaxed max-w-2xl" style={{ color: '#8BAFC0' }}>
                We&apos;re a small team with big ambitions — building software, AI products, and
                digital solutions for businesses across India from Udaipur, Rajasthan. If you want
                real ownership over real work, we want to hear from you.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Open roles */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <SectionHeader
            tag="Open roles"
            h2={`${jobs.length} position${jobs.length !== 1 ? 's' : ''} available`}
            description="All roles are open to applications now. We aim to respond within 5 business days."
          />

          <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {jobs.map((job) => (
              <StaggerItem key={job.id}>
                <Link href={`/career/${job.slug}`} className="group block h-full">
                  <article
                    className="flex flex-col h-full p-6 rounded-xl card-angular"
                    style={{
                      backgroundColor: '#0F2742',
                      border: '1px solid rgba(11, 155, 170, 0.18)',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2
                        className="font-bold text-base leading-snug"
                        style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                      >
                        {job.title}
                      </h2>
                      <span
                        className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded"
                        style={{
                          backgroundColor: job.is_commission_based
                            ? 'rgba(22, 196, 214, 0.12)'
                            : 'rgba(11, 155, 170, 0.12)',
                          color: job.is_commission_based ? '#16C4D6' : '#0B9BAA',
                          border: `1px solid ${job.is_commission_based ? 'rgba(22, 196, 214, 0.25)' : 'rgba(11, 155, 170, 0.25)'}`,
                        }}
                      >
                        {TYPE_LABELS[job.employment_type] ?? job.employment_type}
                      </span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs" style={{ color: '#8BAFC0' }}>
                      <span>{job.department}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                    </div>

                    {/* Excerpt */}
                    <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: '#8BAFC0' }}>
                      {job.description.length > 200
                        ? job.description.slice(0, 200).trim() + '…'
                        : job.description}
                    </p>

                    <span className="text-xs font-medium" style={{ color: '#16C4D6' }}>
                      View role & apply →
                    </span>
                  </article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </SectionWrapper>

        {/* Why QivaLabs section */}
        <SectionWrapper>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Why QivaLabs</span>
              <h2
                className="font-bold leading-tight mb-5"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
                  color: '#ffffff',
                }}
              >
                Small team. Real work.{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  No corporate nonsense.
                </span>
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: '#8BAFC0' }}>
                We&apos;re a DPIIT-recognised startup (DIPP247112) incorporated in Udaipur,
                building real products for real clients. At our stage, what you work on
                matters — you&apos;re not a cog. Every person on the team shapes what QivaLabs
                becomes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: '🏗️', title: 'Ownership from day one', desc: 'Not a committee. You own the work you do.' },
                  { icon: '📈', title: 'Performance-linked rewards', desc: 'We reward results — not seniority or politics.' },
                  { icon: '🌐', title: 'Work from Udaipur', desc: 'We\'re Udaipur-based and proud of it. No relocating to a metro.' },
                  { icon: '⚙️', title: 'Interesting technical problems', desc: 'AI, automation, custom software — real engineering work.' },
                ].map((v) => (
                  <div
                    key={v.title}
                    className="p-5 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(11, 155, 170, 0.06)',
                      border: '1px solid rgba(11, 155, 170, 0.15)',
                    }}
                  >
                    <span className="text-2xl mb-2 block">{v.icon}</span>
                    <h3
                      className="font-semibold text-sm mb-1"
                      style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                    >
                      {v.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#8BAFC0' }}>{v.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>

        {/* General application CTA */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <ScrollReveal className="text-center">
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: 'var(--font-space-grotesk)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#ffffff',
              }}
            >
              Don&apos;t see the right role?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: '#8BAFC0' }}>
              We&apos;re always interested in meeting talented people. If you think you&apos;d fit
              at QivaLabs but don&apos;t see a matching role, send us a note.
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
