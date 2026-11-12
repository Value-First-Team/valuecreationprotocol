/**
 * canonLine — one line of a canon reference, checked against the pinned snapshot this
 * site builds from, so a sentence on this property is canon's and stays canon's.
 *
 * WHERE A METHODOLOGY SUMMARY COMES FROM. The /methodology hub and /sitemap print one
 * line for every methodology page (METHODOLOGY_PAGES in lib/site.ts). A framework that
 * @vf/brand carries is summarised by its claim there, the same derived copy of canon its
 * framework page reads. A page @vf/brand does not carry quotes one line of its canon
 * reference, verbatim, through this function: it names the file and the line, and the
 * build stops when the pinned snapshot (@vf/value-path-core/canon-data) no longer carries
 * that exact line at that place. A pin bump that moves or rewords the line therefore says
 * which, and a person updates the citation.
 *
 * Markdown emphasis (`**`) and a leading list marker are presentation, not words: they are
 * dropped from canon's line before the comparison. Nothing else is normalised.
 *
 * Server-only (build time): the snapshot is every canon reference in full.
 */
import { CANONICAL_FILES } from '@vf/value-path-core/canon-data';

function plain(line: string): string {
  return line.replace(/^\s*[-*]\s+/, '').replace(/\*\*/g, '').trim();
}

export function canonLine(file: string, line: number, text: string): string {
  const source = CANONICAL_FILES.find((f) => f.name === file)?.text;
  if (source === undefined) {
    throw new Error(`[canon-line] ${file} is not in the pinned canon snapshot.`);
  }
  const lines = source.split(/\r?\n/).map(plain);
  if (lines[line - 1] === text) return text;
  const at = lines.indexOf(text);
  throw new Error(
    at === -1
      ? `[canon-line] ${file} no longer carries this line anywhere: "${text}". Quote the line canon carries now.`
      : `[canon-line] ${file} carries this line at ${at + 1}, not ${line}: "${text}". Update the citation.`,
  );
}
