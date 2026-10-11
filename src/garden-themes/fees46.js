// Thème « Fées et lutins », parcours 4-6 ans.
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
  title: 'Fées et lutins — la logique',
  sub: 'La maison-champignon du lutin',
  phone: 'Mon jardin',
  bg: `
    <rect width="200" height="170" fill="url(#sky-fees)"/>
    <path d="M-10 0 L40 0 L120 170 L60 170Z M70 0 L95 0 L170 170 L140 170Z" fill="#FFF6D6" opacity=".18"/>
    <g fill="#5C8A63" opacity=".75">
      ${[[8, 92, 18], [30, 86, 22], [56, 94, 16], [150, 88, 20], [176, 82, 24], [198, 92, 16]].map(([x, y, r]) => `<rect x="${x - 2}" y="${y}" width="4" height="22" fill="#4A6B4C"/><circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x - r * .5}" cy="${y + r * .4}" r="${r * .7}"/>`).join('')}
    </g>
    <path d="M0 112 Q40 100 90 108 T200 102 V170 H0Z" fill="#8DBF5E"/>
    <path d="M0 126 Q50 114 100 121 T200 117 V170 H0Z" fill="#6EA548"/>
    <path d="M0 144 Q60 134 120 141 T200 139 V170 H0Z" fill="#558C39"/>
    ${[12, 46, 150, 188].map(x => `<path d="M${x} 170 l2 -9 l1 9 l2 -7 l1 7" stroke="#3F7A34" stroke-width="1.5" fill="none"/>`).join('')}`,
  stages: [
    { name: 'une graine', what: 'Une graine magique qui scintille' },
    { name: 'une pousse', what: 'Un petit champignon pointe le bout de son chapeau' },
    { name: 'une jeune plante', what: 'Le champignon devient une maison, avec porte et fenêtre' },
    { name: 'un bouton', what: 'Fougères, fleurs des champs, un escargot et un chemin de cailloux' },
    { name: 'une fleur', what: 'Une fée des bois arrive, les lanternes s’allument' },
    { name: 'un arbre', what: 'Le lutin habite là : cheminée de pierre, papillons, lucioles' },
  ],
  stickers: [
    // Graine : un gland qui germe, deux petites feuilles, posé sur la mousse.
    { from: 0, to: 0, svg: glow(100, 120, 22, '#FFE7A0') + tuft(74, 144) + tuft(128, 145) + S(`<g transform="translate(100 141) scale(1.45) translate(-100 -141)">
        <ellipse cx="100" cy="141" rx="20" ry="5.5" fill="#5E8A3A"/>
        <ellipse cx="100" cy="132" rx="8.5" ry="10" fill="#C98A45"/>
        <ellipse cx="97" cy="130" rx="2.5" ry="5" fill="#E2AE6A" opacity=".8"/>
        <path d="M100 141.5 l-1.6 2.5 h3.2z" fill="#8A5A2B"/>
        <path d="M90.5 126 Q100 116 109.5 126 Q100 129 90.5 126Z" fill="#7A5332"/>
        ${[[94, 124], [98, 122], [102, 122], [106, 124], [96, 126.5], [100, 125.5], [104, 126.5]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r=".9" fill="#5E3E24"/>`).join('')}
        <path d="M100 119 Q100 112 103 108" stroke="#5E9A45" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M103 108 Q110 103 115 107 Q109 112 103 108Z" fill="#6FB04E"/>
        <path d="M102 110 Q95 104 90 108 Q96 113 102 110Z" fill="#5E9A45"/></g>`) + sparkle(124, 92, .9) + sparkle(76, 108, .6) },
    { from: 1, to: 1, svg: S(`<path d="M95 138 Q94 124 96 116 H104 Q106 124 105 138 Z" fill="#F1E7D2"/><path d="M80 120 Q100 92 120 120 Q100 124 80 120 Z" fill="#C8352B"/><circle cx="93" cy="110" r="2.6" fill="#fff"/><circle cx="105" cy="107" r="2.2" fill="#fff"/><circle cx="111" cy="115" r="1.8" fill="#fff"/>`) + tuft(72, 142) + tuft(130, 143) + sparkle(126, 100, .7) },
    { from: 2, svg: S(`
        <path d="M82 140 Q80 100 88 92 H112 Q120 100 118 140 Z" fill="#F1E7D2"/>
        <path d="M108 94 Q118 104 118 140 H110 Q112 110 106 94Z" fill="#DDD0B4"/>
        <path d="M93 140 V122 a7 7 0 0 1 14 0 V140 Z" fill="#7A4A26"/>
        <path d="M97.5 140 V118 M102.5 140 V117" stroke="#5E3820" stroke-width="1"/>
        <circle cx="104.5" cy="131" r="1.4" fill="#D9A21E"/>
        ${glow(111, 113, 7, '#FFD36B')}
        <circle cx="111" cy="113" r="4.5" fill="#FFD877" stroke="#5E3820" stroke-width="2"/>
        <ellipse cx="100" cy="97" rx="40" ry="6" fill="#E6D9BF"/>
        <path d="M54 96 Q100 30 146 96 Q100 104 54 96 Z" fill="#C8352B"/>
        <path d="M54 96 Q100 104 146 96 Q100 100 54 96Z" fill="#9F2820"/>
        <ellipse cx="78" cy="80" rx="6" ry="4.5" fill="#F7F1E6"/><ellipse cx="100" cy="62" rx="7" ry="5" fill="#F7F1E6"/>
        <ellipse cx="122" cy="78" rx="5.5" ry="4" fill="#F7F1E6"/><ellipse cx="94" cy="88" rx="3.5" ry="2.6" fill="#F7F1E6"/><ellipse cx="134" cy="90" rx="3" ry="2.2" fill="#F7F1E6"/>
        <ellipse cx="66" cy="90" rx="2.8" ry="2" fill="#F7F1E6"/>`) },
    { from: 3, svg: fern(24, 152) + fern(182, 154, -1) + tuft(60, 160) + tuft(146, 162) + S(flower(54, 148, '#FFFFFF')) + S(flower(150, 146, '#F2C531')) + S(bluebell(40, 156)) + S(bluebell(166, 158)) + S(flower(134, 162, '#FFFFFF')) + S(`<ellipse cx="100" cy="150" rx="7" ry="3.5" fill="#B8B1A2"/><ellipse cx="110" cy="158" rx="6" ry="3" fill="#A59E8F"/><ellipse cx="97" cy="164" rx="7" ry="3.2" fill="#B8B1A2"/>`) + S(snail(70, 162)) },
    { from: 4, svg: [[70, 97], [85, 99.5], [100, 101], [115, 99.5], [130, 97]].map(([x, y]) => glow(x, y, 6, '#FFC94D')).join('') + S(`<path d="M60 92 Q100 108 140 92" stroke="#5E3820" stroke-width="1.2" fill="none"/>${[[70, 97], [85, 99.5], [100, 101], [115, 99.5], [130, 97]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#FFD36B"/>`).join('')}`) + `<g class="float">${glow(160, 52, 14, '#FFF3C4')}${S(fairy(160, 52))}</g>` + glow(30, 104, 3.5, '#FFE08A') + glow(176, 122, 3.5, '#FFE08A') + glow(48, 70, 3, '#FFE08A') },
    { from: 5, svg: S(`<path d="M114 68 V54 h9 V68 Z" fill="#8C877C"/><path d="M114 58 h9 M114 63 h9 M118 54 v4 M117 63 v5" stroke="#6E6A61" stroke-width=".8"/><rect x="112" y="51" width="13" height="4" rx="1.5" fill="#6E6A61"/>`) + `<circle class="smoke" cx="119" cy="45" r="5" fill="#F4F1EA" opacity=".85"/><circle class="smoke" style="animation-delay:1.2s" cx="122" cy="38" r="4" fill="#F4F1EA" opacity=".85"/>` + S(elf(76, 128)) + S(butterfly(36, 66, '#3F7FD1') + butterfly(180, 96, '#E07A1F')) + [[24, 40], [62, 24], [178, 30], [146, 128], [20, 124]].map(([x, y]) => glow(x, y, 3.5, '#FFE08A') + `<circle cx="${x}" cy="${y}" r="1.4" fill="#FFF6C8"/>`).join('') + sparkle(140, 20, .8) },
  ],
};


// ---------- Petits outils de dessin propres aux zones 4-6 ans ----------
const n = (v) => +v.toFixed(2);
const at = (x, y, s, inner, f = 1) => `<g transform="translate(${x} ${y}) scale(${n(s * f)} ${s})">${inner}</g>`;
const flies = (pts) => pts.map(([x, y]) => glow(x, y, 3.5, '#FFE08A') + `<circle cx="${x}" cy="${y}" r="1.4" fill="#FFF6C8"/>`).join('');
const hexPts = (cx, cy, r) => Array.from({ length: 6 }, (_, k) => {
  const a = (Math.PI / 180) * (60 * k - 90);
  return `${n(cx + r * Math.cos(a))},${n(cy + r * Math.sin(a))}`;
}).join(' ');
const comb = (x0, y0, cols, rows, r) => {
  let s = '';
  const w = Math.sqrt(3) * r;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      s += `<polygon points="${hexPts(x0 + i * w + (j % 2 ? w / 2 : 0), y0 + j * 1.5 * r, r * 0.92)}" fill="${(i + j) % 3 ? '#F2B53A' : '#FFD36B'}" stroke="#B07A22" stroke-width=".8"/>`;
    }
  }
  return s;
};
const sprout = (x, y, s = 1) => at(x, y, s, `<path d="M0 0 Q0 -6 1 -10" stroke="#5E9A45" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M1 -9 Q7 -15 12 -11 Q6 -6 1 -9Z" fill="#6FB04E"/><path d="M0 -8 Q-6 -14 -11 -10 Q-5 -5 0 -8Z" fill="#5E9A45"/>`);
const cabbage = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="-6" cy="-3" rx="6.5" ry="4.5" fill="#4E8A3A"/><ellipse cx="6" cy="-3" rx="6.5" ry="4.5" fill="#4E8A3A"/><circle cx="0" cy="-6" r="6.5" fill="#8DBF5E"/><path d="M0 -1 V-11 M0 -5 L-3.5 -9 M0 -5 L3.5 -9" stroke="#5E9A45" stroke-width=".9" fill="none"/></g>`;
const carrot = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 -3 Q-4 -9 -6 -13 M0 -3 Q0 -10 1 -15 M0 -3 Q4 -8 7 -12" stroke="#4E8A3A" stroke-width="1.8" fill="none" stroke-linecap="round"/><ellipse cx="-6" cy="-13" rx="2.2" ry="1.4" fill="#5E9A45"/><ellipse cx="1" cy="-15" rx="1.6" ry="2.2" fill="#6FB04E"/><ellipse cx="7" cy="-12" rx="2.2" ry="1.4" fill="#5E9A45"/><path d="M-4 1 Q-4 -3 0 -3 Q4 -3 4 1Z" fill="#E8892F"/></g>`;
const duck = (x, y, s = 1, c = '#F4F1EA', f = 1) => at(x, y, s, `
  <path d="M-10 -4 L-16 -9 L-9 -1Z" fill="${c}"/>
  <ellipse cx="0" cy="-4" rx="11" ry="6" fill="${c}"/>
  <ellipse cx="-1.5" cy="-5" rx="6" ry="3.2" fill="${c === '#F2C531' ? '#DDA826' : '#DCD3C0'}"/>
  <circle cx="8" cy="-13" r="4.6" fill="${c}"/>
  <path d="M12 -13.5 L17.5 -12.5 L12 -11Z" fill="#E8892F"/>
  <circle cx="9" cy="-14.2" r=".9" fill="#1E2B2F"/>
  <path d="M-12 1.5 Q0 4 12 1.5" stroke="#BFE3F0" stroke-width="1.4" fill="none" stroke-linecap="round"/>`, f);
