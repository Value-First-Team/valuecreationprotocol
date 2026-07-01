/**
 * / — Homepage. The protocol overview. React port of src/pages/index.astro.
 * Hand-crafted layout; all visual rhythm in vcp-archetypes.css (Homepage block).
 * Server Component (SSG). Ported faithfully — no content dropped.
 */
import type { Metadata } from 'next';
import { SITE, canonPageStats } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Open Protocol Home',
  description:
    'The Value Creation Protocol (VCP) is an open framework for designing systems where value flows naturally between people, organizations, and AI. A peer to MCP and HCP in the AI-native protocol stack.',
  openGraph: { url: SITE.url + '/', images: ['/og/og-home.jpg'] },
  alternates: { canonical: SITE.url + '/' },
};

const AT_A_GLANCE = [
  { label: 'Status', value: 'v0.1 · Draft · in review' },
  { label: 'Verified', value: '12 May 2026' },
  {
    label: 'Canon pages',
    // Derived from CANON_PAGE_ARCHETYPES at build time — self-maintains as the
    // site's canon-page inventory grows, rather than a hardcoded literal that
    // silently drifts (the defect being fixed).
    value: `${canonPageStats.pageCount} across ${canonPageStats.archetypeCount} archetypes`,
  },
  { label: 'Peers', value: 'MCP · HCP' },
] as const;

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

const ENTRY_CARDS = [
  {
    num: '§ 02.1',
    eyebrow: 'Encoding stack',
    title: 'Lexicon · VCP-Lang · Value Graph',
    body: 'The technical specification: three layers that compile a value statement into an addressable graph the protocol can operate on.',
    meta: '3 SPECS · v0.1',
    href: '/encoding-stack',
  },
  {
    num: '§ 02.2',
    eyebrow: 'Methodology canon',
    title: 'The Value Path, twelve traps, three orgs',
    body: 'Twelve long-form chapters covering the operating model AI-native organizations adopt to create value across customer, operations, and finance.',
    meta: '12 CHAPTERS',
    href: '/methodology',
  },
  {
    num: '§ 02.3',
    eyebrow: 'Manifestos',
    title: 'Beyond leads. Beyond funnels.',
    body: 'Position pieces on why the industrial-age vocabulary of growth, sales, and operations can not carry an AI-native organization.',
    meta: '3 ESSAYS',
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeLd} />

      {/* HERO */}
      <section className="vcp-hero">
        <div className="vcp-hero-inner">
          <div className="vcp-hero-grid">
            <div className="vcp-hero-text">
              <p className="t-eyebrow vcp-hero-eyebrow">An open protocol · v0.1</p>
              <h1 className="t-display vcp-hero-h1">
                Value, drawn open and <em className="vcp-hero-accent">operable.</em>
              </h1>
              <p className="t-lead vcp-hero-lead vcp-hero-lead-cap">
                The Value Creation Protocol is a peer-level open protocol for value creation in
                AI-native organizations &mdash; authored, refined, and operated by Value-First
                Team. Read, cite, and run it on your own work.
              </p>
              <div className="vcp-hero-ctas">
                <a href="/encoding-stack" className="vcp-btn vcp-btn-primary">
                  Read the spec
                  <span aria-hidden="true" className="vcp-arrow">
                    &rarr;
                  </span>
                </a>
                <a href="/protocol-stack" className="vcp-btn vcp-btn-ghost">
                  See the protocol stack
                  <span aria-hidden="true" className="vcp-arrow">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>

            <aside className="vcp-glance">
              <h2 className="vcp-glance-head">At a glance</h2>
              <dl className="vcp-glance-list">
                {AT_A_GLANCE.map((row) => (
                  <div className="vcp-glance-row" key={row.label}>
                    <dt className="vcp-glance-label">{row.label}</dt>
                    <dd className="vcp-glance-value">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
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
