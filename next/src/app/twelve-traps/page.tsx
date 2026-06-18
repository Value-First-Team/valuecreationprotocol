/**
 * /twelve-traps — Twelve Complexity Traps. React port of src/pages/twelve-traps.astro.
 * Source: Sanity `trap` records (category core-framework | foundational), build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getTraps } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Twelve Complexity Traps',
  description:
    'Twelve anti-patterns that derail value-creation work. Each names a structural defect AI-native operations must counter. Cited individually by anchor URL.',
  openGraph: { url: SITE.url + '/twelve-traps', images: ['/og/og-twelve-traps.jpg'] },
  alternates: { canonical: SITE.url + '/twelve-traps' },
};

export default async function TwelveTrapsPage() {
  const allTraps = await getTraps();
  const traps = allTraps.filter((t) => t.category === 'core-framework' || t.category === 'foundational');

  const definedTermsLd = {
    '@context': 'https://schema.org',
    '@graph': traps.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.name,
      description:
        t.tagline ?? t.oneLineDefinition ?? 'Complexity Trap — anti-pattern that derails value-creation work.',
      termCode: t.slug?.current ?? t.name.toLowerCase().replace(/\s+/g, '-'),
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
        eyebrow="Twelve Complexity Traps"
        title="Twelve patterns that quietly derail value creation."
        lead="Each trap names a structural defect — a habit of language, architecture, or organizational design — that pulls a team back into industrial-age operating logic. Naming them is the first move. The Value Realities counter them one-for-one."
        path="/twelve-traps"
        specMeta={[
          { label: 'Status', value: 'canonical' },
          { label: 'Verified', value: '14 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/twelve-traps' },
          { label: 'Count', value: `${traps.length} traps · alphabetical` },
        ]}
      >
        {traps.length > 0 && (
          <nav className="canon-index" aria-label="Trap index">
            <p className="canon-index-label">Quick index</p>
            <ol className="canon-index-list">
              {traps.map((t, i) => {
                const slug = t.slug?.current ?? `trap-${i + 1}`;
                return (
                  <li key={t._id}>
                    <a href={`#${slug}`}>
                      <span className="canon-index-num">{String(i + 1).padStart(2, '0')}</span>
                      <span>{t.name}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <section className="canon-prose">
          <p>
            Every trap is a name for a habit that survived from the industrial age. Some are language
            traps — words that smuggle in a worldview. Some are architectural — data shapes that
            fragment context. Some are organizational — team designs that optimize for the wrong
            thing.
          </p>
          <p>
            Naming each one out loud is the precondition for refusing it. The Twelve Traps catalog
            gives a team shared vocabulary for that refusal. A practitioner in a client meeting can
            point to a single trap by URL and say: this is the shape I am refusing to import into your
            operating model.
          </p>
        </section>

        {traps.length > 0 && (
          <>
            <p className="canon-section-label">The twelve, in canonical order</p>
            <h2 className="canon-section-sub">Each trap, named and addressable.</h2>
            <p className="canon-section-note">
              Sourced from Sanity. Ordered alphabetically. Each carries its own anchor, its one-line
              definition, recognition symptoms, and the Reality that counters it.
            </p>

            <ol className="canon-records">
              {traps.map((t, i) => {
                const slug = t.slug?.current ?? `trap-${i + 1}`;
                const counterSlug = t.valueFirstAlternative
                  ? t.valueFirstAlternative.toLowerCase().replace(/\s+/g, '-')
                  : slug;
                return (
                  <li className="canon-record" id={slug} key={t._id}>
                    <p className="canon-record-eyebrow">Trap {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="canon-record-title">{t.name}</h3>
                    {t.headline && <p className="canon-record-mantra">&ldquo;{t.headline}&rdquo;</p>}
                    {(t.oneLineDefinition ?? t.tagline) && (
                      <p className="canon-record-body">{t.oneLineDefinition ?? t.tagline}</p>
                    )}
                    {t.subheadline && (
                      <p className="canon-record-body" style={{ color: 'var(--vcp-ink-3)', fontSize: '0.9375rem' }}>
                        {t.subheadline}
                      </p>
                    )}
                    {t.keySymptoms && t.keySymptoms.length > 0 && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">Recognition symptoms</p>
                          <ul className="canon-record-meta-list">
                            {t.keySymptoms.map((s, si) => (
                              <li key={si}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {t.theAlternative && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">The Value-First alternative</p>
                          <ul className="canon-record-meta-list">
                            <li>{t.theAlternative}</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {(t.valueFirstAlternative || t.assessmentPath) && (
                      <ul className="canon-record-tags">
                        {t.valueFirstAlternative && (
                          <li>
                            <a href={`/realities#${counterSlug}`} className="canon-record-tag">
                              <span className="canon-record-tag-label">counter</span>
                              {t.valueFirstAlternative}
                            </a>
                          </li>
                        )}
                        {t.assessmentPath && (
                          <li>
                            <a
                              href={`https://valuefirstteam.com${t.assessmentPath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="canon-record-tag"
                            >
                              <span className="canon-record-tag-label">assess</span>self-assessment
                            </a>
                          </li>
                        )}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ol>
          </>
        )}

        <div className="canon-callout">
          <p className="canon-callout-label">The pattern beneath the patterns</p>
          <p className="canon-callout-body">
            Every trap shares the same deep structure: it preserves an industrial-age habit by giving
            it a polite, professional name. The <a href="/realities">Value Realities</a> name the
            inverted habit a team operates against to refuse the trap. Read each trap with its paired
            Reality.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
