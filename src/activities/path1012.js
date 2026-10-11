// Parcours 10-12 ans (CM2 – 6e) : 8 activités, ajoutées sans modifier les existantes.
//
// Appuis pédagogiques (sciences cognitives de l'apprentissage) :
//  - les quatre piliers de l'apprentissage (S. Dehaene) : attention, engagement actif,
//    retour sur erreur immédiat, consolidation ;
//  - la droite numérique (Siegler & Booth) : placer fractions et décimaux sur une ligne
//    construit la représentation de leur grandeur ;
//  - concret → imagé → abstrait et double codage : barres de fractions, schémas en barres ;
//  - pratique entrelacée : on mélange aire et périmètre, ou plusieurs stratégies de calcul,
//    pour apprendre à choisir la bonne procédure ;
//  - effet de test et récupération espacée : séances courtes, révisions réparties
//    (voir sessionEngine, option « recency ») ;
//  - métacognition et effet d'hypercorrection : l'enfant dit s'il est sûr de lui ; une erreur
//    commise avec assurance, puis corrigée, est particulièrement bien retenue.

import { pick, randInt, shuffle } from '../engines/random.js';

const frac = (n, d) => `${n}/${d}`;
const fmt = (n) => n.toLocaleString('fr-FR').replace(/ /g, ' ');
const decimal = (v, digits) => v.toFixed(digits).replace('.', ',');

const DENOM_WORDS = { 2: ['demi', 'demis'], 3: ['tiers', 'tiers'], 4: ['quart', 'quarts'], 5: ['cinquième', 'cinquièmes'], 6: ['sixième', 'sixièmes'], 8: ['huitième', 'huitièmes'], 10: ['dixième', 'dixièmes'] };
export const fractionWords = (n, d) => `${n} ${(DENOM_WORDS[d] || [`${d}ième`, `${d}ièmes`])[n > 1 ? 1 : 0]}`;

const fractionChoices = (rng, correct, distractors) => {
  const seen = new Set([correct]);
  const list = [correct];
  const [cn, cd] = correct.split('/').map(Number);
  // Repli : n/(d+k) n'est jamais égal à n/d.
  const fallback = [2, 3, 4].map((k) => frac(cn, cd + k));
  for (const f of [...distractors, ...fallback]) {
    if (list.length >= 3) break;
    const [n, d] = f.split('/').map(Number);
    if (n > 0 && d > 1 && !seen.has(f)) {
      seen.add(f);
      list.push(f);
    }
  }
  return shuffle(rng, list).map((f) => ({ id: f, label: f }));
};

// ---------- 1. La droite des nombres ----------
const droite = {
  key: 'droite', label: 'La droite des nombres', subtitle: 'Je place fractions et décimaux', path: '10-12', order: 10,
  skills: ['numeration', 'espace', 'attention'], duration: 3, interaction: 'droite',
  create(tier, rng) {
    if (tier === 1) {
      const d = pick(rng, [2, 4]);
      const n = randInt(rng, 1, d - 1);
      return { kind: 'droite', instruction: 'Place ce nombre sur la droite.', target: { n, d }, speak: fractionWords(n, d), value: n / d, min: 0, max: 1, ticks: d, tolerance: 0.07, confidence: true };
    }
    if (tier === 2) {
      const v = randInt(rng, 1, 19) / 10;
      return { kind: 'droite', instruction: 'Place ce nombre sur la droite.', target: { text: decimal(v, 1) }, speak: decimal(v, 1), value: v, min: 0, max: 2, ticks: 10, tolerance: 0.1, confidence: true };
    }
    if (rng() < 0.5) {
      const d = pick(rng, [3, 5, 8]);
      let n;
      do n = randInt(rng, 1, 2 * d - 1); while (n % d === 0);
      return { kind: 'droite', instruction: 'Place ce nombre sur la droite.', target: { n, d }, speak: fractionWords(n, d), value: n / d, min: 0, max: 2, ticks: 2, tolerance: 0.12, confidence: true };
    }
    const v = randInt(rng, 5, 95) / 100;
    return { kind: 'droite', instruction: 'Place ce nombre sur la droite.', target: { text: decimal(v, 2) }, speak: decimal(v, 2), value: v, min: 0, max: 1, ticks: 2, tolerance: 0.06, confidence: true };
  },
};

