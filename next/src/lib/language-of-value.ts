/**
 * The Language of Value — content model.
 *
 * The vocabulary content (reflex, swaps, traps, worked example) as pure DATA,
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

/** One step of the firing reflex — a bold lead-in plus its clause. */
export interface ReflexStep {
  /** The imperative lead word(s), rendered bold. */
  lead: string;
  /** The rest of the sentence. */
  rest: string;
}

/** One vocabulary swap — the loaded word, the Value-First word, and why. */
export interface Swap {
  /** The inherited/loaded term to stop reaching for. May carry a qualifier. */
  instead: string;
  /** Optional disambiguating qualifier shown quietly beside `instead`. */
  insteadNote?: string;
  /** The Value-First term to say instead. */
  say: string;
  /** One plain line — the distinction the reframe teaches. */
  because: string;
}

/** One named trap — a dead frame to reexamine rather than optimize. */
export interface Trap {
  name: string;
  body: string;
  /** Optional "Watch for:" tells that signal the trap is being reached for. */
  watchFor?: string;
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

/** The 23 swaps — say this, not that. */
export const SWAPS: Swap[] = [
  { instead: 'problem', say: 'Value Gap', because: 'names the space between current and possible value — no blame, no fault' },
  { instead: 'pain point', say: 'Felt Value Gap', because: 'the gap as the person actually feels it, without pathologizing them' },
  { instead: 'lead', insteadNote: 'the person/record', say: 'Interest', because: 'a human showing interest, not an object to capture' },
  { instead: 'lead', insteadNote: 'the signal', say: 'Value Signal', because: 'the indicator that value is landing, not a unit to harvest' },
  { instead: 'funnel / top-of-funnel / lead generation', say: 'Value Doors', because: 'ways in that give value first, not a chute you push people down' },
  { instead: 'sales funnel', insteadNote: 'campaign → conversion → revenue', say: 'Value Loop', because: "value compounds in a loop; it isn't spent on the way down a funnel" },
  { instead: 'lead magnet / gated content', say: 'Value-First Content', because: 'content that helps whether or not they ever "convert"' },
  { instead: 'go-to-market / GTM', say: 'Value Delivery', because: "you deliver value, you don't march on a market" },
  { instead: 'create value / add value', say: 'Value Move', because: 'a specific act that moves value toward someone' },
  { instead: 'value-added', say: 'Value Enablement', because: 'value you make possible for them, not a bolt-on extra' },
  { instead: 'capture value', say: 'Value Realized', because: 'value is realized when a person confirms it, not captured from them' },
  { instead: 'capturing value', insteadNote: 'as a mindset', say: 'Natural Value Flow', because: 'value flows when you stop trying to trap it' },
  { instead: 'value proposition', insteadNote: 'the understanding', say: 'Value Clarity', because: 'shared clarity on the value, not a pitch' },
  { instead: 'value proposition', insteadNote: 'the proof', say: 'Value Story (Proof, Not Pitch)', because: 'earned proof, not a claim' },
  { instead: 'ROI', insteadNote: 'as the number that counts', say: 'Value Wake', because: 'the trailing, realized value in every kind — money is one, not the only' },
  { instead: 'a single summed value total', say: 'Value in Kind', because: 'value kept in its own kind, never falsely summed across kinds' },
  { instead: 'dashboard', say: 'Value View', because: 'a view that reads value, not activity' },
  { instead: 'market valuation / price-as-value', say: 'Value Assignment', because: 'value assigned by the beholder, not the market price' },
  { instead: 'Gantt chart / project timeline', say: 'Value Gantt', because: 'sequences by value delivered, not tasks completed' },
  { instead: 'value ladder / ascending offers / rungs', say: 'The Value Ascent', because: 'a climb in value, not a ladder of ever-bigger offers' },
  { instead: 'tribal knowledge / know-how trapped in heads', say: 'Human Domain Expertise (HDE)', because: 'expertise you own and make legible, not folklore' },
  { instead: 'central gatekeeper / bottleneck / command-and-control admin', say: 'The Orchestrator', because: 'coordinates flow, never a chokepoint' },
  { instead: 'sparring / pushback', say: 'Sharpen the Value / Refine the Value', because: "you sharpen and refine the value together; you don't spar against a person" },
];

/** The 12 traps — dead frames to reexamine. */
export const TRAPS: Trap[] = [
  { name: 'The Leads Trap', body: 'treating humans as objects to be captured, scored, and processed.', watchFor: '"MQL," "lead scoring," "capture the lead."' },
  { name: 'The Qualification Trap', body: "artificial gates and scoring to filter people before you've served them.", watchFor: '"BANT," "SQL," "disqualify."' },
  { name: 'The Lead Magnet Trap', body: 'gating real help as bait for contact information.' },
  { name: 'The Advertising Trap', body: 'fighting for attention through interruption instead of earning it with value.' },
  { name: 'The Measurement Trap', body: 'optimizing activity metrics that feel productive but prove nothing changed for a human.', watchFor: 'vanity metrics, a dashboard treated as proof.' },
  { name: 'The Managed Services Trap', body: 'building on client dependency instead of client capability.', watchFor: '"we\'ll just run it for you" as the whole model.' },
  { name: 'The ERP Trap', body: 'forcing the business to conform to rigid software instead of the reverse.', watchFor: '"one system to rule them all," "rip and replace."' },
  { name: 'The SaaS Trap', body: 'every new tool solves one thing and adds three coordination problems.', watchFor: '"there\'s a tool for that" as the reflex.' },
  { name: 'The B2B Trap', body: 'treating people as records to move through stages.', watchFor: 'humans described as accounts/objects.' },
  { name: 'The AI Replacement Trap', body: "believing AI's job is to replace humans, not multiply them.", watchFor: '"automate the headcount away."' },
  { name: 'The Authority Trap', body: 'centralizing control so it blocks the distributed intelligence it needs.', watchFor: 'sign-off as the only path forward.' },
  { name: 'The Conformity Trap', body: 'standardization that suppresses the human judgment that creates value.', watchFor: '"one right way," "just follow the process."' },
];

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
