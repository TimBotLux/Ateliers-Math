// Thème « Hub du futur », parcours 10-12 ans (univers gare, version plus mature).
// Perspective isométrique, ville la nuit, train à sustentation magnétique (maglev).
// Chaque zone : un sous-titre, 6 descriptions de stade et des autocollants.
// Un autocollant apparaît au stade « from » (et disparaît après « to » s'il est précisé).

import { F, glow, sparkle, isoBox, isoPoint } from './common.js';

const toZone = (o) => ({ sub: o.sub, stages: o.stages.map((s) => s.what), stickers: o.stickers });

// Repère commun : coin avant du dessus de la dalle. Le dessus est un losange de 66 × 66.
export const O = [100, 124];
const at = (u, v, z = 0) => isoPoint(O[0], O[1], u, v, z);
const CONCRETE = ['#E3E7EB', '#9AA6B1', '#B7C1CA'];
const CYAN = '#6FE3F0';

const tower = (x, base, w, h, lit) => `
  <path d="M${x} ${base} V${base - h} L${x + w / 2} ${base - h - 6} L${x + w} ${base - h} V${base}Z" fill="#1B2D44"/>
  ${lit.map(([dx, dy, c]) => `<rect x="${x + dx}" y="${base - h + dy}" width="2.5" height="1.6" fill="${c}"/>`).join('')}`;

const BG = `
  <rect width="200" height="170" fill="url(#sky-gare1012)"/>
  ${[[24, 16], [66, 8], [118, 18], [170, 10], [146, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".8" fill="#DDE8F5" opacity=".7"/>`).join('')}
  ${tower(4, 112, 18, 54, [[4, 10, '#FFD27A'], [10, 22, CYAN], [6, 34, '#FFD27A']])}
  ${tower(26, 112, 14, 36, [[4, 8, CYAN], [8, 18, '#FFD27A']])}
  ${tower(148, 112, 16, 60, [[4, 12, '#FFD27A'], [9, 26, CYAN], [5, 40, '#FFD27A']])}
  ${tower(170, 112, 22, 44, [[6, 10, CYAN], [12, 20, '#FFD27A'], [6, 30, CYAN]])}
  <path d="M100 160 L196 112 L100 64 L4 112Z" fill="#182B42"/>
  <path d="M28 124 L124 76 M52 136 L148 88 M76 148 L172 100 M28 100 L124 148 M52 88 L148 136 M76 76 L172 124" stroke="#2C4A6B" stroke-width=".8"/>
  ${isoBox(100, 132, 66, 66, 8, ['#C5CED6', '#7F8B97', '#9AA6B1'])}`;

// Rame maglev vue en isométrique, orientée le long de l'axe u (coin avant arrière en (x, y)).
const pod = ([x, y], len = 24, nose = true) => {
  const body = isoBox(x, y, len, 8, 8, ['#F4F7FA', '#C9D3DC', '#E1E7EC']);
  const stripe = `<path d="M${x} ${y - 3} L${x + len} ${y - 3 - len / 2} L${x + len} ${y - 5 - len / 2} L${x} ${y - 5}Z" fill="#2E6BD1"/>`;
  const win = `<path d="M${x + 3} ${y - 6.5} L${x + len - 3} ${y - 6.5 - (len - 6) / 2} L${x + len - 3} ${y - 8 - (len - 6) / 2} L${x + 3} ${y - 8}Z" fill="#253A52"/>`;
  // Nez profilé : un biseau dans le prolongement de la face droite.
  const tip = nose ? `<path d="M${x + len} ${y - len / 2} L${x + len + 7} ${y - len / 2 - 3.5} L${x + len + 3} ${y - len / 2 - 9.5} L${x + len} ${y - len / 2 - 8}Z" fill="#C9D3DC"/>` : '';
  return body + stripe + win + tip;
};

// ---------- Zone Logique ----------
const LOGIQUE = {
  sub: 'L’aiguillage magnétique',
  stages: [
    { name: 'une graine', what: 'Un drone de relevé scanne la dalle' },
    { name: 'une pousse', what: 'Une première poutre de guidage, éclairée par une ligne cyan' },
    { name: 'une jeune plante', what: 'La voie se dédouble : l’aiguillage magnétique est posé' },
    { name: 'un bouton', what: 'Le pylône de contrôle affiche son écran holographique' },
    { name: 'une fleur', what: 'Une capsule maglev glisse sur la poutre' },
    { name: 'un arbre', what: 'La rame complète file, le signal passe au vert' },
  ],
  stickers: [
    {
      from: 0, to: 0,
      svg: `<path d="M${at(33, 33).join(' ')} L${at(33, 33)[0] - 14} ${at(33, 33)[1] - 30} L${at(33, 33)[0] + 14} ${at(33, 33)[1] - 30}Z" fill="${CYAN}" opacity=".18"/>`
        + `<g class="float">${glow(at(33, 33)[0], at(33, 33)[1] - 34, 8, CYAN)}${F(`<g transform="translate(${at(33, 33)[0]} ${at(33, 33)[1] - 34})"><rect x="-7" y="-2" width="14" height="4" rx="2" fill="#2B3A4E"/><path d="M-11 -4 h6 M5 -4 h6" stroke="#C9D3DC" stroke-width="1.6"/><circle cx="0" cy="2" r="1.6" fill="${CYAN}"/></g>`)}</g>`,
    },
    {
      from: 1,
      svg: F(isoBox(...at(0, 29), 66, 8, 4, CONCRETE) + `<path d="M${at(0, 33, 4).join(' ')} L${at(66, 33, 4).join(' ')}" stroke="${CYAN}" stroke-width="1.4"/>`),
    },
    {
      from: 2,
      svg: F(isoBox(...at(29, 37), 8, 29, 4, CONCRETE) + `<path d="M${at(33, 37, 4).join(' ')} L${at(33, 66, 4).join(' ')}" stroke="${CYAN}" stroke-width="1.4"/>`)
        + glow(...at(33, 33, 4), 6, CYAN) + `<circle cx="${at(33, 33, 4)[0]}" cy="${at(33, 33, 4)[1]}" r="2.6" fill="${CYAN}"/>`,
    },
    {
      from: 3,
      svg: F(isoBox(...at(52, 52), 5, 5, 42, ['#3A4A5E', '#22303F', '#2B3A4E']) + `<circle cx="${at(52, 52)[0] + 0.5}" cy="${at(52, 52)[1] - 32}" r="2.4" fill="#FF5A5A"/>`)
        + glow(at(52, 52)[0] + 0.5, at(52, 52)[1] - 32, 4, '#FF5A5A')
        + `<path d="M${at(52, 52)[0] + 6} ${at(52, 52)[1] - 50} l22 -11 v16 l-22 11Z" fill="${CYAN}" opacity=".28" stroke="${CYAN}" stroke-width=".8"/>`
        + `<path d="M${at(52, 52)[0] + 10} ${at(52, 52)[1] - 46} l14 -7 M${at(52, 52)[0] + 10} ${at(52, 52)[1] - 41} l10 -5 M${at(52, 52)[0] + 10} ${at(52, 52)[1] - 36} l14 -7" stroke="#E9FBFD" stroke-width="1"/>`,
    },
    { from: 4, svg: F(pod(at(14, 29, 4), 24)) + glow(...at(26, 33, 2), 8, CYAN) },
    {
      from: 5,
      svg: F(pod(at(-14, 29, 4), 26, false)) + `<circle cx="${at(52, 52)[0] + 0.5}" cy="${at(52, 52)[1] - 32}" r="2.6" fill="#2B3A4E"/>`
        + glow(at(52, 52)[0] + 0.5, at(52, 52)[1] - 26, 4, '#4CE08A') + `<circle cx="${at(52, 52)[0] + 0.5}" cy="${at(52, 52)[1] - 26}" r="2.4" fill="#4CE08A"/>`
        + `<g class="float">${glow(40, 40, 6, CYAN)}${F(`<g transform="translate(40 40)"><rect x="-6" y="-2" width="12" height="4" rx="2" fill="#2B3A4E"/><path d="M-9 -4 h5 M4 -4 h5" stroke="#C9D3DC" stroke-width="1.4"/></g>`)}</g>`
        + sparkle(160, 24, 0.7, CYAN),
    },
  ],
};

// ---------- Outils des autres zones (coordonnées u, v, z sur la dalle) ----------
const WARM = '#FFD27A';
const STEEL = ['#3A4A5E', '#22303F', '#2B3A4E'];
const PAD = ['#2F3D4F', '#1A2533', '#243142'];
const r1 = (n) => Math.round(n * 10) / 10;
const XY = (u, v, z = 0) => at(u, v, z).map(r1);
const P = (u, v, z = 0) => XY(u, v, z).join(' ');
const att = (extra) => (extra ? ` ${extra}` : '');
const poly = (pts, fill, extra = '') => `<path d="M${pts.map((p) => P(...p)).join(' L')}Z" fill="${fill}"${att(extra)}/>`;
const seg = (pts, stroke, w = 1, extra = '') => `<path d="M${pts.map((p) => P(...p)).join(' L')}" stroke="${stroke}" stroke-width="${w}" fill="none"${att(extra)}/>`;
const box = (u, v, z, w, d, h, c) => isoBox(...at(u, v, z), w, d, h, c);
const lerp3 = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
const dot = ([x, y], r, c, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"${att(extra)}/>`;
const glowAt = (u, v, z, r, c) => glow(...XY(u, v, z), r, c);
// Cercle horizontal vu en isométrique (ellipse 2:1).
const isoEll = (u, v, z, r, attrs) => {
  const [x, y] = XY(u, v, z);
  return `<ellipse cx="${x}" cy="${y}" rx="${r1(r * 1.414)}" ry="${r1(r * 0.707)}" ${attrs}/>`;
};
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const mix = (a, b, t) => `#${hex(a).map((x, i) => Math.round(x + (hex(b)[i] - x) * t).toString(16).padStart(2, '0')).join('')}`;

