// Module Grandeurs et mesures (PRD, 3 novembre 2026) : longueurs, durées et lecture de l'heure,
// monnaie, conversions d'unités. Les masses restent dans la famille Balance.
// Pas de 9ᵉ zone : chaque niveau nourrit des zones existantes du jardin.
// Les montants sont en centimes et les conversions en entiers : aucune erreur d'arrondi.

import { getLang, t } from '../i18n/index.js';
import { pick, randInt, shuffle } from '../engines/random.js';

// ---------- longueur1 · Je range (4-6) ----------
// Trois bandes à ranger de la plus courte à la plus longue, contre une ligne de départ.
const BAND_COLORS = ['#2F6FB0', '#E8892F', '#2E7D5B', '#D9617A', '#7A4FB5'];
const BAND_GAPS = [3, 2, 1]; // écart minimal entre deux bandes (en carreaux), selon le palier

export const longueur1 = {
  key: 'longueur1', label: 'Je range', path: '4-6', order: 100,
  skills: ['logique', 'espace'], duration: 2, interaction: 'manipulation', isNew: true,
  create(tier, rng) {
    const gap = BAND_GAPS[tier - 1];
    const first = randInt(rng, 2, 10 - 2 * gap - (tier === 3 ? 2 : 0));
    const lengths = [first, first + gap + randInt(rng, 0, tier === 3 ? 0 : 1), 0];
    lengths[2] = Math.min(10, lengths[1] + gap + randInt(rng, 0, tier === 3 ? 0 : 1));
    const colors = shuffle(rng, BAND_COLORS).slice(0, 3);
    const bands = shuffle(rng, lengths.map((len, i) => ({ id: `b${i}`, len, color: colors[i] })))
      // Au palier 1, les bandes sont déjà alignées ; ensuite, elles sont décalées : il faut les aligner.
      .map((b) => ({ ...b, offset: tier === 1 ? 0 : randInt(rng, 0, 10 - b.len) }));
    return { kind: 'bandes', instruction: t('activities.longueur1.instruction'), bands };
  },
};

// ---------- mesure1 · Je mesure (7-9) ----------
// Un objet posé contre une règle graduée en centimètres.
export const RULER_OBJECTS = ['crayon', 'gomme', 'feuille', 'pinceau'];

export const mesure1 = {
  key: 'mesure1', label: 'Je mesure', path: '7-9', order: 70,
  skills: ['numeration', 'espace'], duration: 3, interaction: 'choix', isNew: true,
  create(tier, rng) {
    const object = pick(rng, RULER_OBJECTS);
    const length = tier === 1 ? randInt(rng, 2, 10) : randInt(rng, 4, 12);
    // Au palier 3, l'objet ne commence plus à zéro : lire l'extrémité donne une réponse trop grande.
    const start = tier === 3 ? randInt(rng, 1, 15 - length) : 0;
    const options = new Set([length]);
    if (tier === 3) options.add(start + length);
    for (const d of shuffle(rng, [-1, 1, 2, -2])) {
      if (options.size >= 3) break;
      if (length + d >= 1) options.add(length + d);
    }
    return {
      kind: 'regle',
      instruction: t('activities.mesure1.instruction', { what: t(`measures.objects.${object}`) }),
      object, start, length,
      // Palier 2 : seuls 0, 5, 10 et 15 sont écrits sur la règle ; il faut compter les graduations.
      labels: tier === 2 ? 'fives' : 'all',
      choices: shuffle(rng, [...options]).map((v) => ({ id: String(v), label: t('measures.cm', { v }) })),
      answer: String(length),
    };
  },
};

// ---------- heure1 · Je lis l'heure (7-9) ----------
// Paliers : heure pile et demie ; puis les quarts ; puis 5 minutes, et l'enfant règle lui-même l'horloge.
export const CLOCK_MINUTES = [[0, 30], [0, 15, 30, 45], [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]];

/** Identifiant d'une heure lue sur un cadran (12 heures) : identique dans les deux langues. */
export const clockId = (h, m) => `${h % 12}:${m}`;

