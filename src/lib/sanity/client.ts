import { createClient } from '@sanity/client';

/**
 * Sanity read-only client for valuecreationprotocol.com.
 *
 * Shared project with valuefirstteam.com — same canon documents, different render shell.
 * Project: 0efm0pow | Dataset: production
 *
 * ALL WRITES GO THROUGH CANON AGENT — never call mutations directly from this site.
 */
export const sanityClient = createClient({
  projectId: '0efm0pow',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  // Read-only token — never use a write-capable token here.
  // Set SANITY_API_READ_TOKEN in Vercel environment variables.
  token: import.meta.env.SANITY_API_READ_TOKEN,
});

/**
 * Execute a GROQ query against the shared Sanity dataset.
 * Returns null on error rather than throwing, so pages render gracefully
 * if Sanity is temporarily unavailable.
 */
export async function sanityQuery<T = unknown>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error('[sanity] query failed:', error);
    return null;
  }
}
