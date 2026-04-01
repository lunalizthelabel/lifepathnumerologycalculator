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
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0d0d14]/96 px-6 py-5 backdrop-blur-md"
            role="dialog"
            aria-label="Cookie consent"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl font-body text-sm leading-relaxed text-[#f0ede8]/65">
                We use Google Analytics to understand how visitors use this site. No personal data is
                sold or shared with third parties. You can read more in our{' '}
                <Link
                  href="/privacy"
                  className="text-[#c9a84c] underline underline-offset-2 transition-colors hover:text-[#e8c66a]"
                >
                  Privacy Policy
                </Link>
                .
              </p>
              <button
                onClick={accept}
                className="shrink-0 border border-[#c9a84c] px-8 py-2.5 font-body text-sm uppercase tracking-widest text-[#c9a84c] transition-colors hover:bg-[#c9a84c] hover:text-[#0a0a0f]"
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
