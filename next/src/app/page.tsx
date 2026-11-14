/**
 * / — Homepage. The protocol overview.
 *
 * BUILD 4 OF THE ELEVATION (plan vcp-elevation-plan.md, ruled by Chris 2026-11-12: the home page "opens on the approved
 * 'What is Value-First' film module, then shows the framework families as a row of cards, in place of the text headline
 * and the At-a-glance box"; Motif's proposal, build4-home/proposal.md, on @vf/brand 0.179.0). In order:
 *   1. the opening is the film (Chris, 2026-11-13: no visible eyebrow or title above it): @vf/site-kit's
 *      PageVideoSpot with the approved 80% film and Chris's approved words, as valuefirstteam.com's home
 *      places it; it publishes one VideoObject naming this page. The page's one h1 stays, visually hidden;
 *   2. the framework families as painted cards (@vf/brand CanonPagesModule): from 900px a grid of build 2's
 *      CanonPageGameCards, below it the column cards with their films; each card is the hub's one copy of the page;
 *   3. § 01 onward, word for word, with § 02's counts derived from the lists they count.
 * ONE LEFT EDGE. The film, the families' heading and § 01 share VCP's 1120px measure: the film's inner
 * column takes this page's own measure class through PageVideoSpot's containerClassName (@vf/site-kit 0.238.0).
 */
// hand-roll-exempt: the protocol home's editorial front page. Its visual rhythm is
// the Homepage block of vcp-archetypes.css (.vcp-opening / .vcp-section / .vcp-peers),
// which is where this site's per-node design language is authored; the page emits the
// semantic markup that stylesheet dresses. The film is @vf/site-kit's PageVideoSpot, the
// cards are @vf/brand's CanonPagesModule with @vf/recipes' CanonPageGameCard, and the
// global shell around it (SiteShell, header, footer, overlay root) is @vf/site-kit.
import type { Metadata } from 'next';
import { TextLink } from '@vf/ui';
import { CanonPagesModule, canonPageFilm, type CanonPageFilm } from '@vf/brand';
import { CANON_PAGE_FAMILIES, countWord, countWordCapital, type MethodologyFrameworkKey } from '@vf/brand/methodology';
import { CanonPageGameCard, CardArtTableProvider } from '@vf/recipes/game-cards';
import { PageVideoSpot, WHAT_IS_VALUE_FIRST_WORDS, whatIsValueFirst80Percent } from '@vf/site-kit/video';
import { SITE, METHODOLOGY_PAGES, MANIFESTO_PAGES, ENCODING_PAGES, CANON_PAGE_ARCHETYPES } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { cardArtTable } from '@/lib/card-art-table';
import { frameworkMedia } from '@/lib/framework-media';

export const metadata: Metadata = {
  title: 'Open Protocol Home',
  description:
    'The Value Creation Protocol (VCP) is an open framework for designing systems where value flows naturally between people, organizations, and AI. A peer to MCP and HCP in the AI-native protocol stack.',
  openGraph: {
    url: SITE.url + '/',
    // Motif full-static plate. SoR @vf/brand assets/value-creation-protocol/vcp-og-home.png (public/og copy; regen on brand bump).
    images: ['/og/vcp-og-home.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/vcp-og-home.png'],
  },
  alternates: { canonical: SITE.url + '/' },
};

const PEER_PROTOCOLS = [
  {
    id: 'MCP',
    name: 'Model Context Protocol',
    desc: 'The machine-context layer. How AI accesses tools, data, and models.',
    owner: 'Anthropic',
    href: 'https://modelcontextprotocol.io',
    mark: '/assets/marks/mcp-mark-tight.png',
    band: 'mcp',
  },
  {
    id: 'VCP',
    name: 'Value Creation Protocol',
    desc: 'The value-creation layer. What creates value, for whom, and why.',
    owner: 'Value-First Team',
    href: '/',
    mark: '/assets/marks/vcp-mark-tight.png',
    band: 'vcp',
  },
  {
    id: 'HCP',
    name: 'Human Context Protocol',
    desc: 'The human-context layer. Human intent, authority, and history.',
    owner: 'community',
    href: 'https://humancontextprotocol.com',
    mark: '/assets/marks/hcp-mark-tight.png',
    band: 'hcp',
  },
];

// § 02's counts are derived from the lists they count (build 2's finding: the methodology door read 12 where the hub
// has 13). The encoding door counts the spec pages beside the stack's overview.
const ENCODING_SPECS = ENCODING_PAGES.filter((p) => p.href !== '/encoding-stack').length;

