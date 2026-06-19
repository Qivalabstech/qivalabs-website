import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import CTABand from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'About Us — QivaLabs LLP | AI Business Solutions Partner, Udaipur',
  description:
    'QivaLabs LLP is a DPIIT-recognised GenAI startup incorporated in Udaipur, Rajasthan in February 2026. Founded by Asad Sheikh (CEO), Rajamuddin (CTO), and Arman Hussain (COO).',
  openGraph: {
    title: 'About QivaLabs — AI Business Solutions Partner, Udaipur, Rajasthan',
    description:
      'From mandi bots to a full AI business solutions partner — the story of QivaLabs LLP and the team building serious software for Indian businesses.',
  },
};

const FOUNDERS = [
  {
    name: 'Asad Sheikh',
    role: 'CEO & Co-Founder',
    initials: 'AS',
    gradient: 'linear-gradient(135deg, #7C5CFF, #A78BFA)',
    bio: 'Leads product vision, customer discovery, and go-to-market strategy. Asad drives the commercial relationships that bring QivaLabs products into real mandi businesses and enterprise support teams.',
  },
  {
    name: 'Rajamuddin',
    role: 'CTO & Co-Founder',
    initials: 'RJ',
    gradient: 'linear-gradient(135deg, #22D3EE, #7C5CFF)',
    bio: 'Architects the AI infrastructure powering Mandi WhatsApp Automation, the CRM triage layer, and the WaitJI AI platform. Rajamuddin is responsible for the reliability and intelligence of every product we ship.',
  },
  {
    name: 'Arman Hussain',
    role: 'COO & Co-Founder',
    initials: 'AH',
    gradient: 'linear-gradient(135deg, #FF7849, #FFB347)',
    bio: 'Drives operations, onboarding, and customer success. Arman ensures that every business that signs up with QivaLabs is live, running, and saving money within days of enrolment.',
  },
];

const MILESTONES = [
  { date: 'Feb 2026', event: 'QivaLabs LLP incorporated in Udaipur, Rajasthan (LLPIN: ACV-6746)' },
  { date: '2026', event: 'DPIIT Startup India recognition received (DIPP247112)' },
  { date: '2026', event: 'Mandi WhatsApp Automation (QIVA) launched for wholesale trade businesses' },
  { date: '2026', event: 'AI CRM Automation product developed for support and sales teams' },
  { date: '2026', event: 'WaitJI AI launched as India\'s first AI ad marketplace for dev-tool wait states' },
];

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About QivaLabs LLP',
  url: 'https://qivalabs.com/about',
  description: 'QivaLabs LLP is a DPIIT-recognised GenAI startup based in Udaipur, Rajasthan, India.',
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

      <main className="pt-28 pb-0">

        {/* Page header */}
        <section className="relative py-16 overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(124, 92, 255, 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-text-muted mb-8 font-mono-accent" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-text-primary">About</span>
            </nav>

            <ScrollReveal>
              <span className="tag mb-4 inline-flex">About QivaLabs</span>
              <h1
                className="font-heading font-bold text-text-primary mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
              >
                From mandi bots to a full{' '}
                <span className="gradient-text-violet-cyan">AI business solutions</span>{' '}
                partner.
              </h1>
              <p className="text-text-muted text-xl leading-relaxed max-w-3xl">
                QivaLabs started with a single observation: Indian wholesale businesses were still managing
                customer relationships over personal WhatsApp — and burning ₹10,000–₹15,000/month on a
                person to do it. We built the AI to replace that cost. Then we built a CRM layer for larger
                teams. Then WaitJI AI. Now we&apos;re a three-product company. Here&apos;s the story.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Company facts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-start">

              <ScrollReveal>
                <h2 className="font-heading font-bold text-3xl text-text-primary mb-6">
                  The company
                </h2>
                <div className="space-y-5 text-text-muted leading-relaxed">
                  <p>
                    QivaLabs LLP (LLPIN: ACV-6746) was incorporated in February 2026 in Udaipur, Rajasthan.
                    We are a DPIIT-recognised startup (DIPP247112) focused on building AI automation products
                    for Indian businesses across mandi trade, enterprise support teams, and the developer tooling ecosystem.
                  </p>
                  <p>
                    We chose Udaipur deliberately — not as a cost-saving move, but because we believe the next
                    wave of Indian tech should be built from Tier 2 cities, not just Bengaluru and Mumbai.
                    We understand what mandi culture looks like from the inside. We know how a kirana owner
                    manages credit. We know the difference between a Rajasthani vendor relationship and a
                    Mumbai supply chain. That context is in our products.
                  </p>
                  <p>
                    Our positioning: <strong className="text-text-primary">Your AI Business Solutions Partner.</strong>{' '}
                    That means we don&apos;t sell you a chatbot and walk away. We build AI that runs real
                    business workflows — customer communication, supplier management, inbound triage — and we
                    stay accountable to outcomes, not just deliverables.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="glass rounded-2xl p-8">
                  <h3 className="font-heading font-bold text-text-primary text-xl mb-6">Company details</h3>
                  <dl className="flex flex-col gap-4">
                    {[
                      { label: 'Legal name', value: 'QivaLabs LLP' },
                      { label: 'LLPIN', value: 'ACV-6746' },
                      { label: 'DPIIT Recognition', value: 'DIPP247112' },
                      { label: 'Incorporated', value: 'February 2026' },
                      { label: 'Registered office', value: 'Udaipur, Rajasthan, India' },
                      { label: 'Phone', value: '+91 7231 873 730' },
                      { label: 'Email', value: 'sales@qivalabs.com' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between gap-4 text-sm border-b border-[rgba(124,92,255,0.1)] pb-3 last:border-0 last:pb-0">
                        <dt className="text-text-muted">{label}</dt>
                        <dd className="text-text-primary font-medium text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Founders */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <p className="text-accent-coral text-sm font-semibold uppercase tracking-[0.15em] mb-3 font-mono-accent">
                The Team
              </p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight">
                Three founders who understand<br />the problem from the inside.
              </h2>
            </ScrollReveal>

            <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.12}>
              {FOUNDERS.map((founder) => (
                <StaggerItem key={founder.name}>
                  <div className="glass rounded-2xl p-8 text-center flex flex-col items-center gap-5 h-full">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white"
                      style={{ background: founder.gradient }}
                    >
                      {founder.initials}
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-primary text-xl">{founder.name}</h3>
                      <p className="text-accent-violet text-sm font-medium mt-1">{founder.role}</p>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">{founder.bio}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Timeline */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <h2 className="font-heading font-bold text-3xl text-text-primary">
                Where we&apos;ve been. Where we&apos;re going.
              </h2>
            </ScrollReveal>

            <div className="relative flex flex-col gap-0">
              <div
                className="absolute left-[23px] top-8 bottom-8 w-px"
                style={{ background: 'linear-gradient(to bottom, #7C5CFF, #22D3EE, #FF7849)' }}
                aria-hidden="true"
              />

              {MILESTONES.map((m, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 py-5">
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg z-10"
                      style={{ background: '#0B0B12', border: '2px solid rgba(124,92,255,0.4)' }}
                    >
                      🚀
                    </div>
                    <div className="pt-2">
                      <span className="text-xs font-bold text-accent-violet font-mono-accent">{m.date}</span>
                      <p className="text-text-primary text-sm mt-1 leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" aria-hidden="true" />
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
