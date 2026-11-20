/**
 * /value-accounting/reference — the Value Accounting reference, whole, through @vf/site-kit's shared reader. See
 * FrameworkReferenceRoute.
 */
import { FrameworkReferenceRoute, frameworkReferenceMetadata } from '@/components/FrameworkReferenceRoute';

export const metadata = frameworkReferenceMetadata('value-accounting');

export default function ValueAccountingReferencePage() {
  return <FrameworkReferenceRoute framework="value-accounting" />;
}
