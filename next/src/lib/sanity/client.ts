/**
 * Sanity read-only client for valuecreationprotocol.com (Next.js build-time).
 *
 * Shared project with valuefirstteam.com — same canon documents, different
 * render shell. Project: 0efm0pow | Dataset: production.
 *
 * Reads run at BUILD TIME (SSG). The published `production` dataset is publicly
 * readable via the API CDN, so no token is required to bake content into the
 * static export — the same content the Astro version fetched at request time.
 *
 * ALL WRITES GO THROUGH CANON AGENT — never call mutations from this site.
 */

const PROJECT_ID = '0efm0pow';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';

// apicdn = the read-optimized CDN host (matches the Astro client's useCdn: true).
const CDN_BASE = `https://${PROJECT_ID}.apicdn.sanity.io/${API_VERSION}/data/query/${DATASET}`;

/**
 * Execute a GROQ query against the shared Sanity dataset at build time.
 * Returns null on error rather than throwing — but callers render visible
 * content from the result, so a null here would surface as a build-time
 * console error (caught by the section-completeness gate), not a silent
 * fallback shipped to production.
 */
export async function sanityQuery<T = unknown>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    const url = new URL(CDN_BASE);
    url.searchParams.set('query', query);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
    const res = await fetch(url.toString(), {
      // Build-time fetch — cache aggressively within a single build.
      cache: 'force-cache',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      console.error('[sanity] query HTTP error:', res.status, res.statusText);
      return null;
    }
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch (error) {
    console.error('[sanity] query failed:', error);
    return null;
  }
}
