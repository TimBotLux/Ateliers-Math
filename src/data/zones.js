// Les 8 zones du jardin, une par compétence cognitive (Garden Engine 2.0).

export const ZONES = [
  { id: 'numeration', name: 'Numération', long: 'Numération', article: 'la numération', color: '#E8892F', tint: '#FDEEDD', ink: '#B85E14' },
  { id: 'calcul', name: 'Calcul', long: 'Calcul', article: 'le calcul', color: '#6FA8DC', tint: '#E3EEF8', ink: '#2F6FB0' },
  { id: 'logique', name: 'Logique', long: 'Logique', article: 'la logique', color: '#D9617A', tint: '#FBE7EB', ink: '#A8364F' },
  { id: 'geometrie', name: 'Géométrie', long: 'Géométrie', article: 'la géométrie', color: '#F2B84B', tint: '#FDF3DC', ink: '#8A6408' },
  { id: 'attention', name: 'Attention', long: 'Attention visuelle', article: "l'attention", color: '#B07CC6', tint: '#F1E8F6', ink: '#6E3D8A' },
  { id: 'memoire', name: 'Mémoire', long: 'Mémoire', article: 'la mémoire', color: '#E8892F', tint: '#FDEEDD', ink: '#B85E14' },
  { id: 'espace', name: 'Espace', long: 'Repérage spatial', article: "l'espace", color: '#6FA8DC', tint: '#E3EEF8', ink: '#2F6FB0' },
  { id: 'problemes', name: 'Problèmes', long: 'Résolution de problèmes', article: 'les problèmes', color: '#D9617A', tint: '#FBE7EB', ink: '#A8364F' },
];

export const ZONE_IDS = ZONES.map((z) => z.id);

export const zoneById = (id) => ZONES.find((z) => z.id === id);

export const PATHS = {
  '4-6': { id: '4-6', label: '4-6 ans', accent: '#2E7D5B', accentSoft: '#E3F0E7', bg: '#EEF4F1', border: '#D3E0DA' },
  '7-9': { id: '7-9', label: '7-9 ans', accent: '#2F6FB0', accentSoft: '#DCE9F6', bg: '#EDF2F8', border: '#D2DDEA' },
  // Violet proposé dans les options de couleur de la maquette d'accueil.
  '10-12': { id: '10-12', label: '10-12 ans', accent: '#7A4FB5', accentSoft: '#ECE4F6', bg: '#F2EFF8', border: '#DDD5EC' },
};
