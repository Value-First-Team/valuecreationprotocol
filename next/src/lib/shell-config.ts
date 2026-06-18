/**
 * Shell config — valuecreationprotocol.com
 *
 * The shared @vf/site-kit SiteShell is the FRAME; this config is VCP's own
 * IDENTITY within it. Nav, footer, hat, social, and brand labels are ported
 * faithfully from the Astro chrome (BaseLayout.astro header/footer + lib/site.ts
 * NAV) so the protocol home keeps its calm, technical, documentation voice — it
 * is not a marketing surface.
 *
 * Types are the shared contract (@vf/site-kit/types); the data lives here so the
 * node identity stays per-node. The Astro nav was: Protocol · Encoding Stack ·
 * Methodology · Manifestos · Glossary, with the status pill (v0.1 · DRAFT) and a
 * footer attributing Value-First Team as the canonical implementing firm.
 */
import type { SiteShellConfig } from '@vf/site-kit/types';

export const SHELL_CONFIG: SiteShellConfig = {
  navPrimary: [
    { label: 'Protocol', href: '/' },
    { label: 'Encoding Stack', href: '/encoding-stack' },
    { label: 'Methodology', href: '/methodology' },
    { label: 'Manifestos', href: '/manifestos' },
    { label: 'Glossary', href: '/glossary' },
  ],

  // The protocol stack is VCP's defining context — surface its peers in the hat,
  // mirroring the homepage § 01 "three peer protocols" framing.
  headerHat: {
    highlight: {
      label: 'An open protocol · v0.1 · Draft',
      href: '/protocol-stack',
    },
    links: [
      { label: 'Model Context Protocol', href: 'https://modelcontextprotocol.io', external: true },
      { label: 'Human Context Protocol', href: 'https://humancontextprotocol.com', external: true },
    ],
    cta: { label: 'The implementing firm', href: 'https://valuefirstteam.com', external: true },
  },

  mobileBottomBar: [
    { id: 'home', label: 'Protocol', href: '/' },
    { id: 'methodology', label: 'Methodology', href: '/methodology' },
    { id: 'glossary', label: 'Glossary', href: '/glossary' },
    { id: 'menu', label: 'Menu', action: 'menu' },
  ],

  footerColumns: [
    {
      id: 'protocol',
      heading: 'The protocol',
      items: [
        { label: 'Protocol home', href: '/' },
        { label: 'Protocol stack', href: '/protocol-stack' },
        { label: 'Positioning paper', href: '/positioning' },
        { label: 'CVP vs VCP', href: '/cvp-vs-vcp' },
      ],
    },
    {
      id: 'encoding',
      heading: 'Encoding stack',
      items: [
        { label: 'Encoding stack', href: '/encoding-stack' },
        { label: 'Lexicon (Layer A)', href: '/lexicon' },
        { label: 'VCP-Lang (Layer B)', href: '/vcp-lang' },
        { label: 'Value Graph (Layer C)', href: '/value-graph' },
      ],
    },
    {
      id: 'methodology',
      heading: 'Methodology',
      items: [
        { label: 'Methodology canon', href: '/methodology' },
        { label: 'Manifestos', href: '/manifestos' },
        { label: 'Engagement', href: '/engagement' },
        { label: 'Glossary', href: '/glossary' },
        { label: 'Sitemap', href: '/sitemap' },
      ],
    },
    {
      id: 'implementer',
      heading: 'The implementing firm',
      items: [
        { label: 'Value-First Team', href: 'https://valuefirstteam.com', external: true },
        { label: 'The AI-Native Shift', href: 'https://ainativeshift.com', external: true },
        { label: 'Office Hours', href: 'https://valuefirstteam.com/office-hours', external: true },
      ],
    },
  ],

  footerLegal: [
    { label: 'Privacy', href: 'https://valuefirstteam.com/privacy', external: true },
    { label: 'Terms', href: 'https://valuefirstteam.com/terms', external: true },
  ],

  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/chris-carolan/valuecreationprotocol' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/value-first-team' },
  ],
};
