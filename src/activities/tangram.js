// Famille Tangram « Je construis » : 3 niveaux, un par parcours (fiches du PRD, 3 novembre 2026).
// Chaque silhouette est donnée par une solution de référence, vérifiée par le moteur
// (tests/tangram.test.js) ; toute autre solution valable est acceptée.
// Une pose = [pièce, quart de tour, retournée (0/1), x, y] (voir engines/tangramEngine.js).

import { atomsArea, pieceSize, solutionAtoms } from '../engines/tangramEngine.js';
import { pick, randInt, shuffle } from '../engines/random.js';
import { t } from '../i18n/index.js';

// theme : 'all' (tous les univers), 'fees' ou 'gare' (petit jeu propre à chaque univers du jardin).
export const SILHOUETTES = [
  // 2 grandes pièces
  { id: 'cerfvolant', theme: 'all', pieces: [['L1', 1, 0, 0, 0], ['L2', 3, 0, 2, 0]] },
  { id: 'voile', theme: 'all', pieces: [['L1', 3, 0, 0, 0], ['L2', 2, 0, 0, 2]] },
  // 3 pièces
  { id: 'bateau', theme: 'all', pieces: [['S1', 1, 0, 0, 0], ['L1', 0, 0, 0, 2], ['M', 3, 0, 1, 0]] },
  { id: 'poisson', theme: 'all', pieces: [['L1', 1, 0, 0, 0], ['L2', 3, 0, 2, 0], ['S1', 1, 0, 4, 1]] },
  { id: 'papillon', theme: 'fees', pieces: [['L1', 3, 0, 0, 0], ['P', 1, 0, 2, 1], ['L2', 1, 0, 3, 0]] },
  { id: 'wagonnet', theme: 'gare', pieces: [['S1', 0, 0, 0, 0], ['P', 0, 1, 1, 0], ['Q', 0, 0, 1, 1]] },
  // 4 pièces
  { id: 'fleche', theme: 'all', pieces: [['M', 0, 0, 0, 1], ['S1', 2, 0, 0, 2], ['S2', 1, 0, 1, 1], ['L1', 3, 0, 2, 0]] },
  { id: 'voilier', theme: 'all', pieces: [['L1', 3, 0, 1, 0], ['S1', 1, 0, 0, 1], ['S2', 0, 0, 0, 4], ['P', 0, 1, 1, 4]] },
  { id: 'champignon', theme: 'fees', pieces: [['L1', 2, 0, 0, 0], ['M', 0, 0, 1, 2], ['S1', 2, 0, 1, 3], ['S2', 1, 0, 2, 2]] },
  { id: 'wagon', theme: 'gare', pieces: [['L1', 0, 0, 0, 0], ['M', 3, 0, 0, 0], ['S1', 2, 0, 2, 1], ['S2', 1, 0, 3, 0]] },
  // 5 pièces
  { id: 'maison', theme: 'all', pieces: [['L1', 2, 0, 0, 0], ['L2', 0, 0, 0, 2], ['M', 3, 0, 0, 2], ['S1', 2, 0, 2, 3], ['S2', 1, 0, 3, 2]] },
  { id: 'oiseau', theme: 'all', pieces: [['Q', 0, 0, 0, 0], ['S1', 1, 0, 1, 1], ['P', 1, 1, 1, 2], ['M', 0, 0, 2, 1], ['L1', 2, 0, 2, 1]] },
  { id: 'citerne', theme: 'gare', pieces: [['Q', 0, 0, 0, 0], ['S1', 3, 0, 0, 1], ['L1', 2, 0, 0, 1], ['M', 1, 0, 1, 0], ['P', 1, 1, 3, 0]] },
  // 7 pièces
  { id: 'carre', theme: 'all', pieces: [['L1', 0, 0, 0, 0], ['L2', 3, 0, 0, 0], ['S1', 2, 0, 0, 3], ['Q', 0, 0, 1, 2], ['S2', 1, 0, 2, 1], ['M', 2, 0, 2, 2], ['P', 1, 0, 3, 0]] },
  { id: 'chat', theme: 'all', pieces: [['Q', 0, 0, 0, 1], ['S1', 3, 0, 0, 0], ['S2', 1, 0, 1, 0], ['L1', 3, 0, 0, 2], ['L2', 2, 0, 0, 4], ['M', 1, 0, 2, 4], ['P', 1, 0, 4, 3]] },
  { id: 'fusee', theme: 'all', pieces: [['L1', 2, 0, 0, 4], ['L2', 2, 0, 1, 0], ['M', 0, 0, 2, 2], ['S1', 1, 0, 2, 3], ['P', 1, 0, 3, 2], ['Q', 0, 0, 3, 4], ['S2', 2, 0, 4, 5]] },
  { id: 'lanterne', theme: 'fees', pieces: [['L1', 1, 0, 0, 0], ['M', 3, 0, 0, 2], ['S1', 0, 0, 0, 4], ['Q', 0, 0, 1, 4], ['L2', 3, 0, 2, 0], ['S2', 1, 0, 2, 3], ['P', 1, 0, 3, 2]] },
  { id: 'locomotive', theme: 'gare', pieces: [['L1', 0, 0, 2, 2], ['M', 3, 0, 2, 2], ['S1', 2, 0, 4, 3], ['S2', 1, 0, 5, 2], ['L2', 1, 0, 0, 1], ['Q', 0, 0, 2, 0], ['P', 1, 0, 6, 0]] },
  // Horloge de quai : cadran en losange, petit toit, pied et socle.
  { id: 'horloge', theme: 'gare', pieces: [['P', 0, 1, 1, 0], ['L1', 1, 0, 0, 1], ['L2', 3, 0, 2, 1], ['Q', 0, 0, 1, 5], ['M', 2, 0, 0, 7], ['S1', 3, 0, 2, 7], ['S2', 2, 0, 2, 8]] },
].map((s) => ({ ...s, solution: s.pieces.map(([id, rot, flip, x, y]) => ({ id, rot, flip: !!flip, x, y })) }));

