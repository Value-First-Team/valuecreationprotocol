/**
 * /methodology — the methodology hub, as painted cards (build 2 of the valuecreationprotocol.com elevation; Chris
 * picked "Methodology hub", L4-orchestration/output/2026-11-11-vcp-teach-elevated/vcp-elevation-plan.md; Motif's
 * proposal, accepted as written, MainBrain dfc1de643: build2-hub/proposal.md).
 *
 * Each page of the canon is one `CanonPageModule` (@vf/brand) in its `responsive` layout: from 900px a row, the
 * page's two-sided game card (`CanonPageGameCard`, @vf/recipes) beside its family film, or the open side where no
 * film is on record; below 900px the column card, with no game card and the film playable where it sits (Chris,
 * 2026-10-02, log 6401f469b: "rows make sense on desktop. column card (without game cards) (with playable videos)
 * make sense on mobile"). Both are in the server HTML and CSS shows one.
 *
 * ONE LIST. Every card, every count and the structured data read METHODOLOGY_PAGES (lib/site.ts): which pages a
 * group holds, and their order, is the list's; this page keeps only each group's label, title and note, and their
 * order. The build fails if a page names a group this hub does not draw, so a page cannot be listed on the site and
 * missing here again (the Five-Layer Model was, until build 2). Every number on the page is derived: the eyebrow,
 * the lead, the descriptions, each card's count (from canon's own list, under canon's noun) and the JSON-LD.
 *
 * EVERY PICTURE COMES THROUGH THE CARD ENGINE. The hub sits inside `CardArtTableProvider` with the table this build
 * resolved (`npm run card-art`, lib/card-art-table.ts); the game card and the column card's picture head both draw
 * `painting:<term>` from it, each marked with its exact registry version, or the card's refusal. No address or
 * version is written here.
 */
import type { Metadata } from 'next';
import { CanonPageModule, canonPageFilm, type CanonPageFilm } from '@vf/brand';
import { CANON_PAGE_FAMILIES, countWord, countWordCapital, type MethodologyFrameworkKey } from '@vf/brand/methodology';
import { CanonPageGameCard, CardArtTableProvider } from '@vf/recipes/game-cards';
import { SITE, METHODOLOGY_PAGES, type MethodologyPage } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';
import { frameworkMedia } from '@/lib/framework-media';
import { cardArtTable } from '@/lib/card-art-table';

interface Group {
  label: string;
  /** The group's own title; a page names it in its `group` to be filed here. */
  title: string;
  /** The group's note. A function where the note names or counts what the group holds, so it reads the list. */
  note: string | ((pages: readonly MethodologyPage[]) => string);
}

const AND_LIST = new Intl.ListFormat('en-US', { style: 'long', type: 'conjunction' });

const GROUPS: Group[] = [
  {
    label: '§ 01 · Operating principles',
    title: 'Operating principles',
    note: 'The philosophical foundation. Read these first; everything else assumes them.',
  },
  {
    label: '§ 02 · Frameworks',
    title: 'Frameworks',
    // Names the models the group holds, by canon's names, read from the list.
    note: (pages) => `The structural models the protocol encodes — ${AND_LIST.format(pages.map((p) => `the ${p.name}`))}.`,
  },
  {
    label: '§ 03 · Patterns',
    title: 'Patterns',
    note: 'The operating loops and values that turn the frameworks into daily practice.',
  },
  {
    label: '§ 04 · Programs',
    title: 'Programs',
    note: (pages) => `${countWordCapital(pages.length)} named programs that shape how organizations grow and how teams transform.`,
  },
  {
    label: '§ 05 · Implementation',
    title: 'Implementation',
    note: 'Where the protocol meets the substrate — and how to keep them straight.',
  },
];

