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
import Script from 'next/script';
import '@vf/design-engine/tokens.css';
import '../styles/vcp-tokens.css';
import '../styles/vcp-archetypes.css';
import '../styles/vcp-dark.css';
import './globals.css';
import { SiteShell } from '@vf/site-kit';
// THE FLY-IN LAYER. One mount, and every page of this site has fly-ins
// available at every side (left/right/top/bottom/center), every stack axis
// (z depth, x parallel, y nested) and every mode (overlay, push, inset — an
// inset fly-in IS a docked rail). Any archetype item's `detail` prop, any
// FlyInTrigger, or useFlyInStack().open() reaches it; no per-page wiring.
import { SiteOverlayRoot } from '@vf/site-kit/flyin';
// THE ECOSYSTEM SEARCH BOX. One search over everything the org publishes,
// reachable from the header, the mobile bottom bar and Ctrl/Cmd+K on every page.
// The panel is shared (@vf/site-kit/search); the ENDPOINT is Studios’, which is
// the constellation’s one home for it — the only node with a request-time server
// over the shared corpus. Cross-origin against a registry-derived allow-list,
// read-only, and it records nothing about what anyone searched for.
import { EcosystemSearchPanel } from '@vf/site-kit/search';
import { SHELL_CONFIG } from '@/lib/shell-config';
import { SITE } from '@/lib/site';
import { HEADER_BRAND_MARK, FOOTER_BRAND_MARK } from '@/components/VcpBrandMark';

/**
 * Where the search box calls. ABSOLUTE on purpose: this node does not host the
 * endpoint. Studios does, because it is the only constellation node with a
 * request-time server over the shared corpus, and it answers this origin from a
 * CORS allow-list derived from the shared constellation registry.
 */
const SEARCH_ENDPOINT = 'https://valuefirststudios.com/api/search';

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
    // Motif full-static plate. SoR @vf/brand assets/value-creation-protocol/vcp-og-home.png (public/og copy; regen on brand bump).
    images: ['/og/vcp-og-home.png'],
  },
  twitter: {
    card: 'summary_large_image',
    // Motif full-static plate (same as openGraph; custom-share, not PAGE keyArt).
    images: ['/og/vcp-og-home.png'],
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
        {/* HubSpot tracking (portal 40810431 = VF Team). next/script afterInteractive
            executes AFTER hydration, so the loader can't race hydration and prepend
            div#hs-web-interactives-top-push-anchor to <body> before React reconciles. */}
        <Script id="hs-script-loader" src="//js.hs-scripts.com/40810431.js" strategy="afterInteractive" />
      </head>
      <body className="min-h-screen antialiased">
        <SiteShell
          overlayRoot={SiteOverlayRoot}
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
          searchPanel={
            <EcosystemSearchPanel endpoint={SEARCH_ENDPOINT} currentSite="vcp" />
          }
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
