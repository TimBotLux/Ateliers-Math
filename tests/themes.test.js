import { describe, expect, it } from 'vitest';
import { ZONE_IDS } from '../src/data/zones.js';
import { DEFAULT_THEME, THEME_IDS, allThemes, choiceLabel, copyFor, themeFor, zoneMarkup } from '../src/garden-themes/index.js';

describe('Thèmes du jardin', () => {
  it('propose 2 univers × 3 âges', () => {
    expect(THEME_IDS).toEqual(['fees', 'gare']);
    expect(allThemes()).toHaveLength(6);
    for (const id of THEME_IDS) {
      for (const age of ['4-6', '7-9', '10-12']) expect(themeFor(id, age).age).toBe(age);
    }
  });

  it('nomme l’univers selon l’âge', () => {
    expect(choiceLabel('fees', '4-6')).toBe('Le jardin des fées');
    expect(choiceLabel('fees', '10-12')).toBe('Les îles suspendues');
    expect(choiceLabel('gare', '7-9')).toBe('Le réseau ferré');
    expect(choiceLabel('inconnu', 'xx')).toBe('Le jardin des fées');
  });

  it('se replie sur un thème valide si le choix est inconnu', () => {
    expect(themeFor(undefined, '4-6').id).toBe(DEFAULT_THEME);
    expect(themeFor('inconnu', 'xx').id).toBe(DEFAULT_THEME);
    expect(copyFor('inconnu').own).toBe('Mon jardin');
  });

  for (const theme of allThemes()) {
    describe(`${theme.label} (${theme.age} ans)`, () => {
      it('dessine les 8 zones avec 6 stades', () => {
        for (const z of ZONE_IDS) {
          const zone = theme.zones[z];
          expect(zone, z).toBeTruthy();
          expect(zone.stages, z).toHaveLength(6);
          zone.stages.forEach((s) => expect(typeof s).toBe('string'));
        }
      });

      it('ajoute au moins un autocollant à chaque stade', () => {
        for (const z of ZONE_IDS) {
          for (let s = 0; s < 6; s++) {
            expect(theme.zones[z].stickers.some((k) => k.from === s), `${z} stade ${s}`).toBe(true);
          }
        }
      });

      it('produit un SVG propre, sans texte ni valeur manquante', () => {
        for (const z of ZONE_IDS) {
          for (let s = 0; s < 6; s++) {
            const m = zoneMarkup(theme, z, s, { animateNew: true });
            expect(m, `${z} ${s}`).not.toMatch(/undefined|NaN|\[object/);
            expect(m, `${z} ${s}`).not.toMatch(/<text/);
            const open = (m.match(/<g[\s>]/g) || []).length;
            const close = (m.match(/<\/g>/g) || []).length;
            expect(open, `${z} ${s} balises <g>`).toBe(close);
          }
        }
      });
    });
  }
});
