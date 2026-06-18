/**
 * ManifestoArchetype — shared shell for the manifesto-class pages on vcp.com
 * (/manifestos/beyond-leads, /manifestos/value-led-growth, /positioning).
 * React port of ManifestoArchetype.astro — same class names, styling in
 * vcp-archetypes.css. Server-safe.
 *
 * The Astro named slots (slot="aside", slot="pull-quote") become optional
 * `aside` / `pullQuote` ReactNode props; the default slot becomes `children`.
 */
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';

export interface ManifestoArchetypeProps {
  /** Eyebrow date — "Month YYYY" string. Omit to suppress (no invented dates). */
  eyebrowDate?: string;
  /** Display heading — the manifesto's title. May contain HTML. */
  title: string;
  /** Optional lead paragraph, italic-set. */
  lead?: string;
  /** Optional byline row, e.g. "Value-First Team". */
  byline?: string;
  /** Optional filed-under row. */
  filedUnder?: string;
  /** Path on vcp.com — used in the cite line. */
  path: string;
  /** Optional aside block (sits between hero and body). */
  aside?: ReactNode;
  /** Optional full-bleed pull-quote block. */
  pullQuote?: ReactNode;
  children: ReactNode;
}

export function ManifestoArchetype({
  eyebrowDate,
  title,
  lead,
  byline,
  filedUnder,
  path,
  aside,
  pullQuote,
  children,
}: ManifestoArchetypeProps) {
  const eyebrowParts: string[] = ['A Manifesto'];
  if (eyebrowDate) eyebrowParts.push(eyebrowDate);
  eyebrowParts.push('valuecreationprotocol.com');
  const eyebrowText = eyebrowParts.join(' · ').toUpperCase();
  const citeUrl = `valuecreationprotocol.com${path}`;

  return (
    <article className="manifesto">
      <header className="manifesto-hero">
        <div className="manifesto-hero-inner">
          <p className="manifesto-eyebrow">
            <span>{eyebrowText}</span>
            <span className="manifesto-eyebrow-rule" aria-hidden="true" />
          </p>
          <h1 className="manifesto-display" dangerouslySetInnerHTML={{ __html: title }} />
          {lead && <p className="manifesto-lead">{lead}</p>}
          {(byline || filedUnder) && (
            <div className="manifesto-byline">
              {byline && (
                <span className="manifesto-byline-row">
                  <span className="manifesto-byline-label">By</span>
                  <span className="manifesto-byline-value">{byline}</span>
                </span>
              )}
              {filedUnder && (
                <span className="manifesto-byline-row">
                  <span className="manifesto-byline-label">Filed under</span>
                  <span className="manifesto-byline-value">{filedUnder}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </header>

      {aside}
      {pullQuote}

      <div className="manifesto-body">
        <div className="manifesto-body-inner">{children}</div>
      </div>

      <section className="manifesto-cite" aria-label="Citation">
        <div className="manifesto-cite-inner">
          <span className="manifesto-cite-label">Cite</span>
          <span className="manifesto-cite-url">{citeUrl}</span>
        </div>
      </section>

      <section className="manifesto-impl">
        <div className="manifesto-impl-inner">
          <p className="manifesto-impl-eyebrow">Protocol home</p>
          <p className="manifesto-impl-body">
            VCP is originated and canonically implemented by{' '}
            <a href={SITE.implementer.url} target="_blank" rel="noopener noreferrer" className="manifesto-impl-link">
              Value-First Team
            </a>
            . The manifestos are published openly; anyone may read, cite, and operate the protocol independently of firm engagement.
          </p>
        </div>
      </section>
    </article>
  );
}
