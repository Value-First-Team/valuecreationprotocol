/**
 * FrameworkRoute — the thin host for one canonical framework module on this property.
 *
 * Chris ruled 2026-09-01 that nothing is elevated on only one site: the seven
 * framework modules are shared entities on every Value-First property. So this
 * file is the WHOLE of what this property adds around a module — the site's canon
 * shell (eyebrow, display, lead, spec meta, the implementer cross-citation) fed
 * from the module's own claim words, and the media join read once at build. Not
 * one framework sentence is written here. Edit the framework in @vf/brand and
 * re-pin.
 *
 * ==========================================================================
 * THE TABLES COME FROM THE KIT NOW (2026-09-05)
 * ==========================================================================
 *
 * This file wrote its own route table, its own three compass service URLs, its
 * own schema.org DefinedTerm switch and its own page-metadata composer. Every one
 * of those is a fact about the CONSTELLATION, not about this property, so they
 * were promoted into `@vf/site-kit/framework` before a second property could copy
 * them — Global-first, promote before the second copy. They are imported here and
 * the local copies are deleted, so a change to any of them reaches this property
 * by moving one pin.
 *
 * WHAT DID NOT MOVE, AND WHY. The kit also ships `FrameworkPage`, a whole route
 * that frames the module in the kit's own marketing `Hero`. This property cannot
 * use it: every canon page here is wrapped in `CanonArchetype`, which carries the
 * canon hero, the spec-meta strip, the build-time peer cross-citation and the
 * implementer band — this site's shell, and the thing that makes a canon page on
 * this property read as a specification rather than as marketing. A page frame is
 * genuinely this property's, so the shell stays and the tables are adopted. The
 * plate bytes and the OG cards stay too, for the reason the kit states: a library
 * cannot portably import a host's PNG, and it cannot ship a property's social card.
 *
 * ==========================================================================
 * AND WHAT MOVED ANYWAY (2026-09-07) — THE STAGE
 * ==========================================================================
 *
 * The paragraph above held on 2026-09-05 and it drew the wrong boundary once: when
 * the framework STAGE landed in the kit on 2026-09-06, only valuefirstteam.com got
 * it, because only that property renders `FrameworkPage`. Chris's 2026-09-01 line
 * says nothing is elevated on only one site, and Motif ruled the distinction: the
 * stage is the FRAMEWORK's opening, not the property's frame. The frame is still
 * this property's and still here, unchanged; the opening is the constellation's and
 * arrives from `@vf/site-kit/framework` — `FrameworkStageFor` + `FrameworkLede`, the
 * same two components the other property renders, so one framework cannot be
 * published under two titles.
 *
 * ==========================================================================
 * AND THE EIGHTH (2026-11-11) — THE TEACH VALUES
 * ==========================================================================
 *
 * Chris ruled that TEACH joins the shared framework page as family eight ("Yes, build
 * it (Recommended)"), so /teach is a thin route over this file like the other seven.
 * It has no Compass tool, so its module reads no endpoint; and since @vf/brand 0.176.0 it
 * takes the layout field like every family (a column card for each pair, and the row), so
 * it is placed in the row below like the others. Its opening is
 * canon's Quick Reference Card (@vf/site-kit 0.234.0; Chris, "I think we should start the
 * page here"), drawn by `FrameworkStageFor` in the hero's opening slot like any staged
 * framework; the 3D arches it opened on before are retired ("The 3D is not doing it for me
 * right now"). The canonical reference the hand-built page carried in full has its own
 * address, /teach/reference, linked from the spec strip.
 *
 * ==========================================================================
 * AND THROUGH THE CARD ENGINE (2026-11-12) — THE CARDS THIS ROUTE HANDS THE MODULE
 * ==========================================================================
 *
 * This property is a declared build consumer in @vf/brand (`consumer:valuecreationprotocol/
 * framework-cards`, VCP step 0). The game cards this route hands the module draw their pictures
 * from the card-art table the build resolved (lib/card-art-table.ts), through @vf/recipes'
 * `CardArtTableProvider`, and nowhere else: each picture carries its exact registry version
 * (`data-card-art-version`), and the build's receipts are served at /card-asset-receipts.jsonl.
 * Only a route that hands the module cards gets the table, so a framework that draws only its
 * column cards renders exactly what it rendered before.
 *
 * ==========================================================================
 * THE ROW, CHOSEN BY THIS HOST (2026-11-12) — BUILD 1 OF THE ELEVATION PLAN
 * ==========================================================================
 *
 * Chris picked "Seven framework pages (Recommended)": the framework pages take TEACH's
 * card-beside-film row (L4-orchestration/output/2026-11-11-vcp-teach-elevated/vcp-elevation-plan.md,
 * build 1). The row is the module's own layout field and the placement chooses it (@vf/brand
 * `itemLayout`, card ruling 1), so this file names the frameworks it places in the row, as
 * `ROW_PLACED` below, and the module draws the rest.
 *
 * A ROW PLACEMENT IS `"responsive"` (`ROW_PLACEMENT_LAYOUT`). Chris, 2026-10-02, on /beliefs (log
 * 6401f469b): "I think rows make sense on desktop. column card (without game cards) (with playable
 * videos) make sense on mobile". It binds the shared module on every host, so from 900px each item
 * is its two-sided game card beside its film and "What exists", and below that it is the column
 * card, opened so its film plays, with no game card: what valuefirstteam.com/beliefs draws. Every
 * family this site places in the row takes it: the Core Beliefs, the Twelve Traps, the TEACH Values,
 * the Value Path, the Unified Views, the Value Realities and the Five-Layer Model.
 *
 * THE THREE-ORG MODEL STANDS ACROSS (`ACROSS_PLACED`). Chris, 2026-10-04, on /three-orgs (log
 * 9b041c096): "Side by side (Recommended)". The three orgs are peers, so on a computer their game
 * cards stand in one row at equal size, each turning in place; below the set's width, the column
 * cards. That is the module's `"across"` layout, and what valuefirstteam.com/three-orgs draws.
 */
