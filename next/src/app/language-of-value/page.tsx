/**
 * /language-of-value — The Language of Value, the installable firing pack.
 *
 * Distinct from /lexicon (the encoded spec) and /glossary (the reference list):
 * this is the *pack a person installs* — the reflex + the paste-in artifact +
 * a download. It cross-links to those rather than re-implementing them.
 *
 * Built on the shared CanonArchetype shell (hero + body + implementer band) and
 * the token-based .canon-prose system, so both light and dark themes flip with
 * the SiteShell. All vocabulary content lives in @/lib/language-of-value as pure
 * data — presentation is separable, so the whole pack can later be promoted into
 * @vf/site-kit as the one shared component the satellite sites embed.
 */
import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { LanguageOfValueInstall } from '@/components/LanguageOfValueInstall';
import { SharePageLink } from '@/components/SharePageLink';
import { JsonLd } from '@/components/JsonLd';
import {
  HERO,
  PREMISE,
  REFLEX_STEPS,
  REFLEX_DISCIPLINE,
  SWAPS,
  TRAPS,
  EXAMPLE,
  RELATED,
  CTA,
  ARTIFACT_HREF,
} from '@/lib/language-of-value';

export const metadata: Metadata = {
  title: 'The Language of Value',
  description:
    'Your AI assistant speaks fluent funnel. The Language of Value is a paste-in pack that installs the reflex — notice the loaded word, reframe to value, say why — into any agent you run. 23 swaps, 12 traps, one paste.',
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

export default function LanguageOfValuePage() {
  // Single source of truth for the paste block AND the download: read the
  // canonical artifact at build time so the visible text, the copied text, and
  // the downloaded file are byte-identical and can never drift.
  const pasteText = readFileSync(join(process.cwd(), 'public', 'language-of-value.md'), 'utf8');

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
          { label: 'In the pack', value: '23 swaps · 12 traps · 1 reflex' },
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
        </div>

        {/* The readable breakdown — same content, human-scannable. No drop-cap. */}
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
            Twenty-three loaded words, each with the Value-First word that replaces it and the one
            line that says why. You don&apos;t redefine the old word — you change it.
          </p>
          <div className="lov-table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Instead of…</th>
                  <th scope="col">Say</th>
                  <th scope="col">Because</th>
                </tr>
              </thead>
              <tbody>
                {SWAPS.map((swap) => (
                  <tr key={swap.say + swap.instead}>
                    <td>
                      {swap.instead}
                      {swap.insteadNote && <span className="lov-note"> ({swap.insteadNote})</span>}
                    </td>
                    <td>
                      <strong className="lov-say">{swap.say}</strong>
                    </td>
                    <td>{swap.because}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>The traps — dead frames to reexamine</h2>
          <p>
            These are named patterns, not just words. When the work starts reaching for one, name it
            and reexamine — don&apos;t optimize the trap, leave it.
          </p>
          <ul className="lov-traps">
            {TRAPS.map((trap) => (
              <li key={trap.name}>
                <strong>{trap.name}</strong> — {trap.body}
                {trap.watchFor && <span className="lov-watch"> Watch for: {trap.watchFor}</span>}
              </li>
            ))}
          </ul>

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