// ---------- 2. Fractions ----------
const fractions = {
  key: 'fractions', label: 'Fractions', subtitle: 'Je reconnais, j’égalise, je compare', path: '10-12', order: 20,
  skills: ['logique', 'numeration'], duration: 3, interaction: 'choix',
  create(tier, rng) {
    if (tier === 1) {
      const d = randInt(rng, 2, 6);
      const n = randInt(rng, 1, d - 1);
      return {
        kind: 'choix', instruction: 'Quelle fraction de la barre est coloriée ?',
        visual: { type: 'fractionBars', items: [{ n, d }] },
        choices: fractionChoices(rng, frac(n, d), shuffle(rng, [frac(d - n, d), frac(n, d + 1), frac(n + 1, d), frac(d, n)]).filter((f) => { const [a, b] = f.split('/').map(Number); return a < b; })),
        answer: frac(n, d),
      };
    }
    if (tier === 2) {
      const b = pick(rng, [2, 3, 4, 5]);
      const a = randInt(rng, 1, b - 1);
      const k = randInt(rng, 2, 3);
      const same = (f) => { const [x, y] = f.split('/').map(Number); return x * b === a * y; };
      const distractors = shuffle(rng, [frac(a + 1, b), frac(a, b + 1), frac(k * a, k * b + 1), frac(a + k, b + k), frac(b - a, b)]).filter((f) => !same(f) && f.split('/').map(Number)[0] < f.split('/').map(Number)[1]);
      return {
        kind: 'choix', instruction: `Quelle fraction est égale à ${frac(k * a, k * b)} ?`, speak: `Quelle fraction est égale à ${fractionWords(k * a, k * b)} ?`,
        visual: { type: 'fractionBars', items: [{ n: k * a, d: k * b }] },
        choices: fractionChoices(rng, frac(a, b), distractors),
        answer: frac(a, b),
      };
    }
    // Comparer deux fractions de dénominateurs différents : les barres n'apparaissent qu'après la réponse.
    let p; let q; let r; let s;
    do {
      q = randInt(rng, 3, 8); s = randInt(rng, 3, 8);
      p = randInt(rng, 1, q - 1); r = randInt(rng, 1, s - 1);
    } while (q === s || p * s === r * q);
    const a = frac(p, q); const b = frac(r, s);
    return {
      kind: 'choix', instruction: 'Laquelle est la plus grande ?', speak: `Laquelle est la plus grande : ${fractionWords(p, q)} ou ${fractionWords(r, s)} ?`,
      visual: { type: 'fractionBars', items: [{ n: p, d: q }, { n: r, d: s }] }, revealVisual: true,
      choices: shuffle(rng, [{ id: a, label: a }, { id: b, label: b }]).concat({ id: 'egales', label: 'Égales' }),
      answer: p * s > r * q ? a : b,
    };
  },
};

// ---------- 3. Proportionnalité ----------
const SITUATIONS = [
  { a: 'personnes', b: 'farine (g)', unit: 50, text: (x, y, z) => `Pour ${x} personnes, il faut ${y} g de farine. Combien de grammes pour ${z} personnes ?` },
  { a: 'cahiers', b: 'prix (€)', unit: 2, text: (x, y, z) => `${x} cahiers coûtent ${y} €. Combien coûtent ${z} cahiers ?` },
  { a: 'heures', b: 'distance (km)', unit: 15, text: (x, y, z) => `Un vélo roule ${y} km en ${x} heures. Combien de km en ${z} heures, à la même vitesse ?` },
  { a: 'pots', b: 'surface (m²)', unit: 6, text: (x, y, z) => `Avec ${x} pots de peinture, on peint ${y} m². Combien de m² avec ${z} pots ?` },
];
const proportion = {
  key: 'proportion', label: 'Proportionnalité', subtitle: 'Recettes, prix et vitesses', path: '10-12', order: 30,
  skills: ['problemes', 'calcul'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const sit = pick(rng, SITUATIONS);
    const per = sit.unit * randInt(rng, 1, 4);
    let x; let z;
    if (tier === 1) { x = randInt(rng, 1, 4); z = x * pick(rng, [2, 3, 4]); }
    else if (tier === 2) { x = pick(rng, [2, 3, 4, 5]); z = pick(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => v !== x && v % x !== 0)); }
    else { [x, z] = pick(rng, [[4, 6], [6, 9], [6, 10], [8, 12], [10, 15], [4, 10]]); }
    const y = x * per;
    const answer = z * per;
    const text = sit.text(x, y, z);
    return {
      kind: 'clavier', instruction: 'Situation de proportionnalité', question: null, speak: text, answer, confidence: true,
      visual: { type: 'story', text, emoji: null, table: { headers: [sit.a, sit.b], rows: [[x, y], [z, '?']] } },
      hint: tier === 1 ? `Il y a ${z / x} fois plus de ${sit.a} : multiplie aussi par ${z / x}.` : `Astuce : cherche d’abord la valeur pour 1, puis pour ${z}.`,
    };
  },
};

