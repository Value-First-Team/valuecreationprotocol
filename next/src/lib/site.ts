/**
 * Site-wide constants for valuecreationprotocol.com
 *
 * The protocol home. A peer to modelcontextprotocol.io and humancontextprotocol.com.
 * Reads as calm, technical, direct. Not a sales surface.
 */
import { canonPageSource, type CanonPageSource, type MethodologyFrameworkKey } from '@vf/brand/methodology';
import { canonLine } from '@/lib/canon-line';

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
 * Methodology sub-pages — drawn on the /methodology hub, each as its painted card, and listed in the
 * /sitemap Methodology group. ONE LIST: the hub reads its groups, its cards, its counts and its structured
 * data from it, so no page can be listed on the site and missing from the hub (the hub asserts this at build).
 *
 * Each entry is a `CanonPageSource` (@vf/brand): the page's name, one canon line, the Language of Value term
 * whose painting is its card's picture, the count of its set where it has one, its route, and `group`, the hub
 * group it is filed under (that group's own title on /methodology).
 *
 * EVERY LINE IS CANON'S OWN WORDS, and none is written here.
 *
 * - The eight frameworks @vf/brand carries come whole from `canonPageSource(key, { href, group })`: canon's name
 *   for the family (TEACH's is "TEACH Values"), the definition sentence canon opens it with (for the Twelve
 *   Traps, whose reference opens with no definition of the twelve together, the one sentence it writes about
 *   them together), the painting's term, and the count of canon's own list under canon's noun ("5 value pairs").
 *   The hub, the family's own page and every later reader take one copy, so they move together on a pin bump.
 * - A page @vf/brand does not carry builds the same shape here: its name, one line of its canon reference quoted
 *   verbatim through `canonLine(file, line, text)`, which stops the build when the pinned snapshot no longer
 *   carries that line there (lib/canon-line.ts), and the term whose vocabulary file names its subject. None of them
 *   carries a set (the Value Loop became a family in builds 5 and 6, @vf/brand 0.180.0).
 */
export type MethodologyPage = CanonPageSource & { readonly group: string };

const family = (key: MethodologyFrameworkKey, href: string, group: string): MethodologyPage => ({
  ...canonPageSource(key, { href, group }),
  group,
});

export const METHODOLOGY_PAGES: readonly MethodologyPage[] = [
  family('core-beliefs', '/beliefs', 'Operating principles'),
  family('complexity-traps', '/twelve-traps', 'Operating principles'),
  family('value-path', '/value-path', 'Frameworks'),
  family('three-org-model', '/three-orgs', 'Frameworks'),
  family('unified-views', '/unified-views', 'Frameworks'),
  family('five-layer-model', '/five-layers', 'Frameworks'),
  // Families nine and ten (builds 5 and 6; @vf/brand 0.180.0): the Interest Pipeline joins the Frameworks after the
  // Five-Layer Model, and the Value Loop's host entry becomes a family (its line is the same canon line 21, now from
  // @vf/brand, and its count the brand's own four stages).
  family('interest-pipeline', '/interest-pipeline', 'Frameworks'),
  family('value-loop', '/value-loop', 'Patterns'),
  family('teach-values', '/teach', 'Patterns'),
  {
    key: 'ai-native-shift',
    name: 'AI-Native Shift',
    href: '/ai-native-shift',
    group: 'Programs',
    term: 'the-ai-native-shift',
    // The AI-Native Shift has no canonical reference of its own; this is the line the
    // VCP positioning paper writes about it, under "Where VCP Already Lives".
    line: canonLine(
      'value-creation-protocol-positioning-paper.md',
      115,
      'Inside the AI-Native Shift program — a four-rung progression from Office Hours through the Value-First OS deployment. Each rung is VCP being adopted at a different depth.',
    ),
  },
  family('value-realities', '/realities', 'Patterns'),
  {
    key: 'value-led-growth',
    name: 'Value-Led Growth',
    href: '/value-led-growth',
    group: 'Programs',
    term: 'value-led-growth',
    line: canonLine(
      'value-led-growth-canonical-reference.md',
      21,
      'Value-Led Growth is an organizational philosophy that answers a fundamentally different question than traditional growth models.',
    ),
  },
  {
    key: 'hubspot-cvp',
    name: 'HubSpot as CVP',
    href: '/hubspot-cvp',
    group: 'Implementation',
    // canon's CVP definition, so the card wears the CVP painting.
    term: 'cvp',
    line: canonLine(
      'hubspot-cvp-canonical-reference.md',
      27,
      'A Customer Value Platform (CVP) is a unified business system that enables organizations to recognize, create, deliver, and multiply customer value across all functions—replacing fragmented tool stacks with coherent operational capability.',
    ),
  },
  {
    key: 'cvp-vs-vcp',
    name: 'CVP vs VCP',
    href: '/cvp-vs-vcp',
    group: 'Implementation',
    // A page about two things: VCP's painting on the front, CVP's on the back.
    term: 'value-creation-protocol',
    backTerm: 'cvp',
    // vcp-canonical-reference.md, "Disambiguation: VCP vs. CVP", its closing line.
    line: canonLine(
      'vcp-canonical-reference.md',
      133,
      'VCP is what is declared. CVP is what it runs on. They are not synonyms, alternates, or competing names.',
    ),
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
 * homepage's encoding door counts its spec pages from one source.
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
 * publishes, each with its archetype's own label (the homepage's families band
 * reads "Methodology canon" from here). The homepage's "N across M archetypes"
 * stat that this structure once fed left with the At a glance box (build 4).
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
  // 2026-09-05: the firm site now serves this framework at the SAME path this
  // one does. It used to answer only at /traps, which is now a 308 to
  // /twelve-traps — so the citation pointed a reader through a redirect for no
  // reason. Both ends read the constellation's one route table now.
  '/twelve-traps': {
    peerSlug: '/twelve-traps',
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
  // 2026-09-05: the firm site now hosts the Five-Layer Model too, at the same
  // path. It was peerless here because /five-layers did not exist there; it
  // answers 200 now, and the build-time probe below is what proves it on every
  // build rather than this comment.
  '/five-layers': {
    peerSlug: '/five-layers',
    peerLabel: 'The Five-Layer Model at valuefirstteam.com',
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
/**
 * Whether a peer page actually answers. Read once per URL per build (this site is
 * a static export, so "per build" is the whole life of the page). A peer that
 * cannot be reached in time counts as not live — a "See also" that may be dead is
 * worse than none. Verified need: valuefirstteam.com/beliefs returned 404 on the
 * 2026-09-04 walk while the table said it was a live peer.
 */
const peerLiveness = new Map<string, Promise<boolean>>();
export function peerIsLive(url: string): Promise<boolean> {
  let p = peerLiveness.get(url);
  if (!p) {
    p = (async () => {
      const probe = async (method: 'HEAD' | 'GET') => {
        const ctl = new AbortController();
        const t = setTimeout(() => ctl.abort(), 6000);
        try {
          const res = await fetch(url, { method, redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': 'vcp-cross-citation-probe' } });
          return res.status;
        } catch {
          return 0;
        } finally {
          clearTimeout(t);
        }
      };
      let status = await probe('HEAD');
      if (status === 405 || status === 403) status = await probe('GET');
      return status >= 200 && status < 300;
    })();
    peerLiveness.set(url, p);
  }
  return p;
}

export function getCrossCitation(path: string): CrossCitationEntry | null {
  return CROSS_CITATIONS[path] ?? null;
}
