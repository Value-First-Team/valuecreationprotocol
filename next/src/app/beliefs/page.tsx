/**
 * /beliefs — Five Core Beliefs. React port of src/pages/beliefs.astro.
 * Source: Sanity coreBelief records (position 1..5), fetched at build time (SSG).
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getCoreBeliefs } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Five Core Beliefs',
  description:
    "The philosophical foundations of the Value Creation Protocol. Five 'X over Y' statements that distinguish AI-native value creation from industrial-age defaults.",
  openGraph: { url: SITE.url + '/beliefs', images: ['/og/og-beliefs.jpg'] },
  alternates: { canonical: SITE.url + '/beliefs' },
};

export default async function BeliefsPage() {
  const beliefs = await getCoreBeliefs();
  const ordered = beliefs.filter(
    (b) => typeof b.position === 'number' && b.position >= 1 && b.position <= 5
  );

  const definedTermsLd = {
    '@context': 'https://schema.org',
    '@graph': ordered.map((b) => ({
      '@type': 'DefinedTerm',
      name: b.name,
      description: b.principle ?? b.tagline ?? b.shortLabel ?? undefined,
      termCode: b.slug?.current ?? `belief-${b.position}`,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Value Creation Protocol Glossary',
        url: `${SITE.url}/glossary`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={definedTermsLd} />
      <CanonArchetype
        eyebrow="Five Core Beliefs"
        title="Five beliefs that decide everything else."
        lead="Each belief is an 'X over Y' statement — the Value-First approach over the industrial-age default. They are the philosophical foundation from which the Value Path, the Twelve Traps, and the Three-Org Model are derived. Read them once; they will rearrange the rest of the protocol."
        path="/beliefs"
        specMeta={[
          { label: 'Status', value: 'v1.0 · canonical' },
          { label: 'Effective', value: '08 December 2025' },
          { label: 'Verified', value: '14 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/beliefs' },
        ]}
      >
        <section className="canon-prose">
          <p>
            Beliefs come before frameworks. The five below decide which patterns the protocol
            amplifies and which it refuses. Every other canon page on this site can be derived from
            them — and read against them.
          </p>
          <p>
            Each belief names the operating habit the protocol holds (the X) and the industrial-age
            habit it leaves behind (the Y). The structure is intentional: beliefs are positional, not
            abstract.
          </p>
        </section>

        {ordered.length > 0 && (
          <>
            <p className="canon-section-label">The five, in canonical order</p>
            <h2 className="canon-section-sub">Each belief, named and addressable.</h2>
            <p className="canon-section-note">
              Sourced from Sanity. Position 1 through 5. Each carries its own anchor.
            </p>

            <ol className="canon-records">
              {ordered.map((b) => {
                const slug = b.slug?.current ?? `belief-${b.position}`;
                const principle = b.principle ?? '';
                const overMatch = principle.match(/^(.+?)\s+over\s+(.+)$/i);
                const xPart = overMatch?.[1]?.trim();
                const yPart = overMatch?.[2]?.trim();
                return (
                  <li className="canon-record" id={slug} key={b._id}>
                    <p className="canon-record-eyebrow">Belief {String(b.position).padStart(2, '0')}</p>
                    <h3 className="canon-record-title">{b.name}</h3>
                    {b.principle && <p className="canon-record-mantra">&ldquo;{b.principle}&rdquo;</p>}
                    {xPart && yPart && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">The Value-First habit (X)</p>
                          <ul className="canon-record-meta-list">
                            <li>{xPart}</li>
                          </ul>
                        </div>
                        <div>
                          <p className="canon-record-meta-label">The industrial-age default (Y)</p>
                          <ul className="canon-record-meta-list">
                            <li>{yPart}</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {b.tagline && <p className="canon-record-body">{b.tagline}</p>}
                  </li>
                );
              })}
            </ol>
          </>
        )}

        <div className="canon-callout">
          <p className="canon-callout-label">Where this fits</p>
          <p className="canon-callout-body">
            Beliefs are upstream. The <a href="/value-path">Value Path</a> is one downstream
            expression of them. The <a href="/twelve-traps">Twelve Traps</a> name what happens when a
            team adopts the Y instead of the X. The <a href="/realities">Value Realities</a> name the
            operating commitments the beliefs imply.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
