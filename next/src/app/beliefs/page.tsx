/**
 * /beliefs — the canonical framework module, hosted. A THIN ROUTE.
 *
 * Nothing about the framework is authored here: the words come from the one
 * derived copy of canon in @vf/brand (gated against canon by main-brain-lint
 * MC1), the feel is the one Chris ruled on 2026-09-02, and the films and
 * articles are read once at build from HubSpot (lib/framework-media.ts): each
 * belief's episode and article Listings link to the belief they are about, the
 * overview film's Listing links to the framework record, and the ecosystem
 * search's `?about=` door serves those links. A film or article is added or
 * changed on its HubSpot record, then this site is rebuilt; nothing here names
 * one. The Five Core Beliefs' original is their HubSpot Documentation record
 * (67151370367): the canon file is a copy made from it, and @vf/brand is
 * generated from that copy. Change the record, then re-pin. Do not add a
 * section here.
 */
import type { Metadata } from 'next';
import { FrameworkRoute, frameworkMetadata } from '@/components/FrameworkRoute';

const FRAMEWORK = 'core-beliefs' as const;

export const metadata: Metadata = frameworkMetadata(FRAMEWORK);

export default function Page() {
  return <FrameworkRoute framework={FRAMEWORK} />;
}