// Maillage à facettes (low-poly) : faces cachées supprimées, ombrage trois tons selon l'orientation.
const mesh = (tris, dark, light) => tris
  .map((t) => {
    const a = [t[1][0] - t[0][0], t[1][1] - t[0][1], t[1][2] - t[0][2]];
    const b = [t[2][0] - t[0][0], t[2][1] - t[0][1], t[2][2] - t[0][2]];
    let n = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    if (n[2] < 0) n = n.map((x) => -x);
    const L = Math.hypot(...n) || 1;
    n = n.map((x) => x / L);
    if (n[0] + n[1] - n[2] >= 0) return null;
    const lum = n[2] ** 2 + 0.72 * n[1] ** 2 + 0.5 * n[0] ** 2 + (n[0] > 0 ? 0.08 * n[0] : 0);
    const c = mix(dark, light, Math.min(1, Math.max(0, (lum - 0.5) / 0.5)));
    const depth = t.reduce((s, p) => s + p[0] + p[1] - p[2], 0);
    return { depth, svg: poly(t, c, `stroke="${c}" stroke-width=".35" stroke-linejoin="round"`) };
  })
  .filter(Boolean)
  .sort((p, q) => q.depth - p.depth)
  .map((p) => p.svg)
  .join('');

// Voiture maglev le long de l'axe u, plus grande que la capsule « pod ». nose : -1 nez côté avant-gauche, 1 côté arrière.
const car = (u, v, z, len, { w = 9, h = 10, nose = 0, lit = true, stripe = '#2E6BD1', body = ['#F4F7FA', '#C9D3DC', '#E1E7EC'] } = {}) => {
  let s = box(u, v, z, len, w, h, body);
  s += poly([[u, v, z], [u + len, v, z], [u + len, v, z + 1.6], [u, v, z + 1.6]], '#7F8B97');
  s += poly([[u, v, z + h * 0.3], [u + len, v, z + h * 0.3], [u + len, v, z + h * 0.42], [u, v, z + h * 0.42]], stripe);
  const z1 = z + h * 0.55;
  const z2 = z + h * 0.84;
  s += poly([[u + 1.5, v, z1], [u + len - 1.5, v, z1], [u + len - 1.5, v, z2], [u + 1.5, v, z2]], lit ? '#FFE2A0' : '#253A52');
  let d = '';
  for (let k = u + 5; k < u + len - 2.5; k += 3.5) d += `M${P(k, v, z1)} L${P(k, v, z2)} `;
  if (d) s += `<path d="${d.trim()}" stroke="#2B3A4E" stroke-width=".7"/>`;
  if (nose) {
    const e = nose < 0 ? u : u + len;
    const sg = nose < 0 ? -1 : 1;
    const L = nose < 0 ? 9 : 11;
    const A = [e, v, z]; const D = [e, v, z + h]; const C = [e, v + w, z + h];
    const T1 = [e + sg * L, v + 1.5, z + 0.8]; const T2 = [e + sg * L, v + w - 1.5, z + 0.8];
    s += poly([D, C, T2, T1], body[0]) + poly([A, T1, D], body[2]);
    s += poly([lerp3(D, T1, 0.12), lerp3(C, T2, 0.12), lerp3(C, T2, 0.5), lerp3(D, T1, 0.5)], '#253A52');
    s += poly([lerp3(A, D, 0.3), lerp3(T1, D, 0.18), lerp3(T1, D, 0.3), lerp3(A, D, 0.42)], stripe);
    s += dot(XY(...lerp3(T1, A, 0.12)), 0.9, lit ? WARM : CYAN);
  }
  return s;
};

// Silhouette de voyageur (pieds en [x, y] à l'écran).
const person = ([x, y], c = '#1F2D3D', acc = CYAN) => `<g transform="translate(${x} ${y})"><path d="M-1.7 0 V-5.4 Q-1.7 -6.8 0 -6.8 Q1.7 -6.8 1.7 -5.4 V0Z" fill="${c}"/><circle cy="-8.5" r="1.5" fill="${c}"/><rect x="-1.7" y="-4.6" width="3.4" height=".9" fill="${acc}"/></g>`;

// Drone flottant (option : petite charge suspendue).
const drone = (x, y, load = '') => `<g class="float">${glow(x, y, 6, CYAN)}${F(`<g transform="translate(${x} ${y})">${load}<rect x="-6" y="-2" width="12" height="4" rx="2" fill="#2B3A4E"/><path d="M-10 -4 h6 M4 -4 h6" stroke="#C9D3DC" stroke-width="1.4"/><circle cx="0" cy="2" r="1.4" fill="${CYAN}"/></g>`)}</g>`;

// ---------- Zone Numération : les quais numériques ----------
const bench = (u, v, z) => box(u, v + 2.4, z, 8, 0.8, 3.6, ['#9AA6B1', '#4E5B69', '#66737F'])
  + box(u, v, z, 8, 2.4, 1.6, ['#C9D3DC', '#5B6878', '#7F8B97']);
const signPillar = (u, v, z) => box(u, v, z, 6, 2, 16, STEEL)
  + poly([[u + 0.7, v, z + 6.5], [u + 5.3, v, z + 6.5], [u + 5.3, v, z + 14.5], [u + 0.7, v, z + 14.5]], '#0F1B2D')
  + [1.9, 3, 4.1].map((k) => dot(XY(u + k, v, z + 13), 0.55, CYAN)).join('')
  + seg([[u + 1.4, v, z + 11], [u + 4.6, v, z + 11]], WARM, 1)
  + seg([[u + 1.4, v, z + 9.2], [u + 3.4, v, z + 9.2]], CYAN, 1)
  + seg([[u + 1.4, v, z + 7.6], [u + 4, v, z + 7.6]], '#E9EEF2', 0.8)
  + poly([[u, v, z + 16], [u + 6, v, z + 16], [u + 6, v + 2, z + 16], [u, v + 2, z + 16]], WARM);
