# VCP-Lang — Canonical Reference v0.1

*Layer B of the VCP Encoding Stack*

**Status:** Draft canon. Concept name and architectural role are locked. Implementation is in active development.

**Authoritative source for:** the public-facing definition of VCP-Lang, its purpose within the VCP encoding stack, its primitive types, and the declarative pattern that distinguishes it from configuration language or templating.

**Companion documents:** VCP Canonical Reference v1.0 (which establishes the encoding stack), Value-First Lexicon Canon Doc v0.1 (Layer A), Value Graph Canon Doc v0.1 (Layer C).

**Lineage note:** VCP-Lang descends from earlier exploratory work on HCP-Lang (Human Context Protocol Language). The naming followed the broader VCP / HCP positioning shift documented in the VCP Canonical Reference.

---

## What VCP-Lang Is

VCP-Lang is a declarative grammar for stating values, context, and trust parameters in a form that machine systems can parse and act on. It is how an organization declares what it is trying to create, for whom, and under what operating conditions.

It is Layer B of the three-layer VCP encoding stack:

- **Layer A — Lexicon** — vocabulary. What words mean.
- **Layer B — VCP-Lang** — grammar. How those words declare values, context, and trust.
- **Layer C — Value Graph** — relational structure. How those declarations connect into mutual value creation.

VCP-Lang sits between vocabulary and relationships. It is the layer where an organization writes down what it is doing in terms structured enough for AI systems to act on, but readable enough for humans to author and audit.

## What VCP-Lang Is Not

VCP-Lang is not a programming language. It does not have control flow, loops, or imperative execution. It declares; it does not compute.

VCP-Lang is not a configuration language in the sense of YAML, TOML, or JSON used to parameterize software. Those formats configure systems; VCP-Lang declares the methodology a system operates under.

VCP-Lang is not a prompt template. Templates fill placeholders with strings. VCP-Lang declares structured values, contexts, and trust parameters that AI systems read as authoritative.

VCP-Lang is not a markup language. Markup describes the presentation of content; VCP-Lang describes the operating posture of an organization toward stakeholders.

VCP-Lang is not finished. v0.1 captures the primitive types and the declaration pattern. The full specification is in active development.

## Why a Declarative Grammar Is Necessary

The Lexicon gives AI systems the right vocabulary. But vocabulary alone does not tell a system *what posture to take* in a specific situation. A team can know the difference between *Signal* and *Lead* — and still need a way to declare, for a specific customer in a specific moment, *what value the organization is currently trying to create with this person, under what trust parameters, with what awareness of their context.*

Without a declarative grammar, this information lives in custom instructions, system prompts, prose handoff documents, and the heads of senior people. None of those forms travel. None of them are parseable. None of them survive the moment work scales beyond the people who wrote them.

VCP-Lang is where the methodology gets declared once and referenced thereafter. An AI system reading a VCP-Lang declaration knows what value is being created, for whom, what relationships are in play, what context applies, and what trust posture governs the work. It can act on that declaration consistently across thousands of interactions without re-deriving it each time.

## The Three Primitive Declaration Types

VCP-Lang defines three primitive declaration types at v0.1. Everything else in the language is composed from these primitives.

### `value`

A declaration of what is being created, for whom, and under what conditions. Values are the load-bearing units of VCP-Lang. They are not preferences or settings — they are statements about what the organization holds as the substance of its work.

Conceptually, a value declaration answers:

- What is being created?
- For whom is it being created? *(reference to Lexicon-defined stakeholder terms)*
- Under what conditions does this value hold?

A value declaration is not absolute — it is contextual. The same organization can declare different values for different relationships, different stages of the Value Path, and different operating moments. What VCP-Lang locks in is the structure of the declaration, not its content.

### `context`

A declaration of the operating reality in which a value is being pursued. Context primitives capture the situated information an AI system needs to act faithfully — what stage of the Value Path a relationship is in, which of the Four Unified Views is currently relevant, what just happened, what is expected next.

Context declarations are not metadata in the technical sense. They are first-class declarations because the VCP methodology treats context as substrate — the foundation operations run on, not an input to operations.

Context declarations reference Lexicon terms for the operational vocabulary and reference Value Graph entities for the relationships involved.

