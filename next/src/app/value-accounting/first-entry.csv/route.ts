/**
 * /value-accounting/first-entry.csv — the blank first-entry view as a file a reader copies into their own sheet:
 * one header row of the handbook's four columns, no rows, no stage, money or total column. The text is exactly
 * what @vf/brand's `frameworkSheetCsv("value-accounting")` returns (0.220.0), built at build time from the same
 * page record the framework page reads; this file adds nothing to it. The "Blank view" door on /value-accounting
 * links here. A record with no sheet stops the build rather than serving an empty file.
 */
import { frameworkSheetCsv } from '@vf/brand';

export const dynamic = 'force-static';

export function GET() {
  const csv = frameworkSheetCsv('value-accounting');
  if (!csv) throw new Error('@vf/brand carries no first-entry sheet for value-accounting; nothing to serve.');
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="first-entry.csv"',
    },
  });
}
