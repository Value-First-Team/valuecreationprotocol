'use client';
/**
 * PrintOnPaper — what a printable route needs so its one sheet comes out of the tray as a sheet (2026-11-20).
 *
 * Two things, the same two @vf/site-kit's ToolFrame does for an instrument (`TOOL_PRINT_CSS` and its print swap):
 *   1. ONLY THE SHEET PRINTS. Everything on the page is hidden on paper except this wrapper's subtree, which is
 *      lifted to the top-left so the hidden chrome above it leaves no blank first page.
 *   2. IT PRINTS ON THE LIGHT POLE. Browsers drop background colours on paper, so a dark-theme page would print
 *      its near-white ink onto white paper: a blank sheet. While the print dialog is open the document is put on
 *      the light theme through the kit's own theme API (`applyThemeClass`), and put back after. No colour is named
 *      here. If the page never hydrated (no script), nothing swaps, and the sheet asks for its own ground instead,
 *      so it prints dark and legible, never blank.
 *
 * hand-roll-exempt: a print rule and a wrapper for this property's printable routes; the sheet itself is
 * @vf/brand's FrameworkSheet, the theme swap is @vf/site-kit's applyThemeClass/readThemeClass, and nothing here
 * is a control.
 */
import { useEffect, type ReactNode } from 'react';
import { applyThemeClass, readThemeClass, type ThemeName } from '@vf/site-kit';

// The page around the sheet is taken out of the layout, not only hidden: a hidden page still has its height, and
// on paper that height is a blank second sheet (found by printing it). `:has()` keeps the sheet's ancestors; a
// browser without it falls back to the visibility rule and may print a trailing blank page, never a wrong one.
const PRINT_CSS = `@media print {
  @page { margin: 12mm; }
  body * { visibility: hidden !important; }
  body *:not(:has([data-vf-print-sheet])):not([data-vf-print-sheet]):not([data-vf-print-sheet] *) { display: none !important; }
  [data-vf-print-sheet], [data-vf-print-sheet] * { visibility: visible !important; }
  [data-vf-print-sheet] { position: absolute !important; left: 0 !important; top: 0 !important; width: 100% !important; margin: 0 !important; padding: 0 !important; }
  html:not(.light) [data-vf-print-sheet] { background: hsl(var(--vf-bg)) !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}`;

export function PrintOnPaper({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    let was: ThemeName | null = null;
    const before = () => {
      was = readThemeClass(root);
      applyThemeClass(root, 'light');
    };
    const after = () => {
      if (was) applyThemeClass(root, was);
      was = null;
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
      after();
    };
  }, []);
  return (
    <div data-vf-print-sheet="">
      <style dangerouslySetInnerHTML={{ __html: PRINT_CSS }} />
      {children}
    </div>
  );
}
