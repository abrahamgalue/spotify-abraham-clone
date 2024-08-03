/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        'secondary-bg': 'var(--color-bg-secondary)',
        'slider-bg': 'var(--color-bg-slider)',
        'green-primary': 'var(--color-green-primary)',
        'green-secondary': 'var(--color-green-secondary)',
        'green-slider': 'var(--color-green-slider)',
        'table-text': 'var(--color-table-text)',
        'card-primary': 'var(--color-card-primary)',
        'card-secondary': 'var(--color-card-secondary)',
        'card-tertiary': 'var(--color-card-tertiary)',
        'gradient-playlist': 'var(--gradient-playlist)'
      }
    },
  },
  plugins: [],
}
