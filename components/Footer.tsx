import Link from 'next/link';
import { LogoMark } from './Logo';
import { SERVICES } from '@/lib/services-data';

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const CONTACT_INFO = {
  address: 'Udaipur, Rajasthan 313001, India',
  email: 'hello@qivalabs.com',
  phone: '+91 72318 73730',
};

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/qivalabs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/qivalabs.ai/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/qivalabs',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ backgroundColor: '#060E1A', borderTop: '1px solid rgba(11, 155, 170, 0.15)' }}
      aria-label="Site footer"
    >
      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="QivaLabs Home">
              <LogoMark size={36} />
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-space-grotesk)', color: '#ffffff' }}
              >
                Qiva<span style={{ color: '#16C4D6' }}>Labs</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8BAFC0' }}>
              Full-service software & digital solutions company based in Udaipur, Rajasthan. We build
              software that moves businesses forward.
            </p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover-icon"
                  style={{
                    backgroundColor: 'rgba(11, 155, 170, 0.1)',
                    color: '#8BAFC0',
                    border: '1px solid rgba(11, 155, 170, 0.2)',
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: '#16C4D6' }}
            >
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm hover-link"
                    style={{ color: '#8BAFC0' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — split into two columns */}
          <div className="lg:col-span-2">
            <h3
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: '#16C4D6' }}
            >
              Our Services
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {SERVICES.map(({ slug, shortTitle }) => (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className="text-sm hover-link truncate"
                  style={{ color: '#8BAFC0' }}
                >
                  {shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact info strip */}
        <div
          className="mt-12 pt-8 flex flex-wrap gap-6 text-sm"
          style={{ borderTop: '1px solid rgba(11, 155, 170, 0.12)', color: '#8BAFC0' }}
        >
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#0B9BAA' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {CONTACT_INFO.address}
          </span>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="flex items-center gap-2 hover-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#0B9BAA' }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {CONTACT_INFO.email}
          </a>
          <a
            href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 hover-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#0B9BAA' }}>
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.06 1.18 2 2 0 012.05.06h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {CONTACT_INFO.phone}
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid rgba(11, 155, 170, 0.1)', backgroundColor: '#040B14' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs" style={{ color: '#5A7A8A' }}>
          <span>© {year} QivaLabs LLP. All rights reserved.</span>
          <span>GST-registered · Udaipur, Rajasthan, India</span>
        </div>
      </div>
    </footer>
  );
}
