import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ThreeProductsSection from '@/components/ThreeProductsSection';
import OutcomesSection from '@/components/OutcomesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'QivaLabs — Your AI Business Solutions Partner',
  description:
    'QivaLabs builds AI systems that run your business — not just chatbots. Mandi WhatsApp Automation replaces ₹15k/month staff, AI CRM Automation cuts triage load, and WaitJI AI monetizes dev-tool wait time.',
  openGraph: {
    title: 'QivaLabs — Your AI Business Solutions Partner',
    description:
      'Three AI products. One partner. Built in Udaipur, Rajasthan for Indian businesses that want real outcomes — not chatbot demos.',
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'QivaLabs LLP',
  url: 'https://qivalabs.com',
  logo: 'https://qivalabs.com/logo.png',
  description:
    'QivaLabs is an Indian GenAI / SaaS business solutions partner based in Udaipur, Rajasthan offering Mandi WhatsApp Automation, AI CRM Automation, and WaitJI AI.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Udaipur',
    addressRegion: 'Rajasthan',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-7231873730',
    email: 'sales@qivalabs.com',
    contactType: 'sales',
  },
  founders: [
    { '@type': 'Person', name: 'Asad Sheikh', jobTitle: 'CEO' },
    { '@type': 'Person', name: 'Rajamuddin', jobTitle: 'CTO' },
    { '@type': 'Person', name: 'Arman Hussain', jobTitle: 'COO' },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <Navbar />

      <main>
        <Hero />

        <div className="section-divider" aria-hidden="true" />
        <ThreeProductsSection />

        <div className="section-divider" aria-hidden="true" />
        <OutcomesSection />

        <div className="section-divider" aria-hidden="true" />
        <HowItWorksSection />

        <div className="section-divider" aria-hidden="true" />
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
