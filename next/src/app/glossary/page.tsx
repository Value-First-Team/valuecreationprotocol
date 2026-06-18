/**
 * /glossary — Full canonical vocabulary. React port of src/pages/glossary.astro.
 * Sources: inline protocol/encoding terms + Sanity methodology records (build-time).
 * .glossary-* styling lives in vcp-archetypes.css.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getCoreBeliefs, getTraps, getValuePathStages, getUnifiedGoals } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Glossary',
  description:
    'The canonical vocabulary of the Value Creation Protocol — protocol-stack terms, encoding-stack terms, and the full methodology canon.',
  openGraph: { url: SITE.url + '/glossary', images: ['/og/og-glossary.jpg'] },
  alternates: { canonical: SITE.url + '/glossary' },
};

const PROTOCOL_TERMS: Array<{ term: string; def: string; link?: string }> = [
  {
    term: 'Value Creation Protocol (VCP)',
    def: 'The protocol identity of the Value-First methodology — the methodology expressed in a form that machine systems can parse, declare, and execute. Sits atop MCP and HCP in the AI-native protocol stack.',
    link: '/positioning',
  },
  {
    term: 'Model Context Protocol (MCP)',
    def: 'Gives AI systems capability — the ability to call tools, read context, and act in external systems. The bottom layer of the AI-native protocol stack.',
    link: 'https://modelcontextprotocol.io',
  },
  {
    term: 'Human Context Protocol (HCP)',
    def: 'Gives AI systems human context — the ability to represent and respect the interests, agency, and lived reality of the humans involved. The middle layer of the protocol stack.',
  },
  {
    term: 'CVP (Customer Value Platform)',
    def: 'The platform category for systems organized around customer relationships and value creation rather than internal record-keeping. HubSpot is the canonical implementing CVP for the Value-First methodology.',
    link: '/cvp-vs-vcp',
  },
  {
    term: 'Encoding Stack',
    def: 'The three-layer substrate that makes VCP machine-parseable: Lexicon (lexical), VCP-Lang (structural), Value Graph (relational).',
    link: '/encoding-stack',
  },
  {
    term: 'Value-First Lexicon',
    def: 'Layer A of the encoding stack. The structured vocabulary of VCP — each entry encodes a load-bearing term with its industrial counterpart, operational definition, and contrastive training pairs.',
    link: '/lexicon',
  },
  {
    term: 'VCP-Lang',
    def: 'Layer B of the encoding stack. The grammar for declaring Values, Context, and Trust in parseable syntax. Descends from the March 2026 HCP-Lang work.',
    link: '/vcp-lang',
  },
  {
    term: 'Value Graph',
    def: 'Layer C of the encoding stack. The specification for encoding mutual value creation as a platform-agnostic relational structure. Three-Org Model and Value Path expressed as graph traversal.',
    link: '/value-graph',
  },
  {
    term: 'Value Activated',
    def: 'The commercial state in which value has started flowing — what an industrial-age protocol would call "closed-won." Replaces the closing vocabulary because the relationship is beginning, not ending.',
  },
  {
    term: 'Mutual Value Creation',
    def: 'Value created across stakeholders, not extracted from them. Customers, employees, operators, and the organization itself are participants in value creation.',
  },
  {
    term: 'Configuration Over Customization',
    def: 'Favors configuring native platform capability over customizing bespoke architecture. Reduces consultant dependency and brittle integrations.',
  },
  {
    term: 'Just-In-Time Operations',
    def: 'Operations designed to deliver capability when needed, not to accumulate it against hypothetical need. Requires unified context as substrate.',
  },
  {
    term: 'Unified Context',
    def: 'Relationship history, preference signals, prior commitments, and current state held in one substrate. The operating layer all decisions reference. Fragmented context produces fragmented operations.',
  },
  {
    term: 'AI-Native Shift',
    def: 'The pattern of organizational transformation toward operations where AI is the substrate rather than an add-on. A methodology, not a program — implementations vary by firm.',
    link: '/ai-native-shift',
  },
  {
    term: 'Value-Led Growth',
    def: 'Growth as a consequence of value created, not a function pursued. Replaces lead generation, conversion optimization, and growth-hacking framings.',
    link: '/value-led-growth',
  },
  {
    term: 'Value Realities',
    def: 'The operational realities of value creation in AI-native systems. Each reality is paired with the Complexity Trap it counters and the commitments it implies.',
    link: '/realities',
  },
];

type GlossarySection = {
  id: string;
  title: string;
  entries: Array<{ term: string; def: string; link?: string }>;
};

export default async function GlossaryPage() {
  const [beliefs, traps, stages, unifiedGoals] = await Promise.all([
    getCoreBeliefs(),
    getTraps(),
    getValuePathStages(),
    getUnifiedGoals(),
  ]);

  const sections: GlossarySection[] = [
    { id: 'protocol-stack', title: 'Protocol Stack & Encoding Stack', entries: PROTOCOL_TERMS },
    {
      id: 'beliefs',
      title: 'Five Core Beliefs',
      entries: beliefs.map((b) => ({
        term: b.name,
        def: b.tagline ?? b.shortLabel ?? 'See Core Beliefs canon page.',
        link: '/beliefs',
      })),
    },
    {
      id: 'unified-views',
      title: 'Four Unified Views',
      entries: unifiedGoals.map((g) => ({
        term: g.name,
        def: g.description ?? 'See Unified Views canon page.',
        link: '/unified-views',
      })),
    },
    {
      id: 'value-path',
      title: 'Value Path Stages',
      entries: stages.map((s) => ({
        term: `${s.number}. ${s.name}`,
        def: s.mantra ?? s.description ?? 'See Value Path canon page.',
        link: '/value-path',
      })),
    },
    {
      id: 'traps',
      title: 'Twelve Complexity Traps',
      entries: traps.map((t) => ({
        term: t.name,
        def: 'A pattern that derails value creation. See Trap canon page.',
        link: `/twelve-traps#${t.slug?.current ?? ''}`,
      })),
    },
  ];

  const jsonLdDefinedTerms = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Value Creation Protocol Glossary',
    url: 'https://valuecreationprotocol.com/glossary',
    hasDefinedTerm: sections.flatMap((s) =>
      s.entries.map((e) => ({
        '@type': 'DefinedTerm',
        name: e.term,
        description: e.def,
        inDefinedTermSet: 'https://valuecreationprotocol.com/glossary',
      }))
    ),
  };

  return (
    <>
      <JsonLd data={jsonLdDefinedTerms} />
      <HubArchetype
        eyebrow="Reference"
        title="Glossary"
        lead="The vocabulary VCP fixes. Industrial-age defaults sit nearby in the encoding work; this page lists the load-bearing terms VCP commits to."
      >
        <nav className="glossary-toc" aria-label="Glossary sections">
          <p className="t-eyebrow glossary-toc-label">Sections</p>
          <ul className="glossary-toc-list">
            {sections.map((s) => (
              <li className="glossary-toc-item" key={s.id}>
                <a href={`#${s.id}`} className="glossary-toc-link">
                  <span>{s.title}</span>
                  <span className="glossary-toc-count">({s.entries.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {sections.map((section) => (
          <section id={section.id} className="glossary-section" key={section.id}>
            <h2 className="t-h2 glossary-section-title">{section.title}</h2>
            <dl className="glossary-entries">
              {section.entries.map((entry, i) => (
                <div className="glossary-entry" key={entry.term + i}>
                  <dt className="glossary-term">{entry.term}</dt>
                  <dd className="glossary-def">
                    {entry.def}
                    {entry.link &&
                      (entry.link.startsWith('http') ? (
                        <a href={entry.link} target="_blank" rel="noopener" className="glossary-link">
                          ↗
                        </a>
                      ) : (
                        <a href={entry.link} className="glossary-link">
                          →
                        </a>
                      ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        <p className="glossary-foot">
          Glossary entries are drawn from the canonical methodology records. For any conflict between
          this page and a canon page, the canon page wins.
        </p>
      </HubArchetype>
    </>
  );
}
