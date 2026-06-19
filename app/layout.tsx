import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
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
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'QivaLabs — Your AI Business Solutions Partner',
    template: '%s | QivaLabs',
  },
  description:
    'QivaLabs builds AI systems that run your business — not just chatbots. Mandi WhatsApp Automation, AI CRM Automation, and WaitJI AI. Udaipur, Rajasthan.',
  keywords: [
    'AI business solutions partner India',
    'mandi WhatsApp automation',
    'WhatsApp AI bot for mandi business',
    'AI staff replacement India',
    'wholesale trade WhatsApp bot',
    'AI CRM automation India',
    'AI email triage for support teams',
    'AI layer on top of CRM',
    'QivaLabs',
    'Udaipur AI startup',
    'Rajasthan SaaS company',
    'WaitJI AI',
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
    title: 'QivaLabs — Your AI Business Solutions Partner',
    description:
      'We build AI systems that run your business — not just chatbots. Three products, one partner.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'QivaLabs — Your AI Business Solutions Partner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QivaLabs — Your AI Business Solutions Partner',
    description:
      'We build AI systems that run your business — not just chatbots.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-base text-text-primary font-body min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
