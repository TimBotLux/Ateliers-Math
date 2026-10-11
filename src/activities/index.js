// Les 13 activités, enregistrées dans activityRegistry.
// Chaque générateur produit une manche à partir d'un palier de difficulté (1 à 3).

import { createRegistry } from '../engines/activityRegistry.js';
import { createBalanceRound } from '../engines/balanceEngine.js';
import { numberChoices, pick, randInt, shuffle } from '../engines/random.js';
import { POIDS1 } from './balanceLevels.js';
import { PATH_1012_ACTIVITIES } from './path1012.js';

const OBJECTS = ['🍎', '⭐', '🐟', '🌸', '🚗', '🎈', '🐞', '🍓', '🦋', '🐥'];
const FRUITS = ['🍎', '🍐', '🍊', '🍓', '🍋', '🍑'];

const asChoices = (values) => values.map((v) => ({ id: String(v), label: String(v) }));

// ---------- Parcours 4-6 ans ----------

const subitizing = {
  key: 'subitizing', label: 'Je reconnais', path: '4-6', order: 10,
  skills: ['attention', 'numeration', 'vitesse'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    const max = [3, 5, 6][tier - 1];
    const n = randInt(rng, 1, max);
    return {
      kind: 'choix',
      instruction: 'Combien de points vois-tu ?',
      visual: { type: 'dice', count: n, scatter: tier >= 2, flash: tier === 3 ? 1600 : 0, seed: randInt(rng, 1, 1e6) },
      choices: asChoices(numberChoices(rng, n, { min: 1, max: Math.max(max, 3) })),
      answer: String(n),
    };
  },
};

const compte = {
  key: 'compte', label: 'Je compte', path: '4-6', order: 20,
  skills: ['numeration', 'attention'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    const [min, max] = [[1, 5], [3, 10], [5, 15]][tier - 1];
    const n = randInt(rng, min, max);
    const emoji = pick(rng, OBJECTS);
    return {
      kind: 'choix',
      instruction: 'Combien y en a-t-il ?',
      visual: { type: 'objects', emoji, count: n },
      choices: asChoices(numberChoices(rng, n, { min: 1, max: max + 2 })),
      answer: String(n),
    };
  },
};

const compare = {
  key: 'compare', label: 'Je compare', path: '4-6', order: 30,
  skills: ['numeration', 'logique'], duration: 2, interaction: 'comparaison',
  create(tier, rng) {
    const [max, gap] = [[6, 3], [8, 2], [10, 1]][tier - 1];
    let a;
    let b;
    do {
      a = randInt(rng, 1, max);
      b = randInt(rng, 1, max);
    } while (Math.abs(a - b) < gap);
    const emoji = pick(rng, OBJECTS);
    return {
      kind: 'comparaison',
      instruction: 'Où y en a-t-il le plus ?',
      groups: [
        { id: 'left', emoji, count: a },
        { id: 'right', emoji, count: b },
      ],
      answer: a > b ? 'left' : 'right',
    };
  },
};

const SHAPES = ['rond', 'carre', 'triangle', 'rectangle', 'ovale', 'losange', 'etoile', 'hexagone'];
const CONFUSERS = {
  rond: ['ovale', 'hexagone'], carre: ['rectangle', 'losange'], triangle: ['losange', 'etoile'],
  rectangle: ['carre', 'ovale'], ovale: ['rond', 'rectangle'], losange: ['carre', 'triangle'],
  etoile: ['hexagone', 'triangle'], hexagone: ['rond', 'etoile'],
};
const SHAPE_COLORS = ['#E8892F', '#2F6FB0', '#D9617A', '#2E7D5B', '#B07CC6'];

const formes = {
  key: 'formes', label: 'Je forme', path: '4-6', order: 40,
  skills: ['geometrie', 'espace'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    let target;
    let others;
    if (tier === 1) {
      const base = ['rond', 'carre', 'triangle'];
      target = pick(rng, base);
      others = base.filter((s) => s !== target);
    } else if (tier === 2) {
      target = pick(rng, SHAPES);
      others = shuffle(rng, SHAPES.filter((s) => s !== target && !CONFUSERS[target].includes(s))).slice(0, 2);
    } else {
      target = pick(rng, SHAPES);
      others = CONFUSERS[target];
    }
    const color = pick(rng, SHAPE_COLORS);
    const turn = tier === 1 ? 0 : pick(rng, [15, 25, -20]);
    const choiceColor = tier === 1 ? color : pick(rng, SHAPE_COLORS.filter((c) => c !== color));
    const choices = shuffle(rng, [target, ...others]).map((shape) => ({
      id: shape,
      visual: { type: 'shape', shape, color: choiceColor, rotate: shape === target ? turn : 0 },
    }));
    return {
      kind: 'choix',
      instruction: 'Trouve la même forme.',
      visual: { type: 'shape', shape: target, color, rotate: 0, big: true },
      choices,
      answer: target,
    };
  },
};