import type { Metadata } from 'next';
import { FrameworkModule, frameworkClaim, type FrameworkKey } from '@vf/brand';
import { CardArtTableProvider } from '@vf/recipes/game-cards';
import {
  FRAMEWORK_PATHS,
  COMPASS_SERVICES,
  FrameworkStageFor,
  FrameworkLede,
  FrameworkRowPreviews,
  frameworkItemCards,
  frameworkOpensOnStage,
  frameworkClaimScale,
  frameworkPageMetadata,
  frameworkJsonLd,
} from '@vf/site-kit/framework';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { frameworkMedia } from '@/lib/framework-media';
import { teachReferenceTitle } from '@/lib/teach-reference';
import { valueLoopReferenceTitle } from '@/lib/value-loop-reference';
import { cardArtTable } from '@/lib/card-art-table';

// The AI-Native Shift plates this property serves. Static imports straight out of
// @vf/brand's "./assets/*" export, so the bytes are the package's and this repo
// stores no copy of them; Next fingerprints and serves each one. Both variants of
// each plate are imported because PlateStrip chooses the dark or the light
// variant in the browser, from the theme the reader is actually in.
//
// This property serves only the plates whose words agree with canon. The
// five-layers and attack-wrong-end plates are not served: each prints Layer 4 as
// "Orchestration", and canon names it Trust (Five-Layer reference v1.8, Chris
// 2026-10-04). The resolver returns no URL for an unserved file, so PlateStrip
// leaves them out. Serve them again once @vf/brand ships redrawn plates.
import plateTodayVsDoneDark from '@vf/brand/assets/ai-native-shift/ans-today-vs-done-dark.png';
import plateTodayVsDoneLight from '@vf/brand/assets/ai-native-shift/ans-today-vs-done-light.png';
import plateTensionHeldDark from '@vf/brand/assets/ai-native-shift/ans-tension-held-dark.png';
import plateTensionHeldLight from '@vf/brand/assets/ai-native-shift/ans-tension-held-light.png';

/** A plate filename → the URL this property serves it from. Unknown file → no image. */
const PLATE_URLS: Record<string, { src: string }> = {
  'ans-today-vs-done-dark.png': plateTodayVsDoneDark,
  'ans-today-vs-done-light.png': plateTodayVsDoneLight,
  'ans-tension-held-dark.png': plateTensionHeldDark,
  'ans-tension-held-light.png': plateTensionHeldLight,
};
const plates = (file: string): string => PLATE_URLS[file]?.src ?? '';

/**
 * The route table is re-exported rather than re-declared, so anything on this
 * property that keys off a framework path reads the constellation's one copy.
 */
export { FRAMEWORK_PATHS };