export const heure1 = {
  key: 'heure1', label: 'Je lis l’heure', path: '7-9', order: 80,
  skills: ['numeration', 'attention'], duration: 3, interaction: 'choix', isNew: true,
  create(tier, rng) {
    const minutes = CLOCK_MINUTES[tier - 1];
    // Heures de la journée : le français les écrit sur 24 heures (« 14 h 30 »).
    const h = randInt(rng, 7, 19);
    const m = pick(rng, minutes);
    const label = (hh, mm) => t('measures.clockTime', { h: hh, m: mm });
    if (tier === 3) {
      return {
        kind: 'horloge', instruction: t('activities.heure1.set'), speak: label(h, m),
        target: { h, m }, text: label(h, m),
      };
    }
    // Pièges classiques : une heure de trop ou de moins (surtout après la demie), aiguilles inversées.
    const candidates = [[h + 1, m], [h - 1, m], [h, (m + 30) % 60]];
    if (m % 5 === 0 && m > 0 && (h % 12) * 5 !== m) candidates.push([m / 5 + (h >= 12 ? 12 : 0), (h % 12) * 5]);
    const seen = new Set([clockId(h, m)]);
    const options = [[h, m]];
    for (const [hh, mm] of shuffle(rng, candidates)) {
      const hour = ((hh % 24) + 24) % 24 || 12;
      if (options.length < 3 && minutes.includes(mm) && !seen.has(clockId(hour, mm))) {
        seen.add(clockId(hour, mm));
        options.push([hour, mm]);
      }
    }
    return {
      kind: 'choix', instruction: t('activities.heure1.read'),
      visual: { type: 'clock', h, m },
      choices: shuffle(rng, options).map(([hh, mm]) => ({ id: clockId(hh, mm), label: label(hh, mm) })),
      answer: clockId(h, m),
    };
  },
};

// ---------- monnaie1 · Je paie (7-9) ----------
// Pièces et billets génériques, en centimes. Palier 3 : rendre la monnaie.
export const COINS_BY_TIER = [
  [100, 200, 500],
  [10, 20, 50, 100, 200, 500],
  [10, 20, 50, 100, 200, 500],
];

export const monnaie1 = {
  key: 'monnaie1', label: 'Je paie', path: '7-9', order: 90,
  skills: ['calcul', 'problemes'], duration: 3, interaction: 'manipulation', isNew: true,
  create(tier, rng) {
    const coins = COINS_BY_TIER[tier - 1];
    if (tier === 1) {
      const price = 100 * randInt(rng, 2, 10);
      return { kind: 'monnaie', instruction: t('activities.monnaie1.pay'), price, target: price, coins };
    }
    if (tier === 2) {
      const price = 10 * randInt(rng, 11, 99);
      return { kind: 'monnaie', instruction: t('activities.monnaie1.pay'), price, target: price, coins };
    }
    const price = 10 * randInt(rng, 11, 95);
    const paid = price < 500 ? 500 : 1000;
    return {
      kind: 'monnaie', instruction: t('activities.monnaie1.change'),
      price, paid, target: paid - price, coins: coins.filter((c) => c < paid),
    };
  },
};

// ---------- conversions · Je convertis (10-12) ----------
// Le tableau de conversion dessiné montre où se place chaque chiffre quand l'unité change.
export const UNIT_TABLES = {
  longueur: ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'],
  masse: ['kg', 'hg', 'dag', 'g', 'dg', 'cg', 'mg'],
  contenance: ['hL', 'daL', 'L', 'dL', 'cL', 'mL'],
};
// Conversions proposées : [table, unité de départ, unité d'arrivée] (l'arrivée est plus petite).
const PAIRS = [
  ['longueur', 'm', 'cm'], ['longueur', 'km', 'm'], ['longueur', 'cm', 'mm'], ['longueur', 'm', 'mm'],
  ['masse', 'kg', 'g'], ['contenance', 'L', 'cL'], ['contenance', 'L', 'mL'], ['contenance', 'dL', 'cL'],
];

/** Écrit l'entier n divisé par 10^k, sans passer par un nombre à virgule (pas d'erreur d'arrondi). */
export function scaledText(n, k) {
  const s = String(n).padStart(k + 1, '0');
  const int = s.slice(0, s.length - k);
  const dec = k ? s.slice(s.length - k).replace(/0+$/, '') : '';
  return dec ? `${int}${getLang() === 'en' ? '.' : ','}${dec}` : int;
}

