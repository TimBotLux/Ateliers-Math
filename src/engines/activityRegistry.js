// activityRegistry — registre unique des activités.
// Chaque activité déclare : clé, libellé, parcours, ordre, compétences cognitives,
// durée estimée (minutes), type d'interaction, nombre de manches et générateur.

import { ZONE_IDS } from '../data/zones.js';

export const PATH_IDS = ['4-6', '7-9', '10-12'];
export const INTERACTIONS = ['choix', 'comparaison', 'prediction', 'clavier', 'manipulation', 'droite'];
export const TECHNICAL_TAGS = ['motricite', 'vitesse'];

export function createRegistry() {
  const byKey = new Map();

  return {
    register(def) {
      if (!def.key || byKey.has(def.key)) throw new Error(`Activité invalide ou en double : ${def.key}`);
      if (!PATH_IDS.includes(def.path)) throw new Error(`Parcours inconnu pour ${def.key}`);
      if (!INTERACTIONS.includes(def.interaction)) throw new Error(`Interaction inconnue pour ${def.key}`);
      const unknown = def.skills.filter((s) => !ZONE_IDS.includes(s) && !TECHNICAL_TAGS.includes(s));
      if (unknown.length) throw new Error(`Compétences inconnues pour ${def.key} : ${unknown}`);
      if (!def.skills.some((s) => ZONE_IDS.includes(s))) throw new Error(`${def.key} ne nourrit aucune zone`);
      if (typeof def.create !== 'function') throw new Error(`${def.key} n'a pas de générateur`);
      byKey.set(def.key, Object.freeze({ tiers: 3, rounds: 5, ...def }));
    },
    get: (key) => byKey.get(key) || null,
    all: () => [...byKey.values()],
    byPath: (path) => [...byKey.values()].filter((a) => a.path === path).sort((a, b) => a.order - b.order),
  };
}
