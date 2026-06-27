/**
 * Root layout — valuecreationprotocol.com Next.js re-platform.
 *
 * React Server Component. Injects the token CSS chain, runs the FOUC-free theme
 * init, loads the VCP fonts (Newsreader display + Geist UI + Geist Mono), and
 * renders the shared SiteShell (frame) with VCP's own SHELL_CONFIG (identity).
 *
 * Import order is load-bearing:
 *   1. @vf/design-engine/tokens.css  — --vf-* tokens the SiteShell chrome uses
 *   2. vcp-tokens.css                — VCP's own protocol-identity preset (base + utils)
 *   3. vcp-archetypes.css            — ported archetype + page scoped CSS
 *   4. vcp-dark.css                  — dark-mode bridge for the vcp-* tokens
 *   5. globals.css                   — Tailwind layers + skip-link
 */
import type { Metadata, Viewport } from 'next';
import '@vf/design-engine/tokens.css';
import '../styles/vcp-tokens.css';
import '../styles/vcp-archetypes.css';
import '../styles/vcp-dark.css';
import './globals.css';
import { SiteShell } from '@vf/site-kit';
import { SHELL_CONFIG } from '@/lib/shell-config';
import { SITE } from '@/lib/site';
import { HEADER_BRAND_MARK, FOOTER_BRAND_MARK } from '@/components/VcpBrandMark';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: '%s — Value Creation Protocol',
    default: 'Value Creation Protocol — Open Protocol Home',
  },
  description: SITE.description,
  icons: {
    icon: [
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/favicon-180.png', sizes: '180x180' }],
    shortcut: ['/favicon/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_US',
    images: ['/og/og-default.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/og-default.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0d9488',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* VCP fonts — Newsreader (display/prose), Geist (UI), Geist Mono (technical). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/google-font-preconnect */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600;6..72,700&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/*
         * FOUC-free theme init — runs before paint. The protocol home is an
         * editorial/light-first surface, so default LIGHT here (the Astro site
         * shipped light-only); still honor a saved pref or OS dark preference.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('vf-theme');var d=s?s==='dark':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',!!d);}catch(e){}})();`,
          }}
        />
        {/* HubSpot tracking (portal 40810431 = VF Team). */}
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/40810431.js"
        />
      </head>
      <body className="min-h-screen antialiased">
        <SiteShell
          config={SHELL_CONFIG}
          logoLabel="Value Creation Protocol"
          logoHref="/"
          brandLabel="Value Creation Protocol"
          brandTagline="An open protocol · operated by Value-First Team"
          /* Per-node brand mark — VCP renders ITS OWN compass + serif wordmark in
             the logo slot, not the VF Team lockup. The Astro original carried the
             VCP mark; Value-First Team is named only as the implementing firm in
             the footer attribution. Header + footer marks are theme-safe (live
             serif text in --vf-text + the self-contained faceted-gem SVG). */
          headerBrandMark={HEADER_BRAND_MARK}
          footerBrandMark={FOOTER_BRAND_MARK}
          sticky
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
