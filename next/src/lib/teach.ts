/**
 * THE TEACH STOPS, READ OUT OF CANON. Server only (build time).
 *
 * /teach walks the five value pairs as one space (@vf/site-kit/scroll-stage). Every word a stop shows is
 * canon's, read here from the same pinned snapshot the page's full reference renders
 * (`renderStagedMarkdown(STAGED_FILES.teach)`, @vf/value-path-core/canon-data). Nothing is retyped: a pair's
 * name, its Theme, its How We Live This, its In Client Relationships / In Service Delivery / In Client
 * Engagement, its What This Creates and the guard one pair carries are each cut from the document and
 * rendered as the document renders them. A canon change reaches the stops with the pin bump that brings it.
 *
 * WHAT IS NOT CARRIED INTO A STOP: a section's governance note (the `>` block on Agile ↔ Adaptable records
 * who ratified the pair and when). It is part of the reference, not of the posture, and it stays on the page
 * in the full reference below the stage.
 *
 * LOUD ON PURPOSE. If canon's shape changes so that a pair, its theme, a section or the quick reference cannot
 * be read, the build fails naming what is missing. A stop that silently drops a section is the failure the
 * canon-drift gate exists to prevent, so this never falls back.
 */
import { marked } from 'marked';
import { renderStagedMarkdown, STAGED_FILES } from '@/lib/markdown';

export interface TeachSection {
  /** Canon's own label, without its colon: "How We Live This", "In Service Delivery", ... */
  label: string;
  /** The section's words, rendered as the reference renders them. */
  html: string;
}

export interface TeachPair {
  /** The acronym letter canon's quick reference gives this pair. */
  letter: string;
  /** The full pair, as canon writes it: "Transparent ↔ Trust". */
  name: string;
  /** The two halves, in canon's order (never shown alone: they exist so the heading can keep "↔ B" together). */
  halves: [string, string];
  /** The stop's address on the page. */
  slug: string;
  theme: string;
  sections: TeachSection[];
  /** The guard paragraph, for the one pair canon gives one. Rendered with its bold lead. */
  guard?: string;
}

export interface TeachCanon {
  /** The reference's own title (its first heading). */
  title: string;
  /** "Each pair is held simultaneously, not sequentially. ..." (Why Value Pairs Matter). */
  simultaneity: string;
  pairs: TeachPair[];
  /** The quick reference card's pattern line, after "Pattern: ". */
  pattern: string;
  /** The line under the pattern on the quick reference card. */
  patternNote: string;
  /** The things canon says adapt, inside the moving pair's frame ("the plan, the roadmap, ..."). */
  adapts: string[];
}

const PAIR_SEP = ' ↔ ';

function fail(what: string): never {
  throw new Error(`teach: canon could not be read (${what}). The stops read the pinned snapshot; fix the reader, never the words.`);
}

const inline = (md: string) => (marked.parseInline(md, { async: false }) as string).trim();
const block = (md: string) => (marked.parse(md, { async: false }) as string).trim();

/** The text of a "## Heading" section, up to the next heading of the same or a higher level. */
function sectionOf(raw: string, heading: RegExp, level: number): string {
  const lines = raw.split('\n');
  const start = lines.findIndex((l) => heading.test(l));
  if (start < 0) fail(`no heading matching ${heading}`);
  const stop = lines.findIndex((l, i) => i > start && new RegExp(`^#{1,${level}} `).test(l));
  return lines.slice(start + 1, stop < 0 ? undefined : stop).join('\n');
}

