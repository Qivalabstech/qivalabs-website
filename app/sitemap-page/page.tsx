import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sitemap — QivaLabs',
  description: 'Complete sitemap of the QivaLabs website — all pages, products, and resources.',
};

const SITEMAP_SECTIONS = [
  {
    title: 'Main Pages',
    links: [
      { label: 'Home', href: '/', desc: 'QivaLabs — Your AI Business Solutions Partner' },
      { label: 'About Us', href: '/about', desc: 'Company story, founders, and mission' },
      { label: 'Services Overview', href: '/services', desc: 'All three QivaLabs products at a glance' },
      { label: 'Contact', href: '/contact', desc: 'Phone, email, WhatsApp, and contact form' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Mandi WhatsApp Automation (QIVA)', href: '/services/mandi-whatsapp-automation', desc: 'AI staff for mandi and wholesale businesses — ₹20,000 setup + ₹4,000/month' },
      { label: 'AI CRM Automation', href: '/services/ai-crm-automation', desc: 'Intelligent triage layer for your existing CRM' },
      { label: 'WaitJI AI ↗', href: 'https://waitjiai.in', external: true, desc: "India's first AI ad marketplace for developer tool wait states" },
    ],
  },
  {
    title: 'Get Started',
    links: [
      { label: 'Enroll for Mandi Automation', href: '/enroll-mandi', desc: 'Lead capture form for QIVA mandi bot enrollment' },
      { label: 'Onboard for CRM Service', href: '/onboard-crm', desc: 'Lead capture form for AI CRM Automation onboarding' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy', desc: 'How QivaLabs collects, uses, and protects your data' },
      { label: 'Terms of Service', href: '/terms-of-service', desc: 'Terms governing QivaLabs products and services' },
    ],
  },
  {
    title: 'Technical',
    links: [
      { label: 'XML Sitemap', href: '/sitemap.xml', desc: 'Machine-readable sitemap for search engines' },
      { label: 'robots.txt', href: '/robots.txt', desc: 'Crawler directives' },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          <nav className="flex items-center gap-2 text-xs text-text-muted mb-10 font-mono-accent" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Sitemap</span>
          </nav>

          <h1 className="font-heading font-bold text-4xl text-text-primary mb-3">
            Sitemap
          </h1>
          <p className="text-text-muted text-sm mb-12">
            All pages on the QivaLabs website.
          </p>

          <div className="flex flex-col gap-10">
            {SITEMAP_SECTIONS.map((section) => (
              <section key={section.title}>
                <h2
                  className="text-xs font-bold uppercase tracking-widest text-accent-violet mb-4 font-mono-accent"
                >
                  {section.title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li
                      key={link.href}
                      className="flex items-start gap-4 p-4 rounded-xl transition-colors hover:bg-[rgba(124,92,255,0.05)]"
                      style={{ border: '1px solid rgba(124,92,255,0.1)' }}
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          rel="noopener noreferrer"
                          className="font-medium text-text-primary hover:text-accent-cyan transition-colors text-sm flex items-center gap-1.5 min-w-[220px]"
                        >
                          {link.label}
                          <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-medium text-text-primary hover:text-accent-cyan transition-colors text-sm min-w-[220px]"
                        >
                          {link.label}
                        </Link>
                      )}
                      <span className="text-text-muted text-sm leading-relaxed">{link.desc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