/** The OG image this property already ships for each framework route. */
const OG: Record<FrameworkKey, string> = {
  'core-beliefs': '/og/og-beliefs.jpg',
  'complexity-traps': '/og/og-twelve-traps.jpg',
  'value-path': '/og/og-value-path.jpg',
  'unified-views': '/og/og-unified-views.jpg',
  'value-realities': '/og/og-realities.jpg',
  // og-five-layers.png prints Layer 4 as "Orchestrate"; canon names it Trust.
  // The site's default card stands in until a redrawn card ships.
  'five-layer-model': '/og/og-default.jpg',
  'three-org-model': '/og/og-three-orgs.jpg',
  'teach-values': '/og/og-teach.jpg',
  // Families nine and ten (@vf/brand 0.180.0): the Value Loop's card ships; the Interest Pipeline takes the site's
  // default card until one does.
  'value-loop': '/og/og-value-loop.jpg',
  'interest-pipeline': '/og/og-default.jpg',
};

/**
 * Where a framework's full canonical reference lives on this property, when it has an
 * address of its own. TEACH's did: the hand-built /teach rendered the whole reference
 * below its stage, and that reading moved to /teach/reference when /teach became a
 * thin route. Its link text is the reference's own title, read by that page.
 */
const REFERENCE: Partial<Record<FrameworkKey, { href: string; title: () => string }>> = {
  'teach-values': { href: '/teach/reference', title: () => teachReferenceTitle() },
  // The Value Loop's reference moved the same way when /value-loop became a thin route (builds 5 and 6).
  'value-loop': { href: '/value-loop/reference', title: () => valueLoopReferenceTitle() },
};

/**
 * The frameworks this property places in the module's ROW (build 1, see the header). A framework
 * the module does not draw in the row yet throws at build, naming itself, so a key added here
 * before @vf/brand draws its row stops the build rather than drawing a column nobody asked for.
 */
const ROW_PLACED: readonly FrameworkKey[] = [
  'core-beliefs',
  'complexity-traps',
  'teach-values',
  'value-path',
  'unified-views',
  'value-realities',
  'five-layer-model',
  // Families nine and ten (@vf/brand 0.180.0): the row from 900px, the column card below, as every family takes.
  'value-loop',
  'interest-pipeline',
];

/**
 * The layout every ROW_PLACED framework is asked for: the row from 900px, the column card below it
 * (Chris's 2026-10-02 ruling, see the header). One value for every family, never a per-family switch.
 */
const ROW_PLACEMENT_LAYOUT = 'responsive' as const;

/**
 * The frameworks this property stands ACROSS: a set of peers, their game cards side by side at equal
 * size (Chris's 2026-10-04 ruling on /three-orgs, see the header). @vf/brand draws `"across"` only for
 * the frameworks it lists in `FRAMEWORK_ACROSS_LAYOUT_READY`, and refuses the rest at build.
 */
const ACROSS_PLACED: readonly FrameworkKey[] = ['three-org-model'];

/**
 * Page metadata composed from the module's own claim — the title tag cannot drift
 * from the page, because both read the same canon. The composition is the kit's;
 * what this property adds is its own OG card.
 */
export function frameworkMetadata(framework: FrameworkKey): Metadata {
  return frameworkPageMetadata(framework, SITE.url, { ogImage: OG[framework] }) as Metadata;
}

