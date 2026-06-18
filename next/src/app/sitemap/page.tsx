/**
 * /sitemap — Human-readable sitemap. React port of src/pages/sitemap.astro.
 *
 * Served at the public path /sitemap (same URL as the Astro version). This is
 * app/sitemap/page.tsx — it does NOT collide with the machine-readable
 * app/sitemap.ts metadata route, which Next emits at /sitemap.xml. The two
 * coexist: /sitemap = this human page, /sitemap.xml = the generated XML.
 *
 * .sitemap-* styling lives in vcp-archetypes.css.
 */
import type { Metadata } from 'next';
import { SITE, METHODOLOGY_PAGES, MANIFESTO_PAGES } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';

interface Route {
  href: string;
  title: string;
  summary: string;
  meta?: string;
}

const HOMEPAGE: Route[] = [
  {
    href: '/',
    title: 'Open Protocol Home',
    summary:
      'The protocol home. A peer to modelcontextprotocol.io and humancontextprotocol.com — the value layer of the AI-native stack.',
    meta: 'Root',
  },
];

const HUBS: Route[] = [
  { href: '/methodology', title: 'Methodology Canon', summary: 'Index of the twelve canon pages — operating principles, frameworks, patterns, programs, implementation.', meta: '12 canon pages' },
  { href: '/manifestos', title: 'Manifestos', summary: 'Three long-form artifacts arguing the case the protocol formalizes — Beyond Leads, Value-Led Growth, Positioning.', meta: '3 manifestos' },
  { href: '/protocol-stack', title: 'The Protocol Stack', summary: 'How VCP sits beside MCP (capability) and HCP (human context) in the AI-native protocol substrate.', meta: 'MCP · HCP · VCP' },
  { href: '/engagement', title: 'Engagement Pathways', summary: 'Four pathways through the protocol home — Read, Implement, Contribute, Reach the implementer.', meta: '4 pathways' },
];

const METHODOLOGY: Route[] = METHODOLOGY_PAGES.map((p, i) => ({
  href: p.href,
  title: p.label,
  summary: p.summary,
  meta: `Chapter ${String(i + 1).padStart(2, '0')}`,
}));

const ENCODING: Route[] = [
  { href: '/encoding-stack', title: 'Encoding Stack — Overview', summary: 'The three-layer substrate that makes VCP machine-parseable — lexical, structural, relational.', meta: 'Overview' },
  { href: '/lexicon', title: 'Value-First Lexicon', summary: 'Layer A — the lexical substrate. The canonical vocabulary every implementation reads from.', meta: 'Layer A' },
  { href: '/vcp-lang', title: 'VCP-Lang', summary: 'Layer B — the structural substrate. The grammar that encodes value relationships in machine-parseable form.', meta: 'Layer B' },
  { href: '/value-graph', title: 'Value Graph', summary: 'Layer C — the relational substrate. The graph topology that describes how value moves between actors.', meta: 'Layer C' },
];

const MANIFESTOS: Route[] = MANIFESTO_PAGES.map((m, i) => ({
  href: m.href,
  title: m.label,
  summary: m.summary,
  meta: `Manifesto ${String(i + 1).padStart(2, '0')}`,
}));

const REFERENCE: Route[] = [
  { href: '/glossary', title: 'Glossary', summary: 'The canonical vocabulary in one place — every defined term used across the protocol home.', meta: 'Defined terms' },
];

const SITEMAP_SELF: Route[] = [
  { href: '/sitemap', title: 'Sitemap', summary: 'You are here. Human-readable wayfinding for the protocol home. Machine-readable companion at /sitemap.xml.', meta: 'You are here' },
];

interface Group {
  id: string;
  label: string;
  title: string;
  note: string;
  routes: Route[];
}

