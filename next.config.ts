import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the project root; a stray ~/package-lock.json otherwise makes
    // Next.js treat the home folder as the workspace root.
    root: path.join(__dirname),
  },
};

export default nextConfig;
