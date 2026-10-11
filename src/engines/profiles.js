// Profils (plusieurs enfants sur un même appareil) et réglages.

import { defaultStore } from './storage.js';

export const PROFILES_KEY = 'ateliersMaths.profils';
export const SETTINGS_KEY = 'ateliersMaths.reglages';

export const AVATAR_COLORS = [
  { fg: '#E8892F', bg: '#FCE3CC' },
  { fg: '#2F6FB0', bg: '#DCE9F6' },
  { fg: '#A8364F', bg: '#FBE1E6' },
  { fg: '#6E3D8A', bg: '#F1E8F6' },
  { fg: '#2E7D5B', bg: '#E3F0E7' },
];

export const DEFAULT_SETTINGS = { sons: true, voix: true, anim: false, personnage: 'garcon' };

export function loadProfiles(store = defaultStore) {
  const data = store.readJSON(PROFILES_KEY, null);
  if (!data || !Array.isArray(data.children)) return { children: [], activeId: null };
  return data;
}

export function saveProfiles(data, store = defaultStore) {
  store.writeJSON(PROFILES_KEY, data);
}

export function newChild(name, path, index, theme = 'fees') {
  return {
    id: `enfant-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    name: name.trim(),
    path,
    theme,
    color: index % AVATAR_COLORS.length,
  };
}

// Jardin déjà vu par l'enfant : pour animer les zones qui ont grandi depuis sa dernière visite.
export const SEEN_KEY = 'ateliersMaths.jardinVu';

export function loadSeen(childId, store = defaultStore) {
  return (store.readJSON(SEEN_KEY, {}) || {})[childId] || null;
}

export function saveSeen(childId, stages, store = defaultStore) {
  const all = store.readJSON(SEEN_KEY, {}) || {};
  all[childId] = stages;
  store.writeJSON(SEEN_KEY, all);
}

export function loadSettings(store = defaultStore) {
  return { ...DEFAULT_SETTINGS, ...(store.readJSON(SETTINGS_KEY, {}) || {}) };
}

export function saveSettings(settings, store = defaultStore) {
  store.writeJSON(SETTINGS_KEY, settings);
}
