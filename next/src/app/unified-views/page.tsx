/**
 * /unified-views — Four Unified Views (UCV, URV, UBC, UTE). React port of
 * src/pages/unified-views.astro. Source: Sanity `unifiedGoal` records, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getUnifiedGoals } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Four Unified Views',
  description:
    'UCV, URV, UBC, UTE. The visibility framework — four unified views that an AI-native organization must operate against to refuse the fragmented context of industrial-age dashboards.',
  openGraph: { url: SITE.url + '/unified-views', images: ['/og/og-unified-views.jpg'] },
  alternates: { canonical: SITE.url + '/unified-views' },
};

const ORDER = ['UCV', 'URV', 'UBC', 'UTE'];

function codeFor(name?: string): string {
  if (!name) return '';
  if (/Customer/i.test(name)) return 'UCV';
  if (/Revenue/i.test(name)) return 'URV';
  if (/Business Context/i.test(name)) return 'UBC';
  if (/Team Enablement/i.test(name)) return 'UTE';
  return name.match(/\b([A-Z]{3})\b/)?.[1] ?? '';
}

const ORG_LABEL: Record<string, string> = {
  'customer-org': 'Customer Org (Sage)',
  'finance-org': 'Finance Org (Pax)',
  'operations-org': 'Operations Org (V)',
};

export default async function UnifiedViewsPage() {
  const goals = await getUnifiedGoals();
  const ordered = [...goals].sort((a, b) => {
    const ai = ORDER.indexOf(codeFor(a.name));
    const bi = ORDER.indexOf(codeFor(b.name));
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  const definedTermsLd = {
    '@context': 'https://schema.org',
    '@graph': ordered.map((g) => ({
      '@type': 'DefinedTerm',
      name: g.name,
      description: g.tagline ?? g.description,
      termCode: codeFor(g.name).toLowerCase(),
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
        eyebrow="Four Unified Views"
        title="Four views that refuse fragmented context."
        lead="UCV, URV, UBC, UTE — Unified Customer View, Unified Revenue View, Unified Business Context, Unified Team Enablement. Each view is a single, addressable surface that an AI-native organization operates against. Together they replace the dashboard sprawl of industrial-age operations with the visibility the Three-Org Model requires."
        path="/unified-views"
        specMeta={[
          { label: 'Status', value: 'canonical' },
          { label: 'Verified', value: '14 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/unified-views' },
          { label: 'Views', value: `${ordered.length} — UCV · URV · UBC · UTE` },
        ]}
      >
        <section className="canon-prose">
          <p>
            Visibility decides what an organization can act on. The four Unified Views are the
            surfaces against which the Three-Org Model operates: each view is complete, integrated,
            and addressable from one place — not assembled in a person&apos;s head from seven
            dashboards.
          </p>
          <p>
            Three-Org mapping is direct: UCV is owned by the Customer Org. URV is owned by the
            Finance Org. UBC and UTE are owned by the Operations Org. A view that crosses an org
            boundary is not a unified view — it is a coordination cost.
          </p>
        </section>

        {ordered.length > 0 && (
          <>
            <p className="canon-section-label">The four, in canonical order</p>
            <h2 className="canon-section-sub">Each view, named and owned.</h2>
            <p className="canon-section-note">
              Sourced from Sanity. Read top to bottom as a complete visibility model.
            </p>

            <ol className="canon-records">
              {ordered.map((g) => {
                const code = codeFor(g.name);
                const slug = code.toLowerCase() || g.name?.toLowerCase().replace(/\s+/g, '-') || 'view';
                const orgLabel = g.primaryOrg ? ORG_LABEL[g.primaryOrg] ?? g.primaryOrg : undefined;
                return (
                  <li className="canon-record" id={slug} key={g._id}>
                    <p className="canon-record-eyebrow">{code || 'View'}</p>
                    <h3 className="canon-record-title">{g.name}</h3>
                    {g.tagline && <p className="canon-record-mantra">&ldquo;{g.tagline}&rdquo;</p>}
                    {g.description && <p className="canon-record-body">{g.description}</p>}
                    <div className="canon-record-meta">
                      {orgLabel && (
                        <div>
                          <p className="canon-record-meta-label">Primary org</p>
                          <ul className="canon-record-meta-list">
                            <li>{orgLabel}</li>
                          </ul>
                        </div>
                      )}
                      {g.howItTransforms && (
                        <div>
                          <p className="canon-record-meta-label">How it transforms operations</p>
                          <ul className="canon-record-meta-list">
                            <li>{g.howItTransforms}</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    {g.keyQuestions && g.keyQuestions.length > 0 && (
                      <div className="canon-record-meta" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <p className="canon-record-meta-label">Key questions this view answers</p>
                          <ul className="canon-record-meta-list">
                            {g.keyQuestions.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {g.relatedTraps && g.relatedTraps.length > 0 && (
                      <ul className="canon-record-tags">
                        {g.relatedTraps.map((t) => (
                          <li key={t._id}>
                            <a href={`/twelve-traps#${t.slug?.current ?? ''}`} className="canon-record-tag">
                              <span className="canon-record-tag-label">counters</span>
                              {t.name}
                            </a>
                          </li>
                        ))}
                      </ul>
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
            Unified views are operated by the <a href="/three-orgs">Three-Org Model</a>. Each view
            counters a set of <a href="/twelve-traps">Complexity Traps</a> — the per-view trap mapping
            above is canonical, not illustrative. The <a href="/realities">Value Realities</a> name the
            operating commitments each view depends on.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
