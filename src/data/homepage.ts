/**
 * Homepage "At a glance" panel — tunable content.
 *
 * Surfaced as a config so individual rows can be added/removed/edited
 * without touching the homepage Astro file. The license placeholder is
 * here on purpose: Chris has flagged that no license decision is final.
 * Remove or edit the License row without code changes.
 */
export type AtAGlanceRow = { label: string; value: string };

export const AT_A_GLANCE: AtAGlanceRow[] = [
  { label: 'Status', value: 'v0.1 · Draft · in review' },
  { label: 'Verified', value: '12 May 2026' },
  { label: 'Canon pages', value: '25 across 6 archetypes' },
  { label: 'Peers', value: 'MCP · HCP' },
  // License row is a placeholder per Chris's note — Claude Design wrote
  // "CC BY-SA 4.0" but no licensing decision has been made. Edit or
  // remove this row without code changes when the decision lands.
  { label: 'License', value: 'CC BY-SA 4.0 (placeholder — not finalized)' },
];

/**
 * Protocol stack rows — three peers with no hierarchy implied.
 * Reused on homepage and /protocol-stack hub.
 */
export type ProtocolStackRow = {
  id: 'MCP' | 'VCP' | 'HCP';
  name: string;
  desc: string;
  owner: string;
  status: string;
  /** Tailwind class for the left ID band (background). */
  bandClass: string;
  /** Tailwind class for ID text color. */
  idClass: string;
};

export const PROTOCOL_STACK: ProtocolStackRow[] = [
  {
    id: 'MCP',
    name: 'Model Context Protocol',
    desc: 'AI ↔ tools, data, models. Machine context.',
    owner: 'Anthropic',
    status: 'stable',
    bandClass: 'bg-mcp-orange-soft',
    idClass: 'text-mcp-orange-deep',
  },
  {
    id: 'VCP',
    name: 'Value Creation Protocol',
    desc: 'How AI-native organizations encode value.',
    owner: 'Value-First Team',
    status: 'v0.1 draft',
    bandClass: 'bg-vcp-teal-soft',
    idClass: 'text-vcp-teal-deep',
  },
  {
    id: 'HCP',
    name: 'Human Context Protocol',
    desc: 'Human intent, authority, and history.',
    owner: 'community',
    status: 'emerging',
    bandClass: 'bg-hcp-blue-soft',
    idClass: 'text-hcp-blue-deep',
  },
];

/**
 * Three entry-point cards on the homepage.
 */
export type EntryCard = {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
  href: string;
};

export const ENTRY_CARDS: EntryCard[] = [
  {
    num: '§ 02.1',
    eyebrow: 'ENCODING STACK',
    title: 'Lexicon · VCP-Lang · Value Graph',
    body: 'The technical specification: three layers that compile a value statement into an addressable graph.',
    meta: '3 SPECS · v0.1',
    href: '/encoding-stack',
  },
  {
    num: '§ 02.2',
    eyebrow: 'METHODOLOGY CANON',
    title: 'The Value Path, twelve traps, three orgs',
    body: 'Twelve long-form chapters covering the operating model AI-native organizations adopt to create value.',
    meta: '12 CHAPTERS',
    href: '/methodology',
  },
  {
    num: '§ 02.3',
    eyebrow: 'MANIFESTOS',
    title: 'Beyond leads. Beyond funnels.',
    body: 'Position pieces on why the industrial-age vocabulary of B2B can’t carry an AI-native organization.',
    meta: '3 ESSAYS',
    href: '/manifestos',
  },
];
