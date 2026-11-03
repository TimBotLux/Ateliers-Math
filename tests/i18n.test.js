import { afterEach, describe, expect, it } from 'vitest';
import { activityRegistry } from '../src/activities/index.js';
import { ZONE_IDS } from '../src/data/zones.js';
import { allThemes, choiceLabel, copyFor, zoneTexts } from '../src/garden-themes/index.js';
import { _dicts, activityLabel, fmtDecimal, fmtNumber, setLang, t } from '../src/i18n/index.js';
import { mulberry32 } from '../src/engines/random.js';

// Liste des chemins de clés d'un dictionnaire (les tableaux comptent comme une valeur).
const paths = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? paths(v, `${prefix}${k}.`) : [`${prefix}${k}`]);

afterEach(() => setLang('fr'));

describe('Traduction français / anglais', () => {
  it('a exactement les mêmes clés dans les deux langues', () => {
    expect(paths(_dicts.en).sort()).toEqual(paths(_dicts.fr).sort());
  });

  it('a des listes de même longueur (encouragements, objets, situations…)', () => {
    for (const p of paths(_dicts.fr)) {
      const fr = p.split('.').reduce((o, k) => o[k], _dicts.fr);
      const en = p.split('.').reduce((o, k) => o[k], _dicts.en);
      if (Array.isArray(fr)) expect(en.length, p).toBe(fr.length);
      expect(typeof en, p).toBe(typeof fr);
    }
  });

  it('nomme toutes les activités dans les deux langues', () => {
    for (const lang of ['fr', 'en']) {
      setLang(lang);
      for (const a of activityRegistry.all()) {
        const label = activityLabel(a);
        expect(label, `${lang} ${a.key}`).not.toMatch(/^activities\./);
        expect(label.length).toBeGreaterThan(1);
      }
    }
  });

  it('génère toutes les manches en anglais, sans clé manquante ni reste de français', () => {
    setLang('en');
    const rng = mulberry32(11);
    const french = /\b(Combien|Quelle|Trouve|Mets|Place ce|Calcule|Lis|Laquelle|Arrondis|Que vaut|cahiers|personnes)\b/;
    for (const a of activityRegistry.all()) {
      for (let tier = 1; tier <= a.tiers; tier++) {
        for (let i = 0; i < 40; i++) {
          const r = a.create(tier, rng);
          const text = [r.instruction, r.speak, r.hint, r.visual?.text].filter(Boolean).join(' ');
          expect(text, a.key).not.toMatch(/\b[a-z]+\.[a-z]+\.[a-z]/i); // clé de dictionnaire brute
          expect(text, `${a.key}: ${text}`).not.toMatch(french);
        }
      }
    }
  });

  it('écrit les nombres à la manière de chaque langue', () => {
    setLang('fr');
    expect(fmtDecimal(1.5, 1)).toBe('1,5');
    expect(fmtNumber(9082268)).toBe('9 082 268');
    setLang('en');
    expect(fmtDecimal(1.5, 1)).toBe('1.5');
    expect(fmtNumber(9082268)).toBe('9,082,268');
    expect(t('common.fraction', { n: 3, d: 4 })).toBe('three quarters');
    expect(t('common.money', { v: 12 })).toBe('£12');
  });

  it('traduit tout le jardin : titres et descriptions des 6 stades', () => {
    setLang('en');
    for (const theme of allThemes()) {
      for (const z of ZONE_IDS) {
        const texts = zoneTexts(theme, z);
        expect(texts.stages, `${theme.id}${theme.age} ${z}`).toHaveLength(6);
        expect(texts.sub).not.toBe(theme.zones[z].sub);
      }
    }
    expect(copyFor('gare').grew).toBe('Your station has grown!');
    expect(choiceLabel('fees', '10-12')).toBe('The floating islands');
  });
});

describe('Accord au singulier dans les énoncés', () => {
  it('écrit « 1 cahier coûte » et non « 1 cahiers coûtent », dans les deux langues', () => {
    for (const lang of ['fr', 'en']) {
      setLang(lang);
      for (const sit of t('proportion.situations')) {
        const one = sit.text({ x: 1, y: 4, z: 1 });
        expect(one).not.toMatch(/\b1 (cahiers|personnes|heures|pots|exercise books|people|hours|tins)\b/);
        expect(one).not.toMatch(/\bcoûtent 4\b|\bcost £4\b/);
        expect(sit.text({ x: 2, y: 4, z: 3 })).toContain(`2 ${sit.a}`);
      }
    }
    setLang('fr');
    expect(t('proportion.situations')[1].text({ x: 1, y: 4, z: 3 })).toBe('1 cahier coûte 4 €. Combien coûtent 3 cahiers ?');
  });
});
