/**
 * /value-loop — Value Loop canonical reference v1. React port of
 * src/pages/value-loop.astro. Body source: wiki-canonical markdown, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { renderWikiCanonical, stripFirstH1, WIKI_CANONICAL } from '@/lib/markdown';

export const metadata: Metadata = {
  title: 'Value Loop',
  description:
    'Discover, Codify, Deliver, Learn. The continuous loop that replaces sequential delivery and phased rollouts. The unit of organizational learning in AI-native operations.',
  openGraph: { url: SITE.url + '/value-loop', images: ['/og/og-value-loop.jpg'] },
  alternates: { canonical: SITE.url + '/value-loop' },
};

const definedTermsLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { name: 'Discover', description: 'The Value Loop step in which the team finds what an actor newly needs or values.', termCode: 'discover' },
    { name: 'Codify', description: 'The Value Loop step in which discovered value is encoded into operable form.', termCode: 'codify' },
    { name: 'Deliver', description: 'The Value Loop step in which codified value is operated.', termCode: 'deliver' },
    { name: 'Learn', description: 'The Value Loop step in which delivery feeds back into discovery.', termCode: 'learn' },
  ].map((t) => ({
    '@type': 'DefinedTerm',
    ...t,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Value Creation Protocol Glossary', url: `${SITE.url}/glossary` },
  })),
};

export default function ValueLoopPage() {
  const { html } = renderWikiCanonical(WIKI_CANONICAL.valueLoop);
  const bodyHtml = stripFirstH1(html);

  return (
    <>
      <JsonLd data={definedTermsLd} />
      <CanonArchetype
        eyebrow="The Value Loop"
        title="Discover. Codify. Deliver. Learn."
        lead="The Value Loop is the unit of organizational learning in AI-native operations. Each pass strengthens the next: a team that has run the loop once knows more about how it creates value than a team that has run a calendar of sequential phases. The Value Loop replaces the project plan as the operating cadence."
        path="/value-loop"
        specMeta={[
          { label: 'Status', value: 'v1.0 · canonical' },
          { label: 'Verified', value: '12 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/value-loop' },
          { label: 'Steps', value: '4 — continuous' },
        ]}
      >
        <section className="canon-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

        <div className="canon-callout">
          <p className="canon-callout-label">Where this fits</p>
          <p className="canon-callout-body">
            The Value Loop operates inside every <a href="/three-orgs">org</a> and across every{' '}
            <a href="/unified-views">unified view</a>. It is the rhythm against which{' '}
            <a href="/value-led-growth">Value-Led Growth</a> compounds.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
