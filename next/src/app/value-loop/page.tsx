/**
 * /value-loop — the canonical framework module, hosted. A THIN ROUTE.
 *
 * Nothing about the framework is authored here: the words come from the one derived copy of canon in @vf/brand (gated
 * against canon by main-brain-lint CN1), and the media join is read once at build by FrameworkRoute. The Value Loop is
 * family nine (builds 5 and 6; Chris, 2026-11-13, log a63c8da03; @vf/brand 0.180.0). The full canonical reference this
 * page used to render is at /value-loop/reference. Edit the framework in .products/vf-brand/src/ and re-pin.
 */
import type { Metadata } from 'next';
import { FrameworkRoute, frameworkMetadata } from '@/components/FrameworkRoute';

const FRAMEWORK = 'value-loop' as const;

export const metadata: Metadata = frameworkMetadata(FRAMEWORK);

export default function Page() {
  return <FrameworkRoute framework={FRAMEWORK} />;
}
