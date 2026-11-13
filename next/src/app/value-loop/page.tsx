/**
 * /value-loop — Value Loop canonical reference v1. React port of
 * src/pages/value-loop.astro. Body source: the pinned canon snapshot, build-time.
 *
 * THE HERO READS CANON, the same reference the body renders: the name, the definition sentence (line 21) as the
 * lead and the page description, the four stages in canon's flow order (line 107) as the eyebrow, and canon's
 * four stages with canon's descriptions (the Four Stages table, lines 51-54) as the DefinedTerms. Each is checked
 * against the pinned snapshot at build time (lib/canon-line.ts), so the opening cannot say what the body does not.
 * The stage list lives in lib/value-loop-stages.ts, so the /methodology hub counts the same four.
 */
import type { Metadata } from 'next';
import { TextLink } from '@vf/ui';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { canonLine, canonPhrase } from '@/lib/canon-line';
import { renderWikiCanonical, stripFirstH1, WIKI_CANONICAL } from '@/lib/markdown';
import { VALUE_LOOP_STAGES } from '@/lib/value-loop-stages';

const CANON = WIKI_CANONICAL.valueLoop;

export const metadata: Metadata = {
  title: 'Value Loop',
  // Canon line 21, as a string literal: /llms.txt and /sitemap read a page's description from its source. The
  // hero's lead checks it against the pinned canon.
  description:
    'The Value Loop is a 4-stage framework describing how value actually emerges through continuous engagement with different conversation partners—ourselves, specific others, the market, and data.',
  openGraph: { url: SITE.url + '/value-loop', images: ['/og/og-value-loop.jpg'] },
  alternates: { canonical: SITE.url + '/value-loop' },
};

const definedTermsLd = {
  '@context': 'https://schema.org',
  '@graph': VALUE_LOOP_STAGES.map(([line, name, description]) => ({
    '@type': 'DefinedTerm',
    name: canonPhrase(CANON, line, name),
    description: canonPhrase(CANON, line, description),
    termCode: name.toLowerCase().replace(' ', '-'),
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Value Creation Protocol Glossary', url: `${SITE.url}/glossary` },
  })),
};

export default function ValueLoopPage() {
  const { html } = renderWikiCanonical(CANON);
  const bodyHtml = stripFirstH1(html);

  return (
    <>
      <JsonLd data={definedTermsLd} />
      <CanonArchetype
        eyebrow={canonPhrase(CANON, 107, 'Express Value → Tailor Value → Amplify Value → Evolve Value')}
        title={canonPhrase(CANON, 19, 'The Value Loop')}
        lead={canonLine(CANON, 21, metadata.description as string)}
        path="/value-loop"
        specMeta={[
          { label: 'Status', value: `v${canonPhrase(CANON, 4, '1.1')} · canonical` },
          { label: 'Verified', value: '12 November 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/value-loop' },
          { label: 'Stages', value: '4 — continuous' },
        ]}
      >
        <section className="canon-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

        <div className="canon-callout">
          <p className="canon-callout-label">Where this fits</p>
          <p className="canon-callout-body">
            The Value Loop operates inside every{' '}
            <TextLink href="/three-orgs" arrow={false} className="canon-callout-link">org</TextLink> and across every{' '}
            <TextLink href="/unified-views" arrow={false} className="canon-callout-link">unified view</TextLink>. It is
            the rhythm against which{' '}
            <TextLink href="/value-led-growth" arrow={false} className="canon-callout-link">Value-Led Growth</TextLink>{' '}
            compounds.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
