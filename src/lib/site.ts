/**
 * Site-wide constants for valuecreationprotocol.com
 *
 * The protocol home. A peer to modelcontextprotocol.io and humancontextprotocol.com.
 * Reads as calm, technical, direct. Not a sales surface.
 */

export const SITE = {
  name: 'Value Creation Protocol',
  shortName: 'VCP',
  url: 'https://valuecreationprotocol.com',
  description:
    'An open protocol for designing systems where value flows naturally between people, organizations, and AI.',
  implementer: {
    name: 'Value-First Team',
    url: 'https://valuefirstteam.com',
    note: 'Canonical implementing firm and originator of the protocol.',
  },
  github: 'https://github.com/chris-carolan/valuecreationprotocol',
} as const;

/**
 * Top navigation — five primary groupings + glossary. Engagement sits in footer.
 * Schema.org-adjacent: this is a documentation site, not a marketing site.
 */
export const NAV: Array<{ label: string; href: string }> = [
  { label: 'Protocol', href: '/' },
  { label: 'Encoding Stack', href: '/encoding-stack' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Manifestos', href: '/manifestos' },
  { label: 'Glossary', href: '/glossary' },
];

/**
 * Methodology sub-pages — listed on the /methodology hub.
 */
export const METHODOLOGY_PAGES: Array<{ label: string; href: string; summary: string }> = [
  {
    label: 'Five Core Beliefs',
    href: '/beliefs',
    summary: 'The philosophical foundations — five "X over Y" statements.',
  },
  {
    label: 'Twelve Complexity Traps',
    href: '/twelve-traps',
    summary: 'Anti-patterns that derail value-creation work.',
  },
  {
    label: 'Value Path',
    href: '/value-path',
    summary: 'Eight stages from first signal through champion.',
  },
  {
    label: 'Three-Org Model',
    href: '/three-orgs',
    summary: 'Customer, Operations, Finance — every concern maps to one.',
  },
  {
    label: 'Four Unified Views',
    href: '/unified-views',
    summary: 'UCV, URV, UBC, UTE — the visibility framework.',
  },
  {
    label: 'Value Loop',
    href: '/value-loop',
    summary: 'The continuous Discover → Codify → Deliver → Learn loop.',
  },
  {
    label: 'TEACH',
    href: '/teach',
    summary: 'Five values for teaching, leading, and operating.',
  },
  {
    label: 'AI-Native Shift',
    href: '/ai-native-shift',
    summary: 'The organizational transformation pattern.',
  },
  {
    label: 'Value Realities',
    href: '/realities',
    summary: 'Fifteen realities and the operational commitments they imply.',
  },
  {
    label: 'Value-Led Growth',
    href: '/value-led-growth',
    summary: 'The growth framework that replaces lead generation.',
  },
  {
    label: 'HubSpot as CVP',
    href: '/hubspot-cvp',
    summary: 'The canonical implementing substrate.',
  },
  {
    label: 'CVP vs VCP',
    href: '/cvp-vs-vcp',
    summary: 'Disambiguation — the platform category vs the protocol.',
  },
];

/**
 * Manifestos sub-pages.
 */
export const MANIFESTO_PAGES: Array<{ label: string; href: string; summary: string }> = [
  {
    label: 'Beyond "Leads"',
    href: '/manifestos/beyond-leads',
    summary: 'A manifesto for humanized, collaborative growth.',
  },
  {
    label: 'Value-Led Growth',
    href: '/manifestos/value-led-growth',
    summary: 'A manifesto for organizational transformation in the AI era.',
  },
  {
    label: 'Positioning Paper',
    href: '/positioning',
    summary: 'Where VCP sits in the protocol stack.',
  },
];

/**
 * Mutual cross-citations — vcp.com canon page → valuefirstteam.com peer.
 * Used by the CrossCitation component to display the small "canonically implemented at"
 * inline block. Lightweight per voice guidance; not every page carries one.
 */
export const CROSS_CITATIONS: Record<string, { peerSlug: string; peerLabel: string }> = {
  '/beliefs': { peerSlug: '/methodology/core-beliefs', peerLabel: 'Core Beliefs at valuefirstteam.com' },
  '/twelve-traps': { peerSlug: '/methodology/twelve-traps', peerLabel: 'Twelve Traps at valuefirstteam.com' },
  '/value-path': { peerSlug: '/methodology/value-path', peerLabel: 'Value Path at valuefirstteam.com' },
  '/three-orgs': { peerSlug: '/methodology/three-org-model', peerLabel: 'Three-Org Model at valuefirstteam.com' },
  '/unified-views': { peerSlug: '/methodology/unified-views', peerLabel: 'Unified Views at valuefirstteam.com' },
  '/teach': { peerSlug: '/methodology/teach', peerLabel: 'TEACH at valuefirstteam.com' },
  '/value-loop': { peerSlug: '/methodology/value-loop', peerLabel: 'Value Loop at valuefirstteam.com' },
  '/value-led-growth': { peerSlug: '/methodology/value-led-growth', peerLabel: 'Value-Led Growth at valuefirstteam.com' },
  '/ai-native-shift': { peerSlug: '/catalyst', peerLabel: 'AI-Native Shift at valuefirstteam.com' },
  '/hubspot-cvp': { peerSlug: '/hubspot', peerLabel: 'HubSpot CVP work at valuefirstteam.com' },
};
