// Petits utilitaires de hasard, déterministes quand on leur donne une graine.

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export const randInt = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));

export const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

export function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Trois réponses numériques proches et distinctes, dont la bonne, mélangées.
 */
export function numberChoices(rng, answer, { min = 0, max = answer + 5, count = 3 } = {}) {
  const near = [-1, 1, -2, 2, -3, 3, 10, -10]
    .map((d) => answer + d)
    .filter((v) => v >= min && v <= max && v !== answer);
  const picked = shuffle(rng, [...new Set(near)]).slice(0, count - 1);
  for (let v = min; picked.length < count - 1 && v <= max + count; v++) {
    if (v !== answer && !picked.includes(v)) picked.push(v);
  }
  return shuffle(rng, [answer, ...picked]);
}