const frog = (x, y, s = 1) => at(x, y, s, `
  <path d="M-8 0 Q-12 -4 -6 -6 M8 0 Q12 -4 6 -6" stroke="#4E8A3A" stroke-width="3" stroke-linecap="round" fill="none"/>
  <ellipse cx="0" cy="-5" rx="8.5" ry="6" fill="#5E9A45"/>
  <ellipse cx="0" cy="-2.5" rx="5" ry="2.8" fill="#B8D88A"/>
  <circle cx="-4.5" cy="-10.5" r="3.2" fill="#5E9A45"/><circle cx="4.5" cy="-10.5" r="3.2" fill="#5E9A45"/>
  <circle cx="-4.5" cy="-11" r="1.8" fill="#F7F1E6"/><circle cx="4.5" cy="-11" r="1.8" fill="#F7F1E6"/>
  <circle cx="-4.3" cy="-11" r=".9" fill="#1E2B2F"/><circle cx="4.3" cy="-11" r=".9" fill="#1E2B2F"/>
  <path d="M-3.5 -7.3 Q0 -5.6 3.5 -7.3" stroke="#2F5A26" stroke-width=".9" fill="none"/>
  <path d="M-4 0 l-2 1.5 M4 0 l2 1.5" stroke="#4E8A3A" stroke-width="2" stroke-linecap="round"/>`);