const Q_BACK = box(6, 40, 0, 54, 14, 5, CONCRETE) + poly([[6, 40, 5], [60, 40, 5], [60, 41.6, 5], [6, 41.6, 5]], '#F2C94C');
const Q_GUIDE = box(-2, 26, 0, 70, 8, 2.5, STEEL) + seg([[-2, 30, 2.5], [68, 30, 2.5]], CYAN, 0.9);
const Q_FRONT = box(6, 8, 0, 54, 14, 5, CONCRETE) + poly([[6, 20.4, 5], [60, 20.4, 5], [60, 22, 5], [6, 22, 5]], '#F2C94C')
  + seg([[6, 8, 2.6], [60, 8, 2.6]], CYAN, 1.1);
const Q_DECOR_BACK = bench(44, 47, 5) + signPillar(26, 47, 5) + bench(12, 46, 5);
const Q_DECOR_FRONT = bench(46, 13, 5) + signPillar(34, 12, 5) + bench(14, 13, 5);
const canopy = (va, vb, posts) => posts.map((u) => box(u, (va + vb) / 2 - 0.8, 5, 1.6, 1.6, 21, STEEL)).join('')
  + poly([[4, va, 27], [62, va, 27], [62, vb, 24.5], [4, vb, 24.5]], CYAN, 'opacity=".22"')
  + [14, 24, 34, 44, 54].map((u) => seg([[u, va, 27], [u, vb, 24.5]], '#A8E9F2', 0.5, 'opacity=".7"')).join('')
  + poly([[4, va, 27], [62, va, 27], [62, vb, 24.5], [4, vb, 24.5]], 'none', 'stroke="#A8E9F2" stroke-width=".7"')
  + seg([[4, va, 26.3], [62, va, 26.3]], WARM, 1.2);
const Q_CANOPY_BACK = canopy(38, 56, [57, 38, 8]);
const Q_LAMPS = [[58, 17], [24, 18], [9, 17]].map(([u, v]) => box(u, v, 5, 1.2, 1.2, 15, STEEL) + box(u - 0.9, v - 0.9, 20, 3, 3, 1, ['#FFE9B8', '#5B6878', '#7F8B97'])).join('');
const lampGlow = () => [[58, 17], [24, 18], [9, 17]].map(([u, v]) => glowAt(u + 0.6, v + 0.6, 19.5, 4, WARM)).join('');
const canopyLights = (vm) => [16, 33, 50].map((u) => glowAt(u, vm, 25, 3.5, WARM) + dot(XY(u, vm, 25), 0.9, '#FFF3D1')).join('');

const NUMERATION = {
  sub: 'Les quais numériques',
  stages: [
    { name: 'une graine', what: 'Un repère laser trace l’emplacement des futurs quais' },
    { name: 'une pousse', what: 'La première dalle de quai est coulée' },
    { name: 'une jeune plante', what: 'Deux quais encadrent la voie, soulignés de bandes lumineuses' },
    { name: 'un bouton', what: 'Bancs et piliers à pictogrammes guident les voyageurs' },
    { name: 'une fleur', what: 'Un auvent de verre et des lampadaires éclairent les quais' },
    { name: 'un arbre', what: 'Le maglev est à quai : les voyageurs embarquent' },
  ],
  stickers: [
    {
      from: 0, to: 0,
      svg: poly([[6, 8, 0], [60, 8, 0], [60, 22, 0], [6, 22, 0]], CYAN, `opacity=".08" stroke="${CYAN}" stroke-width=".8" stroke-dasharray="2 1.5"`)
        + poly([[6, 40, 0], [60, 40, 0], [60, 54, 0], [6, 54, 0]], CYAN, `opacity=".08" stroke="${CYAN}" stroke-width=".8" stroke-dasharray="2 1.5"`)
        + [[6, 22], [60, 22], [6, 40], [60, 40]].map(([u, v]) => seg([[33, 31, 13], [u, v, 0]], CYAN, 0.5, 'opacity=".55"')).join('')
        + F(seg([[33, 31, 12], [29, 27, 0]], '#C9D3DC', 1.2) + seg([[33, 31, 12], [38, 29, 0]], '#C9D3DC', 1.2) + seg([[33, 31, 12], [32, 37, 0]], '#C9D3DC', 1.2)
          + box(31.8, 29.8, 12, 2.4, 2.4, 2.4, STEEL))
        + glowAt(33, 31, 13.5, 6, CYAN) + dot(XY(33, 31, 13.5), 1.2, CYAN),
    },
    { from: 1, svg: F(Q_BACK) },
    {
      from: 2,
      svg: seg([[6, 40, 2.6], [60, 40, 2.6]], CYAN, 1.1) + F(Q_GUIDE + Q_FRONT) + glowAt(33, 8, 2.6, 5, CYAN),
    },
    {
      from: 3,
      svg: F(Q_DECOR_BACK) + F(Q_DECOR_FRONT) + glowAt(29, 48, 21, 4, WARM) + glowAt(37, 13, 21, 4, WARM),
    },
    { from: 4, svg: F(Q_CANOPY_BACK) + canopyLights(47) },
    { from: 4, to: 4, svg: F(Q_LAMPS) + lampGlow() },
    {
      from: 5,
      svg: F([[18, 44], [33, 44.5], [52, 45]].map(([u, v], i) => person(XY(u, v, 5), '#1F2D3D', i === 1 ? WARM : CYAN)).join(''))
        + F(car(34, 25.5, 3, 27) + car(6, 25.5, 3, 27, { nose: -1 }))
        + glowAt(-2, 27, 4, 6, WARM)
        + F(Q_DECOR_FRONT)
        + F([[24, 18], [28, 17], [44, 18.5]].map(([u, v], i) => person(XY(u, v, 5), i === 1 ? '#34465C' : '#1F2D3D', i === 2 ? WARM : CYAN)).join(''))
        + F(Q_LAMPS) + lampGlow()
        + sparkle(168, 22, 0.6, CYAN),
    },
  ],
};

// ---------- Zone Calcul : le centre de recharge ----------
const C_BATTERY = box(28, 28, 0, 10, 10, 22, ['#3A4A5E', '#1F2B39', '#2B3A4E'])
  + box(31, 31, 22, 4, 4, 2.5, ['#E3E7EB', '#7F8B97', '#9AA6B1'])
  + [0, 1, 2, 3].map((k) => poly([[29.5, 28, 3 + k * 4.5], [36.5, 28, 3 + k * 4.5], [36.5, 28, 6.4 + k * 4.5], [29.5, 28, 6.4 + k * 4.5]], CYAN, k === 3 ? 'opacity=".3"' : '')).join('')
  + poly([[28, 34.5, 17], [28, 31.2, 11], [28, 33, 11], [28, 31.6, 5], [28, 35.4, 12.4], [28, 33.6, 12.4]], WARM);
const C_PAD = box(26, 6, 0, 28, 22, 2, PAD)
  + isoEll(40, 17, 2, 5.5, `fill="${CYAN}" opacity=".16"`)
  + isoEll(40, 17, 2, 8, `fill="none" stroke="${CYAN}" stroke-width="1.2"`)
  + [[[28, 11], [28, 8], [31, 8]], [[52, 11], [52, 8], [49, 8]], [[28, 23], [28, 26], [31, 26]], [[52, 23], [52, 26], [49, 26]]]
    .map((l) => seg(l.map(([u, v]) => [u, v, 2]), WARM, 0.9)).join('');
