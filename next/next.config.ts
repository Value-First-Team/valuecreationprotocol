import type { NextConfig } from 'next';
import path from 'path';

// The next/ subdirectory is nested inside the Astro site's repo. Next.js 15
// workspace-root detection walks up to find a lockfile and may resolve packages
// from a parent's node_modules. Force @vf/site-kit to THIS project's React
// version (v0.2), not the parent Astro site's Astro-era v0.1 (which has no
// React exports). @vf/ui, @vf/brand, @vf/design-engine are the same in both —
// let Node resolve them naturally.
const nextNodeModules = path.resolve(process.cwd(), 'node_modules');

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@vf/site-kit': path.resolve(nextNodeModules, '@vf/site-kit'),
    };
    return config;
  },

  // Silence the Next.js 15 "workspace root" lockfile warning — it walks up from
  // the next/ subdirectory; pin the tracer to this project root.
  outputFileTracingRoot: process.cwd(),

  // Static export (SSG). generateStaticParams + build-time Sanity reads bake
  // the content in. The pilot uses this throughout.
  output: 'export',

  trailingSlash: false,

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
