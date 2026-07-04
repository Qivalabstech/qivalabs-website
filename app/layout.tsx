import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import CursorGlow from '@/components/CursorGlow';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'QivaLabs — Full-Service Software & Digital Solutions | Udaipur',
    template: '%s | QivaLabs',
  },
  description:
    'QivaLabs LLP is a full-service IT and software company in Udaipur, Rajasthan. We build custom software, mobile apps, websites, e-commerce platforms, and AI automation solutions across India.',
  keywords: [
    'software company Udaipur',
    'IT solutions Udaipur',
    'custom software development India',
    'website design Udaipur',
    'mobile app development Rajasthan',
    'digital marketing Udaipur',
    'QivaLabs',
    'QivaLabs LLP',
    'IT company Udaipur',
    'software development Rajasthan',
    'AI automation India',
    'cloud solutions Udaipur',
  ],
  authors: [{ name: 'QivaLabs LLP' }],
  creator: 'QivaLabs LLP',
  publisher: 'QivaLabs LLP',
  metadataBase: new URL('https://qivalabs.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://qivalabs.com',
    siteName: 'QivaLabs',
    title: 'QivaLabs — Full-Service Software & Digital Solutions',
    description:
      'Custom software, mobile apps, AI automation, and digital solutions from QivaLabs LLP — based in Udaipur, serving businesses across India.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QivaLabs — Full-Service Software & Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QivaLabs — Full-Service Software & Digital Solutions',
    description:
      'Custom software, mobile apps, AI automation, and digital solutions from QivaLabs LLP — Udaipur, India.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body
        className="min-h-screen overflow-x-hidden"
        style={{
          backgroundColor: '#0A1628',
          color: '#C9D6D9',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <CursorGlow />
        {children}
      </body>
    </html>
  );
}