const panel = (u, v) => {
  const a = [u, v, 3]; const b = [u + 14, v, 3]; const c = [u + 14, v + 8, 9]; const d = [u, v + 8, 9];
  let grid = '';
  for (const t of [1 / 3, 2 / 3]) grid += seg([lerp3(a, d, t), lerp3(b, c, t)], '#5FA8E6', 0.45);
  for (const t of [0.25, 0.5, 0.75]) grid += seg([lerp3(a, b, t), lerp3(d, c, t)], '#5FA8E6', 0.45);
  return [[2, 7, 8.3], [12, 7, 8.3], [2, 1, 3.7], [12, 1, 3.7]].map(([du, dv, h]) => seg([[u + du, v + dv, 0], [u + du, v + dv, h]], '#8794A1', 0.9)).join('')
    + poly([a, b, c, d], '#1D4E89') + poly([a, lerp3(a, b, 0.4), lerp3(d, c, 0.15)], '#4F86C6', 'opacity=".35"') + grid
    + poly([a, b, c, d], 'none', 'stroke="#C9D3DC" stroke-width=".6"');
};
const C_PANELS = panel(49, 49) + panel(33, 49) + panel(49, 36) + panel(33, 36);
const GAUGE_V = [2, 5.5];
const block = (u, v, lvl) => box(u, v, 0, 10, 9, 18, ['#D5DCE3', '#4E5B69', '#AAB5C0'])
  + GAUGE_V.map((dv, i) => {
    const vv = v + dv;
    return poly([[u, vv, 3], [u, vv + 2, 3], [u, vv + 2, 15], [u, vv, 15]], '#0F1B2D')
      + poly([[u, vv, 3], [u, vv + 2, 3], [u, vv + 2, 3 + 12 * lvl[i]], [u, vv, 3 + 12 * lvl[i]]], i ? WARM : CYAN);
  }).join('')
  + dot(XY(u, v + 8, 16.5), 0.7, '#4CE08A');
const fullGauges = (u, v) => GAUGE_V.map((dv) => poly([[u, v + dv, 3], [u, v + dv + 2, 3], [u, v + dv + 2, 15], [u, v + dv, 15]], CYAN)).join('');
const C_STORE = block(6, 57, [0.6, 0.4]) + block(6, 46.5, [0.8, 0.5]) + block(6, 36, [0.3, 0.7]);
const C_POST = box(50, 23, 2, 3, 3, 20, STEEL) + dot(XY(50, 24.5, 18), 0.8, CYAN);
const C_ARMPTS = [[51.5, 24.5, 22], [46, 21, 25], [41, 16, 12.6]];
const C_ARM = seg(C_ARMPTS, '#9AA6B1', 2.4, 'stroke-linejoin="round" stroke-linecap="round"') + seg(C_ARMPTS, CYAN, 0.7)
  + box(39.8, 14.8, 12, 2.4, 2.4, 1.6, STEEL);
const cableD = `M${P(11, 40.5, 18)} Q${P(30, 33, 40)} ${P(51.5, 24.5, 22)}`;
const qbez = (t) => {
  const p0 = XY(11, 40.5, 18); const p1 = XY(30, 33, 40); const p2 = XY(51.5, 24.5, 22);
  return [0, 1].map((i) => r1((1 - t) ** 2 * p0[i] + 2 * (1 - t) * t * p1[i] + t * t * p2[i]));
};

const CALCUL = {
  sub: 'Le centre de recharge',
  stages: [
    { name: 'une graine', what: 'Une cellule de batterie, chargée aux trois quarts' },
    { name: 'une pousse', what: 'Le pad de recharge à induction est installé' },
    { name: 'une jeune plante', what: 'Un champ de panneaux solaires capte l’énergie' },
    { name: 'un bouton', what: 'Les blocs de stockage affichent leurs jauges' },
    { name: 'une fleur', what: 'Le bras de recharge se connecte à une capsule' },
    { name: 'un arbre', what: 'Le hub tourne à plein : l’énergie circule partout' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glowAt(33, 28, 12, 9, CYAN) + F(C_BATTERY) },
    { from: 1, svg: F(C_PAD) + glowAt(40, 17, 2, 6, CYAN) },
    { from: 2, svg: F(C_PANELS) },
    { from: 3, svg: F(C_STORE) + glowAt(6, 41, 10, 4, CYAN) + glowAt(6, 51, 12, 4, WARM) },
    {
      from: 4,
      svg: F(C_POST) + F(car(32, 11, 3, 20, { w: 10, h: 9, nose: -1, stripe: '#1C9DB0' })) + F(C_ARM)
        + glowAt(41, 16, 13, 5, CYAN) + dot(XY(41, 16, 13.8), 1, '#E9FBFD'),
    },
    {
      from: 5,
      svg: seg([[38, 36, 0.3], [38, 33, 0.3], [11, 33, 0.3], [11, 36, 0.3]], CYAN, 3, 'opacity=".25"')
        + seg([[38, 36, 0.3], [38, 33, 0.3], [11, 33, 0.3], [11, 36, 0.3]], CYAN, 1, 'stroke-dasharray="2.5 1.5"')
        + fullGauges(6, 57) + fullGauges(6, 46.5) + fullGauges(6, 36)
        + `<path d="${cableD}" stroke="${CYAN}" stroke-width="3" fill="none" opacity=".25"/><path d="${cableD}" stroke="${CYAN}" stroke-width="1" fill="none"/>`
        + [0.25, 0.5, 0.75].map((t) => glow(...qbez(t), 3, CYAN) + dot(qbez(t), 1.1, '#E9FBFD')).join('')
        + isoEll(40, 17, 2.2, 10, `fill="none" stroke="${CYAN}" stroke-width=".7" opacity=".6"`)
        + drone(150, 38, `<path d="M0 2 V5" stroke="#C9D3DC" stroke-width=".8"/><rect x="-2.5" y="5" width="5" height="6" rx="1" fill="#2B3A4E"/><rect x="-1.5" y="6.5" width="3" height="3.5" fill="${CYAN}"/>`)
        + sparkle(64, 28, 0.6, CYAN) + sparkle(176, 64, 0.5, WARM),
    },
  ],
};

// ---------- Zone Géométrie : le viaduc suspendu ----------
const PYL = [51, 13];
const G_LEG = (u, v) => box(u, v, 3, 3, 3, 66, CONCRETE);
const G_FRONT_LEGS = PYL.map((u) => G_LEG(u, 23.5)).join('');
const G_PYLONS = PYL.map((u) => G_LEG(u, 39.5) + box(u, 23.5, 63, 3, 19, 3, ['#EEF2F5', '#9AA6B1', '#B7C1CA']) + G_LEG(u, 23.5)).join('');
const G_FOOT = (u) => box(u - 3, 21, 0, 9, 24, 3, CONCRETE) + seg([[u - 3, 21, 1.5], [u + 6, 21, 1.5]], CYAN, 0.7);
const G_KS = [-18, -12, -6, 6, 12, 18];
const G_CABLES = (vt, va) => PYL.map((u) => G_KS.map((k) => seg([[u + 1.5, vt, 68.5], [u + 1.5 + k, va, 21]], '#E3EAF0', 0.55)).join('')).join('');
const G_CAB_FRONT = G_CABLES(25, 27.3);
const G_DECK = box(-6, 31, -8, 3, 5, 26, CONCRETE) + box(70, 31, 0, 3, 5, 18, CONCRETE)
  + box(-8, 27, 18, 82, 12, 3, ['#D7DDE3', '#6B7785', '#A3AEB9'])
  + seg([[-8, 27.6, 21], [74, 27.6, 21]], '#F4F7FA', 0.5) + seg([[-8, 38.4, 21], [74, 38.4, 21]], '#F4F7FA', 0.5);
const G_GUIDE = box(-8, 31, 21, 82, 5, 2, STEEL) + seg([[-8, 33.5, 23], [74, 33.5, 23]], CYAN, 0.9);
const G_RIVER = poly([[22, 0, 0], [44, 0, 0], [44, 66, 0], [22, 66, 0]], '#14304B')
  + seg([[22, 0, 0], [22, 66, 0]], '#E3E7EB', 0.6) + seg([[44, 0, 0], [44, 66, 0]], '#E3E7EB', 0.6)
  + [[27, 8], [35, 16], [29, 46], [37, 56], [26, 28]].map(([u, v]) => seg([[u, v, 0], [u + 5, v, 0]], CYAN, 0.6, 'opacity=".4"')).join('');

