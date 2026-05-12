// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://valuecreationprotocol.com',
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  output: 'server',
  adapter: vercel({
    imageService: true,
  }),
  security: {
    // Standard fix for Astro 5 + @astrojs/vercel on Vercel serverless:
    // Astro's CSRF-style origin check can mismatch the internal Vercel host
    // vs the public domain, causing 403s on legitimate same-origin requests.
    // Vercel platform protection + server-side validation remain in effect.
    checkOrigin: false,
  },
});
