// Thème « Îles suspendues », parcours 10-12 ans (univers fées, version plus mature).
// Perspective isométrique, aplats épurés, ciel de crépuscule ; chaque zone est une île qui flotte.
// Chaque zone : un sous-titre, 6 descriptions de stade et des autocollants.
// Un autocollant apparaît au stade « from » (et disparaît après « to » s'il est précisé).

import { F, glow, sparkle, isoBox, isoPoint, isoRoof, floatingIsland } from './common.js';

const toZone = (o) => ({ sub: o.sub, stages: o.stages.map((s) => s.what), stickers: o.stickers });

// Repère commun : coin avant du dessus de l'île. Le dessus est un losange de 66 × 66.
export const O = [100, 122];
const at = (u, v, z = 0) => isoPoint(O[0], O[1], u, v, z);
const STONE = ['#DCD6CA', '#B9B0A0', '#9D9485'];

const BG = `
  <rect width="200" height="170" fill="url(#sky-fees1012)"/>
  ${[[18, 18], [52, 30], [84, 10], [132, 22], [176, 14], [158, 40], [30, 52]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#F4EBD8" opacity=".8"/>`).join('')}
  <g opacity=".55">
    <path d="M18 58 L32 51 L46 58 L32 65Z" fill="#6F8E7A"/><path d="M18 58 L32 65 L30 76Z" fill="#2E4A63"/><path d="M32 65 L46 58 L33 77Z" fill="#253D52"/>
    <path d="M160 46 L172 40 L184 46 L172 52Z" fill="#6F8E7A"/><path d="M160 46 L172 52 L170 62Z" fill="#2E4A63"/><path d="M172 52 L184 46 L173 63Z" fill="#253D52"/>
  </g>
  <ellipse cx="40" cy="156" rx="46" ry="8" fill="#F4E3C3" opacity=".22"/>
  <ellipse cx="168" cy="150" rx="40" ry="7" fill="#F4E3C3" opacity=".18"/>
  ${floatingIsland(100, 132, 66, 66, 10)}`;

// Petit cube-énigme flottant, faces de trois couleurs.
const puzzleCube = (x, y, s = 9) => isoBox(x, y, s, s, s, ['#F2C46B', '#4F5FA8', '#2F8F8A']);
const lantern = ([x, y]) => `<rect x="${x - 1}" y="${y - 16}" width="2" height="16" fill="#3B3346"/>` + glow(x, y - 19, 6, '#FFD27A') + `<rect x="${x - 3}" y="${y - 23}" width="6" height="7" rx="1.5" fill="#FFD27A"/>`;

// ---------- Zone Logique ----------
const LOGIQUE = {
  sub: 'La tour aux énigmes',
  stages: [
    { name: 'une graine', what: 'Un éclat de cristal brille au centre de l’île' },
    { name: 'une pousse', what: 'Un dallage en damier se dessine' },
    { name: 'une jeune plante', what: 'Les fondations de la tour, et sa porte' },
    { name: 'un bouton', what: 'La tour s’élève, un cube-énigme flotte' },
    { name: 'une fleur', what: 'Les lanternes s’allument aux coins de l’île' },
    { name: 'un arbre', what: 'Toit, runes lumineuses et cascade : la tour est achevée' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(...at(33, 33, 8), 12, '#9FE8E0') + F(`<path d="M${at(33, 33, 18).join(' ')} l5 8 l-5 8 l-5 -8Z" fill="#9FE8E0"/><path d="M${at(33, 33, 18).join(' ')} l5 8 l-5 8Z" fill="#5FC9C0"/>`) + sparkle(...at(46, 30, 26), 0.7, '#F4EBD8') },
    {
      from: 1,
      svg: [0, 1, 2, 3].flatMap((i) => [0, 1, 2, 3].map((j) => {
        const [x, y] = at(13 + i * 10, 13 + j * 10);
        return isoBox(x, y, 10, 10, 1.5, (i + j) % 2 ? ['#D8D1C2', '#A99F8E', '#BDB4A4'] : ['#B7AE9E', '#968D7E', '#A69D8D']);
      })).join(''),
    },
    {
      from: 2,
      svg: F(isoBox(...at(22, 22), 22, 22, 24, STONE) + `<path d="M${at(22, 22)[0] + 7} ${at(22, 22)[1] - 4} v-9 a3.5 3.5 0 0 1 7 -3.5 v9Z" fill="#3B3346"/>`),
    },
    {
      from: 3,
      svg: F(isoBox(at(22, 22)[0], at(22, 22)[1] - 24, 22, 22, 22, ['#E6E0D4', '#C4BBAB', '#A8A090'])
        + `<rect x="${at(22, 22)[0] + 9}" y="${at(22, 22)[1] - 40}" width="4" height="7" fill="#FFD27A"/><rect x="${at(22, 22)[0] - 13}" y="${at(22, 22)[1] - 41}" width="4" height="7" fill="#FFD27A"/>`)
        + `<g class="float">${glow(152, 50, 10, '#F2C46B')}${F(puzzleCube(148, 56))}</g>`,
    },
    {
      from: 4,
      svg: F(lantern(at(6, 6)) + lantern(at(60, 6)) + lantern(at(6, 60)))
        + `<g class="float">${glow(48, 44, 8, '#2F8F8A')}${F(puzzleCube(45, 50, 7))}</g>`,
    },
    {
      from: 5,
      svg: F(isoRoof(at(22, 22)[0], at(22, 22)[1] - 46, 22, 22, ['#4B4C8A', '#3A3A70']))
        + glow(at(22, 22)[0], at(22, 22)[1] - 80, 6, '#9FE8E0')
        + `<path d="M166 89 Q170 110 164 140" stroke="#9FD3E8" stroke-width="5" fill="none" opacity=".85"/><path d="M166 89 Q169 110 163 140" stroke="#E9F7FB" stroke-width="1.5" fill="none"/>`
        + `<circle cx="164" cy="142" r="5" fill="#E9F7FB" opacity=".6"/>`
        + `<path d="M${at(40, 6, 4).join(' ')} l4 -2 l4 2 l-4 2Z M${at(46, 14, 4).join(' ')} l4 -2 l4 2 l-4 2Z" fill="#9FE8E0" opacity=".9"/>`
        + `<g transform="translate(${at(22, 22)[0] + 12} ${at(22, 22)[1] - 70})"><path d="M0 0 q6 -6 12 0 q-6 -3 -12 0Z" fill="#F4EBD8"/></g>`
        + sparkle(126, 26, 0.8, '#F4EBD8') + sparkle(70, 18, 0.6, '#9FE8E0'),
    },
  ],
};

// ---------- Outils de dessin des autres îles ----------
// Volumes à facettes : chaque face est ombrée selon son orientation (dessus clair, gauche moyen, droite sombre).
const rd = (n) => Math.round(n * 10) / 10;
const pth = (a) => a.map(([x, y]) => `${rd(x)} ${rd(y)}`).join(' L');
const poly = (a, fill, ex = '') => `<path d="M${pth(a)}Z" fill="${fill}"${ex}/>`;
const line = (a, c, w = 1, ex = '') => `<path d="M${pth(a)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${ex}/>`;
const quad = (u, v, w, d, z, fill, ex = '') => poly([at(u, v, z), at(u + w, v, z), at(u + w, v + d, z), at(u, v + d, z)], fill, ex);
const box = (u, v, w, d, h, c, z = 0) => isoBox(...at(u, v, z), w, d, h, c);
const disc = (uc, vc, r, z, fill, ex = '', n = 28, wob = null) => poly(Array.from({ length: n }, (_, i) => {
  const a = (2 * Math.PI * i) / n; const rr = wob ? wob(a) : r;
  return at(uc + rr * Math.cos(a), vc + rr * Math.sin(a), z);
}), fill, ex);
// Projection isométrique autour d'un point de l'écran (objets qui flottent dans le ciel).
const sky = (x, y) => (u, v, z) => [x + u - v, y - (u + v) / 2 - z];

const hexRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixW = (cols, ws) => {
  const s = ws.reduce((a, b) => a + b, 0) || 1; const c = [0, 0, 0];
  cols.forEach((col, i) => hexRgb(col).forEach((x, j) => { c[j] += (x * ws[i]) / s; }));
  return '#' + c.map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0')).join('').toUpperCase();
};
const mix = (a, b, t) => mixW([a, b], [1 - t, t]);
const tone = (c) => [mix(c, '#FFFFFF', 0.3), c, mix(c, '#000000', 0.28)];

