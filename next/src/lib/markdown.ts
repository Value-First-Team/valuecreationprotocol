/**
 * Markdown rendering for staged canon documents (Next.js build-time / SSG).
 *
 * Sanity strategicDocument / encodingStackDoc records carry metadata (title,
 * version, status, effectiveDate) but not body content.
 *
 * Canon that has a master in the brain is NOT bundled any more: it reads the pinned
 * snapshot in @vf/value-path-core/canon-data, so it moves with a pin bump and has no
 * second copy to go stale (Lattice's contract ruling J9, 2026-11-04; the bundled four
 * views reference was still v1 when this landed). The files left under src/content/canon/
 * have no master and are read at build time with Node fs. marked renders GFM → HTML,
 * identical to the Astro version. Server Components only — never imported into a
 * 'use client' boundary.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import { CANONICAL_FILES } from '@vf/value-path-core/canon-data';

// GitHub-Flavored Markdown, soft line breaks preserved as paragraphs (not <br>).
marked.setOptions({ gfm: true, breaks: false });

const CONTENT_ROOT = join(process.cwd(), 'src', 'content');

function readContent(filename: string): string | undefined {
  try {
    return readFileSync(join(CONTENT_ROOT, 'canon', filename), 'utf8');
  } catch {
    return undefined;
  }
}

/**
 * Every HTML comment out of rendered canon. `marked` passes a comment through as raw HTML, so a note written
 * for the brain would ship in the page source: a TODO, and since 2026-11-22 the HubSpot address that a
 * framework's file carries once it is a copy of its HubSpot record (`<!-- generated-copy`, the Five Core
 * Beliefs first; @vf/value-path-core 0.33.9 keeps it in the snapshot whole, by design). Applied to the
 * rendered HTML, never the markdown: a comment shown inside a code span or block is escaped by `marked`
 * (`&lt;!--`) and stays as written. The shared reader (@vf/site-kit FrameworkReferenceBody, which /care,
 * /value-accounting and /value-loop use) already leaves every comment out; this is the same rule for the pages still
 * on this site's own path. `raw` is returned unchanged: it is read for fields, never rendered.
 */
function withoutComments(html: string): string {
  return html.replace(/<!--[\s\S]*?-->/g, '');
}

/** The pinned snapshot's copy of a canon master, by its name under canon/canonical/. */
function readSnapshot(filename: string): string | undefined {
  return CANONICAL_FILES.find((f) => f.name === filename)?.text;
}

/** A staged page whose document has a canon master reads the snapshot, by the master's name. */
const STAGED_MASTERS: Record<string, string> = {
  'teach-values-canonical-reference.md': 'teach-values-canonical-reference.md',
  'Value-Creation-Protocol-Positioning-Paper.md': 'value-creation-protocol-positioning-paper.md',
  'vcp-canonical-reference.md': 'vcp-canonical-reference.md',
};

/**
 * Read a staged canon markdown file and return rendered HTML.
 * filename is the basename (e.g. "beyond_leads_manifesto_v2.md").
 */
export function renderStagedMarkdown(filename: string): { html: string; raw: string } {
  const master = STAGED_MASTERS[filename];
  const raw = master ? readSnapshot(master) : readContent(filename);
  if (!raw) {
    console.error('[markdown] staged canon file not bundled:', filename);
    return { html: '<p><em>Source document unavailable.</em></p>', raw: '' };
  }
  const html = withoutComments(marked.parse(raw, { async: false }) as string);
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
  teach: 'teach-values-canonical-reference.md',
  hubspotCvp: 'hubspot-cvp-canonical-reference-v1_1.md',
  beyondLeads: 'beyond_leads_manifesto_v2.md',
  valueLedGrowth: 'value-led-growth-manifesto.md',
  positioning: 'Value-Creation-Protocol-Positioning-Paper.md',
} as const;
