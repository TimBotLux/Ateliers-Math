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
//
// Les textes viennent du dictionnaire (src/i18n), dans la langue courante au moment de la manche.

import { pick, randInt, shuffle } from '../engines/random.js';
import { fmtDecimal, fmtNumber, t } from '../i18n/index.js';

const frac = (n, d) => `${n}/${d}`;
export const fractionWords = (n, d) => t('common.fraction', { n, d });
const money = (v) => t('common.money', { v });

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
    const instruction = t('activities.droite.instruction');
    if (tier === 1) {
      const d = pick(rng, [2, 4]);
      const n = randInt(rng, 1, d - 1);
      return { kind: 'droite', instruction, target: { n, d }, speak: fractionWords(n, d), value: n / d, min: 0, max: 1, ticks: d, tolerance: 0.07, confidence: true };
    }
    if (tier === 2) {
      const v = randInt(rng, 1, 19) / 10;
      return { kind: 'droite', instruction, target: { text: fmtDecimal(v, 1) }, speak: fmtDecimal(v, 1), value: v, min: 0, max: 2, ticks: 10, tolerance: 0.1, confidence: true };
    }
    if (rng() < 0.5) {
      const d = pick(rng, [3, 5, 8]);
      let n;
      do n = randInt(rng, 1, 2 * d - 1); while (n % d === 0);
      return { kind: 'droite', instruction, target: { n, d }, speak: fractionWords(n, d), value: n / d, min: 0, max: 2, ticks: 2, tolerance: 0.12, confidence: true };
    }
    const v = randInt(rng, 5, 95) / 100;
    return { kind: 'droite', instruction, target: { text: fmtDecimal(v, 2) }, speak: fmtDecimal(v, 2), value: v, min: 0, max: 1, ticks: 2, tolerance: 0.06, confidence: true };
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
        kind: 'choix', instruction: t('activities.fractions.colored'),
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
        kind: 'choix',
        instruction: t('activities.fractions.equal', { f: frac(k * a, k * b) }),
        speak: t('activities.fractions.equalSpeak', { words: fractionWords(k * a, k * b) }),
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
      kind: 'choix', instruction: t('activities.fractions.bigger'),
      speak: t('activities.fractions.biggerSpeak', { a: fractionWords(p, q), b: fractionWords(r, s) }),
      visual: { type: 'fractionBars', items: [{ n: p, d: q }, { n: r, d: s }] }, revealVisual: true,
      choices: shuffle(rng, [{ id: a, label: a }, { id: b, label: b }]).concat({ id: 'egales', label: t('activities.fractions.equalChoice') }),
      answer: p * s > r * q ? a : b,
    };
  },
};

// ---------- 3. Proportionnalité ----------
// Valeur unitaire de chaque situation (même ordre que proportion.situations dans le dictionnaire).
const SITUATION_UNITS = [50, 2, 15, 6];
const proportion = {
  key: 'proportion', label: 'Proportionnalité', subtitle: 'Recettes, prix et vitesses', path: '10-12', order: 30,
  skills: ['problemes', 'calcul'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const index = randInt(rng, 0, SITUATION_UNITS.length - 1);
    const sit = t('proportion.situations')[index];
    const per = SITUATION_UNITS[index] * randInt(rng, 1, 4);
    let x; let z;
    if (tier === 1) { x = randInt(rng, 1, 4); z = x * pick(rng, [2, 3, 4]); }
    else if (tier === 2) { x = pick(rng, [2, 3, 4, 5]); z = pick(rng, [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => v !== x && v % x !== 0)); }
    else { [x, z] = pick(rng, [[4, 6], [6, 9], [6, 10], [8, 12], [10, 15], [4, 10]]); }
    const y = x * per;
    const answer = z * per;
    const text = sit.text({ x, y, z });
    return {
      kind: 'clavier', instruction: t('activities.proportion.instruction'), question: null, speak: text, answer, confidence: true,
      visual: { type: 'story', text, emoji: null, table: { headers: [sit.a, sit.b], rows: [[x, y], [z, '?']] } },
      hint: tier === 1 ? t('proportion.hintTimes', { k: z / x, what: sit.a }) : t('proportion.hintUnit', { z }),
    };
  },
};

