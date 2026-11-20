/**
 * /value-accounting/sheet — Value Accounting's printable first-entry view. See FrameworkSheetRoute. Out of the
 * sitemap and /llms.txt on purpose.
 */
import type { Metadata } from 'next';
import { frameworkClaim } from '@vf/brand';
import { FrameworkSheetRoute } from '@/components/FrameworkSheetRoute';

export const metadata: Metadata = {
  title: frameworkClaim('value-accounting').eyebrow,
  robots: { index: false },
};

export default function ValueAccountingSheetPage() {
  return <FrameworkSheetRoute framework="value-accounting" />;
}
