/**
 * /realities — Value Realities. React port of src/pages/realities.astro.
 * Source: Sanity `valueReality` records ordered by number, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getValueRealities } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Value Realities',
  description:
    'The operational realities of value creation in AI-native systems. Each reality is paired with the Complexity Trap it counters and the commitments it implies.',
  openGraph: { url: SITE.url + '/realities', images: ['/og/og-realities.jpg'] },
  alternates: { canonical: SITE.url + '/realities' },
};

export default async function RealitiesPage() {
  const realities = await getValueRealities();
  const total = realities.length;

  const definedTermsLd = {
    '@context': 'https://schema.org',
    '@graph': realities.map((r) => ({
      '@type': 'DefinedTerm',
      name: r.name ?? `Reality ${r.number ?? ''}`.trim(),
      description: r.corePrinciple ?? r.headline,
      termCode: r.slug?.current ?? `reality-${r.number ?? ''}`,
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
        eyebrow="Value Realities"
        title="The realities a value-creating organization operates against."
        lead="Each reality names a condition that holds in AI-native value creation — and the operational commitments that condition demands. Realities are paired with the Complexity Traps they counter; reading them as pairs is the canonical way to consume them."
        path="/realities"
        specMeta={[
          { label: 'Status', value: 'canonical' },
          { label: 'Verified', value: '14 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/realities' },
          { label: 'Count', value: `${total} realities · ordered by number` },
        ]}
      >
        <section className="canon-prose">
          <p>
            Realities are statements about how value actually flows when an organization stops
            fighting the underlying physics. Each reality is paired with a Complexity Trap — the same
            condition, read inverted. The Trap is what happens when a team operates as if the Reality
            were optional. The Reality is what an AI-native operating model assumes by default.
          </p>
          <p>
            Below each reality is a set of commitments. Commitments are operational — they describe
            what the team actually does when it accepts the reality. They are not aspirations. A team
            that does not honor the commitments has not accepted the reality.
          </p>
        </section>

        {total > 0 && (
          <>
            <p className="canon-section-label">The realities, in canonical order</p>
            <h2 className="canon-section-sub">Each reality, each commitment, each trap it counters.</h2>
            <p className="canon-section-note">
              Sourced from Sanity. Ordered by canonical number. Each carries its own anchor, its core
              principle, the operating shift it demands, and the Trap it counters.
            </p>

            <ol className="canon-records">
              {realities.map((r) => {
                const name = r.name ?? `Reality ${r.number ?? ''}`.trim();
                const slug = r.slug?.current ?? `reality-${r.number ?? ''}`;
                return (
                  <li className="canon-record" id={slug} key={r._id}>
                    <p className="canon-record-eyebrow">
                      Reality {r.number != null ? String(r.number).padStart(2, '0') : '·'}
                    </p>
                    <h3 className="canon-record-title">
                      {r.icon ? <span style={{ marginRight: '0.4em' }}>{r.icon}</span> : null}
                      {name}
                    </h3>
                    {r.corePrinciple && <p className="canon-record-mantra">&ldquo;{r.corePrinciple}&rdquo;</p>}
                    {r.headline && (
                      <p className="canon-record-body" style={{ color: 'var(--vcp-ink-3)', fontStyle: 'italic' }}>
                        {r.headline}
                      </p>
                    )}
                    {(r.shiftFrom || r.shiftTo) && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        {r.shiftFrom && (
                          <div>
                            <p className="canon-record-meta-label">Shift from</p>
                            <ul className="canon-record-meta-list">
                              <li>{r.shiftFrom}</li>
                            </ul>
                          </div>
                        )}
                        {r.shiftTo && (
                          <div>
                            <p className="canon-record-meta-label">Shift to</p>
                            <ul className="canon-record-meta-list">
                              <li>{r.shiftTo}</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    {r.keyPractices && r.keyPractices.length > 0 && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">Key practices</p>
                          <ul className="canon-record-meta-list">
                            {r.keyPractices.map((p, i) => (
                              <li key={i}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {r.countersTrap && (
                      <ul className="canon-record-tags">
                        <li>
                          <a
                            href={`/twelve-traps#${r.countersTrap.slug?.current ?? ''}`}
                            className="canon-record-tag"
                          >
                            <span className="canon-record-tag-label">counters</span>
                            {r.countersTrap.name}
                          </a>
                        </li>
                      </ul>
                    )}
                    {r.commitments && r.commitments.length > 0 && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">Commitments</p>
                          <ol className="canon-record-meta-list" style={{ listStyle: 'none', paddingLeft: 0 }}>
                            {r.commitments.map((c) => (
                              <li key={c._key}>
                                <strong style={{ color: 'var(--vcp-ink)', fontWeight: 600 }}>
                                  {String(c.number).padStart(2, '0')} — {c.title}
                                </strong>
                                {c.actions && c.actions.length > 0 && (
                                  <ul style={{ listStyle: 'none', paddingLeft: '1rem', margin: '0.4em 0 0' }}>
                                    {c.actions.map((a, ai) => (
                                      <li
                                        key={ai}
                                        style={{ color: 'var(--vcp-ink-3)', fontSize: '0.9375rem', padding: '0.15em 0' }}
                                      >
                                        → {a}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </>
        )}

        <div className="canon-callout">
          <p className="canon-callout-label">Where this fits</p>
          <p className="canon-callout-body">
            Realities pair one-for-one with the <a href="/twelve-traps">Twelve Complexity Traps</a>.
            The trap names the failure mode; the reality names the operating assumption that prevents
            it. Read them as pairs. The <a href="/beliefs">Five Core Beliefs</a> are upstream of both.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
