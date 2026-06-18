/**
 * SpecArchetype — shared shell for the three encoding-stack spec pages
 * (/lexicon, /vcp-lang, /value-graph). React port of SpecArchetype.astro —
 * same class names, styling in vcp-archetypes.css. Server-safe.
 *
 * Hero + spec status strip → body slot → three-layer navigator (current
 * highlighted) → implementer band.
 */
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';

export type SpecLayer = 'A' | 'B' | 'C';

export interface SpecMetaRow {
  label: string;
  value: string;
  emphasis?: 'status' | 'plain';
}

export interface SpecArchetypeProps {
  layer: SpecLayer;
  title: string;
  lead: string;
  meta?: SpecMetaRow[];
  children: ReactNode;
}

const LAYERS: Record<SpecLayer, { name: string; href: string; short: string }> = {
  A: { name: 'Lexicon', short: 'A', href: '/lexicon' },
  B: { name: 'VCP-Lang', short: 'B', href: '/vcp-lang' },
  C: { name: 'Value Graph', short: 'C', href: '/value-graph' },
};

export function SpecArchetype({ layer, title, lead, meta = [], children }: SpecArchetypeProps) {
  const eyebrowText = `§ Encoding Stack · Layer ${layer}`;

  return (
    <article className="spec">
      <header className="spec-hero">
        <div className="spec-hero-inner">
          <p className="spec-eyebrow">
            <span>{eyebrowText}</span>
            <span className="spec-eyebrow-rule" aria-hidden="true" />
          </p>
          <h1 className="spec-display">{title}</h1>
          <p className="spec-lead">{lead}</p>

          {meta.length > 0 && (
            <dl className="spec-status-strip" aria-label="Specification status">
              {meta.map((row) => (
                <div className={`spec-meta-row${row.emphasis === 'status' ? ' is-status' : ''}`} key={row.label}>
                  <dt className="spec-meta-label">{row.label}</dt>
                  <dd className="spec-meta-value">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <div className="spec-body">
        <div className="spec-body-inner">{children}</div>
      </div>

      <nav className="spec-nav" aria-label="Encoding stack layers">
        <div className="spec-nav-inner">
          <p className="spec-nav-eyebrow">Encoding stack</p>
          <ol className="spec-nav-list">
            {(['A', 'B', 'C'] as SpecLayer[]).map((key) => {
              const L = LAYERS[key];
              const isCurrent = key === layer;
              return (
                <li className={`spec-nav-item${isCurrent ? ' is-current' : ''}`} key={key}>
                  {isCurrent ? (
                    <span className="spec-nav-link" aria-current="page">
                      <span className="spec-nav-mark">Layer {L.short}</span>
                      <span className="spec-nav-name">{L.name}</span>
                    </span>
                  ) : (
                    <a href={L.href} className="spec-nav-link">
                      <span className="spec-nav-mark">Layer {L.short}</span>
                      <span className="spec-nav-name">{L.name}</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="spec-nav-trail">
            <a href="/encoding-stack" className="spec-nav-overview">
              Encoding stack overview →
            </a>
          </p>
        </div>
      </nav>

      <section className="spec-impl">
        <div className="spec-impl-inner">
          <p className="spec-impl-eyebrow">Protocol home</p>
          <p className="spec-impl-body">
            VCP is originated and canonically implemented by{' '}
            <a href={SITE.implementer.url} target="_blank" rel="noopener noreferrer" className="spec-impl-link">
              Value-First Team
            </a>
            . The encoding stack is published openly; anyone may read, cite, and operate the spec independently of firm engagement.
          </p>
        </div>
      </section>
    </article>
  );
}
