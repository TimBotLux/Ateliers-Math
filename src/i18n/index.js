// Traduction de l'interface : français (par défaut) ou anglais britannique.
// Un seul réglage pour l'appareil (settings.langue). La langue courante est tenue ici,
// pour que les générateurs d'activités (hors React) écrivent leurs consignes dans la bonne langue.

import en from './en.js';
import fr from './fr.js';

export const LANGS = {
  fr: { id: 'fr', label: 'Français', locale: 'fr-FR', speech: 'fr-FR' },
  en: { id: 'en', label: 'English', locale: 'en-GB', speech: 'en-GB' },
};
export const DEFAULT_LANG = 'fr';
const DICTS = { fr, en };

let current = DEFAULT_LANG;

export const getLang = () => current;

export function setLang(lang) {
  current = LANGS[lang] ? lang : DEFAULT_LANG;
  if (typeof document !== 'undefined') document.documentElement.lang = current;
}

const lookup = (dict, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict);

/**
 * Texte traduit. Les valeurs peuvent être des chaînes (avec {variables}),
 * des fonctions (accords, pluriels) ou des listes. Repli : français, puis la clé elle-même.
 */
export function t(key, vars = {}) {
  let v = lookup(DICTS[current], key);
  if (v === undefined) v = lookup(fr, key);
  if (v === undefined) return key;
  if (typeof v === 'function') return v(vars);
  if (typeof v === 'string') return v.replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
  return v;
}

export const locale = () => LANGS[current].locale;
export const speechLang = () => LANGS[current].speech;

/** Grand nombre avec séparateur de milliers de la langue (espace en français, virgule en anglais). */
export const fmtNumber = (n) => n.toLocaleString(locale()).replace(/[  ]/g, ' ');

/** Nombre décimal : virgule en français, point en anglais. */
export const fmtDecimal = (v, digits) => (current === 'en' ? v.toFixed(digits) : v.toFixed(digits).replace('.', ','));

/** Libellés d'activité (le registre garde la clé ; le texte vient du dictionnaire). */
export const activityLabel = (a) => t(`activities.${a.key}.label`);
export const activitySubtitle = (a) => t(`activities.${a.key}.subtitle`);

/** Dictionnaires bruts, pour les tests de complétude. */
export const _dicts = DICTS;