const dragonfly = (x, y, c = '#2F8FA6', a = 0, f = 1) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${f} 1)">
  <ellipse cx="-1" cy="-6" rx="2.4" ry="7" fill="#D6F0EC" stroke="#9CC9C2" stroke-width=".5" transform="rotate(-12 -1 -6)"/>
  <ellipse cx="-1" cy="6" rx="2.4" ry="7" fill="#D6F0EC" stroke="#9CC9C2" stroke-width=".5" transform="rotate(12 -1 6)"/>
  <ellipse cx="-5" cy="-5.5" rx="2" ry="6" fill="#D6F0EC" stroke="#9CC9C2" stroke-width=".5" transform="rotate(18 -5 -5.5)"/>
  <ellipse cx="-5" cy="5.5" rx="2" ry="6" fill="#D6F0EC" stroke="#9CC9C2" stroke-width=".5" transform="rotate(-18 -5 5.5)"/>
  <path d="M-18 0 H2" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="3.5" cy="0" r="2.6" fill="${c}"/>
  <circle cx="4.6" cy="-1.3" r="1" fill="#1E2B2F"/><circle cx="4.6" cy="1.3" r="1" fill="#1E2B2F"/></g>`;
const pad = (x, y, rx, ry) => `<g transform="translate(${x} ${y})"><path d="M0 0 L${n(rx * 0.9)} ${n(-ry * 0.42)} A${rx} ${ry} 0 1 0 ${n(rx * 0.9)} ${n(ry * 0.42)}Z" fill="#5E9A45"/><path d="M0 0 L${n(-rx * 0.7)} ${n(-ry * 0.45)} M0 0 L${n(-rx * 0.6)} ${n(ry * 0.5)} M0 0 L0 ${n(-ry * 0.8)}" stroke="#4E8A3A" stroke-width=".8"/></g>`;
const waterLily = (x, y, s = 1) => at(x, y, s, `${[-64, -32, 0, 32, 64].map((a) => `<ellipse cx="0" cy="-5" rx="2.4" ry="5.5" fill="#F7F1E6" stroke="#E6D9BF" stroke-width=".5" transform="rotate(${a})"/>`).join('')}<ellipse cx="0" cy="0" rx="6" ry="2" fill="#E6D9BF"/><circle cx="0" cy="-2.5" r="2" fill="#F2C531"/>`);
const cattails = (x, y, f = 1) => `<g transform="translate(${x} ${y}) scale(${f} 1)">
  <path d="M-6 0 Q-10 -14 -17 -22 M6 0 Q10 -16 9 -30 M-2 0 Q-2 -10 4 -18" stroke="#5E9A45" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M0 0 V-42 M-4 0 Q-5 -16 -7 -34 M4 0 Q5 -12 7 -27" stroke="#4E8A3A" stroke-width="1.4" fill="none"/>
  <rect x="-2.2" y="-37" width="4.4" height="12" rx="2.2" fill="#7A4A26"/>
  <rect x="-9" y="-31" width="4" height="10" rx="2" fill="#6E4325"/>
  <rect x="5" y="-24" width="4" height="9" rx="2" fill="#7A4A26"/></g>`;
const bee = (x, y, s = 1) => at(x, y, s, `<ellipse cx="-1" cy="-5" rx="3" ry="4.2" fill="#F4FBFA" stroke="#B9D9DE" stroke-width=".5" transform="rotate(-20 -1 -5)"/><ellipse cx="2.5" cy="-4.5" rx="2.4" ry="3.6" fill="#F4FBFA" stroke="#B9D9DE" stroke-width=".5" transform="rotate(25 2.5 -4.5)"/><ellipse cx="0" cy="0" rx="5" ry="3.6" fill="#F2C531"/><path d="M-1.2 -3.3 V3.3 M1.8 -3 V3" stroke="#3B2A1A" stroke-width="1.4"/><circle cx="-5" cy="-.3" r="2.3" fill="#3B2A1A"/><path d="M5 0 l2 .5 l-2 .6Z" fill="#3B2A1A"/>`);
const skep = (x, y, s = 1) => at(x, y, s, `<path d="M-26 0 Q-29 -30 0 -40 Q29 -30 26 0Z" fill="#D9A85A"/>${[[-8, 26], [-16, 24.5], [-24, 21], [-31, 15.5], [-36, 9]].map(([yy, w]) => `<path d="M${-w} ${yy} Q0 ${yy + 4} ${w} ${yy}" stroke="#B5843F" stroke-width="1.6" fill="none"/>`).join('')}<path d="M-6 0 a6 6 0 0 1 12 0Z" fill="#3B2414"/><ellipse cx="0" cy="-39" rx="4" ry="2.4" fill="#B5843F"/><rect x="-28" y="-1" width="56" height="3" rx="1.5" fill="#B5843F"/>`);
const lantern = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 0 V3" stroke="#5E3820" stroke-width="1"/><path d="M-4.5 6 H4.5 L2.5 3 H-2.5Z" fill="#5E3820"/><rect x="-3.5" y="6" width="7" height="9" rx="1.5" fill="#FFD36B" stroke="#5E3820" stroke-width="1.2"/><rect x="-4.5" y="15" width="9" height="2" rx="1" fill="#5E3820"/></g>`;
const lampPost = (x, y, s = 1) => glow(n(x + 6 * s), n(y - 21.5 * s), n(9 * s), '#FFC94D') + S(at(x, y, s, `<path d="M0 0 V-30 Q0 -33 6 -33 V-32" stroke="#5E3820" stroke-width="2.4" fill="none"/>${lantern(6, -32)}`));
const oakLeaf = (x, y, rot, s, c = '#6FB04E') => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 Q-3 -1 -3 -3 Q-5 -4 -3 -5.5 Q-5 -7 -2.5 -8 Q-3.5 -10 0 -11 Q3.5 -10 2.5 -8 Q5 -7 3 -5.5 Q5 -4 3 -3 Q3 -1 0 0Z" fill="${c}"/><path d="M0 1.5 V-9" stroke="#3F7A34" stroke-width=".6"/></g>`;
const gear = (x, y, r, c = '#D9A21E') => `<g transform="translate(${x} ${y})">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<rect x="${n(-r * 0.24)}" y="${n(-r * 1.32)}" width="${n(r * 0.48)}" height="${n(r * 0.6)}" rx="${n(r * 0.08)}" fill="${c}" transform="rotate(${a})"/>`).join('')}<circle r="${r}" fill="${c}"/><circle r="${n(r * 0.4)}" fill="#7A5332"/></g>`;
const wheel = (x, y, r) => `<g transform="translate(${x} ${y})"><circle r="${r}" fill="#C49A62" stroke="#5E3820" stroke-width="2.2"/>${[0, 60, 120].map((a) => `<path d="M0 ${-r} V${r}" stroke="#5E3820" stroke-width="1.4" transform="rotate(${a})"/>`).join('')}<circle r="${n(r * 0.25)}" fill="#5E3820"/></g>`;
const lavender = (x, y) => `<g transform="translate(${x} ${y})"><path d="M0 0 Q-1 -12 -4 -20 M0 0 Q1 -12 4 -22 M0 0 V-16" stroke="#5E8A3A" stroke-width="1.4" fill="none"/>${[[-4, -20], [4, -22], [0, -16]].map(([px, py]) => [0, 3, 6].map((d) => `<ellipse cx="${px}" cy="${py + d}" rx="1.6" ry="2" fill="#7E6BB8"/>`).join('')).join('')}</g>`;

// ---------- Zone Numération : le potager des lutins ----------
const scarecrow = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M0 0 V-58" stroke="#7A4A26" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M-18 -40 H18" stroke="#7A4A26" stroke-width="3" stroke-linecap="round"/>
  <path d="M-15 -45 H15 L11 -20 H-11Z" fill="#B5893F"/>
  <rect x="-7" y="-38" width="5" height="5" fill="#8A6A3A"/><rect x="3" y="-30" width="4" height="4" fill="#5E7D3A"/>
  <path d="M-11 -24 H11" stroke="#6E5132" stroke-width="2"/>
  <path d="M-18 -40 l-4 -3 M-18 -40 l-5 1 M-18 -40 l-3 4 M18 -40 l4 -3 M18 -40 l5 1 M18 -40 l3 4 M-9 -20 l-2 5 M-4 -20 l-1 5 M4 -20 l1 5 M9 -20 l2 5" stroke="#E2C04F" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="0" cy="-50" r="7" fill="#E2C28F"/>
  <circle cx="-2.5" cy="-51" r="1" fill="#4A321E"/><circle cx="2.5" cy="-51" r="1" fill="#4A321E"/>
  <path d="M-3 -47 Q0 -45 3 -47" stroke="#4A321E" stroke-width=".8" fill="none"/>
  <ellipse cx="0" cy="-56" rx="12" ry="2.6" fill="#6E5132"/>
  <path d="M-6 -56 Q-6 -65 0 -65 Q6 -65 6 -56Z" fill="#8A6A3A"/>
  <path d="M-6 -58 H6" stroke="#C8352B" stroke-width="1.5"/>
  <g transform="translate(19 -44)"><path d="M-4 -1 l-4 -2 l1 3Z" fill="#5E3E24"/><ellipse cx="0" cy="0" rx="4.5" ry="3.5" fill="#7A5332"/><circle cx="3.5" cy="-3" r="2.6" fill="#7A5332"/><path d="M1 -1 Q4 2.5 5 -1.5 Q3 -3 1 -1Z" fill="#E07A1F"/><path d="M6 -3.4 l2.2 .6 l-2.2 .6Z" fill="#D9A21E"/><circle cx="4.2" cy="-3.8" r=".6" fill="#1E2B2F"/></g>
</g>`;
const NUMERATION = {
  sub: 'Le potager des lutins',
  stages: [
    { name: 'une graine', what: 'Une graine dorée dans la terre fraîche' },
    { name: 'une pousse', what: 'Une rangée de petites pousses sort de terre' },
    { name: 'une jeune plante', what: 'Un carré de potager : choux et carottes bien rangés' },
    { name: 'un bouton', what: 'Un épouvantail veille, un rouge-gorge sur le bras' },
    { name: 'une fleur', what: 'L’arrosoir et la brouette pleine de légumes' },
    { name: 'un arbre', what: 'Le lutin fait la récolte, les lucioles s’allument' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 124, 24, '#FFE7A0') + tuft(66, 147) + tuft(136, 148) + S(`<g transform="translate(100 140) scale(1.5) translate(-100 -140)">
        <ellipse cx="100" cy="141" rx="22" ry="5.5" fill="#5E8A3A"/>
        <path d="M80 141 Q100 124 120 141Z" fill="#7E5232"/>
        <path d="M86 138 Q100 130 114 138" stroke="#5E3820" stroke-width="1" fill="none"/>
        <ellipse cx="100" cy="129" rx="4" ry="5.5" fill="#E2B866" transform="rotate(20 100 129)"/>
        <ellipse cx="99" cy="127.5" rx="1.2" ry="2.6" fill="#F6DCA0" transform="rotate(20 100 129)"/>
        <path d="M93 133 Q100 130 107 133 Q100 136 93 133Z" fill="#7E5232"/>
        <ellipse cx="89" cy="138" rx="1.6" ry="2.2" fill="#C9A05A" transform="rotate(-30 89 138)"/>
        <path d="M117 141 L124 136.5" stroke="#7A4A26" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M123 136.5 Q128 130 132 133 Q130 139 124 138Z" fill="#9AA3A8"/></g>`) + sparkle(126, 96, .9) + sparkle(74, 108, .6) },
    { from: 1, to: 1, svg: glow(100, 128, 12, '#FFE7A0') + tuft(38, 150) + tuft(162, 151) + S(`<path d="M44 147 Q100 134 156 147 Q100 157 44 147Z" fill="#6B4428"/><path d="M56 146 Q100 137 144 146" stroke="#7E5232" stroke-width="3" fill="none" stroke-linecap="round"/>${[[62, 146], [81, 143], [100, 142], [119, 143], [138, 146]].map(([x, y]) => sprout(x, y, 1.4)).join('')}`) + sparkle(100, 112, .7) + sparkle(150, 118, .5) },
    { from: 2, svg: tuft(20, 158) + tuft(182, 160) + S(`
        <path d="M56 116 H144 L158 146 H42Z" fill="#6B4428"/>
        <path d="M52 126 H148 M47 137 H153" stroke="#5A3820" stroke-width="1" opacity=".6"/>
        <path d="M53 112 H147 V117 H53Z" fill="#8A5A2B"/>
        <path d="M53 112 L58 112 L44 146 L37 146Z M147 112 L142 112 L156 146 L163 146Z" fill="#7A4A26"/>
        ${[70, 90, 110, 130].map((x) => cabbage(x, 128)).join('')}
        ${[58, 75, 92, 109, 126, 143].map((x) => carrot(x, 142)).join('')}
        <path d="M34 145 H166 V156 H34Z" fill="#9C6B3E"/>
        <path d="M34 150.5 H166" stroke="#7A4A26" stroke-width="1"/>
        ${[38, 100, 162].map((x) => `<circle cx="${x}" cy="148" r=".9" fill="#4A321E"/><circle cx="${x}" cy="153" r=".9" fill="#4A321E"/>`).join('')}`) },
    { from: 3, svg: fern(2, 162) + S(scarecrow(24, 150)) + S(flower(176, 166, '#F2C531')) + S(flower(190, 156, '#FFFFFF')) },
    { from: 4, svg: S(`<g transform="translate(62 166)">
        <path d="M-9 0 L-8 -14 H8 L9 0Z" fill="#7D8A92"/>
        <path d="M-8.4 -9 H8.4" stroke="#66737B" stroke-width="1"/>
        <path d="M8 -6 L19 -17" stroke="#7D8A92" stroke-width="3" stroke-linecap="round"/>
        <ellipse cx="20" cy="-18" rx="3.2" ry="1.8" fill="#66737B" transform="rotate(-45 20 -18)"/>
        <path d="M-6 -14 Q0 -24 6 -14" stroke="#66737B" stroke-width="2.2" fill="none"/>
        <path d="M-9 -12 Q-15 -8 -9 -3" stroke="#66737B" stroke-width="2" fill="none"/></g>`)
        + `<path d="M85 145 q-1.2 2.4 0 3 q1.2 -.6 0 -3Z M89 150 q-1.2 2.4 0 3 q1.2 -.6 0 -3Z M83 152 q-1.2 2.4 0 3 q1.2 -.6 0 -3Z" fill="#8FCBE6"/>`
        + S(`<g transform="translate(170 162)">
        <path d="M10 -14 L26 -20" stroke="#7A4A26" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M6 -8 L8 2" stroke="#7A4A26" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="-4" cy="-21" r="6.5" fill="#E07A1F"/><path d="M-4 -27 V-15 M-8 -26 Q-10 -21 -8 -16 M0 -26 Q2 -21 0 -16" stroke="#B85417" stroke-width=".9" fill="none"/>
        <path d="M-4 -27 l1 -3" stroke="#5E3820" stroke-width="1.6"/>
        <circle cx="7" cy="-20" r="5.5" fill="#8DBF5E"/><path d="M7 -15 V-25 M7 -20 L4 -23 M7 -20 L10 -23" stroke="#5E9A45" stroke-width=".8"/>
        <path d="M-16 -18 H14 L8 -6 H-10Z" fill="#9C6B3E"/>
        <path d="M-14 -13 H11" stroke="#7A4A26" stroke-width="1"/>
        <circle cx="-12" cy="-4" r="6" fill="#5E3820"/><circle cx="-12" cy="-4" r="2.2" fill="#C49A62"/></g>`)
        + S(butterfly(150, 70, '#E8892F')) + sparkle(30, 70, .6) },
    { from: 5, svg: S(elf(134, 148)) + S(`<g transform="translate(112 166)">
        <path d="M-11 -12 Q0 -30 11 -12" stroke="#8A5A2B" stroke-width="2" fill="none"/>
        <path d="M-12 -12 Q-11 -16 -7 -15 L5 -19 L-6 -11Z" fill="#E8892F"/>
        <path d="M-12 -13.5 l-4 -4 M-12 -13.5 l-5 0 M-12 -13.5 l-2 -5" stroke="#4E8A3A" stroke-width="1.4" stroke-linecap="round"/>
        <circle cx="5" cy="-14" r="5.5" fill="#8DBF5E"/><path d="M5 -9 V-18" stroke="#5E9A45" stroke-width=".8"/>
        <path d="M-13 -12 H13 L10 0 H-10Z" fill="#B5843F"/>
        <path d="M-12 -8 H12 M-11 -4 H11 M-6 -12 V0 M0 -12 V0 M6 -12 V0" stroke="#8A5A2B" stroke-width=".8"/>
        <rect x="-14" y="-13.5" width="28" height="3" rx="1.5" fill="#9C6B3E"/></g>`)
        + flies([[20, 40], [56, 24], [176, 36], [150, 118], [16, 120], [104, 80]]) + sparkle(130, 22, .8) + S(butterfly(40, 84, '#3F7FD1')) },
  ],
};

