/**
 * /manifestos — Manifesto hub. React port of src/pages/manifestos/index.astro.
 * Indexes the three manifesto-class pages with teaser + pull-quote.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Manifestos',
  description:
    'Three long-form artifacts on why this protocol exists. Beyond Leads, Value-Led Growth, and the positioning paper.',
  openGraph: { url: SITE.url + '/manifestos', images: ['/og/og-manifestos.jpg'] },
  alternates: { canonical: SITE.url + '/manifestos' },
};

interface ManifestoEntry {
  num: string;
  eyebrow: string;
  date: string;
  title: string;
  teaser: string;
  quote: string;
  href: string;
  cta: string;
}

const MANIFESTOS: ManifestoEntry[] = [
  {
    num: '§ 01',
    eyebrow: 'Manifesto',
    date: 'Feb 2026',
    title: 'Beyond "Leads".',
    teaser:
      'The vocabulary at the center of modern business is older than software, and it has stopped working. The math of AI-native discovery has rendered the funnel illegible — to humans and to the agents who increasingly accompany them.',
    quote: 'The funnel is illegible — to humans and to the agents who increasingly accompany them.',
    href: '/manifestos/beyond-leads',
    cta: 'Read manifesto',
  },
  {
    num: '§ 02',
    eyebrow: 'Manifesto',
    date: 'Mar 2026',
    title: 'Value-Led Growth.',
    teaser:
      'Organizational complexity has quietly become the product — the thing that consumes resources, demands attention, and shapes every decision. Growth, properly understood, is what happens when an organization stops manufacturing complexity and starts creating value.',
    quote: 'Growth is what happens when an organization stops manufacturing complexity and starts creating value.',
    href: '/manifestos/value-led-growth',
    cta: 'Read manifesto',
  },
  {
    num: '§ 03',
    eyebrow: 'Positioning paper',
    date: 'May 2026',
    title: 'Where VCP sits in the stack.',
    teaser:
      'Two protocols have emerged to solve the layers below value creation: MCP for capability, HCP for human context. Neither one creates value on its own. Neither one was ever supposed to. This is the layer that does.',
    quote: 'MCP for capability. HCP for human context. VCP is the layer that creates value.',
    href: '/positioning',
    cta: 'Read paper',
  },
];

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Manifestos and positioning',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: MANIFESTOS.length,
  itemListElement: MANIFESTOS.map((m, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: m.title,
    url: `${SITE.url}${m.href}`,
  })),
};

export default function ManifestosHubPage() {
  return (
    <>
      <JsonLd data={itemListLd} />
      <HubArchetype
        eyebrow="§ Manifestos · Index of 3"
        title="Why this protocol exists."
        lead="Three long-form artifacts arguing the case the protocol formalizes. Each names a condition the industrial-age vocabulary of growth cannot describe, and a frame an AI-native organization can operate from instead."
      >
        <ul className="hub-grid hub-grid-2">
          {MANIFESTOS.map((m) => (
            <li key={m.href}>
              <a href={m.href} className="hub-card">
                <p className="hub-card-eyebrow">
                  {m.num} · {m.eyebrow} · {m.date}
                </p>
                <h2 className="hub-card-title">{m.title}</h2>
                <p className="hub-card-body">{m.teaser}</p>
                <blockquote className="hub-card-quote">{m.quote}</blockquote>
                <div className="hub-card-foot">
                  <span className="hub-card-meta">{m.cta}</span>
                  <span aria-hidden="true" className="hub-card-arrow">
                    &rarr;
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </HubArchetype>
    </>
  );
}
