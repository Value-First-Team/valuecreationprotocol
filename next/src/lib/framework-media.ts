/**
 * framework-media — ONE Sanity read for the five framework modules, resolved by
 * the shared resolver. Nothing about the frameworks is authored here.
 *
 * The module (`FrameworkModule` in @vf/brand) renders the framework's words from
 * the one derived copy of canon; what this property adds is the JOIN — which
 * films, decks, episodes, shows, articles and rooms actually exist — read at
 * build time from the shared dataset through the same `sanityQuery` every other
 * canon page uses, with the GROQ the package exports (so no site types its own).
 * A failed read resolves to an honest empty join: every media region degrades
 * and the framework still renders whole.
 */
import {
  FRAMEWORK_MEDIA_GROQ,
  resolveFrameworkMedia,
  type FrameworkKey,
  type FrameworkMedia,
  type FrameworkMediaRows,
} from '@vf/brand';
import { sanityQuery } from './sanity/client';
// THE TEACH FILMS (2026-11-11): Reel's film map, copied here byte for byte from
// MainBrain L4-orchestration/output/2026-11-11-vcp-teach-elevated/teach-film-map.json and passed
// to the resolver unchanged, as @vf/brand 0.173.2 asks. No record links a film to a pair yet, so
// the map is the join until Lattice rules a per-pair film reference; a new or re-cut film is a new
// copy of the map, never a code change. The resolver reads it for TEACH and ignores it otherwise.
import teachFilms from '@/data/teach-film-map.json';

let rowsPromise: Promise<FrameworkMediaRows | null> | null = null;

/** The rows, fetched once per build and shared by every framework route. */
function rows(): Promise<FrameworkMediaRows | null> {
  rowsPromise ??= sanityQuery<FrameworkMediaRows>(FRAMEWORK_MEDIA_GROQ);
  return rowsPromise;
}

export async function frameworkMedia(framework: FrameworkKey): Promise<FrameworkMedia> {
  return resolveFrameworkMedia(framework, await rows(), { teachFilms });
}
