/**
 * /language-of-value — The Language of Value, the installable firing pack.
 *
 * Distinct from /lexicon (the encoded spec) and /glossary (the reference list):
 * this is the *pack a person installs* — the reflex + the paste-in artifact +
 * a download. It cross-links to those rather than re-implementing them.
 *
 * Built on the shared CanonArchetype shell (hero + body + implementer band) and
 * the token-based .canon-prose system, so both light and dark themes flip with
 * the SiteShell. The page's own content lives in @/lib/language-of-value as pure
 * data; the swaps and the traps are canon's pack, verbatim, from @vf/brand
 * (LOV_PACK_SWAPS, LOV_PACK_TRAPS).
 *
 * THE SWAPS AND THE TRAPS AS CARDS (build 3 of the elevation; Motif's proposal, MainBrain 7dc9928cf,
 * build3-lov/proposal.md, on @vf/brand 0.178.0 and @vf/recipes 0.199.0). Each swap is a two-sided
 * SwapGameCard in canon's swap grammar (CARD-FACE-BINDING.md, Chris 2026-07-13: "front = the dead word →
 * back = the Value term + the one-line why"); each trap is the trap card Chris approved (2026-09-28), and
 * Tokenmaxxing its own painted term card. From 900px the cards stand in a grid; below it each is a column
 * card. Both are in the server HTML and CSS shows one. Every picture is drawn from the card-art table this
 * build resolved (CardArtTableProvider), at its exact registry version; no address is written here. The
 * pack text the install block shows is untouched: it still carries every trap's line and its "Watch for:".
 */
import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LovSwapsModule, LovTrapsModule, lovSwapFrameworkJoins } from '@vf/brand';
import { LOV_PACK_COUNTS, LOV_PACK_SWAPS, LOV_PACK_TRAPS, countWordCapital } from '@vf/brand/methodology';
import { CardArtTableProvider, SwapGameCard, TermGameCard, TrapGameCard } from '@vf/recipes/game-cards';
import { SITE } from '@/lib/site';
import { cardArtTable } from '@/lib/card-art-table';
import { frameworkMedia } from '@/lib/framework-media';
import { CanonArchetype } from '@/components/CanonArchetype';
import { LanguageOfValueInstall } from '@/components/LanguageOfValueInstall';
import { GlossaryCompanion } from '@/components/GlossaryCompanion';
import { SharePageLink } from '@/components/SharePageLink';
import { JsonLd } from '@/components/JsonLd';
import {
  HERO,
  PREMISE,
  REFLEX_STEPS,
  REFLEX_DISCIPLINE,
  PACK_SUMMARY,
  PACK_SUMMARY_PROSE,
  EXAMPLE,
  RELATED,
  CTA,
  ARTIFACT_HREF,
} from '@/lib/language-of-value';

export const metadata: Metadata = {
  title: 'The Language of Value',
  // Derived. This string is indexed by search engines and rendered in every link
  // preview, so it travels to people who never open the page and persists in caches
  // after the page itself is corrected — the copy of a count with the longest reach
  // and the least chance of anyone noticing it went stale.
  description: `Your AI assistant speaks fluent funnel. The Language of Value is a paste-in pack that installs the reflex — notice the loaded word, reframe to value, say why — into any agent you run. ${PACK_SUMMARY_PROSE}.`,
  openGraph: {
    url: SITE.url + '/language-of-value',
    images: ['/og/og-language-of-value.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/og-language-of-value.jpg'],
  },
  alternates: { canonical: SITE.url + '/language-of-value' },
};

const howToLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'The Language of Value — install the reflex in your agent',
  description:
    'A five-step reflex that teaches an AI agent to reframe inherited business vocabulary into value-first language, and to teach the person the distinction as it goes.',
  step: REFLEX_STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.lead,
    text: `${s.lead} ${s.rest}`,
  })),
};

