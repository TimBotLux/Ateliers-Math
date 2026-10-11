// Thème « Forêt mystique », parcours 7-9 ans.
// Chaque zone : un sous-titre, 6 descriptions de stade et des autocollants.
// Un autocollant apparaît au stade « from » (et disparaît après « to » s'il est précisé).

import {
  S, F, glow, sparkle, fairy, elf, flower, bluebell, fern, tuft, snail, butterfly,
  shroom, pine, fox, owl,
  sleepers, branchSleepers, rails, loco, wagon, cSleepers, mRails, branchModern, powerCar, coach,
} from './common.js';

const toZone = (o) => ({ sub: o.sub, stages: o.stages.map((s) => s.what), stickers: o.stickers });

// ---------- Zone Logique (validée sur la maquette) ----------
const LOGIQUE = {
  title: 'Forêt mystique — la logique',
  sub: 'L’arbre-refuge du gardien de la forêt',
  phone: 'Mon jardin',
  bg: `
    <rect width="200" height="170" fill="url(#sky-fees79)"/>
    ${[[20, 20], [44, 38], [78, 14], [120, 26], [184, 18], [140, 48]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#E9F1E7" opacity=".8"/>`).join('')}
    <circle cx="162" cy="32" r="11" fill="#E9F1E7"/><circle cx="167" cy="28" r="10" fill="#1A4553"/>
    ${[[12, 118, 44], [34, 118, 52], [170, 118, 50], [192, 118, 40], [58, 118, 36], [146, 118, 38]].map(([x, b, h]) => pine(x, b, h, '#17404A')).join('')}
    <path d="M0 118 Q60 110 120 116 T200 112 V170 H0Z" fill="#24503F"/>
    <path d="M0 140 Q60 132 120 139 T200 136 V170 H0Z" fill="#2E6149"/>
    ${[[4, 170, 58], [196, 170, 64]].map(([x, b, h]) => pine(x, b, h, '#10303A')).join('')}`,
  stages: [
    { name: 'une graine', what: 'Un cristal de graine qui brille dans la roche' },
    { name: 'une pousse', what: 'Des champignons lumineux sortent de terre' },
    { name: 'une jeune plante', what: 'Un arbre-refuge, avec porte et fenêtre éclairée' },
    { name: 'un bouton', what: 'Marches de pierre, lanterne et champignons phosphorescents' },
    { name: 'une fleur', what: 'Des feux follets, et un renard qui monte la garde' },
    { name: 'un arbre', what: 'Plateforme, échelle de corde, hibou et pierres runiques' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 122, 18, '#5FE0D2') + F(`
        <path d="M84 144 L90 132 L110 130 L118 144Z" fill="#56666B"/>
        <path d="M90 132 L110 130 L104 136 L94 137Z" fill="#6E7F84"/>
        <path d="M100 110 L108 117 L106 130 L100 134 L94 130 L92 117Z" fill="#5FE0D2"/>
        <path d="M100 110 L100 134 L94 130 L92 117Z" fill="#3CC2B6"/>
        <path d="M92 117 L100 121 L108 117" stroke="#B8FFF6" stroke-width="1" fill="none"/>`) },
    { from: 1, to: 1, svg: F(shroom(94, 142, 1) + shroom(106, 143, .75) + shroom(114, 141, .55)) },
    { from: 2, svg: F(`
        <path d="M68 144 Q80 134 82 122 L118 122 Q120 134 134 144 Q120 139 112 144 Q100 137 88 144 Q80 139 68 144Z" fill="#4A3424"/>
        <path d="M82 126 L84 66 L116 66 L118 126Z" fill="#4A3424"/>
        <path d="M90 122 L91 72 M108 120 L109 74 M99 112 L99.5 96" stroke="#3A281B" stroke-width="1.4"/>
        <path d="M93 136 V118 a7 7 0 0 1 14 0 V136Z" fill="#2B1D14" stroke="#8C6A45" stroke-width="2"/>
        ${glow(109, 94, 8, '#FFC861')}
        <circle cx="109" cy="94" r="4.5" fill="#FFC861" stroke="#8C6A45" stroke-width="2"/>
        <path d="M56 74 L100 24 L144 74 L100 88Z" fill="#1E5B47"/>
        <path d="M56 74 L100 88 L68 92Z" fill="#184C3B"/>
        <path d="M144 74 L100 88 L132 92Z" fill="#216650"/>
        <path d="M100 24 L56 74 L82 60Z" fill="#27705A"/>
        <path d="M100 24 L144 74 L120 56Z" fill="#1A5242"/>`) },
    { from: 3, svg: F(`
        <path d="M92 147 L106 146 L108 151 L94 152Z" fill="#7F9094"/>
        <path d="M100 155 L114 154 L116 159 L102 160Z" fill="#6B7C80"/>
        <path d="M90 162 L104 161 L106 166 L92 167Z" fill="#7F9094"/>
        ${[[30, 154], [40, 156], [168, 156], [178, 154]].map(([x, y]) => `<path d="M${x} ${y} L${x - 4} ${y - 18} L${x + 1} ${y - 6} L${x + 3} ${y - 20} L${x + 4} ${y}Z" fill="#3A8A5E"/>`).join('')}
        <rect x="149" y="112" width="3" height="34" fill="#2B1D14"/>
        ${glow(150.5, 108, 9, '#FFC861')}
        <rect x="146" y="102" width="9" height="11" rx="2" fill="#FFC861" stroke="#2B1D14" stroke-width="1.5"/>`) + F(shroom(64, 150, .8) + shroom(74, 152, .6) + shroom(132, 150, .7)) },
    { from: 4, svg: `<g class="float">${[[46, 66, '#5FE0D2'], [150, 56, '#FFC861'], [176, 92, '#5FE0D2'], [30, 100, '#FFC861']].map(([x, y, c]) => glow(x, y, 6, c) + `<circle cx="${x}" cy="${y}" r="2" fill="#F4FFFC"/>`).join('')}</g>` + F(fox(166, 148)) },
    { from: 5, svg: F(`
        <rect x="64" y="100" width="22" height="4" fill="#6B4A30"/>
        <path d="M66 100 V92 M74 100 V92 M82 100 V92 M64 92 H86" stroke="#6B4A30" stroke-width="1.6"/>
        <path d="M68 104 V144 M76 104 V144" stroke="#C9B79A" stroke-width="1.2"/>
        ${[112, 120, 128, 136].map(y => `<path d="M68 ${y} H76" stroke="#C9B79A" stroke-width="1.2"/>`).join('')}
        <path d="M36 150 L38 132 L46 130 L48 150Z" fill="#5C6B70"/>
        <path d="M52 152 L53 138 L60 137 L62 152Z" fill="#5C6B70"/>`) + glow(42, 140, 6, '#5FE0D2') + glow(57, 144, 5, '#5FE0D2') + `<path d="M40 136 L44 140 L40 144 M56 141 H59 M57.5 140 V146" stroke="#8FF5EA" stroke-width="1.2" fill="none"/>` + F(owl(134, 80)) + [[60, 30], [96, 12], [30, 56]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="#E9F1E7"/>`).join('') },
  ],
};