// ---------- 4. Calcul malin (stratégies entrelacées) ----------
const STRATEGIES = {
  fois10: (rng) => { const a = randInt(rng, 12, 450); const b = pick(rng, [10, 100, 1000]); return [`${a} × ${b}`, a * b, `Multiplier par ${b}, c’est décaler les chiffres vers la gauche.`]; },
  fois5: (rng) => { const a = 2 * randInt(rng, 6, 49); return [`${a} × 5`, a * 5, `Astuce : × 10 puis ÷ 2 (${a} × 10 = ${a * 10}).`]; },
  fois9: (rng) => { const a = randInt(rng, 12, 89); return [`${a} × 9`, a * 9, `Astuce : × 10 puis − ${a} (${a * 10} − ${a}).`]; },
  fois11: (rng) => { const a = randInt(rng, 12, 89); return [`${a} × 11`, a * 11, `Astuce : × 10 puis + ${a} (${a * 10} + ${a}).`]; },
  div4: (rng) => { const a = 4 * randInt(rng, 12, 99); return [`${a} ÷ 4`, a / 4, `Astuce : ÷ 2 puis encore ÷ 2 (${a} ÷ 2 = ${a / 2}).`]; },
  fois25: (rng) => { const a = 4 * randInt(rng, 3, 39); return [`${a} × 25`, a * 25, `Astuce : ÷ 4 puis × 100 (${a} ÷ 4 = ${a / 4}).`]; },
  div5: (rng) => { const a = 5 * randInt(rng, 12, 199); return [`${a} ÷ 5`, a / 5, `Astuce : × 2 puis ÷ 10 (${a} × 2 = ${a * 2}).`]; },
  fois99: (rng) => { const a = randInt(rng, 12, 49); return [`${a} × 99`, a * 99, `Astuce : × 100 puis − ${a} (${a * 100} − ${a}).`]; },
};
const STRATEGY_TIERS = [['fois10', 'fois5', 'fois11'], ['fois5', 'fois9', 'fois11', 'div4'], ['fois9', 'div4', 'fois25', 'div5', 'fois99']];
const calculmalin = {
  key: 'calculmalin', label: 'Calcul malin', subtitle: 'Des astuces pour calculer vite', path: '10-12', order: 40,
  skills: ['calcul', 'memoire', 'vitesse'], duration: 3, interaction: 'clavier', rounds: 6,
  create(tier, rng) {
    const [question, answer, hint] = STRATEGIES[pick(rng, STRATEGY_TIERS[tier - 1])](rng);
    return { kind: 'clavier', instruction: 'Calcule de tête, avec une astuce.', question, speak: question.replace('×', 'fois').replace('÷', 'divisé par'), answer, hint, confidence: true };
  },
};

// ---------- 5. Aires et périmètres (entrelacés) ----------
const aires = {
  key: 'aires', label: 'Aires et périmètres', subtitle: 'L’intérieur ou le tour ?', path: '10-12', order: 50,
  skills: ['geometrie', 'espace'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const ask = pick(rng, ['aire', 'perimetre']);
    let w; let h; let cut = null; let labels = null;
    if (tier === 1) { w = randInt(rng, 2, 6); h = randInt(rng, 2, 5); }
    else if (tier === 2) { w = randInt(rng, 4, 7); h = randInt(rng, 3, 6); cut = { w: randInt(rng, 1, w - 2), h: randInt(rng, 1, h - 2) }; }
    else { w = randInt(rng, 4, 15); h = randInt(rng, 3, 12); labels = true; }
    const area = w * h - (cut ? cut.w * cut.h : 0);
    const perimeter = 2 * (w + h);
    const unitA = tier === 3 ? 'en cm²' : 'en carreaux';
    const unitP = tier === 3 ? 'en cm' : 'en côtés de carreau';
    return {
      kind: 'clavier',
      instruction: ask === 'aire' ? `Quelle est l’aire de cette figure ? (${unitA})` : `Quel est son périmètre ? (${unitP})`,
      question: null, answer: ask === 'aire' ? area : perimeter, confidence: true,
      visual: { type: 'grid', w, h, cut, labels, showGrid: tier < 3 },
      hintVisual: { type: 'grid', w, h, cut, labels, showGrid: true, highlight: ask }, hintReplaces: true,
      hint: ask === 'aire' ? 'L’aire, c’est la surface à l’intérieur : compte les carreaux.' : 'Le périmètre, c’est la longueur du tour : suis le bord.',
    };
  },
};

