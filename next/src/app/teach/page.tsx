/**
 * /teach — TEACH, walked as one space, then the canonical reference in full.
 *
 * The page opens on the shared 3D scroll stage (@vf/site-kit/scroll-stage): an opening stop that names TEACH as
 * pairs held at once, one stop per pair in canon's order (the pair and its Theme first and largest, then its
 * sections, one step at a time), and a closing stop with canon's pattern and where TEACH fits. Every word on a
 * stop is canon's, cut from the pinned snapshot by `lib/teach.ts`; the opening's title and lead and the "Where
 * this fits" lines are the ones this page has always carried. Below the stage the whole reference is rendered
 * as it always was, so the page stays citable at valuecreationprotocol.com/teach, a reader with no WebGL or no
 * script reads every stop and the full reference in order, and the canon-drift gate reads the same source.
 *
 * The version/effective labels are read OUT OF THE BODY, not from a second store — a label sourced elsewhere
 * silently goes on describing a document it no longer matches. Sanity is the fallback only.
 */
// hand-roll-exempt: the raw tags below are the `canon-prose` body mount of the CanonArchetype vocabulary, and the
// canon fragments each stop renders (a section's paragraph or list, as marked renders the reference); every
// heading, eyebrow and link is @vf/ui, the stops are @vf/site-kit/scroll-stage, and nothing here is interactive
// but those links and the stage's own controls.
import type { Metadata } from 'next';
import { DisplayHeading, Eyebrow, TextLink } from '@vf/ui';
import { ScrollStageBeat, ScrollStageStop, type StageStopSpec } from '@vf/site-kit/scroll-stage';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { TeachStage } from '@/components/TeachStage';
import { footAnchor } from '@/scene/teach-scene';
import { renderStagedMarkdown, stripFirstH1, STAGED_FILES } from '@/lib/markdown';
import { readTeachCanon, type TeachPair } from '@/lib/teach';
import { getCanonDoc } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'TEACH',
  description:
    'Five interdependent value pairs, both halves held at once: Transparent ↔ Trust, Empathetic ↔ Empowered, Agile ↔ Adaptable, Confidence ↔ Conviction, Humble ↔ Hungry. TEACH is the operating posture of anyone — human or AI — working inside the protocol.',
  openGraph: { url: SITE.url + '/teach', images: ['/og/og-teach.jpg'] },
  alternates: { canonical: SITE.url + '/teach' },
};

const TITLE = 'Five value pairs for how Value-First work is held.';
const LEAD =
  'TEACH is five value pairs, and every one of them is a pair — both halves held at the same time, never one without the other. It is operating posture: how anyone, human or AI, shows up while the work is being done, rather than what the work is. TEACH is upstream of the practitioner taxonomy.';
const OPENING = { id: 'teach', name: 'TEACH' };
const CLOSING = { id: 'where-this-fits', name: 'Where this fits' };
const REFERENCE_ID = 'canon-reference';

/**
 * ON A PHONE A STOP ARRIVES UNDER ITS ARCH (ScrollStageStop `fill`): the first step is the stop's head alone, set below
 * the foot of the arch it stands at, so the whole figure is in view above the pair and its theme; the sections open
 * the steps after it. Wider screens are unchanged.
 */
const arrive = (arch: number, opens: string) => ({ order: ['head'], opens: [opens], below: footAnchor(arch) });

