/**
 * Markdown rendering for staged canon documents.
 *
 * Sanity strategicDocument / encodingStackDoc records carry metadata (title, version,
 * status, effectiveDate) but not body content — body lives in staged markdown at
 * /mnt/d/Projects/VFT_Platform/.../valuecreationprotocol/*.md.
 *
 * This module loads those files at build/request time and renders to HTML with marked.
 */
import { marked } from 'marked';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const STAGED_DIR =
  '/mnt/d/Projects/VFT_Platform/2026_VFT_Platform_Infrastructure/apps/sites/valuecreationprotocol';

/**
 * Wiki canonical mirror — Chris-authored canonical reference library.
 * Used as a fallback / supplement for methodology pages whose Sanity body
 * is not yet populated (Value Loop, Value-Led Growth framework, Three-Org Model,
 * Twelve Complexity Traps long-form treatment, etc.).
 */
const WIKI_CANONICAL_DIR =
  '/mnt/d/Projects/value-first-operations/wiki/canonical';

// GitHub-Flavored Markdown, soft line breaks preserved as paragraphs (not <br>).
marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Read a staged canon markdown file and return rendered HTML.
 *
 * filename is the basename (e.g. "beyond_leads_manifesto_v2.md").
 * Returns { html, frontmatter } — frontmatter is currently always {} (no docs use it yet).
 */
export function renderStagedMarkdown(filename: string): { html: string; raw: string } {
  const path = join(STAGED_DIR, filename);
  let raw: string;
  try {
    raw = readFileSync(path, 'utf-8');
  } catch (e) {
    console.error('[markdown] failed to read', path, e);
    return { html: '<p><em>Source document unavailable.</em></p>', raw: '' };
  }
  const html = marked.parse(raw, { async: false }) as string;
  return { html, raw };
}

/**
 * Strip the first H1 from rendered HTML — many canon docs start with their own H1
 * but the page layout already renders the title, so we don't want a duplicate.
 */
export function stripFirstH1(html: string): string {
  return html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/, '');
}

/**
 * Map of well-known canon docs → staged filename. Used by render-canon-doc helpers.
 */
export const STAGED_FILES = {
  vcpCanonicalReference: 'vcp-canonical-reference.md',
  lexicon: 'vft-lexicon-canon-v0_1.md',
  vcpLang: 'vcp-lang-canon-v0_1.md',
  valueGraph: 'value-graph-canon-v0_1.md',
  emergence: 'emergence-over-predictability-canonical-reference.md',
  teach: 'teach-values-canonical-reference.md',
  hubspotCvp: 'hubspot-cvp-canonical-reference-v1_1.md',
  beyondLeads: 'beyond_leads_manifesto_v2.md',
  valueLedGrowth: 'value-led-growth-manifesto.md',
  positioning: 'Value-Creation-Protocol-Positioning-Paper.md',
  aiNativeShift: 'VCP-Newsletter-Part3.md',
} as const;

/**
 * Read a wiki canonical reference file and return rendered HTML.
 * Wiki canonicals are Chris-authored long-form references for methodology
 * concepts (Value Loop, Three-Org Model, Twelve Traps long-form, etc.).
 */
export function renderWikiCanonical(filename: string): { html: string; raw: string } {
  const path = join(WIKI_CANONICAL_DIR, filename);
  let raw: string;
  try {
    raw = readFileSync(path, 'utf-8');
  } catch (e) {
    console.error('[markdown] failed to read wiki canonical', path, e);
    return { html: '<p><em>Canonical reference unavailable.</em></p>', raw: '' };
  }
  const html = marked.parse(raw, { async: false }) as string;
  return { html, raw };
}

export const WIKI_CANONICAL = {
  beliefs: 'five-core-beliefs-canonical-reference.md',
  traps: '12-complexity-traps-canonical-reference.md',
  valuePath: 'value-path-canonical-reference-v1.1.md',
  threeOrg: 'three-org-model-canonical-reference.md',
  unifiedViews: 'four-unified-views-canonical-reference.md',
  valueLoop: 'value-loop-canonical-reference-v1.md',
  valueLedGrowth: 'value-led-growth-canonical-reference.md',
  hubspotCvp: 'hubspot-cvp-canonical-reference.md',
  valueRealities: 'value-realities-canonical-reference.md',
  fourPillars: 'four-pillars-canonical-reference.md',
  languageGuide: 'value-first-language-translation-guide.md',
} as const;
