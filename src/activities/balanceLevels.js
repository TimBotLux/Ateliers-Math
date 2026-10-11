// Configurations des niveaux de la famille Balance.
// Seul le niveau 1 existe : les niveaux 2 à 6 attendent sa validation (PRD, feuille de route).

export const POIDS1 = {
  mode: 'prediction',
  dressingOrdered: true,
  // Plages de valeurs cachées par palier de difficulté.
  // sizeMatchesWeight : l'objet lourd est dessiné plus grand (question ouverte du PRD :
  // option générique activée seulement au premier palier, à valider).
  tiers: [
    { range: [1, 5], sizeMatchesWeight: true },
    { range: [1, 10], sizeMatchesWeight: false },
    { range: [1, 20], sizeMatchesWeight: false },
  ],
  sizeScale: { heavy: 1.3, light: 0.75 },
  dressingPool: [
    { id: 'elephant-souris', heavy: { emoji: '🐘', name: 'un éléphant' }, light: { emoji: '🐭', name: 'une souris' } },
    { id: 'adulte-enfant', heavy: { emoji: '🧍', name: 'un adulte' }, light: { emoji: '🧒', name: 'un enfant' } },
    { id: 'bouquet-fleur', heavy: { emoji: '💐', name: 'un bouquet' }, light: { emoji: '🌸', name: 'une fleur' } },
    { id: 'pieces', heavy: { emoji: '🪙', count: 3, name: 'plusieurs pièces' }, light: { emoji: '🪙', name: 'une pièce' } },
    { id: 'baleine-poisson', heavy: { emoji: '🐋', name: 'une baleine' }, light: { emoji: '🐟', name: 'un poisson' } },
  ],
  // Cas d'égalité : toujours deux objets identiques (règle à valider, PRD).
  equalPool: [
    { emoji: '🍎', name: 'une pomme' },
    { emoji: '🍊', name: 'une orange' },
    { emoji: '⚽', name: 'un ballon' },
  ],
};

// Paires candidates (E2), non activées tant qu'elles ne sont pas validées.
// Les emoji récents (🪨, 🪶) doivent être vérifiés sur un appareil ancien.
export const CANDIDATE_PAIRS = [
  { id: 'rocher-plume', heavy: { emoji: '🪨', name: 'un rocher' }, light: { emoji: '🪶', name: 'une plume' } },
  { id: 'camion-velo', heavy: { emoji: '🚛', name: 'un camion' }, light: { emoji: '🚲', name: 'un vélo' } },
  { id: 'ours-oiseau', heavy: { emoji: '🐻', name: 'un ours' }, light: { emoji: '🐦', name: 'un oiseau' } },
  { id: 'pasteque-cerise', heavy: { emoji: '🍉', name: 'une pastèque' }, light: { emoji: '🍒', name: 'une cerise' } },
  { id: 'briques', heavy: { emoji: '🧱', count: 3, name: 'des briques' }, light: { emoji: '🧱', name: 'une brique' } },
];
