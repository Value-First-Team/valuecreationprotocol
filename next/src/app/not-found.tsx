/**
 * 404 — Not found. Rendered by Next.js for any unmatched route. Uses the VCP
 * editorial chrome (canon-impl-style band) consistent with the protocol home.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page does not exist on the Value Creation Protocol home.',
};

export default function NotFound() {
  return (
    <section className="canon-hero">
      <div className="canon-hero-inner">
        <p className="canon-eyebrow">
          <span>404 · Not found</span>
          <span className="canon-eyebrow-rule" aria-hidden="true" />
        </p>
        <h1 className="canon-display">This page isn&apos;t part of the protocol home.</h1>
        <p className="canon-lead">
          The page you were looking for doesn&apos;t exist here. Start from the protocol home, or
          jump to the methodology canon.
        </p>
        <div className="vcp-hero-ctas" style={{ marginTop: '2rem' }}>
          <a href="/" className="vcp-btn vcp-btn-primary">
            Protocol home
            <span aria-hidden="true" className="vcp-arrow">
              &rarr;
            </span>
          </a>
          <a href="/methodology" className="vcp-btn vcp-btn-ghost">
            Methodology canon
            <span aria-hidden="true" className="vcp-arrow">
              &rarr;
            </span>
          </a>
        </div>
      </div>
      <span style={{ display: 'none' }}>{SITE.name}</span>
    </section>
  );
}
