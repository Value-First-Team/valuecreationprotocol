/**
 * FrameworkReferenceRoute — a framework's full reference, whole, on this property's canon frame (2026-11-20).
 *
 * The body is @vf/site-kit's shared reader, `FrameworkReferenceBody` (0.256.0): what @vf/brand 0.220.0 generated
 * from canon, with HELD and HELD-LINES ranges, ABOUT-US sections, PAGE-ONLY blocks and EVERY HTML comment left
 * out, and the way back to the framework page. It is never this site's own markdown path (`renderWikiCanonical`,
 * `marked`), which passes HTML comments through, so held text and every comment would reach the page and its
 * source (Lathe's requirement, the hard line in Motif's handoff). What this property adds is only its frame:
 * the canon hero (the family's eyebrow, the document's own title) and the citation rows the kit composes
 * (version and effective date, and the address to cite). No "Status" and no "Verified" row.
 *
 * Today: /care/reference and /value-accounting/reference. TEACH and the Value Loop keep their own readers until
 * they move onto this one (the next move, not this deploy).
 */
import type { Metadata } from 'next';
import { frameworkClaim, type FrameworkKey } from '@vf/brand';
import { FrameworkReferenceBody, frameworkReference, frameworkReferenceSpec } from '@vf/site-kit/framework';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';

function referenceOf(framework: FrameworkKey) {
  const ref = frameworkReference(framework);
  // A route exists only for a family the package carries a reference for; anything else is a build error, never
  // an empty page.
  if (!ref) throw new Error(`@vf/brand carries no reference for "${framework}"; this route has nothing to render.`);
  return ref;
}

export function frameworkReferenceMetadata(framework: FrameworkKey): Metadata {
  const ref = referenceOf(framework);
  const description = frameworkClaim(framework).lines[0];
  return {
    title: ref.title,
    ...(description ? { description } : {}),
    openGraph: { url: SITE.url + ref.path, images: ['/og/og-default.jpg'] },
    alternates: { canonical: SITE.url + ref.path },
  };
}

export function FrameworkReferenceRoute({ framework }: { framework: FrameworkKey }) {
  const ref = referenceOf(framework);
  return (
    <CanonArchetype
      eyebrow={frameworkClaim(framework).eyebrow}
      title={ref.title}
      path={ref.path}
      specMeta={frameworkReferenceSpec(framework, SITE.url)}
    >
      <FrameworkReferenceBody framework={framework} />
    </CanonArchetype>
  );
}
