/**
 * FrameworkSheetRoute — a family's printable sheet, on this property's canon frame (2026-11-20).
 *
 * The sheet is @vf/brand's `FrameworkSheet`, built from the same page record the framework page reads: for CARE,
 * the intention line and the four anchors as a peer square of open space; for Value Accounting, the blank
 * first-entry view. Since @vf/brand 0.222.0 it carries its own title and source line, which names this property's
 * address (`origin`). It prints through @vf/site-kit's `PrintableSheet` (0.257.0): only the sheet prints, on the
 * light pole, with a print control that does not itself print. That replaced this site's own PrintOnPaper, which
 * did the same two things locally (Motif's phase 4 handoff). This property adds only its frame: the family's name as
 * the heading and the way back to the framework page. Not one framework word is written here. The page is kept out
 * of the sitemap and /llms.txt (`robots: { index: false }` on each route).
 *
 * A family with no sheet in its record has no route: building one is an error, never an empty page.
 */
import { FrameworkSheet, frameworkClaim, frameworkPage, type FrameworkKey } from '@vf/brand';
import { BackLink } from '@vf/site-kit/back-link';
import { FRAMEWORK_PATHS, PrintableSheet } from '@vf/site-kit/framework';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';

export function FrameworkSheetRoute({ framework }: { framework: FrameworkKey }) {
  if (!frameworkPage(framework)?.sheet) {
    throw new Error(`@vf/brand carries no sheet for "${framework}"; this route has nothing to print.`);
  }
  const claim = frameworkClaim(framework);
  const path = FRAMEWORK_PATHS[framework];
  return (
    <CanonArchetype eyebrow={claim.eyebrow} title={claim.eyebrow} path={`${path}/sheet`}>
      <BackLink href={path} label={claim.eyebrow} followReferrer={false} />
      <PrintableSheet>
        <FrameworkSheet framework={framework} origin={SITE.url} />
      </PrintableSheet>
    </CanonArchetype>
  );
}
