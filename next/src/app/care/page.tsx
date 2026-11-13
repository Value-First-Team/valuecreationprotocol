/**
 * /care — the canonical framework module, hosted. A THIN ROUTE.
 *
 * Nothing about the framework is authored here: the words come from the one derived copy of canon in @vf/brand (gated
 * against canon by main-brain-lint CN1), and the media join is read once at build by FrameworkRoute. CARE is family
 * twelve (build 8; Chris, 2026-11-13, log a63c8da03; @vf/brand 0.182.0): its four anchors are peers, so the module
 * stands them as a square, never as rows. It has no reference page: canon's reference carries Chris's open questions
 * and the CARE Record's object ids, and the module carries every word a reader needs.
 */
import type { Metadata } from 'next';
import { FrameworkRoute, frameworkMetadata } from '@/components/FrameworkRoute';

const FRAMEWORK = 'care' as const;

export const metadata: Metadata = frameworkMetadata(FRAMEWORK);

export default function Page() {
  return <FrameworkRoute framework={FRAMEWORK} />;
}
