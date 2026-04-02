import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const siteUrl = 'https://yournumerologyreport.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Numerology Calculator — Free Life Path Number | YourNumerologyReport',
    template: '%s | YourNumerologyReport',
  },
  description:
    'Free numerology calculator. Enter your date of birth to instantly calculate your life path number — the core number that shapes your personality, strengths, and life direction.',
  keywords: [
    'numerology calculator',
    'numerology calculator life path',
    'numerology calculator name',
    'life path number calculator',
    'life path number',
    'numerology',
    'personal year number',
    'free numerology calculator',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'YourNumerologyReport',
    title: 'Numerology Calculator — Free Life Path Number | YourNumerologyReport',
    description:
      'Free numerology calculator. Enter your date of birth to instantly calculate your life path number — the core number that shapes your personality, strengths, and life direction.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'YourNumerologyReport — Life Path Number Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Numerology Calculator — Free Life Path Number | YourNumerologyReport',
    description:
      'Free numerology calculator. Enter your date of birth to instantly calculate your life path number — the core number that shapes your personality, strengths, and life direction.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-[#0a0a0f] text-[#f0ede8] antialiased">
        <Navigation />
        {children}
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
