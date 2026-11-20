/**
 * FrameworkSheetRoute — a family's printable sheet, on this property's canon frame (2026-11-20).
 *
 * The sheet is @vf/brand's `FrameworkSheet` (0.220.0), built from the same page record the framework page reads:
 * for CARE, the intention line and the four anchors as a peer square of open space; for Value Accounting, the
 * blank first-entry view. This property adds only its frame (the family's name as the heading, the way back to
 * the framework page) and `PrintOnPaper`, so only the sheet prints, on the light pole. Not one framework word is
 * written here. The page is kept out of the sitemap and /llms.txt (`robots: { index: false }` on each route):
 * it is a thing to print from the framework page, not a page to find on its own.
 *
 * A family with no sheet in its record has no route: building one is an error, never an empty page.
 */
import { FrameworkSheet, frameworkClaim, frameworkPage, type FrameworkKey } from '@vf/brand';
import { BackLink } from '@vf/site-kit/back-link';
import { FRAMEWORK_PATHS } from '@vf/site-kit/framework';
import { CanonArchetype } from '@/components/CanonArchetype';
import { PrintOnPaper } from '@/components/PrintOnPaper';

export function FrameworkSheetRoute({ framework }: { framework: FrameworkKey }) {
  if (!frameworkPage(framework)?.sheet) {
    throw new Error(`@vf/brand carries no sheet for "${framework}"; this route has nothing to print.`);
  }
  const claim = frameworkClaim(framework);
  const path = FRAMEWORK_PATHS[framework];
  return (
    <CanonArchetype eyebrow={claim.eyebrow} title={claim.eyebrow} path={`${path}/sheet`}>
      <BackLink href={path} label={claim.eyebrow} followReferrer={false} />
      <PrintOnPaper>
        <FrameworkSheet framework={framework} />
      </PrintOnPaper>
    </CanonArchetype>
  );
}
