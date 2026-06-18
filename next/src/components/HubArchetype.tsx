/**
 * HubArchetype — shared shell for the wayfinding hub pages on vcp.com
 * (/methodology, /manifestos, /protocol-stack, /engagement, /encoding-stack,
 * /glossary, /sitemap). React port of HubArchetype.astro — same class names,
 * styling in vcp-archetypes.css. Server-safe.
 */
import type { ReactNode } from 'react';
import { SITE } from '@/lib/site';

export interface HubArchetypeProps {
  /** Eyebrow text, mono caps. Hairline rule appended automatically. */
  eyebrow: string;
  /** Display heading. May contain HTML. */
  title: string;
  /** Lead paragraph below the title. */
  lead: string;
  children: ReactNode;
}

export function HubArchetype({ eyebrow, title, lead, children }: HubArchetypeProps) {
  return (
    <article className="hub">
      <header className="hub-hero">
        <div className="hub-hero-inner">
          <p className="hub-eyebrow">
            <span>{eyebrow}</span>
            <span className="hub-eyebrow-rule" aria-hidden="true" />
          </p>
          <h1 className="hub-display" dangerouslySetInnerHTML={{ __html: title }} />
          <p className="hub-lead">{lead}</p>
        </div>
      </header>

      <div className="hub-body">
        <div className="hub-body-inner">{children}</div>
      </div>

      <section className="hub-impl">
        <div className="hub-impl-inner">
          <p className="hub-impl-eyebrow">Protocol home</p>
          <p className="hub-impl-body">
            VCP is originated and canonically implemented by{' '}
            <a href={SITE.implementer.url} target="_blank" rel="noopener noreferrer" className="hub-impl-link">
              Value-First Team
            </a>
            . Anyone may read, cite, and operate the protocol independently of firm engagement.
          </p>
        </div>
      </section>
    </article>
  );
}
