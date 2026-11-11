#!/usr/bin/env node
/**
 * assert-stage-bridge — the scroll stage's tokens on this site ARE the VCP identity, converted.
 *
 * src/styles/vcp-stage.css gives the shared stage (@vf/site-kit/scroll-stage) its --vf-* tokens inside
 * .vcp-stage as HSL triplets, because the stage reads triplets and this site's own preset (vcp-tokens.css) is
 * written in hex. Each triplet names its --vcp-* token in the comment beside it. This reads the token's hex out
 * of vcp-tokens.css (the identity's one source), converts it, and fails when any triplet, or the hex its comment
 * quotes, no longer matches. A --vcp-* colour changed without its triplet would otherwise ship a stage in the old
 * colour, and nothing would say so.
 *
 * USAGE   node scripts/assert-stage-bridge.mjs              the check
 *         node scripts/assert-stage-bridge.mjs --calibrate  proves it fails on a planted mismatch (exit 0 when it does)
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const STYLES = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'styles');
const tokens = readFileSync(join(STYLES, 'vcp-tokens.css'), 'utf8');
let bridge = readFileSync(join(STYLES, 'vcp-stage.css'), 'utf8');
const CALIBRATE = process.argv.includes('--calibrate');
if (CALIBRATE) bridge = bridge.replace('--vf-brand: 174.7 83.9% 31.6%;', '--vf-brand: 184 70% 29.4%;');

function hexOf(name) {
  const m = tokens.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  if (!m) throw new Error(`assert-stage-bridge: ${name} has no hex value in vcp-tokens.css`);
  return m[1].toLowerCase();
}
function hsl(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  let h = 0, s = 0;
  if (mx !== mn) {
    const d = mx - mn;
    s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    h = (mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4) * 60;
  }
  return [h, s * 100, l * 100];
}

const rows = [...bridge.matchAll(/(--vf-[a-z-]+):\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%;\s*\/\*\s*(--vcp-[a-z0-9-]+)\s+(#[0-9a-fA-F]{6})/g)];
const failures = [];
if (rows.length < 16) failures.push(`expected the bridge's two blocks of triplets, read ${rows.length}`);
for (const [, vf, H, S, L, vcp, quoted] of rows) {
  const hex = hexOf(vcp);
  if (quoted.toLowerCase() !== hex) failures.push(`${vf}: its comment quotes ${vcp} as ${quoted}, but vcp-tokens.css says ${hex}`);
  const [h, s, l] = hsl(hex);
  const off = Math.max(Math.abs(h - Number(H)), Math.abs(s - Number(S)), Math.abs(l - Number(L)));
  if (off > 0.06) failures.push(`${vf}: ${H} ${S}% ${L}% is not ${vcp} ${hex} (${h.toFixed(1)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`);
}

if (CALIBRATE) {
  if (failures.length) { console.log(`assert-stage-bridge --calibrate: the planted mismatch was caught (${failures.length}). The check can fail.`); process.exit(0); }
  console.error('assert-stage-bridge --calibrate: the planted mismatch was NOT caught. The check cannot be trusted.');
  process.exit(1);
}
if (failures.length) {
  console.error(`assert-stage-bridge: FAIL\n  ${failures.join('\n  ')}`);
  process.exit(1);
}
console.log(`assert-stage-bridge: ${rows.length} stage tokens match the VCP identity they carry.`);
