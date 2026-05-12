/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // VF palette used as accent only — teal/orange/blue on links and key callouts.
      // Mostly neutral surface. Schema.org-adjacent typography.
      colors: {
        'vcp-teal': '#0D9488',
        'vcp-orange': '#EA580C',
        'vcp-blue': '#2563EB',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          'Consolas',
          '"Courier New"',
          'monospace',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '72ch',
          },
        },
      },
    },
  },
  plugins: [],
};
