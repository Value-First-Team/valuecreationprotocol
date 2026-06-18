/**
 * CanonArchetype — shared shell for every methodology canon page on vcp.com.
 *
 * React port of CanonArchetype.astro. Emits the exact same class names; all
 * visual treatment lives in vcp-archetypes.css (ported verbatim). Server-safe.
 *
 * Anatomy: hero (eyebrow + display + lead + optional spec-meta) → body slot →
 * peer cross-citation (auto-suppresses when peerSlug is null) → implementer band.
 */
import type { ReactNode } from 'react';
import { SITE, getCrossCitation } from '@/lib/site';

export interface SpecMetaItem {
  label: string;
  value: string;
}

export interface CanonArchetypeProps {
  /** Concept name in mono caps, e.g. "THE VALUE PATH". */
  eyebrow: string;
  /** Display heading — the concept's name. May contain HTML. */
  title: string;
  /** Lead paragraph below the title. */
  lead: string;
  /** Path on vcp.com (e.g. "/value-path") — drives the cross-citation lookup. */
  path: string;
  /** Optional spec-meta strip rows. */
  specMeta?: SpecMetaItem[];
  children: ReactNode;
}

export function CanonArchetype({
  eyebrow,
  title,
  lead,
  path,
  specMeta = [],
  children,
}: CanonArchetypeProps) {
  const cite = getCrossCitation(path);
  const peerUrl = cite?.peerSlug ? `${SITE.implementer.url}${cite.peerSlug}` : null;

  return (
    <article className="canon">
      <header className="canon-hero">
        <div className="canon-hero-inner">
          <p className="canon-eyebrow">
            <span>{eyebrow}</span>
            <span className="canon-eyebrow-rule" aria-hidden="true" />
          </p>
          <h1 className="canon-display" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="canon-lead">{lead}</p>
          {specMeta.length > 0 && (
            <dl className="canon-spec">
              {specMeta.map((row) => (
                <div className="canon-spec-row" key={row.label + row.value}>
                  <dt className="canon-spec-label">{row.label}</dt>
                  <dd className="canon-spec-value">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      <div className="canon-body">
        <div className="canon-body-inner">{children}</div>
      </div>

      {peerUrl && cite?.peerLabel && (
        <aside className="canon-peer">
          <div className="canon-peer-inner">
            <p className="canon-peer-eyebrow">See also</p>
            <p className="canon-peer-body">
              <a href={peerUrl} target="_blank" rel="noopener noreferrer" className="canon-peer-link">
                {cite.peerLabel}
              </a>
              <span className="canon-peer-trail"> — the implementing firm&apos;s view.</span>
            </p>
          </div>
        </aside>
      )}

      <section className="canon-impl">
        <div className="canon-impl-inner">
          <p className="canon-impl-eyebrow">Protocol home</p>
          <p className="canon-impl-body">
            VCP is originated and canonically implemented by{' '}
            <a href={SITE.implementer.url} target="_blank" rel="noopener noreferrer" className="canon-impl-link">
              Value-First Team
            </a>
            . Anyone may read, cite, and operate the protocol independently of firm engagement.
          </p>
        </div>
      </section>
    </article>
  );
}
