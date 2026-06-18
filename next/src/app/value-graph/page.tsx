/**
 * /value-graph — Value Graph v0.1 (Layer C). React port of
 * src/pages/value-graph.astro. Body: staged canon markdown; meta from Sanity.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { SpecArchetype } from '@/components/SpecArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Value Graph',
  description:
    'A platform-agnostic relational structure for representing mutual value creation across all stakeholders. Layer C of the VCP encoding stack.',
  openGraph: { url: SITE.url + '/value-graph', images: ['/og/og-value-graph.jpg'] },
  alternates: { canonical: SITE.url + '/value-graph' },
};

export default async function ValueGraphPage() {
  const { html: rawHtml } = renderStagedMarkdown(STAGED_FILES.valueGraph);
  const bodyHtml = stripFirstH1(rawHtml);
  const meta = await getCanonDoc('value-graph-v0-1');
  const version = meta?.version ?? 'v0.1';

  return (
    <SpecArchetype
      layer="C"
      title="Value Graph"
      lead="The relational structure VCP-Lang compiles into. Participants, Relationships, Value Flows, Contexts, and Investments — composed into a graph that AI systems can traverse without regressing to industrial-age defaults."
      meta={[
        { label: 'Status', value: `${version} · DRAFT IN REVIEW`, emphasis: 'status' },
        { label: 'Verified', value: '12 May 2026' },
        { label: 'Layer', value: 'C of 3 · relational structure' },
        { label: 'Depends on', value: 'Lexicon (A), VCP-Lang (B)' },
        { label: 'Reference impl', value: 'HubSpot CVP · others to follow' },
        { label: 'Cite', value: 'valuecreationprotocol.com/value-graph' },
      ]}
    >
      <div className="spec-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </SpecArchetype>
  );
}
