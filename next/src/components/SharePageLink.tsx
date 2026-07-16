'use client';

/**
 * SharePageLink — a visible copy-link / native-share affordance.
 *
 * These pages are made to be shared by pasting the link into a DM / LinkedIn /
 * Slack / a talk. This gives a one-tap way to grab the canonical link (and the
 * native share sheet on mobile). Styling reuses the page's own lov-* button
 * classes (token-based, so it flips in both themes); the URL resolves at runtime
 * from window.location so it is always the address actually being served.
 */
import { useCallback, useEffect, useState } from 'react';

export function SharePageLink({ label = 'Share this page' }: { label?: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setUrl(window.location.href.split('#')[0]);
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function');
  }, []);

  const copyLink = useCallback(async () => {
    const target = url || window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(target);
      } else {
        const ta = document.createElement('textarea');
        ta.value = target;
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
  }, [url]);

  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({ title: document.title, url: url || window.location.href });
    } catch {
      /* dismissed or unsupported — no-op */
    }
  }, [url]);

  return (
    <div className="lov-share">
      <span className="lov-share-label">{label}</span>
      <span className="lov-share-url" aria-hidden="true">
        {url.replace(/^https?:\/\//, '')}
      </span>
      <div className="lov-share-actions">
        <button type="button" className="lov-btn lov-btn-primary" onClick={copyLink} aria-live="polite">
          {copied ? 'Link copied' : 'Copy link'}
        </button>
        {canNativeShare && (
          <button type="button" className="lov-btn lov-btn-ghost" onClick={nativeShare}>
            Share…
          </button>
        )}
      </div>
    </div>
  );
}
