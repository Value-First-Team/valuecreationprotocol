/**
 * /lexicon — Value-First Lexicon v0.1 (Layer A). React port of
 * src/pages/lexicon.astro. Body: staged canon markdown; meta from Sanity.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { SpecArchetype } from '@/components/SpecArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Value-First Lexicon',
  description:
    'The structured vocabulary of VCP — Layer A of the encoding stack. Each entry encodes a load-bearing term with its industrial counterpart, operational definition, and contrastive pair.',
  openGraph: { url: SITE.url + '/lexicon', images: ['/og/og-lexicon.jpg'] },
  alternates: { canonical: SITE.url + '/lexicon' },
};

export default async function LexiconPage() {
  const { html: rawHtml } = renderStagedMarkdown(STAGED_FILES.lexicon);
  const bodyHtml = stripFirstH1(rawHtml);
  const meta = await getCanonDoc('lexicon-v0-1');
  const version = meta?.version ?? 'v0.1';

  return (
    <SpecArchetype
      layer="A"
      title="Value-First Lexicon"
      lead="The structured vocabulary of the Value-First methodology — load-bearing terms encoded so AI systems can recognize, declare, and execute against them. VCP-Lang and the Value Graph both depend on it."
      meta={[
        { label: 'Status', value: `${version} · DRAFT IN REVIEW`, emphasis: 'status' },
        { label: 'Verified', value: '12 May 2026' },
        { label: 'Layer', value: 'A of 3 · vocabulary' },
        { label: 'Depended on by', value: 'VCP-Lang (B), Value Graph (C)' },
        { label: 'Cite', value: 'valuecreationprotocol.com/lexicon' },
        { label: 'Maintained by', value: 'Value-First Team + Collective' },
      ]}
    >
      <div className="spec-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </SpecArchetype>
  );
}
