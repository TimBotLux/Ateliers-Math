// Outils de dessin partagés par les thèmes du jardin (repris de la maquette validée).
// Chaque fonction renvoie un fragment SVG (chaîne) pour un dessin de 200 × 170.

export const S = (inner, cls = '') => `<g filter="url(#sticker)" class="${cls}">${inner}</g>`;
// Halo lumineux (lanternes, fée, lucioles).
export const glow = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity=".75" filter="url(#glow)"/>`;

// Fée des bois : ailes de libellule translucides, robe feuille, cheveux châtains.
export const fairy = (x, y, dress = '#4E9A5B', hair = '#7A4A26') => `
  <g transform="translate(${x} ${y})">
    <ellipse cx="-10" cy="-4" rx="11" ry="5" fill="#E6F6F2" opacity=".85" transform="rotate(-35 -10 -4)"/>
    <ellipse cx="10" cy="-4" rx="11" ry="5" fill="#E6F6F2" opacity=".85" transform="rotate(35 10 -4)"/>
    <ellipse cx="-8" cy="4" rx="7" ry="3.5" fill="#E6F6F2" opacity=".85" transform="rotate(25 -8 4)"/>
    <ellipse cx="8" cy="4" rx="7" ry="3.5" fill="#E6F6F2" opacity=".85" transform="rotate(-25 8 4)"/>
    <path d="M-3 -2 L-17 -10 M3 -2 L17 -10" stroke="#9CC9C2" stroke-width=".8"/>
    <path d="M-6 15 L-4 10 L-2 14 L0 9 L2 14 L4 10 L6 15 L3 0 H-3 Z" fill="${dress}"/>
    <circle cx="0" cy="-5" r="5.5" fill="#EFC7A6"/>
    <path d="M-6 -4 Q-7 -12 0 -12 Q7 -12 6 -4 Q4 -9 0 -9 Q-4 -9 -6 -4Z" fill="${hair}"/>
    <path d="M7 4 L13 -4" stroke="#C99A3B" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="13.5" cy="-4.5" r="2" fill="#FFD36B"/>
  </g>`;

// Lutin : bonnet de mousse, tunique de cuir, ceinture.
export const elf = (x, y) => `
  <g transform="translate(${x} ${y})">
    <rect x="-5" y="2" width="10" height="12" rx="3" fill="#7A5332"/>
    <rect x="-5" y="7" width="10" height="2" fill="#4A321E"/>
    <circle cx="0" cy="-2" r="5" fill="#EFC7A6"/>
    <path d="M-6 -3 Q-2 -14 6 -18 Q3 -10 6 -3 Z" fill="#4E7D3A"/>
    <path d="M-6 -1 l-3 -2 M6 -1 l3 -2" stroke="#EFC7A6" stroke-width="2" stroke-linecap="round"/>
  </g>`;

// Fleur des champs : pâquerette (blanc) ou bouton d'or (jaune).
export const flower = (x, y, c) => `
  <g transform="translate(${x} ${y})">
    <path d="M0 0 Q1 -7 0 -14" stroke="#4E8A3A" stroke-width="2" fill="none"/>
    <ellipse cx="-4" cy="-6" rx="3.5" ry="1.6" fill="#5E9A45" transform="rotate(-30 -4 -6)"/>
    ${(c === '#FFFFFF' ? [0, 40, 80, 120, 160, 200, 240, 280, 320] : [0, 72, 144, 216, 288]).map(a => `<ellipse cx="0" cy="-19" rx="${c === '#FFFFFF' ? 1.8 : 3}" ry="5" fill="${c}" transform="rotate(${a} 0 -14)"/>`).join('')}
    <circle cx="0" cy="-14" r="2.4" fill="${c === '#FFFFFF' ? '#F2C531' : '#D9A21E'}"/>
  </g>`;

export const bluebell = (x, y) => `
  <g transform="translate(${x} ${y})">
    <path d="M0 0 Q-2 -14 6 -20" stroke="#4E8A3A" stroke-width="2" fill="none"/>
    <path d="M3 -16 q2 6 -2 7 q-3 -3 2 -7z M6 -20 q3 5 0 7 q-3 -2 0 -7z" fill="#5468C9"/>
  </g>`;

export const fern = (x, y, flip = 1) => `
  <g transform="translate(${x} ${y}) scale(${flip} 1)">
    <path d="M0 0 Q4 -16 16 -26" stroke="#3F7A34" stroke-width="2" fill="none"/>
    ${[0.2, 0.35, 0.5, 0.65, 0.8].map((t, i) => {
      const px = 16 * t * t + 8 * t * (1 - t), py = -26 * t * t - 32 * t * (1 - t);
      const s = 1 - t * .5;
      return `<ellipse cx="${px - 4 * s}" cy="${py - 2}" rx="${5 * s}" ry="${2 * s}" fill="#5E9A45" transform="rotate(-50 ${px} ${py})"/><ellipse cx="${px + 3 * s}" cy="${py + 2}" rx="${5 * s}" ry="${2 * s}" fill="#4E8A3A" transform="rotate(20 ${px} ${py})"/>`;
    }).join('')}
  </g>`;

// Touffe d'herbe, dessinée sans contour (fait partie du décor).
export const tuft = (x, y) => `<path transform="translate(${x} ${y})" d="M-8 0 Q-7 -8 -4 -11 Q-5 -5 -2 0 Q-1 -10 2 -13 Q1 -6 3 0 Q5 -8 9 -10 Q6 -4 7 0Z" fill="#3F7A34"/>`;

export const snail = (x, y) => `
  <g transform="translate(${x} ${y})">
    <path d="M-10 0 H8 Q12 0 12 -4 L12 -7" stroke="#C9B48E" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M12 -7 l-1 -4 M12 -7 l2 -4" stroke="#C9B48E" stroke-width="1.2"/>
    <circle cx="-1" cy="-6" r="7" fill="#A86B3A"/>
    <path d="M-1 -6 m-4 0 a4 4 0 1 1 4 4 a2.5 2.5 0 1 1 -2 -3" stroke="#6E4325" stroke-width="1.3" fill="none"/>
  </g>`;

export const sparkle = (x, y, s = 1, c = '#FFE34D') =>
  `<path transform="translate(${x} ${y}) scale(${s})" d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5Z" fill="${c}"/>`;

