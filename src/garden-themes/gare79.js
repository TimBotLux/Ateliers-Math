// Thème « Réseau ferré », parcours 7-9 ans.
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
  title: 'Réseau ferré — la logique',
  sub: 'Les aiguillages d’une ligne à grande vitesse',
  phone: 'Ma gare',
  bg: `
    <rect width="200" height="170" fill="url(#sky-gare79)"/>
    ${[[6, 70, 18, 48], [26, 84, 14, 34], [42, 62, 16, 56], [120, 76, 16, 42], [138, 58, 20, 60], [160, 80, 14, 38], [176, 66, 18, 52]].map(([x, y, w, h]) =>
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#B9CBD8"/>` +
      Array.from({ length: Math.floor(h / 10) }, (_, r) => `<rect x="${x + 3}" y="${y + 4 + r * 10}" width="${w - 6}" height="3" fill="#DCE7EF"/>`).join('')).join('')}
    <rect x="0" y="116" width="200" height="54" fill="#A9C38E"/>
    <rect x="0" y="152" width="200" height="18" fill="#93AF7A"/>`,
  stages: [
    { name: 'une graine', what: 'Un plot de chantier : le tracé est prévu' },
    { name: 'une pousse', what: 'Une première voie sur traverses en béton' },
    { name: 'une jeune plante', what: 'L’aiguillage motorisé sépare la voie en deux' },
    { name: 'un bouton', what: 'Un signal lumineux et le poste de commande' },
    { name: 'une fleur', what: 'La caténaire est posée, la motrice arrive' },
    { name: 'un arbre', what: 'La rame complète, le signal passe au vert' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(`
        <rect x="84" y="139" width="16" height="3" fill="#F26B1D"/>
        <path d="M86 140 L92 116 L98 140Z" fill="#F26B1D"/>
        <path d="M89.6 126 L94.4 126 L95.6 131 L88.4 131Z" fill="#FFFFFF"/>
        <rect x="111" y="116" width="3" height="26" fill="#D8C7A0"/>
        <rect x="114" y="118" width="9" height="5" fill="#FFD23F"/>`) },
    { from: 1, to: 1, svg: F(`<rect x="40" y="127" width="80" height="18" rx="2" fill="#A8A39A"/>${cSleepers(44, 114, 136)}${mRails(40, 120, 136)}`) },
    { from: 2, svg: F(`<rect x="0" y="127" width="200" height="18" fill="#A8A39A"/>${cSleepers(4, 194, 136)}${mRails(0, 200, 136)}`) + F(`<path d="M96 130 Q140 128 196 98" stroke="#A8A39A" stroke-width="18" fill="none"/>${branchModern()}<path d="M96 133 Q140 131 196 101" stroke="#56636B" stroke-width="2.4" fill="none"/><path d="M104 141 Q146 138 196 109" stroke="#56636B" stroke-width="2.4" fill="none"/>`) + F(`<rect x="80" y="149" width="18" height="10" rx="1.5" fill="#F2C531"/><rect x="80" y="149" width="18" height="3" fill="#3D4A50"/><path d="M98 154 Q104 154 104 146" stroke="#3D4A50" stroke-width="1.4" fill="none"/>`) },
    { from: 3, svg: F(`
        <rect x="10" y="56" width="38" height="5" fill="#1E2B2F"/>
        <rect x="12" y="61" width="34" height="55" fill="#2F4B5E"/>
        ${[0, 1, 2, 3].map(r => [0, 1, 2].map(c => `<rect x="${15 + c * 10.5}" y="${65 + r * 12}" width="8" height="9" fill="#8FC6E8"/>`).join('')).join('')}`) + F(`
        <rect x="162" y="72" width="3" height="40" fill="#2B2F33"/>
        <rect x="156" y="50" width="15" height="26" rx="3" fill="#1E2226"/>
        <circle cx="163.5" cy="57" r="3.6" fill="#FF3B30"/>
        <circle cx="163.5" cy="69" r="3.6" fill="#3A3F44"/>`) + glow(163.5, 57, 5, '#FF3B30') },
    { from: 4, svg: F(`
        ${[60, 150].map(px => `<rect x="${px}" y="84" width="3" height="44" fill="#6B7880"/><path d="M${px} 92 H${px + 18}" stroke="#6B7880" stroke-width="2"/>`).join('')}
        <path d="M0 98 H200" stroke="#4A555C" stroke-width="1"/>`) + F(powerCar(112, 138)) },
    { from: 5, svg: F(coach(58, 138) + coach(4, 138)) + `<circle cx="163.5" cy="57" r="3.6" fill="#3A3F44"/>` + glow(163.5, 69, 5, '#34C759') + `<circle cx="163.5" cy="69" r="3.6" fill="#34C759"/>` + [[29, 92], [48, 80], [143, 70], [182, 82]].map(([x, y]) => `<rect x="${x}" y="${y}" width="6" height="3" fill="#FFD866"/>`).join('') },
  ],
};

// ---------- Outils locaux (zones 7-9 ans) ----------
const r1 = (n) => Math.round(n * 10) / 10;
// Voie complète : ballast, traverses béton, rails.
const track = (x1 = 0, x2 = 200, y = 136) =>
  `<rect x="${x1}" y="${y - 9}" width="${x2 - x1}" height="18" fill="#A8A39A"/>${cSleepers(x1 + 4, x2 - 4, y)}${mRails(x1, x2, y)}`;
// Miroir horizontal autour de l'axe x = c.
const flip = (svg, c = 100) => `<g transform="translate(${2 * c} 0) scale(-1 1)">${svg}</g>`;
// Silhouette pictogramme (pieds en y).
const person = (x, y, c = '#2F4B5E', s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <circle cx="0" cy="-14" r="2.4" fill="${c}"/>
    <rect x="-2.6" y="-11" width="5.2" height="7.5" rx="2" fill="${c}"/>
    <rect x="-2.2" y="-4.5" width="1.8" height="4.5" fill="${c}"/><rect x="0.4" y="-4.5" width="1.8" height="4.5" fill="${c}"/>
  </g>`;
