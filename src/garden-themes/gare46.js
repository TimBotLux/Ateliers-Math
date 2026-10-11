// Thème « Gare et trains », parcours 4-6 ans.
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
  title: 'Gare et trains — la logique',
  sub: 'Les aiguillages : la voie se sépare en deux',
  phone: 'Ma gare',
  bg: `
    <rect width="200" height="170" fill="url(#sky-gare)"/>
    <circle cx="170" cy="30" r="14" fill="#F2B84B" opacity=".85"/>
    <path d="M0 112 Q60 104 120 110 T200 106 V170 H0Z" fill="#CFE7B8"/>
    <path d="M0 150 H200 V170 H0Z" fill="#B5D99C"/>`,
  stages: [
    { name: 'une graine', what: 'Un piquet de chantier : ici, on va construire' },
    { name: 'une pousse', what: 'Un premier bout de rail' },
    { name: 'une jeune plante', what: 'La voie se sépare : voici l’aiguillage et son levier' },
    { name: 'un bouton', what: 'Un signal et le poste d’aiguillage' },
    { name: 'une fleur', what: 'Une locomotive arrive' },
    { name: 'un arbre', what: 'Un train complet, le signal passe au vert' },
  ],
  stickers: [
    { from: 0, to: 0, svg: S(`<rect x="96" y="104" width="5" height="36" rx="2" fill="#C98E4E"/><path d="M101 106 L122 112 L101 118 Z" fill="#E8892F"/>`) + S(`<ellipse cx="78" cy="140" rx="9" ry="5" fill="#B9C2C7"/><ellipse cx="86" cy="136" rx="7" ry="4" fill="#A3AEB4"/><ellipse cx="120" cy="141" rx="8" ry="4" fill="#B9C2C7"/>`) },
    { from: 1, to: 1, svg: S(`<rect x="40" y="126" width="80" height="20" rx="4" fill="#C9CFD3"/>${sleepers(44, 112, 136)}${rails(40, 120, 136)}`) },
    { from: 2, svg: S(`<rect x="4" y="126" width="192" height="20" rx="4" fill="#C9CFD3"/>${sleepers(8, 190, 136)}${rails(4, 196, 136)}`) + S(`<path d="M96 130 Q140 128 196 98" stroke="#C9CFD3" stroke-width="20" fill="none" stroke-linecap="round"/>${branchSleepers()}<path d="M96 133 Q140 131 196 101" stroke="#7D8A92" stroke-width="2.6" fill="none"/><path d="M104 141 Q146 138 196 109" stroke="#7D8A92" stroke-width="2.6" fill="none"/>`) + S(`<rect x="84" y="150" width="14" height="9" rx="2" fill="#7D8A92"/><path d="M91 151 L99 140" stroke="#1E2B2F" stroke-width="3" stroke-linecap="round"/><circle cx="99" cy="139" r="3.5" fill="#D9617A"/>`) },
    { from: 3, svg: S(`<rect x="14" y="78" width="40" height="34" rx="3" fill="#FFF3DF"/><path d="M10 80 L34 62 L58 80 Z" fill="#A8364F"/><rect x="22" y="88" width="10" height="9" rx="1.5" fill="#BFE0F5"/><rect x="38" y="88" width="10" height="9" rx="1.5" fill="#BFE0F5"/><rect x="29" y="100" width="10" height="12" rx="1.5" fill="#8A6F4D"/>`) + S(`<rect x="160" y="64" width="4" height="46" rx="2" fill="#1E2B2F"/><rect x="154" y="48" width="16" height="26" rx="4" fill="#1E2B2F"/><circle cx="162" cy="55" r="4" fill="#E0524F"/><circle cx="162" cy="67" r="4" fill="#3D4A50"/>`) },
    { from: 4, svg: S(loco(118, 138)) + `<circle class="smoke" cx="128" cy="92" r="6" fill="#fff"/><circle class="smoke" style="animation-delay:1.2s" cx="133" cy="84" r="5" fill="#fff"/>` },
    { from: 5, svg: S(wagon(78, 138, '#2F6FB0', '<circle cx="9" cy="-24" r="5" fill="#E8892F"/><circle cx="20" cy="-25" r="5" fill="#F2B84B"/>') + wagon(40, 138, '#F2B84B', '<rect x="5" y="-30" width="9" height="9" rx="1.5" fill="#9C7A55"/><rect x="16" y="-30" width="9" height="9" rx="1.5" fill="#C98E4E"/>') + wagon(2, 138, '#2E7D5B')) + `<circle cx="162" cy="55" r="4.4" fill="#3D4A50"/><circle cx="162" cy="67" r="4.4" fill="#7DD36F"/>` + S(`<path d="M178 150 V128" stroke="#8A6F4D" stroke-width="3"/><circle cx="178" cy="120" r="12" fill="#6FA866"/><circle cx="172" cy="126" r="7" fill="#5B8F57"/>`) },
  ],
};


