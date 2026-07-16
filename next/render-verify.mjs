/**
 * render-verify.mjs — the proof gate for the VCP Next.js re-platform.
 *
 * "Build green" is not proof. This serves the static export (out/) over real
 * HTTP (file:// breaks Next's absolute /_next asset paths) and screenshots a
 * representative page per archetype (home, canon, spec, manifesto, hub) in BOTH
 * themes at desktop + mobile, then asserts the page is actually STYLED — the
 * body background/colour resolve through the VCP token scale (--vcp-surface /
 * --vcp-ink), not the browser default white/black — and the shared SiteShell
 * chrome (header + footer) rendered.
 */
import playwright from '/mnt/d/node_modules/playwright/index.js';
const { chromium } = playwright;
import http from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = join(process.cwd(), 'out');
const OUT = join(process.cwd(), 'render-shots');
const PORT = 8793;

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json',
  '.txt': 'text/plain', '.woff2': 'font/woff2', '.ico': 'image/x-icon', '.jpg': 'image/jpeg',
};

async function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      let file = join(ROOT, p);
      try {
        const s = await stat(file);
        if (s.isDirectory()) file = join(file, 'index.html');
      } catch {
        if (!extname(file)) file = file + '.html';
      }
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404); res.end('not found');
    }
  });
  await new Promise((r) => server.listen(PORT, r));
  return server;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const server = await serve();
  const browser = await chromium.launch();
  const results = [];

  const pages = [
    { name: 'home', path: '/' },
    { name: 'canon-beliefs', path: '/beliefs' },
    { name: 'spec-lexicon', path: '/lexicon' },
    { name: 'manifesto-positioning', path: '/positioning' },
    { name: 'hub-methodology', path: '/methodology' },
    { name: 'language-of-value', path: '/language-of-value' },
  ];
  const themes = ['light', 'dark'];
  const viewports = [
    { vp: 'desktop', width: 1280, height: 900 },
    { vp: 'mobile', width: 390, height: 844 },
  ];

  for (const pg of pages) {
    for (const theme of themes) {
      for (const { vp, width, height } of viewports) {
        const ctx = await browser.newContext({ viewport: { width, height } });
        const page = await ctx.newPage();
        await ctx.addInitScript((t) => {
          try { localStorage.setItem('vf-theme', t); } catch {}
        }, theme);
        await page.goto(`http://localhost:${PORT}${pg.path}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(250);

        const probe = await page.evaluate(() => {
          const html = document.documentElement;
          const body = document.body;
          const bg = getComputedStyle(body).backgroundColor;
          const fg = getComputedStyle(body).color;
          const h1 = document.querySelector('h1');
          const header = document.querySelector('header');
          const footer = document.querySelector('footer');
          const vcpSurface = getComputedStyle(html).getPropertyValue('--vcp-surface').trim();
          const vcpInk = getComputedStyle(html).getPropertyValue('--vcp-ink').trim();
          const vfBrand = getComputedStyle(html).getPropertyValue('--vf-brand').trim();
          // Brand-mark fidelity: VCP must render ITS OWN mark (the faceted-gem
          // SVG at /brand/vcp-gem.svg + the serif wordmark in the logo slot),
          // NOT the homogenized VF Team LogoLockup (.logo-team-lockup / a "team
          // lockup" alt). The gem appears once in header + once in footer.
          const ownMarkCount = document.querySelectorAll('img[src*="/brand/vcp-gem.svg"]').length;
          const ownWordmark = Array.from(document.querySelectorAll('header, footer'))
            .some((el) => /Value Creation Protocol/i.test(el.textContent || ''));
          const vfLockup =
            !!document.querySelector('.logo-team-lockup') ||
            !!document.querySelector('[class*="logo-team-lockup"]') ||
            Array.from(document.querySelectorAll('header img, footer img'))
              .some((img) => /team[-\s]?lockup|value-first team/i.test(img.getAttribute('alt') || ''));
          return {
            isDark: html.classList.contains('dark'),
            bg, fg,
            hasH1: !!h1,
            hasHeader: !!header,
            hasFooter: !!footer,
            vcpSurface, vcpInk, vfBrand,
            ownMarkCount, ownWordmark, vfLockup,
          };
        });

        const shot = join(OUT, `${pg.name}-${theme}-${vp}.png`);
        await page.screenshot({ path: shot, fullPage: vp === 'desktop' });
        results.push({ page: pg.name, theme, vp, probe, shot });
        await ctx.close();
      }
    }
  }

  await browser.close();
  server.close();

  // ---- Assertions ----
  let failures = 0;
  const WHITE = 'rgb(255, 255, 255)';
  const BLACK = 'rgb(0, 0, 0)';
  for (const r of results) {
    const { isDark, bg, fg, vcpSurface, vcpInk, vfBrand, hasH1, hasHeader, hasFooter,
            ownMarkCount, ownWordmark, vfLockup } = r.probe;
    const tag = `${r.page} / ${r.theme} / ${r.vp}`;
    const themeMatches = isDark === (r.theme === 'dark');
    // styled = VCP token scale is bound AND body bg is not the unstyled default
    const tokensBound = vcpSurface.length > 0 && vcpInk.length > 0 && vfBrand.length > 0;
    const styled = tokensBound && bg !== '' && !(bg === WHITE && fg === BLACK);
    // brand fidelity: own mark present (gem + wordmark), VF lockup absent
    const brandOwn = ownMarkCount >= 1 && ownWordmark && !vfLockup;
    const ok = themeMatches && styled && hasH1 && hasHeader && hasFooter && brandOwn;
    if (!ok) failures++;
    console.log(
      `${ok ? 'PASS' : 'FAIL'}  ${tag.padEnd(34)} bg=${bg} dark=${isDark} surface=[${vcpSurface}] ink=[${vcpInk}] vfBrand=[${vfBrand}] h1=${hasH1} hdr=${hasHeader} ftr=${hasFooter} ownMark=${ownMarkCount} wordmark=${ownWordmark} vfLockup=${vfLockup}`
    );
  }
  console.log(`\n${results.length - failures}/${results.length} render checks passed. Shots in ${OUT}`);
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
