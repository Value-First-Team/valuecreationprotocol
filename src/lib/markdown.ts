/**
 * Markdown rendering for staged canon documents.
 *
 * Sanity strategicDocument / encodingStackDoc records carry metadata (title, version,
 * status, effectiveDate) but not body content — body lives in markdown files that are
 * bundled INTO this repo at src/content/canon/ and src/content/wiki-canonical/.
 *
 * Build inputs must live inside the repo Vercel builds from. Cross-repo absolute-path
 * reads (e.g. /mnt/d/Projects/VFT_Platform/... or /mnt/d/Projects/value-first-operations/wiki/canonical/...)
 * work locally but fail in Vercel CI because the build container only has access to
 * this repo's filesystem.
 *
 * The files at src/content/canon/ mirror staged canon from
 * /mnt/d/Projects/VFT_Platform/2026_VFT_Platform_Infrastructure/apps/sites/valuecreationprotocol/.
 *
 * The files at src/content/wiki-canonical/ mirror wiki canonical references from
 * /mnt/d/Projects/value-first-operations/wiki/canonical/.
 *
 * To refresh: copy the updated markdown from the source location into the matching
 * directory under src/content/, commit, push. The build picks up new content on the
 * next deploy.
 */
import { marked } from 'marked';

// Eagerly import all canon markdown as raw strings at build time. Vite/Astro
// resolves these via the bundler, so the content is embedded in the build
// output and is accessible from Vercel serverless functions without filesystem
// access to the source tree.
const STAGED_FILES_RAW = import.meta.glob('../content/canon/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const WIKI_FILES_RAW = import.meta.glob('../content/wiki-canonical/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// GitHub-Flavored Markdown, soft line breaks preserved as paragraphs (not <br>).
marked.setOptions({
  gfm: true,
  breaks: false,
});

/**
 * Look up a raw markdown body by basename within a glob result map.
 * The keys of import.meta.glob results are relative paths like
 * "../content/canon/beyond_leads_manifesto_v2.md".
 */
function findByBasename(
  glob: Record<string, string>,
  basename: string
): string | undefined {
  const suffix = `/${basename}`;
  for (const key of Object.keys(glob)) {
    if (key.endsWith(suffix)) {
      return glob[key];
    }
  }
  return undefined;
}

/**
 * Read a staged canon markdown file and return rendered HTML.
 *
 * filename is the basename (e.g. "beyond_leads_manifesto_v2.md").
 * Returns { html, raw }.
 */
export function renderStagedMarkdown(filename: string): { html: string; raw: string } {
  const raw = findByBasename(STAGED_FILES_RAW, filename);
  if (!raw) {
    console.error('[markdown] staged canon file not bundled:', filename);
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
  // aiNativeShift removed 2026-05-17 — Part 3 essay moved to its canonical home
  // as a blogPost on valuefirstteam.com. The source markdown
  // (VCP-Newsletter-Part3.md) remains in src/content/canon/ for editorial
  // reference and is no longer rendered by any vcp.com page.
} as const;

/**
 * Read a wiki canonical reference file and return rendered HTML.
 * Wiki canonicals are Chris-authored long-form references for methodology
 * concepts (Value Loop, Three-Org Model, Twelve Traps long-form, etc.).
 */
export function renderWikiCanonical(filename: string): { html: string; raw: string } {
  const raw = findByBasename(WIKI_FILES_RAW, filename);
  if (!raw) {
    console.error('[markdown] wiki canonical file not bundled:', filename);
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