### `trust`

A declaration of the trust posture under which work is being done. Trust primitives capture the TEACH-aligned positioning of any participant — human or AI — toward any stakeholder, in any specific moment.

A trust declaration answers:

- What posture is being held toward this stakeholder?
- Where does that posture sit on each of the five TEACH tensions (Transparent↔Trust, Empathetic↔Empowered, Agile↔Adaptable, Confidence↔Conviction, Humble↔Hungry)?
- What does this posture license, and what does it preclude?

Trust declarations are how the methodology's character commitments survive translation into AI-mediated work. Without them, the AI assumes a generic helpful posture trained from aggregate preference data. With them, the AI operates inside the specific trust posture the organization has chosen to hold.

## How a VCP-Lang Declaration Reads (Conceptual)

A VCP-Lang declaration is composed of one or more primitives, referencing Lexicon terms and Value Graph entities. The form is declarative: it states what is true about the operating posture, and AI systems referencing it inherit that truth.

Conceptually, a single declaration in the Researcher stage of a Value Path relationship might compose:

- A `value` primitive — *the organization is creating clarity about whether the methodology fits this person's situation; the person is creating an informed perspective on what they need.*
- A `context` primitive — *Researcher stage of the Value Path; Unified Customer View is primary; the person has not yet raised a hand; the most recent signal is a newsletter open.*
- A `trust` primitive — *Empathetic toward the person's confusion; Humble about what the organization does not yet know about their situation; Transparent about what the organization is and is not.*

The composed declaration tells an AI system what posture to hold, what context applies, and what value is being pursued — all in a form structured enough for consistent execution and readable enough for human authoring and audit.

The literal syntax for declarations is in active development.

## How VCP-Lang Gets Used

### By humans

A team authors VCP-Lang declarations for the operating conditions that recur in their work — each Value Path stage, each customer cohort, each program. The team writes the declaration once and references it thereafter. The act of authoring is a methodology exercise — *what value, for whom, in what context, with what trust posture?*

### By AI systems

AI agents operating inside a Value-First organization reference active VCP-Lang declarations as authoritative for the work at hand. The declaration tells the agent what value the human team is pursuing and what posture to hold while pursuing it. The agent's outputs — communications, decisions, recommendations — operate inside the declared posture rather than the generic posture trained from aggregate data.

### By tooling

Downstream tools — content systems, workflow engines, observability dashboards — reference VCP-Lang declarations to ensure the work they enable is aligned with the methodology the organization has chosen to run on.

## What Is Locked at v0.1

- The name *VCP-Lang* and its place as Layer B of the VCP encoding stack.
- The three primitive declaration types (`value`, `context`, `trust`).
- The declarative-not-imperative discipline.
- The dependency on the Lexicon (Layer A) for vocabulary and on the Value Graph (Layer C) for relationships.
- The openness of the specification — published publicly, freely usable.

## What Is in Active Development at v0.1

- The literal syntax for declarations. Candidates under consideration include YAML-style, S-expression style, and a custom syntax tuned for human authorability.
- The full set of fields within each primitive type.
- The composition rules — how primitives reference each other within a declaration.
- The publication format — likely a parser specification plus reference implementations in multiple languages.
- Versioning and compatibility — how declarations written against v0.1 will evolve to v1.0 without breaking existing deployments.
- The relationship between VCP-Lang and existing standards (HCP, MCP, Schema.org, JSON-LD).

## Forward Path

VCP-Lang stabilizes through use. Each implementation that authors VCP-Lang declarations against real operating work surfaces what the primitives need to express and what shape the syntax should take. v1.0 ships when the primitives have been exercised across multiple production deployments and the syntax has stopped changing.

In the meantime, VCP-Lang is published as a v0.1 specification. Practitioners are welcome to author declarations against it, build on it, fork it for their own contexts, and propose refinements through the Value-First Collective.

VCP-Lang is the grammar layer of the encoding stack. It is where the methodology's discipline becomes machine-readable without ceasing to be human-authorable.

---

*Version: 0.1*
*Status: Draft canon. Active development.*
*Authoritative location: valuefirstteam.com/vcp/vcp-lang*
*Maintained by: the Value-First Team and the Value-First Collective.*