const calculsimple = {
  key: 'calculsimple', label: 'Je calcule', path: '4-6', order: 50,
  skills: ['calcul', 'numeration'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    const maxSum = [5, 8, 10][tier - 1];
    const a = randInt(rng, 1, maxSum - 1);
    const b = randInt(rng, 1, maxSum - a);
    const emoji = pick(rng, FRUITS);
    return {
      kind: 'choix',
      instruction: 'Combien en tout ?',
      visual: { type: 'sum', emoji, a, b },
      choices: asChoices(numberChoices(rng, a + b, { min: 1, max: maxSum + 2 })),
      answer: String(a + b),
    };
  },
};

const panier = {
  key: 'panier', label: 'Je remplis', path: '4-6', order: 60,
  skills: ['problemes', 'numeration', 'motricite'], duration: 2, interaction: 'manipulation',
  create(tier, rng) {
    const [min, max] = [[1, 5], [2, 8], [3, 10]][tier - 1];
    return {
      kind: 'panier',
      instruction: 'Mets autant de fruits que de points.',
      target: randInt(rng, min, max),
      emoji: pick(rng, FRUITS),
    };
  },
};

const PATTERN_ITEMS = [
  { id: 'rond-rose', shape: 'rond', color: '#D9617A' },
  { id: 'carre-bleu', shape: 'carre', color: '#2F6FB0' },
  { id: 'triangle-jaune', shape: 'triangle', color: '#F2B84B' },
  { id: 'rond-vert', shape: 'rond', color: '#2E7D5B' },
  { id: 'etoile-violet', shape: 'etoile', color: '#B07CC6' },
];
const PATTERN_UNITS = [['AB'], ['AAB', 'ABC', 'ABB'], ['AABB', 'ABCC', 'ABAC']];

const suite = {
  key: 'suite', label: 'Je complète', path: '4-6', order: 70,
  skills: ['logique', 'memoire', 'espace'], duration: 2, interaction: 'choix',
  create(tier, rng) {
    const unit = pick(rng, PATTERN_UNITS[tier - 1]);
    const letters = [...new Set(unit)];
    const items = shuffle(rng, PATTERN_ITEMS).slice(0, letters.length);
    const map = Object.fromEntries(letters.map((l, i) => [l, items[i]]));
    const length = unit.length * 2 + randInt(rng, 1, unit.length);
    const seq = Array.from({ length }, (_, i) => map[unit[i % unit.length]]);
    const answer = seq[length - 1];
    const distractors = shuffle(rng, PATTERN_ITEMS.filter((p) => p.id !== answer.id)).slice(0, 2);
    return {
      kind: 'choix',
      instruction: 'Qu’est-ce qui vient ensuite ?',
      visual: { type: 'pattern', items: [...seq.slice(0, -1), null] },
      choices: shuffle(rng, [answer, ...distractors]).map((p) => ({
        id: p.id,
        visual: { type: 'shape', shape: p.shape, color: p.color, rotate: 0 },
      })),
      answer: answer.id,
    };
  },
};

const poids1 = {
  key: 'poids1', label: 'Je pèse', path: '4-6', order: 80,
  skills: ['logique'], duration: 2, interaction: 'prediction', isNew: true,
  create(tier, rng) {
    return { ...createBalanceRound(POIDS1, tier, rng), instruction: 'Quel côté va descendre ?' };
  },
};

// ---------- Parcours 7-9 ans ----------

const keypad = (instruction, question, speak, answer, visual = null) => ({
  kind: 'clavier', instruction, question, speak, answer, visual,
});

const addition = {
  key: 'addition', label: 'J’additionne', subtitle: 'Je réunis des quantités', path: '7-9', order: 10,
  skills: ['calcul', 'numeration'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const max = [20, 50, 100][tier - 1];
    const a = randInt(rng, 2, max - 2);
    const b = randInt(rng, 1, max - a);
    return keypad('Réunis les deux quantités.', `${a} + ${b}`, `${a} plus ${b}`, a + b, { type: 'blocks', terms: [a, b] });
  },
};

