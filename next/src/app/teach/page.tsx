/**
 * /teach — the canonical framework module, hosted. A THIN ROUTE.
 *
 * Nothing about the framework is authored here: the words come from the one
 * derived copy of canon in @vf/brand (gated against canon by main-brain-lint
 * CN1), the opening is the TEACH arches in @vf/site-kit, and the films are read
 * once at build from HubSpot (lib/framework-media.ts): each film's Listing links
 * to the pair it is about, or to the framework record for the family film, and
 * the ecosystem search's `?about=` door serves those links. A film is added,
 * moved or re-cut on its HubSpot record, then this site is rebuilt; nothing here
 * names a film. The full canonical reference is at /teach/reference. The TEACH
 * Values' original is their HubSpot Documentation record (67216520275): the canon
 * file is a copy made from it, and @vf/brand is generated from that copy. Change
 * the record, then re-pin.
 */
import type { Metadata } from 'next';
import { FrameworkRoute, frameworkMetadata } from '@/components/FrameworkRoute';

const FRAMEWORK = 'teach-values' as const;

export const metadata: Metadata = frameworkMetadata(FRAMEWORK);

export default function Page() {
  return <FrameworkRoute framework={FRAMEWORK} />;
}
