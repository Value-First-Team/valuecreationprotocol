#!/usr/bin/env node
/**
 * canon-drift-gate — the protocol site serves canon by hand-copied markdown.
 *
 * WHY THIS EXISTS. `next/src/content/canon/` and `next/src/content/wiki-canonical/` are
 * copies. Nothing regenerated them and nothing compared them, so on 2026-09-20
 * /teach was serving the TEACH v1.0 interim draft — "Moving quickly while
 * reshaping form", under a visible PENDING CHRIS APPROVAL banner — five weeks
 * after Chris authored the v1.1 text that replaced it, and /positioning was
 * serving two superseded Core Belief names. A hand copy never announces that it
 * has gone stale. This gate is the announcement.
 *
 * WHAT IT CHECKS. Every paired file, byte for byte against its master in the
 * brain (line endings normalised, nothing else). Drift is a FAILURE, not a
 * warning. It also fails on any content file that is neither paired nor
 * exempted, so a new copy cannot arrive unaudited.
 *
 * WHAT IT HONESTLY CANNOT CHECK. The masters live in the brain repo, which is
 * not present in the Vercel build container. With no canon root the gate SKIPS
 * and exits 0, and says so the way the changelog launcher beside it does: on
 * stderr, naming every place it looked, ending "NOTHING WAS CHECKED -- this is
 * not a pass." (Until 2026-09-28 it skipped on stdout and ignored MAINBRAIN_ROOT,
 * so a check run from a clone outside the brain, with MAINBRAIN_ROOT set as the
 * CHANGELOG asks, ran the changelog check for real and skipped this one in a line
 * that read like a note.) So this is a local/authoring gate: run it where the
 * brain is, or point it at one, before you push. A generator-fed pipeline that
 * removes the hand copy altogether is the UNBOUND alignment plan's work, not
 * this gate's.
 *
 * WHERE IT LOOKS, in order: $VCP_CANON_ROOT (a canon/canonical folder), the
 * brain this repo sits inside (walking up from the repo), then $MAINBRAIN_ROOT
 * (a MainBrain checkout — the same variable the changelog launcher reads).
 *
 * USAGE   node scripts/canon-drift-gate.mjs [--fix]
 *         VCP_CANON_ROOT=/path/to/canon/canonical node scripts/canon-drift-gate.mjs
 *         MAINBRAIN_ROOT=/path/to/MainBrain node scripts/canon-drift-gate.mjs
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..', '..'); // .sites/valuecreationprotocol
const FIX = process.argv.includes('--fix');

/** Content trees that carry hand-copied canon. The retired Astro tree's
 *  `src/content` was covered here too until 2026-09-28, when that tree was
 *  deleted from the repo root. */
const CONTENT_ROOTS = ['next/src/content'];

/** site-relative path  ->  master filename under canon/canonical/ */
const PAIRED = {
  'canon/teach-values-canonical-reference.md': 'teach-values-canonical-reference.md',
  'canon/Value-Creation-Protocol-Positioning-Paper.md': 'value-creation-protocol-positioning-paper.md',
  'canon/vcp-canonical-reference.md': 'vcp-canonical-reference.md',
  'wiki-canonical/five-core-beliefs-canonical-reference.md': 'five-core-beliefs-canonical-reference.md',
  'wiki-canonical/12-complexity-traps-canonical-reference.md': '12-complexity-traps-canonical-reference.md',
  'wiki-canonical/four-unified-views-canonical-reference.md': 'four-unified-views-canonical-reference.md',
  'wiki-canonical/hubspot-cvp-canonical-reference.md': 'hubspot-cvp-canonical-reference.md',
  'wiki-canonical/value-realities-canonical-reference.md': 'value-realities-canonical-reference.md',
  'wiki-canonical/four-pillars-canonical-reference.md': 'four-pillars-canonical-reference.md',
  'wiki-canonical/three-org-model-canonical-reference.md': 'three-org-model-canonical-reference.md',
  'wiki-canonical/value-first-language-translation-guide.md': 'value-first-language-translation-guide.md',
  'wiki-canonical/value-led-growth-canonical-reference.md': 'value-led-growth-canonical-reference.md',
  'wiki-canonical/value-loop-canonical-reference-v1.md': 'value-loop-canonical-reference-v1.md',
  'wiki-canonical/value-path-canonical-reference-v1.1.md': 'value-path-canonical-reference-v1.1.md',
};

/** Unpaired on purpose. Each reason is a claim someone can check and overturn. */
const EXEMPT = {
  'canon/hubspot-cvp-canonical-reference-v1_1.md':
    'SERVED at /hubspot-cvp. Diverges STRUCTURALLY from the master, not by staleness: it carries two VCP-site sections the master has no equivalent for ("Disambiguation: CVP vs. VCP", "CVP and VCP-Aligned Operations") and lacks the master\'s "Native Objects as Value Architecture" and "The 2026 Evolution". Both documents call themselves v1.1 and they are different documents. Reconciling them is methodology authorship — Oracle\'s, then Canon\'s — not a copy. Do not exempt this any longer than it takes them to rule.',
  'canon/emergence-over-predictability-canonical-reference.md':
    'No master under canon/canonical/. A per-belief reference that canon does not carry as its own file; the belief itself is canonical in five-core-beliefs-canonical-reference.md, which IS paired above.',
  'canon/vft-lexicon-canon-v0_1.md': 'VCP-own canon (v0.1). No master under canon/canonical/.',
  'canon/vcp-lang-canon-v0_1.md': 'VCP-own canon (v0.1). No master under canon/canonical/.',
  'canon/value-graph-canon-v0_1.md': 'VCP-own canon (v0.1). No master under canon/canonical/.',
  'canon/beyond_leads_manifesto_v2.md': 'Manifesto, authored for this site. No master under canon/canonical/.',
  'canon/value-led-growth-manifesto.md': 'Manifesto, authored for this site. No master under canon/canonical/.',
  'canon/VCP-Newsletter-Part3.md': 'Newsletter issue, authored for this site. No master under canon/canonical/.',
};

