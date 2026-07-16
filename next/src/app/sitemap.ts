/**
 * Machine-readable XML sitemap → /sitemap.xml (Next.js metadata route).
 * Replaces the Astro @astrojs/sitemap output. Lists every public route; the
 * human-readable /sitemap page is intentionally excluded (it indexes the others
 * — keeping it out of the XML avoids a self-referential listing, matching the
 * Astro `filter` that dropped /sitemap).
 */
import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

// Required for `output: 'export'` — the sitemap route must be statically generated.
export const dynamic = 'force-static';

const ROUTES = [
  '/',
  '/methodology',
  '/manifestos',
  '/protocol-stack',
  '/engagement',
  '/encoding-stack',
  '/lexicon',
  '/vcp-lang',
  '/value-graph',
  '/beliefs',
  '/twelve-traps',
  '/value-path',
  '/three-orgs',
  '/unified-views',
  '/value-loop',
  '/teach',
  '/ai-native-shift',
  '/value-led-growth',
  '/hubspot-cvp',
  '/cvp-vs-vcp',
  '/realities',
  '/positioning',
  '/manifestos/beyond-leads',
  '/manifestos/value-led-growth',
  '/language-of-value',
  '/glossary',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
