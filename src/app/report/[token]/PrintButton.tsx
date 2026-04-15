'use client';

export default function PrintButton() {
  return (
    <button className="rw-print-btn" onClick={() => window.print()}>
      ↓ &nbsp; Save as PDF
    </button>
  );
}
