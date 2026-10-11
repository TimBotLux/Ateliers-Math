import { describe, expect, it } from 'vitest';
import { activityRegistry, buildRegistry } from '../src/activities/index.js';
import { ZONE_IDS } from '../src/data/zones.js';
import { createAdaptiveEngine } from '../src/engines/adaptiveEngine.js';
import { mulberry32 } from '../src/engines/random.js';
import { buildSession } from '../src/engines/sessionEngine.js';
import { createMemoryStore } from '../src/engines/storage.js';

const EXPECTED = [
  ['subitizing', '4-6', 10], ['compte', '4-6', 20], ['compare', '4-6', 30], ['formes', '4-6', 40],
  ['calculsimple', '4-6', 50], ['panier', '4-6', 60], ['suite', '4-6', 70], ['poids1', '4-6', 80],
  ['addition', '7-9', 10], ['soustraction', '7-9', 20], ['multiplication', '7-9', 30],
  ['problemes', '7-9', 40], ['calculmental', '7-9', 50],
  ['droite', '10-12', 10], ['fractions', '10-12', 20], ['proportion', '10-12', 30], ['calculmalin', '10-12', 40],
  ['aires', '10-12', 50], ['angles', '10-12', 60], ['etapes', '10-12', 70], ['grandsnombres', '10-12', 80],
];
const PATHS = ['4-6', '7-9', '10-12'];

describe('activityRegistry', () => {
  it('enregistre les 21 activités, avec leur parcours et leur ordre', () => {
    expect(activityRegistry.all()).toHaveLength(21);
    for (const [key, path, order] of EXPECTED) {
      const a = activityRegistry.get(key);
      expect(a, key).toBeTruthy();
      expect(a.path).toBe(path);
      expect(a.order).toBe(order);
    }
    expect(activityRegistry.byPath('4-6')).toHaveLength(8);
    expect(activityRegistry.byPath('7-9')).toHaveLength(5);
    expect(activityRegistry.byPath('10-12')).toHaveLength(8);
  });

  it('refuse une clé en double', () => {
    const r = buildRegistry();
    expect(() => r.register({ ...r.get('compte') })).toThrow();
  });

  it('poids1 nourrit la logique, en 3 paliers, mode prédiction', () => {
    const a = activityRegistry.get('poids1');
    expect(a.skills).toEqual(['logique']);
    expect(a.tiers).toBe(3);
    expect(a.interaction).toBe('prediction');
    expect(a.duration).toBe(2);
  });

  it('couvre les 8 zones dans chaque parcours (matrice activités × compétences)', () => {
    for (const path of PATHS) {
      const acts = activityRegistry.byPath(path);
      for (const zone of ZONE_IDS) {
        expect(acts.some((a) => a.skills.includes(zone)), `${path} / ${zone}`).toBe(true);
      }
    }
  });

  it('produit des manches valides à chaque palier (bonne réponse toujours proposée)', () => {
    const rng = mulberry32(7);
    for (const a of activityRegistry.all()) {
      for (let tier = 1; tier <= a.tiers; tier++) {
        for (let i = 0; i < 150; i++) {
          const r = a.create(tier, rng);
          expect(r.instruction, a.key).toBeTruthy();
          if (r.kind === 'choix') {
            const ids = r.choices.map((c) => c.id);
            expect(ids, a.key).toContain(r.answer);
            expect(new Set(ids).size, a.key).toBe(ids.length);
            expect(ids.length).toBe(3);
          } else if (r.kind === 'clavier') {
            expect(Number.isInteger(r.answer), a.key).toBe(true);
            expect(r.answer, a.key).toBeGreaterThan(0);
            expect(r.answer, a.key).toBeLessThan(a.path === '10-12' ? 1_000_000 : 1000);
          } else if (r.kind === 'droite') {
            expect(r.value, a.key).toBeGreaterThan(r.min);
            expect(r.value, a.key).toBeLessThan(r.max);
            expect(r.tolerance, a.key).toBeLessThan((r.max - r.min) / 4);
          } else if (r.kind === 'comparaison') {
            expect(r.groups[0].count).not.toBe(r.groups[1].count);
          } else if (r.kind === 'panier') {
            expect(r.target).toBeGreaterThanOrEqual(1);
          } else {
            expect(r.kind).toBe('balance');
          }
        }
      }
    }
  });
});