const GROUPS: Group[] = [
  { id: 'home', label: '§ 01 · Homepage', title: 'Homepage', note: 'The protocol home. One page — declarative, calm, no pitch.', routes: HOMEPAGE },
  { id: 'hubs', label: '§ 02 · Hubs', title: 'Hubs', note: 'Four wayfinding surfaces that index the canon. Pick the one that matches what you are trying to do.', routes: HUBS },
  { id: 'methodology', label: '§ 03 · Methodology canon', title: 'Methodology canon', note: 'Twelve canon pages — the operating principles, frameworks, patterns, programs, and implementation guidance the protocol encodes.', routes: METHODOLOGY },
  { id: 'encoding', label: '§ 04 · Encoding stack', title: 'Encoding stack', note: 'The substrate that makes VCP machine-parseable. Three layers — lexical, structural, relational — plus a short overview.', routes: ENCODING },
  { id: 'manifestos', label: '§ 05 · Manifestos', title: 'Manifestos', note: 'Three long-form arguments for why the protocol exists.', routes: MANIFESTOS },
  { id: 'reference', label: '§ 06 · Reference', title: 'Reference', note: 'Defined vocabulary, in one place.', routes: REFERENCE },
  { id: 'sitemap', label: '§ 07 · This page', title: 'This page', note: 'The wayfinding-of-wayfinding. Machine-readable companion linked below.', routes: SITEMAP_SELF },
];

const totalRoutes = GROUPS.reduce((sum, g) => sum + g.routes.length, 0);

export const metadata: Metadata = {
  title: 'Sitemap',
  description: `Human-readable sitemap for valuecreationprotocol.com — ${totalRoutes} public routes grouped by archetype. The wayfinding-of-wayfinding surface.`,
  openGraph: { url: SITE.url + '/sitemap', images: ['/og/og-default.jpg'] },
  alternates: { canonical: SITE.url + '/sitemap' },
};

const allRoutes: Route[] = GROUPS.flatMap((g) => g.routes);
const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Sitemap — Value Creation Protocol',
  description: `Human-readable sitemap for valuecreationprotocol.com. ${totalRoutes} routes grouped by archetype.`,
  url: `${SITE.url}/sitemap`,
  isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  hasPart: {
    '@type': 'ItemList',
    name: 'All public routes',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: allRoutes.length,
    itemListElement: allRoutes.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.title,
      url: `${SITE.url}${r.href}`,
    })),
  },
};

export default function SitemapHumanPage() {
  return (
    <>
      <JsonLd data={collectionLd} />
      <HubArchetype
        eyebrow={`§ Sitemap · ${totalRoutes} routes`}
        title="Every page, grouped."
        lead="Wayfinding for the protocol home. Every public route on valuecreationprotocol.com, grouped by archetype. The machine-readable companion lives at /sitemap.xml — this page is for humans."
      >
        <nav className="sitemap-toc" aria-label="Sitemap groups">
          <p className="sitemap-toc-label">Groups</p>
          <ul className="sitemap-toc-list">
            {GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="sitemap-toc-link">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {GROUPS.map((group, gIdx) => (
          <section id={group.id} className="hub-group" aria-labelledby={`hub-group-${gIdx}`} key={group.id}>
            <p className="hub-group-label">{group.label}</p>
            <h2 className="hub-group-title" id={`hub-group-${gIdx}`}>
              {group.title}
            </h2>
            <p className="hub-group-note">{group.note}</p>

            <ul className="hub-grid">
              {group.routes.map((r) => (
                <li key={r.href}>
                  <a href={r.href} className="hub-card">
                    <p className="hub-card-eyebrow">{r.meta ?? 'Route'}</p>
                    <h3 className="hub-card-title">{r.title}</h3>
                    <p className="hub-card-body">{r.summary}</p>
                    <div className="hub-card-foot">
                      <span className="hub-card-meta sitemap-card-path">{r.href}</span>
                      <span aria-hidden="true" className="hub-card-arrow">
                        &rarr;
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <aside className="sitemap-xml">
          <p className="sitemap-xml-eyebrow">Machine-readable</p>
          <p className="sitemap-xml-body">
            Search engines read the XML sitemap at{' '}
            <a href="/sitemap.xml" target="_blank" rel="noopener" className="sitemap-xml-link">
              /sitemap.xml
            </a>{' '}
            — auto-generated at build time. This page is the human-readable companion.
          </p>
        </aside>
      </HubArchetype>
    </>
  );
}
