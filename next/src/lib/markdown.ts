/**
 * Markdown rendering for staged canon documents (Next.js build-time / SSG).
 *
 * Sanity strategicDocument / encodingStackDoc records carry metadata (title,
 * version, status, effectiveDate) but not body content — body lives in markdown
 * files bundled INTO this repo at src/content/canon/ and src/content/wiki-canonical/.
 *
 * These are read at build time with Node fs (the files live inside the repo
 * Vercel builds from, so they are present in the build container). marked renders
 * GFM → HTML, identical to the Astro version. Server Components only — never
 * imported into a 'use client' boundary.
 *
 * To refresh: copy the updated markdown into the matching directory under
 * src/content/, commit, push. The next build picks up new content.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';

// GitHub-Flavored Markdown, soft line breaks preserved as paragraphs (not <br>).
marked.setOptions({ gfm: true, breaks: false });

const CONTENT_ROOT = join(process.cwd(), 'src', 'content');

function readContent(subdir: 'canon' | 'wiki-canonical', filename: string): string | undefined {
  try {
    return readFileSync(join(CONTENT_ROOT, subdir, filename), 'utf8');
  } catch {
    return undefined;
  }
}

/**
 * Read a staged canon markdown file and return rendered HTML.
 * filename is the basename (e.g. "beyond_leads_manifesto_v2.md").
 */
export function renderStagedMarkdown(filename: string): { html: string; raw: string } {
  const raw = readContent('canon', filename);
  if (!raw) {
    console.error('[markdown] staged canon file not bundled:', filename);
    return { html: '<p><em>Source document unavailable.</em></p>', raw: '' };
  }
  const html = marked.parse(raw, { async: false }) as string;
  return { html, raw };
}

/**
 * Read a wiki canonical reference file and return rendered HTML.
 */
export function renderWikiCanonical(filename: string): { html: string; raw: string } {
  const raw = readContent('wiki-canonical', filename);
  if (!raw) {
    console.error('[markdown] wiki canonical file not bundled:', filename);
    return { html: '<p><em>Canonical reference unavailable.</em></p>', raw: '' };
  }
  const html = marked.parse(raw, { async: false }) as string;
  return { html, raw };
}

/**
 * Strip the first H1 from rendered HTML — many canon docs start with their own
 * H1, but the page layout already renders the title.
 */
export function stripFirstH1(html: string): string {
  return html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/, '');
}

/** Map of well-known canon docs → staged filename. */
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
} as const;

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
