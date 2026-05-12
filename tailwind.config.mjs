/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Theme tokens reference the CSS variables declared in src/styles/tokens.css.
      // This preserves Claude Design's canonical token system while keeping
      // Tailwind utilities working end-to-end.
      colors: {
        // Surfaces
        'vcp-paper': 'var(--vcp-paper)',
        'vcp-surface': 'var(--vcp-surface)',
        'vcp-surface-2': 'var(--vcp-surface-2)',
        'vcp-surface-3': 'var(--vcp-surface-3)',

        // Ink ladder
        'vcp-ink': 'var(--vcp-ink)',
        'vcp-ink-2': 'var(--vcp-ink-2)',
        'vcp-ink-3': 'var(--vcp-ink-3)',
        'vcp-ink-4': 'var(--vcp-ink-4)',
        'vcp-ink-5': 'var(--vcp-ink-5)',

        // Borders
        'vcp-border': 'var(--vcp-border)',
        'vcp-border-strong': 'var(--vcp-border-strong)',

        // Protocol identity
        'vcp-teal': 'var(--vcp-teal)',
        'vcp-teal-deep': 'var(--vcp-teal-deep)',
        'vcp-teal-soft': 'var(--vcp-teal-soft)',
        'vcp-teal-ink': 'var(--vcp-teal-ink)',

        'mcp-orange': 'var(--mcp-orange)',
        'mcp-orange-deep': 'var(--mcp-orange-deep)',
        'mcp-orange-soft': 'var(--mcp-orange-soft)',
        'mcp-orange-ink': 'var(--mcp-orange-ink)',

        'hcp-blue': 'var(--hcp-blue)',
        'hcp-blue-deep': 'var(--hcp-blue-deep)',
        'hcp-blue-soft': 'var(--hcp-blue-soft)',
        'hcp-blue-ink': 'var(--hcp-blue-ink)',
      },
      fontFamily: {
        display: ['Newsreader', 'Source Serif 4', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Geist', '"Inter Tight"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
      maxWidth: {
        'vcp-prose': '68ch',
        'vcp-narrow': '56ch',
        'vcp-content': '1120px',
        'vcp-doc': '1280px',
      },
      borderRadius: {
        'vcp-xs': '2px',
        'vcp-sm': '4px',
        'vcp-md': '6px',
        'vcp-lg': '10px',
        'vcp-xl': '16px',
      },
      letterSpacing: {
        'vcp-display': '-0.02em',
        'vcp-h': '-0.012em',
        'vcp-eyebrow': '0.14em',
      },
      lineHeight: {
        'vcp-tight': '1.05',
        'vcp-snug': '1.18',
        'vcp-body': '1.65',
        'vcp-loose': '1.75',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '68ch',
          },
        },
      },
    },
  },
  plugins: [],
};
