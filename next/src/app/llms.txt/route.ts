/**
 * /llms.txt — markdown index of this site for LLM / agent consumers
 * (llmstxt.org). Built from the same build-time route-walk as /sitemap
 * (@vf/recipes/sitemap llmsTxt). force-static so it prerenders during the build
 * (where src/app exists) and serves as a static text file.
 */
import path from 'node:path';
import { llmsTxt } from '@vf/recipes/sitemap';

export const dynamic = 'force-static';

export function GET() {
  const body = llmsTxt({
    appDir: path.join(process.cwd(), 'src/app'),
    baseUrl: 'https://valuecreationprotocol.com',
    siteName: 'Value Creation Protocol',
  });
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
