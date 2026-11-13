/**
 * The Language of Value — content model.
 *
 * The vocabulary content (reflex, worked example, related links) as pure DATA,
 * deliberately separate from presentation so the whole pack can later be lifted
 * into @vf/site-kit as the single shared component the satellite constellation
 * sites embed. Nothing here imports React or a style — a second surface can
 * render these arrays however it likes.
 *
 * Source of truth for the vocabulary itself: the ratified Value Vocabulary
 * (canon/value-vocabulary/) via the shippable pack
 * canon/value-vocabulary/language-of-value-pack.md. Do NOT re-word entries here
 * — they are ratified canon. The paste-in artifact + download share a single
 * physical source: public/language-of-value.md (read at build time), so the copy
 * block, the download, and this data can never drift apart.
 */

import { LOV_PACK_COUNTS } from '@vf/brand/methodology';

/** One step of the firing reflex — a bold lead-in plus its clause. */
export interface ReflexStep {
  /** The imperative lead word(s), rendered bold. */
  lead: string;
  /** The rest of the sentence. */
  rest: string;
}

/** A cross-link to a related surface already published on this site. */
export interface RelatedLink {
  href: string;
  label: string;
  blurb: string;
}

export const HERO = {
  eyebrow: 'The Language of Value',
  title: 'Your agent is trained against value.',
  lead: 'Your AI assistant speaks fluent funnel. Every agent you use was trained on leads, pipelines, and pain points — so it quietly steers you away from value, in your own voice.',
} as const;

/** The two premise beats that open the body. */
export const PREMISE: { heading: string; body: string }[] = [
  {
    heading: "You can't argue with training data",
    body: "Every word carries a worldview. The default business vocabulary — problem, lead, funnel, pain point — arrives pre-loaded with the wrong meaning, in human and AI training data alike. You can't redefine those words; they lose to their training on contact. So you change the word. This pack installs the swap into any agent you run.",
  },
  {
    heading: 'A reflex, not a glossary',
    body: 'A glossary is a list an agent can look up and ignore. A reflex fires while it drafts. This pack teaches the firing — notice the loaded word, name what it imports, reframe to the Value-First word, and say why in one line so you learn the distinction too. An agent with the reflex changes the conversation; an agent with a glossary just knows the words.',
  },
];

/** The firing reflex — five ordered steps. */
export const REFLEX_STEPS: ReflexStep[] = [
  { lead: 'Notice', rest: 'the word.' },
  { lead: 'Name', rest: 'what it quietly imports (the trap, or the wrong meaning it carries).' },
  { lead: 'Reframe', rest: 'to the Value-First word.' },
  {
    lead: 'Say why',
    rest: '— one plain line — so the person learns the distinction. Do not silently swap it; the point is that they see it too.',
  },
  {
    lead: 'If it names a trap',
    rest: "(below), don't just swap the word — reexamine the frame it's pulling you into.",
  },
];

/** The disciplines that keep the reflex teaching instead of nagging. */
export const REFLEX_DISCIPLINE =
  'Two disciplines so this teaches instead of nags: speak in the Value-First words by default in your own writing, and surface the reframe once, when the word is actually load-bearing to the decision — not on every incidental mention.';

/**
 * The swaps and the traps are not held here. They are canon's pack, verbatim, as `LOV_PACK_SWAPS` and
 * `LOV_PACK_TRAPS` in @vf/brand (`@vf/brand/methodology`), generated from
 * canon/value-vocabulary/language-of-value-pack.md and held to it by that package's gate on every build, so
 * this page's reader is no longer a second author of them (build 3 of the elevation, @vf/brand 0.178.0).
 */

/** The worked example — prompt in, reframed response out. */
export const EXAMPLE = {
  prompt: 'We need more leads in the funnel — can you draft an email to push our MQLs toward a demo?',
  response:
    "Quick reframe before I draft: 'leads in the funnel' and 'MQLs' both carry the Leads Trap — treating people as objects to capture and score. I'd rather write to people showing genuine Interest through a Value Door — an email that gives them something useful whether or not they book. Here's a draft that opens with value… (want me to keep 'demo,' or reframe that to what they'd actually get from it?)",
  closing:
    'That is the difference between an agent that has a glossary and an agent that has the reflex. The first knows the words. The second changes the conversation — and teaches the person a little, every time.',
} as const;

/** Related surfaces already published here — promote-don't-fork cross-links. */
export const RELATED: RelatedLink[] = [
  { href: '/lexicon', label: 'Value-First Lexicon', blurb: 'Layer A of the encoding stack — each term encoded with its industrial counterpart, so machines can read it too.' },
  { href: '/glossary', label: 'Glossary', blurb: 'The full canonical vocabulary in one place — protocol, encoding, and the whole methodology canon.' },
  { href: '/vcp-lang', label: 'VCP-Lang', blurb: 'Layer B — the grammar that states value, context, and trust in a form agents can parse and act inside.' },
  { href: '/teach', label: 'TEACH', blurb: 'The five values for how Value-First work is taught, led, and held — the discipline upstream of the swaps.' },
];

export const CTA = {
  headline: 'Teach your agents and assistants the Language of Value today.',
  body: 'One paste installs the reflex. Every draft after it moves toward value — and shows you the difference as it goes.',
} as const;

/** Public path to the canonical paste-in artifact (download + build-time read). */
export const ARTIFACT_HREF = '/language-of-value.md';

/**
 * The pack's shape, DERIVED — the single source every surface that quotes a count
 * must read. Four representations of this vocabulary have now gone stale one at a
 * time (the readable table, the header, the meta description, the sitemap summary),
 * each because a number was typed beside the thing it counted instead of taken from
 * it. Anything that wants to say how big the pack is imports this. It reads canon's pack in @vf/brand
 * (`LOV_PACK_COUNTS`), the same rows the page draws as cards.
 */
export const PACK_COUNTS = LOV_PACK_COUNTS;

/** "N swaps · N traps · 1 reflex" — the spec-row form. */
export const PACK_SUMMARY = `${PACK_COUNTS.swaps} swaps · ${PACK_COUNTS.traps} traps · 1 reflex`;

/** "N swaps, N traps, one paste" — the prose form for metadata and summaries. */
export const PACK_SUMMARY_PROSE = `${PACK_COUNTS.swaps} swaps, ${PACK_COUNTS.traps} traps, one paste`;