const suitcase = (x, y, c) => `<rect x="${x}" y="${y - 6}" width="4.5" height="6" rx="1" fill="${c}"/><path d="M${x + 1.2} ${y - 6} V${y - 9} H${x + 3.3} V${y - 6}" stroke="#2B2F33" stroke-width=".8" fill="none"/>`;
const cone = (x, y) => `<rect x="${x - 7}" y="${y - 2}" width="14" height="2.5" fill="#F26B1D"/><path d="M${x - 5} ${y - 1} L${x} ${y - 20} L${x + 5} ${y - 1}Z" fill="#F26B1D"/><path d="M${x - 2.2} ${y - 11} L${x + 2.2} ${y - 11} L${x + 3.1} ${y - 7} L${x - 3.1} ${y - 7}Z" fill="#FFFFFF"/>`;
// Conteneur nervuré.
const ctr = (x, y, w, h, c) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>` +
  Array.from({ length: Math.max(0, Math.floor(w / 3) - 1) }, (_, i) => `<rect x="${x + 2.5 + i * 3}" y="${y + 1.2}" width="1" height="${h - 2.4}" fill="#000" opacity=".16"/>`).join('') +
  `<rect x="${x}" y="${y}" width="${w}" height="1.2" fill="#FFF" opacity=".25"/>`;
const q = (a, b, c, t) => [(1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0], (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]].map(r1);

// ---------- Zone Numération : les quais ----------
const regio = (x, y, nose) => `
  <g transform="translate(${x} ${y})">
    <path d="${nose ? 'M0 -6 V-32 H50 Q62 -31 66 -18 L68 -6Z' : 'M0 -6 V-32 H62 V-6Z'}" fill="#F4F6F8"/>
    <rect x="0" y="-27" width="${nose ? 52 : 62}" height="8" fill="#2F4B5E"/>
    ${nose ? '<path d="M53 -29 Q62 -28 65 -19 L56 -19Z" fill="#1E2B2F"/>' : ''}
    ${[4, 24, 44].filter(wx => !nose || wx < 44).map(wx => `<rect x="${wx}" y="-26" width="12" height="6" rx="1" fill="#8FC6E8"/>`).join('')}
    ${(nose ? [18, 38] : [17, 39]).map(dx => `<rect x="${dx}" y="-28" width="6" height="21" fill="#F2C531"/><rect x="${dx + 1}" y="-26" width="4" height="7" fill="#8FC6E8"/>`).join('')}
    <rect x="0" y="-12" width="${nose ? 67 : 62}" height="3" fill="#1F4E9C"/>
    <rect x="4" y="-6" width="14" height="5" rx="2" fill="#2B2F33"/><rect x="${nose ? 46 : 44}" y="-6" width="14" height="5" rx="2" fill="#2B2F33"/>
    ${[7, 15, nose ? 49 : 47, nose ? 57 : 55].map(cx => `<circle cx="${cx}" cy="-1" r="2.4" fill="#2B2F33"/>`).join('')}
  </g>`;
const NUMERATION = {
  sub: 'Les quais de la gare',
  stages: [
    { name: 'une graine', what: 'Un jalon de géomètre : on mesure l’emplacement des quais' },
    { name: 'une pousse', what: 'La première dalle de quai est coulée' },
    { name: 'une jeune plante', what: 'Deux quais avec la bande podotactile jaune' },
    { name: 'un bouton', what: 'Panneaux pictogrammes et bancs pour patienter' },
    { name: 'une fleur', what: 'Un auvent moderne éclaire les quais' },
    { name: 'un arbre', what: 'Les voyageurs montent dans le train de banlieue' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(`
        <path d="M70 124 L62 146 M70 124 L70 146 M70 124 L78 146" stroke="#4A555C" stroke-width="1.6"/>
        <rect x="64" y="116" width="12" height="8" rx="1.5" fill="#F2C531"/><circle cx="76" cy="120" r="2.2" fill="#1E2226"/>
        ${[0, 1, 2, 3, 4].map(i => `<rect x="99" y="${118 + i * 5.2}" width="2.6" height="5.2" fill="${i % 2 ? '#FFFFFF' : '#F26B1D'}"/>`).join('')}
        <path d="M101.6 118 L110 121 L101.6 124Z" fill="#F26B1D"/>
        ${cone(126, 146)}`) },
    { from: 1, to: 1, svg: F(`<rect x="40" y="114" width="120" height="8" fill="#D4D2CC"/><rect x="40" y="122" width="120" height="8" fill="#B6B3AC"/>`) + F(cone(172, 146)) },
    { from: 2, svg: F(track()) + F(`
        <rect x="0" y="112" width="200" height="9" fill="#D4D2CC"/><rect x="0" y="121" width="200" height="7" fill="#B6B3AC"/>
        <rect x="0" y="118.5" width="200" height="1.6" fill="#F2C531"/>`) + F(`
        <rect x="0" y="146" width="200" height="9" fill="#D4D2CC"/><rect x="0" y="155" width="200" height="8" fill="#B6B3AC"/>
        <rect x="0" y="147" width="200" height="1.6" fill="#F2C531"/>`) },
    { from: 4, svg: F(`
        <rect x="14" y="72" width="172" height="6" fill="#8FC6E8" opacity=".85"/>
        ${Array.from({ length: 15 }, (_, i) => `<rect x="${14 + i * 12}" y="72" width="1" height="6" fill="#4A555C"/>`).join('')}
        <rect x="12" y="78" width="176" height="5" fill="#2B2F33"/>
        ${[30, 100, 170].map(px => `<rect x="${px - 1.5}" y="83" width="3" height="29" fill="#6B7880"/><path d="M${px - 14} 83 L${px} 92 L${px + 14} 83" stroke="#6B7880" stroke-width="1.6" fill="none"/>`).join('')}
        ${[22, 76, 124, 178].map(lx => `<rect x="${lx - 4}" y="83" width="8" height="1.8" fill="#FFF3C4"/>`).join('')}`) +
        [22, 76, 124, 178].map(lx => glow(lx, 86, 4, '#FFE9A8')).join('') },
    { from: 3, svg: F([50, 150].map((sx, k) => `
        <rect x="${sx - 0.8}" y="95" width="1.6" height="17" fill="#4A555C"/>
        <rect x="${sx - 12}" y="86" width="24" height="9" rx="1" fill="#1E2226"/>
        ${k === 0
          ? `<circle cx="${sx - 8}" cy="90.5" r="2.4" fill="#1F4E9C"/><rect x="${sx - 4}" y="88.3" width="10" height="1.6" fill="#F4F6F8"/><rect x="${sx - 4}" y="91.3" width="6" height="1.6" fill="#8FC6E8"/><circle cx="${sx + 8.5}" cy="90.5" r="1.6" fill="#34C759"/>`
          : `${[0, 1, 2].map(d => `<circle cx="${sx - 8 + d * 4}" cy="90.5" r="1.4" fill="#F2C531"/>`).join('')}<path d="M${sx + 3} 89.6 H${sx + 7} V88 L${sx + 10} 90.5 L${sx + 7} 93 V91.4 H${sx + 3}Z" fill="#F4F6F8"/>`}`).join('') + `
        <rect x="16" y="130" width="8" height="22" rx="1" fill="#1E2226"/>
        ${['#D7263D', '#1F4E9C', '#34C759', '#F2C531'].map((c, i) => `<circle cx="20" cy="${134 + i * 4.5}" r="1.5" fill="${c}"/>`).join('')}
        <rect x="88" y="101" width="18" height="2" fill="#2F4B5E"/><rect x="88" y="106" width="18" height="2" fill="#2F4B5E"/><rect x="90" y="108" width="1.6" height="4" fill="#4A555C"/><rect x="102.4" y="108" width="1.6" height="4" fill="#4A555C"/>
        <rect x="150" y="141" width="18" height="2" fill="#2F4B5E"/><rect x="150" y="146" width="18" height="2" fill="#2F4B5E"/><rect x="152" y="148" width="1.6" height="4" fill="#4A555C"/><rect x="164.4" y="148" width="1.6" height="4" fill="#4A555C"/>`) },
    { from: 5, svg: F(regio(2, 138, false) + regio(64, 138, true)) + glow(131, 132, 4, '#FFF3C4') + glow(20, 136, 3, '#34C759') },
    { from: 5, svg: F([[140, 113, '#D7263D'], [152, 113, '#2F4B5E'], [170, 113, '#1F4E9C', .8], [186, 113, '#F26B1D']].map(([x, y, c, s]) => person(x, y, c, s)).join('') +
        [[40, 156, '#1F4E9C'], [58, 156, '#2F4B5E'], [65, 156, '#F26B1D', .75], [112, 156, '#D7263D'], [132, 156, '#2F4B5E']].map(([x, y, c, s]) => person(x, y, c, s)).join('') +
        suitcase(44, 156, '#F2C531') + suitcase(115, 156, '#6B7880')) },
  ],
};

// ---------- Zone Calcul : le centre de maintenance ----------
const bogie = (x, y) => `
  <rect x="${x - 17}" y="${y - 13}" width="34" height="6" rx="1.5" fill="#4A555C"/>
  <rect x="${x - 4}" y="${y - 16}" width="8" height="3" fill="#F2C531"/>
  ${[-10, 10].map(d => `<circle cx="${x + d}" cy="${y - 4}" r="5" fill="#2B2F33"/><circle cx="${x + d}" cy="${y - 4}" r="1.8" fill="#A8B3BA"/>`).join('')}
  <rect x="${x - 2}" y="${y - 8}" width="4" height="4" fill="#D7263D"/>`;
const CALCUL = {
  sub: 'Le centre de maintenance des trains',
  stages: [
    { name: 'une graine', what: 'Un bogie : deux essieux et leurs roues' },
    { name: 'une pousse', what: 'Le bogie est posé sur les rails' },
    { name: 'une jeune plante', what: 'Le portique en acier du grand atelier' },
    { name: 'un bouton', what: 'Le toit vitré et la fosse d’inspection' },
    { name: 'une fleur', what: 'La motrice est soulevée sur des vérins' },
    { name: 'un arbre', what: 'Révision terminée : le train repart, le robot range' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(`<rect x="84" y="144" width="12" height="6" fill="#D4D2CC"/><rect x="104" y="144" width="12" height="6" fill="#D4D2CC"/>${bogie(100, 145)}`) + F(cone(132, 150)) },
    { from: 3, svg: F(`
        <rect x="32" y="70" width="136" height="57" fill="#D9E1E6"/>
        <rect x="32" y="74" width="136" height="6" fill="#8FC6E8"/>
        ${Array.from({ length: 11 }, (_, i) => `<rect x="${44 + i * 12}" y="80" width="1" height="47" fill="#B9C6CF"/>`).join('')}`) + F(`
        <path d="M20 56 L100 34 L180 56Z" fill="#8FC6E8" opacity=".9"/>
        ${Array.from({ length: 12 }, (_, i) => { const x = 32 + i * 12.4; const yt = r1(56 - 22 * (1 - Math.abs(x - 100) / 80)); return `<path d="M${r1(x)} 56 V${yt}" stroke="#4A555C" stroke-width=".9"/>`; }).join('')}
        <path d="M20 56 L100 34 L180 56" stroke="#2B2F33" stroke-width="2" fill="none"/>`) +
        F([60, 100, 140].map(lx => `<path d="M${lx} 70 V76" stroke="#4A555C" stroke-width=".8"/><path d="M${lx - 4} 79 L${lx - 2} 76 H${lx + 2} L${lx + 4} 79Z" fill="#2B2F33"/>`).join('')) },
    { from: 1, svg: F(track()) },
    { from: 1, to: 3, svg: F(bogie(150, 139)) },
    { from: 2, svg: F(`
        <rect x="36" y="52" width="140" height="4" fill="#9AA6AD"/>
        <rect x="26" y="62" width="6" height="66" fill="#4A555C"/><rect x="168" y="62" width="6" height="66" fill="#4A555C"/>
        <rect x="20" y="56" width="160" height="6" fill="#4A555C"/>
        <path d="${Array.from({ length: 12 }, (_, i) => `${i ? 'L' : 'M'}${32 + i * 12} ${i % 2 ? 70 : 62}`).join(' ')}" stroke="#6B7880" stroke-width="1.6" fill="none"/>
        <rect x="32" y="69" width="136" height="2" fill="#6B7880"/>
        <path d="M32 80 L44 71 M168 80 L156 71" stroke="#4A555C" stroke-width="2"/>
        <rect x="23" y="126" width="12" height="3" fill="#2B2F33"/><rect x="165" y="126" width="12" height="3" fill="#2B2F33"/>`) },
    { from: 3, svg: F(`
        <rect x="58" y="145" width="84" height="11" fill="#2B2F33"/>
        ${Array.from({ length: 14 }, (_, i) => `<rect x="${58 + i * 6}" y="145" width="3" height="2" fill="${i % 2 ? '#1E2226' : '#F2C531'}"/><rect x="${61 + i * 6}" y="145" width="3" height="2" fill="${i % 2 ? '#F2C531' : '#1E2226'}"/>`).join('')}
        <path d="M134 147 V156 M139 147 V156 M134 150 H139 M134 153 H139" stroke="#A8B3BA" stroke-width=".9"/>`) },
    { from: 4, to: 4, svg: F([66, 84, 112, 130].map(jx => `<rect x="${jx - 2}" y="120" width="4" height="27" fill="#F2C531"/><rect x="${jx - 2}" y="128" width="4" height="2" fill="#1E2226"/><rect x="${jx - 4}" y="146" width="8" height="2.5" fill="#2B2F33"/>`).join('')) + F(powerCar(62, 126)) + glow(136, 116, 4, '#FFF3C4') },
    { from: 5, svg: F(coach(64, 138) + powerCar(118, 138)) + glow(192, 128, 4, '#FFF3C4') },
    { from: 4, svg: F(`${person(156, 158, '#F26B1D')}<rect x="153.2" y="141" width="5.6" height="2" rx="1" fill="#F2C531"/><rect x="153.4" y="149" width="5.2" height="1.2" fill="#E8ECEF"/>`) },
    { from: 5, svg: F(`
        <rect x="36" y="84" width="24" height="20" rx="1" fill="#E8ECEF"/>
        <rect x="40" y="87" width="2.4" height="13" fill="#4A555C"/><circle cx="41.2" cy="87" r="2.2" fill="#4A555C"/>
        <rect x="46" y="88" width="7" height="2.6" fill="#D7263D"/><rect x="48.6" y="90" width="1.8" height="10" fill="#6B7880"/>
        <rect x="56" y="87" width="1.6" height="9" fill="#2B2F33"/><rect x="55.2" y="96" width="3.2" height="4.5" rx="1" fill="#F2C531"/>`) + F(`
        <rect x="30" y="148" width="20" height="5" rx="1" fill="#2B2F33"/>
        <path d="M40 148 L35 124" stroke="#F26B1D" stroke-width="5" stroke-linecap="round"/>
        <path d="M35 124 L52 112" stroke="#F26B1D" stroke-width="4" stroke-linecap="round"/>
        <circle cx="40" cy="148" r="3.4" fill="#4A555C"/><circle cx="35" cy="124" r="3" fill="#4A555C"/><circle cx="52" cy="112" r="2.4" fill="#4A555C"/>
        <path d="M53 110 L58 108 M53 114 L58 116" stroke="#2B2F33" stroke-width="1.6" stroke-linecap="round"/>`) +
        [60, 100, 140].map(lx => glow(lx, 81, 5, '#FFE9A8')).join('') + glow(56, 112, 2.5, '#34C759') },
  ],
};

// ---------- Zone Géométrie : le viaduc ----------
const PILES = [[20, 125], [60, 148], [100, 160], [140, 148], [180, 125]];
const pile = (x, b) => `
  <path d="M${x - 4} 100 L${x + 4} 100 L${x + 6} ${b} L${x - 6} ${b}Z" fill="#D4D2CC"/>
  <path d="M${x + 1} 100 L${x + 4} 100 L${x + 6} ${b} L${x + 2} ${b}Z" fill="#BDBAB3"/>
  <rect x="${x - 6}" y="98" width="12" height="3" fill="#BDBAB3"/><rect x="${x - 9}" y="${b - 2}" width="18" height="4" fill="#A8A39A"/>`;
const GEOMETRIE = {
  sub: 'Le viaduc au-dessus de la vallée',
  stages: [
    { name: 'une graine', what: 'Une semelle en béton pour la première pile' },
    { name: 'une pousse', what: 'Une rangée de piles enjambe la rivière' },
    { name: 'une jeune plante', what: 'Les poutres du tablier sont posées une à une' },
    { name: 'un bouton', what: 'Des arches parfaites soutiennent le tablier' },
    { name: 'une fleur', what: 'Le train à grande vitesse traverse le viaduc' },
    { name: 'un arbre', what: 'Le soir, le viaduc s’illumine' },
  ],
  stickers: [
    { from: 5, svg: `<rect x="0" y="0" width="200" height="118" fill="#F6A35B" opacity=".22"/><rect x="0" y="0" width="200" height="40" fill="#5B6FA8" opacity=".14"/>` },
    { from: 0, to: 0, svg: F(`
        ${[94, 98, 102, 106].map(rx => `<rect x="${rx - 0.6}" y="128" width="1.2" height="14" fill="#6B7880"/>`).join('')}
        <path d="M88 142 L112 142 L116 152 L84 152Z" fill="#D4D2CC"/><path d="M104 142 L112 142 L116 152 L106 152Z" fill="#BDBAB3"/>`) + F(cone(132, 152)) },
    { from: 1, svg: `<path d="M0 118 C45 118 55 158 100 158 C145 158 155 118 200 118 L200 170 L0 170Z" fill="#8AA672"/>
        <path d="M54 156 Q100 166 146 156 L156 170 L44 170Z" fill="#6FAFD4"/>
        <path d="M70 162 H86 M110 164 H128 M92 166 H104" stroke="#DCEFFA" stroke-width="1.2"/>` },
    { from: 1, svg: F(PILES.map(([x, b]) => pile(x, b)).join('')) },
    { from: 2, to: 2, svg: F(`
        <rect x="0" y="92" width="150" height="8" fill="#D4D2CC"/><rect x="0" y="98" width="150" height="2" fill="#BDBAB3"/>
        ${[30, 60, 90, 120].map(jx => `<rect x="${jx}" y="92" width="1" height="8" fill="#A8A39A"/>`).join('')}`) + F(`
        <rect x="110" y="80" width="90" height="4" fill="#F2C531"/>
        <path d="${Array.from({ length: 10 }, (_, i) => `${i ? 'L' : 'M'}${112 + i * 9.5} ${i % 2 ? 84 : 89}`).join(' ')}" stroke="#F2C531" stroke-width="1.4" fill="none"/>
        <rect x="112" y="84" width="3" height="8" fill="#4A555C"/><rect x="176" y="84" width="3" height="16" fill="#4A555C"/>
        <rect x="160" y="84" width="24" height="10" fill="#D4D2CC"/><path d="M164 84 V80 M180 84 V80" stroke="#2B2F33" stroke-width=".8"/>`) },
    { from: 3, svg: F(`
        ${[[0, 20], [20, 60], [60, 100], [100, 140], [140, 180], [180, 220]].map(([a, b]) => {
          const m = (a + b) / 2;
          return `<path d="M${a} 122 Q${m} 96 ${b} 122" stroke="#D4D2CC" stroke-width="3.2" fill="none"/>` +
            [-12, 0, 12].map(d => { const t = 0.5 + d / (b - a); const yy = r1((1 - t) ** 2 * 122 + 2 * (1 - t) * t * 96 + t * t * 122); return `<rect x="${m + d - 0.8}" y="100" width="1.6" height="${r1(yy - 100)}" fill="#BDBAB3"/>`; }).join('');
        }).join('')}`) + F(`
        <rect x="0" y="92" width="200" height="8" fill="#D4D2CC"/><rect x="0" y="98" width="200" height="2" fill="#BDBAB3"/>
        <rect x="0" y="88.6" width="200" height="2" fill="#56636B"/>
        ${Array.from({ length: 20 }, (_, i) => `<path d="M${i * 10} 92 L${i * 10 + 5} 87 L${i * 10 + 10} 92" stroke="#6B7880" stroke-width=".7" fill="none"/>`).join('')}
        ${[10, 60, 110, 160].map(px => `<rect x="${px}" y="54" width="2" height="38" fill="#6B7880"/><path d="M${px} 58 H${px + 10}" stroke="#6B7880" stroke-width="1.4"/>`).join('')}
        <path d="M0 52 H200" stroke="#4A555C" stroke-width=".9"/>`) },
    { from: 4, svg: F(coach(4, 90) + coach(58, 90) + powerCar(112, 90)) },
    { from: 5, svg: glow(172, 28, 14, '#FFC772') + `<circle cx="172" cy="28" r="8" fill="#FFB347"/>` +
        [11, 61, 111, 161].map(px => glow(px, 56, 4, '#FFE9A8') + `<circle cx="${px + 10}" cy="58" r="1.6" fill="#FFF3C4"/>`).join('') +
        PILES.map(([x, b]) => glow(x, b - 6, 6, '#FFD866')).join('') +
        glow(188, 82, 4, '#FFF3C4') +
        `<path d="M76 160 H90 M106 162 H120" stroke="#FFC772" stroke-width="1.4" opacity=".9"/>` },
  ],
};

// ---------- Zone Attention : le passage à niveau automatique ----------
const arm = (x1, y, x2, h = 3) => { const w = x2 - x1; return `<rect x="${x1}" y="${y}" width="${w}" height="${h}" fill="#F4F6F8"/>` + Array.from({ length: Math.floor(w / 8) }, (_, i) => `<rect x="${x1 + i * 8}" y="${y}" width="4" height="${h}" fill="#D7263D"/>`).join(''); };
const armV = (x, y1, y2, w = 3) => { const h = y2 - y1; return `<rect x="${x}" y="${y1}" width="${w}" height="${h}" fill="#F4F6F8"/>` + Array.from({ length: Math.floor(h / 8) }, (_, i) => `<rect x="${x}" y="${y1 + i * 8}" width="${w}" height="4" fill="#D7263D"/>`).join(''); };
const xCross = (cx, cy) => `<path d="M${cx - 6} ${cy - 4} L${cx + 6} ${cy + 4} M${cx + 6} ${cy - 4} L${cx - 6} ${cy + 4}" stroke="#D7263D" stroke-width="3.4"/><path d="M${cx - 6} ${cy - 4} L${cx + 6} ${cy + 4} M${cx + 6} ${cy - 4} L${cx - 6} ${cy + 4}" stroke="#F4F6F8" stroke-width="1.6"/>`;
const pnPost = (cx, top, bottom, lit) => `
  <rect x="${cx - 2}" y="${top}" width="4" height="${bottom - top}" fill="#6B7880"/>
  ${xCross(cx, top + 2)}
  <rect x="${cx - 10}" y="${top + 8}" width="20" height="8" rx="4" fill="#1E2226"/>
  <circle cx="${cx - 5}" cy="${top + 12}" r="2.6" fill="${lit ? '#FF3B30' : '#3A3F44'}"/><circle cx="${cx + 5}" cy="${top + 12}" r="2.6" fill="${lit ? '#FF3B30' : '#3A3F44'}"/>`;
const ATTENTION = {
  sub: 'Le passage à niveau automatique',
  stages: [
    { name: 'une graine', what: 'Un panneau prévient : passage à niveau' },
    { name: 'une pousse', what: 'La route croise la voie ferrée' },
    { name: 'une jeune plante', what: 'Des barrières automatiques avec feux à LED' },
    { name: 'un bouton', what: 'Les feux clignotent, les barrières s’abaissent' },
    { name: 'une fleur', what: 'La voiture attend : le train passe' },
    { name: 'un arbre', what: 'Vélos et piétons attendent aussi leur tour' },
  ],
  stickers: [
    { from: 0, svg: F(`
        <rect x="55" y="100" width="2" height="24" fill="#6B7880"/>
        <path d="M56 81 L67.5 101 L44.5 101Z" fill="#D7263D"/><path d="M56 86 L63.2 98.6 L48.8 98.6Z" fill="#F4F6F8"/>
        <rect x="51" y="92.5" width="10" height="4" fill="none" stroke="#1E2226" stroke-width="1"/><path d="M54.3 92.5 V96.5 M57.7 92.5 V96.5" stroke="#1E2226" stroke-width="1"/>`) },
    { from: 0, to: 0, svg: F(cone(150, 150) + cone(36, 156)) },
    { from: 1, svg: F(`
        <path d="M78 170 L122 170 L108 116 L92 116Z" fill="#4A4F55"/>
        <path d="M100 118 V124 M100 150 V158 M100 162 V170" stroke="#F4F6F8" stroke-width="1.4"/>
        <rect x="0" y="127" width="200" height="18" fill="#A8A39A"/>${cSleepers(4, 196, 136)}
        <path d="M89 127 L111 127 L115.5 145 L84.5 145Z" fill="#5A6066"/>
        ${mRails(0, 200, 136)}
        <path d="M81.6 156 H118.4" stroke="#F4F6F8" stroke-width="1.6"/><path d="M92.6 120 H107.4" stroke="#F4F6F8" stroke-width="1.2"/>`) },
    { from: 2, to: 2, svg: F(pnPost(130, 92, 124, false) + `<rect x="123" y="119" width="6" height="5" fill="#D4D2CC"/>` + armV(124, 90, 120)) },
    { from: 3, svg: F(pnPost(130, 92, 124, true) + `<rect x="123" y="119" width="6" height="5" fill="#D4D2CC"/>` + arm(86, 119.5, 126, 2.6)) + glow(125, 104, 5, '#FF3B30') + glow(135, 104, 5, '#FF3B30') },
    { from: 4, svg: F(coach(14, 138) + coach(68, 138) + powerCar(122, 138)) + glow(196, 128, 4, '#FFF3C4') },
    { from: 2, to: 2, svg: F(pnPost(68, 118, 156, false) + `<rect x="70" y="146" width="8" height="10" fill="#D4D2CC"/>` + armV(72, 112, 146)) },
    { from: 3, svg: F(pnPost(68, 118, 156, true) + `<rect x="70" y="146" width="8" height="10" fill="#D4D2CC"/>` + arm(72, 146, 120)) + glow(63, 130, 5, '#FF3B30') + glow(73, 130, 5, '#FF3B30') },
    { from: 4, svg: F(`
        <path d="M90 151 L92 144 H108 L110 151Z" fill="#2E7C6E"/><path d="M92.5 150 L93.8 145.5 H106.2 L107.5 150Z" fill="#8FC6E8"/>
        <rect x="86" y="150" width="28" height="12" rx="3" fill="#3E8E7E"/>
        <rect x="88" y="152.5" width="6" height="2.6" rx="1" fill="#FF3B30"/><rect x="106" y="152.5" width="6" height="2.6" rx="1" fill="#FF3B30"/>
        <rect x="95" y="156" width="10" height="3" fill="#E8ECEF"/>
        <rect x="87" y="161" width="6" height="5" rx="1.5" fill="#1E2226"/><rect x="107" y="161" width="6" height="5" rx="1.5" fill="#1E2226"/>`) + glow(91, 154, 4, '#FF3B30') + glow(109, 154, 4, '#FF3B30') },
    { from: 5, svg: F(`
        <rect x="14" y="157" width="34" height="3" fill="#F2C531"/>
        <rect x="18" y="146" width="2.4" height="12" fill="#4A555C"/><rect x="42" y="146" width="2.4" height="12" fill="#4A555C"/>
        ${arm(20.4, 149, 42, 2.2)}
        <rect x="4" y="134" width="6" height="12" rx="1" fill="#1E2226"/><rect x="6.2" y="146" width="1.6" height="12" fill="#4A555C"/>
        ${person(7, 143.5, '#FF3B30', .55)}
        ${person(30, 160, '#2F4B5E')}`) + F(`
        <circle cx="142" cy="161" r="5" fill="none" stroke="#2B2F33" stroke-width="1.6"/><circle cx="160" cy="161" r="5" fill="none" stroke="#2B2F33" stroke-width="1.6"/>
        <path d="M142 161 L148 154 H157 L160 161 M148 154 L151 161 L157 154 M146 151 H150 M157 154 L156 150 H159" stroke="#1F4E9C" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <rect x="149" y="139" width="5" height="10" rx="2" fill="#F26B1D" transform="rotate(18 151 144)"/>
        <circle cx="154" cy="136" r="2.4" fill="#2F4B5E"/><path d="M151.2 135 Q154 131.5 157 135Z" fill="#F2C531"/>
        <path d="M150 149 L152 156" stroke="#2F4B5E" stroke-width="1.8" stroke-linecap="round"/>`) + glow(7, 139, 4, '#FF3B30') },
  ],
};

// ---------- Zone Mémoire : la grande gare verrière ----------
const AO = [30, 72], AC = [100, -10], AE = [170, 72];
const AIo = [40, 72], AIc = [100, 8], AIe = [160, 72];
const column = (x) => `<rect x="${x - 3}" y="72" width="6" height="76" fill="#4A555C"/><rect x="${x - 5}" y="70" width="10" height="3" fill="#2B2F33"/><rect x="${x - 5}" y="145" width="10" height="3" fill="#2B2F33"/><rect x="${x - 4}" y="96" width="8" height="2" fill="#6B7880"/>`;
const MEMOIRE = {
  sub: 'La grande gare verrière',
  stages: [
    { name: 'une graine', what: 'Une colonne d’acier se dresse' },
    { name: 'une pousse', what: 'La charpente en arc prend forme' },
    { name: 'une jeune plante', what: 'La voûte se couvre de vitres' },
    { name: 'un bouton', what: 'L’horloge et le tableau des départs' },
    { name: 'une fleur', what: 'Les voyageurs arrivent avec leurs valises' },
    { name: 'un arbre', what: 'La gare s’illumine, deux trains sont à quai' },
  ],
  stickers: [
    { from: 5, svg: F(track(0, 200, 122) + flip(powerCar(30, 123)) + flip(coach(110, 123))) +
        F(track(0, 200, 138) + coach(4, 139) + coach(58, 139) + powerCar(112, 139)) + glow(188, 129, 4, '#FFF3C4') },
    { from: 2, svg: F(`
        <path d="M${AO[0]} ${AO[1]} Q${AC[0]} ${AC[1]} ${AE[0]} ${AE[1]}Z" fill="#8FC6E8" opacity=".75"/>
        ${[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map(t => { const [x, y] = q(AIo, AIc, AIe, t); return `<path d="M100 72 L${x} ${y}" stroke="#6B7880" stroke-width=".8"/>`; }).join('')}
        <path d="M60 72 Q100 32 140 72 M78 72 Q100 52 122 72" stroke="#6B7880" stroke-width=".9" fill="none"/>`) },
    { from: 0, svg: F(column(30)) },
    { from: 0, to: 0, svg: F(`<rect x="56" y="148" width="40" height="3" fill="#6B7880"/><rect x="58" y="145" width="38" height="3" fill="#4A555C"/><rect x="60" y="142" width="34" height="3" fill="#6B7880"/>`) + F(cone(120, 151)) },
    { from: 1, svg: F(column(170) + `
        <path d="M${AO[0]} ${AO[1]} Q${AC[0]} ${AC[1]} ${AE[0]} ${AE[1]}" stroke="#4A555C" stroke-width="4" fill="none"/>
        <path d="M${AIo[0]} ${AIo[1]} Q${AIc[0]} ${AIc[1]} ${AIe[0]} ${AIe[1]}" stroke="#4A555C" stroke-width="2" fill="none"/>
        ${[0.08, 0.17, 0.26, 0.35, 0.44, 0.56, 0.65, 0.74, 0.83, 0.92].map(t => { const [a, b] = q(AO, AC, AE, t); const [c, d] = q(AIo, AIc, AIe, t); return `<path d="M${a} ${b} L${c} ${d}" stroke="#4A555C" stroke-width="1.2"/>`; }).join('')}
        <rect x="30" y="71" width="140" height="3" fill="#4A555C"/>`) },
    { from: 3, svg: F(`
        <path d="M100 31 V44" stroke="#2B2F33" stroke-width="1"/>
        <circle cx="100" cy="52" r="8.5" fill="#F4F6F8" stroke="#1E2226" stroke-width="2"/>
        ${Array.from({ length: 12 }, (_, i) => `<rect x="99.5" y="45" width="1" height="${i % 3 ? 1.4 : 2.2}" fill="#1E2226" transform="rotate(${i * 30} 100 52)"/>`).join('')}
        <path d="M100 52 L100 46.5 M100 52 L104 54" stroke="#1E2226" stroke-width="1.4" stroke-linecap="round"/><circle cx="100" cy="52" r="1" fill="#D7263D"/>
        <path d="M78 74 V80 M122 74 V80" stroke="#2B2F33" stroke-width=".8"/>
        <rect x="74" y="80" width="52" height="17" rx="1.5" fill="#1E2226"/>
        ${[['#D7263D', 28, '#34C759'], ['#1F4E9C', 20, '#F2C531'], ['#34C759', 32, '#34C759'], ['#F26B1D', 16, '#FF3B30']].map(([c, w, s], i) => `<rect x="77" y="${82.5 + i * 3.6}" width="3" height="2.2" fill="${c}"/><rect x="82" y="${82.5 + i * 3.6}" width="${w}" height="2.2" fill="#F4F6F8" opacity=".9"/><rect x="117" y="${82.5 + i * 3.6}" width="6" height="2.2" fill="${s}"/>`).join('')}`) },
    { from: 4, svg: F(`<rect x="0" y="148" width="200" height="12" fill="#E3E1DC"/><rect x="0" y="160" width="200" height="10" fill="#B6B3AC"/><rect x="0" y="148.5" width="200" height="1.6" fill="#F2C531"/>
        ${Array.from({ length: 9 }, (_, i) => `<rect x="${12 + i * 22}" y="150" width="1" height="10" fill="#CFCCC5"/>`).join('')}`) +
        F([[24, 158, '#1F4E9C'], [48, 158, '#D7263D'], [55, 158, '#F26B1D', .72], [92, 158, '#2F4B5E'], [128, 158, '#34C759'], [150, 158, '#1F4E9C'], [178, 158, '#D7263D']].map(([x, y, c, s]) => person(x, y, c, s)).join('') +
        suitcase(27, 158, '#F2C531') + suitcase(85, 158, '#D7263D') + suitcase(131, 158, '#6B7880') + suitcase(181, 158, '#1F4E9C')) },
    { from: 5, svg: `<path d="M${AO[0]} ${AO[1]} Q${AC[0]} ${AC[1]} ${AE[0]} ${AE[1]}Z" fill="#FFE7A8" opacity=".3"/>` +
        [55, 100, 145].map(lx => `<path d="M${lx} 74 V${lx === 100 ? 74 : 78}" stroke="#2B2F33" stroke-width=".8"/>` + glow(lx, 78, 5, '#FFE9A8')).join('') + glow(100, 52, 11, '#FFF3C4') + glow(120, 86, 3, '#34C759') },
  ],
};

// ---------- Zone Espace : le tunnel sous la montagne ----------
const MT = { A: [52, 130], B: [84, 72], C: [100, 80], D: [140, 24], E: [170, 58], G: [186, 50], H: [200, 60], P: [110, 96], Qp: [150, 90], R: [180, 100], S: [120, 130], U: [165, 130], Z: [200, 130] };
const tri = (a, b, c, col) => `<path d="M${MT[a]} L${MT[b]} L${MT[c]}Z" fill="${col}" stroke="${col}" stroke-width=".6" stroke-linejoin="round"/>`;
const turbine = (x, y, h) => `
  <path d="M${x - 1.2} ${y} L${x - 0.6} ${y - h} H${x + 0.6} L${x + 1.2} ${y}Z" fill="#F4F6F8"/>
  ${[0, 120, 240].map(a => `<path d="M${x} ${y - h} L${x - 1.2} ${y - h - 11} L${x} ${y - h - 13} L${x + 1} ${y - h - 3}Z" fill="#F4F6F8" transform="rotate(${a + 15} ${x} ${y - h})"/>`).join('')}
  <circle cx="${x}" cy="${y - h}" r="1.4" fill="#A8B3BA"/>`;
const PORTAL_OPEN = 'M102 140 V110 Q119 90 136 110 V140Z';
const ESPACE = {
  sub: 'Le tunnel sous la montagne',
  stages: [
    { name: 'une graine', what: 'Un rocher : ici commence la montagne' },
    { name: 'une pousse', what: 'La montagne et ses facettes de roche' },
    { name: 'une jeune plante', what: 'Le portail du tunnel est construit' },
    { name: 'un bouton', what: 'La voie entre dans le tunnel éclairé' },
    { name: 'une fleur', what: 'Le train surgit du tunnel' },
    { name: 'un arbre', what: 'Neige, éoliennes et le tracé secret du tunnel' },
  ],
  stickers: [
    { from: 0, to: 0, svg: F(`<path d="M84 150 L90 136 L102 130 L114 136 L118 150Z" fill="#8C979E"/><path d="M90 136 L102 130 L104 142Z" fill="#B3BCC1"/><path d="M102 130 L114 136 L104 142Z" fill="#9FA9AF"/><path d="M84 150 L90 136 L104 142 L98 150Z" fill="#7A858C"/>`) },
    { from: 1, svg: F(`
        <path d="M${MT.A} L${MT.B} L${MT.C} L${MT.D} L${MT.E} L${MT.G} L${MT.H} L${MT.Z}Z" fill="#96A1A8"/>
        ${tri('A', 'B', 'P', '#A3ADB3')}${tri('B', 'C', 'P', '#8C979E')}${tri('C', 'D', 'P', '#B3BCC1')}${tri('D', 'Qp', 'P', '#7E8990')}
        ${tri('D', 'E', 'Qp', '#96A1A8')}${tri('E', 'G', 'Qp', '#A8B1B6')}${tri('G', 'R', 'Qp', '#7A858C')}${tri('G', 'H', 'R', '#8A949B')}
        ${tri('A', 'P', 'S', '#8E99A0')}${tri('P', 'Qp', 'S', '#9FA9AF')}${tri('Qp', 'U', 'S', '#A6AFB5')}${tri('Qp', 'R', 'U', '#8C979E')}${tri('R', 'Z', 'U', '#B0B8BD')}${tri('R', 'H', 'Z', '#9AA4AA')}`) +
        F(`<path d="M40 132 L46 124 L54 126 L56 132Z" fill="#8C979E"/><path d="M46 124 L54 126 L50 130Z" fill="#B3BCC1"/>`) },
    { from: 2, svg: F(`
        <path d="M88 140 L98 92 L144 92 L144 140Z" fill="#D4D2CC"/><path d="M88 140 L98 92 L102 92 L94 140Z" fill="#BDBAB3"/>
        <rect x="98" y="92" width="46" height="3" fill="#2F4B5E"/>
        <path d="${PORTAL_OPEN}" fill="#1E2226"/>`) },
    { from: 3, svg: F(track(0, 124, 136)) + `<path d="${PORTAL_OPEN}" fill="#1E2226" opacity=".55"/>` +
        F(`<rect x="76" y="104" width="2.4" height="22" fill="#2B2F33"/><rect x="73" y="98" width="8" height="12" rx="2" fill="#1E2226"/><circle cx="77" cy="101.5" r="2" fill="#3A3F44"/><circle cx="77" cy="106.5" r="2" fill="#34C759"/>`) +
        glow(77, 106.5, 4, '#34C759') + [[106, 112], [119, 103], [132, 112]].map(([x, y]) => glow(x, y, 3, '#FFD866') + `<circle cx="${x}" cy="${y}" r="1.1" fill="#FFF3C4"/>`).join('') },
    { from: 4, svg: F(flip(powerCar(79, 138))) + `<path d="${PORTAL_OPEN}" fill="#1E2226" opacity=".45"/>` + glow(47, 130, 5, '#FFF3C4') },
    { from: 5, svg: F(`
        <path d="M140 24 L130 38 L135 37 L140 43 L146 36 L151 39 L159 41Z" fill="#F4F6F8"/>
        <path d="M84 72 L79 81 L84 79 L88 83 L91 76Z" fill="#F4F6F8"/>
        <path d="M186 50 L180 54 L184 56 L188 53 L192 56 L196 55Z" fill="#F4F6F8"/>`) +
        F(turbine(84, 72, 20) + turbine(172, 57, 18) + turbine(194, 54, 16)) +
        F(['#3F7A34', '#4E8A3A', '#3F7A34'].map((c, i) => pine(16 + i * 12, 126, 14 + (i % 2) * 6, c)).join('') + pine(160, 128, 14, '#4E8A3A') + pine(176, 128, 18, '#3F7A34')) +
        `<path d="M136 122 Q166 104 198 114" stroke="#F2C531" stroke-width="1.6" stroke-dasharray="3 3" fill="none"/>
        <circle cx="136" cy="122" r="2.2" fill="#F2C531"/><circle cx="197" cy="114" r="2.2" fill="#F2C531"/>` },
  ],
};

// ---------- Zone Problèmes : le terminal de fret ----------
const flatWagon = (x, y, c1, c2) => `
  ${ctr(x + 1, y - 21, 23, 12, c1)}${ctr(x + 25, y - 21, 23, 12, c2)}
  <rect x="${x}" y="${y - 9}" width="49" height="4" fill="#2B2F33"/>
  <rect x="${x + 3}" y="${y - 6}" width="12" height="4" rx="1.5" fill="#2B2F33"/><rect x="${x + 34}" y="${y - 6}" width="12" height="4" rx="1.5" fill="#2B2F33"/>
  ${[6, 12, 37, 43].map(cx => `<circle cx="${x + cx}" cy="${y - 1}" r="2.3" fill="#2B2F33"/>`).join('')}`;
const freightLoco = (x, y) => `
  <g transform="translate(${x} ${y})">
    <path d="M20 -30 L28 -38 L36 -30 M24 -38 H34" stroke="#4A555C" stroke-width="1.3" fill="none"/>
    <path d="M2 -6 L2 -22 L8 -30 H48 V-6Z" fill="#D7263D"/>
    <path d="M4 -21 L9 -28 H16 V-21Z" fill="#1E2B2F"/>
    <rect x="2" y="-14" width="46" height="3" fill="#F4F6F8"/>
    ${[20, 30, 40].map(gx => `<rect x="${gx}" y="-26" width="6" height="7" fill="#B01E31"/>`).join('')}
    <rect x="5" y="-6" width="14" height="5" rx="2" fill="#2B2F33"/><rect x="32" y="-6" width="14" height="5" rx="2" fill="#2B2F33"/>
    ${[8, 16, 35, 43].map(cx => `<circle cx="${cx}" cy="-1" r="2.4" fill="#2B2F33"/>`).join('')}
  </g>`;
const PROBLEMES = {
  sub: 'Le terminal de fret',
  stages: [
    { name: 'une graine', what: 'Un conteneur attend sur la plateforme' },
    { name: 'une pousse', what: 'Les conteneurs s’empilent, bien rangés' },
    { name: 'une jeune plante', what: 'Le portique de manutention est monté' },
    { name: 'un bouton', what: 'Le portique soulève un conteneur' },
    { name: 'une fleur', what: 'Le train de fret est chargé' },
    { name: 'un arbre', what: 'Camion, projecteurs, porte-conteneurs : le terminal tourne' },
  ],
  stickers: [
    { from: 5, svg: `<rect x="0" y="100" width="28" height="16" fill="#6FAFD4"/>` + F(`
        <rect x="2" y="76" width="7" height="12" fill="#F4F6F8"/><rect x="2" y="78" width="7" height="2" fill="#8FC6E8"/>
        ${ctr(0, 94, 10, 6, '#F2C531')}${ctr(10, 94, 10, 6, '#1F4E9C')}${ctr(10, 88, 10, 6, '#D7263D')}
        <path d="M0 100 L28 100 L24 112 L0 112Z" fill="#2F4B5E"/><path d="M0 109 L25 109 L24 112 L0 112Z" fill="#D7263D"/>`) },
    { from: 0, svg: F(ctr(140, 112, 28, 12, '#D7263D')) },
    { from: 0, to: 0, svg: F(cone(118, 140)) },
    { from: 1, svg: F(ctr(170, 112, 28, 12, '#1F4E9C') + ctr(140, 100, 28, 12, '#F2C531') + ctr(170, 100, 28, 12, '#3E8E7E') + ctr(155, 88, 28, 12, '#F26B1D')) },
    { from: 4, svg: F(track()) + F(freightLoco(2, 138) + flatWagon(52, 138, '#1F4E9C', '#F2C531') + flatWagon(102, 138, '#3E8E7E', '#D7263D') + flatWagon(152, 138, '#F26B1D', '#6B7880')) + glow(6, 128, 4, '#FFF3C4') },
    { from: 2, svg: F(`
        <rect x="30" y="47" width="4" height="99" fill="#F2C531"/><rect x="104" y="47" width="4" height="99" fill="#F2C531"/>
        <rect x="20" y="40" width="98" height="7" fill="#F2C531"/>
        <path d="${Array.from({ length: 13 }, (_, i) => `${i ? 'L' : 'M'}${22 + i * 7.6} ${i % 2 ? 46 : 41}`).join(' ')}" stroke="#C9A21E" stroke-width="1.2" fill="none"/>
        <path d="M34 60 L42 47 M104 60 L96 47" stroke="#F2C531" stroke-width="2"/>
        <rect x="26" y="144" width="12" height="4" fill="#2B2F33"/><rect x="100" y="144" width="12" height="4" fill="#2B2F33"/>
        <circle cx="29" cy="149" r="2.4" fill="#1E2226"/><circle cx="35" cy="149" r="2.4" fill="#1E2226"/><circle cx="103" cy="149" r="2.4" fill="#1E2226"/><circle cx="109" cy="149" r="2.4" fill="#1E2226"/>
        <rect x="36" y="47" width="10" height="9" rx="1" fill="#2B2F33"/><rect x="37.5" y="49" width="7" height="4" fill="#8FC6E8"/>`) },
    { from: 3, svg: F(`
        <rect x="62" y="46" width="16" height="5" fill="#2B2F33"/>
        <path d="M66 51 V74 M74 51 V74" stroke="#4A555C" stroke-width=".9"/>
        <rect x="56" y="74" width="28" height="3" fill="#4A555C"/>
        ${ctr(56, 77, 28, 12, '#6A4C9C')}`) + glow(116, 39, 3, '#FF3B30') },
    { from: 5, svg: F(`
        <rect x="128" y="40" width="2.4" height="72" fill="#6B7880"/><rect x="122" y="36" width="14" height="5" rx="1" fill="#2B2F33"/>
        <rect x="186" y="44" width="2.4" height="44" fill="#6B7880"/><rect x="180" y="40" width="14" height="5" rx="1" fill="#2B2F33"/>`) +
        glow(129, 43, 7, '#FFE9A8') + glow(187, 47, 7, '#FFE9A8') + F(`
        <rect x="0" y="152" width="200" height="14" fill="#5A6066"/>
        ${Array.from({ length: 10 }, (_, i) => `<rect x="${4 + i * 20}" y="158.4" width="10" height="1.2" fill="#F4F6F8"/>`).join('')}`) + F(`
        <path d="M104 160 V146 Q104 142 108 142 H120 V160Z" fill="#F4F6F8"/><path d="M105 151 V146 Q105 144 108 144 H111 V151Z" fill="#1E2B2F"/>
        <rect x="104" y="153" width="16" height="3" fill="#1F4E9C"/>
        <rect x="120" y="157" width="70" height="3.4" fill="#2B2F33"/>
        ${ctr(122, 144, 66, 13, '#F26B1D')}
        ${[110, 128, 176, 184].map(cx => `<circle cx="${cx}" cy="162.5" r="3.4" fill="#1E2226"/>`).join('')}`) + glow(104, 156, 3, '#FFF3C4') },
  ],
};

// ZONES-SUIVANTES

export default {
  id: 'gare',
  age: '7-9',
  label: 'Réseau ferré',
  gardenName: 'Ma gare',
  bg: LOGIQUE.bg,
  zones: {
    logique: toZone(LOGIQUE),
    numeration: toZone(NUMERATION),
    calcul: toZone(CALCUL),
    geometrie: toZone(GEOMETRIE),
    attention: toZone(ATTENTION),
    memoire: toZone(MEMOIRE),
    espace: toZone(ESPACE),
    problemes: toZone(PROBLEMES),
    // ZONES-EXPORT
  },
};