export const butterfly = (x, y, c = '#E8892F') => `
  <g transform="translate(${x} ${y})">
    <ellipse cx="-4" cy="-2" rx="4" ry="5" fill="${c}" transform="rotate(-25 -4 -2)"/>
    <ellipse cx="4" cy="-2" rx="4" ry="5" fill="${c}" transform="rotate(25 4 -2)"/>
    <rect x="-1" y="-6" width="2" height="10" rx="1" fill="#1E2B2F"/>
  </g>`;

// ---------- Thème Gare et trains : zone Logique (les aiguillages) ----------
export const sleepers = (x1, x2, y) => {
  let s = '';
  for (let x = x1; x <= x2; x += 11) s += `<rect x="${x}" y="${y - 6}" width="5" height="16" rx="1.5" fill="#9C7A55"/>`;
  return s;
};
// Traverses le long de la voie qui bifurque (courbe de Bézier quadratique).
export const branchSleepers = () => {
  const P = [[100, 137], [144, 135], [200, 105]];
  let s = '';
  for (let t = 0.12; t <= 1.0; t += 0.1) {
    const x = (1 - t) ** 2 * P[0][0] + 2 * (1 - t) * t * P[1][0] + t * t * P[2][0];
    const y = (1 - t) ** 2 * P[0][1] + 2 * (1 - t) * t * P[1][1] + t * t * P[2][1];
    const dx = 2 * (1 - t) * (P[1][0] - P[0][0]) + 2 * t * (P[2][0] - P[1][0]);
    const dy = 2 * (1 - t) * (P[1][1] - P[0][1]) + 2 * t * (P[2][1] - P[1][1]);
    const a = (Math.atan2(dy, dx) * 180) / Math.PI;
    s += `<rect x="${x - 2.5}" y="${y - 8}" width="5" height="16" rx="1.5" fill="#9C7A55" transform="rotate(${a} ${x} ${y})"/>`;
  }
  return s;
};
export const rails = (x1, x2, y) => `<rect x="${x1}" y="${y - 3}" width="${x2 - x1}" height="2.6" rx="1.3" fill="#7D8A92"/><rect x="${x1}" y="${y + 5}" width="${x2 - x1}" height="2.6" rx="1.3" fill="#7D8A92"/>`;

export const loco = (x, y) => `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="-26" width="34" height="20" rx="4" fill="#D9617A"/>
    <rect x="22" y="-40" width="18" height="34" rx="3" fill="#A8364F"/>
    <rect x="26" y="-36" width="10" height="9" rx="2" fill="#BFE0F5"/>
    <rect x="-6" y="-8" width="50" height="6" rx="2" fill="#1E2B2F"/>
    <rect x="6" y="-38" width="7" height="12" rx="1.5" fill="#1E2B2F"/>
    <path d="M-6 -6 L-12 2 H-4Z" fill="#1E2B2F"/>
    <circle cx="6" cy="0" r="6" fill="#1E2B2F"/><circle cx="6" cy="0" r="2" fill="#F2B84B"/>
    <circle cx="20" cy="0" r="6" fill="#1E2B2F"/><circle cx="20" cy="0" r="2" fill="#F2B84B"/>
    <circle cx="34" cy="0" r="6" fill="#1E2B2F"/><circle cx="34" cy="0" r="2" fill="#F2B84B"/>
    <circle cx="-2" cy="-18" r="3" fill="#F2B84B"/>
  </g>`;
