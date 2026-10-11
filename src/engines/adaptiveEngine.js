// adaptiveEngine — adaptation de la difficulté par paliers selon réussites et erreurs.
// 3 réussites d'affilée : palier suivant ; 2 erreurs d'affilée : palier précédent.

import { defaultStore } from './storage.js';

export const ADAPTIVE_KEY = 'adaptiveEngine';
export const UP_AFTER = 3;
export const DOWN_AFTER = 2;

export function createAdaptiveEngine(store = defaultStore) {
  let state = null;
  const load = () => (state ??= store.readJSON(ADAPTIVE_KEY, {}) || {});
  const save = () => store.writeJSON(ADAPTIVE_KEY, state);

  function entry(childId, key) {
    const s = load();
    s[childId] ??= {};
    s[childId][key] ??= { tier: 1, wins: 0, misses: 0 };
    return s[childId][key];
  }

  return {
    tier(childId, key, maxTier = 3) {
      return Math.min(maxTier, Math.max(1, entry(childId, key).tier));
    },

    record(childId, key, success, maxTier = 3, now = Date.now()) {
      const e = entry(childId, key);
      e.last = now; // date de dernière pratique, pour les révisions espacées
      if (success) {
        e.wins += 1;
        e.misses = 0;
        if (e.wins >= UP_AFTER && e.tier < maxTier) {
          e.tier += 1;
          e.wins = 0;
        }
      } else {
        e.misses += 1;
        e.wins = 0;
        if (e.misses >= DOWN_AFTER && e.tier > 1) {
          e.tier -= 1;
          e.misses = 0;
        }
      }
      save();
      return e.tier;
    },

    /** Date de dernière pratique de chaque activité ({} si jamais pratiquée). */
    recency(childId) {
      const s = load()[childId] || {};
      return Object.fromEntries(Object.entries(s).map(([k, e]) => [k, e.last || 0]));
    },

    snapshot: () => JSON.parse(JSON.stringify(load())),
    restore(data) {
      state = data && typeof data === 'object' ? data : {};
      save();
    },
  };
}

export const adaptiveEngine = createAdaptiveEngine();
