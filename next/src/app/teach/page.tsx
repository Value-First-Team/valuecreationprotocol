/**
 * /teach — the TEACH framework. React port of src/pages/teach.astro.
 * Body source: staged canon markdown (refreshed from L2 canon; see
 * scripts/canon-drift-gate.mjs). The version/effective labels are read OUT OF THE
 * BODY, not from a second store — a label sourced elsewhere silently goes on
 * describing a document it no longer matches. Sanity is the fallback only.
 */
// hand-roll-exempt: the two raw tags below are the `canon-prose` body mount and the
// `canon-callout` block of the CanonArchetype vocabulary — this site's shared canon-page
// anatomy, emitted identically by every canonical route and styled in one place
// (vcp-archetypes.css). This change edited copy and added a metadata reader; it
// introduced no markup and no interactive element.
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'TEACH',
  description:
    'Five interdependent value pairs, both halves held at once: Transparent ↔ Trust, Empathetic ↔ Empowered, Agile ↔ Adaptable, Confidence ↔ Conviction, Humble ↔ Hungry. TEACH is the operating posture of anyone — human or AI — working inside the protocol.',
  openGraph: { url: SITE.url + '/teach', images: ['/og/og-teach.jpg'] },
  alternates: { canonical: SITE.url + '/teach' },
};

/** Read a "**Label:** value" line out of the canon markdown body itself. */
function fromBody(raw: string, label: string): string | undefined {
  const m = raw.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+?)\\s*$`, 'm'));
  return m?.[1] || undefined;
}

export default async function TeachPage() {
  const { html, raw } = renderStagedMarkdown(STAGED_FILES.teach);
  const bodyHtml = stripFirstH1(html);
  const meta = await getCanonDoc('teach-v1-0');
  const bodyVersion = fromBody(raw, 'Version');
  const version = bodyVersion ? `v${bodyVersion}` : (meta?.version ?? 'v1.1');
  const effective = fromBody(raw, 'Effective Date') ?? meta?.effectiveDate ?? '6 May 2026';

  return (
    <CanonArchetype
      eyebrow="TEACH"
      title="Five value pairs for how Value-First work is held."
      lead="TEACH is five value pairs, and every one of them is a pair — both halves held at the same time, never one without the other. It is operating posture: how anyone, human or AI, shows up while the work is being done, rather than what the work is. TEACH is upstream of the practitioner taxonomy."
      path="/teach"
      specMeta={[
        { label: 'Status', value: `${version} · canonical` },
        { label: 'Effective', value: effective },
        { label: 'Verified', value: '20 September 2026' },
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
