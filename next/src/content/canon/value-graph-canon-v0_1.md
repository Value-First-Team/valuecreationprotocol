# Value Graph — Canonical Reference v0.1

*Layer C of the VCP Encoding Stack*

**Status:** Draft canon. Concept name and architectural role are locked. Implementation is in active development.

**Authoritative source for:** the public-facing definition of the Value Graph, its purpose within the VCP encoding stack, its entity and relationship types, and the platform-agnostic discipline that distinguishes it from a CRM data model.

**Companion documents:** VCP Canonical Reference v1.0 (which establishes the encoding stack), Value-First Lexicon Canon Doc v0.1 (Layer A), VCP-Lang Canon Doc v0.1 (Layer B).

---

## What the Value Graph Is

The Value Graph is a platform-agnostic relational structure for representing mutual value creation across all the stakeholders of a business. It is how the Value-First methodology's relationship-first worldview becomes machine-readable.

It is Layer C of the three-layer VCP encoding stack:

- **Layer A — Lexicon** — vocabulary. What words mean.
- **Layer B — VCP-Lang** — grammar. How those words declare values, context, and trust.
- **Layer C — Value Graph** — relational structure. How those declarations connect into mutual value creation.

The Value Graph sits at the top of the stack because it is where the methodology's worldview gets fully expressed. Lexicon names things. VCP-Lang declares postures toward those things. The Value Graph captures how all the things relate to each other in the work of creating value together.

## What the Value Graph Is Not

The Value Graph is not a CRM data model. CRM data models center on accounts and contacts as objects of action — things to be worked on. The Value Graph centers on relationships as units of value — things that exist between participants, where value flows in multiple directions.

The Value Graph is not a knowledge graph in the technical sense of an RDF-style ontology. It uses some of the same primitives — entities, relationships, attributes — but its purpose is different. A knowledge graph captures what is true about the world; the Value Graph captures what is being created among participants.

The Value Graph is not a Sales pipeline. Pipelines model linear progressions toward a transaction. The Value Graph models networks of ongoing relationships that include but are not bounded by transactions.

The Value Graph is not a graph database product. It is a specification that can be implemented in graph databases, relational databases, document stores, CVPs (Customer Value Platforms — HubSpot among them), or any combination. The structure is the canon; the implementation is up to the organization.

The Value Graph is not finished. v0.1 captures the entity and relationship type taxonomy. The full specification is in active development.

## Why a Relational Structure Is Necessary

The Five Core Beliefs of the Value-First methodology include *Mutual value creation* (value is created across stakeholders, not extracted from them) and *Relationships over transactions* (relationships are the unit of value creation; transactions are events within them).

These beliefs cannot live in a data model designed for the inverse worldview. A CRM that treats *accounts* as records and *contacts* as people-on-records and *opportunities* as transactions-in-flight is encoding the industrial-age operating model into the foundation of every query, every report, every AI-generated recommendation. The data structure encodes the worldview, and the worldview leaks back into every decision made on top of it.

The Value Graph is the alternative substrate. It encodes the relationship-first, multi-stakeholder, mutual-value worldview at the level of the data model itself. AI systems reasoning over a Value Graph cannot easily produce industrial-age outputs because the data structure does not represent the world in those terms.

This is the deepest layer of the VCP encoding stack because it shapes what the AI can even see. If the AI cannot see *relationships*, it cannot reason about them. If it cannot see *value flows in multiple directions*, it cannot produce recommendations that honor them.

## The Entity Types

The Value Graph defines five primary entity types at v0.1. These are not the only entities a Value-First implementation will use — they are the load-bearing primitives the Graph guarantees.

### Participants

Any individual or organization engaged in value creation. Participants include customers, team members, contributors, partners, advocates, and the organization itself. The Value Graph does not privilege one participant type as the subject of action and the others as objects — all participants can give and receive value.

### Relationships

Connections between Participants. A Relationship is the primary unit of value creation. Relationships have stages along the Value Path, current Unified View contexts, trust postures expressed via VCP-Lang, and histories of value flows.

### Value Flows

Movements of value between Participants within a Relationship. Value Flows are multi-directional and multi-form. Value can flow as money, time, attention, information, capability, trust, advocacy, or any other form the methodology recognizes. The Value Graph treats them as the substantive content of the Relationship, not as side effects.

### Contexts

