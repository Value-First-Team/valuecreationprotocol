/**
 * THE VALUE LOOP REFERENCE'S OWN WORDS, read out of the pinned canon snapshot. Server only (build time).
 *
 * /value-loop is a thin framework route (builds 5 and 6, @vf/brand 0.180.0): its words come from @vf/brand's derived
 * copy of canon. The canonical reference the hand-built page rendered in full now has its own address,
 * /value-loop/reference, as TEACH's moved to /teach/reference. This is that page's reader, and the one place its
 * hero's words are checked against the snapshot (`canonLine`, `canonPhrase`), so /value-loop's spec strip names the
 * reference by the title the reference page prints.
 */
import { canonLine, canonPhrase } from '@/lib/canon-line';
import { WIKI_CANONICAL } from '@/lib/markdown';

const CANON = WIKI_CANONICAL.valueLoop;

/** The reference's title (canon line 19). */
export function valueLoopReferenceTitle(): string {
  return canonPhrase(CANON, 19, 'The Value Loop');
}

/** The hero's eyebrow: the four stages in canon's flow order (line 107). */
export function valueLoopReferenceEyebrow(): string {
  return canonPhrase(CANON, 107, 'Express Value → Tailor Value → Amplify Value → Evolve Value');
}

/** Canon's definition sentence (line 21): the hero's lead and the page's description. */
export const VALUE_LOOP_REFERENCE_LEAD =
  'The Value Loop is a 4-stage framework describing how value actually emerges through continuous engagement with different conversation partners—ourselves, specific others, the market, and data.';

export function valueLoopReferenceLead(): string {
  return canonLine(CANON, 21, VALUE_LOOP_REFERENCE_LEAD);
}

/** The reference's version (line 4), for the spec strip. */
export function valueLoopReferenceVersion(): string {
  return canonPhrase(CANON, 4, '1.1');
}

export const VALUE_LOOP_REFERENCE_CANON = CANON;
