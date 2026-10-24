// Effacement des données (RGPD, droit à l'effacement), demandé depuis l'Espace adulte.
// Tout est local : effacer ici, c'est effacer la seule copie (hors sauvegardes exportées).

import { ADAPTIVE_KEY, adaptiveEngine } from './adaptiveEngine.js';
import { GARDEN_KEY, LEGACY_KEY, gardenEngine } from './gardenEngine.js';
import { PROFILES_KEY, SEEN_KEY, SETTINGS_KEY, loadProfiles, saveProfiles } from './profiles.js';
import { defaultStore } from './storage.js';

/** Toutes les clés que l'application écrit dans le navigateur. */
export const STORAGE_KEYS = [PROFILES_KEY, SETTINGS_KEY, SEEN_KEY, GARDEN_KEY, ADAPTIVE_KEY, LEGACY_KEY];

/** Efface un enfant : profil, jardin, paliers des ateliers et jardin déjà vu. */
export function forgetChild(childId, { store = defaultStore, garden = gardenEngine, adaptive = adaptiveEngine } = {}) {
  garden.forget(childId);
  adaptive.forget(childId);
  const seen = store.readJSON(SEEN_KEY, {}) || {};
  delete seen[childId];
  store.writeJSON(SEEN_KEY, seen);
  const profiles = loadProfiles(store);
  const children = profiles.children.filter((c) => c.id !== childId);
  const activeId = children.some((c) => c.id === profiles.activeId) ? profiles.activeId : children[0]?.id ?? null;
  saveProfiles({ children, activeId }, store);
}

/** Efface toutes les données de l'application sur cet appareil (à faire suivre d'un rechargement). */
export function eraseAllData(store = defaultStore) {
  for (const key of STORAGE_KEYS) store.removeRaw(key);
}
