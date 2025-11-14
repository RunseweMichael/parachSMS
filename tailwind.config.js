/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                     // <-- crucial
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',                    // <-- THIS ENABLES dark:
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-animate'),     // <-- animation plugin (Tailwind, not Vite)
  ],
};