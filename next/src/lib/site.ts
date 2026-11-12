/**
 * Site-wide constants for valuecreationprotocol.com
 *
 * The protocol home. A peer to modelcontextprotocol.io and humancontextprotocol.com.
 * Reads as calm, technical, direct. Not a sales surface.
 */
import {
  CORE_BELIEFS_CLAIM,
  COMPLEXITY_TRAPS_CLAIM,
  VALUE_PATH_CLAIM,
  THREE_ORG_CLAIM,
  UNIFIED_VIEWS_CLAIM,
  FIVE_LAYER_MODEL_CLAIM,
  TEACH_VALUES_CLAIM,
  VALUE_REALITIES_CLAIM,
} from '@vf/brand/methodology';
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
 * Methodology sub-pages — listed on the /methodology hub and in the /sitemap
 * Methodology group, each with a one-line summary.
 *
 * EVERY SUMMARY IS CANON'S OWN WORDS, and none is written here.
 *
 * - A framework @vf/brand carries is summarised by its claim there: the definition
 *   sentence canon opens that framework with, which @vf/brand holds verbatim and its
 *   framework page reads too. The hub and the page read one copy, so they move together
 *   on a pin bump. (`frameworkClaim(key).headline` is the same sentence for five of the
 *   eight; for the beliefs, the traps and the Realities it is a headline @vf/brand
 *   composes, so the hub reads the canon claim beneath it.) The traps reference opens
 *   with no definition of the twelve as a whole, so their card carries the one sentence
 *   it writes about them together, also held by @vf/brand.
 * - A page @vf/brand does not carry quotes one line of its canon reference, verbatim,
 *   through `canonLine(file, line, text)`, which stops the build when the pinned
 *   snapshot no longer carries that line there (lib/canon-line.ts).
 */
export const METHODOLOGY_PAGES: Array<{ label: string; href: string; summary: string }> = [
  {
    label: 'Five Core Beliefs',
    href: '/beliefs',
    // five-core-beliefs-canonical-reference.md, "What Are the Five Core Beliefs?"
    summary: CORE_BELIEFS_CLAIM.definition,
  },
  {
    label: 'Twelve Complexity Traps',
    href: '/twelve-traps',
    // 12-complexity-traps-canonical-reference.md, "Trap Interconnections".
    summary: COMPLEXITY_TRAPS_CLAIM.interconnection,
  },
  {
    label: 'Value Path',
    href: '/value-path',
    // value-path-canonical-reference-v1.1.md, "What is The Value Path?"
    summary: VALUE_PATH_CLAIM.definition,
  },
  {
    label: 'Three-Org Model',
    href: '/three-orgs',
    // three-org-model-canonical-reference.md, "What is the Three-Org Model?"
    summary: THREE_ORG_CLAIM.definition,
  },
  {
    label: 'Four Unified Views',
    href: '/unified-views',
    // four-unified-views-canonical-reference.md (v2.0), "What are the Four Unified Views?"
    summary: UNIFIED_VIEWS_CLAIM.definition,
  },
  {
    label: 'Five-Layer Model',
    href: '/five-layers',
    // five-layer-model-canonical-reference.md, "What the Five-Layer Model Is"
    summary: FIVE_LAYER_MODEL_CLAIM.definition,
  },
  {
    label: 'Value Loop',
    href: '/value-loop',
    summary: canonLine(
      'value-loop-canonical-reference-v1.md',
      21,
      'The Value Loop is a 4-stage framework describing how value actually emerges through continuous engagement with different conversation partners—ourselves, specific others, the market, and data.',
    ),
  },
  {
    label: 'TEACH',
    href: '/teach',
    // teach-values-canonical-reference.md, "What is the TEACH Values Framework?", first sentence.
    summary: TEACH_VALUES_CLAIM.definition[0],
  },
  {
    label: 'AI-Native Shift',
    href: '/ai-native-shift',
    // The AI-Native Shift has no canonical reference of its own; this is the line the
    // VCP positioning paper writes about it, under "Where VCP Already Lives".
    summary: canonLine(
      'value-creation-protocol-positioning-paper.md',
      115,
      'Inside the AI-Native Shift program — a four-rung progression from Office Hours through the Value-First OS deployment. Each rung is VCP being adopted at a different depth.',
    ),
  },
  {
    label: 'Value Realities',
    href: '/realities',
    // value-realities-canonical-reference.md, "What Are the Value Realities?"
    summary: VALUE_REALITIES_CLAIM.definition,
  },
  {
    label: 'Value-Led Growth',
    href: '/value-led-growth',
    summary: canonLine(
      'value-led-growth-canonical-reference.md',
      21,
      'Value-Led Growth is an organizational philosophy that answers a fundamentally different question than traditional growth models.',
    ),
  },
  {
    label: 'HubSpot as CVP',
    href: '/hubspot-cvp',
    summary: canonLine(
      'hubspot-cvp-canonical-reference.md',
      27,
      'A Customer Value Platform (CVP) is a unified business system that enables organizations to recognize, create, deliver, and multiply customer value across all functions—replacing fragmented tool stacks with coherent operational capability.',
    ),
  },
  {
    label: 'CVP vs VCP',
    href: '/cvp-vs-vcp',
    // vcp-canonical-reference.md, "Disambiguation: VCP vs. CVP", its closing line.
    summary: canonLine(
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