const soustraction = {
  key: 'soustraction', label: 'Je soustrais', subtitle: 'J’enlève et je regarde ce qui reste', path: '7-9', order: 20,
  skills: ['calcul', 'attention'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const [min, max] = [[5, 20], [15, 50], [30, 100]][tier - 1];
    const a = randInt(rng, min, max);
    const b = randInt(rng, 1, a - 1);
    return keypad('J’enlève et je regarde ce qui reste.', `${a} − ${b}`, `${a} moins ${b}`, a - b, { type: 'blocks', terms: [a], remove: b });
  },
};

const multiplication = {
  key: 'multiplication', label: 'Je groupe', subtitle: 'Des paquets égaux pour multiplier', path: '7-9', order: 30,
  skills: ['calcul', 'geometrie', 'espace'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const [maxK, maxN] = [[3, 4], [5, 5], [6, 9]][tier - 1];
    const k = randInt(rng, 2, maxK);
    const n = randInt(rng, 2, maxN);
    return keypad('Combien en tout dans les paquets ?', `${k} × ${n}`, `${k} paquets de ${n}`, k * n, { type: 'groups', groups: k, size: n });
  },
};

const NAMES = ['Léa', 'Nour', 'Tom', 'Inès', 'Hugo', 'Maya', 'Sami', 'Jade'];
const THINGS = [['billes', '🔵'], ['cartes', '🃏'], ['pommes', '🍎'], ['autocollants', '⭐'], ['coquillages', '🐚']];

const problemes = {
  key: 'problemes', label: 'Je résous', subtitle: 'Des petites histoires à démêler', path: '7-9', order: 40,
  skills: ['problemes', 'logique', 'calcul'], duration: 3, interaction: 'clavier',
  create(tier, rng) {
    const p = pick(rng, NAMES);
    const [what, emoji] = pick(rng, THINGS);
    let text;
    let answer;
    if (tier === 1) {
      const a = randInt(rng, 3, 12);
      const b = randInt(rng, 1, 8);
      if (rng() < 0.5) {
        text = `${p} a ${a} ${what}. On lui en donne ${b}. Combien en a ${p} maintenant ?`;
        answer = a + b;
      } else {
        const c = randInt(rng, 1, a - 1);
        text = `${p} a ${a} ${what}. ${p} en donne ${c} à un ami. Combien lui en reste-t-il ?`;
        answer = a - c;
      }
    } else if (tier === 2) {
      const k = randInt(rng, 2, 5);
      const n = randInt(rng, 2, 6);
      text = `${p} range ses ${what} dans ${k} boîtes, avec ${n} ${what} dans chaque boîte. Combien de ${what} en tout ?`;
      answer = k * n;
    } else {
      const a = randInt(rng, 10, 30);
      const b = randInt(rng, 2, 15);
      const c = randInt(rng, 1, a + b - 1);
      text = `${p} a ${a} ${what}. ${p} en gagne ${b}, puis en perd ${c}. Combien en a ${p} maintenant ?`;
      answer = a + b - c;
    }
    return keypad('Lis l’histoire, puis réponds.', null, text, answer, { type: 'story', text, emoji });
  },
};

const calculmental = {
  key: 'calculmental', label: 'Calcul mental', subtitle: 'Je calcule dans ma tête', path: '7-9', order: 50,
  skills: ['calcul', 'memoire', 'vitesse'], duration: 3, interaction: 'clavier', rounds: 6,
  create(tier, rng) {
    const op = tier === 3 ? pick(rng, ['+', '-', '×']) : pick(rng, ['+', '-']);
    if (op === '×') {
      const a = randInt(rng, 2, 5);
      const b = randInt(rng, 2, 10);
      return keypad('Calcule dans ta tête.', `${a} × ${b}`, `${a} fois ${b}`, a * b);
    }
    const max = tier === 1 ? 20 : 100;
    const a = randInt(rng, 5, max);
    const b = tier === 2 && rng() < 0.5 ? randInt(rng, 1, 9) * 10 : randInt(rng, 1, Math.min(a - 1, 20));
    return op === '+'
      ? keypad('Calcule dans ta tête.', `${a} + ${b}`, `${a} plus ${b}`, a + b)
      : keypad('Calcule dans ta tête.', `${a} − ${Math.min(a - 1, b)}`, `${a} moins ${Math.min(a - 1, b)}`, a - Math.min(a - 1, b));
  },
};

export const ALL_ACTIVITIES = [
  subitizing, compte, compare, formes, calculsimple, panier, suite, poids1,
  addition, soustraction, multiplication, problemes, calculmental,
  ...PATH_1012_ACTIVITIES,
];

export function buildRegistry() {
  const registry = createRegistry();
  ALL_ACTIVITIES.forEach((a) => registry.register(a));
  return registry;
}

export const activityRegistry = buildRegistry();