// ---------- 4. Calcul malin (stratégies entrelacées) ----------
const STRATEGIES = {
  fois10: (rng) => { const a = randInt(rng, 12, 450); const b = pick(rng, [10, 100, 1000]); return [`${a} × ${b}`, a * b, t('tricks.fois10', { b })]; },
  fois5: (rng) => { const a = 2 * randInt(rng, 6, 49); return [`${a} × 5`, a * 5, t('tricks.fois5', { a, p: a * 10 })]; },
  fois9: (rng) => { const a = randInt(rng, 12, 89); return [`${a} × 9`, a * 9, t('tricks.fois9', { a, p: a * 10 })]; },
  fois11: (rng) => { const a = randInt(rng, 12, 89); return [`${a} × 11`, a * 11, t('tricks.fois11', { a, p: a * 10 })]; },
  div4: (rng) => { const a = 4 * randInt(rng, 12, 99); return [`${a} ÷ 4`, a / 4, t('tricks.div4', { a, p: a / 2 })]; },
  fois25: (rng) => { const a = 4 * randInt(rng, 3, 39); return [`${a} × 25`, a * 25, t('tricks.fois25', { a, p: a / 4 })]; },
  div5: (rng) => { const a = 5 * randInt(rng, 12, 199); return [`${a} ÷ 5`, a / 5, t('tricks.div5', { a, p: a * 2 })]; },
  fois99: (rng) => { const a = randInt(rng, 12, 49); return [`${a} × 99`, a * 99, t('tricks.fois99', { a, p: a * 100 })]; },
};
const STRATEGY_TIERS = [['fois10', 'fois5', 'fois11'], ['fois5', 'fois9', 'fois11', 'div4'], ['fois9', 'div4', 'fois25', 'div5', 'fois99']];
const calculmalin = {
  key: 'calculmalin', label: 'Calcul malin', subtitle: 'Des astuces pour calculer vite', path: '10-12', order: 40,
  skills: ['calcul', 'memoire', 'vitesse'], duration: 3, interaction: 'clavier', rounds: 6,
  create(tier, rng) {
    const [question, answer, hint] = STRATEGIES[pick(rng, STRATEGY_TIERS[tier - 1])](rng);
    const [x, op, y] = question.split(' ');
    const speak = op === '×' ? t('speech.times', { a: x, b: y }) : `${x} ${t('speech.dividedBy')} ${y}`;
    return { kind: 'clavier', instruction: t('activities.calculmalin.instruction'), question, speak, answer, hint, confidence: true };
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
    const unit = ask === 'aire'
      ? t(tier === 3 ? 'activities.aires.unitAreaCm' : 'activities.aires.unitArea')
      : t(tier === 3 ? 'activities.aires.unitPerimeterCm' : 'activities.aires.unitPerimeter');
    return {
      kind: 'clavier',
      instruction: t(ask === 'aire' ? 'activities.aires.area' : 'activities.aires.perimeter', { unit }),
      question: null, answer: ask === 'aire' ? area : perimeter, confidence: true,
      visual: { type: 'grid', w, h, cut, labels, showGrid: tier < 3 },
      hintVisual: { type: 'grid', w, h, cut, labels, showGrid: true, highlight: ask }, hintReplaces: true,
      hint: t(ask === 'aire' ? 'activities.aires.hintArea' : 'activities.aires.hintPerimeter'),
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
        kind: 'choix', instruction: t('activities.angles.kind'), visual: { type: 'angle', deg, rotate },
        choices: ['aigu', 'droit', 'obtus'].map((id) => ({ id, label: t(`activities.angles.${id}`) })), answer: kind,
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
      kind: 'choix', instruction: t('activities.angles.measure'), visual: { type: 'angle', deg, rotate },
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
    let text; let answer; let bars; let caption = null;
    const kind = pick(rng, tier === 1 ? ['fois', 'tiers'] : tier === 2 ? ['monnaie', 'fractionDe', 'fois'] : ['partage', 'duree', 'fractionDe']);
    if (kind === 'fois') {
      const a = randInt(rng, 6, 25); const k = randInt(rng, 2, 4);
      text = t('steps.times', { a, k });
      answer = a + k * a;
      bars = [{ label: t('steps.book'), parts: 1, note: money(a) }, { label: t('steps.game'), parts: k }];
    } else if (kind === 'tiers') {
      const part = randInt(rng, 5, 20); const d = pick(rng, [3, 4]); const total = part * d;
      text = t('steps.part', { p, q, total, d });
      answer = total - part;
      bars = [{ label: p, parts: d, shaded: 1, note: `${total}` }];
    } else if (kind === 'monnaie') {
      const n = randInt(rng, 2, 4); const price = randInt(rng, 2, 5); const extra = randInt(rng, 1, 4);
      // Billet strictement supérieur au total : il y a toujours de la monnaie à rendre.
      const pay = (Math.floor((n * price + extra) / 10) + 1) * 10 + (rng() < 0.5 ? 0 : 10);
      text = t('steps.change', { p, n, price, extra, pay });
      answer = pay - n * price - extra;
      bars = [{ label: t('steps.paid'), parts: 1, note: money(pay) }, { label: t('steps.bought'), parts: n + 1, note: '?' }];
    } else if (kind === 'fractionDe') {
      const d = pick(rng, [3, 4, 5]); const n = randInt(rng, 2, d - 1); const unit = randInt(rng, 3, 9); const total = unit * d;
      text = t('steps.fractionOf', { words: fractionWords(n, d), total });
      answer = unit * n;
      bars = [{ label: t('steps.pupils'), parts: d, shaded: n, note: `${total}` }];
    } else if (kind === 'partage') {
      const small = randInt(rng, 10, 40); const diff = 5 * randInt(rng, 2, 6); const total = 2 * small + diff;
      text = t('steps.share', { p, q, total, diff });
      answer = small;
      bars = [{ label: q, parts: 1, note: '?' }, { label: p, parts: 1, extra: `+${money(diff)}` }];
      caption = t('visual.together', { total: money(total) });
    } else {
      const h1 = randInt(rng, 8, 15); const m1 = 5 * randInt(rng, 0, 11); const dur = 5 * randInt(rng, 8, 30);
      const end = h1 * 60 + m1 + dur;
      const hm = (mins) => t('steps.clock', { h: Math.floor(mins / 60), m: String(mins % 60).padStart(2, '0') });
      text = t('steps.duration', { start: hm(h1 * 60 + m1), end: hm(end) });
      answer = dur;
      bars = null;
    }
    return {
      kind: 'clavier', instruction: t('activities.etapes.instruction'), question: null, speak: text, answer, confidence: true,
      visual: { type: 'story', text, emoji: null },
      hintVisual: bars ? { type: 'barModel', rows: bars, caption } : null,
      hint: t(bars ? 'steps.hintBars' : 'steps.hintClock'),
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
        kind: 'choix', instruction: t('activities.grandsnombres.digit', { d: target.d }),
        visual: { type: 'placeValue', text: fmtNumber(number), highlight: target.d },
        choices: shuffle(rng, values).map((v) => ({ id: String(v), label: fmtNumber(v) })), answer: String(target.d * 10 ** target.pos),
      };
    }
    const number = randInt(rng, 1_000_000, 9_999_999);
    const step = pick(rng, [1000, 10_000, 100_000]);
    const rounded = Math.round(number / step) * step;
    const other = rounded === Math.floor(number / step) * step ? rounded + step : Math.floor(number / step) * step;
    const third = Math.round(number / (step * 10)) * step * 10 === rounded ? rounded - step : Math.round(number / (step * 10)) * step * 10;
    const opts = [...new Set([rounded, other, third])];
    while (opts.length < 3) opts.push(rounded + step * (opts.length + 1));
    return {
      kind: 'choix', instruction: t('activities.grandsnombres.round', { to: t('activities.grandsnombres.to')[step] }),
      visual: { type: 'placeValue', text: fmtNumber(number) },
      choices: shuffle(rng, opts).map((v) => ({ id: String(v), label: fmtNumber(v) })), answer: String(rounded),
    };
  },
};

export const PATH_1012_ACTIVITIES = [droite, fractions, proportion, calculmalin, aires, angles, etapes, grandsnombres];
