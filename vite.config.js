import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tailwindAnimate from 'tailwindcss-animate';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    base: process.env.VITE_BASE_PATH || '/parachSMS',
    // tailwind-animate is a Tailwind plugin → put it in tailwind.config.js
  ],

  
});