describe('adaptiveEngine', () => {
  it('monte après 3 réussites, descend après 2 erreurs, reste entre 1 et 3', () => {
    const ad = createAdaptiveEngine(createMemoryStore());
    expect(ad.tier('a', 'compte')).toBe(1);
    ad.record('a', 'compte', false);
    ad.record('a', 'compte', false);
    expect(ad.tier('a', 'compte')).toBe(1);
    for (let i = 0; i < 3; i++) ad.record('a', 'compte', true);
    expect(ad.tier('a', 'compte')).toBe(2);
    for (let i = 0; i < 12; i++) ad.record('a', 'compte', true);
    expect(ad.tier('a', 'compte')).toBe(3);
    ad.record('a', 'compte', false);
    ad.record('a', 'compte', false);
    expect(ad.tier('a', 'compte')).toBe(2);
  });
});

describe('sessionEngine', () => {
  it('produit toujours des séances valides', () => {
    for (const path of PATHS) {
      const acts = activityRegistry.byPath(path);
      for (let seed = 1; seed < 200; seed++) {
        const s = buildSession({ activities: acts, rng: mulberry32(seed) });
        expect(s.steps.length).toBeGreaterThan(0);
        expect(s.steps.length).toBeLessThanOrEqual(3);
        expect(new Set(s.steps).size).toBe(s.steps.length);
        s.steps.forEach((k) => expect(activityRegistry.get(k).path).toBe(path));
      }
    }
  });

  it('propose « Je pèse » dans des missions 4-6 ans', () => {
    const acts = activityRegistry.byPath('4-6');
    let found = 0;
    for (let seed = 1; seed < 200; seed++) {
      if (buildSession({ activities: acts, rng: mulberry32(seed) }).steps.includes('poids1')) found++;
    }
    expect(found).toBeGreaterThan(10);
  });

  it('cible les zones les moins développées', () => {
    const stages = Object.fromEntries(ZONE_IDS.map((z) => [z, 4]));
    stages.geometrie = 0;
    const s = buildSession({ activities: activityRegistry.byPath('4-6'), stages, rng: mulberry32(3) });
    expect(s.why[0]).toBe('geometrie');
    expect(s.steps.some((k) => activityRegistry.get(k).skills.includes('geometrie'))).toBe(true);
  });

  it('privilégie les activités pas revues depuis longtemps (révisions espacées)', () => {
    const acts = activityRegistry.byPath('10-12');
    const now = 1_000_000;
    // Toutes pratiquées récemment, sauf « angles », jamais revue depuis longtemps.
    const recency = Object.fromEntries(acts.map((a, i) => [a.key, now + i]));
    recency.angles = 1;
    let withSpacing = 0;
    let without = 0;
    for (let seed = 1; seed < 300; seed++) {
      if (buildSession({ activities: acts, rng: mulberry32(seed), recency }).steps.includes('angles')) withSpacing++;
      if (buildSession({ activities: acts, rng: mulberry32(seed) }).steps.includes('angles')) without++;
    }
    expect(withSpacing).toBeGreaterThan(without);
  });

  it('enregistre la date de dernière pratique', () => {
    const ad = createAdaptiveEngine(createMemoryStore());
    ad.record('a', 'angles', true, 3, 42);
    expect(ad.recency('a')).toEqual({ angles: 42 });
  });

  it('renvoie une séance vide (repli Explorer) si le parcours n’a aucune activité', () => {
    expect(buildSession({ activities: [] }).steps).toEqual([]);
  });
});