// ---------- 6. Les angles ----------
const angles = {
  key: 'angles', label: 'Les angles', subtitle: 'J’estime et je compare', path: '10-12', order: 60,
  skills: ['geometrie', 'attention'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    const rotate = randInt(rng, -40, 40);
    if (tier === 1) {
      const kind = pick(rng, ['aigu', 'droit', 'obtus']);
      const deg = kind === 'aigu' ? randInt(rng, 25, 65) : kind === 'droit' ? 90 : randInt(rng, 115, 160);
      return {
        kind: 'choix', instruction: 'Cet angle est…', visual: { type: 'angle', deg, rotate },
        choices: [{ id: 'aigu', label: 'Aigu' }, { id: 'droit', label: 'Droit' }, { id: 'obtus', label: 'Obtus' }], answer: kind,
      };
    }
    const deg = tier === 2 ? pick(rng, [30, 45, 60, 90, 120, 135, 150]) : 5 * randInt(rng, 3, 33);
    const gap = tier === 2 ? 40 : 20;
    const options = new Set([deg]);
    while (options.size < 3) {
      const o = deg + pick(rng, [-2, -1, 1, 2]) * gap;
      if (o >= 10 && o <= 170) options.add(o);
    }
    return {
      kind: 'choix', instruction: 'Combien mesure cet angle, environ ?', visual: { type: 'angle', deg, rotate },
      choices: shuffle(rng, [...options]).map((o) => ({ id: String(o), label: `${o}°` })), answer: String(deg),
    };
  },
};

// ---------- 7. Problèmes à étapes (schéma en barres) ----------
const NAMES = ['Léa', 'Nour', 'Tom', 'Inès', 'Hugo', 'Maya', 'Sami', 'Jade'];
const etapes = {
  key: 'etapes', label: 'Problèmes à étapes', subtitle: 'Je modélise avec des barres', path: '10-12', order: 70,
  skills: ['problemes', 'logique'], duration: 4, interaction: 'clavier', rounds: 4,
  create(tier, rng) {
    const p = pick(rng, NAMES);
    const q = pick(rng, NAMES.filter((n) => n !== p));
    let text; let answer; let bars;
    const kind = pick(rng, tier === 1 ? ['fois', 'tiers'] : tier === 2 ? ['monnaie', 'fractionDe', 'fois'] : ['partage', 'duree', 'fractionDe']);
    if (kind === 'fois') {
      const a = randInt(rng, 6, 25); const k = randInt(rng, 2, 4);
      text = `Un livre coûte ${a} €. Un jeu coûte ${k} fois plus cher. Combien coûtent le livre et le jeu ensemble ?`;
      answer = a + k * a;
      bars = [{ label: 'Livre', parts: 1, note: `${a} €` }, { label: 'Jeu', parts: k }];
    } else if (kind === 'tiers') {
      const part = randInt(rng, 5, 20); const d = pick(rng, [3, 4]); const total = part * d;
      text = `${p} a ${total} billes. ${p} en donne le ${d === 3 ? 'tiers' : 'quart'} à ${q}. Combien lui en reste-t-il ?`;
      answer = total - part;
      bars = [{ label: p, parts: d, shaded: 1, note: `${total}` }];
    } else if (kind === 'monnaie') {
      const n = randInt(rng, 2, 4); const price = randInt(rng, 2, 5); const extra = randInt(rng, 1, 4);
      // Billet strictement supérieur au total : il y a toujours de la monnaie à rendre.
      const pay = (Math.floor((n * price + extra) / 10) + 1) * 10 + (rng() < 0.5 ? 0 : 10);
      text = `${p} achète ${n} cahiers à ${price} € et un stylo à ${extra} €. ${p} paie avec ${pay} €. Combien lui rend-on ?`;
      answer = pay - n * price - extra;
      bars = [{ label: 'Payé', parts: 1, note: `${pay} €` }, { label: 'Achats', parts: n + 1, note: '?' }];
    } else if (kind === 'fractionDe') {
      const d = pick(rng, [3, 4, 5]); const n = randInt(rng, 2, d - 1); const unit = randInt(rng, 3, 9); const total = unit * d;
      text = `Les ${fractionWords(n, d)} des ${total} élèves vont à la piscine. Combien d’élèves y vont ?`;
      answer = unit * n;
      bars = [{ label: 'Élèves', parts: d, shaded: n, note: `${total}` }];
    } else if (kind === 'partage') {
      const small = randInt(rng, 10, 40); const diff = 5 * randInt(rng, 2, 6); const total = 2 * small + diff;
      text = `${p} et ${q} se partagent ${total} €. ${p} reçoit ${diff} € de plus que ${q}. Combien reçoit ${q} ?`;
      answer = small;
      bars = [{ label: q, parts: 1, note: '?' }, { label: p, parts: 1, extra: `+${diff} €` }];
      bars.caption = `Ensemble : ${total} €`;
    } else {
      const h1 = randInt(rng, 8, 15); const m1 = 5 * randInt(rng, 0, 11); const dur = 5 * randInt(rng, 8, 30);
      const end = h1 * 60 + m1 + dur;
      const hm = (t) => `${Math.floor(t / 60)} h ${String(t % 60).padStart(2, '0')}`;
      text = `Un train part à ${hm(h1 * 60 + m1)} et arrive à ${hm(end)}. Combien de minutes dure le trajet ?`;
      answer = dur;
      bars = null;
    }
    return {
      kind: 'clavier', instruction: 'Lis, modélise, puis calcule.', question: null, speak: text, answer, confidence: true,
      visual: { type: 'story', text, emoji: null },
      hintVisual: bars ? { type: 'barModel', rows: bars, caption: bars.caption } : null,
      hint: bars ? 'Astuce : dessine le problème avec des barres, comme ci-dessus.' : 'Astuce : compte d’abord jusqu’à l’heure pile, puis ajoute les minutes.',
    };
  },
};