// ---------- Zone Calcul : le moulin du ruisseau ----------
const STREAM = 'M134 107 C104 116 102 128 112 136 C120 144 100 158 72 170 L112 170 C134 156 140 144 130 134 C120 124 124 114 146 107Z';
const millWheel = (x, y) => `<g transform="translate(${x} ${y})"><rect x="-12" y="-1.8" width="12" height="3.6" fill="#5E3820"/>${[0, 45, 90, 135].map((a) => `<path d="M0 -18 V18" stroke="#7A4A26" stroke-width="2" transform="rotate(${a})"/>`).join('')}<circle r="18" fill="none" stroke="#7A4A26" stroke-width="3"/><circle r="11" fill="none" stroke="#8A5A2B" stroke-width="1.5"/>${Array.from({ length: 12 }, (_, i) => `<rect x="-2" y="-23" width="4" height="7" rx="1" fill="#9C6B3E" transform="rotate(${i * 30})"/>`).join('')}<circle r="3.5" fill="#5E3820"/></g>`;
const CALCUL = {
  sub: 'Le moulin du ruisseau',
  stages: [
    { name: 'une graine', what: 'Une petite source et un galet tout rond' },
    { name: 'une pousse', what: 'La source devient un ruisseau qui serpente' },
    { name: 'une jeune plante', what: 'Des pierres de gué pour traverser l’eau' },
    { name: 'un bouton', what: 'Un moulin de bois et sa grande roue à aubes' },
    { name: 'une fleur', what: 'Une passerelle, une cane, son caneton et une grenouille' },
    { name: 'un arbre', what: 'Le moulin s’éclaire, la fée et les lucioles arrivent' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 128, 22, '#CFEFFF') + tuft(66, 148) + tuft(136, 149) + S(`<g transform="translate(100 140) scale(1.45) translate(-100 -140)">
        <ellipse cx="100" cy="141" rx="26" ry="7" fill="#5E8A3A"/>
        <ellipse cx="102" cy="140" rx="20" ry="5" fill="#6FB3D2"/>
        <ellipse cx="105" cy="140" rx="10" ry="2.6" fill="none" stroke="#BFE3F0" stroke-width="1"/>
        <ellipse cx="105" cy="140" rx="5" ry="1.3" fill="none" stroke="#E6F6F2" stroke-width="1"/>
        <ellipse cx="88" cy="137" rx="7" ry="4.5" fill="#B8B1A2"/>
        <ellipse cx="86" cy="135.5" rx="3" ry="1.5" fill="#D6D0C4"/>
        <path d="M105 123 Q101 129 105 131 Q109 129 105 123Z" fill="#8FCBE6"/></g>`) + sparkle(130, 100, .8) + sparkle(70, 110, .6) },
    { from: 1, svg: S(`<path d="${STREAM}" fill="#6FB3D2"/><path d="M128 110 Q116 114 113 121 M120 140 Q112 150 98 158 M128 146 Q122 156 110 164" stroke="#BFE3F0" stroke-width="1.6" fill="none" stroke-linecap="round"/>`)
        + tuft(92, 142) + tuft(150, 120) + S(`<ellipse cx="140" cy="126" rx="5" ry="3" fill="#B8B1A2"/><ellipse cx="146" cy="129" rx="3.5" ry="2.2" fill="#A59E8F"/>`) + S(cattails(160, 146, .8)) + sparkle(120, 94, .6) },
    { from: 2, svg: S(`${[[95, 157, 6], [106, 155.5, 5.5], [117, 154.5, 5.5], [128, 153.5, 5.5], [139, 152.5, 6]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="3.2" fill="#B8B1A2"/><ellipse cx="${x - 1.5}" cy="${y - 1}" rx="${n(r * 0.45)}" ry="1.2" fill="#D6D0C4"/>`).join('')}`)
        + fern(12, 158) + S(flower(40, 160, '#F2C531')) + S(flower(56, 152, '#FFFFFF')) + S(bluebell(176, 160)) + tuft(188, 162) },
    { from: 3, svg: S(`
        <rect x="86" y="70" width="7" height="16" fill="#8C877C"/><rect x="85" y="68" width="9" height="3" rx="1" fill="#6E6A61"/>
        <path d="M56 140 V98 H102 V140Z" fill="#E6D9BF"/>
        <path d="M56 140 V122 H102 V140Z" fill="#B8B1A2"/>
        <path d="M56 131 H102 M66 122 V131 M80 122 V131 M94 122 V131 M72 131 V140 M88 131 V140" stroke="#8C877C" stroke-width=".9"/>
        <path d="M56 99 H102 M56 121 H102 M57 99 V121 M101 99 V121 M66 99 L71 112 M92 99 L88 110" stroke="#7A4A26" stroke-width="2"/>
        <rect x="73" y="102" width="12" height="10" fill="#3B2A1A" stroke="#7A4A26" stroke-width="1.5"/>
        <path d="M73 140 V130 a6 6 0 0 1 12 0 V140Z" fill="#7A4A26"/>
        <circle cx="82.5" cy="134.5" r="1" fill="#D9A21E"/>
        <path d="M50 100 L79 68 L108 100Z" fill="#8A5A2B"/>
        <path d="M57 92 H101 M64 84 H94 M71 76 H87" stroke="#5E3820" stroke-width="1"/>
        <path d="M50 100 L79 68 L108 100" stroke="#5E3820" stroke-width="2" fill="none" stroke-linejoin="round"/>`)
        + S(millWheel(110, 118)) + `<path d="M97 141 q3 -5 6 0 M115 142 q3 -5 6 0" stroke="#E6F6F2" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="104" cy="136" r="1" fill="#E6F6F2"/><circle cx="121" cy="137" r="1" fill="#E6F6F2"/>` },
    { from: 4, svg: S(`<path d="M116 106 Q140 88 164 106" stroke="#9C6B3E" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M117 113 V105 M122 110 V102 M134 105.6 V97.6 M146 105.6 V97.6 M158 110 V102 M163 113 V105" stroke="#7A4A26" stroke-width="2"/>
        <path d="M116 114 Q140 96 164 114" stroke="#7A4A26" stroke-width="5" fill="none" stroke-linecap="round"/>`)
        + S(duck(98, 165, .9, '#F4F1EA', -1)) + S(duck(116, 160, .55, '#F2C531', -1)) + S(frog(139, 151, .85)) },
    { from: 5, svg: glow(79, 107, 10, '#FFD36B') + `<rect x="73" y="102" width="12" height="10" fill="#FFD877"/><path d="M79 102 V112 M73 107 H85" stroke="#7A4A26" stroke-width="1.2"/>`
        + `<circle class="smoke" cx="89.5" cy="61" r="4.5" fill="#F4F1EA" opacity=".85"/><circle class="smoke" style="animation-delay:1.2s" cx="92" cy="53" r="3.6" fill="#F4F1EA" opacity=".85"/>`
        + lampPost(60, 154, .8) + `<g class="float">${glow(166, 54, 14, '#FFF3C4')}${S(fairy(166, 54))}</g>`
        + flies([[24, 60], [44, 28], [178, 30], [152, 126], [30, 114], [130, 84]]) + sparkle(140, 22, .8) },
  ],
};

// ---------- Zone Géométrie : la ruche aux alvéoles ----------
const GEOMETRIE = {
  sub: 'La ruche aux alvéoles',
  stages: [
    { name: 'une graine', what: 'Trois petites alvéoles de miel qui brillent' },
    { name: 'une pousse', what: 'Des fleurs pour les abeilles et un piquet de bois' },
    { name: 'une jeune plante', what: 'Une ruche de paille s’installe sur le piquet' },
    { name: 'un bouton', what: 'Un cadre plein d’alvéoles et un pot de miel' },
    { name: 'une fleur', what: 'Les abeilles volent de fleur en fleur' },
    { name: 'un arbre', what: 'Une deuxième ruche, la fée et les lucioles' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 122, 24, '#FFE7A0') + tuft(70, 148) + tuft(132, 149) + S(`<g transform="translate(100 140) scale(1.35) translate(-100 -140)">
        <ellipse cx="100" cy="141" rx="24" ry="5.5" fill="#5E8A3A"/>
        ${[[92.2, 128], [107.8, 128], [100, 114.5]].map(([x, y]) => `<polygon points="${hexPts(x, y, 9)}" fill="#F2B53A" stroke="#B07A22" stroke-width="1.6"/><polygon points="${hexPts(x, y, 5.5)}" fill="#FFD36B"/>`).join('')}
        <path d="M104 136 Q104 142 106 142 Q108 142 108 136Z" fill="#F2B53A"/></g>`) + sparkle(128, 96, .9) + sparkle(72, 106, .6) },
    { from: 1, svg: S(`<rect x="96" y="100" width="8" height="46" fill="#7A4A26"/><path d="M98.5 104 V142 M101.5 110 V138" stroke="#5E3820" stroke-width=".8"/><path d="M84 102 L96 112 M116 102 L104 112" stroke="#7A4A26" stroke-width="2.2"/><rect x="78" y="97" width="44" height="5" rx="1.5" fill="#9C6B3E"/>`)
        + tuft(90, 149) + tuft(112, 150) + S(lavender(8, 156)) + S(flower(20, 166, '#FFFFFF')) + S(flower(62, 164, '#F2C531')) + S(flower(172, 162, '#F2C531')) + S(flower(188, 152, '#FFFFFF')) + S(lavender(158, 168)) + S(bluebell(128, 166)) },
    { from: 2, svg: S(skep(100, 98, 1)) + sparkle(138, 64, .7) },
    { from: 3, svg: S(`<path d="M127 146 V153 M157 146 V153" stroke="#5E3820" stroke-width="3"/><rect x="122" y="104" width="40" height="43" rx="2" fill="#9C6B3E"/><rect x="125" y="107" width="34" height="37" fill="#C98A2E"/>${comb(129, 111.5, 4, 5, 4.2)}<rect x="120" y="101" width="44" height="4" rx="1.5" fill="#7A4A26"/>`)
        + S(`<g transform="translate(80 162)"><path d="M3 -18 L10 -28" stroke="#7A4A26" stroke-width="2"/><circle cx="10.5" cy="-29" r="2.4" fill="#C98A2E"/><path d="M-9 0 Q-12 -10 -7 -16 H7 Q12 -10 9 0Z" fill="#B5843F"/><path d="M-7.5 -16 H7.5 V-18.5 H-7.5Z" fill="#7A4A26"/><path d="M-6 -16 Q-6 -10 -4 -10 Q-2 -10 -2 -14 Q0 -8 2 -14 V-16Z" fill="#F2B53A"/><path d="M-6 -6 H6" stroke="#8A5A2B" stroke-width="1"/></g>`) },
    { from: 4, svg: `<path d="M60 84 Q80 66 98 74 T132 52 M150 84 Q164 98 176 126" stroke="#8A6A3A" stroke-width="1" stroke-dasharray="2 3" fill="none"/>`
        + `<g class="float">${[[60, 84], [132, 52], [176, 126]].map(([x, y]) => S(bee(x, y, 1.4))).join('')}</g>`
        + `<g class="float" style="animation-delay:1.1s">${[[80, 46], [150, 84], [118, 90]].map(([x, y]) => S(bee(x, y, 1.25))).join('')}</g>` },
    { from: 5, svg: S(`<path d="M26 146 V128 H54 V146Z" fill="#7A4A26"/><path d="M32 146 V131 M46 146 V132" stroke="#5E3820" stroke-width="1"/><ellipse cx="40" cy="128" rx="14" ry="3.5" fill="#C9A06A"/><ellipse cx="40" cy="128" rx="8" ry="2" fill="none" stroke="#9C6B3E" stroke-width=".8"/>${skep(40, 127, .62)}`)
        + `<g class="float">${glow(162, 44, 14, '#FFF3C4')}${S(fairy(162, 44))}</g>`
        + flies([[20, 54], [64, 26], [184, 76], [112, 22], [186, 118], [70, 120]]) + sparkle(28, 92, .7) + sparkle(140, 26, .6) },
  ],
};

// ---------- Zone Attention : l'étang aux libellules ----------
const ATTENTION = {
  sub: 'L’étang aux libellules',
  stages: [
    { name: 'une graine', what: 'Une flaque où tombe une goutte de pluie' },
    { name: 'une pousse', what: 'La flaque devient une petite mare' },
    { name: 'une jeune plante', what: 'Des nénuphars et des roseaux poussent' },
    { name: 'un bouton', what: 'Une grenouille s’installe sur la grande feuille' },
    { name: 'une fleur', what: 'Les nénuphars fleurissent, deux libellules dansent' },
    { name: 'un arbre', what: 'Une cane et ses canetons, les lucioles du soir' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 126, 22, '#CFEFFF') + tuft(68, 148) + tuft(134, 149) + S(`<g transform="translate(100 140) scale(1.45) translate(-100 -140)">
        <ellipse cx="100" cy="141" rx="26" ry="6.5" fill="#5E8A3A"/>
        <ellipse cx="100" cy="140" rx="21" ry="5" fill="#7BBCD6"/>
        <ellipse cx="96" cy="140" rx="9" ry="2.2" fill="none" stroke="#E6F6F2" stroke-width="1"/>
        <ellipse cx="96" cy="140" rx="4" ry="1" fill="none" stroke="#E6F6F2" stroke-width="1"/>
        <path d="M108 139 Q113 134 118 139 Q113 142 108 139Z" fill="#E0A33A"/><path d="M108 139 L118 139" stroke="#B5843F" stroke-width=".6"/>
        <path d="M96 121 Q92 128 96 130 Q100 128 96 121Z" fill="#8FCBE6"/></g>`) + sparkle(130, 98, .8) + sparkle(70, 108, .6) },
    { from: 1, svg: S(`<ellipse cx="100" cy="140" rx="66" ry="20" fill="#5E9FC0"/><ellipse cx="100" cy="142" rx="60" ry="16" fill="#6FB3D2"/><path d="M58 136 Q70 133 82 136 M112 150 Q126 147 140 150 M116 130 Q126 128 136 130" stroke="#BFE3F0" stroke-width="1.6" fill="none" stroke-linecap="round"/>${[[36, 136, 6], [44, 152, 5], [158, 152, 6], [166, 138, 5], [84, 160, 5]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.55)}" fill="#B8B1A2"/>`).join('')}`)
        + tuft(26, 126) + tuft(176, 126) + tuft(60, 166) + tuft(146, 167) },
    { from: 2, svg: [[70, 146, 10, 3.8], [100, 140, 15, 5.5], [128, 131, 9, 3.4], [146, 148, 9, 3.4]].map(([x, y, rx, ry]) => S(pad(x, y, rx, ry))).join('')
        + S(cattails(30, 134)) + S(cattails(172, 132, -1)) },
    { from: 3, svg: S(frog(100, 141, 1.4)) + sparkle(122, 112, .6) },
    { from: 4, svg: S(waterLily(70, 145, 1)) + S(waterLily(146, 147, .9)) + S(waterLily(128, 130, .8))
        + `<g class="float">${S(dragonfly(60, 94, '#2F8FA6', -12))}</g><g class="float" style="animation-delay:1.4s">${S(dragonfly(146, 80, '#3D6FB8', 10, -1))}</g>` },
    { from: 5, svg: S(duck(134, 155, 1)) + S(duck(114, 157, .55, '#F2C531')) + S(duck(100, 158, .5, '#F2C531'))
        + glow(70, 134, 5, '#FFE08A') + glow(146, 136, 5, '#FFE08A')
        + flies([[24, 96], [52, 66], [90, 50], [130, 38], [176, 66], [184, 112], [16, 150], [116, 104]]) + sparkle(160, 24, .8) + sparkle(40, 30, .5) },
  ],
};

