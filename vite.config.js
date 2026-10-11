import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Livraison : un seul fichier index.html autonome (PRD, exigences non fonctionnelles).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});