const ENTRY_CARDS = [
  {
    num: '§ 02.1',
    eyebrow: 'Encoding stack',
    title: 'Lexicon · VCP-Lang · Value Graph',
    body: 'The technical specification: three layers that compile a value statement into an addressable graph the protocol can operate on.',
    meta: `${ENCODING_SPECS} SPECS · v0.1`,
    href: '/encoding-stack',
  },
  {
    num: '§ 02.2',
    eyebrow: 'Methodology canon',
    title: 'The Value Path, twelve traps, three orgs',
    body: `${countWordCapital(METHODOLOGY_PAGES.length)} long-form chapters covering the operating model AI-native organizations adopt to create value across customer, operations, and finance.`,
    meta: `${METHODOLOGY_PAGES.length} CHAPTERS`,
    href: '/methodology',
  },
  {
    num: '§ 02.3',
    eyebrow: 'Manifestos',
    title: 'Beyond leads. Beyond funnels.',
    body: 'Position pieces on why the industrial-age vocabulary of growth, sales, and operations can not carry an AI-native organization.',
    meta: `${MANIFESTO_PAGES.length} ESSAYS`,
    href: '/manifestos',
  },
];

const IMPLEMENTATIONS = [
  {
    name: 'The AI-Native Shift',
    operator: 'Value-First Team',
    desc: 'A daily show and transformation program for business leaders making the shift from industrial-age defaults to AI-native operations. Built on VCP; reciprocal framework reference at ainativeshift.com/framework/vcp.',
    handoff: '/ai-native-shift',
    external: 'https://ainativeshift.com',
    status: 'Canonical',
  },
];

// The eight framework families, read from the hub's own list, so each card's name, line, painting, count, group and
// address are /methodology's one copy.
const FAMILY_KEYS: readonly string[] = CANON_PAGE_FAMILIES;
const FAMILIES = METHODOLOGY_PAGES.filter((p) => FAMILY_KEYS.includes(p.key));
const CANON_LABEL = CANON_PAGE_ARCHETYPES.find((x) => x.id === 'methodology')?.label ?? '';
if (FAMILIES.length !== CANON_PAGE_FAMILIES.length || !CANON_LABEL) {
  throw new Error(`/: the home draws ${FAMILIES.length} of the ${CANON_PAGE_FAMILIES.length} framework families from METHODOLOGY_PAGES, or the methodology archetype has no label`);
}

const homeLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Open protocol home',
  termCode: 'VCP',
  description: metadata.description,
  url: SITE.url + '/',
  inLanguage: 'en',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Value Creation Protocol Glossary',
    url: `${SITE.url}/glossary`,
  },
  isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url, inLanguage: 'en' },
};

