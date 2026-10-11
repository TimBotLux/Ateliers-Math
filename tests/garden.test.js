import { describe, expect, it } from 'vitest';
import { ZONE_IDS } from '../src/data/zones.js';
import {
  GARDEN_KEY, LEGACY_KEY, RARE_VARIANTS, RARE_VARIANT_FROM, STAGE_THRESHOLDS,
  createGardenEngine, stageFor,
} from '../src/engines/gardenEngine.js';
import { createMemoryStore } from '../src/engines/storage.js';

describe('Garden Engine 2.0', () => {
  it('applique les seuils des 6 paliers', () => {
    expect(STAGE_THRESHOLDS).toEqual([0, 5, 20, 50, 120, 250]);
    expect([0, 4, 5, 19, 20, 49, 50, 119, 120, 249, 250].map(stageFor)).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5]);
  });

  it('ne crée jamais de 7e palier', () => {
    for (const p of [251, 500, 1000, 1e6]) expect(stageFor(p)).toBe(5);
  });

  it('ne fait grandir que les zones, en ignorant les tags techniques', () => {
    const g = createGardenEngine(createMemoryStore());
    expect(g.grow('a', ['logique', 'vitesse', 'motricite', 'logique'])).toEqual(['logique']);
    const child = g.ensureChild('a');
    expect(child.practice.logique).toBe(1);
    expect(Object.values(child.practice).reduce((s, v) => s + v, 0)).toBe(1);
  });

  it('persiste et relit l’état', () => {
    const store = createMemoryStore();
    const g1 = createGardenEngine(store);
    for (let i = 0; i < 5; i++) g1.grow('a', ['calcul']);
    const g2 = createGardenEngine(store);
    expect(g2.stages('a').calcul).toBe(1);
    expect(g2.order('a')).toEqual(g1.order('a'));
  });

  it('migre l’ancien compteur sans le répartir entre les zones', () => {
    const store = createMemoryStore({ [LEGACY_KEY]: '137' });
    const g = createGardenEngine(store);
    const stages = g.stages('premier');
    expect(Object.values(stages).every((s) => s === 0)).toBe(true);
    expect(g.hasLegacy('premier')).toBe(true);
    expect(g.hasLegacy('second')).toBe(false);
    expect(store.readRaw(LEGACY_KEY)).toBe('137'); // conservé tel quel
  });

  it('ne re-migre pas', () => {
    const store = createMemoryStore({ [LEGACY_KEY]: '40' });
    createGardenEngine(store).ensureChild('premier');
    const saved = store.readJSON(GARDEN_KEY);
    store.writeRaw(LEGACY_KEY, '9999');
    const g2 = createGardenEngine(store);
    g2.ensureChild('autre');
    expect(store.readJSON(GARDEN_KEY).legacy).toEqual(saved.legacy);
    expect(g2.hasLegacy('premier')).toBe(true);
  });

  it('sans ancien compteur, pas de jardin d’avant', () => {
    const g = createGardenEngine(createMemoryStore());
    expect(g.hasLegacy('a')).toBe(false);
  });

  it('garde un ordre de paysage stable, qui contient les 8 zones', () => {
    const g = createGardenEngine(createMemoryStore());
    const order = g.order('a');
    expect([...order].sort()).toEqual([...ZONE_IDS].sort());
    expect(g.order('a')).toEqual(order);
  });

  it('produit des variantes rares déterministes, seulement à partir de 500', () => {
    const store = createMemoryStore();
    const g = createGardenEngine(store);
    for (let i = 0; i < RARE_VARIANT_FROM - 1; i++) g.grow('a', ['memoire']);
    expect(g.variant('a', 'memoire')).toBeNull();
    g.grow('a', ['memoire']);
    const v = g.variant('a', 'memoire');
    expect(RARE_VARIANTS).toContain(v);
    expect(createGardenEngine(store).variant('a', 'memoire')).toBe(v);
  });

  it('n’expose aucun chiffre de progression dans stages()', () => {
    const g = createGardenEngine(createMemoryStore());
    for (let i = 0; i < 300; i++) g.grow('a', ['numeration']);
    const s = g.stages('a');
    expect(Math.max(...Object.values(s))).toBeLessThanOrEqual(5);
  });
});