export default async function LanguageOfValuePage() {
  // Single source of truth for the paste block AND the download: read the
  // canonical artifact at build time so the visible text, the copied text, and
  // the downloaded file are byte-identical and can never drift.
  const pasteText = readFileSync(join(process.cwd(), 'public', 'language-of-value.md'), 'utf8');

  // The cards. The table is the one this build resolved; the joins send the two framework words to their
  // place on this site's framework pages, with Natural Value Flow's episode, from the media join the
  // framework pages already read.
  const table = cardArtTable();
  const joins = lovSwapFrameworkJoins({
    media: { 'core-beliefs': await frameworkMedia('core-beliefs'), 'value-realities': await frameworkMedia('value-realities') },
    routes: { 'core-beliefs': '/beliefs', 'value-realities': '/realities' },
  });
  const cards = Object.fromEntries(LOV_PACK_SWAPS.map((s) => [s.key, <SwapGameCard swap={s} pageHref={joins.hrefs[s.key]} />]));
  const trapCards = Object.fromEntries(
    LOV_PACK_TRAPS.map((t) => [t.key, t.kind === 'complexity-trap' ? <TrapGameCard slug={t.slug} /> : <TermGameCard slug={t.slug} />]),
  );

  return (
    <>
      <JsonLd data={howToLd} />
      <CanonArchetype
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        lead={HERO.lead}
        path="/language-of-value"
        specMeta={[
          { label: 'Reads as', value: 'Paste-in agent rules' },
          { label: 'In the pack', value: PACK_SUMMARY },
          { label: 'Cite', value: 'valuecreationprotocol.com/language-of-value' },
        ]}
      >
        {/* Made to be shared — one-tap copy of the canonical link. */}
        <SharePageLink label="Share this page" />

        {/* Premise — the two opening beats. Drop-cap on the first paragraph. */}
        <div className="canon-prose">
          <p>
            You can&apos;t argue with training data. Every word carries a worldview — and the default
            business vocabulary arrives pre-loaded with the wrong one, in human and AI training data
            alike.
          </p>
          {PREMISE.map((beat) => (
            <div key={beat.heading}>
              <h2>{beat.heading}</h2>
              <p>{beat.body}</p>
            </div>
          ))}
        </div>

        {/* The installable pack — copy + download, single source of truth. */}
        <div id="install" className="lov-anchor">
          <LanguageOfValueInstall pasteText={pasteText} downloadHref={ARTIFACT_HREF} />
          {/* The pack's other half. The paste block routes an agent to the glossary;
              this routes the person reading the page. */}
          <GlossaryCompanion />
        </div>

        {/* The readable breakdown — no drop-cap. The two card modules sit at the body's full width, outside
            the prose measure (68ch holds one card across), so the prose closes before each and reopens after. */}
        <CardArtTableProvider table={table}>
          <div className="canon-prose lov-flat">
            <h2>The reflex</h2>
            <p>
              When you draft, reply, or plan — and a loaded word below shows up, from you or the person
              you&apos;re helping — do this, in order:
            </p>
            <ol>
              {REFLEX_STEPS.map((step) => (
                <li key={step.lead}>
                  <strong>{step.lead}</strong> {step.rest}
                </li>
              ))}
            </ol>
            <p>{REFLEX_DISCIPLINE}</p>

            <h2>The swaps — say this, not that</h2>
            <p>
              {countWordCapital(LOV_PACK_COUNTS.swaps)} loaded words, each with the Value-First word that replaces it
              and the one line that says why. You don&apos;t redefine the old word — you change it.
            </p>
          </div>
          <div className="lov-cards">
            <LovSwapsModule layout="responsive" cards={cards} art={table} films={joins.films} hrefs={joins.hrefs} />
          </div>

          <div className="canon-prose lov-flat">
            <h2>The traps — dead frames to reexamine</h2>
            <p>
              These are named patterns, not just words. When the work starts reaching for one, name it
              and reexamine — don&apos;t optimize the trap, leave it.
            </p>
          </div>
          <div className="lov-cards">
            <LovTrapsModule
              layout="responsive"
              cards={trapCards}
              art={table}
              routes={{ 'complexity-traps': '/twelve-traps', 'value-realities': '/realities' }}
            />
          </div>

          <div className="canon-prose lov-flat">
            <h2>What it looks like</h2>
            <blockquote>
              <p>
                <strong>Someone writes:</strong> &ldquo;{EXAMPLE.prompt}&rdquo;
              </p>
              <p>
                <strong>Your agent, with these rules:</strong> &ldquo;{EXAMPLE.response}&rdquo;
              </p>
            </blockquote>
            <p>{EXAMPLE.closing}</p>
          </div>
        </CardArtTableProvider>

        {/* Cross-links — promote-don't-fork. This pack points at the encoded
            spec and the reference list; it does not re-implement them. */}
        <section className="lov-related" aria-label="Related surfaces">
          <p className="lov-related-eyebrow">Go deeper</p>
          <div className="lov-related-grid">
            {RELATED.map((link) => (
              <a key={link.href} href={link.href} className="lov-related-card">
                <span className="lov-related-title">{link.label}</span>
                <span className="lov-related-blurb">{link.blurb}</span>
                <span aria-hidden="true" className="lov-related-arrow">
                  &rarr;
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* CTA — the flagship call. Scrolls back to the install block. */}
        <section className="lov-cta">
          <p className="lov-cta-headline">{CTA.headline}</p>
          <p className="lov-cta-body">{CTA.body}</p>
          <a className="lov-btn lov-btn-primary lov-cta-btn" href="#install">
            Get the pack
          </a>
        </section>
      </CanonArchetype>
    </>
  );
}
