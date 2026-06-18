/**
 * Tailwind config — valuecreationprotocol.com Next.js re-platform.
 *
 * Uses @vf/site-kit's React config factory, which applies the @vf/design-engine
 * preset (--vf-* token colors → Tailwind classes), the container scale, and the
 * standard font stacks, and auto-merges the site-kit package's own component glob
 * (so SiteShell/SiteHeader/SiteFooter classes are never purged — the fix that the
 * Astro version originally tripped over).
 *
 * On top of that, VCP keeps its OWN protocol-identity token preset (the vcp-*
 * color namespace, the serif display/body/mono stacks, the editorial max-widths
 * and radii) — this is the per-node identity the re-platform brief mandates we
 * keep. The bulk of VCP styling lives in scoped classes in vcp.css (not Tailwind
 * utilities), but a handful of ported components (PageHeader, CrossCitation,
 * Implementers, Diagram) use vcp-* utilities, so the extensions are declared here.
 *
 * All vcp-* color tokens resolve through CSS variables declared in vcp.css.
 */
import { createSiteKitConfig } from '@vf/site-kit/tailwind';

export default createSiteKitConfig({
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  extend: {
    colors: {
      // Surfaces
      'vcp-paper': 'var(--vcp-paper)',
      'vcp-surface': 'var(--vcp-surface)',
      'vcp-surface-2': 'var(--vcp-surface-2)',
      'vcp-surface-3': 'var(--vcp-surface-3)',
      // Ink ladder
      'vcp-ink': 'var(--vcp-ink)',
      'vcp-ink-2': 'var(--vcp-ink-2)',
      'vcp-ink-3': 'var(--vcp-ink-3)',
      'vcp-ink-4': 'var(--vcp-ink-4)',
      'vcp-ink-5': 'var(--vcp-ink-5)',
      // Borders
      'vcp-border': 'var(--vcp-border)',
      'vcp-border-strong': 'var(--vcp-border-strong)',
      // Protocol identity
      'vcp-teal': 'var(--vcp-teal)',
      'vcp-teal-deep': 'var(--vcp-teal-deep)',
      'vcp-teal-soft': 'var(--vcp-teal-soft)',
      'vcp-teal-ink': 'var(--vcp-teal-ink)',
      'mcp-orange': 'var(--mcp-orange)',
      'mcp-orange-deep': 'var(--mcp-orange-deep)',
      'mcp-orange-soft': 'var(--mcp-orange-soft)',
      'mcp-orange-ink': 'var(--mcp-orange-ink)',
      'hcp-blue': 'var(--hcp-blue)',
      'hcp-blue-deep': 'var(--hcp-blue-deep)',
      'hcp-blue-soft': 'var(--hcp-blue-soft)',
      'hcp-blue-ink': 'var(--hcp-blue-ink)',
    },
    fontFamily: {
      display: ['Newsreader', 'Source Serif 4', 'Georgia', '"Times New Roman"', 'serif'],
      'vcp-sans': ['Geist', '"Inter Tight"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      'vcp-mono': ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
    },
    maxWidth: {
      'vcp-prose': '68ch',
      'vcp-narrow': '56ch',
      'vcp-content': '1120px',
      'vcp-doc': '1280px',
    },
    borderRadius: {
      'vcp-sm': '4px',
      'vcp-md': '6px',
      'vcp-lg': '10px',
    },
  },
});
