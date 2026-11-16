'use client';

import { useState } from 'react';

/**
 * One-click PDF: asks the server to render the report with headless Chrome.
 * If that fails for any reason, falls back to the browser's print dialog,
 * which uses the same A4 print stylesheet.
 */
export default function DownloadPdfButton({ pdfUrl, fileName }: { pdfUrl: string; fileName: string }) {
  const [busy, setBusy] = useState(false);

  async function download() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch(pdfUrl);
      if (!res.ok || res.headers.get('content-type') !== 'application/pdf') throw new Error(`PDF ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      window.print();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button type="button" className="rp-btn" onClick={download} aria-busy={busy}>
      {busy ? 'Preparing PDF…' : 'Download PDF'}
    </button>
  );
}