// ---------- 8. Grands nombres ----------
const grandsnombres = {
  key: 'grandsnombres', label: 'Grands nombres', subtitle: 'Valeur des chiffres et arrondis', path: '10-12', order: 80,
  skills: ['numeration', 'memoire'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    if (tier < 3) {
      const len = tier === 1 ? 6 : 7;
      let digits;
      do digits = [randInt(rng, 1, 9), ...Array.from({ length: len - 1 }, () => randInt(rng, 0, 9))];
      while (new Set(digits).size < 4);
      const candidates = digits.map((d, i) => ({ d, pos: len - 1 - i })).filter((c) => c.d !== 0 && digits.filter((x) => x === c.d).length === 1 && c.pos >= 1);
      const target = candidates.length ? pick(rng, candidates) : { d: digits[0], pos: len - 1 };
      const number = Number(digits.join(''));
      const values = [target.pos - 1, target.pos, target.pos + 1].filter((pp) => pp >= 0).map((pp) => target.d * 10 ** pp);
      return {
        kind: 'choix', instruction: `Que vaut le chiffre ${target.d} dans ce nombre ?`,
        visual: { type: 'placeValue', text: fmt(number), highlight: target.d },
        choices: shuffle(rng, values).map((v) => ({ id: String(v), label: fmt(v) })), answer: String(target.d * 10 ** target.pos),
      };
    }
    const number = randInt(rng, 1_000_000, 9_999_999);
    const step = pick(rng, [1000, 10_000, 100_000]);
    const rounded = Math.round(number / step) * step;
    const other = rounded === Math.floor(number / step) * step ? rounded + step : Math.floor(number / step) * step;
    const third = Math.round(number / (step * 10)) * step * 10 === rounded ? rounded - step : Math.round(number / (step * 10)) * step * 10;
    const names = { 1000: 'au millier près', 10_000: 'à la dizaine de mille près', 100_000: 'à la centaine de mille près' };
    const opts = [...new Set([rounded, other, third])];
    while (opts.length < 3) opts.push(rounded + step * (opts.length + 1));
    return {
      kind: 'choix', instruction: `Arrondis ce nombre ${names[step]}.`,
      visual: { type: 'placeValue', text: fmt(number) },
      choices: shuffle(rng, opts).map((v) => ({ id: String(v), label: fmt(v) })), answer: String(rounded),
    };
  },
};

export const PATH_1012_ACTIVITIES = [droite, fractions, proportion, calculmalin, aires, angles, etapes, grandsnombres];
