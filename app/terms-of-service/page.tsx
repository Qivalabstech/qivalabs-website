import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — QivaLabs LLP',
  description:
    'Terms of Service for QivaLabs LLP (LLPIN ACV-6746) — covering all products and services including QIVA, AI CRM Automation, and WaitJI AI. Governed by Indian law, jurisdiction Udaipur.',
  alternates: { canonical: 'https://qivalabs.com/terms-of-service' },
  openGraph: {
    title: 'Terms of Service — QivaLabs LLP',
    description: 'Terms of Service for QivaLabs LLP — Udaipur, Rajasthan, India.',
    url: 'https://qivalabs.com/terms-of-service',
    type: 'website',
  },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing this website, enquiring about, or using any product or service provided by QivaLabs LLP ("QivaLabs", "we", "us", "our"), you ("Client", "you") agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`,
  },
  {
    title: '2. Services Description',
    body: `QivaLabs LLP provides the following AI-powered business automation products: (a) Mandi WhatsApp Automation ("QIVA") — AI bots for wholesale and mandi businesses delivered over WhatsApp, priced at ₹20,000 one-time setup plus ₹4,000/month subscription; (b) AI CRM Automation — an AI triage layer for existing CRM systems; (c) WaitJI AI — an AI advertising marketplace for developer tool wait states, available as a standalone product at waitjiai.in. Service scope, pricing, and configuration for each engagement are confirmed in writing before service commencement.`,
  },
  {
    title: '3. Acceptable Use',
    body: `You agree to use QivaLabs products only for lawful, legitimate business purposes. You must not use any QivaLabs product to send spam, fraudulent messages, illegal content, or messages that violate the platform policies of WhatsApp / Meta, applicable Indian law, or the IT Act 2000 and its amendments. You are responsible for the content communicated through QivaLabs products on your behalf.`,
  },
  {
    title: '4. Client Responsibilities',
    body: `You are responsible for providing accurate business data (customer/supplier lists, product catalogues, pricing, etc.) required to configure QivaLabs products. You must inform QivaLabs promptly of any changes to this data. You are responsible for ensuring you have the necessary consents from your customers and suppliers to communicate with them via AI-powered messaging on your behalf.`,
  },
  {
    title: '5. Payment & Subscription',
    body: `For Mandi WhatsApp Automation (QIVA): the ₹20,000 setup fee is due before onboarding begins. The ₹4,000/month subscription is billed monthly in advance. Subscriptions may be cancelled with 30 days' written notice to sales@qivalabs.com. No refunds are issued for the current billing month upon cancellation. Pricing for AI CRM Automation and WaitJI AI is agreed in writing per engagement.`,
  },
  {
    title: '6. Intellectual Property',
    body: `All software, AI models, workflows, and systems developed or operated by QivaLabs remain the intellectual property of QivaLabs LLP. Your business data (customer lists, catalogues, etc.) remains yours. QivaLabs does not claim ownership over client data. You grant QivaLabs a limited licence to process your data solely for the purpose of delivering the contracted services.`,
  },
  {
    title: '7. Confidentiality',
    body: `Both parties agree to keep confidential any non-public information shared during the engagement. QivaLabs will not disclose your business data, customer lists, or pricing to third parties except as required to deliver the contracted services or as required by applicable law.`,
  },
  {
    title: '8. Disclaimer of Warranties',
    body: `QivaLabs products are provided "as is" and "as available". We make no warranty that the services will be error-free, uninterrupted, or achieve specific business outcomes. AI-generated responses may occasionally be inaccurate — we recommend human review for Tier 2 CRM responses before sending.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law, QivaLabs LLP's total liability arising out of or related to these Terms shall not exceed the fees paid by you to QivaLabs in the three months preceding the event giving rise to the claim. We are not liable for any indirect, incidental, special, consequential, or punitive damages.`,
  },
  {
    title: '10. Governing Law & Dispute Resolution',
    body: `These Terms are governed by the laws of India. Any dispute arising out of or in connection with these Terms shall first be attempted to be resolved amicably. If unresolved within 30 days, disputes shall be subject to the exclusive jurisdiction of the courts in Udaipur, Rajasthan, India.`,
  },
  {
    title: '11. Amendments',
    body: `QivaLabs reserves the right to amend these Terms at any time. Active customers will be notified of material changes via email or WhatsApp at least 14 days before the changes take effect. Continued use of the services after notice constitutes acceptance of the revised Terms.`,
  },
  {
    title: '12. Contact',
    body: `QivaLabs LLP · LLPIN: ACV-6746 · Udaipur, Rajasthan, India · sales@qivalabs.com · +91 7231 873 730`,
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <nav className="flex items-center gap-2 text-xs text-text-muted mb-10 font-mono-accent" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-primary">Terms of Service</span>
          </nav>

          <h1 className="font-heading font-bold text-4xl text-text-primary mb-2">
            Terms of Service
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
              This is a template terms of service. QivaLabs LLP recommends that this document be
              reviewed and finalised by a qualified legal professional before the site goes live.
              The terms above do not constitute legal advice.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
