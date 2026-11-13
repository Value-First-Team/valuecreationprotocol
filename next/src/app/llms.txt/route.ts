/**
 * /llms.txt — markdown index of this site for LLM / agent consumers
 * (llmstxt.org). Built from the same build-time route-walk as /sitemap
 * (@vf/recipes/sitemap llmsTxt). force-static so it prerenders during the build
 * (where src/app exists) and serves as a static text file.
 */
import path from 'node:path';
import { llmsTxt } from '@vf/recipes/sitemap';
import { CANON_PAGE_FAMILIES } from '@vf/brand';
import { METHODOLOGY_PAGES } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * A framework page's title is its family's name, read from the same list /sitemap and the hub read (METHODOLOGY_PAGES,
 * from @vf/brand). Its metadata is a call (`frameworkMetadata`), which the route walk cannot read, so without this the
 * walk title-cases the path: "Care" for CARE, "Teach" for the TEACH Values (build 8, 2026-11-13). Only the families:
 * every other page's metadata is static and the walk reads its own title.
 */
const FAMILIES: readonly string[] = CANON_PAGE_FAMILIES;
const TITLES: Record<string, string> = Object.fromEntries(METHODOLOGY_PAGES.filter((p) => FAMILIES.includes(p.key)).map((p) => [p.href, p.name]));

export function GET() {
  const body = llmsTxt({
    appDir: path.join(process.cwd(), 'src/app'),
    baseUrl: 'https://valuecreationprotocol.com',
    siteName: 'Value Creation Protocol',
    titles: TITLES,
  });
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
