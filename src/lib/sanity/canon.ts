/**
 * Canon doc metadata fetchers — pulls title/version/status/effectiveDate from Sanity
 * for the strategicDocument / encodingStackDoc / frameworkConcept / coreBelief records
 * Canon created.
 *
 * Body content lives in staged markdown — see ../markdown.ts.
 */
import { sanityQuery } from './client';

export interface CanonDocMeta {
  _id: string;
  _type: string;
  title?: string;
  name?: string;
  version?: string;
  status?: string;
  effectiveDate?: string;
  summary?: string;
  documentType?: string;
}

/**
 * Fetch metadata for a single canon document by _id.
 * Returns null if the doc doesn't exist or Sanity is unreachable.
 */
export async function getCanonDoc(id: string): Promise<CanonDocMeta | null> {
  const result = await sanityQuery<CanonDocMeta>(
    `*[_id == $id][0]{
      _id,
      _type,
      title,
      name,
      version,
      status,
      effectiveDate,
      summary,
      documentType
    }`,
    { id }
  );
  return result;
}

/**
 * Fetch metadata for multiple canon docs by _id in a single query.
 */
export async function getCanonDocs(ids: string[]): Promise<CanonDocMeta[]> {
  const result = await sanityQuery<CanonDocMeta[]>(
    `*[_id in $ids]{
      _id,
      _type,
      title,
      name,
      version,
      status,
      effectiveDate,
      summary,
      documentType
    }`,
    { ids }
  );
  return result ?? [];
}

/**
 * Get all 6 core belief records, ordered by position (Belief #5 = Emergence over Predictability).
 * Legacy coreBelief-evolution (position null) appears at the end.
 *
 * `principle` carries the canonical "X over Y" form (e.g. "Natural Value Flow over Artificial Control");
 * `name` carries the short X (e.g. "Natural Value Flow"). Both are populated; tagline/shortLabel are not.
 */
export async function getCoreBeliefs() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      principle?: string;
      position: number | null;
      slug?: { current: string };
      shortLabel?: string;
      tagline?: string;
      body?: unknown;
    }>
  >(
    `*[_type == "coreBelief"] | order(coalesce(position, 99) asc){
      _id, name, principle, position, slug, shortLabel, tagline, body
    }`
  );
  return result ?? [];
}

/**
 * Get all 12 Twelve Traps records, ordered alphabetically by name.
 *
 * Sanity carries rich structured fields per trap — `tagline` is the one-line
 * definition, `oneLineDefinition` is a slightly longer canonical sentence,
 * `headline` is the "When X meets Y" framing, `subheadline` is the long-form
 * diagnostic paragraph, `keySymptoms[]` is the recognition list, `theAlternative`
 * is the inverted operating habit, `valueFirstAlternative` is the Reality name.
 */
export async function getTraps() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      slug: { current: string };
      assessmentPath?: string;
      category?: string;
      tagline?: string;
      oneLineDefinition?: string;
      headline?: string;
      subheadline?: string;
      keySymptoms?: string[];
      theAlternative?: string;
      valueFirstAlternative?: string;
      body?: unknown;
    }>
  >(
    `*[_type == "trap"] | order(name asc){
      _id, name, slug, assessmentPath, category,
      tagline, oneLineDefinition, headline, subheadline,
      keySymptoms, theAlternative, valueFirstAlternative,
      body
    }`
  );
  return result ?? [];
}

/**
 * Get all 8 Value Path stages, ordered by stage number.
 */
export async function getValuePathStages() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      number: number;
      mantra: string;
      description: string;
      whatItMeans?: string;
      slug: { current: string };
      color?: { hex: string };
      signalsOfReadiness?: string[];
      typicalChallenges?: string[];
      typicalTraps?: Array<{ _ref: string }>;
    }>
  >(
    `*[_type == "valuePathStage"] | order(number asc){
      _id, name, number, mantra, description, whatItMeans, slug, color,
      signalsOfReadiness, typicalChallenges,
      "typicalTraps": typicalTraps[]->{_id, name, slug}
    }`
  );
  return result ?? [];
}

/**
 * Get all 4 Unified Views (UCV, URV, UBC, UTE).
 *
 * Each view has a `tagline` (the one-line elevator), a long `description`,
 * `primaryOrg` (customer-org / finance-org / operations-org), `howItTransforms`
 * (the before→after operating shift), `keyQuestions[]` the view answers, and
 * `relatedTraps[]` references — the traps each view counters by existing.
 */
export async function getUnifiedGoals() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      tagline?: string;
      description: string;
      primaryOrg?: string;
      howItTransforms?: string;
      keyQuestions?: string[];
      color?: { hex: string };
      relatedTraps?: Array<{ _id: string; name: string; slug: { current: string } }>;
    }>
  >(
    `*[_type == "unifiedGoal"]{
      _id, name, tagline, description, primaryOrg, howItTransforms, keyQuestions, color,
      "relatedTraps": relatedTraps[]->{_id, name, slug}
    }`
  );
  return result ?? [];
}

/**
 * Get all 15 valueReality records with their commitments.
 *
 * Each Reality carries:
 *   - `name` — the Reality name (e.g. "Value-First Communication")
 *   - `number` — canonical ordering (1..15)
 *   - `corePrinciple` — the one-line operating principle
 *   - `headline` — the failure-mode framing ("When X, Y happens")
 *   - `manifestoTitle` — long-form section title
 *   - `shiftFrom` / `shiftTo` — the operating shift this Reality demands
 *   - `keyPractices[]` — short practice statements
 *   - `icon` — emoji identifier
 *   - `commitments[]` — numbered commitments with actions[]
 *   - `countersTrap` — reference to the Trap this Reality counters
 *   - `accentColor` / `pillar` — display + grouping metadata
 */
export async function getValueRealities() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name?: string;
      number?: number;
      slug?: { current: string };
      corePrinciple?: string;
      headline?: string;
      manifestoTitle?: string;
      shiftFrom?: string;
      shiftTo?: string;
      keyPractices?: string[];
      icon?: string;
      accentColor?: string;
      pillar?: string;
      commitments?: Array<{
        _key: string;
        number: number;
        title: string;
        actions?: string[];
      }>;
      countersTrap?: { _id: string; name: string; slug: { current: string } };
    }>
  >(
    `*[_type == "valueReality"] | order(number asc, _createdAt asc){
      _id, name, number, slug,
      corePrinciple, headline, manifestoTitle,
      shiftFrom, shiftTo, keyPractices, icon, accentColor, pillar,
      commitments,
      "countersTrap": countersTrap->{_id, name, slug}
    }`
  );
  return result ?? [];
}
