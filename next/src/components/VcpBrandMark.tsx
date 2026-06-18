/**
 * VcpBrandMark — the per-node brand lockup for valuecreationprotocol.com.
 *
 * The shared @vf/site-kit SiteShell renders the official VF Team LogoLockup in
 * the header/footer logo slot UNLESS a per-node `BrandMark` is supplied. VCP is
 * its OWN brand (a peer to modelcontextprotocol.io / humancontextprotocol.com),
 * not a Value-First Team surface — the Astro original rendered the VCP compass
 * mark + "Value Creation Protocol" serif wordmark, with Value-First Team named
 * only as the implementing FIRM in the footer attribution. So the logo slot
 * must carry VCP's own mark, not the firm lockup.
 *
 * Why the `node` escape hatch (not a plain `src` image): VCP's PNG/word marks
 * bake BLACK ink, which dies on the dark theme this re-platform supports (the
 * SiteShell ships a ThemeToggle; render-verify checks both themes). So the
 * wordmark is rendered as live text in VCP's display serif using the
 * theme-aware `--vf-text` token (dark navy in light, light gray in dark), paired
 * with the self-contained faceted-gem SVG (a dark rounded square that reads on
 * BOTH surfaces). This reproduces the Astro lockup faithfully AND stays
 * theme-safe — the one-mark-per-theme problem a flat image cannot solve.
 *
 * Tokens via --vf-* only (theme-aware). The gem asset is /brand/vcp-gem.svg.
 */
import type { BrandMark } from '@vf/site-kit';

/** Header lockup: compact gem + single-line wordmark. */
export const HEADER_BRAND_MARK: BrandMark = {
  alt: 'Value Creation Protocol',
  node: (
    <span className="flex items-center gap-2.5">
      <img
        src="/brand/vcp-gem.svg"
        alt=""
        width={32}
        height={32}
        className="block h-8 w-8 shrink-0"
        loading="eager"
      />
      <span
        className="font-[var(--vcp-font-display)] text-[1.0625rem] font-medium leading-none tracking-[-0.005em] text-[hsl(var(--vf-text))]"
      >
        Value Creation Protocol
      </span>
    </span>
  ),
};

/** Footer lockup: same mark, slightly larger gem to anchor the footer block. */
export const FOOTER_BRAND_MARK: BrandMark = {
  alt: 'Value Creation Protocol',
  node: (
    <span className="flex items-center gap-3">
      <img
        src="/brand/vcp-gem.svg"
        alt=""
        width={40}
        height={40}
        className="block h-10 w-10 shrink-0"
        loading="eager"
      />
      <span
        className="font-[var(--vcp-font-display)] text-xl font-medium leading-none tracking-[-0.005em] text-[hsl(var(--vf-text))]"
      >
        Value Creation Protocol
      </span>
    </span>
  ),
};
