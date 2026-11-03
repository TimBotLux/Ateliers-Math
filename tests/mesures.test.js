import { afterEach, describe, expect, it } from 'vitest';
import {
  CLOCK_MINUTES, COINS_BY_TIER, MESURES_ACTIVITIES, clockId, conversions, heure1, longueur1, mesure1, monnaie1, scaledText,
} from '../src/activities/mesures.js';
import { ZONE_IDS } from '../src/data/zones.js';
import { mulberry32 } from '../src/engines/random.js';
import { setLang, t } from '../src/i18n/index.js';

afterEach(() => setLang('fr'));

/** Toutes les sommes réalisables avec ces pièces (en nombre illimité), jusqu'à max centimes. */
function reachable(coins, max) {
  const ok = new Array(max + 1).fill(false);
  ok[0] = true;
  for (let v = 1; v <= max; v++) ok[v] = coins.some((c) => c <= v && ok[v - c]);
  return ok;
}

describe('Grandeurs et mesures : fiches', () => {
  it('respectent le PRD (parcours, ordre, zones existantes) et nourrissent chacune au moins une zone', () => {
    const expected = {
      longueur1: ['4-6', 100, ['logique', 'espace']], mesure1: ['7-9', 70, ['numeration', 'espace']],
      heure1: ['7-9', 80, ['numeration', 'attention']], monnaie1: ['7-9', 90, ['calcul', 'problemes']],
      conversions: ['10-12', 100, ['numeration', 'calcul']],
    };
    expect(MESURES_ACTIVITIES.map((a) => a.key)).toEqual(Object.keys(expected));
    for (const a of MESURES_ACTIVITIES) {
      const [path, order, skills] = expected[a.key];
      expect(a.path).toBe(path);
      expect(a.order).toBe(order);
      expect(a.skills).toEqual(skills);
      expect(a.skills.some((s) => ZONE_IDS.includes(s))).toBe(true);
    }
  });
});

describe('Je range (longueur1)', () => {
  it('donne trois bandes de longueurs différentes, qui tiennent dans le dessin ; alignées seulement au palier 1', () => {
    const rng = mulberry32(3);
    for (let tier = 1; tier <= 3; tier++) {
      for (let i = 0; i < 200; i++) {
        const r = longueur1.create(tier, rng);
        const lens = r.bands.map((b) => b.len);
        expect(new Set(lens).size).toBe(3);
        r.bands.forEach((b) => {
          expect(b.len).toBeGreaterThanOrEqual(2);
          expect(b.offset + b.len).toBeLessThanOrEqual(10);
          if (tier === 1) expect(b.offset).toBe(0);
        });
        const sorted = [...lens].sort((a, b) => a - b);
        expect(sorted[1] - sorted[0]).toBeGreaterThanOrEqual(tier === 1 ? 2 : [3, 2, 1][tier - 1]);
      }
    }
  });
});

describe('Je mesure (mesure1)', () => {
  it('l’objet tient sur la règle de 15 cm, la bonne longueur est proposée ; au palier 3 il ne commence pas à zéro', () => {
    const rng = mulberry32(4);
    for (let tier = 1; tier <= 3; tier++) {
      for (let i = 0; i < 200; i++) {
        const r = mesure1.create(tier, rng);
        expect(r.start + r.length).toBeLessThanOrEqual(15);
        expect(r.choices.map((c) => c.id)).toContain(r.answer);
        expect(new Set(r.choices.map((c) => c.id)).size).toBe(3);
        if (tier === 3) {
          expect(r.start).toBeGreaterThan(0);
          // Le piège classique (lire l'extrémité de l'objet) fait partie des choix.
          expect(r.choices.map((c) => c.id)).toContain(String(r.start + r.length));
        } else expect(r.start).toBe(0);
      }
    }
  });
});

describe('Je lis l’heure (heure1)', () => {
  it('chaque heure générée est lisible au palier visé (pas de « 5 minutes » au palier 1)', () => {
    const rng = mulberry32(6);
    for (let tier = 1; tier <= 3; tier++) {
      for (let i = 0; i < 300; i++) {
        const r = heure1.create(tier, rng);
        const m = tier === 3 ? r.target.m : r.visual.m;
        expect(CLOCK_MINUTES[tier - 1]).toContain(m);
        if (tier === 1) expect([0, 30]).toContain(m);
        if (tier < 3) {
          expect(r.choices).toHaveLength(3);
          expect(new Set(r.choices.map((c) => c.id)).size).toBe(3);
          expect(r.choices.map((c) => c.id)).toContain(r.answer);
          r.choices.forEach((c) => expect(CLOCK_MINUTES[tier - 1]).toContain(Number(c.id.split(':')[1])));
        }
      }
    }
  });

  it('les deux langues donnent la même heure : 24 h en français, formulation britannique en anglais', () => {
    expect(t('measures.clockTime', { h: 14, m: 30 })).toBe('14 h 30');
    expect(t('measures.clockTime', { h: 9, m: 0 })).toBe('9 h');
    expect(t('measures.clockTime', { h: 8, m: 5 })).toBe('8 h 05');
    setLang('en');
    expect(t('measures.clockTime', { h: 14, m: 30 })).toBe('half past two');
    expect(t('measures.clockTime', { h: 9, m: 0 })).toBe('nine o’clock');
    expect(t('measures.clockTime', { h: 18, m: 45 })).toBe('quarter to seven');
    expect(t('measures.clockTime', { h: 11, m: 35 })).toBe('twenty-five to twelve');
    expect(t('measures.clockTime', { h: 12, m: 10 })).toBe('ten past twelve');
    // L'identifiant de la bonne réponse ne dépend pas de la langue.
    setLang('fr');
    const fr = heure1.create(2, mulberry32(1));
    setLang('en');
    const en = heure1.create(2, mulberry32(1));
    expect(en.answer).toBe(fr.answer);
    expect(clockId(14, 30)).toBe(clockId(2, 30));
  });
});

