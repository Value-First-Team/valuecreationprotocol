/**
 * /care/reference — the CARE reference, whole, through @vf/site-kit's shared reader. See FrameworkReferenceRoute.
 */
import { FrameworkReferenceRoute, frameworkReferenceMetadata } from '@/components/FrameworkReferenceRoute';

export const metadata = frameworkReferenceMetadata('care');

export default function CareReferencePage() {
  return <FrameworkReferenceRoute framework="care" />;
}