/** Read a "**Label:** value" line out of the canon markdown body itself. */
function fromBody(raw: string, label: string): string | undefined {
  const m = raw.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+?)\\s*$`, 'm'));
  return m?.[1] || undefined;
}

/** The pair, whole: the second half kept on the line of the ↔ that holds it, never set apart. */
function PairName({ pair }: { pair: TeachPair }) {
  const [a, b] = pair.halves;
  const held = pair.name.slice(a.length).trim(); // "↔ Trust", in canon's own characters
  return (
    <>
      {a} <span className="vcp-stage-held">{held}</span>
    </>
  );
}

/** The steps a pair's stop reads in, beside the scene: its sections, and the guard for the pair that carries one. */
const stepsOf = (pair: TeachPair) => pair.sections.length + (pair.guard ? 1 : 0);

function PairStop({ pair, index }: { pair: TeachPair; index: number }) {
  return (
    <ScrollStageStop
      id={pair.slug}
      index={index}
      labelledBy={`${pair.slug}-h`}
      beats={stepsOf(pair)}
      fill={arrive(index - 1, 's0')}
      lead={ /* retired-word-exempt: the shared component's `lead` prop (what stays on screen through a stop), not the CRM noun */
        <div className="vcp-stage-head" data-vf-stage-part="head">
          <Eyebrow as="p" tone="theme" className="vcp-stage-eyebrow">{pair.letter}</Eyebrow>
          <DisplayHeading as="h2" tone="theme" level="h2" id={`${pair.slug}-h`} className="vcp-stage-pair">
            <PairName pair={pair} />
          </DisplayHeading>
          <p className="vcp-stage-theme">{pair.theme}</p>
        </div>
      }
    >
      {pair.sections.map((s, k) => (
        <ScrollStageBeat key={s.label} index={k}>
          <div className="vcp-stage-beat-words" data-vf-stage-part={`s${k}`}>
            <h3 className="vcp-stage-label">{s.label}</h3>
            <div className="vcp-stage-body" dangerouslySetInnerHTML={{ __html: s.html }} />
          </div>
        </ScrollStageBeat>
      ))}
      {pair.guard ? (
        <ScrollStageBeat index={pair.sections.length}>
          <div className="vcp-stage-body" data-vf-stage-part="guard" dangerouslySetInnerHTML={{ __html: pair.guard }} />
        </ScrollStageBeat>
      ) : null}
    </ScrollStageStop>
  );
}

export default async function TeachPage() {
  const { html, raw } = renderStagedMarkdown(STAGED_FILES.teach);
  const bodyHtml = stripFirstH1(html);
  const canon = readTeachCanon();
  const meta = await getCanonDoc('teach-v1-0');
  const bodyVersion = fromBody(raw, 'Version');
  const version = bodyVersion ? `v${bodyVersion}` : (meta?.version ?? 'v1.1');
  const effective = fromBody(raw, 'Effective Date') ?? meta?.effectiveDate ?? '6 May 2026';

  const { pairs } = canon;
  const stops: StageStopSpec[] = [OPENING, ...pairs.map((p) => ({ id: p.slug, name: p.name })), CLOSING];
  const moving = pairs.findIndex((p) => p.guard);
  const sceneData = {
    pairs: pairs.length,
    moving,
    adapts: canon.adapts.length,
    movingId: pairs[moving].slug,
    arrangements: stepsOf(pairs[moving]),
  };

  return (
    <CanonArchetype
      stage={
        <TeachStage stops={stops} data={sceneData}>
          <ScrollStageStop
            id={OPENING.id}
            index={0}
            labelledBy="teach-h"
            beats={2}
            fill={arrive(0, 'intro')}
            lead={ /* retired-word-exempt: the shared component's `lead` prop, not the CRM noun */
              <div className="vcp-stage-head" data-vf-stage-part="head">
                <Eyebrow as="p" tone="theme" className="vcp-stage-eyebrow">TEACH</Eyebrow>
                <DisplayHeading as="h1" tone="theme" id="teach-h" className="vcp-stage-title">{TITLE}</DisplayHeading>
              </div>
            }
          >
            <ScrollStageBeat index={0}>
              <div className="vcp-stage-beat-words" data-vf-stage-part="intro">
                <p className="vcp-stage-lead">{LEAD}</p>
                <div className="vcp-stage-body">
                  <p dangerouslySetInnerHTML={{ __html: canon.simultaneity }} />
                </div>
              </div>
            </ScrollStageBeat>
            <ScrollStageBeat index={1}>
              <ul className="vcp-stage-pairs" data-vf-stage-part="pairs">
                {pairs.map((p) => (
                  <li key={p.slug}>
                    <TextLink href={`#${p.slug}`} arrow={false} className="vcp-stage-pairs-name">
                      {p.name}
                    </TextLink>{' '}
                    — {p.theme}
                  </li>
                ))}
              </ul>
            </ScrollStageBeat>
          </ScrollStageStop>

          {pairs.map((p, i) => (
            <PairStop key={p.slug} pair={p} index={i + 1} />
          ))}

          <ScrollStageStop
            id={CLOSING.id}
            index={pairs.length + 1}
            labelledBy="where-this-fits-h"
            fill={arrive(0, 'fits')}
            lead={ /* retired-word-exempt: the shared component's `lead` prop, not the CRM noun */
              <div className="vcp-stage-head" data-vf-stage-part="head">
                <Eyebrow as="p" tone="theme" className="vcp-stage-eyebrow">Pattern</Eyebrow>
                <DisplayHeading as="h2" tone="theme" level="h2" id="where-this-fits-h" className="vcp-stage-pair">
                  {canon.pattern}
                </DisplayHeading>
                <p className="vcp-stage-theme">{canon.patternNote}</p>
              </div>
            }
          >
            <div className="vcp-stage-beat-words" data-vf-stage-part="fits">
              <p className="vcp-stage-label">{CLOSING.name}</p>
              <div className="vcp-stage-body">
                <p>
                  TEACH is the operating discipline by which the protocol is taught. It is the upstream of the{' '}
                  <TextLink href="/value-path" arrow={false}>Value Path</TextLink> — how practitioners hold a person at each
                  stage — and the operating contract for any team that adopts VCP through the{' '}
                  <TextLink href="/ai-native-shift" arrow={false}>AI-Native Shift</TextLink>.
                </p>
              </div>
              <p>
                <TextLink href={`#${REFERENCE_ID}`} standalone>
                  {canon.title}
                </TextLink>
              </p>
            </div>
          </ScrollStageStop>
        </TeachStage>
      }
      headerId={REFERENCE_ID}
      eyebrow="TEACH"
      title={canon.title}
      path="/teach"
      specMeta={[
        { label: 'Status', value: `${version} · canonical` },
        { label: 'Effective', value: effective },
        { label: 'Verified', value: '20 September 2026' },
        { label: 'Cite', value: 'valuecreationprotocol.com/teach' },
      ]}
    >
      <section className="canon-prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </CanonArchetype>
  );
}
