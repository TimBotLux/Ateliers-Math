// Thèmes du jardin : le Garden Engine reste le même, seul le dessin change.
// Thème choisi par l'enfant (fées ou gare) × style selon l'âge (4-6 ou 7-9 ans).

import fees46 from './fees46.js';
import fees79 from './fees79.js';
import fees1012 from './fees1012.js';
import gare46 from './gare46.js';
import gare79 from './gare79.js';
import gare1012 from './gare1012.js';

export const THEME_IDS = ['fees', 'gare'];
export const DEFAULT_THEME = 'fees';

/** Textes de l'interface qui dépendent de l'univers choisi. */
export const THEME_COPY = {
  fees: {
    own: 'Mon jardin',
    see: 'Voir mon jardin',
    open: 'Ouvrir mon jardin',
    grew: 'Ton jardin a grandi !',
    idle: 'Ton jardin attend la suite !',
    legacyTitle: 'Le jardin d’avant',
  },
  gare: {
    own: 'Ma gare',
    see: 'Voir ma gare',
    open: 'Ouvrir ma gare',
    grew: 'Ta gare s’est agrandie !',
    idle: 'Ta gare attend la suite !',
    legacyTitle: 'Le jardin d’avant',
  },
};
export const copyFor = (themeId) => THEME_COPY[themeId] || THEME_COPY[DEFAULT_THEME];

/** Nom de l'univers sur le bouton de choix, adapté à l'âge (moins enfantin chez les grands). */
const CHOICE_LABELS = {
  fees: { '4-6': 'Le jardin des fées', '7-9': 'La forêt mystique', '10-12': 'Les îles suspendues' },
  gare: { '4-6': 'La gare et les trains', '7-9': 'Le réseau ferré', '10-12': 'Le hub du futur' },
};
export const choiceLabel = (themeId, path) => {
  const labels = CHOICE_LABELS[themeId] || CHOICE_LABELS[DEFAULT_THEME];
  return labels[path] || labels['4-6'];
};

const THEMES = {
  fees: { '4-6': fees46, '7-9': fees79, '10-12': fees1012 },
  gare: { '4-6': gare46, '7-9': gare79, '10-12': gare1012 },
};

/** Thème à dessiner pour un enfant : son choix, dans le style de son parcours. */
export function themeFor(themeId, path) {
  const t = THEMES[themeId] || THEMES[DEFAULT_THEME];
  return t[path] || t['4-6'];
}

export const allThemes = () => Object.values(THEMES).flatMap((t) => Object.values(t));

/** Fragment SVG (sans la balise <svg>) d'une zone à un stade donné. */
export function zoneMarkup(theme, zoneId, stage, { animateNew = false, variant = null } = {}) {
  const zone = theme.zones[zoneId];
  if (!zone) return theme.bg;
  const parts = zone.stickers
    .filter((s) => s.from <= stage && (s.to === undefined || s.to >= stage))
    .map((s) => (animateNew && s.from === stage ? `<g class="pop">${s.svg}</g>` : s.svg))
    .join('');
  return (zone.bg ?? theme.bg) + parts + (variant ? VARIANT_MARKS[variant] || '' : '');
}

// Variantes rares (au-delà de 500 de pratique) : une petite marque discrète, jamais un chiffre.
const VARIANT_MARKS = {
  dore: '<path transform="translate(186 16)" d="M0 -8 L2.4 -2.4 L8 0 L2.4 2.4 L0 8 L-2.4 2.4 L-8 0 L-2.4 -2.4Z" fill="#FFD23F" stroke="#fff" stroke-width="1.5"/>',
  nid: '<g transform="translate(184 18)"><circle r="8" fill="#FFF6D6" stroke="#fff" stroke-width="1.5"/><path d="M-4 0 L-1 3 L4 -3" stroke="#C99A3B" stroke-width="2" fill="none" stroke-linecap="round"/></g>',
  etoile: '<g transform="translate(184 18)"><circle r="8" fill="#DCE9F6" stroke="#fff" stroke-width="1.5"/><path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5Z" fill="#2F6FB0"/></g>',
};

/** Définitions SVG (filtres, dégradés) à insérer une seule fois dans la page. */
export const GARDEN_DEFS = `
  <filter id="sticker" x="-25%" y="-25%" width="150%" height="150%">
    <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="dil"/>
    <feFlood flood-color="#ffffff" result="white"/>
    <feComposite in="white" in2="dil" operator="in" result="outline"/>
    <feGaussianBlur in="dil" stdDeviation="1.6" result="blur"/>
    <feOffset in="blur" dy="2.4" result="off"/>
    <feFlood flood-color="#3B2A1A" flood-opacity="0.25"/>
    <feComposite in2="off" operator="in" result="shadow"/>
    <feMerge><feMergeNode in="shadow"/><feMergeNode in="outline"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="flat" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="2" stdDeviation="1.4" flood-color="#000" flood-opacity=".28"/></filter>
  <linearGradient id="sky-fees" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FB9CF"/><stop offset=".55" stop-color="#CBE2CF"/><stop offset="1" stop-color="#F2DC9C"/></linearGradient>
  <linearGradient id="sky-fees79" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#102A3A"/><stop offset=".6" stop-color="#1F4E5A"/><stop offset="1" stop-color="#4F7F6E"/></linearGradient>
  <linearGradient id="sky-gare" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCEBF8"/><stop offset="1" stop-color="#F4F9FD"/></linearGradient>
  <linearGradient id="sky-gare79" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C7DDEC"/><stop offset="1" stop-color="#EEF4F7"/></linearGradient>
  <linearGradient id="sky-fees1012" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1C2A4A"/><stop offset=".6" stop-color="#3C6A86"/><stop offset="1" stop-color="#E3B072"/></linearGradient>
  <linearGradient id="sky-gare1012" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0F1B2D"/><stop offset=".65" stop-color="#243F5C"/><stop offset="1" stop-color="#4F7896"/></linearGradient>`;
