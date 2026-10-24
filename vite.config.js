import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/**
 * En-têtes de sécurité pour l'hébergement (fichier dist/_headers, lu par Netlify).
 * Le script de l'application est intégré à la page : la politique de contenu (CSP) n'autorise
 * que lui, par son empreinte, et n'autorise aucune connexion sortante (connect-src absent).
 */
export function securityHeaders(html) {
  const match = html.match(/<script type="module"[^>]*>([\s\S]*?)<\/script>/);
  if (!match) throw new Error('Script principal introuvable dans index.html');
  const hash = createHash('sha256').update(match[1]).digest('base64');
  const csp = [
    "default-src 'none'",
    `script-src 'sha256-${hash}'`,
    "style-src 'unsafe-inline'",
    'img-src data: blob:',
    'font-src data:',
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'none'",
  ].join('; ');
  return [
    '/*',
    `  Content-Security-Policy: ${csp}`,
    '  X-Content-Type-Options: nosniff',
    '  X-Frame-Options: DENY',
    '  Referrer-Policy: no-referrer',
    '  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    '  Cross-Origin-Opener-Policy: same-origin',
    '  Strict-Transport-Security: max-age=31536000',
    '',
  ].join('\n');
}

const headersFile = () => ({
  name: 'ateliers-maths:headers',
  apply: 'build',
  enforce: 'post',
  closeBundle() {
    const dist = resolve(import.meta.dirname, 'dist');
    writeFileSync(resolve(dist, '_headers'), securityHeaders(readFileSync(resolve(dist, 'index.html'), 'utf8')));
  },
});

// Livraison : un seul fichier index.html autonome (PRD, exigences non fonctionnelles).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile(), headersFile()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js'],
  },
});