function unitConversion(tier, rng) {
  const [table, from, to] = pick(rng, PAIRS);
  const units = UNIT_TABLES[table];
  const k = units.indexOf(to) - units.indexOf(from); // puissance de 10 entre les deux unités
  const unit = (u) => t(`measures.units.${u}`);
  // Palier 1 : nombre entier vers une unité plus petite, ou l'inverse quand le compte tombe juste.
  // Paliers 2 et 3 : nombre décimal (de plus en plus de chiffres après la virgule).
  let answer;
  let given;
  let ask;
  if (tier === 1 && rng() < 0.4) {
    // Vers l'unité plus grande : 300 cm = ? m
    answer = randInt(rng, 2, 9);
    given = String(answer * 10 ** k);
    ask = [to, from];
  } else {
    const decimals = tier === 1 ? 0 : Math.min(k, tier === 2 ? 1 : randInt(rng, 1, 2));
    let value;
    do value = randInt(rng, tier === 1 ? 2 : 11, tier === 3 ? 999 : 99);
    while (decimals && value % 10 === 0);
    // value / 10^decimals unités de départ = value × 10^(k - decimals) unités d'arrivée
    answer = value * 10 ** (k - decimals);
    given = scaledText(value, decimals);
    ask = [from, to];
  }
  return {
    question: t('measures.convert', { v: given, from: unit(ask[0]), to: unit(ask[1]) }),
    answer,
    hintVisual: { type: 'convTable', units: units.map(unit), digits: tableDigits(given, units.indexOf(ask[0])), target: units.indexOf(ask[1]) },
    hint: t('measures.hintTable'),
  };
}

/** Chiffres du nombre donné, placés dans le tableau : le chiffre des unités sous l'unité de départ. */
export function tableDigits(given, unitIndex) {
  const [int, dec = ''] = given.split(/[.,]/);
  return [
    ...[...int].map((d, i) => ({ d, col: unitIndex - (int.length - 1 - i) })),
    ...[...dec].map((d, i) => ({ d, col: unitIndex + 1 + i })),
  ];
}

function durationConversion(tier, rng) {
  const kind = pick(rng, tier === 1 ? ['h', 'min'] : tier === 2 ? ['h', 'min', 'hmin'] : ['hmin', 'minsec', 'demi']);
  let question;
  let answer;
  let hint;
  if (kind === 'h') {
    const h = randInt(rng, 2, tier === 1 ? 5 : 12);
    question = t('measures.hToMin', { h });
    answer = 60 * h;
    hint = t('measures.hintHour');
  } else if (kind === 'min') {
    const m = randInt(rng, 2, tier === 1 ? 5 : 15);
    question = t('measures.minToSec', { m });
    answer = 60 * m;
    hint = t('measures.hintMinute');
  } else if (kind === 'hmin') {
    const h = randInt(rng, 1, 4);
    const m = 5 * randInt(rng, 1, 11);
    question = t('measures.hMinToMin', { h, m });
    answer = 60 * h + m;
    hint = t('measures.hintHour');
  } else if (kind === 'minsec') {
    const m = randInt(rng, 1, 9);
    const s = 5 * randInt(rng, 1, 11);
    question = t('measures.minSecToSec', { m, s });
    answer = 60 * m + s;
    hint = t('measures.hintMinute');
  } else {
    // Une demi-heure, un quart d'heure : 2 h et demie = ? min
    const h = randInt(rng, 1, 5);
    const q = pick(rng, ['half', 'quarter', 'threeQuarters']);
    question = t(`measures.${q}`, { h });
    answer = 60 * h + { half: 30, quarter: 15, threeQuarters: 45 }[q];
    hint = t('measures.hintHour');
  }
  return { question, answer, hintVisual: null, hint };
}

export const conversions = {
  key: 'conversions', label: 'Je convertis', path: '10-12', order: 100,
  skills: ['numeration', 'calcul'], duration: 3, interaction: 'clavier', isNew: true,
  create(tier, rng) {
    const c = rng() < 0.7 ? unitConversion(tier, rng) : durationConversion(tier, rng);
    return {
      kind: 'clavier', instruction: t('activities.conversions.instruction'),
      question: null, speak: c.question, answer: c.answer, confidence: true,
      visual: { type: 'story', text: c.question, emoji: null },
      hintVisual: c.hintVisual, hint: c.hint,
    };
  },
};

export const MESURES_ACTIVITIES = [longueur1, mesure1, heure1, monnaie1, conversions];