describe('Je paie (monnaie1)', () => {
  it('une somme demandée est toujours réalisable avec les pièces proposées ; la monnaie rendue est toujours positive', () => {
    const rng = mulberry32(8);
    const ok = reachable(COINS_BY_TIER[1], 1000);
    for (let tier = 1; tier <= 3; tier++) {
      for (let i = 0; i < 300; i++) {
        const r = monnaie1.create(tier, rng);
        expect(r.target).toBeGreaterThan(0);
        expect(reachable(r.coins, r.target)[r.target], `${tier} ${r.target}`).toBe(true);
        expect(ok[r.target]).toBe(true);
        if (tier === 3) {
          expect(r.paid).toBeGreaterThan(r.price);
          expect(r.target).toBe(r.paid - r.price);
        }
      }
    }
  });

  it('écrit les montants à la manière de chaque langue, sans virgule flottante', () => {
    expect(t('measures.money', { c: 370 })).toBe('3,70 €');
    expect(t('measures.money', { c: 500 })).toBe('5 €');
    expect(t('measures.money', { c: 5 })).toBe('0,05 €');
    setLang('en');
    expect(t('measures.money', { c: 370 })).toBe('£3.70');
    expect(t('measures.money', { c: 500 })).toBe('£5');
    expect(t('measures.money', { c: 70 })).toBe('70p');
  });
});

describe('Je convertis (conversions)', () => {
  /** Relit l'énoncé et vérifie la conversion en nombres entiers (aucune erreur d'arrondi). */
  const FACTORS = {
    km: 1e6, hm: 1e5, dam: 1e4, m: 1000, dm: 100, cm: 10, mm: 1,
    kg: 1e6, hg: 1e5, dag: 1e4, g: 1000, dg: 100, cg: 10, mg: 1,
    hL: 1e5, daL: 1e4, L: 1000, dL: 100, cL: 10, mL: 1,
  };

  it('les conversions sont exactes, sans erreur d’arrondi en virgule flottante', () => {
    const rng = mulberry32(10);
    let units = 0;
    for (let tier = 1; tier <= 3; tier++) {
      for (let i = 0; i < 400; i++) {
        const r = conversions.create(tier, rng);
        expect(Number.isInteger(r.answer)).toBe(true);
        expect(r.answer).toBeGreaterThan(0);
        const m = r.speak.match(/^(\d+)(?:,(\d+))? (\w+) = combien de (\w+) \?$/);
        if (!m || !(m[3] in FACTORS)) continue; // durées : vérifiées plus bas
        units++;
        const [, int, dec = '', from, to] = m;
        // valeur × 10^décimales, en unités de base entières
        const scaled = BigInt(int + dec) * BigInt(FACTORS[from]);
        expect(scaled).toBe(BigInt(r.answer) * BigInt(FACTORS[to]) * 10n ** BigInt(dec.length));
      }
    }
    expect(units).toBeGreaterThan(500);
  });

  it('écrit les nombres décimaux à partir d’entiers (virgule en français, point en anglais)', () => {
    expect(scaledText(25, 1)).toBe('2,5');
    expect(scaledText(75, 2)).toBe('0,75');
    expect(scaledText(405, 2)).toBe('4,05');
    expect(scaledText(120, 1)).toBe('12');
    setLang('en');
    expect(scaledText(25, 1)).toBe('2.5');
  });

  it('les durées sont justes (1 h = 60 min, 1 min = 60 s)', () => {
    const rng = mulberry32(12);
    for (let i = 0; i < 500; i++) {
      const r = conversions.create(3, rng);
      let m = r.speak.match(/^(\d+) h (\d+) min = combien de minutes/);
      if (m) expect(r.answer).toBe(60 * m[1] + Number(m[2]));
      m = r.speak.match(/^(\d+) min (\d+) s = combien de secondes/);
      if (m) expect(r.answer).toBe(60 * m[1] + Number(m[2]));
      m = r.speak.match(/^(\d+) h et demie/);
      if (m) expect(r.answer).toBe(60 * m[1] + 30);
    }
  });
});