// ---------- Outils locaux (style low-poly) ----------
const CY = '#5FE0D2';
const GOLD = '#FFC861';
const r1 = (n) => Math.round(n * 10) / 10;
const pts = (a) => a.map(([x, y]) => `${r1(x)},${r1(y)}`).join(' ');
const poly = (a, c, extra = '') => `<polygon points="${pts(a)}" fill="${c}"${extra}/>`;
// Luciole : halo + point lumineux.
const ff = (x, y, c = GOLD, r = 4) => glow(x, y, r, c) + `<circle cx="${x}" cy="${y}" r="1.2" fill="#F4FFFC"/>`;
// Reflet discret d'une lumière dans l'eau.
const softGlow = (x, y, r, c, o = 0.35) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}" filter="url(#glow)"/>`;
const stars = (list) => list.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1" fill="#E9F1E7" opacity=".85"/>`).join('');

// Pierre levée à facettes (base b, largeur w, hauteur h).
const menhir = (x, b, w, h, c = '#56666B') =>
  poly([[x - w / 2, b], [x - w * 0.42, b - h * 0.75], [x - w * 0.08, b - h], [x + w * 0.36, b - h * 0.86], [x + w / 2, b]], c) +
  poly([[x - w * 0.42, b - h * 0.75], [x - w * 0.08, b - h], [x + w * 0.36, b - h * 0.86], [x + w * 0.12, b - h * 0.66]], '#7F9094') +
  poly([[x + w * 0.36, b - h * 0.86], [x + w / 2, b], [x + w * 0.14, b], [x + w * 0.12, b - h * 0.66]], '#46555A');

// Cristal prismatique (face gauche c1, face droite c2), pivoté de rot degrés autour de sa base.
const crystal = (x, b, w, h, rot = 0, c1 = CY, c2 = '#3CC2B6') => `
  <g transform="translate(${x} ${b}) rotate(${rot})">
    ${poly([[-w / 2, 0], [-w / 2, -h * 0.75], [0, -h], [w / 2, -h * 0.75], [w / 2, 0]], c1)}
    ${poly([[0, -h], [w / 2, -h * 0.75], [w / 2, 0], [0, 0]], c2)}
    <path d="M0 ${r1(-h)} V0" stroke="#B8FFF6" stroke-width=".7" opacity=".6"/>
  </g>`;
const VIOLET = ['#A99BF0', '#7D6FD0'];
const PALE = ['#B8FFF6', '#7FD9CF'];

// Colonne de basalte hexagonale vue de face (trois faces + dessus).
const basalt = (x, top, b, w) => {
  const h2 = w * 0.22;
  return poly([[x - w / 2, top], [x - w / 4, top + h2], [x - w / 4, b], [x - w / 2, b]], '#5C6B70') +
    poly([[x - w / 4, top + h2], [x + w / 4, top + h2], [x + w / 4, b], [x - w / 4, b]], '#4A585D') +
    poly([[x + w / 4, top + h2], [x + w / 2, top], [x + w / 2, b], [x + w / 4, b]], '#3A474C') +
    poly([[x - w / 2, top], [x - w / 4, top - h2], [x + w / 4, top - h2], [x + w / 2, top], [x + w / 4, top + h2], [x - w / 4, top + h2]], '#7F9094');
};

// Grille d'hexagones tapissant l'intérieur de la géode.
const hexGrid = (cx, cy, rx, ry, R = 4.4) => {
  let s = '';
  for (let i = -7; i <= 7; i++) {
    for (let j = -5; j <= 5; j++) {
      const x = cx + i * 1.5 * R;
      const y = cy + j * Math.sqrt(3) * R + (Math.abs(i) % 2 ? (Math.sqrt(3) * R) / 2 : 0);
      const d = Math.hypot((x - cx) / rx, (y - cy) / ry);
      if (d > 1 || y > cy + ry * 0.92) continue;
      const c = d > 0.78 ? '#5FE0D2' : d > 0.55 ? '#3CC2B6' : d > 0.32 ? '#2A8E95' : '#7D6FD0';
      const hex = [0, 60, 120, 180, 240, 300].map((a) => [x + (R - 0.5) * Math.cos((a * Math.PI) / 180), y + (R - 0.5) * Math.sin((a * Math.PI) / 180)]);
      s += poly(hex, c);
    }
  }
  return s;
};

// Roue à aubes octogonale.
const waterWheel = (cx, cy, r) => {
  const n = 8;
  const A = Array.from({ length: n }, (_, i) => (i * 2 * Math.PI) / n + Math.PI / 8);
  const rim = A.map((a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  const inner = A.map((a) => [cx + r * 0.55 * Math.cos(a), cy + r * 0.55 * Math.sin(a)]);
  const paddles = A.map((a) => {
    const u = [Math.cos(a), Math.sin(a)], v = [-Math.sin(a), Math.cos(a)];
    const P = (k, s) => [cx + u[0] * r * k + v[0] * s, cy + u[1] * r * k + v[1] * s];
    return poly([P(0.92, 2.6), P(1.25, 2.6), P(1.25, -2.6), P(0.92, -2.6)], '#8C6A45');
  }).join('');
  const spokes = rim.map(([x, y]) => `M${r1(cx)} ${r1(cy)} L${r1(x)} ${r1(y)}`).join(' ');
  return `<path d="${spokes}" stroke="#4A3424" stroke-width="1.6"/>` + paddles +
    `<polygon points="${pts(rim)}" fill="none" stroke="#6B4A30" stroke-width="3"/>` +
    `<polygon points="${pts(inner)}" fill="none" stroke="#8C6A45" stroke-width="1.6"/>` +
    `<circle cx="${cx}" cy="${cy}" r="3" fill="#C99A3B"/>`;
};

// Engrenage.
const gear = (cx, cy, r, teeth = 8, c = '#C99A3B') => {
  const p = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i * 2 * Math.PI) / teeth, d = (2 * Math.PI) / teeth / 4;
    [[r, a], [r * 1.28, a + d], [r * 1.28, a + 2 * d], [r, a + 3 * d]].forEach(([rr, aa]) => p.push([cx + rr * Math.cos(aa), cy + rr * Math.sin(aa)]));
  }
  return poly(p, c) + `<circle cx="${cx}" cy="${cy}" r="${r1(r * 0.42)}" fill="#3A281B"/>`;
};

// Point d'une courbe de Bézier quadratique.
const qb = (P0, P1, P2, t) => [
  (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
  (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
];

// Petit cairn (pierres empilées).
const cairn = (x, b, s = 1) => `<g transform="translate(${x} ${b}) scale(${s})">
    ${poly([[-7, 0], [-6, -4], [6, -5], [7, 0]], '#56666B')}${poly([[-5, -4], [-4, -8], [4, -9], [5, -5]], '#6E7F84')}${poly([[-3, -8], [-1, -12], [3, -11], [3, -9]], '#7F9094')}
  </g>`;

// Piquet de bois avec corde enroulée.
const stake = (x, b) =>
  poly([[x - 2, b], [x - 3, b - 26], [x, b - 32], [x + 3, b - 26], [x + 2, b]], '#6B4A30') +
  poly([[x, b - 32], [x + 3, b - 26], [x + 2, b], [x, b]], '#4A3424') +
  `<path d="M${x - 4} ${b - 18} Q${x} ${b - 15} ${x + 4} ${b - 18} M${x - 4} ${b - 14} Q${x} ${b - 11} ${x + 4} ${b - 14}" stroke="#C9B79A" stroke-width="1.6" fill="none"/>`;

// Chevron lumineux (flèche de piste).
const chevron = (x, y, c = '#8FF5EA') => `<path d="M${x - 2} ${y - 3} L${x + 1.5} ${y} L${x - 2} ${y + 3} M${x + 2} ${y - 3} L${x + 5.5} ${y} L${x + 2} ${y + 3}" stroke="${c}" stroke-width="1.4" fill="none"/>`;

// ---------- Zone Numération : le cercle de pierres ----------
const RING = [[72, 128, 10, 22], [100, 124, 10, 24], [128, 128, 10, 22], [52, 138, 12, 28], [148, 138, 12, 28], [70, 152, 13, 30], [130, 152, 13, 30]];
const RING_ORDER = [5, 3, 0, 1, 2, 4, 6]; // tour du cercle, de l'avant-gauche à l'avant-droite
const ringTop = (i) => { const [x, b, w, h] = RING[i]; return [r1(x - w * 0.08), r1(b - h)]; };
const ringDots = () => RING_ORDER.map((i, k) => {
  const [x, b, , h] = RING[i];
  let s = glow(x - 1, b - h * 0.48, 5, CY);
  for (let d = 0; d <= k; d++) s += `<circle cx="${r1(x - 2.5 + (d % 2) * 3)}" cy="${r1(b - h * 0.6 + Math.floor(d / 2) * 3.2)}" r="1" fill="#B8FFF6"/>`;
  return s;
}).join('');

const NUMERATION = {
  sub: 'Le cercle de pierres',
  stages: [
    { name: 'une graine', what: 'Un galet lumineux posé sur une dalle' },
    { name: 'une pousse', what: 'Quelques pierres se rassemblent autour de lui' },
    { name: 'une jeune plante', what: 'Un cercle de pierres levées autour de l’autel' },
    { name: 'un bouton', what: 'Des marques gravées s’allument : une, deux, trois…' },
    { name: 'une fleur', what: 'Des rayons de lumière relient les pierres' },
    { name: 'un arbre', what: 'Le cercle complet, ses orbes flottants et son renard gardien' },
  ],
  stickers: [
    { from: 0, to: 1, svg: glow(100, 132, 16, CY) + F(
      poly([[84, 148], [88, 140], [112, 139], [118, 148]], '#56666B') +
      poly([[88, 140], [112, 139], [108, 143], [92, 144]], '#7F9094') +
      poly([[92, 138], [96, 131], [104, 130], [109, 135], [105, 140], [95, 140]], CY) +
      poly([[96, 131], [104, 130], [109, 135], [100, 136]], '#B8FFF6') +
      poly([[92, 138], [100, 136], [105, 140], [95, 140]], '#3CC2B6')) },
    { from: 1, to: 1, svg: F(menhir(68, 148, 10, 13) + menhir(82, 140, 8, 10) + menhir(120, 140, 8, 11) + menhir(134, 148, 10, 14)) },
    { from: 2, svg: `<ellipse cx="100" cy="138" rx="58" ry="14" fill="#1F4536"/>` + F(
      [0, 1, 2].map((i) => menhir(...RING[i])).join('') +
      poly([[84, 144], [88, 135], [112, 135], [116, 144]], '#56666B') +
      poly([[88, 135], [112, 135], [108, 138], [92, 138]], '#7F9094')) +
      glow(100, 128, 10, CY) + F(
      poly([[95, 133], [98, 127], [103, 127], [106, 131], [102, 135], [97, 135]], CY) +
      poly([[98, 127], [103, 127], [106, 131], [100, 131]], '#B8FFF6') +
      [3, 4, 5, 6].map((i) => menhir(...RING[i])).join('')) },
    { from: 3, svg: ringDots() },
    { from: 4, svg: `<polygon points="94,134 106,134 112,56 88,56" fill="${CY}" opacity=".14"/>` +
      `<path d="${RING_ORDER.map((i, k) => `${k ? 'L' : 'M'}${ringTop(i).join(' ')}`).join(' ')} Z" stroke="${CY}" stroke-width="1.2" fill="none" opacity=".55"/>` +
      RING_ORDER.map((i) => { const [x, y] = ringTop(i); return glow(x, y, 4, CY) + `<circle cx="${x}" cy="${y}" r="1.3" fill="#F4FFFC"/>`; }).join('') },
    { from: 5, svg: `<g class="float">${[[64, 74, CY], [100, 46, GOLD], [136, 72, CY], [36, 96, GOLD], [118, 60, CY], [82, 62, GOLD]].map(([x, y, c]) => ff(x, y, c, 6)).join('')}</g>` +
      F(fox(176, 156)) + F(shroom(30, 158, .7) + shroom(40, 160, .5)) + stars([[30, 40], [58, 22], [112, 18], [190, 50]]) },
  ],
};

// ---------- Zone Calcul : la cascade et la roue ----------
const CALCUL = {
  sub: 'La cascade et la roue',
  stages: [
    { name: 'une graine', what: 'Un rocher d’où perlent quelques gouttes' },
    { name: 'une pousse', what: 'Les gouttes forment un petit ruisseau' },
    { name: 'une jeune plante', what: 'Une cascade tombe de la falaise' },
    { name: 'un bouton', what: 'Une roue à aubes tourne dans le courant' },
    { name: 'une fleur', what: 'Un canal lumineux alimente la roue' },
    { name: 'un arbre', what: 'Eau phosphorescente, brume et lucioles' },
  ],
  stickers: [
    { from: 0, to: 1, svg: F(
      poly([[50, 146], [54, 124], [68, 110], [86, 114], [96, 128], [98, 146]], '#56666B') +
      poly([[54, 124], [68, 110], [86, 114], [72, 122]], '#7F9094') +
      poly([[86, 114], [96, 128], [98, 146], [84, 146], [80, 126]], '#46555A') +
      poly([[64, 112], [68, 110], [86, 114], [76, 117]], '#27705A')) +
      glow(102, 146, 6, CY) + `<ellipse cx="102" cy="146" rx="8" ry="2" fill="#3FA9B0"/>` +
      [[99, 130], [100, 138]].map(([x, y]) => `<path d="M${x} ${y - 3} L${x + 1.6} ${y + 0.8} Q${x} ${y + 2.6} ${x - 1.6} ${y + 0.8}Z" fill="${CY}"/>`).join('') },
    { from: 1, svg: `<path d="M94 142 Q120 136 146 142 T200 146 V156 Q170 154 146 152 T94 148Z" fill="#2B7C86"/>` +
      `<path d="M108 142 L122 140.5 M140 146 L156 147 M170 151 L186 151" stroke="#8FE8E0" stroke-width="1" opacity=".6"/>` },
    { from: 2, svg: F(
      poly([[30, 150], [34, 98], [46, 72], [64, 64], [82, 68], [96, 76], [98, 150]], '#56666B') +
      poly([[46, 72], [64, 64], [82, 68], [68, 80]], '#7F9094') +
      poly([[34, 98], [46, 72], [68, 80], [54, 102]], '#6E7F84') +
      poly([[82, 68], [96, 76], [98, 150], [88, 150], [84, 104]], '#46555A') +
      poly([[42, 78], [64, 62], [84, 66], [70, 72], [50, 80]], '#27705A') +
      poly([[92, 74], [102, 76], [106, 142], [92, 142]], '#3FA9B0') +
      `<path d="M95 80 L96 136 M99 82 L101 138 M103 90 L104 132" stroke="#B8FFF6" stroke-width=".9" opacity=".8"/>` +
      `<ellipse cx="99" cy="142" rx="11" ry="3" fill="#CFFFF8" opacity=".75"/>`) },
    { from: 3, svg: F(`<path d="M118 152 L130 126 L142 152" stroke="#3A281B" stroke-width="3" fill="none"/>` + waterWheel(130, 126, 17)) },
    { from: 4, svg: F(
      poly([[104, 102], [110, 102], [111, 142], [103, 142]], '#56666B') +
      poly([[103, 96], [130, 96], [130, 102], [103, 102]], '#6E7F84') +
      poly([[103, 96], [130, 96], [128, 93], [105, 93]], '#7F9094')) +
      glow(116, 94, 7, CY) + `<rect x="105" y="93" width="23" height="2.4" fill="${CY}"/>` +
      `<path d="M127 94 Q134 97 133 107 L130 107 Q131 99 125 97Z" fill="${CY}" opacity=".9"/>` + glow(131, 106, 5, CY) },
    { from: 5, svg: glow(99, 100, 7, CY) + glow(99, 126, 7, CY) + glow(99, 142, 9, '#B8FFF6') +
      `<g class="smoke"><ellipse cx="96" cy="138" rx="14" ry="5" fill="#CFFFF8" opacity=".3"/></g>` +
      `<path d="M112 145 L124 143.5 M150 148 L164 149 M176 152 L192 152" stroke="#8FF5EA" stroke-width="1.4" opacity=".9"/>` +
      F(shroom(40, 158, .8) + shroom(52, 160, .55) + shroom(160, 164, .6)) +
      `<g class="float">${[[40, 54, GOLD], [120, 66, CY], [150, 82, GOLD], [70, 46, CY], [176, 106, GOLD]].map(([x, y, c]) => ff(x, y, c, 5)).join('')}</g>` },
  ],
};

// ---------- Zone Géométrie : la géode hexagonale ----------
const GEOMETRIE = {
  sub: 'La géode hexagonale',
  stages: [
    { name: 'une graine', what: 'Un éclat de cristal pointe hors de la roche' },
    { name: 'une pousse', what: 'Une grappe de cristaux de toutes tailles' },
    { name: 'une jeune plante', what: 'Une géode ouverte, tapissée d’hexagones' },
    { name: 'un bouton', what: 'Des orgues de basalte aux colonnes hexagonales' },
    { name: 'une fleur', what: 'Les cristaux diffractent la lumière en triangles' },
    { name: 'un arbre', what: 'L’entrée de la grotte de cristal, tout illuminée' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 122, 16, CY) + F(
      poly([[84, 146], [90, 136], [110, 135], [118, 146]], '#56666B') + poly([[90, 136], [110, 135], [104, 139], [94, 140]], '#6E7F84') +
      crystal(100, 140, 12, 34)) },
    { from: 1, to: 1, svg: glow(100, 120, 20, CY) + F(
      poly([[74, 148], [82, 138], [118, 137], [128, 148]], '#56666B') + poly([[82, 138], [118, 137], [110, 141], [88, 142]], '#6E7F84') +
      crystal(88, 142, 8, 24, -25, ...VIOLET) + crystal(113, 142, 8, 26, 22) + crystal(80, 144, 6, 14, -45, ...PALE) +
      crystal(121, 144, 6, 16, 40, ...VIOLET) + crystal(100, 142, 11, 38)) },
    { from: 2, svg: F(
      poly([[58, 142], [56, 112], [68, 88], [100, 76], [132, 88], [144, 112], [142, 142]], '#4A585D') +
      poly([[56, 112], [68, 88], [100, 76], [84, 92], [66, 112]], '#6E7F84') +
      poly([[132, 88], [144, 112], [142, 142], [132, 142], [134, 112]], '#3A474C') +
      poly([[70, 138], [68, 114], [78, 96], [100, 88], [122, 96], [132, 114], [130, 138]], '#1B2F3F') +
      hexGrid(100, 115, 29, 24)) + glow(100, 117, 9, VIOLET[0]) + F(
      poly([[52, 150], [60, 138], [140, 138], [148, 150]], '#56666B') + poly([[60, 138], [140, 138], [136, 141], [64, 141]], '#7F9094') +
      crystal(64, 146, 7, 18, -20) + crystal(137, 146, 7, 20, 18, ...VIOLET) + crystal(72, 147, 5, 10, -40, ...PALE)) },
    { from: 3, svg: F(basalt(26, 108, 152, 12) + basalt(38, 96, 152, 12) + basalt(50, 106, 152, 12) +
      basalt(150, 106, 152, 12) + basalt(162, 94, 152, 12) + basalt(174, 104, 152, 12)) },
    { from: 4, svg: [[[40, 52], [52, 44], CY], [[92, 30], [106, 30], VIOLET[0]], [[146, 70], [152, 80], GOLD], [[28, 90], [30, 102], GOLD], [[170, 120], [168, 130], CY]]
      .map(([a, b, c]) => `<polygon points="100,116 ${a.join(',')} ${b.join(',')}" fill="${c}" opacity=".2"/>`).join('') +
      `<g class="float">${[[58, 66, CY], [140, 64, VIOLET[0]], [120, 42, GOLD], [76, 40, CY]].map(([x, y, c]) => glow(x, y, 5, c) + poly([[x, y - 4], [x + 3.5, y + 2.5], [x - 3.5, y + 2.5]], '#F4FFFC')).join('')}</g>` },
    { from: 5, svg: `<circle cx="100" cy="112" r="46" fill="${CY}" opacity=".12" filter="url(#glow)"/>` + F(
      poly([[8, 88], [16, 64], [44, 50], [80, 42], [112, 42], [134, 48], [146, 60], [148, 72], [132, 66], [116, 70], [100, 64], [82, 70], [64, 66], [46, 74], [30, 72], [16, 90]], '#2E3B40') +
      poly([[16, 64], [44, 50], [80, 42], [112, 42], [134, 48], [100, 52], [60, 56], [30, 66]], '#3E4D52') +
      [[46, 72, 6, 14], [64, 66, 7, 18, ...VIOLET], [82, 69, 6, 12], [100, 64, 8, 20, ...VIOLET], [116, 69, 6, 14], [132, 65, 6, 11, ...PALE]]
        .map(([x, b, w, h, c1, c2]) => crystal(x, b, w, h, 180, c1, c2)).join('')) +
      glow(100, 80, 6, VIOLET[0]) + glow(64, 80, 5, CY) +
      [[26, 98], [38, 86], [162, 84], [174, 94]].map(([x, y]) => glow(x, y, 4, CY) + F(crystal(x, y, 4, 9, 0, ...PALE))).join('') +
      `<g class="float">${[[30, 120], [172, 126], [86, 98], [118, 100]].map(([x, y]) => ff(x, y, CY, 4)).join('')}</g>` },
  ],
};

// ---------- Zone Attention : le lac aux reflets ----------
const reed = (x, b, h, lean = 2) => poly([[x - 1.2, b], [x + lean, b - h], [x + 1.2, b]], '#3A8A5E') +
  `<rect x="${r1(x + lean * 0.7 - 1.3)}" y="${r1(b - h * 0.78)}" width="2.6" height="6" rx="1.3" fill="#6B4A30"/>`;
const pad = (x, y, r) => {
  const p = [[x, y]];
  for (let a = 25; a <= 335; a += 31) p.push([x + r * Math.cos((a * Math.PI) / 180), y + r * 0.42 * Math.sin((a * Math.PI) / 180)]);
  return poly(p, '#2F7A55') + poly([[x, y], p[3], p[4], p[5]], '#3A8A5E');
};
const STAG = `
    ${poly([[84, 100], [108, 98], [114, 104], [112, 110], [88, 111], [82, 106]], '#465C63')}
    ${poly([[84, 100], [108, 98], [114, 104], [96, 104]], '#5F7A82')}
    ${poly([[82, 102], [78, 100], [81, 105]], '#465C63')}
    <path d="M88 110 L87 121 M92 110 L93 121 M106 109 L106 120 M110 109 L111 120" stroke="#465C63" stroke-width="2.2"/>
    ${poly([[106, 99], [113, 101], [122, 114], [117, 116]], '#4F666D')}
    ${poly([[117, 114], [124, 113], [128, 121], [125, 123], [119, 119]], '#5A747C')}
    <path d="M119 113 L112 106 L106 104 M112 106 L111 100 M121 112 L118 104 L113 100 M118 104 L121 99" stroke="#D8C6A4" stroke-width="1.4" fill="none"/>`;
const ATTENTION = {
  sub: 'Le lac aux reflets',
  stages: [
    { name: 'une graine', what: 'Une flaque où brille un reflet de lune' },
    { name: 'une pousse', what: 'Un lac immobile, miroir de la forêt' },
    { name: 'une jeune plante', what: 'Roseaux et nénuphars sur la rive' },
    { name: 'un bouton', what: 'Un cerf vient boire sans un bruit' },
    { name: 'une fleur', what: 'Des lucioles dansent et se reflètent dans l’eau' },
    { name: 'un arbre', what: 'Le lac sous la lune, et une barque-lanterne' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(poly([[78, 144], [88, 139], [108, 138], [122, 142], [112, 148], [90, 149]], '#1F5363') +
      poly([[88, 139], [108, 138], [122, 142], [100, 142]], '#2B6C78') +
      poly([[120, 146], [124, 140], [132, 140], [134, 147]], '#6E7F84')) +
      `<ellipse cx="104" cy="144" rx="4" ry="1.3" fill="#E9F1E7" opacity=".8"/>` + softGlow(104, 144, 5, '#E9F1E7', 0.4) + reed(82, 144, 14) + reed(86, 144, 10, -2) },
    { from: 1, svg: poly([[30, 140], [44, 128], [80, 122], [124, 122], [158, 128], [172, 140], [158, 152], [118, 158], [76, 158], [42, 152]], '#1F5363') +
      poly([[44, 128], [80, 122], [124, 122], [158, 128], [120, 132], [80, 132]], '#2B6C78') +
      [70, 136, 52].map((x) => poly([[x - 6, 124], [x, 138], [x + 6, 124]], '#17404A', ' opacity=".55"')).join('') +
      `<ellipse cx="152" cy="131" rx="5" ry="1.5" fill="#E9F1E7" opacity=".75"/><path d="M146 135 H158 M148 138 H156" stroke="#E9F1E7" stroke-width=".8" opacity=".45"/>` +
      F(poly([[36, 150], [40, 145], [50, 146], [52, 152]], '#6E7F84') + poly([[150, 158], [154, 152], [164, 153], [166, 159]], '#56666B')) },
    { from: 2, svg: F(reed(30, 148, 26) + reed(35, 150, 32, -2) + reed(41, 147, 22, 3) + reed(166, 146, 28, -2) + reed(171, 148, 22, 3) +
      pad(60, 150, 7) + pad(78, 154, 5) + pad(146, 152, 6)) +
      glow(60, 147, 5, CY) + poly([[57, 149], [60, 143], [63, 149]], '#F4EDE4') + poly([[55, 149], [57, 145], [60, 149]], '#B8FFF6') + poly([[60, 149], [63, 145], [65, 149]], '#B8FFF6') },
    { from: 3, svg: `<g transform="translate(0 246) scale(1 -1)" opacity=".22">${STAG}</g>` + F(STAG) +
      `<ellipse cx="126" cy="124" rx="4" ry="1" fill="none" stroke="#8FF5EA" stroke-width=".7" opacity=".7"/><ellipse cx="126" cy="124.5" rx="8" ry="2" fill="none" stroke="#8FF5EA" stroke-width=".6" opacity=".45"/>` },
    { from: 4, svg: [[56, 112, GOLD], [74, 104, CY], [140, 108, GOLD], [148, 116, CY], [118, 96, GOLD]].map(([x, y, c]) => softGlow(x, 248 - y, 3, c, 0.5) + `<circle cx="${x}" cy="${248 - y}" r="1" fill="${c}" opacity=".6"/>`).join('') +
      `<g class="float">${[[56, 112, GOLD], [74, 104, CY], [140, 108, GOLD], [148, 116, CY], [118, 96, GOLD]].map(([x, y, c]) => ff(x, y, c, 5)).join('')}</g>` },
    { from: 5, svg: `<g class="smoke"><path d="M34 126 Q64 118 96 125 T160 124 Q130 130 96 129 T34 126Z" fill="#CFE8E4" opacity=".18"/></g>` +
      `<path d="M142 140 H150 M154 140 H162 M146 144 H156 M150 148 H158" stroke="#E9F1E7" stroke-width=".9" opacity=".55"/>` +
      softGlow(130, 153, 4, GOLD, 0.45) + F(
      poly([[118, 140], [150, 140], [144, 146], [124, 146]], '#4A3424') + poly([[118, 140], [150, 140], [148, 138], [120, 138]], '#6B4A30') +
      `<path d="M124 138 V120 H129" stroke="#2B1D14" stroke-width="1.4" fill="none"/>`) +
      glow(130, 125, 8, GOLD) + F(`<rect x="127" y="121" width="6" height="8" rx="1.5" fill="${GOLD}" stroke="#2B1D14" stroke-width="1.2"/>`) +
      stars([[30, 40], [60, 24], [104, 16], [122, 44], [190, 52]]) },
  ],
};

// ---------- Zone Mémoire : l'observatoire des étoiles ----------
const lens = (x, y) => glow(x, y, 11, CY) + F(`<path d="M${x - 4} ${y + 14} L${x} ${y + 7} L${x + 4} ${y + 14}" stroke="#8C6A45" stroke-width="1.6" fill="none"/>` +
  `<circle cx="${x}" cy="${y}" r="8" fill="#C99A3B"/><circle cx="${x}" cy="${y}" r="5.8" fill="#3FD0C0"/>` +
  poly([[x - 4, y - 2], [x - 1, y - 5], [x + 1, y - 4], [x - 3, y]], '#B8FFF6'));
const constellation = (list, closed = false) =>
  `<path d="${list.map(([x, y], k) => `${k ? 'L' : 'M'}${x} ${y}`).join(' ')}${closed ? ' Z' : ''}" stroke="#8FF5EA" stroke-width=".8" fill="none" opacity=".65"/>` +
  list.map(([x, y]) => glow(x, y, 3, CY) + `<circle cx="${x}" cy="${y}" r="1.4" fill="#F4FFFC"/>`).join('');
const MEMOIRE = {
  sub: 'L’observatoire des étoiles',
  stages: [
    { name: 'une graine', what: 'Une lentille de cristal trouvée dans la mousse' },
    { name: 'une pousse', what: 'Un socle de pierre pour l’accueillir' },
    { name: 'une jeune plante', what: 'Une petite tour ronde sort de terre' },
    { name: 'un bouton', what: 'La coupole s’ouvre sur une lunette' },
    { name: 'une fleur', what: 'Les constellations se dessinent dans le ciel' },
    { name: 'un arbre', what: 'L’observatoire éclairé, gardé par le hibou' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(poly([[86, 148], [90, 138], [110, 137], [116, 148]], '#56666B') + poly([[90, 138], [110, 137], [106, 141], [94, 141]], '#7F9094')) + lens(100, 124) },
    { from: 1, svg: F(
      poly([[58, 150], [64, 140], [136, 140], [142, 150]], '#56666B') + poly([[64, 140], [136, 140], [132, 136], [68, 136]], '#7F9094') +
      poly([[72, 136], [76, 128], [124, 128], [128, 136]], '#6E7F84') + poly([[76, 128], [124, 128], [120, 125], [80, 125]], '#8FA0A4') +
      `<path d="M84 140 V150 M102 140 V150 M120 140 V150 M90 128 V136 M110 128 V136" stroke="#46555A" stroke-width="1"/>`) },
    { from: 1, to: 1, svg: lens(100, 111) },
    { from: 2, svg: F(
      `<rect x="80" y="92" width="6" height="36" fill="#4A585D"/><rect x="86" y="92" width="12" height="36" fill="#6E7F84"/>` +
      `<rect x="98" y="92" width="12" height="36" fill="#7F9094"/><rect x="110" y="92" width="10" height="36" fill="#56666B"/>` +
      `<path d="M80 104 H120 M80 116 H120 M92 92 V104 M106 104 V116 M88 116 V128" stroke="#46555A" stroke-width=".8" opacity=".7"/>` +
      `<path d="M95 128 V119 L100 114 L105 119 V128Z" fill="#2B1D14" stroke="#8C6A45" stroke-width="1.4"/>` +
      `<rect x="78" y="89" width="44" height="4" fill="#3A4A50"/>`) + glow(90, 103, 6, GOLD) + `<rect x="88" y="100" width="4.5" height="7" fill="${GOLD}"/>` },
    { from: 2, to: 2, svg: F(poly([[80, 89], [84, 78], [92, 70], [100, 68], [108, 70], [116, 78], [120, 89]], '#3E6F77') +
      poly([[80, 89], [84, 78], [92, 70], [100, 68], [100, 89]], '#4B8790') + `<path d="M92 70 L92 89 M108 70 L108 89" stroke="#2F5A61" stroke-width=".8"/>`) },
    { from: 3, svg: F(`<rect x="97" y="68" width="6" height="21" fill="#1B2F3F"/>` +
      poly([[80, 89], [84, 78], [92, 70], [97, 68], [97, 89]], '#4B8790') + poly([[103, 89], [103, 68], [108, 70], [116, 78], [120, 89]], '#3E6F77') +
      `<g transform="translate(100 84) rotate(-130)"><rect x="0" y="-3.5" width="34" height="7" fill="#8C6A45"/><rect x="0" y="-3.5" width="34" height="3" fill="#A88257"/>` +
      `<rect x="31" y="-5" width="5" height="10" fill="#C99A3B"/><rect x="12" y="-4.5" width="3" height="9" fill="#C99A3B"/></g>`) + glow(77, 56, 5, CY) },
    { from: 4, svg: constellation([[22, 30], [34, 22], [48, 26], [56, 16], [68, 20]]) + constellation([[48, 26], [44, 40]]) +
      constellation([[96, 14], [114, 24], [102, 36]], true) + constellation([[114, 24], [130, 14]]) },
    { from: 5, svg: glow(108, 111, 6, GOLD) + `<rect x="106" y="108" width="4.5" height="7" fill="${GOLD}"/>` + glow(100, 124, 5, GOLD) +
      F(poly([[140, 150], [142, 120], [150, 118], [152, 150]], '#56666B') + poly([[142, 120], [150, 118], [148, 124], [143, 125]], '#7F9094') + owl(146, 110)) +
      F(`<rect x="61" y="124" width="2" height="14" fill="#2B1D14"/>`) + glow(62, 120, 7, GOLD) + F(`<rect x="58.5" y="116" width="7" height="8" rx="1.5" fill="${GOLD}" stroke="#2B1D14" stroke-width="1.2"/>`) +
      `<path d="M138 10 L118 20" stroke="#F4FFFC" stroke-width="1" opacity=".7"/><circle cx="118" cy="20" r="1.4" fill="#F4FFFC"/>` +
      stars([[16, 56], [76, 10], [134, 40], [190, 56], [40, 64]]) },
  ],
};

// ---------- Zone Espace : le pont suspendu ----------
const DECK = [[66, 101], [100, 120], [134, 99]];
const RAIL = [[66, 85], [100, 104], [134, 83]];
const bridge = () => {
  let s = '';
  for (let t = 0.06; t < 0.97; t += 0.08) {
    const [x, y] = qb(...DECK, t), [hx, hy] = qb(...RAIL, t);
    s += `<path d="M${r1(hx)} ${r1(hy)} L${r1(x)} ${r1(y)}" stroke="#C9B79A" stroke-width=".7"/>`;
    s += `<rect x="${r1(x - 1.6)}" y="${r1(y - 1)}" width="3.2" height="3.6" fill="#8C6A45"/>`;
  }
  return s + `<path d="M66 101 Q100 120 134 99" stroke="#6B4A30" stroke-width="1.5" fill="none"/>` +
    `<path d="M66 85 Q100 104 134 83" stroke="#C9B79A" stroke-width="1.4" fill="none"/>` +
    `<path d="M64 102 L65 82 L68 82 L69 102Z M132 100 L133 80 L136 80 L137 100Z" fill="#4A3424"/>`;
};
const ESPACE = {
  sub: 'Le pont suspendu',
  stages: [
    { name: 'une graine', what: 'Un piquet et une corde, prêts pour l’expédition' },
    { name: 'une pousse', what: 'Des cairns balisent le sentier' },
    { name: 'une jeune plante', what: 'Deux falaises, et un gouffre entre elles' },
    { name: 'un bouton', what: 'Un pont de corde franchit le vide' },
    { name: 'une fleur', what: 'Des flèches lumineuses indiquent la route' },
    { name: 'un arbre', what: 'La rose des vents, un voyageur et sa lanterne' },
  ],
  stickers: [
    { from: 0, to: 1, svg: F(stake(100, 146) + poly([[110, 148], [113, 142], [121, 142], [124, 148]], '#6E7F84') +
      `<path d="M102 142 Q114 148 128 144 Q140 141 148 148" stroke="#C9B79A" stroke-width="1.6" fill="none"/>`) },
    { from: 1, to: 1, svg: F(cairn(48, 152, 1.1) + cairn(70, 140, .9) + cairn(132, 136, .8) + cairn(156, 150, 1.1)) +
      `<path d="M44 160 Q70 146 100 150 T158 140" stroke="#3E7A5C" stroke-width="5" fill="none" opacity=".5"/>` },
    { from: 2, svg: poly([[66, 100], [134, 98], [136, 170], [64, 170]], '#0F2A33') + poly([[68, 132], [132, 132], [134, 170], [66, 170]], '#0A1F27') +
      `<g class="smoke"><ellipse cx="100" cy="134" rx="30" ry="5" fill="#CFE8E4" opacity=".15"/></g>` + F(
      poly([[0, 170], [0, 102], [18, 96], [50, 94], [70, 100], [74, 124], [68, 170]], '#3E4D52') +
      poly([[0, 102], [18, 96], [50, 94], [70, 100], [52, 105], [20, 105]], '#2F6B4E') +
      poly([[52, 105], [70, 100], [74, 124], [68, 170], [56, 170], [60, 122]], '#33424A') +
      poly([[0, 120], [20, 112], [40, 118], [30, 140], [0, 146]], '#4C5C62') +
      poly([[200, 170], [200, 98], [176, 92], [148, 94], [130, 98], [126, 122], [132, 170]], '#3E4D52') +
      poly([[200, 98], [176, 92], [148, 94], [130, 98], [150, 103], [184, 103]], '#2F6B4E') +
      poly([[130, 98], [150, 103], [142, 126], [144, 170], [132, 170], [126, 122]], '#33424A') +
      poly([[200, 116], [176, 110], [160, 120], [170, 144], [200, 150]], '#4C5C62')) },
    { from: 3, svg: F(bridge()) },
    { from: 4, svg: F(`<path d="M34 98 V80" stroke="#6B4A30" stroke-width="2.5"/>` + poly([[26, 78], [40, 78], [45, 82], [40, 86], [26, 86]], '#6B4A30') +
      [[150, 98], [166, 96]].map(([x, b]) => poly([[x - 6, b], [x - 5, b - 9], [x + 5, b - 10], [x + 7, b]], '#6E7F84')).join('')) +
      glow(34, 82, 6, CY) + chevron(31, 82) + [[150, 98], [166, 96]].map(([x, b]) => glow(x, b - 5, 5, CY) + chevron(x - 2, b - 5)).join('') +
      glow(52, 99, 4, CY) + chevron(50, 99) },
    { from: 5, svg: F(poly([[18, 132], [24, 126], [34, 125], [42, 130], [43, 140], [37, 147], [26, 148], [18, 142]], '#7F9094')) +
      glow(30, 137, 9, CY) +
      poly([[30, 127], [32, 135], [30, 137], [28, 135]], '#8FF5EA') + poly([[30, 147], [28, 139], [30, 137], [32, 139]], '#3FD0C0') +
      poly([[20, 137], [28, 135], [30, 137], [28, 139]], '#3FD0C0') + poly([[40, 137], [32, 139], [30, 137], [32, 135]], '#8FF5EA') +
      poly([[24, 131], [29.5, 136], [30, 137], [29, 136.5]], '#B8FFF6') + poly([[36, 143], [30.5, 138], [30, 137], [31, 137.5]], '#B8FFF6') +
      poly([[36, 131], [31, 136.5], [30, 137], [30.5, 136]], '#B8FFF6') + poly([[24, 143], [29, 137.5], [30, 137], [29.5, 138]], '#B8FFF6') +
      F(poly([[94, 111], [96.5, 97], [100, 94], [103.5, 97], [106, 111]], '#B85417') + poly([[100, 94], [103.5, 97], [106, 111], [100, 111]], '#8C3F12') +
        poly([[97, 97.5], [100, 88], [103, 97.5]], '#6B4A30') + `<circle cx="100" cy="95.5" r="1.6" fill="#EFC7A6"/>` +
        `<path d="M104 102 L109 96" stroke="#6B4A30" stroke-width="1.2"/>`) +
      glow(109, 99, 6, GOLD) + `<rect x="107.5" y="96.5" width="3.4" height="4.6" rx="1" fill="${GOLD}"/>` +
      F(fox(192, 96)) +
      `<g class="float">${[[52, 60, CY], [86, 50, GOLD], [128, 62, CY], [20, 74, GOLD]].map(([x, y, c]) => ff(x, y, c, 5)).join('')}</g>` },
  ],
};

// ---------- Zone Problèmes : la forge de l'inventeur ----------
const flames = (x, b, s = 1) => `<g transform="translate(${x} ${b}) scale(${s})">
    ${poly([[-9, 0], [-6, -12], [-3, -6], [0, -18], [3, -6], [6, -13], [9, 0]], '#E0762B')}
    ${poly([[-5, 0], [-2, -8], [0, -4], [2, -10], [5, 0]], GOLD)}
  </g>`;
const PROBLEMES = {
  sub: 'La forge de l’inventeur',
  stages: [
    { name: 'une graine', what: 'Une enclume posée sur une pierre' },
    { name: 'une pousse', what: 'Un petit feu de camp crépite' },
    { name: 'une jeune plante', what: 'Une forge de pierre et sa haute cheminée' },
    { name: 'un bouton', what: 'Engrenages et outils rangés sur le râtelier' },
    { name: 'une fleur', what: 'Un automate amical prend vie' },
    { name: 'un arbre', what: 'L’atelier tout illuminé, pluie d’étincelles' },
  ],
  stickers: [
    { from: 0, svg: F(
      poly([[108, 148], [112, 136], [132, 136], [136, 148]], '#56666B') + poly([[112, 136], [132, 136], [130, 140], [114, 140]], '#6E7F84') +
      poly([[100, 122], [142, 122], [138, 128], [130, 129], [128, 136], [116, 136], [114, 129], [106, 128]], '#3E4A50') +
      poly([[100, 122], [142, 122], [140, 119], [104, 119]], '#7F9094') + poly([[100, 122], [90, 123], [104, 127]], '#3E4A50')) },
    { from: 0, to: 3, svg: glow(121, 117, 6, GOLD) + F(poly([[116, 119], [118, 115], [125, 115], [127, 119]], GOLD)) },
    { from: 1, to: 1, svg: glow(57, 136, 12, GOLD) + F(flames(57, 146) +
      [[46, 148], [53, 150], [61, 150], [68, 148]].map(([x, y]) => poly([[x - 4, y], [x - 3, y - 4], [x + 3, y - 4], [x + 4, y]], '#6E7F84')).join('')) },
    { from: 2, svg: F(
      poly([[28, 150], [30, 102], [84, 102], [86, 150]], '#56666B') + poly([[30, 102], [42, 102], [41, 150], [28, 150]], '#6E7F84') +
      poly([[26, 102], [88, 102], [84, 96], [30, 96]], '#7F9094') +
      poly([[46, 96], [48, 46], [64, 46], [66, 96]], '#4A585D') + poly([[46, 96], [48, 46], [54, 46], [53, 96]], '#5C6B70') +
      poly([[44, 46], [68, 46], [66, 42], [46, 42]], '#3A474C') +
      `<path d="M30 114 H84 M30 126 H40 M76 126 H86 M48 60 H64 M48 76 H64 M60 102 V114" stroke="#46555A" stroke-width=".8" opacity=".7"/>` +
      poly([[40, 148], [40, 128], [48, 118], [66, 118], [74, 128], [74, 148]], '#1B1410')) +
      glow(57, 138, 13, GOLD) + glow(57, 142, 8, '#E0762B') + flames(57, 148, .9) +
      `<g class="smoke"><circle cx="56" cy="36" r="5" fill="#9FB3B5" opacity=".35"/><circle cx="62" cy="28" r="6" fill="#9FB3B5" opacity=".25"/></g>` },
    { from: 3, svg: F(`<path d="M152 150 V100 M188 150 V100" stroke="#4A3424" stroke-width="3"/><path d="M150 104 H190 M150 128 H190" stroke="#6B4A30" stroke-width="3"/>` +
      `<path d="M158 105 V122" stroke="#8C6A45" stroke-width="1.6"/><rect x="154" y="120" width="8" height="5" fill="#56666B"/>` +
      `<path d="M166 105 L172 122 M172 105 L166 122" stroke="#56666B" stroke-width="1.4"/>` +
      `<path d="M181 105 V118" stroke="#7F9094" stroke-width="2"/><circle cx="181" cy="120" r="3" fill="none" stroke="#7F9094" stroke-width="1.8"/>` +
      `<rect x="174" y="119" width="10" height="8" fill="#6B4A30"/>` + gear(162, 122, 4, 6, '#8C6A45') +
      gear(162, 88, 8, 8) + gear(178, 82, 5.5, 6, '#8C6A45')) },
    { from: 4, svg: F(`<g transform="translate(26 160)">
        <path d="M-6 0 V-10 M6 0 V-10" stroke="#3E4A50" stroke-width="3"/>
        ${poly([[-10, -10], [-11, -28], [11, -28], [10, -10]], '#C99A3B')}
        ${poly([[-11, -28], [0, -28], [0, -10], [-10, -10]], '#D9AE55')}
        ${poly([[-8, -28], [-9, -40], [0, -44], [9, -40], [8, -28]], '#7F9094')}
        ${poly([[-9, -40], [0, -44], [0, -28], [-8, -28]], '#8FA0A4')}
        <rect x="-6" y="-38" width="12" height="4" rx="2" fill="#1B2F3F"/>
        <path d="M0 -44 V-49" stroke="#3E4A50" stroke-width="1.4"/>
        <path d="M-11 -24 L-17 -32 M11 -24 L17 -16" stroke="#3E4A50" stroke-width="3"/>
      </g>` + gear(26, 141, 3.2, 6, '#8C6A45')) +
      glow(26, 124, 5, CY) + `<rect x="21" y="123" width="10" height="2" rx="1" fill="${CY}"/>` + glow(26, 111, 4, GOLD) + `<circle cx="26" cy="111" r="1.8" fill="${GOLD}"/>` },
    { from: 5, svg: glow(121, 117, 7, '#E0762B') + F(poly([[110, 119], [112, 116], [132, 116], [134, 119]], '#FF9A4A') + poly([[112, 116], [132, 116], [130, 114.5], [114, 114.5]], GOLD)) +
      F(`<path d="M142 118 L134 102" stroke="#6B4A30" stroke-width="2"/>` + poly([[129, 100], [137, 96], [140, 102], [132, 106]], '#56666B')) +
      [[112, 106, 1], [124, 100, .8], [136, 110, .6], [104, 112, .7], [118, 94, .5], [130, 92, .6]].map(([x, y, s], k) => sparkle(x, y, s, k % 2 ? GOLD : '#FF9A4A')).join('') +
      `<path d="M66 70 Q110 86 152 100" stroke="#2B1D14" stroke-width=".8" fill="none"/>` +
      [[86, 77], [108, 84], [130, 92]].map(([x, y]) => glow(x, y + 3, 4, GOLD) + `<circle cx="${x}" cy="${y + 3}" r="1.8" fill="${GOLD}"/>`).join('') +
      glow(57, 132, 9, GOLD) +
      `<g class="float">${[[96, 60], [140, 70], [44, 30], [116, 50]].map(([x, y]) => ff(x, y, '#FF9A4A', 3)).join('')}</g>` },
  ],
};

// ZONES-SUIVANTES

export default {
  id: 'fees',
  age: '7-9',
  label: 'Forêt mystique',
  gardenName: 'Mon jardin',
  bg: LOGIQUE.bg,
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
