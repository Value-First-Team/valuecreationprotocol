/**
 * /manifestos/value-led-growth — Value-Led Growth manifesto. React port of
 * src/pages/manifestos/value-led-growth.astro. Body: staged canon markdown;
 * meta from Sanity. Distinct from the /value-led-growth framework canon page.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { ManifestoArchetype } from '@/components/ManifestoArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Value-Led Growth',
  description:
    'Organizational complexity has become the product. A manifesto for the transformation that turns capability, context, and intent into value created — for customers, for teams, for the business.',
  openGraph: {
    url: SITE.url + '/manifestos/value-led-growth',
    images: ['/og/og-manifestos-value-led-growth.jpg'],
  },
  alternates: { canonical: SITE.url + '/manifestos/value-led-growth' },
};

export default async function ValueLedGrowthManifestoPage() {
  const { html: rawHtml } = renderStagedMarkdown(STAGED_FILES.valueLedGrowth);
  const html = stripFirstH1(rawHtml);
  const meta = await getCanonDoc('value-led-growth-manifesto');

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
      title="Value-Led Growth"
      lead="Organizational complexity has quietly become the product — the thing that consumes resources, demands attention, and shapes every decision. Growth, properly understood, is what happens when an organization stops manufacturing complexity and starts creating value."
      byline="Value-First Team"
      filedUnder="Manifestos · Growth"
      path="/manifestos/value-led-growth"
      pullQuote={
        <section className="manifesto-pullquote">
          <div className="manifesto-pullquote-inner">
            <p className="manifesto-pullquote-body">
              Growth is <strong>what happens</strong> when value created exceeds value extracted.
            </p>
          </div>
        </section>
      }
    >
      <div className="manifesto-prose" dangerouslySetInnerHTML={{ __html: html }} />
    </ManifestoArchetype>
  );
}
