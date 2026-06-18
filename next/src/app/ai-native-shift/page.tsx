/**
 * /ai-native-shift — Implementation handoff route. React port of
 * src/pages/ai-native-shift.astro. Static content; .canon-handoff styling lives
 * in vcp-archetypes.css (ported from the page's <style> block).
 */
import type { Metadata } from 'next';
import { SITE } from '@/lib/site';
import { CanonArchetype } from '@/components/CanonArchetype';

export const metadata: Metadata = {
  title: 'Implementing the Value Creation Protocol',
  description:
    "The AI-Native Shift is Value-First Team's delivery vehicle for the Value Creation Protocol — the structured engagement through which mid-market B2B organizations implement VCP. The protocol is open; this page is the handoff to the canonical implementing firm.",
  openGraph: { url: SITE.url + '/ai-native-shift', images: ['/og/og-ai-native-shift.jpg'] },
  alternates: { canonical: SITE.url + '/ai-native-shift' },
};

export default function AiNativeShiftPage() {
  return (
    <CanonArchetype
      eyebrow="Implementation"
      title="Implementing the Value Creation Protocol."
      lead="VCP is a protocol — an open framework for naming what value means in an AI-native business operating model. Implementations are opinionated. The AI-Native Shift is Value-First Team's implementation: a daily show and transformation program through which business leaders operationalize VCP. This page is the handoff."
      path="/ai-native-shift"
      specMeta={[
        { label: 'Status', value: 'handoff route' },
        { label: 'Verified', value: '25 May 2026' },
        { label: 'Canonical implementation', value: 'ainativeshift.com' },
      ]}
    >
      <section className="canon-prose">
        <h2>Protocol and implementation are different layers</h2>
        <p>
          The Value Creation Protocol describes how value flows in an AI-native business — the
          vocabulary, the operating model, the architectural commitments. It is platform-agnostic,
          declarable, and open. Anyone can read it, cite it, and operate on it without engaging the
          originating firm.
        </p>
        <p>
          The AI-Native Shift is one delivery vehicle for VCP. It is the way Value-First Team brings
          VCP to business leaders: a daily show that works through the operating model in public, and
          a structured program that brings the protocol into the inside of an organization. Both the
          show and the program live at ainativeshift.com. Other implementations of VCP are welcome.
          The protocol does not require this one.
        </p>

        <h2>If you are reading to implement</h2>
        <p>
          If you are a leadership team looking to operationalize VCP in your own organization — not
          just study the protocol — the AI-Native Shift is where the implementation work happens. The
          standalone home for the show, the program, and the framework reference (including the
          reciprocal page at <code>ainativeshift.com/framework/vcp</code>) is ainativeshift.com.
        </p>
      </section>

      <aside className="canon-handoff">
        <p className="canon-handoff-eyebrow">Canonical implementation</p>
        <h3 className="canon-handoff-title">The AI-Native Shift</h3>
        <p className="canon-handoff-body">
          The show, the program, and the framework reference — the standalone home for Value-First
          Team&apos;s implementation of the Value Creation Protocol.
        </p>
        <a className="canon-handoff-link" href="https://ainativeshift.com" target="_blank" rel="noopener noreferrer">
          ainativeshift.com <span aria-hidden="true">&rarr;</span>
        </a>
        <a
          className="canon-handoff-link"
          href="https://ainativeshift.com/framework/vcp"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: '0.1rem' }}
        >
          ainativeshift.com/framework/vcp <span aria-hidden="true">&rarr;</span>
        </a>
      </aside>

      <section className="canon-prose">
        <h2>If you want to talk to the implementer</h2>
        <p>
          Office Hours is the open-door path. A weekly working session run by Value-First Team — no
          scope review, no commercial pressure, no prepared pitch. Show up, ask a question, see
          whether the operating model and the firm are a fit before there is anything to commit to.
        </p>
      </section>

      <aside className="canon-handoff canon-handoff-quiet">
        <p className="canon-handoff-eyebrow">Open door</p>
        <h3 className="canon-handoff-title">Office Hours</h3>
        <p className="canon-handoff-body">
          Weekly, no commitment, no pitch. The way most implementation conversations begin.
        </p>
        <a
          className="canon-handoff-link"
          href={`${SITE.implementer.url}/office-hours`}
          target="_blank"
          rel="noopener noreferrer"
        >
          valuefirstteam.com/office-hours <span aria-hidden="true">&rarr;</span>
        </a>
      </aside>

      <section className="canon-prose">
        <h2>Other implementations</h2>
        <p>
          The protocol is open. Practitioners and firms outside Value-First Team are free to
          implement VCP on their own terms — adapt it, cite it, operate by it. If you are building
          such an implementation, the encoding stack (<a href="/encoding-stack">Lexicon</a>,{' '}
          <a href="/vcp-lang">VCP-Lang</a>, <a href="/value-graph">Value Graph</a>) is where the
          protocol is machine-parseable.
        </p>
        <p>Build on it.</p>
      </section>
    </CanonArchetype>
  );
}
