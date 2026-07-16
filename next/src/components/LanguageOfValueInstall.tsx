'use client';

/**
 * LanguageOfValueInstall — the "installable pack" affordance.
 *
 * Renders the full paste-in artifact in a scrollable panel with a one-click
 * Copy button and a Download link. The artifact text is passed in from the
 * server component, which reads it from public/language-of-value.md at build
 * time — so the visible block, the copied text, and the downloaded file are all
 * one byte-identical source and can never drift.
 *
 * Styling: the .lov-install-* classes in vcp-archetypes.css, all token-based so
 * both themes flip with the shell.
 */
import { useCallback, useState } from 'react';

interface Props {
  /** The full paste-in markdown artifact (single source: public/language-of-value.md). */
  pasteText: string;
  /** Public href of the downloadable file. */
  downloadHref: string;
}

export function LanguageOfValueInstall({ pasteText, downloadHref }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(pasteText);
      } else {
        // Fallback for browsers without the async clipboard API.
        const ta = document.createElement('textarea');
        ta.value = pasteText;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, [pasteText]);

  return (
    <div className="lov-install">
      <div className="lov-install-head">
        <div className="lov-install-heading">
          <p className="lov-install-eyebrow">Install the pack</p>
          <p className="lov-install-lede">
            Paste this into your agent&apos;s system prompt, <code>CLAUDE.md</code>, or custom
            instructions. It installs the reflex — not just the words.
          </p>
        </div>
        <div className="lov-install-actions">
          <button type="button" className="lov-btn lov-btn-primary" onClick={onCopy} aria-live="polite">
            {copied ? 'Copied to clipboard' : 'Copy the pack'}
          </button>
          <a className="lov-btn lov-btn-ghost" href={downloadHref} download>
            Download .md
          </a>
        </div>
      </div>
      <pre className="lov-paste" aria-label="The Language of Value paste-in artifact" tabIndex={0}>
        {pasteText}
      </pre>
    </div>
  );
}
