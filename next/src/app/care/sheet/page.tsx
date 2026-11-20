/**
 * /care/sheet — CARE's printable sheet. See FrameworkSheetRoute. Out of the sitemap and /llms.txt on purpose.
 */
import type { Metadata } from 'next';
import { frameworkClaim } from '@vf/brand';
import { FrameworkSheetRoute } from '@/components/FrameworkSheetRoute';

export const metadata: Metadata = {
  title: frameworkClaim('care').eyebrow,
  robots: { index: false },
};

export default function CareSheetPage() {
  return <FrameworkSheetRoute framework="care" />;
}
