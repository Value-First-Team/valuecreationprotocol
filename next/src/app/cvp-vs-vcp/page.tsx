/**
 * /cvp-vs-vcp — Disambiguation: Customer Value Platform vs Value Creation
 * Protocol. React port of src/pages/cvp-vs-vcp.astro. Fully static content.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'CVP vs VCP',
  description:
    'Customer Value Platform (CVP) versus Value Creation Protocol (VCP). Disambiguation — one is the platform category, the other is the protocol that runs on top of it.',
  openGraph: { url: SITE.url + '/cvp-vs-vcp', images: ['/og/og-cvp-vs-vcp.jpg'] },
  alternates: { canonical: SITE.url + '/cvp-vs-vcp' },
};

const definedTermsLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'DefinedTerm',
      name: 'Customer Value Platform',
      termCode: 'CVP',
      description:
        'A platform category — software organized around customer relationships and value creation rather than internal record-keeping. HubSpot is the canonical implementing CVP for the Value-First method.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Value Creation Protocol Glossary', url: `${SITE.url}/glossary` },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Value Creation Protocol',
      termCode: 'VCP',
      description:
        'The methodology layer of the AI-native protocol stack. Sits atop MCP (capability) and HCP (human context). Gives organizations the operating discipline to translate AI capability and human context into realized value.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Value Creation Protocol Glossary', url: `${SITE.url}/glossary` },
    },
  ],
};

export default function CvpVsVcpPage() {
  return (
    <>
      <JsonLd data={definedTermsLd} />
      <CanonArchetype
        eyebrow="CVP vs VCP"
        title="One letter apart. Two different layers."
        lead="Customer Value Platform and Value Creation Protocol are not synonyms. They are not competing names for the same idea. They name two different layers of the AI-native stack — and they were designed to compose with each other, not to be heard in isolation. This page is the canonical boundary."
        path="/cvp-vs-vcp"
        specMeta={[
          { label: 'Status', value: 'canonical disambiguation' },
          { label: 'Verified', value: '12 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/cvp-vs-vcp' },
        ]}
      >
        <ol className="canon-records">
          <li className="canon-record" id="cvp">
            <p className="canon-record-eyebrow">Customer Value Platform · the substrate</p>
            <h3 className="canon-record-title">CVP</h3>
            <p className="canon-record-mantra">&ldquo;The software your customer-facing team operates from.&rdquo;</p>
            <p className="canon-record-body">
              A <strong>platform category</strong>. Software organized around customer relationships
              and value creation rather than internal record-keeping. Configuration-driven,
              native-object-first. HubSpot is the canonical implementing CVP for the Value-First
              method. Other CVPs are possible; the category is not vendor-locked.
            </p>
            <p className="canon-record-body">When you hear &ldquo;CVP,&rdquo; think substrate.</p>
            <ul className="canon-record-tags">
              <li>
                <a href="/hubspot-cvp" className="canon-record-tag">
                  <span className="canon-record-tag-label">read</span>HubSpot as CVP
                </a>
              </li>
            </ul>
          </li>

          <li className="canon-record" id="vcp">
            <p className="canon-record-eyebrow">Value Creation Protocol · the methodology</p>
            <h3 className="canon-record-title">VCP</h3>
            <p className="canon-record-mantra">&ldquo;The operating protocol the system runs.&rdquo;</p>
            <p className="canon-record-body">
              A <strong>protocol</strong>. The methodology layer of the AI-native protocol stack.
              Sits atop MCP (capability) and HCP (human context). Gives organizations the operating
              discipline to translate AI capability and human context into realized value. Open,
              platform-agnostic, declarable.
            </p>
            <p className="canon-record-body">When you hear &ldquo;VCP,&rdquo; think methodology.</p>
            <ul className="canon-record-tags">
              <li>
                <a href="/positioning" className="canon-record-tag">
                  <span className="canon-record-tag-label">read</span>VCP positioning paper
                </a>
              </li>
            </ul>
          </li>
        </ol>

        <section className="canon-prose">
          <h2>The boundary</h2>
          <p>
            CVP is what you operate <em>on</em>. VCP is what you operate <em>by</em>.
          </p>
          <p>
            A team using HubSpot — a CVP — without VCP has the platform but no operating discipline.
            They will configure the platform around industrial-age defaults because that is what the
            foundation models in their AI tooling are trained to produce, and that is what the
            historical training data of the platform itself suggests.
          </p>
          <p>
            A team committed to VCP without a CVP has the operating discipline but no
            machine-executable substrate. They can teach the method to humans, but the AI systems
            they deploy will default to the vocabulary VCP rejects, and the gap between the team&apos;s
            language and the system&apos;s language will widen with every release.
          </p>
          <p>
            VCP plus a configured CVP is the operating arrangement. The CVP is the substrate where
            VCP runs. Other substrates are possible — the protocol is platform-agnostic by design —
            but HubSpot is the canonical implementing CVP for the Value-First method because it has
            the native objects, the configuration depth, and the public accessibility to make the
            configuration-over-customization principle operable.
          </p>

          <h2>Why the naming hurts</h2>
          <p>
            The acronyms differ by a single letter and live in adjacent conceptual space. This is
            unfortunate and intentional: both names come from the same lineage. CVP names the
            platform category that VCP runs on top of. They were never meant to be heard in
            isolation, and they are not competing for the same slot.
          </p>
          <p>
            When you need to be exact, say it long: <em>Customer Value Platform</em> for the
            substrate, <em>Value Creation Protocol</em> for the methodology. When you are working
            inside the team, context disambiguates — but when you are introducing either concept to
            someone for the first time, name the layer first and the acronym second.
          </p>

          <h2>Related canon</h2>
          <ul>
            <li>
              <a href="/hubspot-cvp">HubSpot as CVP</a> — the canonical implementing substrate
            </li>
            <li>
              <a href="/positioning">VCP positioning paper</a> — where VCP sits in the protocol stack
            </li>
            <li>
              <a href="/encoding-stack">Encoding stack</a> — what makes VCP machine-parseable
            </li>
            <li>
              <a href="/glossary">Glossary</a> — full term index
            </li>
          </ul>
        </section>
      </CanonArchetype>
    </>
  );
}