const GEOMETRIE = {
  sub: 'Le viaduc suspendu',
  stages: [
    { name: 'une graine', what: 'La semelle du premier pylône est coulée' },
    { name: 'une pousse', what: 'Deux pylônes se dressent de part et d’autre du canal' },
    { name: 'une jeune plante', what: 'Le tablier est suspendu à des éventails de haubans' },
    { name: 'un bouton', what: 'La poutre de guidage est posée sur le tablier' },
    { name: 'une fleur', what: 'Un maglev traverse le viaduc' },
    { name: 'un arbre', what: 'De nuit, les haubans s’illuminent au-dessus du canal' },
  ],
  stickers: [
    { from: 0, svg: F(G_FOOT(13)) + glowAt(14.5, 33, 3, 5, CYAN) },
    { from: 1, svg: G_RIVER + F(G_FOOT(51)) + F(G_PYLONS) },
    { from: 2, svg: F(G_DECK) + G_CABLES(41, 38.7) + F(G_FRONT_LEGS) + G_CAB_FRONT },
    { from: 3, svg: F(G_GUIDE) + F(G_FRONT_LEGS) + G_CAB_FRONT },
    {
      from: 4,
      svg: F(car(47, 29.5, 23, 21, { w: 8, h: 9 }) + car(25, 29.5, 23, 21, { w: 8, h: 9 }) + car(3, 29.5, 23, 21, { w: 8, h: 9, nose: -1 }))
        + glowAt(-6, 31, 24, 6, WARM) + F(G_FRONT_LEGS) + G_CAB_FRONT,
    },
    {
      from: 5,
      svg: PYL.map((u) => G_KS.map((k) => [0.35, 0.7].map((t) => dot(XY(...lerp3([u + 1.5, 25, 68.5], [u + 1.5 + k, 27.3, 21], t)), 0.65, WARM)).join('')).join('')).join('')
        + [[-8, 12.5], [16.5, 50.5], [54.5, 74]].map(([a, b]) => seg([[a, 27, 19.5], [b, 27, 19.5]], CYAN, 0.9)).join('')
        + PYL.map((u) => glowAt(u + 1.5, 25, 70, 4, '#FF5A5A') + dot(XY(u + 1.5, 25, 70), 1, '#FF5A5A')).join('')
        + [[28, 8], [36, 14], [30, 52]].map(([u, v], i) => seg([[u, v, 0], [u + 6, v, 0]], i ? WARM : CYAN, 1, 'opacity=".6"')).join('')
        + PYL.map((u) => glowAt(u + 1.5, 33, 3, 6, CYAN)).join('')
        + sparkle(28, 18, 0.6, CYAN) + sparkle(176, 30, 0.5, WARM),
    },
  ],
};

// ---------- Zone Attention : le carrefour intelligent ----------
const A_ROAD = poly([[24, 0, 0], [40, 0, 0], [40, 66, 0], [24, 66, 0]], '#2A3442')
  + seg([[24.6, 0, 0], [24.6, 66, 0]], '#C9D3DC', 0.5) + seg([[39.4, 0, 0], [39.4, 66, 0]], '#C9D3DC', 0.5)
  + seg([[32, 0, 0], [32, 66, 0]], '#E9EEF2', 0.7, 'stroke-dasharray="3 3"');
const A_TRACK = poly([[0, 28, 0], [66, 28, 0], [66, 38, 0], [0, 38, 0]], '#18222E')
  + seg([[0, 30.5, 0], [66, 30.5, 0]], CYAN, 0.8) + seg([[0, 35.5, 0], [66, 35.5, 0]], CYAN, 0.8)
  + seg([[24, 27.3, 0], [40, 27.3, 0]], '#F2C94C', 0.9, 'stroke-dasharray="1.5 1"') + seg([[24, 38.7, 0], [40, 38.7, 0]], '#F2C94C', 0.9, 'stroke-dasharray="1.5 1"');
const A_SENSOR = box(56, 12, 0, 2, 2, 26, STEEL) + box(55, 11, 26, 4, 4, 3, ['#C9D3DC', '#5B6878', '#7F8B97']) + dot(XY(55, 13, 27.5), 1, CYAN);
const A_CONE = poly([[55, 13, 27.5], [24, 22, 0], [34, 44, 0]], CYAN, 'opacity=".12"');
const armSegs = (a, b, av) => [0, 1, 2, 3, 4, 5].map((i) => {
  const u0 = a + ((b - a) * i) / 6; const u1 = a + ((b - a) * (i + 1)) / 6;
  return poly([[u0, av, 6.8], [u1, av, 6.8], [u1, av, 8.2], [u0, av, 8.2]], i % 2 ? '#E9EEF2' : '#FF5A5A');
}).join('');
const A_BAR_FRONT = box(42, 22.5, 0, 2.5, 2.5, 9, STEEL) + armSegs(42, 25, 23.6) + dot(XY(43.2, 22.5, 7.5), 0.8, '#FF5A5A') + dot(XY(42, 23.8, 5), 0.6, CYAN);
const A_BAR_BACK = armSegs(22.5, 39, 42.6) + box(20, 41.5, 0, 2.5, 2.5, 9, STEEL) + dot(XY(21.2, 41.5, 7.5), 0.8, '#FF5A5A') + dot(XY(20, 42.8, 5), 0.6, CYAN);
const A_ZEBRA = [0, 1, 2, 3, 4].map((k) => poly([[25.4 + k * 2.9, 6, 0], [27 + k * 2.9, 6, 0], [27 + k * 2.9, 15, 0], [25.4 + k * 2.9, 15, 0]], '#E9EEF2', 'opacity=".9"')).join('');
const pedLight = (u, v) => box(u, v, 0, 1.6, 1.6, 12, STEEL) + box(u - 0.6, v - 0.6, 12, 2.8, 2.8, 5, ['#2B3A4E', '#141E2A', '#1E2A38'])
  + dot(XY(u + 0.8, v - 0.6, 15.4), 0.7, '#5A2A2A') + dot(XY(u + 0.8, v - 0.6, 13.6), 0.8, '#4CE08A');
const A_PED = pedLight(19, 8);
const A_SHUTTLE = box(26.5, 46, 0.6, 11, 14, 9, ['#EEF2F5', '#AEBAC6', '#D3DCE3'])
  + poly([[27.5, 46, 4.8], [36.5, 46, 4.8], [36.5, 46, 8.2], [27.5, 46, 8.2]], '#253A52')
  + poly([[26.5, 47.5, 4.8], [26.5, 58.5, 4.8], [26.5, 58.5, 8.2], [26.5, 47.5, 8.2]], '#253A52')
  + seg([[27, 46, 3], [37, 46, 3]], CYAN, 1) + seg([[26.5, 47, 3], [26.5, 59, 3]], CYAN, 0.8)
  + box(28, 48, 9.6, 8, 10, 1.2, ['#F4F7FA', '#B4C0CB', '#D3DCE3'])
  + dot(XY(32, 53, 11.2), 1, CYAN)
  + [[28.5, 46], [35.5, 46], [26.5, 48.5], [26.5, 57]].map(([u, v]) => dot(XY(u, v, 0.8), 1.2, '#1A2533')).join('');
const A_TRAIN = car(46, 28.5, 1, 20) + car(24, 28.5, 1, 21) + car(2, 28.5, 1, 21, { nose: -1 });
const arrowU = (u, v, z, c) => poly([[u, v, z], [u + 5, v - 4.5, z], [u + 5, v - 1.8, z], [u + 13, v - 1.8, z], [u + 13, v + 1.8, z], [u + 5, v + 1.8, z], [u + 5, v + 4.5, z]], c, `opacity=".6" stroke="${c}" stroke-width=".7"`);
const arrowV = (u, v, z, c) => poly([[u, v, z], [u + 4.5, v + 5, z], [u + 1.8, v + 5, z], [u + 1.8, v + 13, z], [u - 1.8, v + 13, z], [u - 1.8, v + 5, z], [u - 4.5, v + 5, z]], c, `opacity=".6" stroke="${c}" stroke-width=".7"`);

