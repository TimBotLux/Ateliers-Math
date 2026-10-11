// Garden Engine 2.0 — un paysage de 8 zones qui grandit uniquement sur une réussite.
//
// Règles (PRD) :
//  - 6 paliers de maturité communs aux 8 zones : 0, 5, 20, 50, 120, 250 ;
//    jamais de 7e palier, seulement des variantes rares (déterministes) à partir de 500.
//  - un jardin par enfant, avec une graine de disposition qui fixe l'ordre des zones ;
//  - l'ancien compteur « jardinMathsTotal » est conservé tel quel (lecture seule),
//    jamais réparti entre les zones : il devient « le jardin d'avant » ;
//  - aucun chiffre n'est jamais exposé à l'interface (seulement des paliers à dessiner).
//
// Chargement paresseux : l'état est lu au premier appel réel, pas à la définition du module.

import { ZONE_IDS } from '../data/zones.js';
import { defaultStore } from './storage.js';
import { hashString, mulberry32, shuffle } from './random.js';

export const GARDEN_KEY = 'gardenEngineV2';
export const LEGACY_KEY = 'jardinMathsTotal';
export const STAGE_THRESHOLDS = Object.freeze([0, 5, 20, 50, 120, 250]);
export const RARE_VARIANT_FROM = 500;
export const STAGE_NAMES = ['une graine', 'une pousse', 'une jeune plante', 'un bouton', 'une fleur', 'un arbre'];
export const RARE_VARIANTS = ['dore', 'nid', 'etoile'];

// Unité de pratique cumulée : question ouverte du PRD.
// Choix provisoire : 1 bonne réponse = 1 unité de pratique.
export const PRACTICE_UNIT = 'bonne-reponse';

export function stageFor(practice) {
  let stage = 0;
  for (let i = 1; i < STAGE_THRESHOLDS.length; i++) {
    if (practice >= STAGE_THRESHOLDS[i]) stage = i;
  }
  return stage;
}

const emptyPractice = () => Object.fromEntries(ZONE_IDS.map((z) => [z, 0]));

export function createGardenEngine(store = defaultStore) {
  let state = null;

  function save() {
    store.writeJSON(GARDEN_KEY, state);
  }

  function load() {
    if (state) return state;
    const saved = store.readJSON(GARDEN_KEY, null);
    if (saved && saved.version === 2) {
      state = saved;
      state.children = state.children || {};
      state.legacy = state.legacy || { present: false, owner: null };
      return state;
    }
    // Première ouverture avec Garden Engine 2.0 : migration unique.
    const legacyRaw = store.readRaw(LEGACY_KEY);
    const legacy = Number.parseInt(legacyRaw, 10);
    state = {
      version: 2,
      migrated: true,
      legacy: { present: Number.isFinite(legacy) && legacy > 0, owner: null },
      children: {},
    };
    save();
    return state;
  }

  function ensureChild(childId) {
    const s = load();
    if (!s.children[childId]) {
      s.children[childId] = {
        seed: hashString(`${childId}:${Date.now()}:${Math.random()}`),
        practice: emptyPractice(),
      };
      // Le jardin d'avant appartient au premier enfant de l'appareil.
      if (s.legacy.present && !s.legacy.owner) s.legacy.owner = childId;
      save();
    }
    const child = s.children[childId];
    for (const z of ZONE_IDS) if (typeof child.practice[z] !== 'number') child.practice[z] = 0;
    return child;
  }

  return {
    ensureChild,

    /** Fait grandir les zones nourries par ces compétences ; ignore les tags techniques. */
    grow(childId, skills) {
      const child = ensureChild(childId);
      const zones = [...new Set(skills)].filter((z) => ZONE_IDS.includes(z));
      for (const z of zones) child.practice[z] += 1;
      if (zones.length) save();
      return zones;
    },

    /** Palier de maturité (0 à 5) de chaque zone. */
    stages(childId) {
      const child = ensureChild(childId);
      return Object.fromEntries(ZONE_IDS.map((z) => [z, stageFor(child.practice[z])]));
    },

    /** Ordre des zones dans le paysage, fixé par la graine de l'enfant. */
    order(childId) {
      const child = ensureChild(childId);
      return shuffle(mulberry32(child.seed), ZONE_IDS);
    },

    /** Variante rare, déterministe, au-delà de 500 de pratique ; sinon null. */
    variant(childId, zone) {
      const child = ensureChild(childId);
      if ((child.practice[zone] || 0) < RARE_VARIANT_FROM) return null;
      return RARE_VARIANTS[hashString(`${child.seed}:${zone}`) % RARE_VARIANTS.length];
    },

    hasLegacy(childId) {
      const s = load();
      return s.legacy.present && s.legacy.owner === childId;
    },

    snapshot() {
      return JSON.parse(JSON.stringify(load()));
    },

    restore(data) {
      if (!data || data.version !== 2) throw new Error('Jardin illisible');
      state = data;
      save();
    },
  };
}

export const gardenEngine = createGardenEngine();