// ---------- Outils locaux (zones 4-6 ans) ----------
// Voie complète (ballast, traverses, rails) centrée sur y.
const track = (x1, x2, y = 136) => `<rect x="${x1}" y="${y - 10}" width="${x2 - x1}" height="20" rx="4" fill="#C9CFD3"/>${sleepers(x1 + 4, x2 - 6, y)}${rails(x1, x2, y)}`;
// Points (jamais de chiffres) posés sur un wagon (coordonnées locales du wagon).
const DOTS = { 1: [15], 2: [9, 21], 3: [6, 15, 24] };
const dots = (n) => DOTS[n].map((cx) => `<circle cx="${cx}" cy="-14" r="3.2" fill="#FFF3DF"/>`).join('');
// Petit personnage debout (pieds en x,y) ; cap = casquette/casque, sinon cheveux.
const person = (x, y, coat, top = '#7A4A26', cap = false, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-4" y="-10" width="3.4" height="10" rx="1.4" fill="#1E2B2F"/><rect x="0.6" y="-10" width="3.4" height="10" rx="1.4" fill="#1E2B2F"/>
    <path d="M-6 -8 L-5 -21 Q0 -24 5 -21 L6 -8Z" fill="${coat}"/>
    <circle cx="0" cy="-27" r="4.8" fill="#EFC7A6"/>
    ${cap
    ? `<path d="M-5.2 -27.5 Q-5 -33.5 0 -33.5 Q5 -33.5 5.2 -27.5Z" fill="${top}"/><rect x="-6.5" y="-28.5" width="13" height="2" rx="1" fill="${top}"/>`
    : `<path d="M-5 -26.5 Q-5.5 -33 0 -33 Q5.5 -33 5 -26.5 Q3 -30 0 -30 Q-3 -30 -5 -26.5Z" fill="${top}"/>`}
    <circle cx="-1.7" cy="-26" r=".8" fill="#1E2B2F"/><circle cx="1.7" cy="-26" r=".8" fill="#1E2B2F"/>
  </g>`;
const crate = (x, y, w = 18, c = '#C98E4E') => `<rect x="${x}" y="${y}" width="${w}" height="${w}" rx="2" fill="${c}"/><rect x="${x + 2.5}" y="${y + 2.5}" width="${w - 5}" height="${w - 5}" rx="1" fill="none" stroke="#8A6F4D" stroke-width="1.4"/><path d="M${x + 3} ${y + 3} L${x + w - 3} ${y + w - 3}" stroke="#8A6F4D" stroke-width="1.6"/>`;
const barrel = (x, b, c = '#9C7A55') => `<rect x="${x - 7}" y="${b - 18}" width="14" height="18" rx="4" fill="${c}"/><rect x="${x - 7}" y="${b - 14}" width="14" height="2" fill="#5E4A33"/><rect x="${x - 7}" y="${b - 6}" width="14" height="2" fill="#5E4A33"/>`;
const tree = (x, b) => `<rect x="${x - 2}" y="${b - 22}" width="4" height="22" rx="1.5" fill="#8A6F4D"/><circle cx="${x}" cy="${b - 30}" r="12" fill="#6FA866"/><circle cx="${x - 6}" cy="${b - 24}" r="7" fill="#5B8F57"/>`;
const bird = (x, y) => `<path d="M${x - 6} ${y} Q${x - 3} ${y - 4} ${x} ${y} Q${x + 3} ${y - 4} ${x + 6} ${y}" stroke="#1E2B2F" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
const wheel = (x, y, r = 8) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#1E2B2F"/>${[0, 45, 90, 135].map((a) => `<rect x="${x - r + 2}" y="${y - 0.9}" width="${2 * r - 4}" height="1.8" fill="#7D8A92" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle cx="${x}" cy="${y}" r="${Math.round(r * 3) / 10}" fill="#F2B84B"/>`;
const greenLoco = (x, y) => loco(x, y).replaceAll('#D9617A', '#6FA866').replaceAll('#A8364F', '#2E7D5B');
const bench = (x, y) => `<rect x="${x + 3}" y="${y - 18}" width="2.5" height="18" fill="#1E2B2F"/><rect x="${x + 22.5}" y="${y - 18}" width="2.5" height="18" fill="#1E2B2F"/><rect x="${x}" y="${y - 19}" width="28" height="4" rx="1.5" fill="#9C7A55"/><rect x="${x}" y="${y - 11}" width="28" height="4" rx="1.5" fill="#9C7A55"/>`;
const smoke = (pts) => pts.map(([x, y, r], i) => `<circle class="smoke"${i ? ` style="animation-delay:${(i * 0.9).toFixed(1)}s"` : ''} cx="${x}" cy="${y}" r="${r}" fill="#fff"/>`).join('');

// ---------- Zone Numération : les rails ----------
const NUMERATION = {
  sub: 'Les rails : on pose la voie, traverse après traverse',
  stages: [
    { name: 'une graine', what: 'Une pile de rails et de traverses' },
    { name: 'une pousse', what: 'Un premier petit bout de voie' },
    { name: 'une jeune plante', what: 'Une longue voie et son butoir au bout' },
    { name: 'un bouton', what: 'Trois wagons : un point, deux points, trois points' },
    { name: 'une fleur', what: 'Une draisine pour rouler sur les rails' },
    { name: 'un arbre', what: 'Les cheminots font avancer la draisine : la ligne est prête' },
  ],
  stickers: [
    { from: 5, svg: S(tree(26, 114)) },
    { from: 0, to: 0, svg: S(`<rect x="66" y="138" width="68" height="7" rx="2" fill="#9C7A55"/><rect x="70" y="131" width="60" height="7" rx="2" fill="#8A6F4D"/><rect x="74" y="124" width="52" height="7" rx="2" fill="#9C7A55"/><rect x="62" y="119" width="76" height="4" rx="2" fill="#7D8A92"/><rect x="66" y="114" width="70" height="4" rx="2" fill="#7D8A92"/>`) + S(`<rect x="146" y="128" width="4" height="18" rx="1.5" fill="#8A6F4D" transform="rotate(30 148 137)"/><rect x="140" y="122" width="16" height="8" rx="2" fill="#7D8A92" transform="rotate(30 148 126)"/>`) },
    { from: 1, to: 1, svg: S(track(50, 150)) },
    { from: 2, svg: S(track(4, 178)) + S(`<path d="M174 142 L184 116 H190 V142Z" fill="#9C7A55"/><rect x="170" y="110" width="24" height="10" rx="2" fill="#D9617A"/><rect x="175" y="112" width="5" height="6" fill="#fff"/><rect x="185" y="112" width="5" height="6" fill="#fff"/>`) },
    { from: 3, svg: S(wagon(8, 138, '#F2B84B', dots(1)) + wagon(46, 138, '#2F6FB0', dots(2)) + wagon(84, 138, '#2E7D5B', dots(3))) },
    { from: 5, svg: S(person(131, 128, '#D9617A', '#F2B84B', true)) + S(person(157, 128, '#2F6FB0', '#F2B84B', true)) },
    { from: 4, svg: S(`<g transform="translate(128 138)"><rect x="14.5" y="-26" width="3" height="16" fill="#A8364F"/><rect x="2" y="-29" width="28" height="3.5" rx="1.75" fill="#A8364F" transform="rotate(-12 16 -27)"/><circle cx="16" cy="-27" r="2.4" fill="#1E2B2F"/><rect x="0" y="-10" width="32" height="6" rx="2" fill="#F2B84B"/><rect x="-1" y="-5" width="34" height="3" rx="1.5" fill="#1E2B2F"/><circle cx="7" cy="0" r="4.5" fill="#1E2B2F"/><circle cx="25" cy="0" r="4.5" fill="#1E2B2F"/><circle cx="7" cy="0" r="1.6" fill="#F2B84B"/><circle cx="25" cy="0" r="1.6" fill="#F2B84B"/></g>`) },
    { from: 5, svg: sparkle(60, 60, 1) + sparkle(110, 48, 0.8, '#F2B84B') + sparkle(150, 70, 0.9) },
  ],
};

// ---------- Zone Calcul : l'atelier des locomotives ----------
const CALCUL = {
  sub: 'L’atelier : on assemble une locomotive pièce par pièce',
  stages: [
    { name: 'une graine', what: 'Une grande roue et une clé' },
    { name: 'une pousse', what: 'Trois roues reliées sur les rails' },
    { name: 'une jeune plante', what: 'Le châssis posé sur des cales, et la caisse à outils' },
    { name: 'un bouton', what: 'Le portique soulève la carrosserie de la locomotive' },
    { name: 'une fleur', what: 'La locomotive toute peinte attend dans le dépôt' },
    { name: 'un arbre', what: 'La locomotive sort du dépôt en fumant' },
  ],
  stickers: [
    { from: 4, svg: S(`<rect x="110" y="78" width="84" height="68" fill="#C98E4E"/><path d="M104 82 L152 50 L198 82Z" fill="#A8364F"/><circle cx="152" cy="68" r="5.5" fill="#BFE0F5"/><path d="M110 92 H118 M184 92 H194 M110 106 H118 M184 106 H194 M110 120 H118 M184 120 H194 M110 134 H118 M184 134 H194" stroke="#A86B3A" stroke-width="1.4"/><path d="M118 146 V94 Q151 68 184 94 V146Z" fill="#FFF3DF"/><path d="M122 146 V96 Q151 74 180 96 V146Z" fill="#3D4A50"/>`) },
    { from: 4, svg: S(`<rect x="21" y="84" width="3" height="42" fill="#8A6F4D"/><rect x="42" y="84" width="3" height="42" fill="#8A6F4D"/><path d="M22 96 L44 112 M44 96 L22 112" stroke="#8A6F4D" stroke-width="2"/><rect x="14" y="58" width="38" height="28" rx="4" fill="#2F6FB0"/><rect x="14" y="66" width="38" height="2" fill="#BFE0F5"/><rect x="14" y="76" width="38" height="2" fill="#BFE0F5"/><path d="M12 60 L33 46 L54 60Z" fill="#A8364F"/><rect x="50" y="74" width="14" height="4" rx="2" fill="#1E2B2F" transform="rotate(20 50 76)"/>`) },
    { from: 1, svg: S(track(4, 196)) },
    { from: 2, svg: S(`<rect x="14" y="112" width="24" height="12" rx="2" fill="#D9617A"/><rect x="14" y="116" width="24" height="2" fill="#A8364F"/><path d="M21 112 V108 H31 V112" stroke="#1E2B2F" stroke-width="2" fill="none"/>`) + S(`<path d="M42 124 L44 112 H50 L52 124Z" fill="#F2B84B"/><path d="M47 112 L52 104" stroke="#7D8A92" stroke-width="2" stroke-linecap="round"/>`) },
    { from: 0, to: 0, svg: S(wheel(100, 124, 16)) + S(`<g transform="translate(130 146) rotate(-20)"><rect x="0" y="-2.5" width="22" height="5" rx="2.5" fill="#7D8A92"/><path d="M20 -6 H28 V-2 H24 V2 H28 V6 H20Z" fill="#7D8A92"/></g>`) },
    { from: 1, to: 1, svg: S(`${wheel(80, 128)}${wheel(100, 128)}${wheel(120, 128)}<rect x="78" y="126.5" width="44" height="3" rx="1.5" fill="#D9617A"/>`) },
    { from: 2, to: 2, svg: S(`<rect x="62" y="114" width="12" height="20" rx="1.5" fill="#9C7A55"/><rect x="126" y="114" width="12" height="20" rx="1.5" fill="#9C7A55"/>${wheel(82, 120)}${wheel(100, 120)}${wheel(118, 120)}<rect x="80" y="118.5" width="40" height="3" rx="1.5" fill="#D9617A"/><rect x="58" y="104" width="84" height="9" rx="2" fill="#1E2B2F"/><circle cx="58" cy="108.5" r="3.5" fill="#D9617A"/><circle cx="142" cy="108.5" r="3.5" fill="#D9617A"/>`) },
    { from: 3, to: 3, svg: S(`<rect x="58" y="44" width="6" height="84" fill="#F2B84B"/><rect x="136" y="44" width="6" height="84" fill="#F2B84B"/><rect x="52" y="38" width="96" height="8" rx="2" fill="#F2B84B"/><path d="M64 58 L78 46 M136 58 L122 46" stroke="#F2B84B" stroke-width="4"/><path d="M56 42 H144" stroke="#C98E4E" stroke-width="1.4" stroke-dasharray="4 4"/><rect x="92" y="46" width="16" height="6" rx="1.5" fill="#1E2B2F"/><path d="M100 52 V62" stroke="#1E2B2F" stroke-width="1.6"/><path d="M100 62 v4 q0 3 -3 3" stroke="#7D8A92" stroke-width="2" fill="none"/>`)
      + S(`<path d="M100 64 L90 74 M100 64 L110 66" stroke="#1E2B2F" stroke-width="1.2"/><rect x="74" y="74" width="36" height="18" rx="4" fill="#C9CFD3"/><rect x="104" y="64" width="18" height="28" rx="3" fill="#B9C2C7"/><rect x="108" y="68" width="10" height="8" rx="2" fill="#BFE0F5"/><rect x="80" y="64" width="7" height="10" rx="1.5" fill="#7D8A92"/>`)
      + S(`<rect x="64" y="114" width="72" height="8" rx="2" fill="#1E2B2F"/>${wheel(82, 128)}${wheel(100, 128)}${wheel(118, 128)}<rect x="80" y="126.5" width="40" height="3" rx="1.5" fill="#D9617A"/>`)
      + sparkle(70, 110, 0.8) + sparkle(130, 108, 0.6) },
    { from: 4, to: 4, svg: S(greenLoco(136, 138)) + S(`<rect x="96" y="112" width="12" height="12" rx="2" fill="#7D8A92"/><rect x="96" y="112" width="12" height="4" rx="1" fill="#6FA866"/><path d="M104 112 L110 100" stroke="#8A6F4D" stroke-width="2" stroke-linecap="round"/>`) },
    { from: 5, svg: S(person(151, 128, '#2F6FB0', '#1E2B2F', true) + `<path d="M155 112 L161 102" stroke="#2F6FB0" stroke-width="3" stroke-linecap="round"/>`) + S(`<rect x="151.2" y="32" width="1.6" height="20" fill="#1E2B2F"/><path d="M152.8 33 L166 37 L152.8 41Z" fill="#F2B84B"/>`) },
    { from: 5, svg: S(greenLoco(70, 138)) + glow(68, 120, 5, '#FFE34D') + smoke([[78, 92, 6], [84, 82, 5], [92, 74, 4]]) + sparkle(30, 40, 0.9) + sparkle(112, 60, 0.7, '#F2B84B') },
  ],
};

// ---------- Zone Géométrie : le pont ----------
const GEOMETRIE = {
  sub: 'Le pont : des arcs et des triangles pour passer la rivière',
  stages: [
    { name: 'une graine', what: 'Un tas de pierres taillées' },
    { name: 'une pousse', what: 'La rivière et deux piles de pierre, une de chaque côté' },
    { name: 'une jeune plante', what: 'Le pont : une grande arche ronde et des triangles' },
    { name: 'un bouton', what: 'La voie passe sur le pont' },
    { name: 'une fleur', what: 'Un train traverse le pont' },
    { name: 'un arbre', what: 'Un petit bateau passe sous l’arche, les oiseaux volent' },
  ],
  stickers: [
    { from: 0, to: 0, svg: S(`<rect x="80" y="134" width="18" height="12" rx="3" fill="#B9C2C7"/><rect x="98" y="136" width="20" height="10" rx="3" fill="#A3AEB4"/><rect x="88" y="123" width="18" height="12" rx="3" fill="#C9CFD3"/><rect x="104" y="126" width="11" height="10" rx="2" fill="#B9C2C7"/>`) + S(`<rect x="126" y="140" width="16" height="4" rx="2" fill="#8A6F4D" transform="rotate(-25 134 142)"/><rect x="138" y="132" width="5" height="9" rx="1" fill="#7D8A92" transform="rotate(-25 134 142)"/>`) },
    { from: 1, svg: `<path d="M0 98 H42 L46 150 H0Z" fill="#B5D99C"/><path d="M200 98 H158 L154 150 H200Z" fill="#B5D99C"/><path d="M60 108 Q64 140 56 170 H144 Q136 140 140 108Z" fill="#8CC4E8"/><path d="M78 152 q5 -3 10 0 M108 162 q5 -3 10 0 M90 128 q4 -2 8 0" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>` },
    { from: 1, svg: S(`<rect x="36" y="96" width="30" height="54" rx="2" fill="#B9C2C7"/><path d="M36 110 H66 M36 124 H66 M36 138 H66 M51 96 V110 M44 110 V124 M58 124 V138 M48 138 V150" stroke="#8E9AA0" stroke-width="1.2"/>`) + S(`<rect x="134" y="96" width="30" height="54" rx="2" fill="#B9C2C7"/><path d="M134 110 H164 M134 124 H164 M134 138 H164 M149 96 V110 M142 110 V124 M156 124 V138 M152 138 V150" stroke="#8E9AA0" stroke-width="1.2"/>`) },
    { from: 2, svg: S(`<rect x="30" y="94" width="140" height="9" rx="2" fill="#A3AEB4"/><path d="M64 150 V138 A36 36 0 0 1 136 138 V150 H128 V138 A28 28 0 0 0 72 138 V150Z" fill="#8E9AA0"/><path d="M66 103 L70 118 L76 103 L81 108 L86 103 M134 103 L130 118 L124 103 L119 108 L114 103" stroke="#D9617A" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M42 150 V142 A7 7 0 0 1 56 142 V150Z M144 150 V142 A7 7 0 0 1 158 142 V150Z" fill="#7D8A92"/>`) },
    { from: 3, svg: S(track(0, 200, 86)) },
    { from: 4, svg: S(loco(124, 88)) + S(wagon(86, 88, '#2F6FB0', '<circle cx="9" cy="-24" r="5" fill="#E8892F"/><circle cx="20" cy="-25" r="5" fill="#F2B84B"/>') + wagon(48, 88, '#F2B84B', '<rect x="5" y="-30" width="9" height="9" rx="1.5" fill="#9C7A55"/><rect x="16" y="-30" width="9" height="9" rx="1.5" fill="#C98E4E"/>')) + smoke([[134, 42, 6], [140, 33, 5]]) },
    { from: 5, svg: S(`<rect x="99.5" y="124" width="2" height="28" fill="#8A6F4D"/><path d="M102 126 L116 148 H102Z" fill="#FFF3DF"/><path d="M99 130 L89 148 H99Z" fill="#F2B84B"/><path d="M84 151 H118 L111 160 H90Z" fill="#A8364F"/>`) + bird(30, 40) + bird(46, 30) + bird(62, 44) + S(flower(14, 152, '#FFFFFF') + flower(24, 156, '#F2C531')) + S(flower(178, 154, '#FFFFFF') + flower(188, 152, '#F2C531')) + sparkle(76, 162, 0.6, '#fff') + sparkle(124, 156, 0.7, '#fff') },
  ],
};

// ---------- Zone Attention : le passage à niveau ----------
const crossingSign = (x, b, s = 1) => `
  <g transform="translate(${x} ${b}) scale(${s})">
    <rect x="-2.5" y="-44" width="5" height="44" rx="1.5" fill="#7D8A92"/>
    <path d="M0 -74 L17 -44 L-17 -44Z" fill="#D9617A" stroke="#D9617A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M0 -65 L10.5 -48 L-10.5 -48Z" fill="#fff"/>
    <rect x="-6" y="-53" width="8" height="3.5" fill="#1E2B2F"/><rect x="1" y="-56" width="4" height="6.5" fill="#1E2B2F"/><rect x="-5" y="-55" width="2" height="2" fill="#1E2B2F"/>
    <circle cx="-4" cy="-49.5" r="1.3" fill="#1E2B2F"/><circle cx="0" cy="-49.5" r="1.3" fill="#1E2B2F"/><circle cx="3.5" cy="-49.5" r="1.3" fill="#1E2B2F"/>
  </g>`;
const xingPost = (x) => `<rect x="${x - 2}" y="78" width="4" height="46" fill="#7D8A92"/>
  <g transform="translate(${x} 74)"><rect x="-12" y="-2.5" width="24" height="5" fill="#fff" stroke="#D9617A" stroke-width="1.2" transform="rotate(30)"/><rect x="-12" y="-2.5" width="24" height="5" fill="#fff" stroke="#D9617A" stroke-width="1.2" transform="rotate(-30)"/></g>
  <rect x="${x - 10}" y="88" width="20" height="10" rx="5" fill="#1E2B2F"/><circle cx="${x - 5}" cy="93" r="3" fill="#6B3A44"/><circle cx="${x + 5}" cy="93" r="3" fill="#6B3A44"/>
  <rect x="${x - 5}" y="112" width="10" height="12" rx="2" fill="#F2B84B"/>`;
const arm = (px, py, a) => `<g transform="translate(${px} ${py}) rotate(${a})"><rect x="0" y="-2.5" width="34" height="5" rx="2.5" fill="#fff"/>${[5, 15, 25].map((sx) => `<rect x="${sx}" y="-2.5" width="5" height="5" fill="#D9617A"/>`).join('')}<circle r="3" fill="#1E2B2F"/></g>`;
const ATTENTION = {
  sub: 'Le passage à niveau : on regarde, on attend, le train passe',
  stages: [
    { name: 'une graine', what: 'Un panneau : attention, un train peut passer' },
    { name: 'une pousse', what: 'La route croise la voie ferrée' },
    { name: 'une jeune plante', what: 'Les barrières rayées et les feux, encore levées' },
    { name: 'un bouton', what: 'Les feux s’allument, les barrières se baissent' },
    { name: 'une fleur', what: 'La voiture attend pendant que le train passe' },
    { name: 'un arbre', what: 'La maison du garde-barrière et son drapeau' },
  ],
  stickers: [
    { from: 0, to: 0, svg: S(crossingSign(100, 132, 1.2)) + tuft(84, 134) + tuft(118, 136) },
    { from: 1, svg: `<path d="M30 112 Q100 66 170 112Z" fill="#BFDDA6"/><path d="M93 80 L107 80 L140 170 H60Z" fill="#8E9AA0"/><path d="M99.3 88 h1.4 v4 h-1.4z M99 100 h2 v6 h-2z M98.7 116 h2.6 v8 h-2.6z M98.4 152 h3.2 v12 h-3.2z" fill="#fff"/>` },
    { from: 1, svg: S(track(0, 200)) + S(crossingSign(180, 124)) },
    { from: 5, svg: S(`<rect x="6" y="76" width="38" height="36" fill="#FFF3DF"/><rect x="33" y="58" width="6" height="14" fill="#A8364F"/><path d="M2 78 L25 58 L48 78Z" fill="#2F6FB0"/><rect x="12" y="84" width="10" height="9" rx="1.5" fill="#BFE0F5"/><rect x="28" y="92" width="10" height="20" rx="1.5" fill="#A8364F"/><rect x="11" y="94" width="12" height="3" rx="1.5" fill="#6FA866"/><circle cx="14" cy="93.5" r="1.8" fill="#D9617A"/><circle cx="17.5" cy="93" r="1.8" fill="#F2B84B"/><circle cx="21" cy="93.5" r="1.8" fill="#D9617A"/>`) + smoke([[36, 50, 4], [40, 42, 3]]) },
    { from: 2, svg: S(xingPost(62)) + S(xingPost(138)) },
    { from: 2, to: 2, svg: S(arm(68, 116, -78)) + S(arm(132, 116, 258)) },
    { from: 3, svg: S(arm(68, 116, 0)) + S(arm(132, 116, 180)) + `<circle cx="57" cy="93" r="3.2" fill="#FF5A4F"/><circle cx="133" cy="93" r="3.2" fill="#FF5A4F"/>` + glow(57, 93, 7, '#FF6B5B') + glow(133, 93, 7, '#FF6B5B') },
    { from: 5, svg: S(person(48, 114, '#2F6FB0', '#1E2B2F', true) + `<path d="M43 104 L42 84" stroke="#8A6F4D" stroke-width="1.6"/><path d="M42 84 L33 87 L42 90Z" fill="#D9617A"/>`) },
    { from: 4, svg: S(`<g transform="translate(100 114)"><rect x="-15" y="-6" width="6" height="6" rx="1.5" fill="#1E2B2F"/><rect x="9" y="-6" width="6" height="6" rx="1.5" fill="#1E2B2F"/><path d="M-11 -14 L-8 -23 H8 L11 -14Z" fill="#2F6FB0"/><path d="M-8.3 -14.5 L-6.3 -21 H6.3 L8.3 -14.5Z" fill="#BFE0F5"/><rect x="-16" y="-15" width="32" height="11" rx="3" fill="#2F6FB0"/><circle cx="-11" cy="-9.5" r="2.6" fill="#F2B84B"/><circle cx="11" cy="-9.5" r="2.6" fill="#F2B84B"/><rect x="-5" y="-11" width="10" height="3" rx="1" fill="#1E2B2F"/></g>`) },
    { from: 4, svg: S(loco(150, 138)) + S(wagon(112, 138, '#2E7D5B', '<rect x="14" y="-30" width="9" height="9" rx="1.5" fill="#9C7A55"/>') + wagon(74, 138, '#F2B84B') + wagon(36, 138, '#2F6FB0', '<circle cx="9" cy="-24" r="5" fill="#E8892F"/><circle cx="20" cy="-25" r="5" fill="#D9617A"/>')) + smoke([[158, 92, 6], [150, 82, 5]]) },
    { from: 5, svg: bird(150, 34) + bird(132, 44) + sparkle(88, 40, 0.8) },
  ],
};

// ---------- Zone Mémoire : la gare et son horloge ----------
const MEMOIRE = {
  sub: 'La gare : on se souvient de l’heure du train',
  stages: [
    { name: 'une graine', what: 'Un banc pour attendre' },
    { name: 'une pousse', what: 'Le quai, le long de la voie' },
    { name: 'une jeune plante', what: 'Une petite gare avec sa porte et ses fenêtres' },
    { name: 'un bouton', what: 'La tour et sa grande horloge' },
    { name: 'une fleur', what: 'L’auvent du quai, les lampes et les valises' },
    { name: 'un arbre', what: 'Les voyageurs attendent, le drapeau flotte, tout est fleuri' },
  ],
  stickers: [
    { from: 1, svg: S(track(0, 200, 150)) + S(`<rect x="0" y="116" width="200" height="5" fill="#E9DCC6"/><rect x="0" y="118.5" width="200" height="2" fill="#F2B84B"/><rect x="0" y="121" width="200" height="17" fill="#B9C2C7"/><path d="M0 129 H200 M20 121 V129 M60 121 V129 M100 121 V129 M140 121 V129 M180 121 V129 M40 129 V138 M80 129 V138 M120 129 V138 M160 129 V138" stroke="#8E9AA0" stroke-width="1.2"/>`) },
    { from: 4, svg: S(`<rect x="128" y="80" width="4" height="38" fill="#2F6FB0"/><rect x="186" y="80" width="4" height="38" fill="#2F6FB0"/><path d="M122 84 L128 72 H198 V84Z" fill="#2E7D5B"/>${[126, 134, 142, 150, 158, 166, 174, 182, 190].map((cx) => `<circle cx="${cx}" cy="84" r="3.2" fill="#2E7D5B"/>`).join('')}<path d="M150 86 V91 M172 86 V91" stroke="#1E2B2F" stroke-width="1.4"/><path d="M146 91 H154 L152 96 H148Z M168 91 H176 L174 96 H170Z" fill="#1E2B2F"/><circle cx="150" cy="97" r="2.5" fill="#FFE34D"/><circle cx="172" cy="97" r="2.5" fill="#FFE34D"/>`) + glow(150, 97, 6, '#FFE34D') + glow(172, 97, 6, '#FFE34D') },
    { from: 3, svg: S(`<rect x="70" y="32" width="20" height="36" fill="#F4E3C3"/><path d="M66 36 L80 16 L94 36Z" fill="#A8364F"/><circle cx="80" cy="49" r="8.5" fill="#1E2B2F"/><circle cx="80" cy="49" r="7" fill="#fff"/><rect x="79.4" y="42.5" width="1.2" height="2" fill="#1E2B2F"/><rect x="79.4" y="53.5" width="1.2" height="2" fill="#1E2B2F"/><rect x="73.5" y="48.4" width="2" height="1.2" fill="#1E2B2F"/><rect x="84.5" y="48.4" width="2" height="1.2" fill="#1E2B2F"/><path d="M80 49 V44.5 M80 49 L83.5 50.5" stroke="#A8364F" stroke-width="1.6" stroke-linecap="round"/><circle cx="80" cy="49" r="1.1" fill="#1E2B2F"/>`) },
    { from: 2, svg: S(`<rect x="40" y="80" width="80" height="38" fill="#FFF3DF"/><path d="M34 82 L48 64 H112 L126 82Z" fill="#A8364F"/><path d="M73 118 V100 Q80 92 87 100 V118Z" fill="#2F6FB0"/><path d="M50 104 V95 Q56 88 62 95 V104Z M98 104 V95 Q104 88 110 95 V104Z" fill="#BFE0F5"/><rect x="40" y="114" width="80" height="4" fill="#E9DCC6"/>`) },
    { from: 5, svg: S(`<rect x="79.3" y="3" width="1.4" height="14" fill="#1E2B2F"/><path d="M80.7 3.5 L92 7 L80.7 10.5Z" fill="#2F6FB0"/>`) + S(`<rect x="49" y="104" width="14" height="3.5" rx="1" fill="#8A6F4D"/><circle cx="52" cy="103" r="2" fill="#D9617A"/><circle cx="56" cy="102.5" r="2" fill="#F2B84B"/><circle cx="60" cy="103" r="2" fill="#D9617A"/>`) + S(`<rect x="97" y="104" width="14" height="3.5" rx="1" fill="#8A6F4D"/><circle cx="100" cy="103" r="2" fill="#F2B84B"/><circle cx="104" cy="102.5" r="2" fill="#D9617A"/><circle cx="108" cy="103" r="2" fill="#F2B84B"/>`) },
    { from: 0, to: 0, svg: S(bench(86, 120)) + tuft(80, 122) + tuft(122, 122) },
    { from: 1, svg: S(bench(150, 118)) },
    { from: 4, svg: S(`<rect x="134" y="106" width="13" height="12" rx="2" fill="#D9617A"/><path d="M137.5 106 V103 H143.5 V106" stroke="#1E2B2F" stroke-width="1.4" fill="none"/><rect x="135.5" y="98" width="10" height="8" rx="1.5" fill="#2F6FB0"/><rect x="135.5" y="101" width="10" height="1.5" fill="#F2B84B"/>`) },
    { from: 5, svg: S(person(30, 118, '#D9617A', '#7A4A26')) + S(person(100, 118, '#6FA866', '#F2B84B') + person(112, 118, '#F2B84B', '#1E2B2F', false, 0.75)) + S(person(164, 118, '#2F6FB0', '#1E2B2F', true)) + bird(150, 30) + sparkle(30, 30, 0.8) },
  ],
};

// ---------- Zone Espace : le tunnel ----------
const ESPACE = {
  sub: 'Le tunnel : le train passe dedans, dessous, de l’autre côté',
  stages: [
    { name: 'une graine', what: 'Une colline toute verte' },
    { name: 'une pousse', what: 'On creuse : la paroi de roche apparaît' },
    { name: 'une jeune plante', what: 'L’entrée du tunnel, en arche de pierre' },
    { name: 'un bouton', what: 'La voie entre dans le tunnel' },
    { name: 'une fleur', what: 'Une locomotive sort du tunnel' },
    { name: 'un arbre', what: 'La montagne enneigée, les sapins et la lanterne du tunnel' },
  ],
  stickers: [
    { from: 5, svg: S(`<path d="M70 110 L130 22 L196 110Z" fill="#9FB3C2"/><path d="M130 22 L148 46 L140 43 L132 49 L124 43 L113.6 46Z" fill="#fff"/>`) },
    { from: 0, svg: S(`<path d="M30 146 Q40 70 100 60 Q170 52 198 120 V146Z" fill="#8DBF73"/>`) + tuft(150, 120) + tuft(176, 132) },
    { from: 1, svg: S(`<path d="M42 146 L46 102 Q56 80 78 76 Q102 78 112 98 L116 146Z" fill="#A3AEB4"/><path d="M50 128 L58 122 M104 116 L110 124 M106 136 L112 140 M54 92 L60 96" stroke="#7D8A92" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="108" cy="104" rx="5" ry="3.5" fill="#C9CFD3"/><ellipse cx="50" cy="114" rx="4" ry="3" fill="#C9CFD3"/>`) },
    { from: 2, svg: S(`<path d="M52 146 V104 Q52 80 76 80 Q100 80 100 104 V146Z" fill="#E3D3B5"/><path d="M60 146 V106 Q60 88 76 88 Q92 88 92 106 V146Z" fill="#1E2B2F"/><rect x="72" y="77" width="8" height="10" rx="1.5" fill="#D2BE98"/><path d="M52 118 H60 M92 118 H100 M52 132 H60 M92 132 H100 M54 96 L61 100 M98 96 L91 100" stroke="#C9B79A" stroke-width="1.4"/>`) },
    { from: 3, svg: S(track(0, 90)) },
    { from: 4, svg: S(loco(52, 138)) + S(`<path d="M92 146 V106 Q92 88 76 88 V80 Q100 80 100 104 V146Z" fill="#E3D3B5"/><path d="M92 118 H100 M92 132 H100 M98 96 L91 100" stroke="#C9B79A" stroke-width="1.4"/>`) + smoke([[58, 90, 6], [52, 80, 5], [46, 71, 4]]) + glow(50, 120, 5, '#FFE34D') },
    { from: 5, svg: S(`<rect x="129" y="98" width="3" height="6" fill="#8A6F4D"/>${pine(130.5, 99, 30, '#2E7D5B')}`) + S(`<rect x="150" y="96" width="3" height="6" fill="#8A6F4D"/>${pine(151.5, 97, 36, '#2E7D5B')}`) + S(`<rect x="172" y="102" width="3" height="6" fill="#8A6F4D"/>${pine(173.5, 103, 28, '#3F7A34')}`) },
    { from: 5, svg: S(`<path d="M52 94 H45 V98" stroke="#1E2B2F" stroke-width="1.6" fill="none"/><rect x="42" y="98" width="6" height="9" rx="1.5" fill="#1E2B2F"/><rect x="43.3" y="99.5" width="3.4" height="6" fill="#FFE34D"/>`) + glow(45, 102.5, 6, '#FFE34D') + bird(26, 46) + bird(40, 38) + S(flower(130, 140, '#FFFFFF') + flower(140, 142, '#F2C531')) },
  ],
};

// ---------- Zone Problèmes : le dépôt de marchandises ----------
const PROBLEMES = {
  sub: 'Le dépôt : on charge les caisses dans les bons wagons',
  stages: [
    { name: 'une graine', what: 'Une grosse caisse en bois' },
    { name: 'une pousse', what: 'Des caisses empilées et des tonneaux' },
    { name: 'une jeune plante', what: 'Le quai de chargement, au bord de la voie' },
    { name: 'un bouton', what: 'La grue soulève une caisse avec son crochet' },
    { name: 'une fleur', what: 'Les wagons de marchandises se remplissent' },
    { name: 'un arbre', what: 'Le chariot élévateur travaille, la locomotive est prête à partir' },
  ],
  stickers: [
    { from: 2, svg: S(`<rect x="6" y="106" width="108" height="5" rx="1.5" fill="#9C7A55"/><rect x="8" y="111" width="104" height="15" fill="#D9A06A"/><path d="M8 118 H112 M30 111 V118 M60 111 V118 M90 111 V118 M20 118 V126 M45 118 V126 M75 118 V126 M100 118 V126" stroke="#A86B3A" stroke-width="1.2"/>`) },
    { from: 3, svg: S(`<rect x="160" y="118" width="30" height="8" rx="2" fill="#3D4A50"/><rect x="168" y="60" width="14" height="60" fill="#F2B84B"/><path d="M168 60 L182 75 L168 90 L182 105 L168 120 M182 60 L168 75 L182 90 L168 105 L182 120" stroke="#C98E4E" stroke-width="1.6" fill="none"/><path d="M176 50 V40 L120 49 M176 40 L194 52" stroke="#1E2B2F" stroke-width="1.2" fill="none"/><path d="M166 52 L116 48 L116 54 L166 60Z" fill="#F2B84B"/><path d="M126 49 L132 54 L138 50 L144 56 L150 51 L156 58" stroke="#C98E4E" stroke-width="1.2" fill="none"/><rect x="186" y="52" width="10" height="5" fill="#F2B84B"/><rect x="188" y="57" width="8" height="8" rx="1" fill="#7D8A92"/><rect x="164" y="50" width="24" height="14" rx="2" fill="#D9617A"/><rect x="176" y="53" width="9" height="7" rx="1.5" fill="#BFE0F5"/><path d="M122 54 V70" stroke="#1E2B2F" stroke-width="1.6"/><path d="M122 70 v5 q0 4 -4 4" stroke="#7D8A92" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M122 74 L114 82 M122 74 L130 82" stroke="#1E2B2F" stroke-width="1.2"/>${crate(112, 82, 20, '#D9A06A')}`) },
    { from: 1, svg: S(crate(14, 90) + crate(32, 90, 18, '#B98A55') + crate(23, 72, 18, '#D9A06A')) + S(barrel(60, 108) + barrel(75, 108, '#8A6F4D')) },
    { from: 0, to: 0, svg: S(crate(88, 106, 24)) + tuft(80, 132) + tuft(122, 131) },
    { from: 2, svg: S(track(0, 200)) },
    { from: 4, svg: S(wagon(64, 138, '#6FA866', '<rect x="3" y="-32" width="10" height="11" rx="3" fill="#9C7A55"/><rect x="16" y="-32" width="10" height="11" rx="3" fill="#8A6F4D"/>') + wagon(100, 138, '#A8364F', '<rect x="2" y="-31" width="10" height="10" rx="1.5" fill="#C98E4E"/>') + wagon(136, 138, '#2F6FB0', '<rect x="3" y="-31" width="11" height="10" rx="1.5" fill="#C98E4E"/><rect x="16" y="-31" width="11" height="10" rx="1.5" fill="#D9A06A"/>')) },
    { from: 5, svg: S(loco(18, 138)) + smoke([[28, 92, 6], [34, 83, 5]]) + glow(16, 120, 5, '#FFE34D') },
    { from: 5, svg: S(`<rect x="102" y="80" width="3" height="26" fill="#3D4A50"/><rect x="105" y="101" width="10" height="2.5" fill="#3D4A50"/>${crate(104.5, 88, 13, '#D9A06A')}<path d="M86 94 V82 H98 V94" stroke="#1E2B2F" stroke-width="2" fill="none"/><circle cx="92" cy="88" r="3.5" fill="#EFC7A6"/><path d="M88.5 87 Q92 82 95.5 87Z" fill="#2F6FB0"/><rect x="84" y="93" width="18" height="10" rx="3" fill="#F2B84B"/><circle cx="89" cy="103" r="3" fill="#1E2B2F"/><circle cx="99" cy="103" r="3" fill="#1E2B2F"/>`) + sparkle(140, 70, 0.8) + sparkle(60, 50, 0.9, '#F2B84B') },
  ],
};

// ZONES-SUIVANTES

export default {
  id: 'gare',
  age: '4-6',
  label: 'Gare et trains',
  gardenName: 'Ma gare',
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
