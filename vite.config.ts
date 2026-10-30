import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // fonctionne quel que soit le nom du repo GitHub Pages
});
