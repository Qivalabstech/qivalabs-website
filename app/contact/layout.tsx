import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact QivaLabs — Start Your Project | Udaipur, India',
  description:
    'Get in touch with QivaLabs LLP in Udaipur, Rajasthan. Tell us about your software, app, or digital project and we\'ll respond within 48 hours with a clear scope and investment estimate.',
  alternates: { canonical: 'https://qivalabs.com/contact' },
  openGraph: {
    title: 'Contact QivaLabs — Start Your Project',
    description:
      'Reach QivaLabs LLP in Udaipur. We respond within 48 hours with a clear scope and investment estimate — no obligation.',
    url: 'https://qivalabs.com/contact',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
