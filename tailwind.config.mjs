/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Color tokens map to CSS variables declared in src/styles/tokens.css.
      // Use these utilities (e.g. bg-vcp-paper, text-vcp-ink) NOT arbitrary
      // values. Tailwind JIT generates these classes reliably.
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
        // Body / display / mono — matches tokens.css declarations.
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
        'vcp-sm': '4px',
        'vcp-md': '6px',
        'vcp-lg': '10px',
      },
    },
  },
  plugins: [],
};
