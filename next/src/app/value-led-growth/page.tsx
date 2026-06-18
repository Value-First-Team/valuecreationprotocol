/**
 * /value-led-growth — Value-Led Growth framework canon. React port of
 * src/pages/value-led-growth.astro. Source: Sanity valueLedGrowth singleton,
 * build-time. .vlg-* styling lives in vcp-archetypes.css.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { getValueLedGrowth } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Value-Led Growth',
  description:
    'The growth framework an AI-native organization adopts. Growth as the natural consequence of value created across mutual stakeholders. Paired operationally with the Value Path.',
  openGraph: { url: SITE.url + '/value-led-growth', images: ['/og/og-value-led-growth.jpg'] },
  alternates: { canonical: SITE.url + '/value-led-growth' },
};

export default async function ValueLedGrowthPage() {
  const vlg = await getValueLedGrowth();

  return (
    <CanonArchetype
      eyebrow="Value-Led Growth"
      title={vlg?.tagline ?? 'Growth as the consequence of value created.'}
      lead={
        vlg?.fullDefinition ??
        vlg?.oneLineDefinition ??
        'Value-Led Growth is the operating framework that replaces industrial-age growth motions. Growth happens because value flowed — through customers, through practitioners, through the firm itself — and the protocol made that flow legible. This page is the framework canon. The accompanying manifesto reads it aloud.'
      }
      path="/value-led-growth"
      specMeta={[
        { label: 'Status', value: 'v1.0 · canonical' },
        { label: 'Verified', value: '14 May 2026' },
        { label: 'Cite', value: 'valuecreationprotocol.com/value-led-growth' },
        { label: 'See also', value: '/manifestos/value-led-growth' },
      ]}
    >
      <div className="canon-callout">
        <p className="canon-callout-label">Two reads of the same idea</p>
        <p className="canon-callout-body">
          This page is the operating canon — declarative and addressable. For the long-form manifesto
          treatment, see <a href="/manifestos/value-led-growth">Value-Led Growth manifesto</a>.
        </p>
      </div>

      {(vlg?.theQuestion || vlg?.theAnswer) && (
        <section className="vlg-qa">
          {vlg.theQuestion && <p className="vlg-qa-question">{vlg.theQuestion}</p>}
          {vlg.theAnswer && <p className="vlg-qa-answer">{vlg.theAnswer}</p>}
        </section>
      )}

      {vlg?.oneLineDefinition && (
        <section className="canon-prose">
          <p>{vlg.oneLineDefinition}</p>
          {vlg.fullDefinition && vlg.fullDefinition !== vlg.oneLineDefinition && <p>{vlg.fullDefinition}</p>}
        </section>
      )}

      {/* THE REFRAME */}
      {vlg?.reframePairs && vlg.reframePairs.length > 0 && (
        <>
          <p className="canon-section-label">The reframe</p>
          <h2 className="canon-section-sub">Traditional thinking → Value-Led thinking.</h2>
          {vlg.reframeIntro && <p className="canon-section-note">{vlg.reframeIntro}</p>}

          <ol className="vlg-reframe-list">
            {vlg.reframePairs.map((p, i) => (
              <li className="vlg-reframe-row" key={p._key ?? i}>
                <span className="vlg-reframe-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="vlg-reframe-cols">
                  <div className="vlg-reframe-col">
                    <p className="vlg-reframe-col-label">Traditional</p>
                    <p className="vlg-reframe-col-body">{p.traditional}</p>
                  </div>
                  <div className="vlg-reframe-arrow" aria-hidden="true">
                    →
                  </div>
                  <div className="vlg-reframe-col vlg-reframe-col-valueled">
                    <p className="vlg-reframe-col-label">Value-Led</p>
                    <p className="vlg-reframe-col-body">{p.valueLed}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {/* 4-COMPONENT OPERATING SYSTEM */}
      {(vlg?.componentWhere || vlg?.componentWho || vlg?.componentWhat || vlg?.componentHow) && (
        <>
          <p className="canon-section-label">The operating system</p>
          <h2 className="canon-section-sub">Where · Who · What · How.</h2>
          {vlg.componentsIntro && <p className="canon-section-note">{vlg.componentsIntro}</p>}

          <ol className="canon-records">
            {vlg.componentWhere && (
              <li className="canon-record" id="where">
                <p className="canon-record-eyebrow">{vlg.componentWhere.label ?? 'Where'}</p>
                <h3 className="canon-record-title">{vlg.componentWhere.componentName ?? 'The Value Path'}</h3>
                {vlg.componentWhere.description && <p className="canon-record-body">{vlg.componentWhere.description}</p>}
                {vlg.componentWhere.stages && vlg.componentWhere.stages.length > 0 && (
                  <ul className="canon-record-tags">
                    {vlg.componentWhere.stages.map((s) => (
                      <li key={s._id}>
                        <a href={`/value-path#${s.slug?.current ?? ''}`} className="canon-record-tag">
                          <span className="canon-record-tag-label">{String(s.number).padStart(2, '0')}</span>
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}

            {vlg.componentWho && (
              <li className="canon-record" id="who">
                <p className="canon-record-eyebrow">{vlg.componentWho.label ?? 'Who'}</p>
                <h3 className="canon-record-title">{vlg.componentWho.componentName ?? 'The Three-Org Model'}</h3>
                {vlg.componentWho.description && <p className="canon-record-body">{vlg.componentWho.description}</p>}
                {vlg.componentWho.orgs && vlg.componentWho.orgs.length > 0 && (
                  <ul className="canon-record-tags">
                    {vlg.componentWho.orgs.map((org) => (
                      <li key={org._id}>
                        <a href={`/three-orgs#${org.slug?.current ?? ''}`} className="canon-record-tag">
                          <span className="canon-record-tag-label">org</span>
                          {org.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}

            {vlg.componentWhat && (
              <li className="canon-record" id="what">
                <p className="canon-record-eyebrow">{vlg.componentWhat.label ?? 'What'}</p>
                <h3 className="canon-record-title">{vlg.componentWhat.componentName ?? 'The Four Unified Views'}</h3>
                {vlg.componentWhat.description && <p className="canon-record-body">{vlg.componentWhat.description}</p>}
                {vlg.componentWhat.views && vlg.componentWhat.views.length > 0 && (
                  <ul className="canon-record-tags">
                    {vlg.componentWhat.views.map((v) => (
                      <li key={v._id}>
                        <a href={`/unified-views#${v.slug?.current ?? ''}`} className="canon-record-tag">
                          <span className="canon-record-tag-label">view</span>
                          {v.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}

            {vlg.componentHow && (
              <li className="canon-record" id="how">
                <p className="canon-record-eyebrow">{vlg.componentHow.label ?? 'How'}</p>
                <h3 className="canon-record-title">{vlg.componentHow.componentName ?? 'The Value Steward'}</h3>
                {vlg.componentHow.description && <p className="canon-record-body">{vlg.componentHow.description}</p>}
                {(vlg.componentHow.aiHandles?.length || vlg.componentHow.humanHandles?.length) && (
                  <div className="canon-record-meta">
                    {vlg.componentHow.aiHandles && vlg.componentHow.aiHandles.length > 0 && (
                      <div>
                        <p className="canon-record-meta-label">AI handles</p>
                        <ul className="canon-record-meta-list">
                          {vlg.componentHow.aiHandles.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {vlg.componentHow.humanHandles && vlg.componentHow.humanHandles.length > 0 && (
                      <div>
                        <p className="canon-record-meta-label">Humans handle</p>
                        <ul className="canon-record-meta-list">
                          {vlg.componentHow.humanHandles.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                {vlg.componentHow.leverageStatement && (
                  <p className="canon-record-mantra">&ldquo;{vlg.componentHow.leverageStatement}&rdquo;</p>
                )}
              </li>
            )}
          </ol>
        </>
      )}

      {/* COMPARISONS */}
      {vlg?.comparisons && vlg.comparisons.length > 0 && (
        <>
          <p className="canon-section-label">In context</p>
          <h2 className="canon-section-sub">How Value-Led Growth relates to peer models.</h2>
          <p className="canon-section-note">
            Sales-Led, Product-Led, Marketing-Led, Community-Led — each names a real motion. Value-Led
            Growth doesn&apos;t compete with them; it reorganizes the firm so they all serve a common
            question: are we creating more value today than yesterday?
          </p>

          <ol className="canon-records">
            {vlg.comparisons.map((c) => {
              const slug = c.modelName.toLowerCase().replace(/\s+/g, '-');
              return (
                <li className="canon-record" id={slug} key={c._key ?? slug}>
                  <p className="canon-record-eyebrow">Comparison</p>
                  <h3 className="canon-record-title">{c.modelName}</h3>
                  {c.definition && <p className="canon-record-body">{c.definition}</p>}
                  <div className="canon-record-meta">
                    {c.limitation && (
                      <div>
                        <p className="canon-record-meta-label">Limitation</p>
                        <ul className="canon-record-meta-list">
                          <li>{c.limitation}</li>
                        </ul>
                      </div>
                    )}
                    {c.valueLedDifference && (
                      <div>
                        <p className="canon-record-meta-label">Value-Led difference</p>
                        <ul className="canon-record-meta-list">
                          <li>{c.valueLedDifference}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}

      {/* WHAT WE BELIEVE */}
      {vlg?.beliefStatements && vlg.beliefStatements.length > 0 && (
        <>
          <p className="canon-section-label">What we believe</p>
          <h2 className="canon-section-sub">The convictions Value-Led Growth carries.</h2>

          <ol className="canon-records">
            {vlg.beliefStatements.map((b, i) => (
              <li className="canon-record" key={b._key ?? i}>
                <p className="canon-record-eyebrow">Belief {String(i + 1).padStart(2, '0')}</p>
                <h3 className="canon-record-title">{b.headline}</h3>
                {b.elaboration && <p className="canon-record-body">{b.elaboration}</p>}
              </li>
            ))}
          </ol>
        </>
      )}

      {/* TRANSFORMATION PATH */}
      {(vlg?.honestAssessment ||
        (vlg?.transformationStages && vlg.transformationStages.length > 0) ||
        vlg?.timelineFraming) && (
        <>
          <p className="canon-section-label">The transformation path</p>
          <h2 className="canon-section-sub">Pilot → Collapse → Separation → Evolution.</h2>

          {vlg.honestAssessment && (
            <div className="canon-callout">
              <p className="canon-callout-label">An honest assessment</p>
              <p className="canon-callout-body">{vlg.honestAssessment}</p>
            </div>
          )}

          {vlg.transformationStages && vlg.transformationStages.length > 0 && (
            <ol className="canon-records">
              {vlg.transformationStages.map((s, i) => (
                <li className="canon-record" key={s._key ?? i}>
                  <p className="canon-record-eyebrow">Stage {String(i + 1).padStart(2, '0')}</p>
                  <h3 className="canon-record-title">{s.name}</h3>
                  {s.description && <p className="canon-record-body">{s.description}</p>}
                </li>
              ))}
            </ol>
          )}

          {vlg.timelineFraming && (
            <div className="canon-callout">
              <p className="canon-callout-label">Timeline framing</p>
              <p className="canon-callout-body">{vlg.timelineFraming}</p>
            </div>
          )}
        </>
      )}

      {/* THE INVITATION */}
      {vlg?.theInvitation && (
        <>
          <p className="canon-section-label">The invitation</p>
          <h2 className="canon-section-sub">The question the framework asks of its reader.</h2>
          <section className="canon-prose">
            <p>{vlg.theInvitation}</p>
          </section>
        </>
      )}

      <div className="canon-callout">
        <p className="canon-callout-label">Where this fits</p>
        <p className="canon-callout-body">
          Read alongside the <a href="/value-path">Value Path</a>: the Path is the relational map;
          Value-Led Growth is what compounds across it. The <a href="/three-orgs">Three-Org Model</a>{' '}
          is the structure the philosophy produces. The <a href="/value-loop">Value Loop</a> is the
          cadence.
        </p>
      </div>
    </CanonArchetype>
  );
}