const newell = (f) => {
  const n = [0, 0, 0];
  f.forEach((p, i) => {
    const q = f[(i + 1) % f.length];
    n[0] += (p[1] - q[1]) * (p[2] + q[2]); n[1] += (p[2] - q[2]) * (p[0] + q[0]); n[2] += (p[0] - q[0]) * (p[1] + q[1]);
  });
  return n;
};
/** Solide convexe : faces en coordonnées (u, v, z). Seules les faces tournées vers nous sont dessinées. */
const solid = ({ faces, center }, pal, proj = at) => faces.map((f, k) => {
  let n = newell(f);
  const c = f.reduce((a, p) => a.map((x, i) => x + p[i] / f.length), [0, 0, 0]);
  if ((c[0] - center[0]) * n[0] + (c[1] - center[1]) * n[1] + (c[2] - center[2]) * n[2] < 0) n = n.map((x) => -x);
  const l = Math.hypot(...n) || 1; const [nu, nv, nz] = n.map((x) => x / l);
  if (-nu - nv + nz <= 0.02) return '';
  const [top, left, right] = typeof pal === 'function' ? pal(k) : pal;
  return poly(f.map((p) => proj(...p)), mixW([top, left, right], [Math.max(0, nz) + 0.02, Math.max(0, -nu), Math.max(0, -nv)]));
}).join('');
/** Volume de révolution à facettes autour d'un axe vertical ; prof = [[rayon, hauteur], …]. */
const revolve = (uc, vc, z0, prof, n = 12, rot = 0) => {
  const rings = prof.map(([r, z]) => Array.from({ length: n }, (_, i) => {
    const a = rot + (2 * Math.PI * i) / n; return [uc + r * Math.cos(a), vc + r * Math.sin(a), z0 + z];
  }));
  const faces = [];
  for (let k = 0; k < rings.length - 1; k++) for (let i = 0; i < n; i++) { const j = (i + 1) % n; faces.push([rings[k][i], rings[k][j], rings[k + 1][j], rings[k + 1][i]]); }
  if (prof[prof.length - 1][0] > 0) faces.push(rings[rings.length - 1]);
  const zs = prof.map((p) => p[1]);
  return { faces, center: [uc, vc, z0 + (Math.min(...zs) + Math.max(...zs)) / 2] };
};
/** Même chose autour d'un axe horizontal (le long de u) ; prof = [[du, rayon], …]. */
const revolveU = (u0, vc, zc, prof, n = 12) => {
  const rings = prof.map(([du, r]) => Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n; return [u0 + du, vc + r * Math.cos(a), zc + r * Math.sin(a)];
  }));
  const faces = [];
  for (let k = 0; k < rings.length - 1; k++) for (let i = 0; i < n; i++) { const j = (i + 1) % n; faces.push([rings[k][i], rings[k][j], rings[k + 1][j], rings[k + 1][i]]); }
  if (prof[0][1] > 0) faces.push(rings[0]);
  if (prof[prof.length - 1][1] > 0) faces.push(rings[rings.length - 1]);
  const us = prof.map((p) => p[0]);
  return { faces, center: [u0 + (Math.min(...us) + Math.max(...us)) / 2, vc, zc] };
};
// Polyèdres réguliers (faces trouvées par longueur d'arête).
const PHI = (1 + Math.sqrt(5)) / 2;
const hull = (V, e) => {
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); const F = [];
  for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) for (let k = j + 1; k < V.length; k++) {
    if (Math.abs(d(V[i], V[j]) - e) < 1e-6 && Math.abs(d(V[j], V[k]) - e) < 1e-6 && Math.abs(d(V[i], V[k]) - e) < 1e-6) F.push([V[i], V[j], V[k]]);
  }
  return F;
};
const ICO = hull([[0, 1, PHI], [0, -1, PHI], [0, 1, -PHI], [0, -1, -PHI], [1, PHI, 0], [-1, PHI, 0], [1, -PHI, 0], [-1, -PHI, 0], [PHI, 0, 1], [-PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, -1]], 2);
const OCT = hull([[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], Math.SQRT2);
const TET = hull([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]], 2 * Math.SQRT2);
const turn = ([u, v, z], az, tilt) => {
  const u1 = u * Math.cos(az) - v * Math.sin(az); const v1 = u * Math.sin(az) + v * Math.cos(az);
  return [u1, v1 * Math.cos(tilt) - z * Math.sin(tilt), v1 * Math.sin(tilt) + z * Math.cos(tilt)];
};
/** Polyèdre flottant centré sur le point (x, y) de l'écran. */
const gem = (F, x, y, s, pal, az = 0.4, tilt = 0.35) => solid({ faces: F.map((f) => f.map((p) => turn(p, az, tilt).map((c) => c * s))), center: [0, 0, 0] }, pal, sky(x, y));
// Arche (porte, fenêtre) dans un plan : map(s, z) → écran ; c = milieu, hw = demi-largeur, hz = rayon vertical de l'arc.
const archPts = (map, c, hw, hz, zb, zs) => [map(c - hw, zb), map(c - hw, zs),
  ...Array.from({ length: 9 }, (_, i) => { const a = Math.PI - (Math.PI * i) / 8; return map(c + hw * Math.cos(a), zs + hz * Math.sin(a)); }),
  map(c + hw, zb)];
// Engrenage plat : liste de points 2D.
const gearPts = (teeth, ro, ri) => {
  const out = []; const st = (2 * Math.PI) / teeth;
  for (let i = 0; i < teeth; i++) [[ri, 0], [ro, 0.18], [ro, 0.48], [ri, 0.66]].forEach(([r, f]) => out.push([r * Math.cos(i * st + f * st), r * Math.sin(i * st + f * st)]));
  return out;
};
const ring2 = (r, n = 12) => Array.from({ length: n }, (_, i) => [r * Math.cos((2 * Math.PI * i) / n), r * Math.sin((2 * Math.PI * i) / n)]);
const gear = (map, teeth, ro, ri, [front, back, hub], mapBack) => poly(gearPts(teeth, ro, ri).map(mapBack), back)
  + poly(gearPts(teeth, ro, ri).map(map), front) + poly(ring2(ri * 0.4).map(map), hub);

const CRYS = ['#D2F7F1', '#6FD3C8', '#3A9D96'];
const AMET = ['#E6DCFA', '#9C86D6', '#6A57A8'];
const AMBER = ['#FFE9B5', '#F2B85A', '#C4862C'];
const MARBLE = ['#F4F0E8', '#CEC6DC', '#A29BBC'];
const WOOD = ['#C9A27A', '#9A7352', '#76563B'];
const SLATE = ['#6C6FB0', '#4B4C8A', '#3A3A70'];
const STONE2 = ['#E6E0D4', '#C4BBAB', '#A8A090'];
const WATER = '#7CC3DE';
const FOAM = '#E9F7FB';
const crystal = (u, v, r, h, tip, pal, z = 0, n = 6) => solid(revolve(u, v, z, [[r, 0], [r, h], [0, h + tip]], n, 0.3), pal);
const floatG = (inner) => `<g class="float">${inner}</g>`;

// ---------- Zone Numération ----------
const NUMERATION = {
  sub: 'Le jardin des cristaux',
  stages: [
    { name: 'une graine', what: 'Un premier cristal perce le sol de l’île' },
    { name: 'une pousse', what: 'Les cristaux poussent en grappes : un, deux, trois, quatre…' },
    { name: 'une jeune plante', what: 'Des piliers de cristal s’alignent, du plus petit au plus grand' },
    { name: 'un bouton', what: 'Des terrasses en gradins portent un grand cristal' },
    { name: 'une fleur', what: 'Une arche de cristal s’ouvre comme un portail' },
    { name: 'un arbre', what: 'Tout le jardin s’illumine, des éclats flottent dans le ciel' },
  ],
  stickers: [
    // Piliers rangés comme un diagramme en barres (fond de l'île).
    {
      from: 2,
      svg: glow(...at(50, 53, 34), 8, '#B9A6F0') + F([5, 4, 3, 2, 1, 0].map((i) => {
        const u = 8 + i * 8;
        return box(u, 50, 6, 6, 2, STONE) + crystal(u + 3, 53, 2.6, 5 + i * 5, 4, AMET, 2);
      }).join('')),
    },
    { from: 0, to: 2, svg: glow(...at(33, 33, 10), 13, '#9FE8E0') + F(crystal(33, 33, 4, 12, 7, CRYS)) + sparkle(...at(44, 30, 26), 0.7, '#F4EBD8') },
    {
      from: 3,
      svg: F(box(19, 19, 28, 28, 4, STONE) + box(24, 24, 18, 18, 4, STONE2, 4) + box(29, 29, 8, 8, 4, STONE, 8)
        + crystal(21.6, 44.4, 1.4, 4, 3, AMET, 4) + crystal(44.4, 21.6, 1.4, 4, 3, AMET, 4) + crystal(21.6, 21.6, 1.4, 5, 3, CRYS, 4))
        + glow(...at(33, 33, 24), 14, '#9FE8E0') + F(crystal(33, 33, 4.2, 16, 8, CRYS, 12)),
    },
    // Arche de cristal (côté gauche).
    {
      from: 4,
      svg: F(crystal(8, 43, 2.8, 24, 0.01, CRYS))
        + poly([at(8, 22, 0), at(8, 40, 0), at(8, 40, 23), at(8, 22, 23)], '#9FE8E0', ' opacity=".22"') + glow(...at(8, 31, 11), 8, '#BFF3EC')
        + F(crystal(8, 19, 2.8, 24, 0.01, CRYS) + box(4.5, 15.5, 7, 31, 4, STONE2, 24) + crystal(8, 31, 2.4, 3, 6, AMET, 28)),
    },
    // Grappes de cristaux : un, deux, trois, quatre.
    {
      from: 1,
      svg: F([[45, [[3, 7], [7.5, 7], [3, 3], [7.5, 3]]], [32, [[3, 6.5], [7.5, 6.5], [5.3, 3]]], [19, [[3.5, 6], [7.5, 3.5]]], [6, [[5.5, 5]]]].map(([u, cs]) => box(u, 4, 11, 10, 1.5, STONE)
        + cs.slice().sort((a, b) => b[0] + b[1] - a[0] - a[1]).map(([du, dv], i) => crystal(u + du, 4 + dv, 1.5, 4 + ((i + cs.length) % 3), 3, CRYS, 1.5)).join('')).join('')),
    },
    // Jardin illuminé : éclats flottants, faisceau, petites pousses de cristal.
    {
      from: 5,
      svg: glow(...at(33, 33, 38), 9, '#D2F7F1') + glow(...at(8, 31, 30), 6, '#B9A6F0')
        + F(crystal(58, 22, 1.2, 3, 2.5, AMET) + crystal(62, 31, 1.2, 4, 2.5, CRYS) + crystal(14, 14, 1.2, 3, 2.5, AMET) + crystal(3, 30, 1.1, 3, 2.5, CRYS))
        + glow(...at(58, 22, 3), 4, '#B9A6F0') + glow(...at(14, 14, 3), 4, '#B9A6F0')
        + floatG(glow(36, 40, 7, '#9FE8E0') + F(gem(OCT, 36, 40, 5, CRYS)))
        + floatG(glow(166, 50, 6, '#B9A6F0') + F(gem(OCT, 166, 50, 4.5, AMET, 0.9)))
        + floatG(glow(146, 22, 5, '#9FE8E0') + F(gem(OCT, 146, 22, 3.5, CRYS, 0.2)) + F(gem(OCT, 60, 22, 3, AMET, 1.1)))
        + sparkle(126, 40, 0.7, '#F4EBD8') + sparkle(76, 30, 0.6, '#BFF3EC') + sparkle(178, 76, 0.5, '#F4EBD8'),
    },
  ],
};

