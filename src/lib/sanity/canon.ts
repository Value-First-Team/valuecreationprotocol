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
 */
export async function getCoreBeliefs() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      position: number | null;
      shortLabel?: string;
      tagline?: string;
      body?: unknown;
    }>
  >(
    `*[_type == "coreBelief"] | order(coalesce(position, 99) asc){
      _id, name, position, shortLabel, tagline, body
    }`
  );
  return result ?? [];
}

/**
 * Get all 12 Twelve Traps records, ordered alphabetically by name.
 */
export async function getTraps() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      slug: { current: string };
      assessmentPath?: string;
      body?: unknown;
    }>
  >(
    `*[_type == "trap"] | order(name asc){
      _id, name, slug, assessmentPath, body
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
 */
export async function getUnifiedGoals() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      description: string;
      primaryOrg?: string;
      howItTransforms?: string;
      keyQuestions?: string[];
      color?: { hex: string };
      relatedTraps?: Array<{ _id: string; name: string; slug: { current: string } }>;
    }>
  >(
    `*[_type == "unifiedGoal"]{
      _id, name, description, primaryOrg, howItTransforms, keyQuestions, color,
      "relatedTraps": relatedTraps[]->{_id, name, slug}
    }`
  );
  return result ?? [];
}

/**
 * Get all 15 valueReality records with their commitments.
 */
export async function getValueRealities() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      title?: string;
      name?: string;
      summary?: string;
      number?: number;
      accentColor?: string;
      slug?: { current: string };
      commitments?: Array<{
        _key: string;
        number: number;
        title: string;
        actions?: string[];
      }>;
      relatedTrap?: { _id: string; name: string; slug: { current: string } };
    }>
  >(
    `*[_type == "valueReality"] | order(number asc, _createdAt asc){
      _id, title, name, summary, number, accentColor, slug,
      commitments,
      "relatedTrap": relatedTrap->{_id, name, slug}
    }`
  );
  return result ?? [];
}
