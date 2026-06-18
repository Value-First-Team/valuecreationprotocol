/**
 * /encoding-stack — overview hub for Lexicon → VCP-Lang → Value Graph.
 * React port of src/pages/encoding-stack.astro. .encoding-* styling lives in
 * vcp-archetypes.css (ported from the page's <style> block).
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { HubArchetype } from '@/components/HubArchetype';
import { Diagram } from '@/components/Diagram';

export const metadata: Metadata = {
  title: 'Encoding Stack',
  description:
    'The three-layer substrate that makes VCP machine-parseable: Lexicon (lexical), VCP-Lang (structural), Value Graph (relational).',
  openGraph: { url: SITE.url + '/encoding-stack', images: ['/og/og-encoding-stack.jpg'] },
  alternates: { canonical: SITE.url + '/encoding-stack' },
};

const LAYER_CARDS = [
  {
    eyebrow: 'Layer A',
    title: 'Lexicon (lexical)',
    body: 'The structured vocabulary of VCP. Each entry encodes a load-bearing term with its industrial counterpart, operational definition, distinguishing signals, and contrastive training pairs. The Lexicon is the formal evolution of the Value-First Language Translation Guide.',
    cta: 'Read the Lexicon v0.1',
    href: '/lexicon',
  },
  {
    eyebrow: 'Layer B',
    title: 'VCP-Lang (structural)',
    body: 'The grammar for declaring Values, Context, and Trust in parseable syntax. VCP-Lang declarations are structured statements AI systems can read, validate, and execute against. VCP-Lang descends from the March 2026 HCP-Lang work.',
    cta: 'Read the VCP-Lang spec v0.1',
    href: '/vcp-lang',
  },
  {
    eyebrow: 'Layer C',
    title: 'Value Graph (relational)',
    body: 'The specification for encoding mutual value creation as a platform-agnostic relational structure. The Value Graph formalizes relationships the Value-First methodology already describes — particularly the Three-Org Model and the Value Path — into a graph specification AI systems can traverse.',
    cta: 'Read the Value Graph spec v0.1',
    href: '/value-graph',
  },
];

export default function EncodingStackPage() {
  return (
    <HubArchetype
      eyebrow="Substrate · Overview"
      title="The Encoding Stack"
      lead="VCP requires substrate to be machine-parseable. The substrate is a three-layer encoding stack — lexical, structural, relational."
    >
      <dl className="encoding-meta" aria-label="Document status">
        <div className="encoding-meta-row">
          <dt className="encoding-meta-label">Version</dt>
          <dd className="encoding-meta-value">v0.1</dd>
        </div>
        <div className="encoding-meta-row">
          <dt className="encoding-meta-label">Status</dt>
          <dd className="encoding-meta-value encoding-meta-status">Active</dd>
        </div>
        <div className="encoding-meta-row">
          <dt className="encoding-meta-label">Verified</dt>
          <dd className="encoding-meta-value">12 May 2026</dd>
        </div>
        <div className="encoding-meta-row">
          <dt className="encoding-meta-label">Cite</dt>
          <dd className="encoding-meta-value">valuecreationprotocol.com/encoding-stack</dd>
        </div>
      </dl>

      <Diagram
        name="encoding-stack"
        alt="Three layers: Lexicon (lexical) → VCP-Lang (structural) → Value Graph (relational)"
        caption="Each layer makes a different aspect of VCP machine-executable."
      />

      <section className="encoding-intro">
        <h2 className="t-h2">Why an encoding stack</h2>
        <p>
          Foundation models default to industrial-age vocabulary because that vocabulary dominates
          training data. Prompt engineering can shift outputs at the surface, but the underlying
          defaults reassert under load — under context pressure, ambiguity, or when the model has to
          reason about novel situations.
        </p>
        <p>
          The encoding stack gives VCP a substrate that does not depend on prompt-level overrides.
          Each layer makes a different aspect of VCP machine-executable.
        </p>
      </section>

      <section className="encoding-layers">
        <p className="t-eyebrow encoding-layers-eyebrow">The three layers</p>
        <ul className="hub-grid">
          {LAYER_CARDS.map((card) => (
            <li key={card.href}>
              <a href={card.href} className="hub-card">
                <p className="hub-card-eyebrow">{card.eyebrow}</p>
                <h3 className="hub-card-title">{card.title}</h3>
                <p className="hub-card-body">{card.body}</p>
                <div className="hub-card-foot">
                  <span className="hub-card-meta">{card.cta}</span>
                  <span aria-hidden="true" className="hub-card-arrow">
                    &rarr;
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="encoding-close">
        <h2 className="t-h2">How the layers work together</h2>
        <p>
          A VCP-aligned system declares its values, context, and trust commitments using{' '}
          <em>VCP-Lang</em>, references terms whose meaning is fixed by the <em>Lexicon</em>, and
          operates over relationships modeled in the <em>Value Graph</em>. An AI system reading those
          declarations can verify alignment, surface drift, and generate outputs that respect the
          protocol without re-deriving the methodology from natural-language description.
        </p>

        <h2 className="t-h2">Status</h2>
        <p>
          All three layers are at v0.1 — defined, scoped, and entering implementation. The Lexicon
          has the longest history (descended from a multi-year language guide). VCP-Lang is the
          newest layer. The Value Graph is being formalized from existing relational frameworks.
        </p>
        <p>
          The encoding stack is not VCP. It is the substrate that makes VCP executable. VCP can be
          referenced without invoking the encoding stack; the encoding stack should not be referenced
          without invoking VCP, because the stack exists to serve the protocol.
        </p>
      </section>
    </HubArchetype>
  );
}