export async function FrameworkRoute({ framework }: { framework: FrameworkKey }) {
  const claim = frameworkClaim(framework);
  const path = FRAMEWORK_PATHS[framework];
  const media = await frameworkMedia(framework);

  // ==========================================================================
  // DOES THIS FRAMEWORK OPEN ON THE STAGE?
  // ==========================================================================
  //
  // Chris ruled 2026-09-06 that the canonical framework pages get the elevation
  // the decks got, and on 2026-09-07 which canon word lands in which slot. The
  // 2026-09-01 line binds too: nothing is elevated on only one site. So the stage
  // reaches this property — and the thing this file was right about in September
  // stays right: a PAGE FRAME is genuinely this property's. The stage is the
  // FRAMEWORK's opening, not the frame, so it goes in the archetype's own hero
  // slot and everything around it — the spec strip, the peer cross-citation, the
  // implementer band, this site's ground and chrome — is untouched.
  //
  // The composition is @vf/site-kit's, not a second copy of it. `FrameworkStageFor`
  // and `FrameworkLede` are the SAME two components valuefirstteam.com's
  // `FrameworkPage` renders, so the two properties cannot publish one framework
  // under two titles. Not one framework sentence is written here, still.
  //
  // The answer comes from the kit, which asks @vf/brand: a framework opens on a stage
  // when it has a liftable overview visual or an opening of its own (TEACH's Quick
  // Reference Card, drawn in the same slot). The rest render exactly what they rendered
  // before this branch existed.
  const staged = frameworkOpensOnStage(framework);
  const reference = REFERENCE[framework];
  // A framework this property places in the row (ROW_PLACED) or across (ACROSS_PLACED) asks for
  // that layout by the module's layout field and is handed its game cards; any other keeps its
  // stacked column cards.
  const placement = ROW_PLACED.includes(framework)
    ? ROW_PLACEMENT_LAYOUT
    : ACROSS_PLACED.includes(framework)
      ? ('across' as const)
      : undefined;
  // The cards this route hands the module, and the table they draw from (read at build).
  const itemCards = placement ? frameworkItemCards(framework) : undefined;
  const cardArt = itemCards ? cardArtTable() : null;

  const frameworkModule = (
    <FrameworkModule
      framework={framework}
      media={media}
      showClaim={false}
      /* The stage above already carries this framework's overview visual, so
         the glance stands down and starts at its set. The same accepted figure
         twice on one page is a fork wearing a duplicate, and nothing would
         tell you. Unstaged frameworks keep `inline`, the default. */
      overview={staged ? 'hosted' : 'inline'}
      hrefs={{
        trap: (slug) => `${FRAMEWORK_PATHS['complexity-traps']}#trap-${slug}`,
        // The other direction, added 2026-09-04: the Realities page has always
        // linked to every trap by name, and a reader who recognized themselves on
        // the traps page was left with the room and nothing else. Each Reality card
        // already carries `id="reality-<slug>"`, so the landing point exists.
        reality: (slug) => `${FRAMEWORK_PATHS['value-realities']}#reality-${slug}`,
      }}
      /* A placement asks for its layout by the module's layout field: the row from 900px and
         the column card below it, or, for peers, the cards side by side across. */
      {...(placement ? { itemLayout: placement } : {})}
      {...(itemCards ? { itemCards } : {})}
      /* Each framework's Compass tool, in either layout. TEACH has none, and its module
         reads none of these. */
      decideEndpoint={COMPASS_SERVICES.decide}
      recognizeEndpoint={COMPASS_SERVICES.recognize}
      translateEndpoint={COMPASS_SERVICES.translate}
      plates={plates}
    />
  );

  return (
    <>
      <JsonLd
        data={frameworkJsonLd(framework, SITE.url, {
          name: 'Value Creation Protocol Glossary',
          url: `${SITE.url}/glossary`,
        })}
      />
      <CanonArchetype
        {...(staged
          ? {
              // The stage carries the page's ONE h1 (the framework's name), so the
              // archetype must not also emit its canon-display — hence the slot
              // rather than a second header. The reading opens directly under it,
              // on this page's own tokens, above the spec strip.
              opening: (
                <>
                  <FrameworkStageFor framework={framework} />
                  <FrameworkLede framework={framework} className="mt-8 md:mt-10" />
                </>
              ),
            }
          : {
              eyebrow: claim.eyebrow,
              title: claim.headline,
              // A claim over the kit's FRAMEWORK_CLAIM_DISPLAY_MAX sets at heading size (@vf/site-kit 0.239.0).
              titleScale: frameworkClaimScale(framework),
              lead: claim.lines[0] ?? '',
            })}
        path={path}
        specMeta={[
          { label: 'Status', value: 'canonical' },
          { label: 'Cite', value: `valuecreationprotocol.com${path}` },
          { label: 'Source', value: 'Generated from the canonical reference and checked against it on every build' },
          ...(reference ? [{ label: 'Reference', value: reference.title(), href: reference.href }] : []),
        ]}
      >
        {/* The hover/focus preview on every "what exists" row. It is a CLIENT wrapper
            over a server-rendered module — it attaches by delegation over the row
            facts the module publishes as data attributes, because this route is a
            server component and a function prop cannot cross that boundary. This
            property gets it for the same reason valuefirstteam.com does: the 2026-09-01
            line binds, nothing is elevated on only one site. Wrapping something with
            no such rows yields exactly what was wrapped and no listener fires. */}
        <FrameworkRowPreviews>
          {cardArt ? (
            <CardArtTableProvider table={cardArt}>{frameworkModule}</CardArtTableProvider>
          ) : (
            frameworkModule
          )}
        </FrameworkRowPreviews>
      </CanonArchetype>
    </>
  );
}
