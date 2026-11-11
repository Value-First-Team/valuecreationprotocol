/**
 * /teach — the canonical framework module, hosted. A THIN ROUTE.
 *
 * Nothing about the framework is authored here: the words come from the one
 * derived copy of canon in @vf/brand (gated against canon by main-brain-lint
 * CN1), the opening is the TEACH arches in @vf/site-kit, and the media join is
 * read once at build by FrameworkRoute. The full canonical reference is at
 * /teach/reference. Edit the framework in .products/vf-brand/src/ and re-pin.
 */
import type { Metadata } from 'next';
import { FrameworkRoute, frameworkMetadata } from '@/components/FrameworkRoute';

const FRAMEWORK = 'teach-values' as const;

export const metadata: Metadata = frameworkMetadata(FRAMEWORK);

export default function Page() {
  return <FrameworkRoute framework={FRAMEWORK} />;
}