// ---------- Zone Calcul ----------
const LOCKS = [[28, 10], [15, 6], [2, 3]];
const spillU = (u0, z1, z2) => poly([at(u0, 52.5, z1), at(u0, 55.5, z1), at(u0 - 1, 55.5, z2), at(u0 - 1, 52.5, z2)], '#A8DCEE') + line([at(u0, 54, z1), at(u0 - 1, 54, z2)], FOAM, 0.6);
const fall = (a, b, len, drift = -1) => poly([a, b, [b[0] + drift, b[1] + len], [a[0] + drift - 1, a[1] + len + 2]], '#9FD3E8', ' opacity=".9"')
  + line([[(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], [(a[0] + b[0]) / 2 + drift, (a[1] + b[1]) / 2 + len]], FOAM, 1)
  + `<circle cx="${rd((a[0] + b[0]) / 2 + drift)}" cy="${rd((a[1] + b[1]) / 2 + len + 2)}" r="4.5" fill="${FOAM}" opacity=".55"/>`;
const wheel = (() => {
  const u = 48, vc = 19, zc = 5; const P = (uu, a, r) => at(uu, vc + r * Math.cos(a), zc + r * Math.sin(a));
  const angs = Array.from({ length: 10 }, (_, i) => (i * Math.PI) / 5 + 0.15);
  const rim = (uu) => Array.from({ length: 16 }, (_, i) => P(uu, (i * Math.PI) / 8, 7));
  return poly(rim(49.6), 'none', ' stroke="#5E4330" stroke-width="1.3"')
    + angs.map((a) => line([P(48.8, a, 0), P(48.8, a, 7)], '#7A5536', 0.8)).join('')
    + angs.filter((a) => zc + 8 * Math.sin(a) > -1).map((a) => poly([P(46.6, a, 5.8), P(50, a, 5.8), P(50, a, 8.6), P(46.6, a, 8.6)], '#B58A5E')).join('')
    + poly(rim(46.8), 'none', ' stroke="#C9A27A" stroke-width="1.3"')
    + line([at(46.5, vc, zc), at(53, vc, zc)], '#3B3346', 1.6) + poly(ring2(1.4, 8).map(([a, b]) => at(46.5, vc + a, zc + b)), '#3B3346')
    + poly([at(45, 13, 0.1), at(50, 13, 0.1), at(50, 25, 0.1), at(45, 25, 0.1)], FOAM, ' opacity=".45"');
})();
const CALCUL = {
  sub: 'Les cascades et les écluses',
  stages: [
    { name: 'une graine', what: 'Une source jaillit d’une vasque de pierre' },
    { name: 'une pousse', what: 'Un canal taillé dans l’île guide l’eau jusqu’au bord' },
    { name: 'une jeune plante', what: 'Des écluses en escalier font descendre l’eau marche après marche' },
    { name: 'un bouton', what: 'Le courant fait tourner la roue du moulin' },
    { name: 'une fleur', what: 'Un aqueduc à arches relie une petite île voisine' },
    { name: 'un arbre', what: 'Cascades, lanternes et embruns : l’eau chante partout' },
  ],
  stickers: [
    // Canal creusé (u 44-50, v 0-48).
    {
      from: 1,
      svg: quad(44, 0, 6, 48, 0, '#5A4636') + poly([at(50, 0, 0), at(50, 48, 0), at(48.5, 46.5, 0), at(48.5, 0, 0)], '#7A5E45')
        + poly([at(44, 48, 0), at(50, 48, 0), at(48.5, 46.5, 0), at(44, 46.5, 0)], '#6A513C')
        + quad(44, 0, 4.5, 46.5, 0, WATER) + line([at(45.5, 2, 0), at(45.5, 44, 0)], FOAM, 0.5, ' opacity=".7"')
        + poly([at(44, 0, 0), at(48.5, 0, 0), at(48.5, 0, -1.5), at(44, 0, -1.5)], WATER),
    },
    // La source.
    {
      from: 0,
      svg: F(box(41, 48, 12, 12, 14, STONE) + quad(42.5, 49.5, 9, 9, 14, WATER) + quad(42.5, 49.5, 9, 1.4, 14, '#5AA6C9') + quad(42.5, 49.5, 1.4, 9, 14, '#4F95BA'))
        + glow(...at(47, 54, 18), 8, '#BDEBFA') + line([at(47, 54, 14), at(47, 54, 21)], FOAM, 1.4)
        + `<circle cx="${at(47, 54, 22)[0]}" cy="${at(47, 54, 22)[1]}" r="1.4" fill="${FOAM}"/>` + sparkle(...at(52, 58, 26), 0.6, FOAM),
    },
    { from: 1, svg: poly([at(45.5, 48, 13.5), at(48.5, 48, 13.5), at(48.5, 47, 0), at(45.5, 47, 0)], '#A8DCEE') + line([at(47, 48, 13.5), at(47, 47, 0)], FOAM, 0.7) },
    // Les écluses.
    {
      from: 2,
      svg: F(LOCKS.map(([u, h], i) => box(u, 49, 12, 10, h, STONE2) + quad(u + 1.2, 50.2, 9.6, 7.6, h, WATER) + quad(u + 1.2, 56.4, 9.6, 1.4, h, '#5AA6C9')
        + spillU(i === 0 ? 41 : LOCKS[i - 1][0], (i === 0 ? 14 : LOCKS[i - 1][1]) - 0.5, h)).join('')),
    },
    // Moulin et roue.
    {
      from: 3,
      svg: F(box(53, 12, 12, 14, 14, ['#E9E1D2', '#C9B898', '#A8977A'])
        + poly([at(53, 12, 14), at(65, 12, 14), at(65, 19, 22), at(53, 19, 22)], '#4B4C8A') + poly([at(53, 12, 14), at(53, 26, 14), at(53, 19, 22)], '#D8CDB8')
        + poly([at(57, 12, 5), at(61, 12, 5), at(61, 12, 9.5), at(57, 12, 9.5)], '#FFD27A'))
        + glow(...at(59, 12, 7), 5, '#FFD27A') + F(wheel),
    },
    // Petite chute au bord du canal (avant l'aqueduc).
    { from: 1, to: 3, svg: fall(at(44.3, 0, -1.5), at(48.3, 0, -1.5), 30, 1) },
    // Aqueduc et île voisine.
    {
      from: 4,
      svg: F(box(44, -20, 6, 20, 10, STONE2, -10) + quad(45.2, -20, 3.6, 20, 0, WATER)
        + [-15, -5].map((vc) => poly(archPts((s, z) => at(44, s, z), vc, 3, 3, -10, -6), '#33405E')).join(''))
        + floatingIsland(176, 130, 16, 16, 6)
        + disc(48, -27, 3.6, 0, '#5A4636') + disc(47.4, -27.6, 3, 0, WATER) + quad(45.2, -24, 3.6, 4, 0, WATER),
    },
    // Cascades, lanternes, lumière.
    {
      from: 5,
      svg: fall(at(2, 52, 3), at(2, 56, 3), 44, -2) + quad(45.2, -36, 3.6, 6.5, 0, WATER) + fall(at(45.2, -36, 0), at(48.8, -36, 0), 28, 0)
        + F(box(18, 52, 6, 3, 1.4, WOOD, 6) + poly([at(21, 53.5, 7.4), at(21, 53.5, 13), at(24, 53.5, 7.6)], '#F4EBD8') + line([at(21, 53.5, 7.4), at(21, 53.5, 13.5)], '#5E4330', 0.6))
        + F(lantern(at(60, 5)) + lantern(at(36, 42)) + lantern(at(53, -32)))
        + glow(44, 140, 7, FOAM) + glow(184, 158, 6, FOAM)
        + glow(...at(47, 54, 16), 12, '#BDEBFA') + sparkle(44, 112, 0.6, FOAM) + sparkle(186, 150, 0.6, FOAM) + sparkle(120, 30, 0.7, '#F4EBD8'),
    },
  ],
};

// ---------- Zone Géométrie ----------
const COLS = (() => {
  const c = []; for (let i = 0; i < 5; i++) { const s = 32.5 + i * 6.25; c.push([32.5, s], [s, 32.5], [57.5, s], [s, 57.5]); }
  const seen = new Set(); return c.filter(([u, v]) => { const k = `${u},${v}`; if (seen.has(k)) return false; seen.add(k); return true; });
})();
const column = ([u, v]) => solid(revolve(u, v, 3, [[1.5, 0], [1.5, 15]], 8), MARBLE) + box(u - 2, v - 2, 4, 4, 1, MARBLE, 17);
const HEX = (() => {
  const R = 4.4; const out = [];
  for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) {
    const uc = 3 + i * 1.5 * R; const vc = 3 + j * Math.sqrt(3) * R + (i % 2 ? (Math.sqrt(3) * R) / 2 : 0);
    if (uc < 3 || vc < 3 || uc > 63 || vc > 63) continue;
    out.push(poly(Array.from({ length: 6 }, (_, k) => at(uc + 4 * Math.cos((k * Math.PI) / 3), vc + 4 * Math.sin((k * Math.PI) / 3), 0)), ['#E4DDEE', '#CFC6DE', '#BDB3D0'][(i + 2 * j) % 3]));
  }
  return out.join('');
})();
const hexagram = (w, c, ex = '') => {
  const T = (o) => [0, 1, 2].map((k) => { const a = o + (k * 2 * Math.PI) / 3; return at(21.5 + 12 * Math.cos(a), 21.5 + 12 * Math.sin(a), 0.1); });
  return poly(T(Math.PI / 4), 'none', ` stroke="${c}" stroke-width="${w}"${ex}`) + poly(T(Math.PI / 4 + Math.PI / 3), 'none', ` stroke="${c}" stroke-width="${w}"${ex}`)
    + disc(21.5, 21.5, 13.5, 0.1, 'none', ` stroke="${c}" stroke-width="${w}"${ex}`, 36);
};
const GEOMETRIE = {
  sub: 'Le temple des formes',
  stages: [
    { name: 'une graine', what: 'Un cube parfait est apparu sur l’île' },
    { name: 'une pousse', what: 'Cube, cylindre et pyramide trônent sur leurs socles' },
    { name: 'une jeune plante', what: 'Un pavillon à colonnes et fronton triangulaire se dresse' },
    { name: 'un bouton', what: 'La cour se pave d’hexagones parfaitement emboîtés' },
    { name: 'une fleur', what: 'Des solides de Platon flottent autour du temple' },
    { name: 'un arbre', what: 'Le temple porte sa coupole, un motif d’or s’allume au sol' },
  ],
  stickers: [
    { from: 3, svg: quad(1.5, 1.5, 63, 63, 0, '#8A83A3') + HEX },
    { from: 5, svg: `<g filter="url(#glow)" opacity=".9">${hexagram(2.4, '#FFD27A')}</g>` + hexagram(0.8, '#FFE7A8') },
    // Pavillon à colonnes.
    {
      from: 2,
      svg: F(box(27, 27, 36, 36, 1.5, STONE) + box(29, 29, 32, 32, 1.5, MARBLE, 1.5)
        + COLS.filter(([u, v]) => u === 57.5 || v === 57.5).sort((a, b) => b[0] + b[1] - a[0] - a[1]).map(column).join('')
        + box(37, 37, 16, 16, 15, ['#DCD3E8', '#B4AACB', '#9187AC'], 3)
        + poly(archPts((s, z) => at(s, 37, z), 45, 2.5, 2.5, 3, 10), '#5A4E78')
        + COLS.filter(([u, v]) => u !== 57.5 && v !== 57.5).sort((a, b) => b[0] + b[1] - a[0] - a[1]).map(column).join('')
        + box(29.5, 29.5, 31, 31, 3, MARBLE, 18)),
    },
    {
      from: 2,
      to: 4,
      svg: F(poly([at(29.5, 29.5, 21), at(60.5, 29.5, 21), at(60.5, 45, 30), at(29.5, 45, 30)], '#4B4C8A')
        + poly([at(29.5, 29.5, 21), at(29.5, 60.5, 21), at(29.5, 45, 30)], '#CEC6DC')
        + poly([at(29.5, 33, 22), at(29.5, 57, 22), at(29.5, 45, 28)], '#B4AACB'))
        + poly(ring2(1.4, 10).map(([a, b]) => at(29.5, 45 + a, 24.6 + b)), '#E9B85C'),
    },
    // Coupole.
    {
      from: 5,
      svg: glow(...at(45, 45, 40), 12, '#FFD27A')
        + F(solid(revolve(45, 45, 21, [[11, 0], [11, 4], [10.2, 7.5], [8.5, 10.5], [6, 13], [3, 14.4], [0, 15]], 12, 0.13), (k) => (k % 2 ? MARBLE : ['#FFF6E0', '#D9CFE3', '#AEA6C4']))
        + solid(revolve(45, 45, 36, [[1.4, 0], [1.4, 3], [0, 5.5]], 6), AMBER))
        + line([at(45 - 11 * Math.SQRT1_2, 45 - 11 * Math.SQRT1_2, 4 + 21), at(45 - 8.5 * Math.SQRT1_2, 45 - 8.5 * Math.SQRT1_2, 31.5), at(45 - 3 * Math.SQRT1_2, 45 - 3 * Math.SQRT1_2, 35.4)], '#E9B85C', 0.7)
        + poly([at(29.5, 29.5, 21), at(60.5, 29.5, 21), at(60.5, 29.5, 20.2), at(29.5, 29.5, 20.2)], '#FFD27A') + poly([at(29.5, 29.5, 21), at(29.5, 60.5, 21), at(29.5, 60.5, 20.2), at(29.5, 29.5, 20.2)], '#FFD27A'),
    },
    // Socles : cylindre, cube, pyramide.
    {
      from: 1,
      svg: F(box(4, 30, 9, 9, 5, STONE) + solid(revolve(8.5, 34.5, 5, [[3.2, 0], [3.2, 8]], 16), AMBER)
        + box(30, 4, 9, 9, 5, STONE) + solid(revolve(34.5, 8.5, 5, [[4.2, 0], [0, 9]], 4, Math.PI / 4), AMET)
        + box(17, 17, 9, 9, 5, STONE) + box(18.5, 18.5, 6, 6, 6, ['#A6DDEA', '#4F8FB0', '#35698A'], 5)),
    },
    { from: 0, to: 0, svg: glow(...at(26, 26, 12), 14, '#FFE7A8') + F(box(20, 20, 12, 12, 12, MARBLE)) + sparkle(...at(36, 24, 20), 0.7, '#F4EBD8') },
    // Solides de Platon en lévitation.
    {
      from: 4,
      svg: floatG(glow(42, 34, 9, '#9FD3E8') + F(gem(ICO, 42, 34, 5.2, ['#D6F1F7', '#6FA9D6', '#4A6FB0'])))
        + floatG(glow(160, 38, 8, '#FFD27A') + F(gem(OCT, 160, 38, 8, AMBER, 0.5, 0.25)))
        + floatG(glow(172, 74, 6, '#B9A6F0') + F(gem(TET, 172, 74, 3.6, AMET, 0.3, 0.5))),
    },
    { from: 5, svg: sparkle(124, 16, 0.8, '#FFE7A8') + sparkle(66, 18, 0.6, '#F4EBD8') + sparkle(30, 70, 0.5, '#FFE7A8') },
  ],
};