const slugOf = (name: string) =>
  name
    .split(PAIR_SEP)
    .map((h) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    .join('-');

export function readTeachCanon(): TeachCanon {
  const { raw: source } = renderStagedMarkdown(STAGED_FILES.teach);
  if (!source) fail('the snapshot has no TEACH reference');
  const raw = source.replace(/\r\n/g, '\n');

  const title = raw.match(/^# (.+)$/m)?.[1]?.trim() ?? fail('no title');

  const why = sectionOf(raw, /^## Why Value Pairs Matter/, 2);
  const simultaneity = why
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => /simultaneously/.test(p)) ?? fail('no simultaneity paragraph under Why Value Pairs Matter');

  // The quick reference card: the acronym letter and the theme for each pair, and the pattern.
  const card = sectionOf(raw, /^## Quick Reference Card/, 2).match(/```\n?([\s\S]*?)```/)?.[1] ?? fail('no quick reference card');
  const cardRows = [...card.matchAll(/^([A-Z]) - (.+? ↔ .+?)\s+— (.+)$/gm)].map((m) => ({ letter: m[1], name: m[2].trim(), theme: m[3].trim() }));
  if (!cardRows.length) fail('no pair rows on the quick reference card');
  const pattern = card.match(/^Pattern: (.+)$/m)?.[1]?.trim() ?? fail('no pattern line');
  const patternLine = card.split('\n').findIndex((l) => l.startsWith('Pattern: '));
  const patternNote = card.split('\n')[patternLine + 1]?.trim() || fail('no line under the pattern');

  // The definitions, one "### N. A ↔ B" section each.
  const defs = sectionOf(raw, /^## The Five Value Pairs/, 2);
  const chunks = defs.split(/^### /m).slice(1);
  if (!chunks.length) fail('no pair sections');
  const pairs: TeachPair[] = chunks.map((chunk) => {
    const [head, ...rest] = chunk.split('\n');
    const name = head.replace(/^\d+\.\s*/, '').trim();
    const halves = name.split(PAIR_SEP);
    if (halves.length !== 2) fail(`"${name}" is not two halves joined by ↔`);
    const row = cardRows.find((r) => r.name === name) ?? fail(`"${name}" is not on the quick reference card`);
    const blocks = rest.join('\n').split(/\n\s*\n/).map((b) => b.trim()).filter((b) => b && b !== '---');
    let theme = '';
    let guard: string | undefined;
    const sections: TeachSection[] = [];
    for (const b of blocks) {
      if (b.startsWith('>')) continue; // the governance note stays in the reference
      const t = b.match(/^\*\*Theme:\*\*\s*(.+)$/);
      if (t) { theme = t[1].trim(); continue; }
      const labelled = b.match(/^\*\*([^*]+):\*\*\s*\n([\s\S]+)$/);
      if (labelled) { sections.push({ label: labelled[1].trim(), html: block(labelled[2]) }); continue; }
      if (/^\*\*[^*]+\.\*\*/.test(b)) { guard = block(b); continue; }
      fail(`an unread block in "${name}": ${b.slice(0, 60)}`);
    }
    if (!theme) fail(`no theme for "${name}"`);
    if (theme !== row.theme) fail(`"${name}": the section's theme and the quick reference card's differ`);
    if (sections.length < 3) fail(`"${name}" has ${sections.length} sections`);
    return { letter: row.letter, name, halves: [halves[0], halves[1]], slug: slugOf(name), theme, sections, ...(guard ? { guard } : {}) };
  });
  if (pairs.length !== cardRows.length) fail('the definitions and the quick reference card name a different number of pairs');
  pairs.forEach((p, i) => { if (cardRows[i].name !== p.name) fail('the definitions are not in the quick reference card\'s order'); });

  // The pair that carries the guard is the one whose frame holds while its work moves; canon names what moves.
  const moving = pairs.find((p) => p.guard) ?? fail('no pair carries the guard');
  const live = chunks[pairs.indexOf(moving)].match(/The work adapts: ([^.]+)\./)?.[1] ?? fail(`"${moving.name}" does not say what adapts`);
  const adapts = live.split(/,\s*/).map((s) => s.trim()).filter(Boolean);

  return { title, simultaneity: inline(simultaneity), pairs, pattern, patternNote, adapts };
}
