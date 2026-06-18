/**
 * /manifestos/beyond-leads — Beyond "Leads". React port of
 * src/pages/manifestos/beyond-leads.astro. Body: staged canon markdown; meta
 * from Sanity. The forbidden-vocab rule does not apply to manifesto prose that
 * NAMES the terms it argues against (inbound/cited usage, per the enforcement
 * over-sanitizing trigger).
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { ManifestoArchetype } from '@/components/ManifestoArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Beyond “Leads”',
  description:
    'The industrial-age vocabulary of B2B cannot carry an AI-native organization. A manifesto for humanized, collaborative growth.',
  openGraph: { url: SITE.url + '/manifestos/beyond-leads', images: ['/og/og-manifestos-beyond-leads.jpg'] },
  alternates: { canonical: SITE.url + '/manifestos/beyond-leads' },
};

export default async function BeyondLeadsPage() {
  const { html: rawHtml } = renderStagedMarkdown(STAGED_FILES.beyondLeads);
  const html = stripFirstH1(rawHtml);
  const meta = await getCanonDoc('beyond-leads-manifesto-v2');

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
      title="Beyond &ldquo;Leads&rdquo;"
      lead="The vocabulary at the center of modern business is older than software, and it has stopped working. The math of AI-native discovery has rendered the funnel illegible — to humans and to the agents who increasingly accompany them."
      byline="Value-First Team"
      filedUnder="Manifestos · Vocabulary"
      path="/manifestos/beyond-leads"
      pullQuote={
        <section className="manifesto-pullquote">
          <div className="manifesto-pullquote-inner">
            <p className="manifesto-pullquote-body">
              People never research alone anymore. They explore <strong>with</strong> Claude. They
              evaluate <strong>with</strong> ChatGPT. They draft implementation plans{' '}
              <strong>with</strong> AI assistants &mdash; all without ever entering your funnel.
            </p>
          </div>
        </section>
      }
    >
      <div className="manifesto-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </ManifestoArchetype>
  );
}