// ---------- Zone Attention ----------
const LAKE = (a) => 24.5 + 2.5 * Math.sin(3 * a) + 1.5 * Math.cos(2 * a + 1);
const lakeWater = (fill, ex = '') => disc(29.5, 28.5, 0, 0, fill, ex, 40, (a) => LAKE(a) - 2.2);
const LANTERNS = [[20, 22, 9], [30, 14, 12], [36, 26, 8], [22, 34, 13]];
const pavilion = () => {
  const posts = [[49.5, 45.5], [37.5, 45.5], [49.5, 33.5], [37.5, 33.5]];
  return posts.map(([u, v]) => box(u - 0.6, v - 0.6, 1.2, 1.2, 9, WOOD, -1)).join('')
    + box(37, 33, 14, 14, 1.5, WOOD, 7)
    + posts.slice(0, 3).map(([u, v]) => box(u - 0.6, v - 0.6, 1.2, 1.2, 9, ['#8A5F3E', '#6E4A30', '#5A3C27'], 8.5)).join('')
    + glow(...at(44, 40, 13), 6, '#FFD27A') + poly(archPts((s, z) => at(s, 40, z), 44, 1.6, 1.6, 10, 13), '#FFD27A')
    + box(36.9, 32.9, 1.2, 1.2, 9, ['#8A5F3E', '#6E4A30', '#5A3C27'], 8.5)
    + box(35.5, 31.5, 17, 17, 1.2, SLATE, 17.5) + isoRoof(...at(35.5, 31.5, 18.7), 17, 9, ['#4B4C8A', '#3A3A70'])
    + `<circle cx="${at(44, 40, 30)[0]}" cy="${at(44, 40, 30)[1]}" r="1.3" fill="#F2C46B"/>`;
};
const reeds = (u, v, k = 0) => {
  const [x, y] = at(u, v);
  return [[-2, 9, '#2F5A45'], [0, 12, '#3F7558'], [2, 8, '#2F5A45'], [3.5, 10, '#6A8F5A']].map(([dx, h, c], i) => poly([[x + dx - 0.7, y], [x + dx + 0.7, y], [x + dx + (i % 2 ? 1.5 : -1) * (k ? -1 : 1), y - h]], c)).join('')
    + `<rect x="${rd(x - 0.2)}" y="${rd(y - 12)}" width="1.6" height="3.6" rx=".8" fill="#6B4A32"/>`;
};
const stag = (x, y) => `<g transform="translate(${x} ${y})">
    ${[-6, -3.6, 3.8, 6].map((dx) => `<rect x="${dx - 0.6}" y="-8.5" width="1.2" height="8.5" fill="#4E3A2E"/>`).join('')}
    <path d="M-9 -11 L-7 -15 L6 -15.5 L9 -12 Z" fill="#B08A6C"/><path d="M-9 -11 L9 -12 L7 -8 L-7 -8 Z" fill="#7C5E49"/>
    <path d="M-9 -12 L-11 -10 L-9 -10 Z" fill="#E8DCC8"/>
    <path d="M5 -15 L8.5 -16 L11 -23 L8 -24 Z" fill="#A07C60"/>
    <path d="M8 -24 L12 -25 L16 -22 L14 -20.5 L10.5 -21 Z" fill="#B08A6C"/><path d="M10.5 -21 L14 -20.5 L16 -22 Z" fill="#7C5E49"/>
    <path d="M9 -24 L7 -26 L10.5 -25 Z" fill="#7C5E49"/>
    <path d="M10 -25 L8 -30 L5 -32 M8 -30 L9 -34 M8 -30 L6 -29 M11.5 -25 L13 -30 L16 -33 M13 -30 L12.5 -34 M13 -30 L16 -29" stroke="#E8DCC8" stroke-width=".9" fill="none" stroke-linecap="round"/>
  </g>`;
