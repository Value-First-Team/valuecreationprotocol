/**
 * GlossaryCompanion — the human-reachable half of the pack.
 *
 * WHY THIS EXISTS: the pack is two files by design (the reflex + the glossary),
 * and this page only ever offered one. The pack's own body routes an AGENT to the
 * glossary, but that routing lives inside the paste block — where the URL is raw
 * markdown a person cannot click. So a reader was handed an instruction and an
 * unreachable link. This is the reader's half of that route.
 *
 * PLACEMENT IS THE POINT: it sits directly under the install panel, at the moment
 * the reader has just taken file one, so the second file reads as the rest of the
 * same thing rather than as a related link at the foot of the page.
 *
 * IT DESCRIBES THE GLOSSARY; IT DOES NOT DEFINE IT. Oracle owns the definition,
 * and a second definition on a page is how two copies start disagreeing. No term
 * count is quoted here for the same reason — the artifact states its own, and a
 * number duplicated across three repos is a drift surface with no owner.
 *
 * Server component: a heading and a link, no interactivity, no client boundary.
 *
 * Styling: .lov-companion-* in vcp-archetypes.css, --vcp-* tokens only, matching
 * the install panel it sits beneath. VCP carries its own protocol identity (paper,
 * serif, editorial measure) that the re-platform brief mandates keeping — it is a
 * deliberately separate system from the --vf-* design engine, which is why this
 * uses the page's own idiom rather than a shared component built against --vf-*.
 */

/** The canonical published glossary. Verified 200 + canon hash before shipping. */
const GLOSSARY_URL = 'https://valuefirstteam.com/skill/language-of-value/glossary.md';

export function GlossaryCompanion() {
  return (
    <section className="lov-companion" aria-labelledby="lov-companion-heading">
      <p className="lov-companion-eyebrow">The second file</p>
      <h2 id="lov-companion-heading" className="lov-companion-heading">
        The pack is two files. You just took one.
      </h2>
      <div className="lov-companion-body">
        <p>
          What you copied installs the reflex — the swaps and the traps, running whether or not
          anyone stops to look a word up. The glossary is the language underneath it: every
          framework, belief, stage and concept, defined, so your agent reads what a term means
          instead of inferring it.
        </p>
        <p>
          Hand it over the way you would hand an agent any reference — a Project&apos;s knowledge
          base, a Space&apos;s sources, a Gem&apos;s files, or beside this file in a skills folder.
        </p>
        <p className="lov-companion-close">
          The reflex works on its own. With the glossary, the reframes get specific.
        </p>
      </div>
      <div className="lov-companion-actions">
        <a
          className="lov-btn lov-btn-primary"
          href={GLOSSARY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the glossary
        </a>
        <code className="lov-companion-url">valuefirstteam.com/skill/language-of-value/glossary.md</code>
      </div>
    </section>
  );
}
