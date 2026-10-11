import { describe, expect, it } from 'vitest';
import { POIDS1 } from '../src/activities/balanceLevels.js';
import {
  SWING_DURATION_MS, beamAngleAt, createBalanceRound, swingDurationMs, tiltFor,
} from '../src/engines/balanceEngine.js';
import { mulberry32 } from '../src/engines/random.js';

const rounds = (n, tier = 1, seed = 42) => {
  const rng = mulberry32(seed);
  return Array.from({ length: n }, () => createBalanceRound(POIDS1, tier, rng));
};

describe('Balance Engine — niveau 1', () => {
  it('fait apparaître les cinq paires', () => {
    const seen = new Set(rounds(300).map((r) => r.pairId).filter(Boolean));
    expect(seen.size).toBe(5);
  });

  it('donne toujours la plus grande valeur à l’objet le plus lourd (300 manches)', () => {
    for (const tier of [1, 2, 3]) {
      for (const r of rounds(300, tier, tier * 7)) {
        if (r.answer === 'equal') continue;
        const pair = POIDS1.dressingPool.find((p) => p.id === r.pairId);
        const heavy = r.answer === 'left' ? r.left : r.right;
        const light = r.answer === 'left' ? r.right : r.left;
        expect(heavy.emoji).toBe(pair.heavy.emoji);
        expect(heavy.count || 1).toBe(pair.heavy.count || 1);
        expect(light.emoji).toBe(pair.light.emoji);
        expect(heavy.value).toBeGreaterThan(light.value);
      }
    }
  });

  it('équilibre les positions gauche/droite', () => {
    const rs = rounds(600).filter((r) => r.answer !== 'equal');
    const left = rs.filter((r) => r.answer === 'left').length / rs.length;
    expect(left).toBeGreaterThan(0.4);
    expect(left).toBeLessThan(0.6);
  });

  it('montre deux objets identiques en cas d’égalité', () => {
    const equal = rounds(500).filter((r) => r.answer === 'equal');
    expect(equal.length).toBeGreaterThan(50); // ≈ 1 fois sur 5 au palier 1-5
    for (const r of equal) {
      expect(r.left.emoji).toBe(r.right.emoji);
      expect(r.left.value).toBe(r.right.value);
      expect(r.left.scale).toBe(r.right.scale);
    }
  });

  it('respecte les plages de valeurs cachées de chaque palier', () => {
    [[1, 5], [1, 10], [1, 20]].forEach(([min, max], i) => {
      for (const r of rounds(200, i + 1)) {
        for (const side of [r.left, r.right]) {
          expect(side.value).toBeGreaterThanOrEqual(min);
          expect(side.value).toBeLessThanOrEqual(max);
        }
      }
    });
  });

  it('dessine l’objet lourd plus grand au premier palier seulement', () => {
    const t1 = rounds(50, 1).find((r) => r.answer !== 'equal');
    const t2 = rounds(50, 2).find((r) => r.answer !== 'equal');
    const heavy = (r) => (r.answer === 'left' ? r.left : r.right);
    expect(heavy(t1).scale).toBeGreaterThan(1);
    expect(heavy(t2).scale).toBe(1);
  });
});

describe('Balance — mouvement du fléau (E1)', () => {
  it('reste à plat avant la prédiction (t = 0)', () => {
    expect(beamAngleAt(9, 0)).toBeCloseTo(0);
    expect(beamAngleAt(-9, 0)).toBeCloseTo(0);
  });

  it('ne passe jamais de l’autre côté pendant l’oscillation', () => {
    for (let t = 0.001; t < 1.5; t += 0.005) {
      expect(beamAngleAt(9, t)).toBeGreaterThan(0);
      expect(beamAngleAt(-9, t)).toBeLessThan(0);
    }
  });

  it('voit son amplitude diminuer jusqu’à l’arrêt', () => {
    const peaks = [];
    let prev = 0;
    let rising = true;
    for (let t = 0; t < 1.4; t += 0.002) {
      const v = beamAngleAt(9, t);
      if (rising && v < prev) peaks.push(Math.abs(prev - 9));
      rising = v >= prev;
      prev = v;
    }
    expect(peaks.length).toBeGreaterThan(0);
    for (let i = 1; i < peaks.length; i++) expect(peaks[i]).toBeLessThan(peaks[i - 1]);
  });

  it('dure au plus 1,5 s et finit sur l’inclinaison réelle', () => {
    expect(SWING_DURATION_MS).toBeLessThanOrEqual(1500);
    expect(Math.abs(beamAngleAt(9, SWING_DURATION_MS / 1000 - 0.001) - 9)).toBeLessThan(0.2);
    expect(beamAngleAt(9, 2)).toBe(9);
  });

  it('respecte « réduire les animations » : transition douce sans dépassement', () => {
    for (let t = 0; t < 0.6; t += 0.01) {
      const v = beamAngleAt(9, t, true);
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(9);
    }
    expect(swingDurationMs(9, true)).toBeLessThan(swingDurationMs(9, false));
  });

  it('incline le côté le plus lourd vers le bas', () => {
    expect(tiltFor('left')).toBeLessThan(0);
    expect(tiltFor('right')).toBeGreaterThan(0);
    expect(tiltFor('equal')).toBe(0);
  });
});