/** Every place findCanonRoot looked, for the skip message. */
const tried = [];

/** Find canon/canonical/: $VCP_CANON_ROOT, then walking up from the repo, then $MAINBRAIN_ROOT. */
function findCanonRoot() {
  if (process.env.VCP_CANON_ROOT) {
    const c = process.env.VCP_CANON_ROOT;
    if (existsSync(c)) return c;
    tried.push(`${c} (via $VCP_CANON_ROOT -- does not exist, ignored)`);
  }
  let dir = REPO;
  for (let i = 0; i < 6; i++) {
    const c = join(dir, 'L2-customer-value-model', 'canon', 'canonical');
    if (existsSync(c)) return c;
    tried.push(c);
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  if (process.env.MAINBRAIN_ROOT) {
    const c = join(process.env.MAINBRAIN_ROOT, 'L2-customer-value-model', 'canon', 'canonical');
    if (existsSync(c)) return c;
    tried.push(`${c} (via $MAINBRAIN_ROOT -- not found, ignored)`);
  }
  return null;
}

const norm = (s) => s.replace(/\r\n/g, '\n');
/** Canon, in the line endings the copy already has, so a refresh diffs as the words that moved.
 *  (Until 2026-09-28 --fix always wrote CRLF, over LF copies, and every refresh rewrote the whole file.) */
const withEolOf = (existing, s) => (existing.includes('\r\n') ? norm(s).replace(/\n/g, '\r\n') : norm(s));

function firstDiffLine(a, b) {
  const x = norm(a).split('\n');
  const y = norm(b).split('\n');
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if (x[i] !== y[i]) {
      return { line: i + 1, site: (x[i] ?? '(end of file)').slice(0, 140), canon: (y[i] ?? '(end of file)').slice(0, 140) };
    }
  }
  return null;
}

const canonRoot = findCanonRoot();
if (!canonRoot) {
  console.error(
    `canon-drift-gate: SKIPPED -- canon masters not reachable from this checkout (tried: ${tried.join(', ')}). ` +
    'Set VCP_CANON_ROOT to a canon/canonical folder or MAINBRAIN_ROOT to a real MainBrain checkout, or run inside one. ' +
    'NOTHING WAS CHECKED -- this is not a pass.',
  );
  process.exit(0);
}

console.log(`canon-drift-gate: masters at ${canonRoot}`);

let drift = 0;
let unaudited = 0;
let fixed = 0;
let checked = 0;

for (const rootRel of CONTENT_ROOTS) {
  const root = join(REPO, rootRel);
  if (!existsSync(root)) continue;

  // 1. Every paired file matches its master.
  for (const [rel, master] of Object.entries(PAIRED)) {
    const dest = join(root, rel);
    if (!existsSync(dest)) continue;
    const masterPath = join(canonRoot, master);
    if (!existsSync(masterPath)) {
      console.error(`  MISSING MASTER  ${rootRel}/${rel}  ->  ${master}`);
      drift++;
      continue;
    }
    checked++;
    const site = readFileSync(dest, 'utf8');
    const canon = readFileSync(masterPath, 'utf8');
    if (norm(site) === norm(canon)) continue;
    if (FIX) {
      writeFileSync(dest, withEolOf(site, canon));
      console.log(`  FIXED   ${rootRel}/${rel}`);
      fixed++;
      continue;
    }
    const d = firstDiffLine(site, canon);
    console.error(`  DRIFT   ${rootRel}/${rel}`);
    console.error(`          master: canon/canonical/${master}`);
    if (d) {
      console.error(`          first difference at line ${d.line}`);
      console.error(`            site : ${d.site}`);
      console.error(`            canon: ${d.canon}`);
    }
    drift++;
  }

  // 2. No content file is unaccounted for.
  for (const sub of ['canon', 'wiki-canonical']) {
    const dir = join(root, sub);
    if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.md')) continue;
      const rel = `${sub}/${name}`;
      if (rel in PAIRED || rel in EXEMPT) continue;
      console.error(`  UNAUDITED  ${rootRel}/${rel}`);
      console.error('          Not paired to a canon master and not exempted. Add it to PAIRED');
      console.error('          if canon carries a master, or to EXEMPT with the reason it does not.');
      unaudited++;
    }
  }
}

console.log(`canon-drift-gate: ${checked} paired file(s) compared, ${Object.keys(EXEMPT).length} exempt.`);

if (fixed) {
  console.log(`canon-drift-gate: rewrote ${fixed} file(s) from canon. Review the diff before committing.`);
  process.exit(0);
}
if (drift || unaudited) {
  console.error(`canon-drift-gate: FAIL — ${drift} drifted, ${unaudited} unaudited.`);
  console.error('  Refresh from canon with:  node scripts/canon-drift-gate.mjs --fix');
  console.error('  Canon is the authority. Never edit the copy to match the page.');
  process.exit(1);
}
console.log('canon-drift-gate: PASS — every copied file matches canon.');