const ATTENTION = {
  sub: 'Le lac miroir',
  stages: [
    { name: 'une graine', what: 'Un petit bassin reflète la première étoile' },
    { name: 'une pousse', what: 'Le bassin devient un lac, lisse comme un miroir' },
    { name: 'une jeune plante', what: 'Des pierres de gué et des roseaux, pour qui sait regarder' },
    { name: 'un bouton', what: 'Un cerf s’approche sans bruit sur la rive' },
    { name: 'une fleur', what: 'Des lanternes flottent et se reflètent dans l’eau' },
    { name: 'un arbre', what: 'Un pavillon sur pilotis, et les lucioles dansent' },
  ],
  stickers: [
    {
      from: 0,
      to: 0,
      svg: disc(31, 30, 10.5, 0, '#4D6E4E') + disc(30, 29, 9, 0, '#4E86A8') + disc(31.5, 31.5, 5.5, 0, '#6FA6C2', ' opacity=".6"')
        + glow(...at(30, 30), 3, '#F4EBD8') + sparkle(...at(30, 30), 0.45, '#F4EBD8')
        + F([0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = (i * Math.PI) / 4 + 0.3; return [31 + 11.8 * Math.cos(a), 30 + 11.8 * Math.sin(a)]; })
          .sort((a, b) => b[0] + b[1] - a[0] - a[1]).map(([u, v]) => box(u - 1.2, v - 1.2, 2.4, 2.4, 1.2, STONE)).join('')),
    },
    {
      from: 1,
      svg: disc(31, 30, 0, 0, '#3F5C44', '', 40, LAKE) + lakeWater('#3E6E8E')
        + `<clipPath id="lac-fees1012">${lakeWater('#000')}</clipPath>`
        + `<g clip-path="url(#lac-fees1012)">${disc(40, 38, 14, 0, '#5B8FB0', ' opacity=".7"')}${disc(44, 42, 8, 0, '#86B7CF', ' opacity=".55"')}
          ${[[14, 0], [22, 5], [30, 11]].map(([o, k]) => line([at(8 + k, o + 4), at(48 + k, o + 4)], '#CFE6EE', 0.6, ' opacity=".55"')).join('')}
          ${[[24, 20], [36, 18], [18, 32], [40, 30], [30, 40]].map(([u, v]) => `<circle cx="${at(u, v)[0]}" cy="${at(u, v)[1]}" r=".7" fill="#F4EBD8" opacity=".8"/>`).join('')}</g>`,
    },
    // Reflet du pavillon (miroir vertical autour de la ligne d'eau).
    { from: 5, svg: `<g clip-path="url(#lac-fees1012)"><g opacity=".28" transform="matrix(1 0 0 -1 0 ${2 * at(44, 40)[1]})">${pavilion()}</g></g>` },
    // Reflets des lanternes.
    {
      from: 4,
      svg: `<g clip-path="url(#lac-fees1012)">${LANTERNS.map(([u, v, z]) => { const [x, y] = at(u, v, -z); return `<ellipse cx="${x}" cy="${y}" rx="1.6" ry="3.5" fill="#FFD27A" opacity=".55"/>` + glow(x, y, 4, '#FFD27A'); }).join('')}</g>`,
    },
    { from: 5, svg: F(pavilion()) },
    {
      from: 2,
      svg: F([[34, 32], [30.5, 30.5], [25.5, 29], [20.5, 27.5], [15.5, 26.5], [10.5, 25.5], [5.5, 25]].map(([u, v]) => solid(revolve(u, v, -0.6, [[2.3, 0], [2.3, 1.8]], 6, 0.2), STONE)).join(''))
        + reeds(52, 14) + reeds(46, 9, 1) + reeds(56, 20) + reeds(4, 35, 1) + reeds(6, 42) + reeds(15, 6, 1),
    },
    { from: 3, svg: F(stag(...at(6, 54))) },
    {
      from: 4,
      svg: LANTERNS.map(([u, v, z]) => floatG(glow(...at(u, v, z + 1.5), 6, '#FFD27A') + F(box(u - 1.2, v - 1.2, 2.4, 2.4, 3, AMBER, z) + poly([at(u - 1.2, v - 1.2, z + 3), at(u + 1.2, v - 1.2, z + 3), at(u, v, z + 4.6), at(u - 1.2, v + 1.2, z + 3)], '#C4862C')))).join(''),
    },
    {
      from: 5,
      svg: floatG([[60, 70], [76, 58], [132, 66], [148, 80], [118, 50], [40, 84], [160, 60], [90, 44]].map(([x, y]) => glow(x, y, 2.6, '#FFF3A6') + `<circle cx="${x}" cy="${y}" r=".9" fill="#FFF8CF"/>`).join(''))
        + sparkle(150, 24, 0.7, '#F4EBD8'),
    },
  ],
};

