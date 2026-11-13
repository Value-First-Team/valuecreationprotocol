/**
 * THE VALUE LOOP'S FOUR STAGES, as canon's Four Stages table carries them (value-loop-canonical-reference-v1.md,
 * lines 51-54): each row is [the line it sits on, the stage's name, canon's description of it].
 *
 * One list for two readers: /value-loop renders these as its DefinedTerms, checking every name and description
 * against the pinned canon snapshot at build (`canonPhrase`, lib/canon-line.ts), and the /methodology hub counts
 * them for the Value Loop card's "4 stages". Moved here from app/value-loop/page.tsx (build 2) so the page and the
 * hub count one list and never two.
 */
export const VALUE_LOOP_STAGES = [
  [51, 'Express Value', 'Internal clarity before external action. Strategy sessions, team alignment, identity definition. Market testing positioning and value proposition.'],
  [52, 'Tailor Value', 'Genuine one-to-one relationship building with specific humans. Direct dialogue, account strategy, contextual relevance. Trust development through understanding their unique situation.'],
  [53, 'Amplify Value', "Pattern recognition across relationships revealing community. Broader market conversations. Discovering what's working and sharing it appropriately."],
  [54, 'Evolve Value', 'Collaborative learning from outcomes. AI pattern recognition combined with human strategic interpretation. Continuous improvement of all stages.'],
] as const;
