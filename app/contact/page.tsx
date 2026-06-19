import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import LeadForm from '@/components/LeadForm';

export const metadata: Metadata = {
  title: 'Contact QivaLabs — +91 7231 873 730 | sales@qivalabs.com',
  description:
    'Contact QivaLabs LLP in Udaipur, Rajasthan. Call +91 7231 873 730, email sales@qivalabs.com, or chat on WhatsApp. We reply within 30 minutes during business hours.',
  openGraph: {
    title: 'Contact QivaLabs — Your AI Business Solutions Partner',
    description:
      'Get in touch with the QivaLabs team. Phone, email, WhatsApp, or form — we respond fast.',
  },
};

const CONTACT_FORM_FIELDS = [
  {
    id: 'name',
    label: 'Your name',
    type: 'text' as const,
    placeholder: 'Ramesh Sharma',
    required: true,
    autoComplete: 'name',
  },
  {
    id: 'business',
    label: 'Business / company name',
    type: 'text' as const,
    placeholder: 'Sharma Traders',
    required: false,
    autoComplete: 'organization',
  },
  {
    id: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'ramesh@sharma.com',
    required: false,
    autoComplete: 'email',
  },
  {
    id: 'phone',
    label: 'WhatsApp / phone number',
    type: 'tel' as const,
    placeholder: '+91 98765 43210',
    required: true,
    autoComplete: 'tel',
  },
  {
    id: 'message',
    label: 'Message',
    type: 'textarea' as const,
    placeholder: 'Tell us what you\'re looking for…',
    required: true,
    rows: 4,
  },
];

const CONTACT_DETAILS = [
  {
    icon: '📞',
    label: 'Phone',
    value: '+91 7231 873 730',
    href: 'tel:+917231873730',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'sales@qivalabs.com',
    href: 'mailto:sales@qivalabs.com',
  },
  {
    icon: '🌐',
    label: 'Website',
    value: 'qivalabs.com',
    href: 'https://qivalabs.com',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Udaipur, Rajasthan, India',
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <nav className="flex items-center gap-2 text-xs text-text-muted mb-10 font-mono-accent" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Contact</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — contact info */}
            <ScrollReveal className="lg:sticky lg:top-28">
              <span className="tag mb-5 inline-flex">Get in Touch</span>
              <h1
                className="font-heading font-bold text-text-primary mb-5 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)' }}
              >
                Let&apos;s talk.
              </h1>
              <p className="text-text-muted text-lg leading-relaxed mb-10">
                Whether you have a question about our products, want to understand pricing, or
                just want to know if QIVA is right for your mandi — drop a message. A founder
                will reply.
              </p>

              {/* Direct contact */}
              <div className="glass rounded-2xl p-7 mb-6">
                <h2 className="font-heading font-bold text-text-primary text-lg mb-5">Direct contact</h2>
                <div className="flex flex-col gap-4">
                  {CONTACT_DETAILS.map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <span className="text-xl w-8 text-center flex-shrink-0">{icon}</span>
                      <div>
                        <p className="text-text-muted text-xs mb-0.5">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            className="text-text-primary text-sm font-medium hover:text-accent-cyan transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-text-primary text-sm font-medium">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/917231873730?text=Hi%2C%20I%27m%20interested%20in%20QivaLabs%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow flex items-center justify-center gap-3 p-5 rounded-2xl font-semibold text-white text-base"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>

              <p className="text-text-muted text-xs text-center mt-4">
                We typically reply within 30 minutes during 9 AM – 9 PM IST.
              </p>
            </ScrollReveal>

            {/* Right — form */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-8">
                <h2 className="font-heading font-bold text-text-primary text-xl mb-6">
                  Send us a message
                </h2>
                <LeadForm
                  fields={CONTACT_FORM_FIELDS}
                  endpoint="/contact"
                  submitLabel="Send Message"
                  successMessage="Message sent! We'll be in touch on WhatsApp or email within 24 hours."
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
