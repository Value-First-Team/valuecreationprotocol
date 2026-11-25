/**
 * framework-media — what EXISTS for each framework module (films, decks,
 * episodes, shows, articles, rooms), read once per build and resolved by the
 * shared resolver in @vf/brand. Nothing about the frameworks is authored here.
 *
 * The module (`FrameworkModule` in @vf/brand) renders the framework's words from
 * the one derived copy of canon; what this property adds is the JOIN. It comes
 * from one of two sources, framework by framework, while the content
 * architecture move from Sanity to HubSpot is under way (2026-11-24, Lattice's
 * design; walked by Chris the same day):
 *
 *   FROM HUBSPOT (READ_FROM_HUBSPOT below). A framework whose parts are records
 *   in HubSpot, with each piece of content linked to the part it is about
 *   ("Value Subject"). Read through the ecosystem search's `?about=` door with
 *   @vf/site-kit's `aboutWork()`, so this static site holds no HubSpot key, and
 *   drawn by `resolveFrameworkMediaFromLinks` from the reader's answer
 *   unchanged. A read that failed, a blind read (its control link not found), a
 *   part the read did not answer, or a pick its record does not link FAILS THE
 *   BUILD: production keeps serving the last good deploy, rather than a page
 *   whose films are silently gone. TEACH moved first, and the hand-kept TEACH
 *   film map this file used to pass was deleted in the same change. The Five
 *   Core Beliefs followed (2026-11-25): each belief's episode, its articles and
 *   the overview film with its caption track, all from their HubSpot records.
 *
 *   FROM SANITY (every other framework, until its own pass). The shared
 *   dataset, through the same `sanityQuery` every other canon page uses, with
 *   the GROQ the package exports, drawn through @vf/brand's interim adapter
 *   exactly as before. A failed read still resolves to an honest empty join.
 *
 * A framework joins READ_FROM_HUBSPOT in the pass that puts its links in
 * HubSpot; the Sanity half leaves when the last one has moved. Until then the
 * one Sanity query (FRAMEWORK_MEDIA_GROQ) is still made once per build for the
 * frameworks still on it, and its answer is never used for one listed here.
 */
import {
  FRAMEWORK_MEDIA_GROQ,
  frameworkLinkAddresses,
  resolveFrameworkMedia,
  resolveFrameworkMediaFromLinks,
  type FrameworkKey,
  type FrameworkMedia,
  type FrameworkMediaRows,
} from '@vf/brand';
import { aboutWork, type AboutRead } from '@vf/site-kit/search/about-work';
import { sanityQuery } from './sanity/client';

/**
 * The frameworks this site draws from HubSpot. Each joins in its own pass: the TEACH Values
 * (2026-11-24), then the Five Core Beliefs (2026-11-25, @vf/brand 0.234.0), which moves
 * /beliefs, the Natural Value Flow card on /language-of-value and the beliefs film tile on
 * / and /methodology in one build. A framework listed here never asks Sanity.
 */
const READ_FROM_HUBSPOT: ReadonlySet<FrameworkKey> = new Set<FrameworkKey>(['teach-values', 'core-beliefs']);

let rowsPromise: Promise<FrameworkMediaRows | null> | null = null;

/** The Sanity rows, fetched once per build and shared by every framework route still on Sanity. */
function rows(): Promise<FrameworkMediaRows | null> {
  rowsPromise ??= sanityQuery<FrameworkMediaRows>(FRAMEWORK_MEDIA_GROQ);
  return rowsPromise;
}

/**
 * ONE READ PER BUILD, NEVER LAST BUILD'S. Next keeps a build's fetches in its
 * data cache, and Vercel restores that cache into the next build, so a cached
 * answer could outlive the links it describes. The cache key carries this
 * deployment's id, so every build reads HubSpot afresh and every page in it
 * shares that one answer.
 */
const BUILD_READ = process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? `local-${Date.now()}`;
const linksPromises = new Map<FrameworkKey, Promise<AboutRead>>();

/** What HubSpot says is published about `framework` and its parts; throws (failing the build) on anything short of a whole read. */
function links(framework: FrameworkKey): Promise<AboutRead> {
  let p = linksPromises.get(framework);
  if (!p) {
    p = aboutWork(frameworkLinkAddresses(framework), {
      init: { cache: 'force-cache', headers: { 'x-vf-build-read': BUILD_READ } },
    }).then((work) => work.read);
    linksPromises.set(framework, p);
  }
  return p;
}

export async function frameworkMedia(framework: FrameworkKey): Promise<FrameworkMedia> {
  if (READ_FROM_HUBSPOT.has(framework)) return resolveFrameworkMediaFromLinks(framework, await links(framework));
  return resolveFrameworkMedia(framework, await rows());
}