const ATTENTION = {
  sub: 'Le carrefour intelligent',
  stages: [
    { name: 'une graine', what: 'Un capteur balaye le futur carrefour' },
    { name: 'une pousse', what: 'La route croise la voie magnétique' },
    { name: 'une jeune plante', what: 'Des barrières à LED sécurisent le passage' },
    { name: 'un bouton', what: 'Un passage piéton et son feu sont ajoutés' },
    { name: 'une fleur', what: 'La navette autonome attend : le maglev passe' },
    { name: 'un arbre', what: 'Drones et flèches holographiques orchestrent le trafic' },
  ],
  stickers: [
    { from: 0, to: 0, svg: A_CONE + F(A_SENSOR) + glowAt(55, 13, 27.5, 5, CYAN) },
    { from: 1, svg: A_ROAD + A_TRACK + A_CONE + F(A_SENSOR) + glowAt(55, 13, 27.5, 5, CYAN) },
    { from: 2, svg: F(A_BAR_BACK) + F(A_BAR_FRONT) + glowAt(43.2, 22.5, 7.5, 4, '#FF5A5A') + glowAt(21.2, 41.5, 7.5, 4, '#FF5A5A') },
    { from: 3, svg: A_ZEBRA + F(A_PED) + glowAt(19.8, 7.4, 13.6, 4, '#4CE08A') },
    {
      from: 4,
      svg: F(A_SHUTTLE) + F(A_BAR_BACK) + F(A_TRAIN) + glowAt(-6, 30, 2, 6, WARM) + F(A_BAR_FRONT) + F(A_PED)
        + glowAt(43.2, 22.5, 7.5, 4, '#FF5A5A'),
    },
    {
      from: 5,
      svg: F(person(XY(29, 10, 0), '#1F2D3D', WARM) + person(XY(35.5, 12, 0), '#34465C', CYAN))
        + arrowU(-4, 33, 24, CYAN) + arrowU(12, 33, 24, CYAN) + arrowV(32, 48, 18, WARM)
        + glowAt(32, 52, 18, 5, WARM)
        + drone(52, 36) + drone(156, 46)
        + glowAt(19.8, 7.4, 13.6, 4, '#4CE08A') + sparkle(176, 22, 0.5, CYAN),
    },
  ],
};

// ---------- Zone Mémoire : la grande gare holographique ----------
const BEAM = ['#DCE2E8', '#7F8B97', '#A3AEB9'];
const M_COL = (u, v) => box(u, v, 2, 4, 4, 40, CONCRETE);
const M_FLOOR = box(4, 6, 0, 60, 54, 2, ['#8E9BA9', '#5B6878', '#6F7D8C'])
  + [20, 34, 48].map((u) => seg([[u, 6, 2], [u, 60, 2]], '#A3AFBC', 0.4)).join('')
  + [20, 33, 46].map((v) => seg([[4, v, 2], [64, v, 2]], '#A3AFBC', 0.4)).join('');
const M_FRAME = M_COL(56, 52) + M_COL(8, 52) + M_COL(56, 10)
  + box(8, 52, 42, 52, 4, 3, BEAM) + box(56, 14, 42, 4, 38, 3, BEAM) + box(8, 14, 42, 4, 38, 3, BEAM);
const M_FRONTCOL = M_COL(8, 10);
const M_FRONTBEAM = box(8, 10, 42, 52, 4, 3, BEAM);
const BAYS = [8, 21, 34, 47, 60];
const slope = (ve) => BAYS.slice(0, -1).map((u0, i) => {
  const u1 = BAYS[i + 1];
  const A = [u0, ve, 45]; const B = [u1, ve, 45]; const C = [u1, 33, 58]; const D = [u0, 33, 58];
  return poly([A, B, C], CYAN, `opacity="${i % 2 ? 0.26 : 0.14}"`) + poly([A, C, D], CYAN, `opacity="${i % 2 ? 0.14 : 0.26}"`)
    + seg([A, C], '#BFEFF5', 0.4, 'opacity=".6"');
}).join('') + BAYS.map((u) => seg([[u, ve, 45], [u, 33, 58]], '#BFEFF5', 0.5)).join('');
const M_ROOF = slope(56) + slope(10)
  + poly([[8, 10, 45], [8, 56, 45], [8, 33, 58]], CYAN, 'opacity=".2" stroke="#BFEFF5" stroke-width=".5"')
  + seg([[8, 33, 58], [60, 33, 58]], '#E9F6FA', 0.9);
