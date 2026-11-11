/**
 * /teach/reference — the TEACH Values canonical reference, whole.
 *
 * Until 2026-11-11 /teach rendered this reference in full below its stage. TEACH then joined the shared framework
 * page as its eighth family and /teach became a thin route (its words from @vf/brand's derived copy of canon), so
 * the reference moved here, unchanged: the same hero (eyebrow, the reference's own title, its spec strip) and the
 * same body, read from the same pinned snapshot (`lib/teach-reference.ts`). /teach links here from its spec strip.
 *
 * The version/effective labels are read OUT OF THE BODY, not from a second store. Sanity is the fallback only.
 */
// hand-roll-exempt: the raw tag below is the `canon-prose` body mount of the CanonArchetype vocabulary, as every canon
// page on this site renders its reference; the way back is @vf/site-kit's BackLink and nothing here is a control.
import type { Metadata } from 'next';
import { TEACH_VALUES_CLAIM, frameworkClaim } from '@vf/brand';
import { BackLink } from '@vf/site-kit/back-link';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { teachReference } from '@/lib/teach-reference';
import { getCanonDoc } from '@/lib/sanity/canon';

const PATH = '/teach/reference';

export function generateMetadata(): Metadata {
  const { title } = teachReference();
  return {
    title,
    // Canon's own Purpose paragraph, which speaks of "This document": here, it is this document.
    description: TEACH_VALUES_CLAIM.purpose,
    openGraph: { url: SITE.url + PATH, images: ['/og/og-teach.jpg'] },
    alternates: { canonical: SITE.url + PATH },
  };
}

export default async function TeachReferencePage() {
  const ref = teachReference();
  const meta = await getCanonDoc('teach-v1-0');
  const version = ref.version ? `v${ref.version}` : (meta?.version ?? 'v1.1');
  const effective = ref.effective ?? meta?.effectiveDate ?? '6 May 2026';

  return (
    <CanonArchetype
      eyebrow="TEACH"
      title={ref.title}
      path={PATH}
      specMeta={[
        { label: 'Status', value: `${version} · canonical` },
        { label: 'Effective', value: effective },
        { label: 'Verified', value: '20 September 2026' },
        { label: 'Cite', value: `valuecreationprotocol.com${PATH}` },
      ]}
    >
      <BackLink href="/teach" label={frameworkClaim('teach-values').eyebrow} followReferrer={false} />
      <section className="canon-prose" dangerouslySetInnerHTML={{ __html: ref.bodyHtml }} />
    </CanonArchetype>
  );
}
