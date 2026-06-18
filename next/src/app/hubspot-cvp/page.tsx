/**
 * /hubspot-cvp — HubSpot as Customer Value Platform v1.1. React port of
 * src/pages/hubspot-cvp.astro. Body source: staged canon markdown; meta from
 * Sanity getCanonDoc, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'HubSpot as Customer Value Platform',
  description:
    'HubSpot as the canonical implementing Customer Value Platform for the Value Creation Protocol. Configuration over customization — the operating approach that lets VCP run on a commercial substrate without bespoke architecture.',
  openGraph: { url: SITE.url + '/hubspot-cvp', images: ['/og/og-hubspot-cvp.jpg'] },
  alternates: { canonical: SITE.url + '/hubspot-cvp' },
};

export default async function HubspotCvpPage() {
  const { html } = renderStagedMarkdown(STAGED_FILES.hubspotCvp);
  const bodyHtml = stripFirstH1(html);
  const meta = await getCanonDoc('hubspot-cvp-v1-1');
  const version = meta?.version ?? 'v1.1';
  const effective = meta?.effectiveDate ?? '6 May 2026';

  return (
    <CanonArchetype
      eyebrow="HubSpot as CVP"
      title="HubSpot is the canonical implementing substrate."
      lead="The Value Creation Protocol is platform-agnostic — but HubSpot is the substrate against which the protocol was designed, refined, and tested. Native objects, configuration depth, and broad public accessibility make it the canonical implementing Customer Value Platform. This page is the long-form reference for how the two compose."
      path="/hubspot-cvp"
      specMeta={[
        { label: 'Status', value: `${version} · canonical` },
        { label: 'Effective', value: effective },
        { label: 'Verified', value: '12 May 2026' },
        { label: 'Cite', value: 'valuecreationprotocol.com/hubspot-cvp' },
      ]}
    >
      <section className="canon-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      <div className="canon-callout">
        <p className="canon-callout-label">Naming clarification</p>
        <p className="canon-callout-body">
          CVP and VCP are not the same thing. CVP is a platform category. VCP is a protocol that runs
          on top of one. See the <a href="/cvp-vs-vcp">disambiguation page</a> for the boundary.
        </p>
      </div>

      <div className="canon-callout">
        <p className="canon-callout-label">Where this fits</p>
        <p className="canon-callout-body">
          HubSpot configured as a CVP is the substrate. The <a href="/value-path">Value Path</a> and{' '}
          <a href="/three-orgs">Three-Org Model</a> are operated against it. The{' '}
          <a href="/unified-views">Four Unified Views</a> are the surfaces it must produce.
        </p>
      </div>
    </CanonArchetype>
  );
}
