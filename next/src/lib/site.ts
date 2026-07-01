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
 * Peer protocols in the AI-native stack.
 */
export const PROTOCOL_PEERS = {
  mcp: {
    name: 'Model Context Protocol',
    short: 'MCP',
    url: 'https://modelcontextprotocol.io',
    role: 'capability',
  },
  hcp: {
    name: 'Human Context Protocol',
    short: 'HCP',
    url: 'https://humancontextprotocol.com',
    role: 'human context',
  },
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
 * Encoding-stack canon pages — the three-layer machine-parseable substrate
 * plus its overview. Mirrors the /sitemap ENCODING group. Kept here so the
 * homepage "Canon pages across archetypes" stat derives from one source.
 */
export const ENCODING_PAGES: Array<{ label: string; href: string; summary: string }> = [
  {
    label: 'Encoding Stack — Overview',
    href: '/encoding-stack',
    summary: 'The three-layer substrate that makes VCP machine-parseable.',
  },
  {
    label: 'Value-First Lexicon',
    href: '/lexicon',
    summary: 'Layer A — the lexical substrate.',
  },
  {
    label: 'VCP-Lang',
    href: '/vcp-lang',
    summary: 'Layer B — the structural substrate.',
  },
  {
    label: 'Value Graph',
    href: '/value-graph',
    summary: 'Layer C — the relational substrate.',
  },
];

/**
 * Canon-page archetypes — the grouped inventory of every canon page this site
 * publishes. This is the authoritative source for the homepage "Canon pages ·
 * N across M archetypes" stat: both integers are DERIVED from this structure
 * (see canonPageStats below), never hardcoded. Add a page to one of these
 * arrays and the homepage count self-maintains.
 *
 * "Canon pages" = the substantive protocol content pages (methodology,
 * encoding stack, manifestos). It intentionally excludes wayfinding/hub pages
 * (methodology, manifestos, protocol-stack, engagement, sitemap), the homepage,
 * and the glossary — those are navigation and reference surfaces, not canon.
 */
export const CANON_PAGE_ARCHETYPES: Array<{ id: string; label: string; pages: readonly { href: string }[] }> = [
  { id: 'methodology', label: 'Methodology canon', pages: METHODOLOGY_PAGES },
  { id: 'encoding', label: 'Encoding stack', pages: ENCODING_PAGES },
  { id: 'manifestos', label: 'Manifestos', pages: MANIFESTO_PAGES },
];

/**
 * Derived homepage stat: total canon pages and how many archetypes they span.
 * Computed at module load from CANON_PAGE_ARCHETYPES — the number cannot drift
 * from the actual page inventory the way a hardcoded literal did.
 */
export const canonPageStats = {
  pageCount: CANON_PAGE_ARCHETYPES.reduce((sum, a) => sum + a.pages.length, 0),
  archetypeCount: CANON_PAGE_ARCHETYPES.length,
} as const;

/**
 * Mutual cross-citations — vcp.com canon page → valuefirstteam.com peer.
 *
 * Source of truth for cross-citation routing. Used by both the CrossCitation
 * component (linked aside) and the Implementers component (one-line attribution).
 *
 * Peer slugs verified live on valuefirstteam.com as of 2026-05-12. Pages with
 * `peerSlug: null` are intentionally peerless — either vcp.com-only canon
 * (lexicon, vcp-lang, value-graph, encoding-stack, positioning, manifestos),
 * hub pages (methodology, manifestos, protocol-stack), or pages whose peer
 * has not yet shipped on valuefirstteam.com (flagged below).
 */
export type CrossCitationEntry = {
  /** Path on valuefirstteam.com (e.g. "/value-path"), or null if no peer exists. */
  peerSlug: string | null;
  /** Display label for the peer link. */
  peerLabel?: string;
  /** Optional note explaining peer status — surfaces in report-back, not in UI. */
  note?: string;
};

export const CROSS_CITATIONS: Record<string, CrossCitationEntry> = {
  // Verified-live peers on valuefirstteam.com (top-level canonical slugs per FR-15).
  '/value-path': {
    peerSlug: '/value-path',
    peerLabel: 'Value Path at valuefirstteam.com',
  },
  '/twelve-traps': {
    peerSlug: '/traps',
    peerLabel: 'Twelve Traps at valuefirstteam.com',
  },
  '/unified-views': {
    peerSlug: '/unified-views',
    peerLabel: 'Four Unified Views at valuefirstteam.com',
  },
  '/realities': {
    peerSlug: '/realities',
    peerLabel: 'Value Realities at valuefirstteam.com',
  },
  '/ai-native-shift': {
    peerSlug: '/ai-native-shift',
    peerLabel: 'AI-Native Shift at valuefirstteam.com',
  },
  '/cvp-vs-vcp': {
    peerSlug: '/cvp',
    peerLabel: 'Customer Value Platform at valuefirstteam.com',
  },
  '/hubspot-cvp': {
    peerSlug: '/how-we-help/hubspot-cvp',
    peerLabel: 'HubSpot CVP at valuefirstteam.com',
  },
  '/value-loop': {
    peerSlug: '/what-we-solve/the-value-loop',
    peerLabel: 'The Value Loop at valuefirstteam.com',
  },
  '/teach': {
    peerSlug: '/about',
    peerLabel: 'TEACH section on About at valuefirstteam.com',
  },

  // Re-enabled 2026-05-14: firm-side pages shipped.
  '/beliefs': {
    peerSlug: '/beliefs',
    peerLabel: 'Five Core Beliefs at valuefirstteam.com',
  },
  '/three-orgs': {
    peerSlug: '/three-orgs',
    peerLabel: 'Three-Org Model at valuefirstteam.com',
  },
  '/value-led-growth': {
    peerSlug: '/value-led-growth',
    peerLabel: 'Value-Led Growth at valuefirstteam.com',
  },

  // vcp.com-only canon — no peer expected.
  '/lexicon': { peerSlug: null, note: 'vcp.com-only canon (encoding stack)' },
  '/vcp-lang': { peerSlug: null, note: 'vcp.com-only canon (encoding stack)' },
  '/value-graph': { peerSlug: null, note: 'vcp.com-only canon (encoding stack)' },
  '/encoding-stack': { peerSlug: null, note: 'vcp.com-only canon' },
  '/positioning': { peerSlug: null, note: 'vcp.com-only canon (protocol positioning)' },
  '/manifestos/beyond-leads': { peerSlug: null, note: 'vcp.com-only canon (manifesto)' },
  '/manifestos/value-led-growth': { peerSlug: null, note: 'vcp.com-only canon (manifesto)' },

  // Hub / glossary — no per-page peer cross-citation.
  '/glossary': { peerSlug: null, note: 'glossary — footer attribution sufficient' },
  '/methodology': { peerSlug: null, note: 'hub page — footer attribution sufficient' },
  '/manifestos': { peerSlug: null, note: 'hub page — footer attribution sufficient' },
  '/protocol-stack': { peerSlug: null, note: 'hub page — footer attribution sufficient' },
  '/engagement': { peerSlug: null, note: 'engagement page — implementer framing inline' },
};

/**
 * Lookup helper for CrossCitation + Implementers components.
 * Returns null if the path has no canonical entry (defensive).
 */
export function getCrossCitation(path: string): CrossCitationEntry | null {
  return CROSS_CITATIONS[path] ?? null;
}
