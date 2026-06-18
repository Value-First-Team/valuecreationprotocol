/**
 * /teach — TEACH framework v1.0. React port of src/pages/teach.astro.
 * Body source: staged canon markdown; meta from Sanity getCanonDoc, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'TEACH',
  description:
    'The five values for teaching, leading, and operating an AI-native organization. Agile↔Adaptable. Confidence↔Conviction. The TEACH framework decides how value-first work is taught and held.',
  openGraph: { url: SITE.url + '/teach', images: ['/og/og-teach.jpg'] },
  alternates: { canonical: SITE.url + '/teach' },
};

export default async function TeachPage() {
  const { html } = renderStagedMarkdown(STAGED_FILES.teach);
  const bodyHtml = stripFirstH1(html);
  const meta = await getCanonDoc('teach-v1-0');
  const version = meta?.version ?? 'v1.0';
  const effective = meta?.effectiveDate ?? '6 May 2026';

  return (
    <CanonArchetype
      eyebrow="TEACH"
      title="Five values for how value-first work is taught."
      lead="TEACH names the five values that decide how Value-First work is taught, led, and operated. Two of them are intentional pairings — Agile and Adaptable, Confidence and Conviction — because each pair holds a tension that an AI-native operating model has to keep alive. TEACH is upstream of the practitioner taxonomy."
      path="/teach"
      specMeta={[
        { label: 'Status', value: `${version} · canonical` },
        { label: 'Effective', value: effective },
        { label: 'Verified', value: '12 May 2026' },
        { label: 'Cite', value: 'valuecreationprotocol.com/teach' },
      ]}
    >
      <section className="canon-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      <div className="canon-callout">
        <p className="canon-callout-label">Where this fits</p>
        <p className="canon-callout-body">
          TEACH is the operating discipline by which the protocol is taught. It is the upstream of the{' '}
          <a href="/value-path">Value Path</a> — how practitioners hold a person at each stage — and
          the operating contract for any team that adopts VCP through the{' '}
          <a href="/ai-native-shift">AI-Native Shift</a>.
        </p>
      </div>
    </CanonArchetype>
  );
}