// ---------- Zone Mémoire ----------
const LIB = [38, 40];
const fp = (a1, a2, r, t, z) => {
  const A = (a1 * Math.PI) / 180, B = (a2 * Math.PI) / 180;
  return at(LIB[0] + r * ((1 - t) * Math.cos(A) + t * Math.cos(B)), LIB[1] + r * ((1 - t) * Math.sin(A) + t * Math.sin(B)), z);
};
const BOOKC = ['#B5523B', '#E9B85C', '#4F7FB0', '#5E8F5A', '#8E6BB8', '#C9744A'];
const shelfWin = (a1, a2) => {
  const m = (s, z) => fp(a1, a2, 15.05, s, z);
  return poly(archPts(m, 0.5, 0.28, 2.1, 6, 13), '#4A3426')
    + [7, 10.3].map((z, j) => Array.from({ length: 6 }, (_, k) => line([m(0.27 + k * 0.09, z), m(0.27 + k * 0.09, z + 2.3 - (k % 3) * 0.3)], BOOKC[(k + 3 * j) % 6], 1.1)).join('')
      + line([m(0.22, z), m(0.78, z)], '#8A5A3A', 0.7)).join('');
};
const books = (u, v, list) => list.map(([du, dv, w, d, c], i) => box(u + du, v + dv, w, d, 1.7, tone(c), i * 1.7)).join('');
const owl1012 = (x, y) => `<g transform="translate(${x} ${y})">
    <path d="M-4 0 L-4.5 -7 L-3 -10 L0 -9 L3 -10 L4.5 -7 L4 0 Z" fill="#7A6656"/><path d="M0 -9 L3 -10 L4.5 -7 L4 0 L0 0 Z" fill="#5E4E42"/>
    <path d="M-2.5 -1 L0 -6 L2.5 -1 Z" fill="#C9B79A"/>
    <circle cx="-1.6" cy="-7" r="1.4" fill="#FFD27A"/><circle cx="1.6" cy="-7" r="1.4" fill="#FFD27A"/>
    <circle cx="-1.6" cy="-7" r=".55" fill="#2A2233"/><circle cx="1.6" cy="-7" r=".55" fill="#2A2233"/>
    <path d="M-.6 -5.8 L0 -4.6 L.6 -5.8 Z" fill="#E0A33A"/>
  </g>`;
const MEMOIRE = {
  sub: 'La bibliothèque des souvenirs',
  stages: [
    { name: 'une graine', what: 'Une tablette de pierre garde un signe lumineux' },
    { name: 'une pousse', what: 'Des piles de livres s’accumulent sur l’herbe' },
    { name: 'une jeune plante', what: 'Une bibliothèque ronde ouvre sa porte' },
    { name: 'un bouton', what: 'Par les arches, on aperçoit les étagères ; une lanterne veille' },
    { name: 'une fleur', what: 'Des pages et des parchemins s’envolent en luisant' },
    { name: 'un arbre', what: 'Une tour, une chouette et des constellations à retenir' },
  ],
  stickers: [
    {
      from: 5,
      svg: [[[22, 24], [34, 15], [47, 21], [58, 12], [70, 19]], [[140, 14], [152, 25], [166, 18], [180, 27], [164, 34]]].map((s) => line(s, '#CFE0F5', 0.5, ' opacity=".6"')
        + s.map(([x, y]) => sparkle(x, y, 0.32, '#F4EBD8')).join('')).join('') + glow(58, 12, 3, '#CFE0F5') + glow(166, 18, 3, '#CFE0F5'),
    },
    {
      from: 2,
      svg: F(solid(revolve(38, 40, 0, [[17, 0], [17, 2]], 12), STONE) + solid(revolve(38, 40, 2, [[15, 0], [15, 18]], 12), ['#EFE4CE', '#CDB894', '#A48F6C'])
        + solid(revolve(38, 40, 20, [[16.2, 0], [16.2, 2]], 12), STONE2) + solid(revolve(38, 40, 22, [[16.2, 0], [0, 10]], 12), SLATE)
        + poly(archPts((s, z) => fp(210, 240, 15.05, s, z), 0.5, 0.22, 1.7, 2, 10), '#3B2A22')),
    },
    {
      from: 3,
      svg: shelfWin(180, 210) + shelfWin(240, 270)
        + [[150, 180], [270, 300]].map(([a, b]) => poly([fp(a, b, 15.05, 0.42, 8), fp(a, b, 15.05, 0.58, 8), fp(a, b, 15.05, 0.58, 15), fp(a, b, 15.05, 0.42, 15)], '#FFD27A')).join('')
        + poly(archPts((s, z) => fp(210, 240, 15.05, s, z), 0.5, 0.16, 1.3, 2, 9.5), '#FFC870') + glow(...fp(210, 240, 15, 0.5, 6), 6, '#FFD27A'),
    },
    {
      from: 5,
      svg: F(solid(revolve(38, 40, 27.6, [[6, 0], [6, 16]], 8), STONE2) + solid(revolve(38, 40, 43.6, [[7.5, 0], [7.5, 1.2]], 8), STONE) + solid(revolve(38, 40, 44.8, [[7.5, 0], [0, 11]], 8), SLATE)
        + poly([fp(180, 225, 6.02, 0.4, 33), fp(180, 225, 6.02, 0.6, 33), fp(180, 225, 6.02, 0.6, 39), fp(180, 225, 6.02, 0.4, 39)].map(([x, y]) => [x, y]), '#FFD27A'))
        + glow(...at(38, 40, 58), 5, '#FFD27A') + `<circle cx="${at(38, 40, 57)[0]}" cy="${at(38, 40, 57)[1]}" r="1.4" fill="#FFE7A8"/>`
        + F(owl1012(...fp(285, 315, 16.2, 0.5, 22))),
    },
    {
      from: 0,
      to: 1,
      svg: glow(...at(33, 30, 9), 10, '#9FE8E0') + F(box(28, 30, 10, 2.5, 14, STONE)
        + [[11, 7], [8.5, 5], [6, 6.5], [3.5, 4]].map(([z, L]) => line([at(29.5, 30, z), at(29.5 + L, 30, z)], '#9FE8E0', 0.9)).join('')),
    },
    {
      from: 1,
      svg: F(books(56, 14, [[0, 0, 7, 5, '#4F7FB0'], [0.6, 0.4, 6, 4.5, '#B5523B'], [0.2, 0.2, 6.5, 4.6, '#E9B85C']])
        + books(46, 5, [[0, 0, 8, 5.5, '#5E8F5A'], [0.8, 0.3, 7, 5, '#8E6BB8'], [0.2, 0.5, 7.5, 4.8, '#C9744A'], [1, 0.4, 6.4, 4.4, '#4F7FB0']])
        + books(6, 46, [[0, 0, 5.5, 8, '#B5523B'], [0.4, 0.6, 5, 7.2, '#E9B85C'], [0.2, 0.3, 5, 7.5, '#4F7FB0'], [0.6, 0.8, 4.4, 6.6, '#5E8F5A'], [0.3, 0.4, 4.8, 7, '#8E6BB8']])),
    },
    { from: 3, svg: F(lantern(at(16, 31))) },
    {
      from: 4,
      svg: [[40, 50, -12], [150, 52, 10], [62, 30, 8], [140, 24, -6], [168, 74, 14]].map(([x, y, r], i) => floatG(glow(x + 3, y + 2, 6, '#FFE7A8')
        + `<g transform="translate(${x} ${y}) rotate(${r})">${i % 2
          ? '<rect x="-1" y="0" width="10" height="5" fill="#F3E6C8"/><rect x="-2" y="-.6" width="2" height="6.2" rx="1" fill="#D9C49A"/><rect x="8" y="-.6" width="2" height="6.2" rx="1" fill="#D9C49A"/>'
          : '<path d="M0 0 L7 -2 L7 6 L0 8 Z" fill="#F6EFDF"/><path d="M0 0 L-6 -2 L-6 6 L0 8 Z" fill="#E4D8BE"/><path d="M-4.5 1 L-1.5 1.8 M-4.5 3 L-1.5 3.8 M1.5 1.6 L5.5 .6 M1.5 3.6 L5.5 2.6" stroke="#B9A57E" stroke-width=".5"/>'}</g>`)).join(''),
    },
    { from: 5, svg: sparkle(110, 14, 0.6, '#FFE7A8') + sparkle(26, 60, 0.5, '#F4EBD8') },
  ],
};