// THE BUILD CHECK: every page is filed under a group this hub draws, every group holds a page, and no group is drawn
// twice. A fault stops the build, naming the page or the group, rather than drawing a hub that drops a page.
const titles = GROUPS.map((g) => g.title);
const twice = titles.filter((t, i) => titles.indexOf(t) !== i);
if (twice.length) throw new Error(`/methodology: the group "${twice[0]}" is drawn twice.`);
const unfiled = METHODOLOGY_PAGES.filter((p) => !titles.includes(p.group));
if (unfiled.length) {
  throw new Error(
    `/methodology: ${unfiled.map((p) => `${p.href} is filed under "${p.group}"`).join('; ')}, a group this hub does not draw (${titles.join(', ')}). File it under one of them, or add its group here.`,
  );
}
const DRAWN = GROUPS.map((g) => ({ ...g, pages: METHODOLOGY_PAGES.filter((p) => p.group === g.title) }));
const empty = DRAWN.filter((g) => g.pages.length === 0);
if (empty.length) throw new Error(`/methodology: the group "${empty[0].title}" holds no page in METHODOLOGY_PAGES.`);
const DRAWN_PAGES = DRAWN.flatMap((g) => g.pages);
if (DRAWN_PAGES.length !== METHODOLOGY_PAGES.length) {
  throw new Error(`/methodology: the hub draws ${DRAWN_PAGES.length} pages and the list holds ${METHODOLOGY_PAGES.length}.`);
}

const PAGE_COUNT = METHODOLOGY_PAGES.length;
const DESCRIPTION = `The methodology canon. ${countWordCapital(PAGE_COUNT)} pages indexing the operating principles, frameworks, patterns, programs, and implementation guidance the Value Creation Protocol encodes.`;

export const metadata: Metadata = {
  title: 'Methodology Canon',
  description: DESCRIPTION,
  openGraph: { url: SITE.url + '/methodology', description: DESCRIPTION, images: ['/og/og-methodology.jpg'] },
  alternates: { canonical: SITE.url + '/methodology' },
};

// In the order the hub draws them, so a position here is the card's position on the page.
const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Methodology Canon',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: DRAWN_PAGES.length,
  itemListElement: DRAWN_PAGES.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.name,
    url: `${SITE.url}${p.href}`,
  })),
};

const FAMILIES: readonly string[] = CANON_PAGE_FAMILIES;

/** A family's film from the media join (the six on record play); a page that is not a family has none on record. */
async function filmFor(page: MethodologyPage): Promise<CanonPageFilm | null> {
  if (!FAMILIES.includes(page.key)) return null;
  return canonPageFilm(await frameworkMedia(page.key as MethodologyFrameworkKey));
}

export default async function MethodologyPage() {
  const table = cardArtTable();
  const films = new Map(await Promise.all(DRAWN_PAGES.map(async (p) => [p.key, await filmFor(p)] as const)));

  return (
    <>
      <JsonLd data={itemListLd} />
      <HubArchetype
        eyebrow={`§ Methodology · Index of ${PAGE_COUNT}`}
        title="The methodology canon."
        lead={`${countWordCapital(PAGE_COUNT)} pages — ${countWord(DRAWN.length)} sets — covering the operating principles, frameworks, patterns, programs, and implementation guidance the protocol encodes. Pick the set that matches what you're trying to do; the canon is navigable from any page once you're in.`}
      >
        <CardArtTableProvider table={table}>
          {DRAWN.map((group, gIdx) => (
            <section className="hub-group" aria-labelledby={`hub-group-${gIdx}`} key={group.title}>
              <p className="hub-group-label">{group.label}</p>
              <h2 className="hub-group-title" id={`hub-group-${gIdx}`}>
                {group.title}
              </h2>
              <p className="hub-group-note">{typeof group.note === 'function' ? group.note(group.pages) : group.note}</p>

              <ul className="hub-rows">
                {group.pages.map((page) => (
                  <li key={page.key}>
                    <CanonPageModule
                      source={page}
                      layout="responsive"
                      card={<CanonPageGameCard source={page} />}
                      film={films.get(page.key)}
                      art={table}
                    />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </CardArtTableProvider>
      </HubArchetype>
    </>
  );
}
