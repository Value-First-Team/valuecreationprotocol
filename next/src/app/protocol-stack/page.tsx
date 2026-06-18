/**
 * /protocol-stack — Wayfinding hub for the three-protocol comparison. React
 * port of src/pages/protocol-stack.astro.
 */
import type { Metadata } from 'next';
import { SITE, PROTOCOL_PEERS } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'The Protocol Stack',
  description:
    'Three peer protocols for AI-native operations: MCP (capability), VCP (value creation), HCP (human context). Each layer is necessary; none is sufficient on its own.',
  openGraph: { url: SITE.url + '/protocol-stack', images: ['/og/og-protocol-stack.jpg'] },
  alternates: { canonical: SITE.url + '/protocol-stack' },
};

interface ProtocolCard {
  band: 'mcp' | 'vcp' | 'hcp';
  id: string;
  name: string;
  scope: string;
  owner: string;
  status: string;
  href: string;
  linkLabel: string;
  external: boolean;
}

const PROTOCOLS: ProtocolCard[] = [
  {
    band: 'mcp',
    id: 'MCP',
    name: 'Model Context Protocol',
    scope: 'The machine-context layer. How AI systems reach tools, data, and external context — capability surfaces that make models operate against arbitrary software substrates.',
    owner: 'Anthropic',
    status: 'Released · 2024',
    href: PROTOCOL_PEERS.mcp.url,
    linkLabel: 'modelcontextprotocol.io',
    external: true,
  },
  {
    band: 'vcp',
    id: 'VCP',
    name: 'Value Creation Protocol',
    scope: 'The value-creation layer. What creates value, for whom, and why — the operating methodology that translates capability and context into realized outcomes across customer, operations, and finance.',
    owner: 'Value-First Team',
    status: 'v0.1 · Draft',
    href: '/positioning',
    linkLabel: 'Read the positioning paper',
    external: false,
  },
  {
    band: 'hcp',
    id: 'HCP',
    name: 'Human Context Protocol',
    scope: 'The human-context layer. How AI systems represent and respect human intent, authority, preferences, and history — so capability never gets aimed at the wrong audience.',
    owner: 'Community',
    status: 'HCP-Lang · Mar 2026',
    href: PROTOCOL_PEERS.hcp.url,
    linkLabel: 'humancontextprotocol.com',
    external: true,
  },
];

const itemListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI-native protocol stack',
  itemListOrder: 'https://schema.org/ItemListUnordered',
  numberOfItems: PROTOCOLS.length,
  itemListElement: PROTOCOLS.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `${p.id} — ${p.name}`,
    url: p.external ? p.href : `${SITE.url}${p.href}`,
  })),
};

export default function ProtocolStackPage() {
  return (
    <>
      <JsonLd data={itemListLd} />
      <HubArchetype
        eyebrow="§ The Protocol Stack"
        title="Three peer protocols. No hierarchy implied."
        lead="MCP is the machine-context layer. HCP is the human-context layer. VCP is the value-creation layer — what creates value, for whom, and why. They are peers because each addresses a layer the others do not reach. This page indexes the three; the bodies live on their own homes."
      >
        <ul className="hub-grid">
          {PROTOCOLS.map((p) => (
            <li key={p.id}>
              <a
                href={p.href}
                className={`hub-protocol hub-protocol-${p.band}`}
                target={p.external ? '_blank' : undefined}
                rel={p.external ? 'noopener noreferrer' : undefined}
              >
                <div className="hub-protocol-band">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/assets/marks/${p.band}-mark-tight.png`}
                    alt=""
                    width={32}
                    height={32}
                    className="hub-protocol-mark"
                  />
                  <span className="hub-protocol-id">{p.id}</span>
                </div>
                <div className="hub-protocol-body">
                  <h2 className="hub-protocol-name">{p.name}</h2>
                  <p className="hub-protocol-scope">{p.scope}</p>
                  <dl className="hub-protocol-meta">
                    <div className="hub-protocol-meta-row">
                      <dt className="hub-protocol-meta-label">Owner</dt>
                      <dd className="hub-protocol-meta-value">{p.owner}</dd>
                    </div>
                    <div className="hub-protocol-meta-row">
                      <dt className="hub-protocol-meta-label">Status</dt>
                      <dd className="hub-protocol-meta-value">{p.status}</dd>
                    </div>
                  </dl>
                  <div className="hub-protocol-foot">
                    <span className="hub-protocol-link">{p.linkLabel} &rarr;</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <figure className="hub-figure">
          <div className="hub-figure-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/diagrams/protocol-stack.svg"
              alt="Diagram of the AI-native protocol stack: MCP for capability, VCP for value creation, HCP for human context, shown as three peer layers."
              width={880}
              height={440}
              loading="lazy"
            />
          </div>
          <figcaption className="hub-figure-caption">
            Three layers, read as peers. Each is necessary; none is sufficient on its own.
          </figcaption>
        </figure>
      </HubArchetype>
    </>
  );
}
