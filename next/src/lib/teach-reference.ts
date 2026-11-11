/**
 * THE TEACH REFERENCE, READ OUT OF THE PINNED SNAPSHOT. Server only (build time).
 *
 * /teach is a thin framework route (2026-11-11, TEACH the eighth family): its words come from @vf/brand's
 * derived copy of canon. The canonical reference the hand-built page rendered in full below its stage now has
 * its own address, /teach/reference, and this is its reader: the same pinned snapshot the page always rendered
 * (`renderStagedMarkdown(STAGED_FILES.teach)`, @vf/value-path-core/canon-data), so the canon-drift gate reads
 * the same source and a canon change arrives with the pin bump that brings it.
 *
 * The version and effective labels are read OUT OF THE BODY, not from a second store: a label sourced elsewhere
 * silently goes on describing a document it no longer matches.
 *
 * LOUD ON PURPOSE. A reference with no title fails the build, naming what is missing, and never falls back.
 */
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';

export interface TeachReference {
  /** The reference's own title (its first heading). */
  title: string;
  /** The body, rendered as the page always rendered it, without its first heading. */
  bodyHtml: string;
  /** "**Version:**" from the body, when it carries one. */
  version?: string;
  /** "**Effective Date:**" from the body, when it carries one. */
  effective?: string;
}

/** Read a "**Label:** value" line out of the canon markdown body itself. */
function fromBody(raw: string, label: string): string | undefined {
  const m = raw.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+?)\\s*$`, 'm'));
  return m?.[1] || undefined;
}

export function teachReference(): TeachReference {
  const { html, raw: source } = renderStagedMarkdown(STAGED_FILES.teach);
  if (!source) throw new Error('teach-reference: the pinned snapshot has no TEACH reference. Fix the reader, never the words.');
  const raw = source.replace(/\r\n/g, '\n');
  const title = raw.match(/^# (.+)$/m)?.[1]?.trim();
  if (!title) throw new Error('teach-reference: the TEACH reference has no title (no "# " heading) in the pinned snapshot.');
  return {
    title,
    bodyHtml: stripFirstH1(html),
    version: fromBody(raw, 'Version'),
    effective: fromBody(raw, 'Effective Date'),
  };
}

/** The reference's own title, for a link to it. */
export function teachReferenceTitle(): string {
  return teachReference().title;
}