// ---------- Zone Espace ----------
const bz = (v) => { const t = (v - 66) / 20; return 6 * t - 2.6 * Math.sin(Math.PI * t); };
const rope = (u) => line(Array.from({ length: 11 }, (_, i) => { const v = 66 + i * 2; const t = i / 10; return at(u, v, bz(v) + 5.5 - 2.2 * Math.sin(Math.PI * t)); }), '#5E4330', 0.7);
const bridge = (() => {
  const posts = (u) => [66, 86].map((v) => line([at(u, v, bz(v) - 0.5), at(u, v, bz(v) + 5.8)], '#5E4330', 1.3)).join('');
  const hang = (u) => Array.from({ length: 9 }, (_, i) => { const v = 68 + i * 2; const t = (v - 66) / 20; return line([at(u, v, bz(v)), at(u, v, bz(v) + 5.5 - 2.2 * Math.sin(Math.PI * t))], '#7A5536', 0.35); }).join('');
  const planks = Array.from({ length: 12 }, (_, i) => 84.4 - i * 1.65).map((v, i) => poly([at(15.5, v, bz(v)), at(20.5, v, bz(v)), at(20.5, v + 1.3, bz(v + 1.3)), at(15.5, v + 1.3, bz(v + 1.3))], i % 2 ? '#B58A5E' : '#C9A27A')).join('');
  return rope(20.5) + hang(20.5) + posts(20.5) + planks + rope(15.5) + hang(15.5) + posts(15.5);
})();
const compass = () => {
  const c = [42, 22]; const P = (a, r) => at(c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), 0.1);
  const pt = (a, r, w, [l, d]) => poly([at(c[0], c[1], 0.1), P(a, r), P(a + Math.PI / 2, w)], l) + poly([at(c[0], c[1], 0.1), P(a, r), P(a - Math.PI / 2, w)], d);
  return disc(42, 22, 12.5, 0.1, '#3C4A6E', '', 36) + disc(42, 22, 11, 0.1, '#E9E1D0', '', 36) + disc(42, 22, 8.5, 0.1, 'none', ' stroke="#B9A57E" stroke-width=".5"', 36)
    + [1, 3, 5, 7].map((k) => pt((k * Math.PI) / 4, 6.5, 1.6, ['#7E8FC0', '#4B5C8A'])).join('')
    + [0, 2, 4, 6].map((k) => pt((k * Math.PI) / 4, 10.5, 2.1, k === 6 ? ['#F2D27A', '#C98A2E'] : ['#F4F0E8', '#B9B0A0'])).join('')
    + disc(42, 22, 1.4, 0.1, '#E9B85C', '', 12);
};
const balloon = (x, y) => {
  const P = ['#FFD9A0', '#E08E5A', '#B0583E']; const Q = ['#F4EEDF', '#C9C0D8', '#9C93B4'];
  return glow(x, y - 10, 12, '#FFD27A')
    + line([[x - 3, y + 2], [x - 2.6, y + 7]], '#3B3346', 0.5) + line([[x + 3, y + 2], [x + 2.6, y + 7]], '#3B3346', 0.5)
    + F(solid(revolve(0, 0, 0, [[0.5, 0], [3.2, 1.6], [6.6, 6], [8, 11], [7.6, 15], [5.6, 18.6], [0, 20.6]], 10, 0.2), (k) => ((k % 10) % 2 ? P : Q), sky(x, y))
      + isoBox(x, y + 9.5, 3, 3, 2.6, WOOD));
};
const ESPACE = {
  sub: 'Le pont des îles',
  stages: [
    { name: 'une graine', what: 'Un poteau indicateur montre toutes les directions' },
    { name: 'une pousse', what: 'Un sentier de dalles traverse l’île' },
    { name: 'une jeune plante', what: 'Une seconde île surgit des nuages' },
    { name: 'un bouton', what: 'Un pont suspendu relie les deux îles' },
    { name: 'une fleur', what: 'Une montgolfière survole l’archipel' },
    { name: 'un arbre', what: 'Rose des vents, table des cartes : l’archipel est à explorer' },
  ],
  stickers: [
    {
      from: 2,
      svg: floatingIsland(24, 73, 14, 14, 5)
        + F(solid(revolve(19, 95, 6, [[0.8, 0], [0.8, 2]], 6), WOOD) + solid(revolve(19, 95, 8, [[3, 0], [0, 11]], 7), ['#9CC98A', '#4E7D4A', '#3B5F3A'])
          + solid(revolve(14, 92, 6, [[1.6, 0], [1.6, 7], [0, 9]], 4, Math.PI / 4), STONE)),
    },
    { from: 5, svg: glow(...at(14, 92, 16), 5, '#9FE8E0') + glow(...at(15.5, 66, 7), 3.5, '#FFD27A') + glow(...at(15.5, 86, 13), 3.5, '#FFD27A') },
    { from: 3, svg: F(bridge) },
    { from: 5, svg: `<g filter="url(#glow)" opacity=".6">${disc(42, 22, 13, 0.1, 'none', ' stroke="#FFD27A" stroke-width="2"', 36)}</g>` + compass() },
    {
      from: 1,
      svg: F([[6, 5], [9, 11], [12, 17], [14, 23], [15, 29], [16, 35], [16.5, 41], [17, 47], [17.5, 53], [18, 59], [18, 64]].reverse()
        .map(([u, v], i) => box(u - 2, v - 2, 4, 4, 0.8, i % 2 ? STONE : STONE2)).join('')),
    },
    {
      from: 5,
      svg: F([[49, 49], [41, 49], [49, 43], [41, 43]].map(([u, v]) => box(u, v, 1, 1, 7, WOOD)).join('') + box(40, 42, 11, 9, 1.2, WOOD, 7)
        + quad(41, 43, 9, 7, 8.25, '#EADBB5') + quad(42, 44, 3, 2.5, 8.3, '#9FC6B0') + quad(46, 46.5, 3, 2.5, 8.3, '#9FC6B0')
        + line([at(42.5, 44.5, 8.3), at(45, 47, 8.3), at(48, 46, 8.3), at(49, 48.5, 8.3)], '#B5523B', 0.6, ' stroke-dasharray="1 .8"')
        + solid(revolve(44, 46, 8.2, [[0.9, 0], [0.9, 1.8], [0, 1.8]], 6), AMBER))
        + glow(...at(44, 46, 10), 4, '#FFD27A'),
    },
    {
      from: 0,
      svg: F(poly([at(22.6, 29.6, 19.5), at(31, 29.6, 19.5), at(33, 29.6, 17.8), at(31, 29.6, 16), at(22.6, 29.6, 16)], '#9A7352')
        + poly([at(21.6, 31, 15.5), at(21.6, 38, 15.5), at(21.6, 40, 13.8), at(21.6, 38, 12), at(21.6, 31, 12)], '#C9A27A')
        + box(21, 29, 1.6, 1.6, 22, WOOD)
        + poly([at(21.6, 29.8, 11), at(14, 29.8, 11), at(12, 29.8, 9.3), at(14, 29.8, 7.6), at(21.6, 29.8, 7.6)], '#B58A5E')
        + solid(revolve(21.8, 29.8, 22, [[1.4, 0], [0, 3]], 4, Math.PI / 4), AMBER))
        + glow(...at(21.8, 29.8, 24), 5, '#FFD27A'),
    },
    { from: 5, svg: F(lantern(at(10, 14)) + lantern(at(23, 57)) + lantern(at(60, 30))) },
    { from: 4, svg: floatG(balloon(156, 42)) + floatG(`<path d="M124 30 l4 -1.6 l4 1.6 M134 24 l3 -1.2 l3 1.2" stroke="#2A3550" stroke-width=".8" fill="none"/>`) },
    { from: 5, svg: sparkle(70, 22, 0.7, '#F4EBD8') + sparkle(186, 70, 0.5, '#FFE7A8') + sparkle(10, 40, 0.5, '#F4EBD8') },
  ],
};

