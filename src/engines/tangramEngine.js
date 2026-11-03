// tangramEngine — moteur de la famille Tangram (« Je construis »).
//
// Le carré du tangram (côté 4) est posé sur une grille : chaque carreau est découpé par ses deux
// diagonales en 4 petits triangles rectangles isocèles (les « atomes », d'aire 1/4).
// Une pièce posée couvre un ensemble d'atomes. Une manche est réussie quand les atomes couverts
// sont exactement ceux de la silhouette, sans chevauchement : toute solution valable est acceptée,
// pas seulement la solution de référence.
//
// Orientation d'une pièce : quart de tour (rot 0 à 3) et retournement (flip). Avec un quart de tour,
// chaque orientation reste calée sur la grille (un pas de 45° ne tomberait jamais sur la grille).
// Position : coin haut-gauche (x, y) du rectangle qui contient la pièce, en carreaux entiers.

/** Les 7 pièces, sommets entiers dans leur orientation de départ. Aire en carreaux. */
export const PIECES = {
  L1: { shape: 'L', points: [[0, 0], [4, 0], [2, 2]] },
  L2: { shape: 'L', points: [[0, 0], [4, 0], [2, 2]] },
  M: { shape: 'M', points: [[0, 0], [2, 0], [0, 2]] },
  S1: { shape: 'S', points: [[0, 0], [2, 0], [1, 1]] },
  S2: { shape: 'S', points: [[0, 0], [2, 0], [1, 1]] },
  Q: { shape: 'Q', points: [[1, 0], [2, 1], [1, 2], [0, 1]] },
  P: { shape: 'P', points: [[0, 0], [2, 0], [3, 1], [1, 1]] },
};
export const PIECE_IDS = Object.keys(PIECES);

/** Couleurs franches et contrastées, une par pièce (aucun chiffre ni lettre sur les pièces). */
export const PIECE_COLORS = {
  L1: '#2F6FB0', L2: '#E8892F', M: '#2E7D5B', S1: '#D9617A', S2: '#7A4FB5', Q: '#F2B84B', P: '#3FA7A3',
};

/** Sommets d'une pièce orientée, ramenés au coin (0, 0). */
export function orientedPoints(id, rot = 0, flip = false) {
  let pts = PIECES[id].points.map(([x, y]) => (flip ? [-x, y] : [x, y]));
  for (let k = 0; k < ((rot % 4) + 4) % 4; k++) pts = pts.map(([x, y]) => [-y, x]);
  const minX = Math.min(...pts.map((p) => p[0]));
  const minY = Math.min(...pts.map((p) => p[1]));
  // + 0 : évite les « -0 » qui gêneraient les comparaisons de sommets.
  return pts.map(([x, y]) => [x - minX + 0, y - minY + 0]);
}

/** Taille (largeur, hauteur) d'une pièce orientée, en carreaux. */
export function pieceSize(id, rot = 0, flip = false) {
  const pts = orientedPoints(id, rot, flip);
  return { w: Math.max(...pts.map((p) => p[0])), h: Math.max(...pts.map((p) => p[1])) };
}

/** Sommets d'une pièce posée : { id, rot, flip, x, y }. */
export const placedPoints = (p) => orientedPoints(p.id, p.rot, p.flip).map(([x, y]) => [x + p.x, y + p.y]);

/** Un tour complet de la pièce : quart de tour suivant (4 pas ramènent à l'orientation de départ). */
export const rotate = (rot) => (rot + 1) % 4;

// ---------- Atomes ----------

// Centre de gravité des 4 atomes d'un carreau : haut, droite, bas, gauche.
const ATOM_CENTERS = [[0.5, 1 / 6], [5 / 6, 0.5], [0.5, 5 / 6], [1 / 6, 0.5]];

export const atomKey = (x, y, q) => `${x},${y},${q}`;