export const silhouetteById = (id) => SILHOUETTES.find((s) => s.id === id);

/** Silhouettes d'un nombre de pièces donné, dans l'univers de l'enfant (communes + propres à l'univers). */
export function silhouettesFor(count, theme, { needsFlip = false, needsNoP = false } = {}) {
  return SILHOUETTES.filter((s) => s.pieces.length === count
    && (s.theme === 'all' || s.theme === theme)
    && (!needsFlip || s.solution.some((p) => p.id === 'P' && p.flip))
    && (!needsNoP || !s.solution.some((p) => p.id === 'P')));
}

/** Taille du plateau (en carreaux) : la silhouette, centrée, avec une marge pour poser les pièces. */
function boardFor(solution) {
  const maxX = Math.max(...solution.map((p) => p.x + pieceSize(p.id, p.rot, p.flip).w));
  const maxY = Math.max(...solution.map((p) => p.y + pieceSize(p.id, p.rot, p.flip).h));
  const w = Math.max(maxX + 2, 8);
  const h = Math.max(maxY + 2, 6);
  const dx = Math.floor((w - maxX) / 2);
  const dy = Math.floor((h - maxY) / 2);
  return { w, h, solution: solution.map((p) => ({ ...p, x: p.x + dx, y: p.y + dy })) };
}

/**
 * Crée une manche tangram.
 * lines : 'full' (emplacements dessinés), 'pale' (traits intérieurs pâles), 'none' (contour seul).
 * turn : combien de pièces commencent dans une autre orientation que la référence.
 */
