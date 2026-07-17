import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — QivaLabs LLP',
  description:
    'Privacy Policy for QivaLabs LLP (LLPIN ACV-6746) — covering data we collect, how we use it, and your rights under Indian law, including DPDP. Udaipur, Rajasthan, India.',
  alternates: { canonical: 'https://qivalabs.com/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy — QivaLabs LLP',
    description: 'Privacy Policy for QivaLabs LLP — Udaipur, Rajasthan, India.',
    url: 'https://qivalabs.com/privacy-policy',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `When you contact us through this website, we collect your name, business name, WhatsApp / phone number, email address, and any message or query you provide. When you enroll for Mandi WhatsApp Automation (QIVA), we additionally collect business-specific information including customer and supplier contact details, order history, product catalogues, and pricing data necessary to configure and operate the AI bots on your behalf. When you onboard for AI CRM Automation, we collect information about your existing CRM setup, team size, and inbound query volume.`,
  },
  {
    title: '2. How We Use Your Data',
    body: `We use the information you provide to: (a) respond to your sales and product enquiries; (b) onboard and configure QivaLabs products for your business; (c) deliver the QIVA WhatsApp Automation service by processing messages on your behalf; (d) deliver the AI CRM Automation service by triaging your inbound customer communications; (e) improve our products and services. We do not sell, rent, or share your personal data with third parties except as required to deliver the services described above or as required by applicable law.`,
  },
  {
    title: '3. WhatsApp Data',
    body: `Mandi WhatsApp Automation (QIVA) operates via the WhatsApp Business API. Message content sent through the QIVA bot is processed to fulfil your automation requests. We comply with WhatsApp's Business Policy and Meta's platform terms. Message content is not stored beyond what is required to operate the service and personalise responses (e.g. remembering customer order history for contextualised replies).`,
  },
  {
    title: '4. Data Storage & Security',
    body: `Business data processed by QivaLabs products is stored on secure servers and is accessible only to authorised QivaLabs personnel for service delivery purposes. We use industry-standard encryption in transit (TLS) and at rest. Our infrastructure is hosted on reputable cloud providers with SOC 2-compliant data centres.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your personal data for as long as you are a QivaLabs customer and for a reasonable period thereafter to comply with legal obligations. Customer and supplier communication data processed by QIVA is retained for the duration of the service subscription and deleted within 30 days of service termination unless a longer retention period is required by law.`,
  },
  {
    title: '6. Your Rights',
    body: `You have the right to access, correct, or request deletion of your personal data at any time. To exercise any of these rights, contact us at sales@qivalabs.com or call +91 7231 873 730. We will respond within 30 days.`,
  },
  {
    title: '7. Cookies',
    body: `This website uses minimal cookies necessary for site operation and analytics. We do not use third-party advertising cookies. You can disable cookies through your browser settings; however, some site features may not function correctly without them.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Material changes will be communicated to active customers via email or WhatsApp. The latest version of this policy is always available at qivalabs.com/privacy-policy.`,
  },
  {
    title: '9. Contact',
    body: `QivaLabs LLP · LLPIN: ACV-6746 · Udaipur, Rajasthan, India · sales@qivalabs.com · +91 7231 873 730`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <nav className="flex items-center gap-2 text-xs text-text-muted mb-10 font-mono-accent" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Privacy Policy</span>
          </nav>

          <h1 className="font-heading font-bold text-4xl text-text-primary mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-muted mb-12">
            QivaLabs LLP (LLPIN: ACV-6746) · Last updated: June 2026
          </p>

          <div className="space-y-8 text-sm leading-relaxed text-text-muted">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="text-base font-semibold text-text-primary mb-3">{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            <p
              className="text-xs pt-6 italic border-t"
              style={{ borderColor: 'rgba(124,92,255,0.15)' }}
            >
              This is a template privacy policy. QivaLabs LLP recommends that this document be
              reviewed and finalised by a qualified legal professional before the site goes live.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
