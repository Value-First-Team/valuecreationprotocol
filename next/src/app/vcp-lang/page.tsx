/**
 * /vcp-lang — VCP-Lang v0.1 (Layer B). React port of src/pages/vcp-lang.astro.
 * Body: staged canon markdown; meta from Sanity.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { SpecArchetype } from '@/components/SpecArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'VCP-Lang',
  description:
    'A declarative grammar for stating values, context, and trust in parseable form. Layer B of the VCP encoding stack — descended from the HCP-Lang exploratory work.',
  openGraph: { url: SITE.url + '/vcp-lang', images: ['/og/og-vcp-lang.jpg'] },
  alternates: { canonical: SITE.url + '/vcp-lang' },
};

export default async function VcpLangPage() {
  const { html: rawHtml } = renderStagedMarkdown(STAGED_FILES.vcpLang);
  const bodyHtml = stripFirstH1(rawHtml);
  const meta = await getCanonDoc('vcp-lang-v0-1');
  const version = meta?.version ?? 'v0.1';

  return (
    <SpecArchetype
      layer="B"
      title="VCP-Lang"
      lead="A declarative grammar for value. Organizations state what they are creating, for whom, and under what trust conditions; AI systems read those declarations as authoritative and act inside them."
      meta={[
        { label: 'Status', value: `${version} · DRAFT IN REVIEW`, emphasis: 'status' },
        { label: 'Verified', value: '12 May 2026' },
        { label: 'Layer', value: 'B of 3 · grammar' },
        { label: 'Depends on', value: 'Lexicon (A)' },
        { label: 'Compiles to', value: 'Value Graph (C)' },
        { label: 'Cite', value: 'valuecreationprotocol.com/vcp-lang' },
      ]}
    >
      <div className="spec-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </SpecArchetype>
  );
}