export default async function HomePage() {
  const table = cardArtTable();
  const films: Record<string, CanonPageFilm | null> = Object.fromEntries(
    await Promise.all(FAMILIES.map(async (p) => [p.key, canonPageFilm(await frameworkMedia(p.key as MethodologyFrameworkKey))] as const)),
  );

  return (
    <>
      <JsonLd data={homeLd} />

      {/* THE OPENING: the film, first (Chris, 2026-11-13). The page's one h1 stays in the document, visually
          hidden, for a reader that moves by headings and for search; nothing visible stands above the film. */}
      <div className="vcp-opening bg-vf-surface">
        <h1 className="sr-only">Value, drawn open and operable.</h1>
        <PageVideoSpot
          containerClassName="vcp-opening-measure"
          placement={whatIsValueFirst80Percent(SITE.url + '/')}
          tone="surface"
          eyebrow="Watch"
          words={WHAT_IS_VALUE_FIRST_WORDS}
        />
      </div>

      {/* THE FRAMEWORK FAMILIES as painted cards: the grid from 900px, the column cards with their films below. */}
      <section className="vcp-section vcp-section-families" aria-labelledby="vcp-families-heading">
        <div className="vcp-section-inner">
          <p className="t-eyebrow vcp-section-eyebrow">{CANON_LABEL}</p>
          <h2 className="t-h2 vcp-section-h2" id="vcp-families-heading">
            {countWordCapital(FAMILIES.length)} open ideas.
          </h2>
          <div className="vcp-families">
            <CardArtTableProvider table={table}>
              <CanonPagesModule
                sources={FAMILIES}
                layout="responsive"
                cards={Object.fromEntries(FAMILIES.map((p) => [p.key, <CanonPageGameCard source={p} />]))}
                art={table}
                films={films}
              />
            </CardArtTableProvider>
          </div>
          <p className="vcp-families-all">
            <TextLink href="/methodology" standalone>
              All {countWord(METHODOLOGY_PAGES.length)} canon pages
            </TextLink>
          </p>
        </div>
      </section>

      {/* § 01 · THE STACK */}
      <section className="vcp-section vcp-section-stack">
        <div className="vcp-section-inner">
          <p className="t-eyebrow vcp-section-eyebrow">§ 01 · The Stack</p>
          <h2 className="t-h2 vcp-section-h2">Three peer protocols. No hierarchy implied.</h2>
          <p className="t-lead vcp-section-lead">
            MCP is the machine-context layer. HCP is the human-context layer. VCP is the
            value-creation layer &mdash; what creates value, for whom, and why. They are peers
            because each addresses a layer the others do not reach.
          </p>

          <div className="vcp-peers">
            {PEER_PROTOCOLS.map((p) => {
              const ext = p.href.startsWith('http');
              return (
                <a
                  key={p.id}
                  href={p.href}
                  className={`vcp-peer vcp-peer-${p.band}`}
                  target={ext ? '_blank' : undefined}
                  rel={ext ? 'noopener' : undefined}
                >
                  <div className="vcp-peer-band">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.mark} alt="" width={36} height={36} className="vcp-peer-mark" />
                    <span className="vcp-peer-id">{p.id}</span>
                  </div>
                  <div className="vcp-peer-body">
                    <h3 className="vcp-peer-name">{p.name}</h3>
                    <p className="vcp-peer-desc">{p.desc}</p>
                    <p className="vcp-peer-owner">
                      <span className="vcp-peer-owner-label">owner</span>
                      <span className="vcp-peer-owner-name">{p.owner}</span>
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* § 02 · ENTER HERE */}
      <section className="vcp-section vcp-section-entries">
        <div className="vcp-section-inner">
          <p className="t-eyebrow vcp-section-eyebrow">§ 02 · Enter Here</p>
          <h2 className="t-h2 vcp-section-h2">Three doors in.</h2>
          <p className="t-lead vcp-section-lead">
            The protocol resolves at three different reading depths. Pick one. The others remain
            navigable from any page.
          </p>

          <div className="vcp-entries">
            {ENTRY_CARDS.map((card) => (
              <a href={card.href} className="vcp-entry" key={card.num}>
                <span className="vcp-entry-num">
                  {card.num} &middot; {card.eyebrow}
                </span>
                <h3 className="vcp-entry-title">{card.title}</h3>
                <p className="vcp-entry-body">{card.body}</p>
                <div className="vcp-entry-foot">
                  <span className="vcp-entry-meta">{card.meta}</span>
                  <span aria-hidden="true" className="vcp-entry-arrow">
                    &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* § 03 · IMPLEMENTATIONS */}
      <section className="vcp-section vcp-section-implementations">
        <div className="vcp-section-inner">
          <p className="t-eyebrow vcp-section-eyebrow">§ 03 · Implementations</p>
          <h2 className="t-h2 vcp-section-h2">Implementations built on the protocol.</h2>
          <p className="t-lead vcp-section-lead">
            The protocol is open and platform-agnostic. Implementations are opinionated &mdash;
            they make choices about substrate, cadence, and delivery. Anyone may build one. The
            canonical implementation maintained by the originating firm is listed below.
          </p>

          <div className="vcp-implementations">
            {IMPLEMENTATIONS.map((impl) => (
              <a href={impl.handoff} className="vcp-impl-card" key={impl.name}>
                <div className="vcp-impl-head">
                  <span className="vcp-impl-status">{impl.status}</span>
                  <span className="vcp-impl-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </div>
                <h3 className="vcp-impl-name">{impl.name}</h3>
                <p className="vcp-impl-operator">
                  <span className="vcp-impl-operator-label">operator</span>
                  <span className="vcp-impl-operator-name">{impl.operator}</span>
                </p>
                <p className="vcp-impl-desc">{impl.desc}</p>
                <p className="vcp-impl-foot">
                  <span className="vcp-impl-handoff">VCP handoff: {impl.handoff}</span>
                  <span className="vcp-impl-external">{impl.external.replace(/^https?:\/\//, '')}</span>
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* IMPLEMENTER ATTRIBUTION BAND */}
      <section className="vcp-implementer">
        <div className="vcp-implementer-inner">
          <p className="vcp-implementer-eyebrow">Implementers</p>
          <p className="vcp-implementer-body">
            VCP is originated and canonically implemented by{' '}
            <a href={SITE.implementer.url} target="_blank" rel="noopener" className="vcp-implementer-link">
              Value-First Team
            </a>
            . Anyone may read, cite, and operate the protocol independently of firm engagement.
          </p>
        </div>
      </section>
    </>
  );
}
