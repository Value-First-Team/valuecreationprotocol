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
 *   Then the Value Loop, the Interest Pipeline and the Five-Layer Model
 *   (2026-11-25, @vf/brand 0.237.0): the Value Loop's deck from its Listing,
 *   the Interest Pipeline with nothing linked yet, and the Five-Layer Model with
 *   no film and no deck (Chris, 2026-11-25: "Take both off the page"). Then the
 *   Three-Org Model (2026-11-25, @vf/brand 0.238.0), once its film's Listing was
 *   linked: the film plays from its filed file with its caption track, and the
 *   deck from its Listing. Then the Four Unified Views (2026-11-25, @vf/brand
 *   0.239.0): the five films from their filed files with their caption tracks,
 *   the concepts decks, the playbooks from their Listings and the stated articles.
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
import { aboutWork, AboutWorkError, type AboutRead } from '@vf/site-kit/search/about-work';
import { sanityQuery } from './sanity/client';

/**
 * The frameworks this site draws from HubSpot. Each joins in its own pass: the TEACH Values
 * (2026-11-24), then the Five Core Beliefs (2026-11-25, @vf/brand 0.234.0), which moves
 * /beliefs, the Natural Value Flow card on /language-of-value and the beliefs film tile on
 * / and /methodology in one build; then the Value Loop, the Interest Pipeline and the
 * Five-Layer Model (2026-11-25, @vf/brand 0.237.0), which move /value-loop,
 * /interest-pipeline and /five-layers with their rows on /methodology and their cards on /;
 * then the Three-Org Model (2026-11-25, @vf/brand 0.238.0), which moves /three-orgs with its
 * row on /methodology and its card on /; then the Four Unified Views (2026-11-25, @vf/brand
 * 0.239.0), which moves /unified-views with its row on /methodology and its card on /: the
 * five films from their filed files with their caption tracks, the concepts decks, each
 * view's playbook from its Listing, and the five stated articles under the Customer View.
 * A framework listed here never asks Sanity.
 */
const READ_FROM_HUBSPOT: ReadonlySet<FrameworkKey> = new Set<FrameworkKey>([
  'teach-values',
  'core-beliefs',
  'value-loop',
  'interest-pipeline',
  'five-layer-model',
  'three-org-model',
  'unified-views',
]);

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

/**
 * ONE READ AT A TIME, AND A RATE LIMIT WAITED OUT. The home page and /methodology ask for
 * every framework at once, so five frameworks on HubSpot meant five door reads in flight
 * together, about thirty addresses, and HubSpot's search answered "too many requests":
 * the door passed that on (502, `rate_limited`) and the build stopped (2026-11-25,
 * dpl_Fn1mr2zwebSeSHKFHjSYpVE2vyhz). So this build's reads queue behind each other, and a
 * read the door answers `rate_limited` is asked again after a pause, three more times at
 * most. Nothing else is retried: a refused, blind or partial read still fails the build at
 * once, and a rate limit that outlasts the retries fails it too. The door never stores a
 * 502 (`no-store`) and Next keeps only a 200, so each retry is a fresh read.
 */
const RATE_LIMIT_WAITS_MS = [2000, 5000, 10000] as const;
let readQueue: Promise<unknown> = Promise.resolve();

async function readAbout(framework: FrameworkKey): Promise<AboutRead> {
  for (let attempt = 0; ; attempt++) {
    try {
      const work = await aboutWork(frameworkLinkAddresses(framework), {
        init: { cache: 'force-cache', headers: { 'x-vf-build-read': BUILD_READ } },
      });
      return work.read;
    } catch (e) {
      const wait = RATE_LIMIT_WAITS_MS[attempt];
      if (!(e instanceof AboutWorkError) || e.code !== 'rate_limited' || wait === undefined) throw e;
      console.warn(`framework-media: the door answered rate_limited for ${framework}; asking again in ${wait} ms`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

/** What HubSpot says is published about `framework` and its parts; throws (failing the build) on anything short of a whole read. */
function links(framework: FrameworkKey): Promise<AboutRead> {
  let p = linksPromises.get(framework);
  if (!p) {
    const read = () => readAbout(framework);
    p = readQueue.then(read, read);
    readQueue = p.catch(() => undefined);
    linksPromises.set(framework, p);
  }
  return p;
}

export async function frameworkMedia(framework: FrameworkKey): Promise<FrameworkMedia> {
  if (READ_FROM_HUBSPOT.has(framework)) return resolveFrameworkMediaFromLinks(framework, await links(framework));
  return resolveFrameworkMedia(framework, await rows());
}