export function createTangramRound(sil, { lines, turn, rng, flipP = false, area = null, instruction }) {
  const { w, h, solution } = boardFor(sil.solution);
  const turned = new Set(shuffle(rng, solution.map((p) => p.id)).slice(0, turn === 'all' ? solution.length : turn));
  const tray = shuffle(rng, solution).map((p) => {
    // Le parallélogramme à retourner commence non retourné ; les autres pièces gardent leur face.
    const flip = flipP && p.id === 'P' ? false : p.flip;
    // Une pièce « à tourner » commence d'un ou plusieurs quarts de tour plus loin
    // (le carré et les pièces symétriques peuvent rester identiques : aucune gêne).
    const rot = turned.has(p.id) ? (p.rot + randInt(rng, 1, 3)) % 4 : p.rot;
    return { id: p.id, rot, flip };
  });
  return {
    kind: 'tangram',
    instruction,
    speak: t('tangram.speakName', { name: t(`tangram.names.${sil.id}`) }),
    silhouette: sil.id,
    board: { w, h },
    solution,
    tray,
    lines,
    canFlip: solution.some((p) => p.id === 'P'),
    area,
  };
}

/** Question d'aire (tangram3, palier 3) : la silhouette réussie et une autre, faite des mêmes pièces ou non. */
export function areaQuestion(sil, rng, theme) {
  const same = rng() < 0.5;
  const pool = same
    ? silhouettesFor(7, theme).filter((s) => s.id !== sil.id)
    : silhouettesFor(5, theme);
  const other = pick(rng, pool);
  return {
    other: other.id,
    otherSolution: other.solution,
    answer: atomsArea(solutionAtoms(other.solution)) === atomsArea(solutionAtoms(sil.solution)) ? 'oui' : 'non',
  };
}


// ---------- Les 3 niveaux ----------
// Fiche commune : géométrie, espace, logique ; manipulation ; 3 manches ; 3 minutes.
const COMMON = { skills: ['geometrie', 'espace', 'logique'], duration: 3, interaction: 'manipulation', rounds: 3, isNew: true };

function make(key, tier, rng, ctx, spec) {
  const pool = silhouettesFor(spec.count, ctx?.theme, spec.filter);
  const sil = pick(rng, pool.length ? pool : silhouettesFor(spec.count, 'all'));
  const flipP = !!spec.flipP && sil.solution.some((p) => p.id === 'P' && p.flip);
  return createTangramRound(sil, {
    lines: spec.lines, turn: spec.turn, rng, flipP,
    area: spec.area ? areaQuestion(sil, rng, ctx?.theme) : null,
    instruction: t(`activities.${key}.instruction`),
  });
}

// 4-6 ans : l'enfant pose chaque pièce à l'emplacement dessiné, en la tournant si besoin.
const TANGRAM1 = [
  { count: 2, lines: 'full', turn: 0 },
  { count: 3, lines: 'full', turn: 1 },
  { count: 3, lines: 'pale', turn: 1 },
];
export const tangram1 = {
  key: 'tangram1', label: 'Je construis', path: '4-6', order: 90, ...COMMON,
  create: (tier, rng, ctx) => make('tangram1', tier, rng, ctx, TANGRAM1[tier - 1]),
};

// 7-9 ans : seul le contour est donné ; l'enfant choisit et oriente les pièces.
const TANGRAM2 = [
  { count: 4, lines: 'pale', turn: 'all' },
  { count: 4, lines: 'none', turn: 'all' },
  { count: 5, lines: 'none', turn: 'all', flipP: true, filter: { needsFlip: true } },
];
export const tangram2 = {
  key: 'tangram2', label: 'Je construis', path: '7-9', order: 60, ...COMMON,
  create: (tier, rng, ctx) => make('tangram2', tier, rng, ctx, TANGRAM2[tier - 1]),
};

// 10-12 ans : les 7 pièces, puis « Ces deux formes ont-elles la même aire ? ».
const TANGRAM3 = [
  { count: 5, lines: 'none', turn: 'all', flipP: true },
  { count: 7, lines: 'none', turn: 'all', flipP: true },
  { count: 7, lines: 'none', turn: 'all', flipP: true, area: true },
];
export const tangram3 = {
  key: 'tangram3', label: 'Je construis', path: '10-12', order: 90, ...COMMON,
  create: (tier, rng, ctx) => make('tangram3', tier, rng, ctx, TANGRAM3[tier - 1]),
};

export const TANGRAM_ACTIVITIES = [tangram1, tangram2, tangram3];
