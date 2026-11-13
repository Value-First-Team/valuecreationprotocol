/**
 * /value-accounting — the canonical framework module, hosted. A THIN ROUTE.
 *
 * Nothing about the framework is authored here: the words come from the one derived copy of canon in @vf/brand (gated
 * against canon by main-brain-lint CN1), and the media join is read once at build by FrameworkRoute. Value Accounting
 * is family eleven (build 7; Chris, 2026-11-13, log a63c8da03; @vf/brand 0.181.0). It has no reference page: its
 * canonical reference carries the data model's ids and the governance book's rules, and the module carries every word
 * a reader needs.
 */
import type { Metadata } from 'next';
import { FrameworkRoute, frameworkMetadata } from '@/components/FrameworkRoute';

const FRAMEWORK = 'value-accounting' as const;

export const metadata: Metadata = frameworkMetadata(FRAMEWORK);

export default function Page() {
  return <FrameworkRoute framework={FRAMEWORK} />;
}
