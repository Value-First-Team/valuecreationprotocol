# Value Creation Protocol — CLAUDE.md

> **Project:** valuecreationprotocol.com
> **Repo:** github.com/chris-carolan/valuecreationprotocol
> **Vercel:** Chris Carolan personal account (chriscarolan-4469)
> **Domain:** valuecreationprotocol.com
> **Stack:** Astro 5 + React + Tailwind + TypeScript + Sanity client
> **Sanity:** Shared project `0efm0pow` / dataset `production` (read-only from this site; writes through Canon)

This is a **standalone repo** — not part of the Value-First Operations monorepo. It imports
enforcement rules, agent definitions, and the Dewey index from the monorepo via @import.

## Monorepo context (imported)

@/mnt/d/Projects/value-first-operations/CLAUDE.md

## VCP-specific local context

### Purpose
valuecreationprotocol.com is the canonical protocol home for the Value Creation Protocol (VCP).
It publishes the open framework independently of Value-First Team as a firm — a peer to
modelcontextprotocol.io and humancontextprotocol.com.

Reads as: calm, technical, protocol home. Not a sales surface. No firm-promotional content
beyond the Implementers section on canon pages (names Value-First Team as canonical implementing firm).

### Staging markdown location
Canon source documents (staged markdown) are at:
`/mnt/d/Projects/VFT_Platform/2026_VFT_Platform_Infrastructure/apps/sites/valuecreationprotocol/`

### Sanity configuration
- Project: `0efm0pow`
- Dataset: `production`
- Read-only client only — all writes go through Canon agent (governance gateway)
- Read token via `SANITY_API_READ_TOKEN` env var (see `.env.example`)

### Deployment target
- Vercel project on Chris Carolan personal account (`chriscarolan-4469`)
- Production deploy from `main` branch
- Custom domain: `valuecreationprotocol.com`
- No local build gates — Vercel is the test environment

### Git discipline
- All work stays on `main` — no branch switching on cockpit PC
- Auto-commit and auto-push per `feedback_auto_push_builds` memory
- No `pnpm build` checks pre-commit per `feedback_no_local_build_gates_in_briefs` memory

### Agent routing
- **Site scaffolding and page authoring** → Showcase (FR-4 and beyond)
- **Sanity writes** → Canon (gateway — never direct patch.js calls)
- **HubSpot writes** → Ledger (gateway)
- **Visual QA and deploy verification** → Mirror
- **SEO and broken-link sweeps** → Lookout
- **CTA effectiveness** → Waypoint
- **Repo + Vercel maintenance** → Squire

### Enforcement (always active)
Forbidden vocabulary: leads, prospects, funnel, conversion, MQL, SQL, nurture, targets,
quick wins, Phase 1, Phase 2, Week 1, Week 2.

No canonical-tag delegation between vcp.com and valuefirstteam.com (TR-8 — hard rule).
Mutual cross-citation pattern instead (TR-9).

Canon updates flow vcp.com-first (editorial primary). All canon edits land via Canon agent.

### PRD reference
Full PRD at: `/mnt/d/Projects/value-first-operations/docs/plans/valuecreationprotocol-prd.md`
Current task: FR-1 (repo + infrastructure). Showcase takes over at FR-4 (site shell).
