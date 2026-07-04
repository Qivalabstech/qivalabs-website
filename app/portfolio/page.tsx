import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerReveal, StaggerItem } from '@/components/ScrollReveal';
import SectionWrapper, { SectionHeader } from '@/components/SectionWrapper';

export const metadata: Metadata = {
  title: 'Portfolio & Case Studies — QivaLabs | Udaipur, India',
  description:
    'Explore QivaLabs\' portfolio of software, web, and digital projects — including WaitJI AI, QIVA Bot, hotel websites, ed-tech platforms, and enterprise software. Based in Udaipur, India.',
  openGraph: {
    title: 'Portfolio — QivaLabs | Work & Case Studies',
    description: 'Software, web, AI, and digital projects delivered by QivaLabs LLP from Udaipur, India.',
  },
};

const PROJECTS = [
  {
    title: 'WaitJI AI',
    category: 'AI Product',
    description:
      "India's first AI ad marketplace that monetises the idle wait time inside developer tools (Claude Code, Copilot, and similar AI coding assistants). A full-stack SaaS platform with publisher SDK, advertiser dashboard, and real-time impression delivery.",
    tags: ['AI / ML', 'SaaS', 'Next.js', 'Node.js'],
    highlight: 'Launched to market · External product',
    link: 'https://waitjiai.in',
    external: true,
    icon: '⏱️',
  },
  {
    title: 'QIVA Bot (Mandi WhatsApp Automation)',
    category: 'AI Automation',
    description:
      'A multi-bot WhatsApp automation system for wholesale mandi businesses in India. Three specialised AI bots handle customer orders, supplier management, and owner analytics — replacing manual WhatsApp staff and running 24/7.',
    tags: ['WhatsApp API', 'AI', 'Automation', 'Node.js'],
    highlight: 'Active clients · Udaipur, Rajasthan',
    icon: '🤖',
  },
  {
    title: 'Jharokha Haveli',
    category: 'Hospitality Website',
    description:
      'Heritage boutique hotel website for a property in Udaipur. Features an immersive full-screen design with rich photography, room booking inquiry forms, dining and amenities pages, and local area guides. Built on Next.js with Tailwind v4.',
    tags: ['Next.js', 'Tailwind CSS', 'UX Design', 'SEO'],
    highlight: 'Udaipur heritage hotel',
    icon: '🏰',
  },
  {
    title: 'Surbhi Ed-Tech Platform',
    category: 'Education Technology',
    description:
      'A comprehensive multi-page ed-tech platform for an education brand. Includes course listings, student portals, instructor profiles, payment integration, and a demo authentication system. 13 pages built on Next.js 16 with modern UI.',
    tags: ['Next.js', 'Ed-Tech', 'Payments', 'TypeScript'],
    highlight: 'Full platform · 13 pages',
    icon: '📚',
  },
  {
    title: 'AI CRM Automation',
    category: 'AI Integration',
    description:
      'An intelligent AI layer built on top of CRM systems (Zoho, HubSpot, Freshdesk) for B2B support teams. Automatically triages inbound emails and messages into three tiers: auto-resolved, agent-assisted, and human escalation.',
    tags: ['LLM Integration', 'CRM', 'AI', 'Python'],
    highlight: 'B2B SaaS product',
    icon: '🧠',
  },
  {
    title: 'Print Support Platform',
    category: 'Web Application',
    description:
      'A full-stack printer support platform with React/Vite frontend and Express backend. Features real-time live chat with Socket.io, agent and admin dashboards, job tracking, and customer support workflows for a printer service business.',
    tags: ['React', 'Express', 'Socket.io', 'Node.js'],
    highlight: 'Real-time support system',
    icon: '🖨️',
  },
];

const CATEGORIES = ['All', 'AI Product', 'AI Automation', 'AI Integration', 'Hospitality Website', 'Education Technology', 'Web Application'];

const portfolioJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'QivaLabs Portfolio',
  url: 'https://qivalabs.com/portfolio',
  description: 'Portfolio of software, web, and digital projects delivered by QivaLabs LLP.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://qivalabs.com' },
      { '@type': 'ListItem', position: 2, name: 'Portfolio', item: 'https://qivalabs.com/portfolio' },
    ],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />

      <Navbar />

      <main className="pt-16">
        {/* Hero */}
        <section
          className="relative py-20 overflow-hidden"
          style={{ backgroundColor: '#0A1628' }}
        >
          <div
            className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none"
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
              <span style={{ color: '#C9D6D9' }}>Portfolio</span>
            </nav>
            <ScrollReveal>
              <span className="tag mb-4 inline-flex">Our work</span>
              <h1
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  color: '#ffffff',
                }}
              >
                Projects that{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  deliver results.
                </span>
              </h1>
              <p className="text-xl leading-relaxed max-w-3xl" style={{ color: '#8BAFC0' }}>
                A selection of software, AI, web, and digital projects we&apos;ve built for clients
                across industries — and products we&apos;ve built ourselves.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Projects grid */}
        <SectionWrapper style={{ backgroundColor: '#0D2035' } as React.CSSProperties}>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <StaggerItem key={project.title}>
                <div
                  className="flex flex-col p-6 rounded-xl card-angular h-full card-glow"
                  style={{
                    backgroundColor: '#0F2742',
                    border: '1px solid rgba(11, 155, 170, 0.18)',
                  }}
                >
                  {/* Icon + Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{project.icon}</span>
                    <span className="tag text-xs">{project.category}</span>
                  </div>

                  <h2
                    className="font-bold mb-3 text-lg"
                    style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
                  >
                    {project.title}
                  </h2>

                  <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#8BAFC0' }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(11, 155, 170, 0.1)',
                          color: '#16C4D6',
                          border: '1px solid rgba(11, 155, 170, 0.2)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlight + Link */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#0B9BAA' }}>
                      ✓ {project.highlight}
                    </span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium flex items-center gap-1 transition-colors"
                        style={{ color: '#16C4D6' }}
                      >
                        Visit
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </SectionWrapper>

        {/* Testimonial / trust section */}
        <SectionWrapper>
          <ScrollReveal className="text-center">
            <div
              className="max-w-3xl mx-auto p-8 rounded-2xl"
              style={{
                backgroundColor: 'rgba(11, 155, 170, 0.06)',
                border: '1px solid rgba(11, 155, 170, 0.2)',
              }}
            >
              <div
                className="text-4xl font-bold mb-2"
                style={{
                  fontFamily: 'var(--font-space-grotesk)',
                  background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                60+ projects delivered
              </div>
              <p className="text-lg mb-6" style={{ color: '#8BAFC0' }}>
                across software development, AI integration, web design, and digital marketing —
                for clients in Udaipur, Rajasthan, and across India.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #0B9BAA, #16C4D6)',
                  color: '#0A1628',
                }}
              >
                Start your project
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
