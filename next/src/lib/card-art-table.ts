/**
 * THE CARD-ART TABLE THIS BUILD RESOLVED. Server only (build time).
 *
 * valuecreationprotocol.com is a declared build consumer in @vf/brand,
 * `consumer:valuecreationprotocol/framework-cards` (VCP step 0, Chris's ruling,
 * L4-orchestration/output/2026-11-11-vcp-teach-elevated/vcp-elevation-plan.md). Before every build
 * and every dev server, `npm run card-art` runs `vf-card-art-build`: it resolves each use the
 * consumer declares through the Card Engine, fetches each resolved address as a browser would and
 * hashes it, writes the table read here, and writes this build's receipts to
 * public/card-asset-receipts.jsonl, which the static export serves at /card-asset-receipts.jsonl.
 * Both files are gitignored: they are this build's answers, never a stored copy.
 *
 * The table is handed to the cards whole, through @vf/recipes' CardArtTableProvider
 * (FrameworkRoute). Not one row, version or address is copied into this site's code: which
 * pictures, which versions and which addresses all come from the table, and the table comes
 * from the registry in the pinned @vf/brand.
 *
 * Read with fs at render, not imported, so a type check on a clean clone needs no generated file.
 *
 * LOUD ON PURPOSE. A missing or malformed table fails the build, naming the step that writes it,
 * and never falls back: a card drawn without the table would draw a picture no receipt records.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { isCardArtTable, type CardArtTable } from '@vf/brand/card-art-table';

/** Where `npm run card-art` writes the table, relative to this project's root (next/). */
const TABLE_FILE = path.join('src', 'data', 'card-art-table.json');

let cached: CardArtTable | undefined;

export function cardArtTable(): CardArtTable {
  if (cached) return cached;
  const file = path.join(process.cwd(), TABLE_FILE);
  let raw: string;
  try {
    raw = readFileSync(file, 'utf8');
  } catch {
    throw new Error(
      `card-art-table: no table at ${TABLE_FILE}. Run \`npm run card-art\` (the prebuild and predev step), which resolves this site's declared card art through @vf/brand's vf-card-art-build.`,
    );
  }
  const parsed: unknown = JSON.parse(raw);
  if (!isCardArtTable(parsed)) {
    throw new Error(`card-art-table: ${TABLE_FILE} is not a card-art table. Re-run \`npm run card-art\`.`);
  }
  cached = parsed;
  return parsed;
}