const [CLX, CLY] = XY(34, 12, 33);
const handAt = (deg, len, c, w) => {
  const a = (deg * Math.PI) / 180;
  return `<path d="M${CLX} ${CLY} L${r1(CLX + len * Math.sin(a))} ${r1(CLY - len * Math.cos(a))}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
};
const M_CLOCK = `<path d="M${P(34, 12, 42)} L${CLX} ${r1(CLY - 6.5)}" stroke="#7F8B97" stroke-width="1"/>`
  + `<circle cx="${CLX}" cy="${CLY}" r="6.8" fill="#2B3A4E"/><circle cx="${CLX}" cy="${CLY}" r="5.8" fill="#F4F7FA"/>`
  + Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180;
    return `<path d="M${r1(CLX + 4.4 * Math.sin(a))} ${r1(CLY - 4.4 * Math.cos(a))} L${r1(CLX + 5.3 * Math.sin(a))} ${r1(CLY - 5.3 * Math.cos(a))}" stroke="#2B3A4E" stroke-width="${i % 3 ? 0.4 : 0.8}"/>`;
  }).join('')
  + handAt(305, 3, '#1F2D3D', 1.1) + handAt(60, 4.6, '#1F2D3D', 0.8) + handAt(200, 4.8, '#E04848', 0.4)
  + `<circle cx="${CLX}" cy="${CLY}" r=".7" fill="#1F2D3D"/>`;
const BOARD_ROWS = [['#E04848', 14, '#4CE08A'], ['#2E6BD1', 10, '#4CE08A'], ['#F2C94C', 16, WARM], ['#4CE08A', 8, '#4CE08A'], ['#B05FE0', 12, '#FF5A5A']];
const M_BOARD = box(28, 49, 2, 4, 2, 1.5, STEEL)
  + poly([[29, 50, 3.5], [31, 50, 3.5], [46, 50, 17], [14, 50, 17]], CYAN, 'opacity=".1"')
  + poly([[14, 50, 17], [46, 50, 17], [46, 50, 32], [14, 50, 32]], CYAN, `opacity=".18" stroke="${CYAN}" stroke-width=".6"`)
  + seg([[16, 50, 30.6], [44, 50, 30.6]], CYAN, 0.6)
  + BOARD_ROWS.map(([chip, len, st], k) => {
    const z = 28 - k * 2.4;
    return seg([[16, 50, z], [17.6, 50, z]], chip, 1.5) + seg([[19, 50, z], [19 + len, 50, z]], '#E9F6FA', 1) + seg([[40, 50, z], [44, 50, z]], st, 1);
  }).join('');
const M_TRACKS = poly([[10, 18, 2], [62, 18, 2], [62, 26, 2], [10, 26, 2]], '#2B3A4E') + seg([[10, 22, 2], [62, 22, 2]], CYAN, 0.7)
  + poly([[10, 36, 2], [62, 36, 2], [62, 44, 2], [10, 44, 2]], '#2B3A4E') + seg([[10, 40, 2], [62, 40, 2]], CYAN, 0.7);
const M_RING = (() => {
  const [x0, y0] = XY(34, 33, 2); const [x1, y1] = XY(34, 33, 26);
  return `<path d="M${x0 - 4} ${y0} L${r1(x1 - 15.6)} ${y1} L${r1(x1 + 15.6)} ${y1} L${x0 + 4} ${y0}Z" fill="${CYAN}" opacity=".1"/>`
    + isoEll(34, 33, 2, 3, `fill="${CYAN}" opacity=".5"`)
    + `<g class="float">${glow(x1, y1, 10, CYAN)}${isoEll(34, 33, 26, 11, `fill="none" stroke="${CYAN}" stroke-width="1.6"`)}${isoEll(34, 33, 26, 8, `fill="none" stroke="#E9FBFD" stroke-width=".6" opacity=".7"`)}${isoEll(34, 33, 30, 5, `fill="none" stroke="${WARM}" stroke-width=".8"`)}${dot(XY(34, 33, 30), 1.4, '#E9FBFD')}</g>`;
})();

const MEMOIRE = {
  sub: 'La grande gare holographique',
  stages: [
    { name: 'une graine', what: 'Une première colonne de béton se dresse' },
    { name: 'une pousse', what: 'L’ossature du grand hall est montée' },
    { name: 'une jeune plante', what: 'La verrière à facettes couvre le hall' },
    { name: 'un bouton', what: 'L’horloge et le tableau holographique des départs s’allument' },
    { name: 'une fleur', what: 'Deux capsules à quai, les voyageurs circulent' },
    { name: 'un arbre', what: 'La gare brille de nuit sous son anneau holographique' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(M_COL(30, 30)) + glowAt(32, 30, 30, 5, CYAN) },
    { from: 1, svg: F(M_FLOOR + M_FRAME + M_FRONTCOL + M_FRONTBEAM) },
    { from: 2, svg: M_ROOF },
    { from: 3, svg: M_BOARD + glow(CLX, CLY, 7, WARM) + F(M_CLOCK) },
    {
      from: 4,
      svg: M_TRACKS + F(person(XY(20, 47, 2), '#1F2D3D', WARM) + person(XY(48, 47, 2), '#34465C'))
        + F(car(24, 36.5, 2.5, 18, { w: 7, h: 8, nose: -1 }) + car(28, 18.5, 2.5, 18, { w: 7, h: 8, nose: -1, stripe: '#1C9DB0' }))
        + F(M_FRONTCOL)
        + F([[15, 14], [19, 13], [44, 14], [50, 15.5]].map(([u, v], i) => person(XY(u, v, 2), i % 2 ? '#34465C' : '#1F2D3D', i === 2 ? WARM : CYAN)).join('')),
    },
    {
      from: 5,
      svg: [[8, 10], [56, 10], [8, 52], [56, 52]].map(([u, v]) => seg([[u + 2, v, 5], [u + 2, v, 40]], CYAN, 0.7)).join('')
        + seg([[8, 10, 42], [60, 10, 42]], WARM, 1.1) + seg([[8, 14, 42], [8, 56, 42]], WARM, 1.1)
        + [20, 34, 48].map((u) => glowAt(u, 10, 41, 4, WARM)).join('') + glowAt(8, 30, 41, 4, WARM)
        + M_RING
        + sparkle(150, 26, 0.6, CYAN) + sparkle(40, 30, 0.5, WARM),
    },
  ],
};

// ---------- Zone Espace : le tunnel sous la montagne ----------
const MTN0 = [[20, 22], [36, 10], [58, 12], [64, 34], [62, 60], [40, 64], [16, 60], [16, 42]];
const APEX = [44, 40, 56];
const ringAt = (t, zs) => MTN0.map(([u, v], i) => [u + (APEX[0] - u) * t, v + (APEX[1] - v) * t, zs[i]]);
const R0 = MTN0.map(([u, v]) => [u, v, 0]);
const R1 = ringAt(0.38, [22, 18, 15, 20, 24, 27, 21, 19]);
const R2 = ringAt(0.72, [40, 37, 35, 39, 44, 46, 41, 38]);
const MTN_TRIS = [];
for (let i = 0; i < 8; i++) {
  const j = (i + 1) % 8;
  MTN_TRIS.push([R0[i], R0[j], R1[j]], [R0[i], R1[j], R1[i]], [R1[i], R1[j], R2[j]], [R1[i], R2[j], R2[i]], [R2[i], R2[j], APEX]);
}
const MOUNTAIN = mesh(MTN_TRIS, '#273447', '#B2BFCE');
const SNOW = mesh(MTN_TRIS.filter((t) => (t[0][2] + t[1][2] + t[2][2]) / 3 >= 30), '#8FA2B8', '#F4F8FB');
const ROCK = (() => {
  const c = [10, 5];
  const base = [0, 1, 2, 3, 4, 5].map((k) => [c[0] + 4.5 * Math.cos(k * 1.05), c[1] + 3.6 * Math.sin(k * 1.05), 0]);
  const mid = [0, 1, 2, 3, 4, 5].map((k) => [c[0] + 2.8 * Math.cos(k * 1.05 + 0.5), c[1] + 2.3 * Math.sin(k * 1.05 + 0.5), 3.4 + (k % 2) * 0.8]);
  const top = [c[0] + 0.4, c[1] + 0.3, 6.5];
  const tris = [];
  for (let i = 0; i < 6; i++) {
    const j = (i + 1) % 6;
    tris.push([base[i], base[j], mid[i]], [base[j], mid[j], mid[i]], [mid[i], mid[j], top]);
  }
  return mesh(tris, '#3E4C5E', '#B3BFCC');
})();
const ARCH = [[14, 29.5, 0], [14, 29.5, 7.5], ...[150, 120, 90, 60, 30].map((d) => {
  const a = (d * Math.PI) / 180;
  return [14, 34 - 4.5 * Math.cos(a), 7.5 + 4.5 * Math.sin(a)];
}), [14, 38.5, 7.5], [14, 38.5, 0]];
const E_PORTAL = box(14, 27, 0, 6, 15, 16, ['#C5CED6', '#6B7785', '#8F9BA7'])
  + poly(ARCH, '#0B1320') + poly([[14, 29.5, 0], [14, 38.5, 0], [14, 38.5, 1.5], [14, 29.5, 1.5]], CYAN, 'opacity=".35"')
  + seg([[14, 27.4, 14.6], [14, 41.6, 14.6]], WARM, 1);
const E_GUIDE = box(-2, 31, 0, 16, 6, 2.5, STEEL) + seg([[-2, 34, 2.5], [14, 34, 2.5]], CYAN, 0.9);
const turbine = (u, v, h) => {
  const [x, y] = XY(u + 0.8, v - 0.6, h + 1);
  return box(u, v, 0, 1.6, 1.6, h, CONCRETE) + box(u - 0.6, v + 0.2, h, 3.4, 1.2, 1.8, ['#F4F7FA', '#9AA6B1', '#C9D3DC'])
    + `<g transform="translate(${x} ${y})">${[15, 135, 255].map((a) => `<path transform="rotate(${a})" d="M-.8 0 L0 -14 L1 -1.5Z" fill="#F4F7FA"/>`).join('')}<circle r="1.3" fill="#C9D3DC"/></g>`
    + dot(XY(u + 0.8, v + 0.8, h + 2.2), 0.7, '#FF5A5A');
};

const ESPACE = {
  sub: 'Le tunnel sous la montagne',
  stages: [
    { name: 'une graine', what: 'Un rocher : le relevé du terrain commence' },
    { name: 'une pousse', what: 'Une montagne à facettes se dresse sur la dalle' },
    { name: 'une jeune plante', what: 'Le portail du tunnel est percé et éclairé' },
    { name: 'un bouton', what: 'La poutre de guidage s’engouffre sous la roche' },
    { name: 'une fleur', what: 'Une capsule surgit du tunnel' },
    { name: 'un arbre', what: 'Sommet enneigé, éoliennes et tracé de la route' },
  ],
  stickers: [
    { from: 0, svg: F(ROCK) },
    { from: 1, svg: F(MOUNTAIN) },
    { from: 2, svg: F(E_PORTAL) + glowAt(14, 34, 5, 6, CYAN) + glowAt(14, 28.5, 14.6, 3, WARM) + glowAt(14, 40.5, 14.6, 3, WARM) },
    { from: 3, svg: F(E_GUIDE) },
    { from: 4, svg: F(car(2, 30, 2.5, 12, { w: 8, h: 9, nose: -1 })) + glowAt(-7, 32, 3, 6, WARM) },
    {
      from: 5,
      svg: SNOW + F(turbine(4, 58, 36)) + F(turbine(60, 4, 36))
        + seg([[14, 34, 6], [66, 34, 6]], CYAN, 1, 'stroke-dasharray="2 1.6"')
        + seg([[14, 34, 17], [26, 36, 22], [34, 38, 36], [44, 40, 57], [54, 46, 40], [62, 52, 18]], WARM, 0.8, 'stroke-dasharray="1.2 1.4" opacity=".9"')
        + glowAt(66, 34, 6, 4, CYAN) + dot(XY(66, 34, 6), 1.2, CYAN) + dot(XY(44, 40, 57), 1.1, WARM)
        + sparkle(160, 20, 0.6, CYAN) + sparkle(30, 26, 0.5, '#E9F6FA'),
    },
  ],
};

// ---------- Zone Problèmes : le port de fret automatisé ----------
const CONT = [
  ['#F5A066', '#B5582A', '#D9733E'], ['#6FA0E0', '#2D5597', '#4074BE'], ['#5ED1C1', '#1F7F75', '#2EA394'],
  ['#EE6B6B', '#972F35', '#C24449'], ['#F7D36B', '#A9822A', '#D6A93D'], ['#E9EEF2', '#97A3AF', '#BCC6CF'],
];
const cont = (u, v, z, c, len = 12, wid = 5, h = 5) => {
  let d = '';
  for (let k = 1.5; k < len - 0.5; k += 1.5) d += `M${P(u + k, v, z + 0.5)} L${P(u + k, v, z + h - 0.5)} `;
  return box(u, v, z, len, wid, h, c) + `<path d="${d.trim()}" stroke="${c[1]}" stroke-width=".4" opacity=".7"/>`
    + seg([[u, v + wid / 2, z + 0.5], [u, v + wid / 2, z + h - 0.5]], c[0], 0.4, 'opacity=".6"');
};
const YARD_H = [[2, 3, 1, 2], [3, 2, 2, 1], [1, 3, 2, 3], [2, 1, 3, 2]];
const YARD = (() => {
  let s = '';
  for (let r = 3; r >= 0; r--) {
    for (let c = 3; c >= 0; c--) {
      for (let k = 0; k < YARD_H[r][c]; k++) s += cont(4 + c * 14, 36 + r * 7, k * 5, CONT[(r * 4 + c + k * 3) % 6]);
    }
  }
  return s;
})();
const WATER = poly([[-4, 66, 0], [70, 66, 0], [70, 82, -6], [-4, 82, -6]], '#1B4A6E')
  + [[6, 70], [24, 74], [44, 70], [14, 78], [58, 76]].map(([u, v]) => seg([[u, v, -2], [u + 7, v, -2]], CYAN, 0.6, 'opacity=".35"')).join('')
  + seg([[0, 66, 0], [66, 66, 0]], '#E3E7EB', 0.8);
const CRANE = ['#F4D27A', '#A9842F', '#D1A947'];
const K_LEG = (u, v) => box(u, v, 0, 3, 3, 40, CRANE);
const K_FRONT_LEGS = K_LEG(39, 2) + K_LEG(28, 2);
const K_CRANE = K_LEG(39, 30) + K_LEG(28, 30) + box(28, 30, 37, 14, 3, 3, CRANE)
  + K_FRONT_LEGS + box(28, 2, 37, 14, 3, 3, CRANE)
  + box(39, -2, 40, 3, 78, 3, CRANE) + box(28, -2, 40, 3, 78, 3, CRANE)
  + dot(XY(29.5, -2, 41.5), 0.9, '#FF5A5A');
const K_LANES = poly([[0, 6, 0], [66, 6, 0], [66, 15, 0], [0, 15, 0]], '#2E3A4A') + seg([[0, 10.5, 0], [66, 10.5, 0]], '#E9EEF2', 0.6, 'stroke-dasharray="3 3"')
  + poly([[0, 19, 0], [66, 19, 0], [66, 28, 0], [0, 28, 0]], '#243142');
const K_HOOK = box(27.5, 19, 43, 15, 7, 3.5, STEEL) + dot(XY(27.5, 22.5, 45), 0.8, CYAN);
const K_LOAD = seg([[32, 22.5, 40], [32, 22.5, 26]], '#C9D3DC', 0.6) + seg([[40, 22.5, 40], [40, 22.5, 26]], '#C9D3DC', 0.6)
  + box(30, 20.5, 25, 12, 5, 1, STEEL) + cont(30, 20.5, 20, CONT[1]);
const K_TRUCK = box(8, 7.5, 1.5, 15, 5, 1.5, STEEL) + cont(9, 7.5, 3, CONT[0], 13)
  + box(2, 7.5, 1.5, 5.5, 5, 6.5, ['#F4F7FA', '#AEBAC6', '#D3DCE3'])
  + poly([[2, 8.3, 5], [2, 11.7, 5], [2, 11.7, 7], [2, 8.3, 7]], '#253A52') + seg([[2, 8, 3.2], [2, 12, 3.2]], CYAN, 0.8)
  + [4, 11, 20].map((u) => dot(XY(u, 7.5, 1), 1.3, '#1A2533')).join('');
const flatcar = (u, len, load) => box(u, 19.5, 2, len, 8, 2.5, ['#5B6878', '#2B3A4E', '#3A4A5E']) + (load ? cont(u + 2.5, 21, 4.5, CONT[load]) : '');
const K_TRAIN = box(-4, 20, 0, 74, 7, 2, STEEL) + seg([[-4, 23.5, 2], [70, 23.5, 2]], CYAN, 0.8)
  + flatcar(51, 17, 2) + flatcar(33, 17, 0) + flatcar(15, 17, 3) + car(1, 19.5, 2, 13, { w: 8, h: 9, nose: -1, stripe: '#F2C94C' });
const flood = (u, v, h, tA, tB) => poly([[u + 0.9, v + 0.9, h], tA, tB], '#FFE9B8', 'opacity=".2"')
  + box(u, v, 0, 1.8, 1.8, h, STEEL) + box(u - 1.2, v - 1.2, h, 4.2, 4.2, 1.6, ['#C9D3DC', '#5B6878', '#7F8B97'])
  + [-0.6, 1, 2.6].map((k) => dot(XY(u - 1.2, v + k, h + 0.8), 0.6, '#FFF3D1')).join('');
const cargoLoad = (c) => `<path d="M-2 2 V5 M2 2 V5" stroke="#C9D3DC" stroke-width=".7"/><rect x="-4.5" y="5" width="9" height="5" fill="${c}"/><path d="M-2.5 5.6 v3.8 M0 5.6 v3.8 M2.5 5.6 v3.8" stroke="#00000033" stroke-width=".5"/>`;

const PROBLEMES = {
  sub: 'Le port de fret automatisé',
  stages: [
    { name: 'une graine', what: 'Un premier conteneur est débarqué sur le quai' },
    { name: 'une pousse', what: 'Les piles de conteneurs s’alignent au bord de l’eau' },
    { name: 'une jeune plante', what: 'Un portique automatisé enjambe les voies' },
    { name: 'un bouton', what: 'Le portique soulève un conteneur, un camion autonome arrive' },
    { name: 'une fleur', what: 'Le maglev de fret attend son chargement' },
    { name: 'un arbre', what: 'Projecteurs et drones : le terminal tourne jour et nuit' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(cont(25, 29, 0, CONT[0], 16, 7, 7)) },
    { from: 1, svg: WATER + F(YARD) },
    { from: 2, svg: K_LANES + F(K_CRANE) },
    { from: 3, svg: F(K_TRUCK) + F(K_HOOK) + F(K_LOAD) + glowAt(27.5, 22.5, 45, 3, CYAN) },
    { from: 4, svg: F(K_TRAIN) + glowAt(-8, 22, 3, 6, WARM) + F(K_LOAD) + F(K_TRUCK) + F(K_FRONT_LEGS) },
    {
      from: 5,
      svg: F(flood(1, 62, 50, [10, 34, 0], [26, 52, 0])) + F(flood(62, 1, 50, [40, 30, 0], [56, 46, 0]))
        + glowAt(0.4, 62, 51, 5, WARM) + glowAt(61.4, 1, 51, 5, WARM)
        + glowAt(-1, 10, 4, 5, WARM)
        + drone(70, 30, cargoLoad('#5ED1C1')) + drone(132, 26, cargoLoad('#EE6B6B'))
        + sparkle(176, 20, 0.5, CYAN),
    },
  ],
};

// ZONES-SUIVANTES

export default {
  id: 'gare',
  age: '10-12',
  label: 'Hub du futur',
  gardenName: 'Ma gare',
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