// ---------- Zone Problèmes ----------
const COPPER = ['#E8A66E', '#8F5A36', '#5A3A28'];
const METAL = '#C9A24E';
const workshop = () => {
  let s = box(30, 34, 30, 26, 14, ['#E8DFD0', '#C2B49A', '#9E8F76']);
  s += [[40, 44], [50, 54]].map(([a, b]) => poly([at(30, a, 6), at(30, b, 6), at(30, b, 10), at(30, a, 10)], '#FFD27A')).join('');
  s += poly([at(33, 34, 0), at(41, 34, 0), at(41, 34, 9), at(33, 34, 9)], '#4A3B35') + poly([at(34, 34, 0), at(40, 34, 0), at(40, 34, 7.5), at(34, 34, 7.5)], '#FFC870', ' opacity=".55"');
  for (let i = 2; i >= 0; i--) {
    const a = 30 + 10 * i;
    s += poly([at(a, 34, 14), at(a, 60, 14), at(a, 60, 19), at(a, 34, 19)], '#F2C46B') + [41, 47.5, 54].map((v) => line([at(a, v, 14), at(a, v, 19)], '#9A7032', 0.5)).join('')
      + poly([at(a, 34, 19), at(a, 60, 19), at(a + 10, 60, 14), at(a + 10, 34, 14)], '#5A5C9A') + line([at(a, 34, 19), at(a, 60, 19)], '#7E80BE', 0.6)
      + poly([at(a, 34, 14), at(a, 34, 19), at(a + 10, 34, 14)], '#B3A488');
  }
  return s;
};
const crane = () => {
  const mast = [[5, 49], [5, 52], [8, 49]].map(([u, v]) => line([at(u, v, 2), at(u, v, 40)], METAL, 0.9)).join('')
    + line(Array.from({ length: 10 }, (_, i) => at(5, i % 2 ? 52 : 49, 2 + i * 4.2)), METAL, 0.5)
    + line(Array.from({ length: 10 }, (_, i) => at(i % 2 ? 8 : 5, 49, 2 + i * 4.2)), METAL, 0.5);
  const jib = line([at(5, 50.5, 40), at(44, 50.5, 40)], METAL, 0.9) + line([at(8, 50.5, 36.5), at(44, 50.5, 39)], METAL, 0.8)
    + line(Array.from({ length: 10 }, (_, i) => { const u = 8 + i * 4; return at(u, 50.5, i % 2 ? 36.5 + ((u - 8) / 36) * 2.5 : 40); }), METAL, 0.45)
    + line([at(5, 50.5, 40), at(-3, 50.5, 39)], METAL, 0.9) + line([at(6.5, 50.5, 46), at(42, 50.5, 40)], METAL, 0.4) + line([at(6.5, 50.5, 46), at(-3, 50.5, 39)], METAL, 0.4)
    + line([at(6.5, 50.5, 40), at(6.5, 50.5, 46)], METAL, 0.8) + box(-3.5, 49.5, 3, 2, 2.5, ['#8D8A99', '#6A6778', '#55525F'], 36.5);
  return box(3.5, 47.5, 6, 6, 2, STONE) + mast + jib + line([at(42, 50.5, 38.5), at(42, 50.5, 25.5)], '#3B3346', 0.5) + box(40.5, 49, 3, 3, 3, WOOD, 22.5);
};
const shipBody = (u0, vc, zc, prof) => solid(revolveU(u0, vc, zc, prof, 12), ['#F2EAD6', '#C9B48E', '#9C8662']);
const SHIP = [[0, 0.01], [2, 4.5], [6, 7.4], [12, 8.4], [20, 8.2], [27, 6.4], [33, 3.4], [36, 0.01]];
const airship = () => {
  const vc = 16, zc = 54, u0 = 30;
  return glow(...at(48, 16, 54), 18, '#FFD27A')
    + line([at(47, 16, 40.4), at(50, 16, 18.5)], '#E8DCC8', 0.5)
    + poly([at(31, vc + 1, zc), at(37, vc + 3, zc), at(30, vc + 13, zc)], '#7A6F99')
    + F(shipBody(u0, vc, zc, SHIP)
      + [12, 24].map((du) => line(Array.from({ length: 7 }, (_, i) => { const a = Math.PI / 2 + (i * Math.PI) / 6; const r = du === 12 ? 8.45 : 7.6; return at(u0 + du, vc + r * Math.cos(a), zc + r * Math.sin(a)); }), '#C99A3B', 0.7)).join('')
      + poly([at(31, vc, zc + 3), at(37.5, vc, zc + 6), at(31, vc, zc + 12)], '#5A5C9A') + poly([at(31, vc - 1, zc), at(37, vc - 3, zc), at(30, vc - 13, zc)], '#4B4C8A')
      + line([at(43, 14, zc - 8.2), at(43, 14, 44.4)], '#5E4330', 0.6) + line([at(51, 14, zc - 8.2), at(51, 14, 44.4)], '#5E4330', 0.6)
      + box(42, 13, 10, 6, 4, WOOD, 40.4) + [44, 47, 50].map((u) => poly([at(u, 13, 41.6), at(u + 1.6, 13, 41.6), at(u + 1.6, 13, 43.4), at(u, 13, 43.4)], '#FFD27A')).join('')
      + line([at(29, vc, zc + 5), at(29, vc, zc - 5)], '#3B3346', 1.1) + line([at(29, vc - 4, zc), at(29, vc + 4, zc)], '#3B3346', 1.1))
    + `<circle cx="${at(66, 16, 54)[0]}" cy="${at(66, 16, 54)[1]}" r="1.2" fill="#9FE8E0"/>` + glow(...at(66, 16, 54), 3, '#9FE8E0');
};
const PROBLEMES = {
  sub: 'L’atelier de l’inventeur',
  stages: [
    { name: 'une graine', what: 'Une caisse à outils, et une idée qui tourne déjà' },
    { name: 'une pousse', what: 'Un établi avec ses plans et son étau' },
    { name: 'une jeune plante', what: 'L’atelier au toit en dents de scie s’allume' },
    { name: 'un bouton', what: 'Engrenages et grue : le chantier démarre' },
    { name: 'une fleur', what: 'Un dirigeable prend forme dans son échafaudage' },
    { name: 'un arbre', what: 'Le dirigeable est fini : il flotte, amarré, prêt à partir' },
  ],
  stickers: [
    { from: 2, svg: F(workshop()) + glow(...at(40, 47, 18), 9, '#FFD27A') },
    {
      from: 3,
      svg: F(gear(([a, b]) => at(52 + a, 33.6, 7 + b), 10, 5.5, 4.4, COPPER, ([a, b]) => at(52.8 + a, 34, 7.6 + b))
        + gear(([a, b]) => at(45.2 + a, 33.6, 11.2 + b), 8, 3.4, 2.6, ['#F2C46B', '#9A7032', '#5A3A28'], ([a, b]) => at(45.8 + a, 34, 11.6 + b))),
    },
    { from: 3, svg: F(crane()) },
    {
      from: 1,
      svg: F([[21, 35], [7, 35], [21, 29], [7, 29]].map(([u, v]) => box(u, v, 1, 1, 7, WOOD)).join('') + box(6, 28, 16, 8, 1.5, WOOD, 7)
        + box(8, 30, 3, 3, 2.5, ['#B9C3CF', '#7D8B9B', '#5E6B7A'], 8.5)
        + quad(13, 29.5, 7, 5.5, 8.55, '#4F7FB0') + line([at(14, 31, 8.6), at(19, 31, 8.6)], '#D6E6F5', 0.4) + disc(16.5, 32.5, 1.6, 8.6, 'none', ' stroke="#D6E6F5" stroke-width=".4"', 12)
        + poly(gearPts(7, 1.8, 1.3).map(([a, b]) => at(9.5 + a, 33.5 + b, 8.6)), '#E9B85C')),
    },
    {
      from: 4,
      to: 4,
      svg: F([[62, 24], [62, 8], [38, 24]].map(([u, v]) => line([at(u, v, 0), at(u, v, 22)], '#B38A5E', 1)).join('')
        + line([at(38, 24, 22), at(62, 24, 22), at(62, 8, 22)], '#B38A5E', 0.8)
        + shipBody(50, 16, 13, [[0, 7.5], [5, 6.3], [9, 4], [12, 0.01]])
        + [[48, 7.5], [44, 7.3], [40, 6]].map(([u, r]) => line(Array.from({ length: 17 }, (_, i) => { const a = (i * Math.PI) / 8; return at(u, 16 + r * Math.cos(a), 13 + r * Math.sin(a)); }), '#7A5536', 0.8)).join('')
        + line([at(38, 16, 6.5), at(50, 16, 5.5)], '#7A5536', 0.9) + line([at(38, 16, 19), at(50, 16, 20.5)], '#7A5536', 0.9)
        + line([at(38, 8, 0), at(38, 8, 22), at(62, 8, 22)], '#B38A5E', 1) + line([at(38, 8, 11), at(62, 8, 11)], '#B38A5E', 0.6))
        + sparkle(...at(40, 10, 16), 0.5, '#FFE7A8'),
    },
    {
      from: 5,
      svg: F(box(48.5, 14.5, 2, 2, 18, ['#B9C3CF', '#7D8B9B', '#5E6B7A']) + box(47, 13, 5, 5, 1, STONE) + quad(48, 14, 3, 3, 18, '#FFD27A'))
        + glow(...at(49.5, 15.5, 19), 4, '#FFD27A') + F(lantern(at(26, 28))),
    },
    {
      from: 0,
      svg: F(box(24, 8, 9, 5, 5, ['#5FB3AE', '#2F7F7C', '#22625F']) + box(24.4, 8.4, 8.2, 4.2, 0.8, ['#7CC9C3', '#3F8F8B', '#2C6E6A'], 5)
        + line([at(26, 10.5, 5.8), at(26, 10.5, 8), at(31, 10.5, 8), at(31, 10.5, 5.8)], '#3B3346', 0.9)
        + poly([at(28, 8, 3), at(29.4, 8, 3), at(29.4, 8, 4.2), at(28, 8, 4.2)], '#E9B85C')
        + line([at(35, 8, 0), at(36.2, 9, 8)], '#9A7352', 1) + box(35.2, 8.2, 2.4, 1.6, 1.4, ['#B9C3CF', '#7D8B9B', '#5E6B7A'], 7.4)),
    },
    {
      from: 0,
      to: 0,
      svg: floatG(glow(...at(28, 10, 20), 7, '#FFD27A') + poly(gearPts(8, 3.6, 2.7).map(([a, b]) => [at(28, 10, 20)[0] + a, at(28, 10, 20)[1] + b]), '#F2C46B')
        + `<circle cx="${at(28, 10, 20)[0]}" cy="${at(28, 10, 20)[1]}" r="1.1" fill="#5A3A28"/>`),
    },
    { from: 5, svg: floatG(airship()) + sparkle(160, 24, 0.7, '#F4EBD8') + sparkle(80, 22, 0.5, '#FFE7A8') },
  ],
};

// ZONES-SUIVANTES

export default {
  id: 'fees',
  age: '10-12',
  label: 'Îles suspendues',
  gardenName: 'Mon jardin',
  bg: BG,
  zones: {
    numeration: toZone(NUMERATION),
    calcul: toZone(CALCUL),
    logique: toZone(LOGIQUE),
    geometrie: toZone(GEOMETRIE),
    attention: toZone(ATTENTION),
    memoire: toZone(MEMOIRE),
    espace: toZone(ESPACE),
    problemes: toZone(PROBLEMES),
    // ZONES-EXPORT
  },
};
