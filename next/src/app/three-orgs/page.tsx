/**
 * /three-orgs — The Three-Org Model. React port of src/pages/three-orgs.astro.
 * Source: Sanity `threeOrg` records ordered by sortOrder, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getThreeOrgs } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Three-Org Model',
  description:
    'Customer, Operations, Finance. Every concern in an AI-native organization maps to one of three orgs — each with its own leader, its own canonical objects, and its own unified view.',
  openGraph: { url: SITE.url + '/three-orgs', images: ['/og/og-three-orgs.jpg'] },
  alternates: { canonical: SITE.url + '/three-orgs' },
};

const MODE_LABEL: Record<string, string> = {
  'human-led': 'Human-led (AI supports)',
  'ai-led': 'AI-led (humans direct + escalate)',
  shared: 'Shared (human + AI co-own)',
};

export default async function ThreeOrgsPage() {
  const orgs = await getThreeOrgs();

  const definedTermsLd = {
    '@context': 'https://schema.org',
    '@graph': orgs.map((o) => ({
      '@type': 'DefinedTerm',
      name: o.name,
      description: o.oneLineDefinition ?? o.purpose ?? undefined,
      termCode: o.slug?.current ?? `org-${o.sortOrder}`,
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
        eyebrow="The Three-Org Model"
        title="Three orgs. One firm. Every concern has a home."
        lead="Customer, Operations, Finance. Each org carries its own leader, its own canonical objects, and its own unified view. The Three-Org Model replaces the functional silo map of industrial-age operations with a structure built for AI-native value flow."
        path="/three-orgs"
        specMeta={[
          { label: 'Status', value: 'v1.1 · canonical' },
          { label: 'Verified', value: '14 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/three-orgs' },
          { label: 'Orgs', value: `${orgs.length} — Customer · Operations · Finance` },
        ]}
      >
        <figure className="canon-figure">
          <div className="canon-figure-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/diagrams/three-org.svg"
              alt="The Three-Org Model — Customer, Operations, Finance — with each org's leader and canonical objects."
              loading="lazy"
            />
          </div>
          <figcaption className="canon-figure-caption">
            Customer · Operations · Finance — three orgs, three unified views.
          </figcaption>
        </figure>

        <section className="canon-prose">
          <p>
            Industrial-age operations sliced firms by function: sales, marketing, customer success,
            support, finance, ops. Each slice optimized for its own metric and handed the customer
            across boundaries the customer never agreed to. The Three-Org Model refuses that
            geometry. Every concern in a value-creating firm maps to one of three orgs — and each org
            has one leader, one operating principle, and one unified view it produces.
          </p>
          <p>
            The split is not about people; it is about ownership. The Customer Org owns the value
            journey end to end — no handoffs between stages. The Operations Org owns coordination,
            integration, and the machinery that lets the Customer Org operate seamlessly. The Finance
            Org owns resource stewardship and value accounting, expanding finance beyond revenue
            capture to measure value delivered.
          </p>
        </section>

        {orgs.length > 0 && (
          <>
            <p className="canon-section-label">The three, in canonical order</p>
            <h2 className="canon-section-sub">Each org, named and owned.</h2>
            <p className="canon-section-note">
              Sourced from Sanity. Read top to bottom — Customer first, then Operations, then
              Finance. Each carries its own anchor.
            </p>

            <ol className="canon-records">
              {orgs.map((o) => {
                const slug = o.slug?.current ?? `org-${o.sortOrder}`;
                const modeLabel = o.leadershipMode
                  ? MODE_LABEL[o.leadershipMode] ?? o.leadershipMode
                  : undefined;
                return (
                  <li
                    className="canon-record"
                    id={slug}
                    key={o._id}
                    style={o.accentColor ? { borderTopColor: o.accentColor } : undefined}
                  >
                    <p className="canon-record-eyebrow">Org {String(o.sortOrder).padStart(2, '0')}</p>
                    <h3 className="canon-record-title">{o.name}</h3>
                    {o.oneLineDefinition && (
                      <p className="canon-record-mantra">&ldquo;{o.oneLineDefinition}&rdquo;</p>
                    )}
                    {o.purpose && <p className="canon-record-body">{o.purpose}</p>}

                    {(o.humanRole || o.aiLeaderName || modeLabel) && (
                      <div className="canon-record-meta">
                        {o.humanRole && (
                          <div>
                            <p className="canon-record-meta-label">Human leader</p>
                            <ul className="canon-record-meta-list">
                              <li>{o.humanRole}</li>
                            </ul>
                          </div>
                        )}
                        {o.aiLeaderName && (
                          <div>
                            <p className="canon-record-meta-label">AI leader (VFT)</p>
                            <ul className="canon-record-meta-list">
                              <li>{o.aiLeaderName}</li>
                            </ul>
                          </div>
                        )}
                        {modeLabel && (
                          <div>
                            <p className="canon-record-meta-label">Leadership mode</p>
                            <ul className="canon-record-meta-list">
                              <li>{modeLabel}</li>
                            </ul>
                          </div>
                        )}
                        {o.primaryUV?.name && (
                          <div>
                            <p className="canon-record-meta-label">Primary unified view</p>
                            <ul className="canon-record-meta-list">
                              <li>
                                <a href="/unified-views">{o.primaryUV.name}</a>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {o.keyPrinciple && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">Key principle</p>
                          <ul className="canon-record-meta-list">
                            <li>{o.keyPrinciple}</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {o.owns && o.owns.length > 0 && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">What this org owns</p>
                          <ul className="canon-record-meta-list">
                            {o.owns.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {o.doesNotOwn && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">What this org does not own</p>
                          <ul className="canon-record-meta-list">
                            <li>{o.doesNotOwn}</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {(o.aiHandles || o.humanHandles) && (
                      <div className="canon-record-meta">
                        {o.aiHandles && (
                          <div>
                            <p className="canon-record-meta-label">AI handles</p>
                            <ul className="canon-record-meta-list">
                              <li>{o.aiHandles}</li>
                            </ul>
                          </div>
                        )}
                        {o.humanHandles && (
                          <div>
                            <p className="canon-record-meta-label">Humans handle</p>
                            <ul className="canon-record-meta-list">
                              <li>{o.humanHandles}</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {o.whoBelongsHere && o.whoBelongsHere.length > 0 && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">Who belongs here</p>
                          <ul className="canon-record-meta-list">
                            {o.whoBelongsHere.map((role, i) => (
                              <li key={i}>{role}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {o.firmLivedExample && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">How we live it (VFT specifics)</p>
                          <ul className="canon-record-meta-list">
                            <li>{o.firmLivedExample}</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {(o.supportingUVs && o.supportingUVs.length > 0) || (o.traps && o.traps.length > 0) ? (
                      <ul className="canon-record-tags">
                        {o.supportingUVs?.map((v) => (
                          <li key={v._id}>
                            <a href="/unified-views" className="canon-record-tag">
                              <span className="canon-record-tag-label">also produces</span>
                              {v.name}
                            </a>
                          </li>
                        ))}
                        {o.traps?.map((t) => (
                          <li key={t._id}>
                            <a href={`/twelve-traps#${t.slug?.current ?? ''}`} className="canon-record-tag">
                              <span className="canon-record-tag-label">counters</span>
                              {t.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </>
        )}

        <div className="canon-callout">
          <p className="canon-callout-label">Where this fits</p>
          <p className="canon-callout-body">
            Each org carries one of the <a href="/unified-views">Four Unified Views</a>: UCV →
            Customer, URV → Finance, UBC and UTE → Operations. The <a href="/value-path">Value Path</a>{' '}
            is read across all three, with the Customer Org owning end-to-end stewardship.{' '}
            <a href="/value-led-growth">Value-Led Growth</a> is the operating philosophy this
            structure produces.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
