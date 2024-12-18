/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  blocklist: [
    'btn',
    'textarea',
    'input',
    'select',
    'label',
    'checkbox',
    'radio',
    'switch',
    'collapsible',
  ],
  theme: {},
  daisyui: {
    themes: ['light', 'dark'],
  },
  plugins: [typography],
};