// ---------- Zone Mémoire : le vieux chêne aux souvenirs ----------
const MEMOIRE = {
  sub: 'Le vieux chêne aux souvenirs',
  stages: [
    { name: 'une graine', what: 'Un gland couché près d’une feuille de chêne' },
    { name: 'une pousse', what: 'Un jeune chêne déploie ses premières feuilles' },
    { name: 'une jeune plante', what: 'Le grand chêne et son creux mystérieux' },
    { name: 'un bouton', what: 'Une chouette s’installe dans le creux' },
    { name: 'une fleur', what: 'Une balançoire et une lanterne aux branches' },
    { name: 'un arbre', what: 'La petite porte ronde du lutin, les lucioles' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 126, 22, '#FFE7A0') + tuft(66, 148) + tuft(138, 149) + S(`<g transform="translate(100 140) scale(1.5) translate(-100 -140)">
        <ellipse cx="100" cy="141" rx="22" ry="5.5" fill="#5E8A3A"/>
        ${oakLeaf(112, 140, 62, 1.5, '#8DBF5E')}
        <ellipse cx="99" cy="134.5" rx="9.5" ry="6.5" fill="#B87A3A" transform="rotate(-12 99 134.5)"/>
        <ellipse cx="101" cy="132" rx="5" ry="1.6" fill="#D9A160" transform="rotate(-12 101 132)"/>
        <path d="M108.3 131.8 l2.6 -.6 l-1.6 2.2Z" fill="#8A5A2B"/>
        <ellipse cx="90.5" cy="136.3" rx="4.5" ry="7.2" fill="#6E5132" transform="rotate(-12 90.5 136.3)"/>
        <path d="M88 131 l3 3 M87.5 135 l3 3 M88 139 l3 3 M91.5 130 l1.5 2 M92 137 l1.5 2" stroke="#4A3220" stroke-width=".7"/>
        <path d="M86.5 135 q-3 -1 -4 -4" stroke="#6E5132" stroke-width="1.4" fill="none" stroke-linecap="round"/></g>`) + sparkle(128, 98, .9) + sparkle(72, 110, .6) },
    { from: 1, to: 1, svg: tuft(70, 150) + tuft(132, 151) + S(`<ellipse cx="100" cy="146" rx="20" ry="4.5" fill="#5E8A3A"/>
        <path d="M97 146 Q99 122 98.5 98 H101.5 Q101 122 103 146Z" fill="#7A4A26"/>
        <path d="M100 118 Q90 110 86 104 M100 112 Q110 104 114 98" stroke="#7A4A26" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="100" cy="88" r="16" fill="#4E8A3A"/><circle cx="86" cy="98" r="10" fill="#5E9A45"/><circle cx="114" cy="94" r="10" fill="#5E9A45"/><circle cx="100" cy="76" r="11" fill="#5E9A45"/>
        ${oakLeaf(92, 86, -20, 1.2, '#8DBF5E')}${oakLeaf(110, 84, 25, 1.2, '#8DBF5E')}${oakLeaf(100, 72, 0, 1.1, '#8DBF5E')}${oakLeaf(84, 100, -50, 1, '#8DBF5E')}`) + sparkle(130, 70, .6) },
    { from: 2, svg: tuft(54, 156) + tuft(150, 157) + fern(178, 154, -1) + S(`
        <path d="M108 100 Q130 88 168 92" stroke="#6E4325" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M92 104 Q72 94 46 98" stroke="#6E4325" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="168" cy="89" r="8" fill="#4E8A3A"/><circle cx="45" cy="95" r="7" fill="#4E8A3A"/>
        <path d="M70 150 Q86 144 89 124 Q91 98 90 66 H110 Q109 98 111 124 Q114 144 130 150Z" fill="#7A4A26"/>
        <path d="M95 140 Q94 120 96 118 M105 142 Q107 124 105 118 M100 70 V86 M93 76 Q94 84 92 90" stroke="#5E3820" stroke-width="1.2" fill="none"/>
        <path d="M78 150 Q85 146 88 140 M122 150 Q115 146 112 140" stroke="#5E3820" stroke-width="1.2" fill="none"/>
        <ellipse cx="100" cy="104" rx="8.5" ry="11" fill="#9C6B3E"/><ellipse cx="100" cy="104.5" rx="6.5" ry="9" fill="#2E1C10"/>
        <circle cx="66" cy="62" r="24" fill="#3F7A34"/><circle cx="134" cy="62" r="24" fill="#3F7A34"/>
        <circle cx="100" cy="46" r="34" fill="#4E8A3A"/><circle cx="80" cy="34" r="22" fill="#5E9A45"/><circle cx="122" cy="36" r="22" fill="#5E9A45"/>
        <circle cx="86" cy="26" r="9" fill="#6FB04E"/><circle cx="120" cy="26" r="8" fill="#6FB04E"/><circle cx="62" cy="54" r="7" fill="#4E8A3A"/><circle cx="140" cy="54" r="7" fill="#4E8A3A"/>
        ${oakLeaf(70, 76, -30, 1.3, '#6FB04E')}${oakLeaf(130, 78, 30, 1.3, '#6FB04E')}${oakLeaf(100, 70, 0, 1.2, '#6FB04E')}`) },
    { from: 3, svg: S(owl(100, 105)) + S(`<g transform="translate(64 156)"><rect x="-1.2" y="-8" width="2.4" height="8" fill="#F1E7D2"/><path d="M-5 -7 Q0 -14 5 -7Z" fill="#A86B3A"/><rect x="6" y="-5" width="2" height="5" fill="#F1E7D2"/><path d="M3.5 -4.5 Q7 -9 10.5 -4.5Z" fill="#A86B3A"/></g>`)
        + S(`<g transform="translate(140 160)"><ellipse cx="0" cy="-3" rx="3" ry="3.6" fill="#B87A3A"/><path d="M-3.4 -4 Q0 -9 3.4 -4Z" fill="#6E5132"/><ellipse cx="8" cy="-2" rx="2.6" ry="3" fill="#C98A45"/><path d="M5 -3 Q8 -7 11 -3Z" fill="#6E5132"/></g>`) + sparkle(130, 104, .6) },
    { from: 4, svg: S(`<path d="M146 91 V129 M159 91 V129" stroke="#C9B48E" stroke-width="1.6"/><rect x="141" y="127" width="23" height="4" rx="1.5" fill="#9C6B3E"/>`)
        + glow(56, 107.5, 9, '#FFC94D') + S(lantern(56, 97)) },
    { from: 5, svg: glow(116, 136, 6, '#FFC94D') + S(`<path d="M89 149 V139 a11 11 0 0 1 22 0 V149Z" fill="#9C6B3E"/><path d="M91 149 V139 a9 9 0 0 1 18 0 V149Z" fill="#5E9A45"/><path d="M95.5 149 V133 M100 149 V130 M104.5 149 V133" stroke="#4E8A3A" stroke-width="1"/><circle cx="105.5" cy="141" r="1.3" fill="#D9A21E"/><circle cx="100" cy="135.5" r="2" fill="#FFD877" stroke="#5E3820" stroke-width=".8"/>`)
        + S(`<ellipse cx="100" cy="154" rx="6" ry="2.4" fill="#B8B1A2"/><ellipse cx="93" cy="160" rx="5.5" ry="2.2" fill="#A59E8F"/><ellipse cx="99" cy="166" rx="6" ry="2.4" fill="#B8B1A2"/>`)
        + S(elf(152, 115))
        + flies([[24, 44], [176, 34], [30, 130], [180, 120], [124, 140], [60, 120], [150, 12]]) + sparkle(28, 18, .7) },
  ],
};

