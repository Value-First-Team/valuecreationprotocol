/**
 * /engagement — Read · Implement · Contribute · Reach pathway hub. React port
 * of src/pages/engagement.astro. .hub-pathway* / .hub-attribution styling lives
 * in vcp-archetypes.css (HubArchetype block).
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Engagement',
  description:
    'Four ways to engage with the Value Creation Protocol: read it, implement it, contribute to it, or reach the originating firm for guided implementation.',
  openGraph: { url: SITE.url + '/engagement', images: ['/og/og-engagement.jpg'] },
  alternates: { canonical: SITE.url + '/engagement' },
};

interface PathwayLink {
  label: string;
  href: string;
  external?: boolean;
}
interface Pathway {
  num: string;
  title: string;
  body: string;
  links: PathwayLink[];
  note?: string;
}

const PATHWAYS: Pathway[] = [
  {
    num: '§ 01 · Read',
    title: 'Read',
    body: 'Start here if you are new. The protocol home is navigable in a session: positioning paper for the why, methodology canon for the operating model, manifestos for the arguments behind the frame.',
    links: [
      { label: 'Protocol home', href: '/' },
      { label: 'Positioning paper', href: '/positioning' },
      { label: 'Methodology canon', href: '/methodology' },
      { label: 'Manifestos', href: '/manifestos' },
      { label: 'Glossary', href: '/glossary' },
    ],
  },
  {
    num: '§ 02 · Implement',
    title: 'Implement',
    body: 'Apply VCP in your own organization. The protocol is platform-agnostic; the canonical implementing substrate documented here is HubSpot, but the methodology operates on any system you can configure.',
    links: [
      { label: 'Encoding stack', href: '/encoding-stack' },
      { label: 'HubSpot as CVP', href: '/hubspot-cvp' },
      { label: 'AI-Native Shift', href: '/ai-native-shift' },
      { label: 'Three-Org Model', href: '/three-orgs' },
      { label: 'Four Unified Views', href: '/unified-views' },
    ],
    note: 'No license, no permission required. The protocol is open.',
  },
  {
    num: '§ 03 · Contribute',
    title: 'Contribute',
    body: 'The encoding stack is in active development. Lexicon entries, VCP-Lang refinements, Value Graph extensions, and methodology canon corrections are welcome — under the editorial governance of the originating firm.',
    links: [
      { label: 'Lexicon', href: '/lexicon' },
      { label: 'VCP-Lang', href: '/vcp-lang' },
      { label: 'Value Graph', href: '/value-graph' },
      { label: 'GitHub', href: SITE.github, external: true },
    ],
    note: 'A formal contribution process is being formed. In the meantime, reach the originating firm.',
  },
];

const REACH = {
  num: '§ 04 · Reach',
  title: 'Reach the implementer',
  body: 'For organizations that want guided implementation — pattern recognition, architecture review, methodology coaching, or substrate configuration — the originating firm is the canonical place to begin. The protocol does not require the firm; the firm exists because protocols benefit from a reference implementer, and because the distance between reading a protocol and operating an organization on top of it is bigger than most teams realize on first read.',
  cta: 'valuefirstteam.com',
  href: SITE.implementer.url,
};

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Engagement pathways',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: 4,
  itemListElement: [
    ...PATHWAYS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${SITE.url}/engagement#${p.title.toLowerCase()}`,
    })),
    { '@type': 'ListItem', position: 4, name: REACH.title, url: REACH.href },
  ],
};

export default function EngagementPage() {
  return (
    <>
      <JsonLd data={itemListLd} />
      <HubArchetype
        eyebrow="§ Engagement · Four Pathways"
        title="Three doors in. One open protocol."
        lead="The protocol is open. Anyone can read it, implement it, and contribute to it. The originating firm exists for organizations that want guided implementation — the fourth door, opened by request."
      >
        <ul className="hub-grid hub-grid-pathways">
          {PATHWAYS.map((p) => (
            <li id={p.title.toLowerCase()} key={p.title}>
              <article className="hub-pathway">
                <header className="hub-pathway-head">
                  <span className="hub-pathway-num">{p.num}</span>
                </header>
                <h2 className="hub-pathway-title">{p.title}</h2>
                <p className="hub-pathway-body">{p.body}</p>
                <ul className="hub-pathway-list">
                  {p.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {p.note && <p className="hub-pathway-note">{p.note}</p>}
              </article>
            </li>
          ))}

          <li id={REACH.title.toLowerCase().replace(/\s+/g, '-')}>
            <article className="hub-pathway hub-pathway-invert">
              <header className="hub-pathway-head">
                <span className="hub-pathway-num">{REACH.num}</span>
              </header>
              <h2 className="hub-pathway-title">{REACH.title}</h2>
              <p className="hub-pathway-body">{REACH.body}</p>
              <a href={REACH.href} target="_blank" rel="noopener noreferrer" className="hub-pathway-cta">
                {REACH.cta} <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="hub-pathway-note">
                VCP was originated and is canonically implemented by Value-First Team. The protocol
                does not require firm engagement.
              </p>
            </article>
          </li>
        </ul>

        <section className="hub-attribution">
          <p className="hub-attribution-eyebrow">Open protocol, opinionated implementation</p>
          <h2 className="hub-attribution-title">The protocol is open. The implementation is opinionated.</h2>
          <p className="hub-attribution-body">
            Both statements carry weight. Anyone can implement VCP — the methodology is documented,
            the encoding stack is published, the principles are stated with the contrastive precision
            protocols require. The originating firm holds opinions about how to do that well, formed
            over years of practice across many organizations. Those opinions are available through{' '}
            <a href={SITE.implementer.url} target="_blank" rel="noopener noreferrer">
              Value-First Team
            </a>
            ; they are not preconditions for using the protocol.
          </p>
        </section>
      </HubArchetype>
    </>
  );
}