export const wagon = (x, y, c, load = '') => `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="-22" width="30" height="16" rx="3" fill="${c}"/>
    ${load}
    <rect x="-2" y="-8" width="34" height="5" rx="2" fill="#1E2B2F"/>
    <circle cx="7" cy="0" r="5" fill="#1E2B2F"/><circle cx="23" cy="0" r="5" fill="#1E2B2F"/>
    <rect x="30" y="-12" width="6" height="2.5" fill="#1E2B2F"/>
  </g>`;

export const F = (inner, cls = '') => `<g filter="url(#flat)" class="${cls}">${inner}</g>`;

// ---------- Fées 7-9 ans : la forêt mystique ----------
export const shroom = (x, y, s = 1) => glow(x, y - 12 * s, 9 * s, '#5FE0D2') + `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-2" y="-12" width="4" height="12" rx="2" fill="#DCEFEA"/>
    <path d="M-9 -11 Q0 -24 9 -11 Z" fill="#3FD0C0"/>
    <circle cx="-3" cy="-15" r="1.3" fill="#B8FFF6"/><circle cx="3" cy="-17" r="1" fill="#B8FFF6"/>
  </g>`;
export const pine = (x, base, h, c) => `<path d="M${x - h * .3} ${base} L${x} ${base - h} L${x + h * .3} ${base}Z" fill="${c}"/>`;
export const fox = (x, y) => `
  <g transform="translate(${x} ${y})">
    <path d="M-8 0 Q-24 -2 -21 -15 Q-15 -7 -6 -6Z" fill="#E0762B"/>
    <circle cx="-20" cy="-13" r="2.4" fill="#F4EDE4"/>
    <path d="M-8 0 L-6 -20 L6 -20 L8 0Z" fill="#E0762B"/>
    <path d="M-3 0 L0 -14 L3 0Z" fill="#F4EDE4"/>
    <path d="M-7 -20 L0 -30 L7 -20 L0 -14Z" fill="#E0762B"/>
    <path d="M-7 -21 L-6 -34 L-1 -28Z M7 -21 L6 -34 L1 -28Z" fill="#B85417"/>
    <path d="M-3 -18 L0 -14 L3 -18Z" fill="#F4EDE4"/>
    <circle cx="0" cy="-15" r="1" fill="#1E2B2F"/>
    <circle cx="-3" cy="-23" r=".9" fill="#1E2B2F"/><circle cx="3" cy="-23" r=".9" fill="#1E2B2F"/>
  </g>`;
export const owl = (x, y) => `
  <g transform="translate(${x} ${y})">
    <path d="M-7 8 Q-8 -6 0 -8 Q8 -6 7 8Z" fill="#6E5B49"/>
    <path d="M-4 8 Q0 -2 4 8Z" fill="#C9B79A"/>
    <circle cx="-3" cy="-3" r="2.6" fill="#F4EDE4"/><circle cx="3" cy="-3" r="2.6" fill="#F4EDE4"/>
    <circle cx="-3" cy="-3" r="1.2" fill="#1E2B2F"/><circle cx="3" cy="-3" r="1.2" fill="#1E2B2F"/>
    <path d="M-6 -9 L-4 -5 M6 -9 L4 -5" stroke="#6E5B49" stroke-width="2"/>
    <path d="M-1 0 L0 2 L1 0Z" fill="#E0A33A"/>
  </g>`;

// ---------- Gare 7-9 ans : le réseau moderne ----------
export const cSleepers = (x1, x2, y) => {
  let s = '';
  for (let x = x1; x <= x2; x += 10) s += `<rect x="${x}" y="${y - 6}" width="4" height="16" rx="1" fill="#D4D2CC"/>`;
  return s;
};
export const mRails = (x1, x2, y) => `<rect x="${x1}" y="${y - 3}" width="${x2 - x1}" height="2.4" fill="#56636B"/><rect x="${x1}" y="${y + 5}" width="${x2 - x1}" height="2.4" fill="#56636B"/>`;
export const branchModern = () => branchSleepers().replaceAll('#9C7A55', '#D4D2CC');
export const powerCar = (x, y) => `
  <g transform="translate(${x} ${y})">
    <path d="M18 -30 L26 -40 L34 -30 M22 -40 H32" stroke="#4A555C" stroke-width="1.4" fill="none"/>
    <path d="M0 -6 V-30 H46 Q64 -30 75 -13 Q77 -6 71 -6Z" fill="#F4F6F8"/>
    <path d="M50 -28 Q63 -27 71 -15 L58 -15 Q56 -24 50 -28Z" fill="#1E2B2F"/>
    <path d="M0 -18 H72 L74 -14 H0Z" fill="#1F4E9C"/>
    <rect x="0" y="-10" width="72" height="2.5" fill="#D7263D"/>
    ${[6, 18, 30].map(wx => `<rect x="${wx}" y="-27" width="8" height="6" rx="1.2" fill="#8FC6E8"/>`).join('')}
    <rect x="5" y="-6" width="18" height="5" rx="2" fill="#2B2F33"/><rect x="47" y="-6" width="18" height="5" rx="2" fill="#2B2F33"/>
    ${[9, 19, 51, 61].map(cx => `<circle cx="${cx}" cy="-1" r="2.6" fill="#2B2F33"/>`).join('')}
  </g>`;
