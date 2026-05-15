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
 * Get the 3 Three-Org records, ordered by sortOrder asc (Customer=1, Operations=2, Finance=3).
 *
 * Each org carries its full structured field set: name, slug, sortOrder, accentColor,
 * purpose, oneLineDefinition, owns[], doesNotOwn, keyPrinciple, whoBelongsHere[],
 * humanRole, leadershipMode, aiLeaderName, aiHandles, humanHandles, firmLivedExample,
 * plus resolved primaryUnifiedView and supportingUnifiedViews references and relatedTraps.
 */
export async function getThreeOrgs() {
  const result = await sanityQuery<
    Array<{
      _id: string;
      name: string;
      slug?: { current: string };
      sortOrder: number;
      accentColor?: string;
      icon?: string;
      purpose?: string;
      oneLineDefinition?: string;
      owns?: string[];
      doesNotOwn?: string;
      keyPrinciple?: string;
      whoBelongsHere?: string[];
      humanRole?: string;
      leadershipMode?: 'human-led' | 'ai-led' | 'shared';
      aiLeaderName?: string;
      aiHandles?: string;
      humanHandles?: string;
      firmLivedExample?: string;
      primaryUV?: { _id: string; name: string; slug?: { current: string } } | null;
      supportingUVs?: Array<{ _id: string; name: string; slug?: { current: string } }> | null;
      traps?: Array<{ _id: string; name: string; slug?: { current: string } }> | null;
    }>
  >(
    `*[_type == "threeOrg"] | order(sortOrder asc){
      _id, name, slug, sortOrder, accentColor, icon,
      purpose, oneLineDefinition,
      owns, doesNotOwn, keyPrinciple, whoBelongsHere,
      humanRole, leadershipMode, aiLeaderName, aiHandles, humanHandles, firmLivedExample,
      "primaryUV": primaryUnifiedView->{_id, name, slug},
      "supportingUVs": supportingUnifiedViews[]->{_id, name, slug},
      "traps": relatedTraps[]->{_id, name, slug}
    }`
  );
  return result ?? [];
}

/**
 * Get the Value-Led Growth singleton document.
 *
 * Returns null if the document doesn't exist. Resolves nested references inside
 * componentWhere.stages (valuePathStage), componentWho.orgs (threeOrg),
 * componentWhat.views (unifiedGoal). componentHow has no references — only arrays of strings.
 */
export interface ValueLedGrowth {
  _id: string;
  title?: string;
  tagline?: string;
  theQuestion?: string;
  theAnswer?: string;
  oneLineDefinition?: string;
  fullDefinition?: string;
  reframeIntro?: string;
  reframePairs?: Array<{ _key?: string; traditional: string; valueLed: string }>;
  componentsIntro?: string;
  componentWhere?: {
    label?: string;
    componentName?: string;
    description?: string;
    stages?: Array<{ _id: string; name: string; number: number; slug?: { current: string } }>;
  };
  componentWho?: {
    label?: string;
    componentName?: string;
    description?: string;
    orgs?: Array<{ _id: string; name: string; slug?: { current: string }; sortOrder?: number }>;
  };
  componentWhat?: {
    label?: string;
    componentName?: string;
    description?: string;
    views?: Array<{ _id: string; name: string; slug?: { current: string } }>;
  };
  componentHow?: {
    label?: string;
    componentName?: string;
    description?: string;
    aiHandles?: string[];
    humanHandles?: string[];
    leverageStatement?: string;
  };
  comparisons?: Array<{
    _key?: string;
    modelName: string;
    definition?: string;
    limitation?: string;
    valueLedDifference?: string;
  }>;
  beliefStatements?: Array<{ _key?: string; headline: string; elaboration?: string }>;
  honestAssessment?: string;
  transformationStages?: Array<{ _key?: string; name: string; description?: string }>;
  timelineFraming?: string;
  theInvitation?: string;
}

export async function getValueLedGrowth(): Promise<ValueLedGrowth | null> {
  const result = await sanityQuery<ValueLedGrowth>(
    `*[_id == "valueLedGrowth"][0]{
      _id, title, tagline, theQuestion, theAnswer,
      oneLineDefinition, fullDefinition,
      reframeIntro, reframePairs,
      componentsIntro,
      "componentWhere": componentWhere{
        label, componentName, description,
        "stages": stages[]->{_id, name, number, slug}
      },
      "componentWho": componentWho{
        label, componentName, description,
        "orgs": orgs[]->{_id, name, slug, sortOrder}
      },
      "componentWhat": componentWhat{
        label, componentName, description,
        "views": views[]->{_id, name, slug}
      },
      componentHow,
      comparisons,
      beliefStatements,
      honestAssessment, transformationStages, timelineFraming, theInvitation
    }`
  );
  return result;
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
