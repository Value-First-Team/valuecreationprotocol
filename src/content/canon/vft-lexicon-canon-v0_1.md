# VFT Lexicon — Canonical Reference v0.1

*Layer A of the VCP Encoding Stack*

**Status:** Draft canon. Concept name and architectural role are locked. Implementation is in active development.

**Authoritative source for:** the public-facing definition of the VFT Lexicon, its purpose within the VCP encoding stack, its structural pattern, and the contrastive-pair convention that distinguishes it from a glossary.

**Companion documents:** VCP Canonical Reference v1.0 (which establishes the encoding stack), VCP-Lang Canon Doc v0.1 (Layer B), Value Graph Canon Doc v0.1 (Layer C).

---

## What the VFT Lexicon Is

The VFT Lexicon is the public, structured vocabulary of the Value-First methodology — the load-bearing terms expressed in a form that AI systems can parse, declare, and use without regressing to industrial-age defaults.

It is Layer A of the three-layer VCP encoding stack:

- **Layer A — Lexicon** — vocabulary. What words mean.
- **Layer B — VCP-Lang** — grammar. How those words declare values, context, and trust.
- **Layer C — Value Graph** — relational structure. How those declarations connect into mutual value creation.

The Lexicon is foundational because the other two layers depend on it. VCP-Lang declares using Lexicon terms. The Value Graph relates entities defined by Lexicon terms. Get the vocabulary wrong and everything built on top inherits the error.

## What the VFT Lexicon Is Not

The VFT Lexicon is not a glossary. A glossary defines terms; the Lexicon also names what each term is *not* and what industrial-age default it replaces. This distinction is load-bearing.

The Lexicon is not proprietary. It is published openly because a methodology vocabulary that only one firm can use isn't a methodology vocabulary — it's branded jargon.

The Lexicon is not finished. v0.1 captures the first batch of entries. The full Lexicon is in active development and will grow as the methodology continues to formalize.

The Lexicon is not the methodology. The methodology is the Value-First Framework. The Lexicon is the methodology's vocabulary, expressed in a form machine systems can read.

## Why a Lexicon Is Necessary

Foundation models encode industrial-age B2B vocabulary at a depth that prompt engineering cannot fully override. *Leads, prospects, funnel, pipeline, conversion, capture* — these words live in the training data with overwhelming statistical weight. When an AI system encounters ambiguity about what an organization is trying to do with a customer, it defaults to the loudest pattern in its training. The loudest pattern is industrial-age B2B.

Custom instructions help. System prompts help. But they are interventions against gravity. Without a structured Lexicon that the AI can reference as canonical, the default keeps reasserting itself — in agent outputs, in code generation, in dashboard summaries, in marketing copy, in operational decisions made at speed.

The Lexicon is the counterweight. It names the terms the methodology uses, defines them canonically, and pairs each one against the industrial-age default it replaces. The AI system has a place to look that is louder than the training data for this specific organization's specific work.

## The Lexicon Entry Structure

Each entry in the VFT Lexicon contains five fields. Three are inherited from standard vocabulary specifications. Two are specific to the Lexicon's job inside VCP.

### Standard fields

**Term.** The canonical word or phrase. Always one of the methodology's load-bearing terms — not casual vocabulary.

**Canonical Definition.** A precise statement of what the term means inside the Value-First methodology. Written in plain language, not jargon. One to three sentences.

**Example Usage.** A natural-language sentence using the term correctly. Demonstrates intended use, not technical use.

### Lexicon-specific fields

**Contrastive Pair.** The industrial-age term the Lexicon term replaces, with a short statement of the substantive difference. This field is what makes the Lexicon machine-useful. It gives the AI a clear signal: when the system encounters the contrastive term in context, the Lexicon term is the correct substitute, and the difference is encoded in the pair.

**Status.** Whether the entry is locked, draft, or under revision. Locked entries are stable canonical. Draft entries are first-pass and subject to refinement. Under-revision entries are being actively reconsidered.