// ---------- Zone Espace : le sentier et le pont de pierre ----------
const PATH = 'M72 170 Q92 154 90 140 Q88 126 96 118 Q106 110 124 106 L132 106 Q114 113 108 120 Q104 128 110 140 Q114 156 130 170Z';
const CREEK = 'M0 130 Q50 122 100 130 T200 126 V140 Q150 146 100 141 T0 143Z';
const STAKE = `<path d="M-4 0 V-30 L0 -36 L4 -30 V0Z" fill="#9C6B3E"/><path d="M0 -33 V-2 M-2 -26 V-18" stroke="#7A4A26" stroke-width=".8"/><path d="M-4.5 -22 Q0 -19 4.5 -22 M-4.5 -18 Q0 -15 4.5 -18" stroke="#5E9A45" stroke-width="1.8" fill="none"/><path d="M4.5 -20 Q10 -22 12 -18 Q8 -15 4.5 -18Z" fill="#6FB04E"/>`;
const ESPACE = {
  sub: 'Le sentier et le pont de pierre',
  stages: [
    { name: 'une graine', what: 'Un piquet de bois planté dans la mousse' },
    { name: 'une pousse', what: 'Un sentier serpente à travers la prairie' },
    { name: 'une jeune plante', what: 'Un ruisseau et son pont de pierre en arche' },
    { name: 'un bouton', what: 'Un poteau indicateur montre les directions' },
    { name: 'une fleur', what: 'Des lanternes s’allument le long du chemin' },
    { name: 'un arbre', what: 'La fée guide les promeneurs, la pierre-carte et les papillons' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 118, 22, '#FFE7A0') + tuft(70, 148) + tuft(132, 149) + S(`<g transform="translate(100 144) scale(1.4)"><ellipse cx="0" cy="0" rx="20" ry="5" fill="#5E8A3A"/>${STAKE}<path d="M-12 1 Q-8 -4 -4 0 M4 0 Q8 -4 12 1" stroke="#4E8A3A" stroke-width="1.6" fill="none"/></g>`) + sparkle(128, 92, .9) + sparkle(72, 104, .6) },
    { from: 1, svg: `<path d="${PATH}" fill="#D9C49A" stroke="#BFA676" stroke-width="1.2"/>${[[86, 162, 2.4], [116, 164, 2], [98, 152, 1.6], [104, 134, 1.4], [112, 116, 1.2], [94, 126, 1.2]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${n(r * 0.6)}" fill="#BFA676"/>`).join('')}`
        + tuft(60, 160) + tuft(146, 162) + S(flower(186, 154, '#F2C531')) + S(flower(22, 166, '#FFFFFF')) + S(bluebell(170, 168)) },
    { from: 1, to: 2, svg: S(at(40, 150, .8, STAKE)) },
    { from: 2, svg: S(`<path d="${CREEK}" fill="#6FB3D2"/><path d="M14 134 Q30 131 46 134 M150 133 Q166 130 182 133 M40 139 Q52 137 64 139" stroke="#BFE3F0" stroke-width="1.5" fill="none" stroke-linecap="round"/>`)
        + S(`<path d="M58 126 Q100 98 142 126 V132 Q100 104 58 132Z" fill="#A59E8F"/>
        <path d="M58 146 V132 Q100 104 142 132 V146 H126 Q100 110 74 146Z" fill="#B8B1A2"/>
        <path d="M58 139 H70 M130 139 H142 M66 132 V146 M134 132 V146 M82 122 L86 133 M118 122 L114 133 M100 117 V127" stroke="#8C877C" stroke-width=".9"/>
        <path d="M58 132 Q100 104 142 132" stroke="#8C877C" stroke-width="1.4" fill="none"/>
        <ellipse cx="70" cy="125" rx="5" ry="1.8" fill="#6FB04E"/><ellipse cx="128" cy="122" rx="4" ry="1.5" fill="#6FB04E"/>`) },
    { from: 3, svg: S(`<path d="M38 150 V96 H42 V150Z" fill="#7A4A26"/><path d="M35 97 L40 91 L45 97Z" fill="#5E3820"/>
        <path d="M42 102 H62 L68 107 L62 112 H42Z" fill="#B5843F"/>
        <path d="M38 116 H18 L12 121 L18 126 H38Z" fill="#9C6B3E"/>
        <path d="M42 130 H58 L63 134.5 L58 139 H42Z" fill="#B5843F"/>
        <rect x="51" y="107" width="2.4" height="3.5" fill="#F1E7D2"/><path d="M48 108 Q52.2 101.5 56.4 108Z" fill="#C8352B"/>
        <path d="M19 121.5 q3 -3 6 0 t6 0" stroke="#3D6FB8" stroke-width="1.6" fill="none"/>
        <path d="M46 137 L49 131 L52 137Z M51 137 L54.5 130 L58 137Z" fill="#3F7A34"/>
        <path d="M30 150 Q34 145 38 150 M42 150 Q46 145 50 150" stroke="#4E8A3A" stroke-width="1.6" fill="none"/>`) },
    { from: 4, svg: lampPost(64, 166, .85) + lampPost(144, 168, .85) + lampPost(148, 130, .6) + lampPost(136, 106, .42) },
    { from: 5, svg: S(`<path d="M152 162 Q150 150 160 148 Q174 146 180 154 Q182 162 168 164Z" fill="#B8B1A2"/><path d="M156 158 Q162 152 168 156 T176 151" stroke="#6E6A61" stroke-width="1.2" stroke-dasharray="1.5 2" fill="none"/><circle cx="156" cy="158" r="1.4" fill="#6E6A61"/><ellipse cx="160" cy="149.5" rx="5" ry="1.6" fill="#6FB04E"/>${sparkle(177, 150.5, .45, '#C8352B')}`)
        + `<g class="float">${glow(150, 60, 14, '#FFF3C4')}${S(fairy(150, 60))}</g>`
        + S(butterfly(70, 66, '#E8892F')) + S(butterfly(178, 98, '#3F7FD1')) + S(butterfly(22, 82, '#F2C531'))
        + flies([[30, 40], [100, 30], [184, 40], [120, 84], [12, 104]]) + sparkle(64, 22, .7) },
  ],
};

// ---------- Zone Problèmes : l'atelier du lutin bricoleur ----------
const PROBLEMES = {
  sub: 'L’atelier du lutin bricoleur',
  stages: [
    { name: 'une graine', what: 'Une bûche fraîchement coupée' },
    { name: 'une pousse', what: 'Un tréteau et de belles planches' },
    { name: 'une jeune plante', what: 'La cabane-atelier du lutin sort de terre' },
    { name: 'un bouton', what: 'L’établi, le marteau et la scie' },
    { name: 'une fleur', what: 'Une charrette en construction et sa roue' },
    { name: 'un arbre', what: 'La charrette est finie ! Le lutin et les engrenages magiques' },
  ],
  stickers: [
    { from: 0, to: 0, svg: glow(100, 124, 24, '#FFE7A0') + tuft(64, 148) + tuft(140, 149) + S(`<g transform="translate(100 140) scale(1.4) translate(-100 -140)">
        <ellipse cx="104" cy="142" rx="26" ry="5" fill="#5E8A3A"/>
        <path d="M86 122 H120 Q126 122 126 132 Q126 142 120 142 H86Z" fill="#7A4A26"/>
        <path d="M94 126 H118 M96 132 H122 M93 138 H116" stroke="#5E3820" stroke-width="1"/>
        <ellipse cx="86" cy="132" rx="7" ry="10" fill="#E2B866"/>
        <ellipse cx="86" cy="132" rx="4.5" ry="6.5" fill="none" stroke="#C99A5A" stroke-width="1"/>
        <ellipse cx="86" cy="132" rx="2" ry="3" fill="none" stroke="#C99A5A" stroke-width="1"/>
        <path d="M112 122 Q114 115 118 112" stroke="#5E3820" stroke-width="1.6" fill="none"/>
        <path d="M118 112 Q124 108 127 112 Q122 116 118 112Z" fill="#6FB04E"/></g>`) + sparkle(128, 96, .9) + sparkle(70, 108, .6) },
    { from: 1, to: 1, svg: tuft(54, 152) + tuft(142, 154) + S(`<path d="M74 124 L64 148 M80 124 L88 148 M120 124 L112 148 M126 124 L136 148" stroke="#7A4A26" stroke-width="3.4" stroke-linecap="round"/>
        <rect x="66" y="118" width="68" height="7" rx="1.5" fill="#9C6B3E"/>
        <g transform="rotate(-4 100 113)"><rect x="56" y="110" width="88" height="7" rx="1" fill="#D9B07A"/><path d="M62 113.5 H138" stroke="#C49A62" stroke-width=".8"/></g>`)
        + S(`<rect x="148" y="155" width="44" height="5" rx="1" fill="#B5843F"/><rect x="146" y="150" width="42" height="5" rx="1" fill="#C49A62"/><rect x="150" y="145" width="38" height="5" rx="1" fill="#D9B07A"/>`)
        + S(`<path d="M18 148 H40 V160 H18Z" fill="#7A4A26"/><ellipse cx="18" cy="154" rx="4" ry="6" fill="#E2B866"/><ellipse cx="18" cy="154" rx="2" ry="3" fill="none" stroke="#C99A5A" stroke-width=".8"/>`) + sparkle(100, 92, .6) },
    { from: 2, svg: tuft(150, 140) + S(`
        <path d="M66 132 V86 L100 58 L134 86 V132Z" fill="#B5843F"/>
        <path d="M74 132 V80 M82 132 V73 M90 132 V67 M110 132 V67 M118 132 V73 M126 132 V80" stroke="#9C6B3E" stroke-width="1.2"/>
        <rect x="70" y="98" width="13" height="11" fill="#3B2A1A" stroke="#7A4A26" stroke-width="1.8"/><path d="M76.5 98 V109 M70 103.5 H83" stroke="#7A4A26" stroke-width="1.2"/>
        <rect x="115" y="98" width="13" height="11" fill="#3B2A1A" stroke="#7A4A26" stroke-width="1.8"/><path d="M121.5 98 V109 M115 103.5 H128" stroke="#7A4A26" stroke-width="1.2"/>
        <path d="M88 132 V110 a12 12 0 0 1 24 0 V132Z" fill="#7A4A26"/>
        <path d="M94 132 V101 M100 132 V98 M106 132 V101" stroke="#5E3820" stroke-width="1"/>
        <circle cx="108" cy="120" r="1.3" fill="#D9A21E"/>
        <path d="M50 92 L100 50 L150 92 L141 94 L100 60 L59 94Z" fill="#5E7D3A"/>
        <path d="M56 89 L100 52.5 L144 89" stroke="#4E6B30" stroke-width="1" fill="none"/>
        <ellipse cx="72" cy="80" rx="3" ry="1.4" fill="#8DBF5E"/><ellipse cx="124" cy="76" rx="3" ry="1.4" fill="#8DBF5E"/>
        <path d="M64 132 H136" stroke="#5E3820" stroke-width="2"/>`)
        + S(`<path d="M14 132 L8 150 M18 132 L22 150 M36 132 L32 150 M40 132 L46 150" stroke="#7A4A26" stroke-width="2.6" stroke-linecap="round"/><rect x="8" y="127" width="36" height="5" rx="1.2" fill="#9C6B3E"/><rect x="2" y="121" width="46" height="5" rx="1" fill="#D9B07A"/>`) },
    { from: 3, svg: S(`<rect x="143" y="100" width="3" height="34" fill="#5E3820"/><rect x="176" y="100" width="3" height="34" fill="#5E3820"/>
        <rect x="141" y="100" width="40" height="27" rx="1.5" fill="#7A5332"/>
        <path d="M147 105 H166 L163 117 H147Z" fill="#C3CCD1"/>
        <path d="M147 117 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2 l1.5 2 l1.5 -2" fill="none" stroke="#9AA3A8" stroke-width=".8"/>
        <path d="M166 103 H176 V116 H166 Q163 109.5 166 103Z" fill="#B5843F"/><rect x="168.5" y="106" width="5" height="7" rx="2" fill="#7A5332"/>
        <path d="M144 134 V156 M178 134 V156" stroke="#5E3820" stroke-width="3.5"/>
        <rect x="144" y="146" width="34" height="3" fill="#7A4A26"/>
        <rect x="138" y="129" width="46" height="6" rx="1.5" fill="#9C6B3E"/>
        <path d="M138 132 H184" stroke="#7A4A26" stroke-width=".8"/>
        <path d="M146 127 L160 123" stroke="#B5843F" stroke-width="2.4" stroke-linecap="round"/>
        <rect x="158" y="117.5" width="5.5" height="10" rx="1" fill="#7D8A92" transform="rotate(-16 160.7 122.5)"/>
        <circle cx="172" cy="126" r="2.6" fill="#C9B48E"/><circle cx="177" cy="126.5" r="2" fill="#B5843F"/>`) },
    { from: 4, to: 4, svg: S(`<rect x="58" y="146" width="8" height="10" fill="#7A4A26"/><rect x="92" y="146" width="8" height="10" fill="#7A4A26"/>
        <rect x="54" y="141" width="52" height="6" rx="1" fill="#B5843F"/>
        <rect x="54" y="137" width="52" height="4" fill="#C49A62"/>
        <rect x="54" y="131" width="30" height="4" fill="#D9B07A"/>
        <rect x="54" y="129" width="5" height="13" fill="#9C6B3E"/><rect x="101" y="129" width="5" height="13" fill="#9C6B3E"/>`)
        + S(`<g transform="translate(118 151) rotate(-10)">${wheel(0, 0, 9)}</g>`) + sparkle(84, 118, .7) + sparkle(130, 128, .5) },
    { from: 5, svg: glow(58, 103.5, 8, '#FFC94D') + S(lantern(58, 92))
        + S(`<path d="M104 143 L122 140 M122 136 V144" stroke="#7A4A26" stroke-width="2.6" stroke-linecap="round"/>
        <circle cx="66" cy="127" r="4.5" fill="#E2B866" stroke="#7A4A26" stroke-width="1.4"/><circle cx="76" cy="127" r="4.5" fill="#E2B866" stroke="#7A4A26" stroke-width="1.4"/><circle cx="71" cy="120" r="4.5" fill="#E2B866" stroke="#7A4A26" stroke-width="1.4"/>
        <path d="M52 130 H108 L104 148 H56Z" fill="#B5843F"/>
        <path d="M54 136 H106 M55 142 H105 M70 130 V148 M90 130 V148" stroke="#9C6B3E" stroke-width="1"/>
        <path d="M52 130 H108" stroke="#C8352B" stroke-width="2.4" stroke-linecap="round"/>
        ${wheel(64, 151, 9)}${wheel(96, 151, 9)}`)
        + S(elf(130, 146))
        + glow(100, 74, 9, '#FFE08A') + S(gear(100, 74, 6))
        + `<g class="float">${glow(156, 40, 14, '#FFE08A')}${S(gear(152, 44, 7) + gear(165, 33, 5, '#E8B54A'))}</g>`
        + flies([[24, 44], [70, 22], [184, 70], [190, 118], [128, 20]]) + sparkle(30, 96, .7) },
  ],
};

// ZONES-SUIVANTES

export default {
  id: 'fees',
  age: '4-6',
  label: 'Fées et lutins',
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