export const coach = (x, y) => `
  <g transform="translate(${x} ${y})">
    <rect x="0" y="-30" width="52" height="24" rx="3" fill="#F4F6F8"/>
    <rect x="0" y="-18" width="52" height="4" fill="#1F4E9C"/>
    <rect x="0" y="-10" width="52" height="2.5" fill="#D7263D"/>
    ${[4, 14, 24, 34, 44].map(wx => `<rect x="${wx}" y="-27" width="6" height="6" rx="1" fill="#8FC6E8"/>`).join('')}
    <rect x="4" y="-6" width="14" height="5" rx="2" fill="#2B2F33"/><rect x="34" y="-6" width="14" height="5" rx="2" fill="#2B2F33"/>
    ${[7, 15, 37, 45].map(cx => `<circle cx="${cx}" cy="-1" r="2.4" fill="#2B2F33"/>`).join('')}
  </g>`;

// ---------- 10-12 ans : perspective isométrique ----------
// Repère : l'axe « u » part vers la droite-haut (dx = +1, dy = -0,5),
// l'axe « v » vers la gauche-haut (dx = -1, dy = -0,5), « z » vers le haut.
const pt = (x, y) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Point isométrique à partir d'une origine (ox, oy) : [x, y] à l'écran. */
export const isoPoint = (ox, oy, u, v, z = 0) => [ox + u - v, oy - u / 2 - v / 2 - z];

/**
 * Pavé isométrique. (cx, cy) = coin avant, au sol. w = longueur sur u, d = sur v, h = hauteur.
 * colors = [dessus, face gauche, face droite].
 */
export const isoBox = (cx, cy, w, d, h, [top, left, right]) => `
  <path d="M${pt(cx, cy)} L${pt(cx - d, cy - d / 2)} L${pt(cx - d, cy - d / 2 - h)} L${pt(cx, cy - h)}Z" fill="${left}"/>
  <path d="M${pt(cx, cy)} L${pt(cx + w, cy - w / 2)} L${pt(cx + w, cy - w / 2 - h)} L${pt(cx, cy - h)}Z" fill="${right}"/>
  <path d="M${pt(cx, cy - h)} L${pt(cx + w, cy - w / 2 - h)} L${pt(cx + w - d, cy - w / 2 - d / 2 - h)} L${pt(cx - d, cy - d / 2 - h)}Z" fill="${top}"/>`;

/** Pyramide isométrique (toit) posée sur un carré de côté s dont le coin avant est (cx, cy). */
export const isoRoof = (cx, cy, s, h, [left, right]) => {
  const apex = [cx, cy - s / 2 - h];
  return `
  <path d="M${pt(cx, cy)} L${pt(cx - s, cy - s / 2)} L${pt(...apex)}Z" fill="${left}"/>
  <path d="M${pt(cx, cy)} L${pt(cx + s, cy - s / 2)} L${pt(...apex)}Z" fill="${right}"/>`;
};

/** Île flottante : dalle d'herbe et dessous rocheux à facettes. */
export const floatingIsland = (cx, cy, w, d, h, { grass = '#7FB069', earthL = '#8A6A4F', earthR = '#6E5440', rockL = '#5B4A5E', rockR = '#463A4C' } = {}) => {
  const L = [cx - d, cy - d / 2];
  const R = [cx + w, cy - w / 2];
  const tip = [cx + (w - d) / 2, cy + Math.max(w, d) * 0.55];
  return `
  <path d="M${pt(...L)} L${pt(cx, cy)} L${pt(cx - 4, cy + 18)} L${pt(tip[0] - 6, tip[1] - 8)} L${pt(L[0] + 10, L[1] + 14)}Z" fill="${rockL}"/>
  <path d="M${pt(cx, cy)} L${pt(...R)} L${pt(R[0] - 10, R[1] + 16)} L${pt(...tip)} L${pt(cx - 4, cy + 18)}Z" fill="${rockR}"/>
  ${isoBox(cx, cy, w, d, h, [grass, earthL, earthR])}`;
};

