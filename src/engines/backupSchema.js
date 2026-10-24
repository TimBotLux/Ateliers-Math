// Contrôle d'une sauvegarde importée : on ne garde que des données de la forme attendue.
// Un fichier abîmé ou trafiqué ne doit jamais faire planter l'application (l'enfant n'est
// jamais bloqué) : chaque champ inconnu est ignoré, chaque valeur douteuse est corrigée.

import { ZONE_IDS } from '../data/zones.js';
import { THEME_IDS, DEFAULT_THEME } from '../garden-themes/index.js';
import { LANGS } from '../i18n/index.js';
import { VOICE_PRESETS } from '../state/media.js';
import { PATH_IDS } from './activityRegistry.js';
import { AVATAR_COLORS, DEFAULT_SETTINGS } from './profiles.js';

export const BACKUP_FORMAT = 'ateliers-maths';
export const NAME_MAX = 24;
const MAX_CHILDREN = 20;
const MAX_PRACTICE = 1e6;

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
/** Identifiant sûr : lettres, chiffres, tirets, soulignés ; jamais une clé spéciale de JavaScript. */
export const isSafeId = (v) => typeof v === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(v) && !FORBIDDEN_KEYS.has(v);
const count = (v, max = MAX_PRACTICE) => (Number.isFinite(v) && v >= 0 ? Math.min(Math.floor(v), max) : 0);

function cleanChild(c, index) {
  if (!isObject(c) || !isSafeId(c.id) || typeof c.name !== 'string') return null;
  const name = c.name.trim().slice(0, NAME_MAX);
  if (!name || !PATH_IDS.includes(c.path)) return null;
  return {
    id: c.id,
    name,
    path: c.path,
    theme: THEME_IDS.includes(c.theme) ? c.theme : DEFAULT_THEME,
    color: Number.isInteger(c.color) && c.color >= 0 && c.color < AVATAR_COLORS.length ? c.color : index % AVATAR_COLORS.length,
  };
}

function cleanProfiles(p) {
  if (!isObject(p) || !Array.isArray(p.children)) return null;
  const children = [];
  for (const c of p.children.slice(0, MAX_CHILDREN)) {
    const clean = cleanChild(c, children.length);
    if (clean && !children.some((k) => k.id === clean.id)) children.push(clean);
  }
  const activeId = children.some((c) => c.id === p.activeId) ? p.activeId : children[0]?.id ?? null;
  return { children, activeId };
}

function cleanSettings(s) {
  const out = { ...DEFAULT_SETTINGS };
  if (!isObject(s)) return out;
  for (const [key, def] of Object.entries(DEFAULT_SETTINGS)) {
    if (typeof s[key] === typeof def) out[key] = s[key];
  }
  if (!(out.personnage in VOICE_PRESETS)) out.personnage = DEFAULT_SETTINGS.personnage;
  if (!LANGS[out.langue]) out.langue = DEFAULT_SETTINGS.langue;
  return out;
}

function cleanGarden(g, childIds) {
  if (!isObject(g) || g.version !== 2) return null;
  const children = {};
  if (isObject(g.children)) {
    for (const id of childIds) {
      const c = g.children[id];
      if (!isObject(c)) continue;
      const practice = {};
      for (const z of ZONE_IDS) practice[z] = count(isObject(c.practice) ? c.practice[z] : 0);
      children[id] = { seed: Number.isFinite(c.seed) ? c.seed >>> 0 : 0, practice };
    }
  }
  const legacy = isObject(g.legacy) ? g.legacy : {};
  return {
    version: 2,
    migrated: g.migrated === true,
    legacy: {
      present: legacy.present === true,
      owner: childIds.includes(legacy.owner) ? legacy.owner : null,
    },
    children,
  };
}

function cleanAdaptation(a, childIds) {
  const out = {};
  if (!isObject(a)) return out;
  for (const id of childIds) {
    if (!isObject(a[id])) continue;
    out[id] = {};
    for (const [key, e] of Object.entries(a[id])) {
      if (!isSafeId(key) || !isObject(e)) continue;
      const entry = { tier: Math.max(1, count(e.tier, 10) || 1), wins: count(e.wins, 100), misses: count(e.misses, 100) };
      if (Number.isFinite(e.last) && e.last > 0) entry.last = e.last;
      out[id][key] = entry;
    }
  }
  return out;
}

/** Sauvegarde nettoyée, prête à être enregistrée ; null si ce n'est pas une sauvegarde de l'application. */
export function sanitizeBackup(data) {
  if (!isObject(data) || data.format !== BACKUP_FORMAT) return null;
  const profils = cleanProfiles(data.profils);
  if (!profils) return null;
  const ids = profils.children.map((c) => c.id);
  const jardin = cleanGarden(data.jardin, ids);
  if (!jardin) return null;
  return {
    profils,
    reglages: cleanSettings(data.reglages),
    jardin,
    adaptation: cleanAdaptation(data.adaptation, ids),
  };
}