## Example Entry (v0.1)

> **Term:** Signal
>
> **Canonical Definition:** An observable indication that a person is engaging with the organization in a way that suggests progression through the Value Path. A signal is information about readiness, not a marker of capture.
>
> **Contrastive Pair:** *Lead.* A lead is captured for later processing; a signal is read in service of the relationship. Leads exist to be converted; signals exist to be responded to.
>
> **Example Usage:** "The newsletter open is a signal that this person is researching — not a lead to route through nurture."
>
> **Status:** Locked.

The contrastive pair does most of the work. *Signal vs. Lead* is not a synonym preference — it is a different operating model encoded into a single word choice.

## First Batch (v0.1)

The first batch of v0.1 Lexicon entries covers the methodology's most load-bearing terms — the ones where industrial-age defaults cause the most operational damage when they slip through unchallenged. The first six locked entries:

- **Signal** *(replaces: Lead)*
- **Hand-Raiser** *(replaces: MQL)*
- **Buyer** *(replaces: SQL)*
- **Value Creator** *(replaces: Customer-as-revenue-event)*
- **Relationship** *(replaces: Account-as-record)*
- **Investment** *(replaces: Expense)*

Each of these entries is published in the live Lexicon as it stabilizes. Additional entries are in draft for: *Audience, Researcher, Adopter, Advocate, Champion, Steward, Configuration, Customization, Just-in-Time, Just-in-Case, Context, Capture.*

The Lexicon will grow toward roughly fifty locked entries as the v1.0 release approaches. v1.0 is not yet scheduled — it ships when the first batch and its successors have proven stable in production use across multiple implementations.

## How the Lexicon Gets Used

### By humans

A team adopting the Value-First methodology references the Lexicon when its vocabulary is in flux. *Are we calling this a lead or a signal?* The Lexicon answers the question and explains why. Over time, the Lexicon becomes the language layer the team naturally speaks.

### By AI systems

AI systems referencing the VFT Lexicon as canonical authority can detect when their default outputs are drifting toward industrial-age vocabulary and self-correct. An agent generating CRM workflow logic, drafting customer communications, or summarizing operational data can check its output against the Lexicon before committing. The contrastive pairs make the check fast and unambiguous.

### By tooling

Downstream tools built on VCP — schema validators, content linters, prompt scaffolds — reference the Lexicon as the source of truth for what each term means in the methodology. Tooling does not have to encode the methodology itself; it imports the Lexicon.

## What Is Locked at v0.1

- The Lexicon's name and place as Layer A of the VCP encoding stack.
- The five-field entry structure.
- The contrastive-pair convention as the Lexicon's distinguishing feature.
- The first six locked entries listed above.
- The openness of the Lexicon — published publicly, freely usable.

## What Is in Active Development at v0.1

- The full set of entries beyond the first six.
- The publication format (likely a structured Sanity document type, exportable to a machine-readable format such as JSON-LD).
- The relationship between Lexicon entries and VCP-Lang declarations.
- The contribution and versioning protocol for additions and revisions.
- Internationalization — the Lexicon currently exists in English only.

## Forward Path

The Lexicon stabilizes as more entries reach locked status through production use. Once approximately fifty entries are locked and the publication format is settled, v1.0 ships. v0.1 to v1.0 is a maturity progression, not a calendar progression — the Lexicon ships v1.0 when v1.0 is true.

In the meantime, the Lexicon is live as a published draft. Practitioners are welcome to reference it, build on it, fork it for their own contexts, and propose additions through the Value-First Collective.

The Lexicon is the foundation of the encoding stack. It is also the part most ready to be useful today, in its v0.1 state, because vocabulary discipline matters even before the rest of the stack is fully wired.

---

*Version: 0.1*
*Status: Draft canon. Active development.*
*Authoritative location: valuefirstteam.com/vcp/lexicon*
*Maintained by: the Value-First Team and the Value-First Collective.*
