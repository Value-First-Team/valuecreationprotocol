/**
 * CanonArchetype — shared shell for every methodology canon page on vcp.com.
 *
 * React port of CanonArchetype.astro. Emits the exact same class names; all
 * visual treatment lives in vcp-archetypes.css (ported verbatim). Server-safe.
 *
 * Anatomy: hero (eyebrow + display + lead, OR a page's own `opening`, plus the
 * optional spec-meta) → body slot → peer cross-citation (auto-suppresses when
 * peerSlug is null) → implementer band.
 */
import type { ReactNode } from 'react';
import { SITE, getCrossCitation, peerIsLive } from '@/lib/site';

export interface SpecMetaItem {
  label: string;
  value: string;
}

export interface CanonArchetypeProps {
  /** Concept name in mono caps, e.g. "THE VALUE PATH". Omit when `opening` is given. */
  eyebrow?: string;
  /** Display heading — the concept's name. May contain HTML. Omit when `opening` is given. */
  title?: string;
  /** Lead paragraph below the title. Omit when `opening` is given. */
  lead?: string;
  /**
   * THE PAGE'S OWN OPENING, IN PLACE OF THIS ARCHETYPE'S THREE-PART HERO.
   *
   * A canonical framework page opens on the constellation's shared framework
   * STAGE (Chris, 2026-09-06, and the word mapping on 2026-09-07) — the pinned
   * near-black ground a deck opens on, carrying the framework's name as the
   * page's one h1, canon's definition sentence under it, and the framework's own
   * accepted visual. That stage is the FRAMEWORK's opening, not this property's
   * frame, and it is the same on every property that hosts the framework;
   * everything around it here — the spec-meta strip, the peer cross-citation, the
   * implementer band, this site's ground and chrome — is genuinely this
   * property's and stays exactly as it is.
   *
   * So the hero takes a slot rather than the route taking a second frame. When
   * `opening` is given this header renders it INSTEAD of the eyebrow/title/lead
   * trio and keeps the spec strip beneath it. The page's one h1 then comes from
   * whatever is in the slot — which is why the trio is not also rendered: two h1s
   * is a page whose title is decoration, and it is invisible to every other check.
   */
  opening?: ReactNode;
  /** Path on vcp.com (e.g. "/value-path") — drives the cross-citation lookup. */
  path: string;
  /** Optional spec-meta strip rows. */
  specMeta?: SpecMetaItem[];
  children: ReactNode;
}

export async function CanonArchetype({
  eyebrow,
  title,
  lead,
  opening,
  path,
  specMeta = [],
  children,
}: CanonArchetypeProps) {
  const cite = getCrossCitation(path);
  const peerCandidate = cite?.peerSlug ? `${SITE.implementer.url}${cite.peerSlug}` : null;
  // The cross-citation suppresses itself when the peer is not live. The table was
  // verified by hand once (2026-05-12) and drifted: on the 2026-09-04 walk the
  // /beliefs peer answered 404 on the live page. The probe runs at build time, so a
  // static export never ships a dead "See also".
  const peerUrl = peerCandidate && (await peerIsLive(peerCandidate)) ? peerCandidate : null;

  return (
    <article className="canon">
      <header className="canon-hero">
        <div className="canon-hero-inner">
          {opening ?? (
            <>
              <p className="canon-eyebrow">
                <span>{eyebrow}</span>
                <span className="canon-eyebrow-rule" aria-hidden="true" />
              </p>
              <h1 className="canon-display" dangerouslySetInnerHTML={{ __html: title ?? '' }} />
              <p className="canon-lead">{lead}</p>
            </>
          )}
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