The operating reality of a Relationship at a given moment. Contexts capture Value Path stage, active Unified Views, recent Signals, and any other situated information needed for AI systems to act faithfully. Contexts are first-class entities because the methodology treats context as substrate.

### Investments

Resources committed in service of value creation. Investments include money, time, attention, infrastructure, and any other resource the organization chooses to track. They are called Investments rather than Expenses because the methodology treats outflows as productive commitments toward value creation, not as costs to minimize.

## The Relationship Types

The Value Graph defines four primary relationship types at v0.1 — the connections between entities.

### `participates_in`

Connects a Participant to a Relationship. The most basic relationship type. Multiple Participants participate in any given Relationship.

### `flows_within`

Connects a Value Flow to a Relationship. Every Value Flow happens within a specific Relationship — value does not exist in isolation from the relational context.

### `applies_to`

Connects a Context to a Relationship. The current Context applies to the Relationship and shapes what value the Participants are creating together at this moment.

### `commits_to`

Connects an Investment to a Relationship or to a Participant. Investments are committed in service of value creation, not made in isolation. The `commits_to` relationship makes the purpose of each Investment explicit.

## How the Graph Composes

The Value Graph composes from these primitives into representations of real business activity. A single customer relationship might appear in the Graph as:

- Two Participants — the customer organization and the Value-First implementing organization
- One Relationship between them, currently in the Adopter stage of the Value Path
- A history of Value Flows in multiple directions — money flowing one way, methodology and capability flowing the other, trust and advocacy beginning to flow in both
- A current Context — Unified Customer View primary, recent signals indicating expanded usage, no open issues
- Several Investments committed to the Relationship — implementation hours, ongoing advisory time, infrastructure costs

The same primitives compose to represent every other kind of stakeholder relationship the organization has — with team members, with contributors, with partners, with advocates. The Graph does not have separate sub-schemas for *customers* and *employees* and *vendors*. It has one schema that handles all participating stakeholders, because the methodology treats them all as participants in value creation.

## How the Value Graph Gets Used

### By humans

A team operating against a Value Graph queries it the way it would query any relational data — but the queries return relationship-shaped answers rather than transaction-shaped answers. *What relationships are in the Adopter stage? What value flows are active in our partner relationships? What investments have we committed to this advocate relationship and what has flowed back?*

### By AI systems

AI agents reasoning over a Value Graph operate inside the methodology's worldview by default. They cannot easily produce industrial-age outputs because the data structure does not represent the world in industrial-age terms. The Graph constrains the AI toward methodology-aligned thinking at the level of what it can even perceive.

### By tooling

Downstream tools — analytics platforms, AI agents, reporting systems — reference the Value Graph as the source of truth for relationships and value flows. The Graph is implemented in whatever platform the organization chooses (frequently HubSpot as the Customer Value Platform), and downstream tools query against that implementation.

## What Is Locked at v0.1

- The name *Value Graph* and its place as Layer C of the VCP encoding stack.
- The five primary entity types (Participants, Relationships, Value Flows, Contexts, Investments).
- The four primary relationship types (`participates_in`, `flows_within`, `applies_to`, `commits_to`).
- The platform-agnostic discipline — the specification does not dictate implementation.
- The openness of the specification — published publicly, freely usable.

## What Is in Active Development at v0.1

- The full attribute set for each entity type.
- Additional relationship types beyond the first four.
- The serialization format — likely JSON-LD compatible, building on Schema.org primitives where they fit.
- Reference implementations on common platforms — HubSpot first (as the canonical CVP implementation), with other platforms to follow.
- The contribution and versioning protocol for extensions to the Graph.
- The relationship between Value Graph queries and VCP-Lang declarations.

## Forward Path

The Value Graph stabilizes through implementation. Each platform that implements it surfaces what the entity types need to express, what relationships need to be added, and how the specification meets real operational queries. v1.0 ships when the entity and relationship types have been stable across at least two reference implementations and the serialization format is settled.

In the meantime, the Value Graph is published as a v0.1 specification. Practitioners are welcome to implement against it, build on it, fork it for their own contexts, and propose refinements through the Value-First Collective.

The Value Graph is the relational layer of the encoding stack. It is the deepest substrate of the VCP methodology — the layer where the worldview becomes the structure of what AI systems can even see.

---

*Version: 0.1*
*Status: Draft canon. Active development.*
*Authoritative location: valuecreationprotocol.com/value-graph*
*Maintained by: the Value-First Team and the Value-First Collective.*
