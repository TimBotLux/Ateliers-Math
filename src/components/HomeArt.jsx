// Illustrations des deux cartes de l'accueil : elles disent, sans lire, ce qui va se passer.
// Ma Mission = un chemin tout tracé, d'atelier en atelier, jusqu'à l'étoile.
// Explorer = des ateliers étalés, l'enfant pointe celui qu'il veut.
// Les formes prennent la couleur de la carte (prop color).
// Aucun chiffre (règle du produit) : les ateliers sont évoqués par des points et des formes.

/** Chemin pointillé qui relie des pierres d'atelier jusqu'à une étoile. */
export function MissionArt({ color }) {
  return (
    <svg className="home-art" viewBox="0 0 180 80" preserveAspectRatio="xMinYMid meet" aria-hidden="true" style={{ color }}>
      <path d="M14 62 C 44 66, 46 26, 76 28 S 112 64, 140 46 S 160 24, 164 22" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="4" strokeLinecap="round" strokeDasharray="1 10" />
      {/* Pierres d'atelier : un rond, un triangle, un carré (des ateliers différents). */}
      <g>
        <circle cx="16" cy="62" r="13" fill="#fff" />
        <circle cx="12" cy="59" r="2.6" fill="currentColor" /><circle cx="20" cy="59" r="2.6" fill="currentColor" /><circle cx="16" cy="66" r="2.6" fill="currentColor" />
      </g>
      <g>
        <circle cx="76" cy="28" r="13" fill="#fff" fillOpacity=".9" />
        <path d="M76 21 L83 33 L69 33 Z" fill="currentColor" />
      </g>
      <g>
        <circle cx="128" cy="52" r="13" fill="#fff" fillOpacity=".8" />
        <rect x="122" y="46" width="12" height="12" rx="2" fill="currentColor" />
      </g>
      <path transform="translate(164 22)" d="M0 -15 L4.4 -4.6 L15 -4 L6.8 3 L9.4 14 L0 8 L-9.4 14 L-6.8 3 L-15 -4 L-4.4 -4.6 Z" fill="#FFD23F" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

const TILE = { width: 34, height: 30, rx: 9 };

/** Ateliers étalés en grille ; une main pointe celui que l'enfant choisit. */
export function ExplorerArt({ color }) {
  return (
    <svg className="home-art" viewBox="0 0 180 80" preserveAspectRatio="xMinYMid meet" aria-hidden="true" style={{ color }}>
      {/* Rangée du haut : quatre ateliers (points, balance, droite graduée, forme). */}
      <rect x="4" y="4" {...TILE} fill="#fff" fillOpacity=".85" />
      <circle cx="15" cy="15" r="3" fill="currentColor" /><circle cx="27" cy="15" r="3" fill="currentColor" /><circle cx="21" cy="25" r="3" fill="currentColor" />
      <rect x="48" y="4" {...TILE} fill="#fff" fillOpacity=".85" />
      <path d="M54 26 L76 26 M65 26 L65 12 M56 16 L74 12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="92" y="4" {...TILE} fill="#fff" fillOpacity=".85" />
      <path d="M98 20 L120 20 M98 15 L98 25 M109 16 L109 24 M120 15 L120 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect x="136" y="4" {...TILE} fill="#fff" fillOpacity=".85" />
      <rect x="145" y="11" width="16" height="16" rx="3" fill="currentColor" />
      {/* Rangée du bas : un atelier, l'atelier choisi (cerclé de jaune) et la main qui le désigne. */}
      <rect x="4" y="44" {...TILE} fill="#fff" fillOpacity=".85" />
      <path d="M11 64 L21 52 L31 64 Z" fill="currentColor" />
      <rect x="46" y="40" width="40" height="36" rx="11" fill="#fff" stroke="#FFD23F" strokeWidth="4" />
      <path transform="translate(66 58)" d="M0 -10 L3 -3 L10 -2.6 L4.6 2 L6.4 9.4 L0 5.4 L-6.4 9.4 L-4.6 2 L-10 -2.6 L-3 -3 Z" fill="currentColor" />
      <g transform="translate(112 66) rotate(-60) scale(.62)">
        <path d="M-6 -2 L-6 -26 a5 5 0 0 1 10 0 L4 -8 L4 -10 a5 5 0 0 1 10 0 L14 -6 a5 5 0 0 1 10 0 L24 2 C24 18 14 26 4 26 C-6 26 -14 18 -16 10 L-20 0 a5 5 0 0 1 9 -4 Z" fill="#FFE2C6" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
