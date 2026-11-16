import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the project root; a stray ~/package-lock.json otherwise makes
    // Next.js treat the home folder as the workspace root.
    root: path.join(__dirname),
  },
  // Headless Chrome for PDF rendering must not be bundled by Next.
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  // The paid report reads its prompt files from disk at runtime; make sure
  // Vercel bundles them with the API routes that generate reports.
  outputFileTracingIncludes: {
    '/api/**/*': ['./Lib/Numerology/**/*.md'],
    // Chromium binary used by the PDF routes on Vercel.
    '/api/report/**/*': ['./node_modules/@sparticuz/chromium/bin/**/*'],
    '/api/report-preview/**/*': ['./node_modules/@sparticuz/chromium/bin/**/*'],
  },
};

export default nextConfig;
