/**
 * /methodology — Methodology hub. React port of src/pages/methodology/index.astro.
 * Indexes the twelve canon pages in five thematic groups. Card content sourced
 * from METHODOLOGY_PAGES (single source of truth in lib/site.ts).
 */
import type { Metadata } from 'next';
import { SITE, METHODOLOGY_PAGES } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Methodology Canon',
  description:
    'The methodology canon. Twelve pages indexing the operating principles, frameworks, patterns, programs, and implementation guidance the Value Creation Protocol encodes.',
  openGraph: { url: SITE.url + '/methodology', images: ['/og/og-methodology.jpg'] },
  alternates: { canonical: SITE.url + '/methodology' },
};

type Slug =
  | '/beliefs' | '/twelve-traps'
  | '/value-path' | '/three-orgs' | '/unified-views'
  | '/value-loop' | '/teach' | '/realities'
  | '/ai-native-shift' | '/value-led-growth'
  | '/hubspot-cvp' | '/cvp-vs-vcp';

interface Group {
  label: string;
  title: string;
  note: string;
  slugs: Slug[];
  meta?: Partial<Record<Slug, string>>;
}

const GROUPS: Group[] = [
  {
    label: '§ 01 · Operating principles',
    title: 'Operating principles',
    note: 'The philosophical foundation. Read these first; everything else assumes them.',
    slugs: ['/beliefs', '/twelve-traps'],
    meta: { '/beliefs': '5 beliefs', '/twelve-traps': '12 traps' },
  },
  {
    label: '§ 02 · Frameworks',
    title: 'Frameworks',
    note: 'The structural models the protocol encodes — relationships, organizations, visibility.',
    slugs: ['/value-path', '/three-orgs', '/unified-views'],
    meta: { '/value-path': '8 stages', '/three-orgs': '3 orgs', '/unified-views': '4 views' },
  },
  {
    label: '§ 03 · Patterns',
    title: 'Patterns',
    note: 'The operating loops and values that turn the frameworks into daily practice.',
    slugs: ['/value-loop', '/teach', '/realities'],
    meta: { '/value-loop': '4 stages', '/teach': '5 values', '/realities': '14 realities' },
  },
  {
    label: '§ 04 · Programs',
    title: 'Programs',
    note: 'Two named programs that shape how organizations grow and how teams transform.',
    slugs: ['/ai-native-shift', '/value-led-growth'],
    meta: { '/ai-native-shift': 'transformation', '/value-led-growth': 'growth' },
  },
  {
    label: '§ 05 · Implementation',
    title: 'Implementation',
    note: 'Where the protocol meets the substrate — and how to keep them straight.',
    slugs: ['/hubspot-cvp', '/cvp-vs-vcp'],
    meta: { '/hubspot-cvp': 'substrate', '/cvp-vs-vcp': 'disambiguation' },
  },
];

const PAGE_BY_SLUG = Object.fromEntries(METHODOLOGY_PAGES.map((p) => [p.href, p]));

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Methodology Canon',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: METHODOLOGY_PAGES.length,
  itemListElement: METHODOLOGY_PAGES.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.label,
    url: `${SITE.url}${p.href}`,
  })),
};

export default function MethodologyPage() {
  return (
    <>
      <JsonLd data={itemListLd} />
      <HubArchetype
        eyebrow="§ Methodology · Index of 12"
        title="The methodology canon."
        lead="Twelve pages — five sets — covering the operating principles, frameworks, patterns, programs, and implementation guidance the protocol encodes. Pick the set that matches what you're trying to do; the canon is navigable from any page once you're in."
      >
        {GROUPS.map((group, gIdx) => (
          <section className="hub-group" aria-labelledby={`hub-group-${gIdx}`} key={group.title}>
            <p className="hub-group-label">{group.label}</p>
            <h2 className="hub-group-title" id={`hub-group-${gIdx}`}>
              {group.title}
            </h2>
            <p className="hub-group-note">{group.note}</p>

            <ul className="hub-grid">
              {group.slugs.map((slug) => {
                const page = PAGE_BY_SLUG[slug];
                if (!page) return null;
                const meta = group.meta?.[slug];
                return (
                  <li key={slug}>
                    <a href={page.href} className="hub-card">
                      <p className="hub-card-eyebrow">{group.title}</p>
                      <h3 className="hub-card-title">{page.label}</h3>
                      <p className="hub-card-body">{page.summary}</p>
                      <div className="hub-card-foot">
                        <span className="hub-card-meta">{meta ?? 'Canon page'}</span>
                        <span aria-hidden="true" className="hub-card-arrow">
                          &rarr;
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </HubArchetype>
    </>
  );
}
