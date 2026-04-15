'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const MESSAGES = [
  'Analysing your birth date...',
  'Calculating your life cycles...',
  'Mapping your Pinnacles...',
  'Adding the final details...',
];

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [messageIndex, setMessageIndex] = useState(0);
  const tokenRef = useRef<string | null>(null);

  // Rotate progress messages every 5 seconds
  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Poll for session → token → trigger generation → poll status
  useEffect(() => {
    if (!sessionId) return;

    let stopped = false;
    let generateTriggered = false;

    async function poll() {
      while (!stopped) {
        await new Promise((r) => setTimeout(r, 4000));

        try {
          // Step 1: get token from session
          if (!tokenRef.current) {
            const res = await fetch(`/api/stripe/session?session_id=${sessionId}`);
            const data = await res.json();
            if (data.token) {
              tokenRef.current = data.token;
            } else {
              continue;
            }
          }

          // Step 2: trigger generation once (fire and forget — don't await result)
          if (!generateTriggered) {
            generateTriggered = true;
            fetch(`/api/numerology-layer2/generate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: tokenRef.current }),
            }).catch(() => { generateTriggered = false; }); // allow retry on network error
          }

          // Step 3: poll status endpoint to check if ready
          const res = await fetch(`/api/numerology-layer2?token=${tokenRef.current}`);
          const data = await res.json();
          if (data.status === 'ready') {
            stopped = true;
            router.replace(`/report/${tokenRef.current}`);
            return;
          }
        } catch {
          // network blip — keep polling
        }
      }
    }

    poll();
    return () => { stopped = true; };
  }, [sessionId, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center" style={{ background: 'var(--color-bg-muted)' }}>
      <div className="mb-10">
        <div className="mx-auto mb-8 h-16 w-16 animate-spin rounded-full" style={{ border: '2px solid var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, color: 'var(--color-ink)', marginBottom: 16 }}>
          Your report is being generated...
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 300, color: 'var(--color-muted)', transition: 'all 0.7s' }}>
          {MESSAGES[messageIndex]}
        </p>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 300, color: 'var(--color-faint)' }}>
        This usually takes 30–60 seconds. Please do not close this window.
      </p>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center" style={{ background: 'var(--color-bg-muted)' }}>
        <div className="mx-auto mb-8 h-16 w-16 animate-spin rounded-full" style={{ border: '2px solid var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
