import Link from 'next/link';
import Logo from './Logo';

const NAV_GROUPS = [
  {
    label: 'Products',
    links: [
      { label: 'Mandi WhatsApp Automation', href: '/services/mandi-whatsapp-automation' },
      { label: 'AI CRM Automation', href: '/services/ai-crm-automation' },
      { label: 'WaitJI AI ↗', href: 'https://waitjiai.in', external: true },
    ],
  },
  {
    label: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
      { label: 'Sitemap', href: '/sitemap-page' },
    ],
  },
  {
    label: 'Get Started',
    links: [
      { label: 'Enroll for Mandi Automation', href: '/enroll-mandi' },
      { label: 'Onboard for CRM Service', href: '/onboard-crm' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative border-t pt-16 pb-8"
      style={{ borderColor: 'rgba(124, 92, 255, 0.15)' }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,92,255,0.4), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2">
            <Logo height={32} className="mb-4" />
            <p className="font-heading font-bold text-base mb-2 gradient-text-coral">
              Your AI Business Solutions Partner
            </p>
            <p className="text-text-muted text-sm leading-relaxed mb-5">
              We build AI systems that run your business — not just chatbots. Three products, one partner. Udaipur, Rajasthan.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/917231873730"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90 w-fit"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <a
                href="mailto:sales@qivalabs.com"
                className="text-sm text-text-muted hover:text-accent-cyan transition-colors"
              >
                sales@qivalabs.com
              </a>
            </div>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-text-primary text-sm font-semibold mb-4 font-heading">{group.label}</p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        rel="noopener noreferrer"
                        className="text-text-muted text-sm hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-text-muted text-sm hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="h-px mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(124,92,255,0.2), transparent)' }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p>© {new Date().getFullYear()} QivaLabs LLP. All rights reserved.</p>
          <p className="text-center">
            LLPIN: ACV-6746 · DPIIT Recognised: DIPP247112 · Udaipur, Rajasthan, India
          </p>
          <div className="flex items-center gap-4">
            <a href="tel:+917231873730" className="hover:text-text-primary transition-colors">
              +91 7231 873 730
            </a>
            <a href="mailto:sales@qivalabs.com" className="hover:text-text-primary transition-colors">
              sales@qivalabs.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
