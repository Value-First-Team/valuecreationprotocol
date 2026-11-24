/**
 * /value-loop/reference — the Value Loop reference, whole, through @vf/site-kit's shared reader. See
 * FrameworkReferenceRoute. It keeps the Value Loop's own share card, which it carried before the move.
 */
import { FrameworkReferenceRoute, frameworkReferenceMetadata } from '@/components/FrameworkReferenceRoute';

export const metadata = frameworkReferenceMetadata('value-loop', { ogImage: '/og/og-value-loop.jpg' });

export default function ValueLoopReferencePage() {
  return <FrameworkReferenceRoute framework="value-loop" />;
}
