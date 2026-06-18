/**
 * /positioning — Value Creation Protocol: A Positioning Paper. React port of
 * src/pages/positioning.astro. Body: staged canon markdown; meta from Sanity.
 * Uses the ManifestoArchetype aside (protocol-stack figure) + pull-quote.
 */
import type { Metadata } from 'next';
import { SITE, PROTOCOL_PEERS } from '@/lib/site';
import { ManifestoArchetype } from '@/components/ManifestoArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Positioning Paper',
  description:
    'Where the Value Creation Protocol sits in the AI-native protocol stack — alongside MCP and HCP — and why a methodology layer exists at all.',
  openGraph: { url: SITE.url + '/positioning', images: ['/og/og-positioning.jpg'] },
  alternates: { canonical: SITE.url + '/positioning' },
};

export default async function PositioningPage() {
  const { html: rawHtml } = renderStagedMarkdown(STAGED_FILES.positioning);
  const html = stripFirstH1(rawHtml);
  const meta = await getCanonDoc('vcp-positioning-paper');

  let eyebrowDate: string | undefined;
  if (meta?.effectiveDate) {
    const d = new Date(meta.effectiveDate);
    if (!isNaN(d.getTime())) {
      eyebrowDate = d.toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
    }
  }

  return (
    <ManifestoArchetype
      eyebrowDate={eyebrowDate}
      title="A Positioning Paper"
      lead="Two protocols have emerged to solve the layers below value creation: MCP for capability, HCP for human context. Neither one creates value on its own. Neither one was ever supposed to. This is the layer that does."
      byline="Value-First Team"
      filedUnder="Positioning · Protocol Stack"
      path="/positioning"
      aside={
        <section className="manifesto-aside" aria-label="The protocol stack">
          <div className="manifesto-aside-inner">
            <div className="manifesto-aside-grid">
              <figure className="manifesto-aside-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/diagrams/protocol-stack.svg"
                  alt="Protocol stack diagram: MCP for capability, HCP for human context, VCP for methodology — three peer protocols read bottom-up."
                  loading="lazy"
                />
              </figure>
              <aside className="manifesto-aside-card">
                <p className="manifesto-aside-card-eyebrow">The Stack</p>
                <p className="manifesto-aside-card-body">
                  VCP sits atop{' '}
                  <a href={PROTOCOL_PEERS.mcp.url} target="_blank" rel="noopener noreferrer">
                    {PROTOCOL_PEERS.mcp.short}
                  </a>{' '}
                  ({PROTOCOL_PEERS.mcp.role}) and{' '}
                  <a href={PROTOCOL_PEERS.hcp.url} target="_blank" rel="noopener noreferrer">
                    {PROTOCOL_PEERS.hcp.short}
                  </a>{' '}
                  ({PROTOCOL_PEERS.hcp.role}). Each layer is independent; together they form the
                  substrate for AI-native operations.
                </p>
              </aside>
            </div>
          </div>
        </section>
      }
      pullQuote={
        <section className="manifesto-pullquote">
          <div className="manifesto-pullquote-inner">
            <p className="manifesto-pullquote-body">
              The protocol stack is <strong>not a hierarchy.</strong> It is a set of peers.
            </p>
          </div>
        </section>
      }
    >
      <div className="manifesto-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </ManifestoArchetype>
  );
}
