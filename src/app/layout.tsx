import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import Script from 'next/script';
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

const siteUrl = 'https://lifepathnumerologycalculator.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Life Path Calculator — Free Life Path Number Calculator | Numerology',
    template: '%s | Life Path Numerology Calculator',
  },
  description:
    'Free life path calculator. Enter your date of birth and instantly calculate your life path number — the core numerology number that shapes your personality, strengths, and life direction.',
  keywords: [
    'life path calculator',
    'life path number calculator',
    'numerology calculator life path',
    'numerology life path calculator',
    'number life path calculator',
    'numerology calculator',
    'free numerology calculator',
    'life path number',
    'numerology',
    'personal year number',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Life Path Numerology Calculator',
    title: 'Life Path Calculator — Free Life Path Number Calculator | Numerology',
    description:
      'Free life path calculator. Enter your date of birth and instantly calculate your life path number — the core numerology number that shapes your personality, strengths, and life direction.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Life Path Number Calculator — Free Numerology Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Path Calculator — Free Life Path Number Calculator | Numerology',
    description:
      'Free life path calculator. Enter your date of birth and instantly calculate your life path number — the core numerology number that shapes your personality, strengths, and life direction.',
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
      <body className="antialiased">
        <Navigation />
        {children}
        <Footer />
        <CookieBanner />
        <Analytics />
        <Script
          src="https://cdn.apitiny.net/scripts/v2.0/main.js"
          data-site-id="69ce4c14a02a638ca27e7f1d"
          data-test-mode="false"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
