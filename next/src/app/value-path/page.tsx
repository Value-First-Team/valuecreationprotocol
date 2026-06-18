/**
 * /value-path — The eight stages from Audience to Champion. React port of
 * src/pages/value-path.astro. Source: Sanity valuePathStage records, build-time.
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';
import { JsonLd } from '@/components/JsonLd';
import { getValuePathStages } from '@/lib/sanity/canon';

export const metadata: Metadata = {
  title: 'Value Path',
  description:
    'The eight-stage journey from first signal through champion. Path TO Value (1–4) precedes Path OF Value (5–8). The canonical map of how a person naturally progresses through value discovery and creation.',
  openGraph: { url: SITE.url + '/value-path', images: ['/og/og-value-path.jpg'] },
  alternates: { canonical: SITE.url + '/value-path' },
};

type Stage = Awaited<ReturnType<typeof getValuePathStages>>[number];

function StageRecord({ s }: { s: Stage }) {
  const slug = s.slug?.current ?? s.name.toLowerCase().replace(/\s+/g, '-');
  return (
    <li className="canon-record" id={slug}>
      <p className="canon-record-eyebrow">Stage {String(s.number).padStart(2, '0')}</p>
      <h3 className="canon-record-title">{s.name}</h3>
      {s.mantra && <p className="canon-record-mantra">&ldquo;{s.mantra}&rdquo;</p>}
      {s.description && <p className="canon-record-body">{s.description}</p>}
      {(s.signalsOfReadiness?.length || s.typicalChallenges?.length) && (
        <div className="canon-record-meta">
          {s.signalsOfReadiness && s.signalsOfReadiness.length > 0 && (
            <div>
              <p className="canon-record-meta-label">Signals of readiness</p>
              <ul className="canon-record-meta-list">
                {s.signalsOfReadiness.map((sig, i) => (
                  <li key={i}>{sig}</li>
                ))}
              </ul>
            </div>
          )}
          {s.typicalChallenges && s.typicalChallenges.length > 0 && (
            <div>
              <p className="canon-record-meta-label">Typical challenges</p>
              <ul className="canon-record-meta-list">
                {s.typicalChallenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {s.typicalTraps && s.typicalTraps.length > 0 && (
        <ul className="canon-record-tags">
          {s.typicalTraps.map((t: { _ref?: string; name?: string; slug?: { current: string } }, i) => (
            <li key={i}>
              <a href={`/twelve-traps#${t.slug?.current ?? ''}`} className="canon-record-tag">
                <span className="canon-record-tag-label">trap</span>
                {t.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default async function ValuePathPage() {
  const stages = await getValuePathStages();
  const PATH_TO = stages.filter((s) => s.number <= 4);
  const PATH_OF = stages.filter((s) => s.number >= 5);

  const definedTermsLd = {
    '@context': 'https://schema.org',
    '@graph': stages.map((s) => ({
      '@type': 'DefinedTerm',
      name: `${s.name} (Value Path Stage ${s.number})`,
      description: s.mantra ? `"${s.mantra}" — ${s.description ?? ''}`.trim() : s.description,
      termCode: `vp-${s.number}`,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Value Creation Protocol Glossary',
        url: `${SITE.url}/glossary`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={definedTermsLd} />
      <CanonArchetype
        eyebrow="The Value Path"
        title="Eight stages of natural progression."
        lead="A person moves through value discovery and creation in eight observable stages. Path TO Value (1–4) is discovery and evaluation. Path OF Value (5–8) is creation and multiplication. The pivot — Value Activated — is the moment of commitment. Each stage carries its own mantra, its own signals of readiness, and its own operating commitments."
        path="/value-path"
        specMeta={[
          { label: 'Status', value: 'v1.1 · canonical' },
          { label: 'Verified', value: '12 May 2026' },
          { label: 'Cite', value: 'valuecreationprotocol.com/value-path' },
          { label: 'Stages', value: '8 — sourced from canon' },
        ]}
      >
        <figure className="canon-figure">
          <div className="canon-figure-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/diagrams/value-path.svg"
              alt="The eight Value Path stages, from Audience through Champion, with the Value Activated pivot between Path TO (1–4) and Path OF (5–8)."
              loading="lazy"
            />
          </div>
          <figcaption className="canon-figure-caption">
            Path TO Value (1–4) → Value Activated → Path OF Value (5–8)
          </figcaption>
        </figure>

        <section className="canon-prose">
          <p>
            The Value Path describes how humans actually move through relationships with an
            organization — not how an industrial-age operating model assumes they should. It honors
            readiness over manufactured advancement, signals over scores, and natural progression
            over engineered pressure.
          </p>
          <p>
            Each stage is observable. A person occupies one stage at a time. The transitions are
            quiet: a Researcher does not announce that they have moved into Hand Raiser; they simply
            ask a different kind of question. The protocol reads those questions.
          </p>
          <p>
            The eight stages render below as canonical records. Each carries its own anchor URL —
            meaning a practitioner in a client meeting can cite a single stage directly without
            losing context (for example,{' '}
            <a href="#hand-raiser">valuecreationprotocol.com/value-path#hand-raiser</a>).
          </p>
        </section>

        <p className="canon-section-label" id="path-to">
          Path TO Value
        </p>
        <h2 className="canon-section-sub">Stages 1 through 4 — discovery and evaluation.</h2>
        <p className="canon-section-note">
          A person moves from observable signal to commitment. This is the pre-Value-Activated phase.
          Sourcing happens here; pressure does not belong here.
        </p>

        {PATH_TO.length > 0 && (
          <ol className="canon-records">
            {PATH_TO.map((s) => (
              <StageRecord s={s} key={s._id} />
            ))}
          </ol>
        )}

        <div className="canon-pivot">
          <p className="canon-pivot-mark">▼ Value Activated ▼</p>
          <p className="canon-pivot-note">
            The relationship transitions from commitment to receiving value. Path TO ends here; Path
            OF begins.
          </p>
        </div>

        <p className="canon-section-label" id="path-of">
          Path OF Value
        </p>
        <h2 className="canon-section-sub">Stages 5 through 8 — creation and multiplication.</h2>
        <p className="canon-section-note">
          Value flows. The relationship matures from implementer to champion. This is where
          industrial-age operating models go quiet; the protocol pays attention.
        </p>

        {PATH_OF.length > 0 && (
          <ol className="canon-records">
            {PATH_OF.map((s) => (
              <StageRecord s={s} key={s._id} />
            ))}
          </ol>
        )}

        <div className="canon-callout">
          <p className="canon-callout-label">Related canon</p>
          <p className="canon-callout-body">
            Read the <a href="/twelve-traps">Twelve Complexity Traps</a> to see what derails natural
            progression. Read <a href="/realities">Value Realities</a> for the operational
            commitments each stage demands.
          </p>
        </div>
      </CanonArchetype>
    </>
  );
}
