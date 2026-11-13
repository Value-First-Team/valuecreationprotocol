/**
 * /value-loop/reference — the Value Loop canonical reference, whole.
 *
 * Until 2026-11-13 /value-loop rendered this reference in full. The Value Loop then joined the shared framework page
 * as family nine (builds 5 and 6; @vf/brand 0.180.0) and /value-loop became a thin route, its words from @vf/brand's
 * derived copy of canon, so the reference moved here, unchanged, as TEACH's moved to /teach/reference: the same hero
 * (canon's flow order as the eyebrow, the reference's own title, its definition sentence as the lead), the same body
 * from the same pinned snapshot, and the same "Where this fits" callout. /value-loop links here from its spec strip,
 * and this page links back.
 *
 * The stages' DefinedTerms now ride /value-loop's framework graph (@vf/site-kit frameworkJsonLd), so this page does not
 * publish them a second time.
 */
// hand-roll-exempt: the raw tags below are the `canon-prose` body mount and the callout of the CanonArchetype
// vocabulary, as every canon page on this site renders its reference; the links are @vf/ui's TextLink and the way back
// is @vf/site-kit's BackLink, and nothing here is a control.
import type { Metadata } from 'next';
import { TextLink } from '@vf/ui';
import { frameworkClaim } from '@vf/brand';
import { BackLink } from '@vf/site-kit/back-link';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { renderWikiCanonical, stripFirstH1 } from '@/lib/markdown';
import {
  VALUE_LOOP_REFERENCE_CANON,
  VALUE_LOOP_REFERENCE_LEAD,
  valueLoopReferenceEyebrow,
  valueLoopReferenceLead,
  valueLoopReferenceTitle,
  valueLoopReferenceVersion,
} from '@/lib/value-loop-reference';

const PATH = '/value-loop/reference';

export const metadata: Metadata = {
  title: 'The Value Loop — canonical reference',
  // Canon line 21, as a string literal: /llms.txt and /sitemap read a page's description from its source. The hero's
  // lead checks it against the pinned canon.
  description:
    'The Value Loop is a 4-stage framework describing how value actually emerges through continuous engagement with different conversation partners—ourselves, specific others, the market, and data.',
  openGraph: { url: SITE.url + PATH, images: ['/og/og-value-loop.jpg'] },
  alternates: { canonical: SITE.url + PATH },
};

if (metadata.description !== VALUE_LOOP_REFERENCE_LEAD) {
  throw new Error('/value-loop/reference: the description no longer reads canon line 21 as the reader holds it.');
}

export default function ValueLoopReferencePage() {
  const { html } = renderWikiCanonical(VALUE_LOOP_REFERENCE_CANON);
  const bodyHtml = stripFirstH1(html);

  return (
    <CanonArchetype
      eyebrow={valueLoopReferenceEyebrow()}
      title={valueLoopReferenceTitle()}
      lead={valueLoopReferenceLead()}
      path={PATH}
      specMeta={[
        { label: 'Status', value: `v${valueLoopReferenceVersion()} · canonical` },
        { label: 'Verified', value: '12 November 2026' },
        { label: 'Cite', value: `valuecreationprotocol.com${PATH}` },
        { label: 'Stages', value: '4 — continuous' },
      ]}
    >
      <BackLink href="/value-loop" label={frameworkClaim('value-loop').eyebrow} followReferrer={false} />
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
  );
}
