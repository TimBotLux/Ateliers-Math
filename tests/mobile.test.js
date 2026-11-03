import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Compatibilité smartphone : la feuille de style prévoit les écrans peu hauts (ex. 360 × 640)
// sans jamais réduire une cible tactile sous 44 px.
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

// Contenu de chaque bloc @media (max-height: …).
const shortBlocks = [...css.matchAll(/@media \(max-height: (\d+)px\) \{([\s\S]*?)\n\}/g)];

describe('Smartphone', () => {
  it('déclare une fenêtre adaptée au téléphone', () => {
    expect(html).toMatch(/<meta name="viewport" content="[^"]*width=device-width/);
  });

  it('compacte les ateliers sur les écrans peu hauts', () => {
    expect(shortBlocks.map((m) => Number(m[1]))).toEqual(expect.arrayContaining([760, 620]));
  });

  it('garde des touches et boutons d’au moins 44 px sur petit écran', () => {
    const touch = /\.(keypad__key|confidence__btn|choice|tangram__piece|coins__pick)\b[^{]*\{([^}]*)\}/g;
    for (const [, body] of shortBlocks) {
      for (const [, , rule] of body.matchAll(touch)) {
        for (const [, px] of rule.matchAll(/(?:^|[;\s])(?:min-)?(?:height|width):\s*(\d+)px/g)) {
          expect(Number(px)).toBeGreaterThanOrEqual(44);
        }
      }
    }
  });

  it('laisse les dessins et pièces à manipuler réagir au doigt sans faire défiler la page', () => {
    for (const cls of ['numberline', 'tangram__board', 'clock']) {
      expect(css).toMatch(new RegExp(`\\.${cls} \\{[^}]*touch-action: none`));
    }
  });
});
