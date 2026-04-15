'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const GA_ID = 'G-QC29FYQCGX';
const CONSENT_KEY = 'ynr_cookie_consent';

export default function CookieBanner() {
  const [consent, setConsent] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'true') {
      setConsent(true);
    } else if (stored === null) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setConsent(true);
    setVisible(false);
  };

  return (
    <>
      {/* Google Analytics — only loads after explicit consent */}
      {consent && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {/* Banner */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-50 px-6 py-5"
            style={{ background: 'var(--color-bg-raised)', borderTop: '1px solid var(--color-border)' }}
            role="dialog"
            aria-label="Cookie consent"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'var(--color-muted)' }}>
                We use Google Analytics to understand how visitors use this site. No personal data is
                sold or shared with third parties. You can read more in our{' '}
                <Link
                  href="/privacy"
                  style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: 2 }}
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <button
                onClick={accept}
                className="shrink-0 px-8 py-2.5 text-sm uppercase tracking-widest transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, border: '1px solid var(--color-accent)', color: 'var(--color-accent)', background: 'transparent', cursor: 'pointer' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-bg-raised)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'; }}
              >
                Got it!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