function insidePolygon([px, py], pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Atomes couverts par un polygone aux sommets entiers et aux côtés droits ou diagonaux. */
export function polygonAtoms(pts) {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const atoms = [];
  for (let x = Math.min(...xs); x < Math.max(...xs); x++) {
    for (let y = Math.min(...ys); y < Math.max(...ys); y++) {
      ATOM_CENTERS.forEach(([cx, cy], q) => {
        if (insidePolygon([x + cx, y + cy], pts)) atoms.push(atomKey(x, y, q));
      });
    }
  }
  return atoms;
}

export const pieceAtoms = (p) => polygonAtoms(placedPoints(p));

/** Atomes d'une silhouette, à partir de sa solution de référence. */
export const solutionAtoms = (solution) => new Set(solution.flatMap(pieceAtoms));

/**
 * Vérifie un assemblage. Renvoie l'état du matériel, sans jugement :
 * complete (silhouette exactement remplie), overlap (pièces qui se chevauchent),
 * outside (atomes hors du contour), holes (atomes de la silhouette encore vides).
 */
export function checkAssembly(target, placements) {
  const seen = new Set();
  let overlap = 0;
  let outside = 0;
  for (const p of placements) {
    for (const a of pieceAtoms(p)) {
      if (seen.has(a)) overlap++;
      seen.add(a);
      if (!target.has(a)) outside++;
    }
  }
  let holes = 0;
  target.forEach((a) => { if (!seen.has(a)) holes++; });
  return { complete: overlap === 0 && outside === 0 && holes === 0, overlap, outside, holes };
}

/** Une pièce posée correspond-elle exactement (mêmes atomes) à une pièce de la référence ? */
const sameAtoms = (a, b) => {
  const x = pieceAtoms(a);
  const y = new Set(pieceAtoms(b));
  return x.length === y.size && x.every((k) => y.has(k));
};

/**
 * Aides après 3 vérifications infructueuses : contours de pièces de la référence,
 * en commençant par celles que l'enfant n'a pas encore posées au bon endroit.
 * count = nombre d'aides à montrer. On ne montre jamais une pièce déjà bien posée.
 */
export function hintsFor(solution, placements, count) {
  if (count <= 0) return [];
  const missing = solution.filter((ref) => !placements.some((p) => PIECES[p.id].shape === PIECES[ref.id].shape && sameAtoms(p, ref)));
  return missing.slice(0, count);
}

/** Pose une pièce sous le doigt (coordonnées en carreaux), calée sur la grille et dans le plateau. */
export function snapPlacement(piece, at, board) {
  const { w, h } = pieceSize(piece.id, piece.rot, piece.flip);
  const clamp = (v, max) => Math.min(Math.max(v, 0), max);
  return {
    ...piece,
    x: clamp(Math.round(at.x - w / 2), board.w - w),
    y: clamp(Math.round(at.y - h / 2), board.h - h),
  };
}

/** Aire (en carreaux) d'un ensemble d'atomes. */
export const atomsArea = (atoms) => (atoms.size ?? atoms.length) / 4;

/** Contour d'un ensemble d'atomes : segments qui ne sont partagés par aucun autre atome de l'ensemble. */
export function outlineSegments(atoms) {
  const corners = (x, y, q) => {
    const c = [x + 0.5, y + 0.5];
    return [[[x, y], [x + 1, y]], [[x + 1, y], [x + 1, y + 1]], [[x + 1, y + 1], [x, y + 1]], [[x, y + 1], [x, y]]][q]
      .concat([c]);
  };
  const count = new Map();
  const key = (a, b) => [a, b].map((p) => p.join(':')).sort().join('|');
  atoms.forEach((k) => {
    const [x, y, q] = k.split(',').map(Number);
    const [a, b, c] = corners(x, y, q);
    for (const [s, e] of [[a, b], [b, c], [c, a]]) {
      const id = key(s, e);
      const prev = count.get(id);
      count.set(id, prev ? { ...prev, n: prev.n + 1 } : { s, e, n: 1 });
    }
  });
  return [...count.values()].filter((v) => v.n === 1).map(({ s, e }) => [s, e]);
}
