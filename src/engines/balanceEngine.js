// Balance Engine — moteur générique de la famille « Balance ».
// Un niveau n'est qu'une configuration (voir src/activities/balanceLevels.js).
//
// Ajouts génériques (PRD) :
//  - le fléau reste à plat tant qu'une prédiction est en attente ;
//  - dressingPool accepte une paire fixe ou plusieurs paires thématiques ;
//  - dressingOrdered : la plus grande valeur va toujours à l'objet habituellement le plus lourd ;
//  - cas d'égalité : deux objets identiques ;
//  - E1 : oscillation amortie du fléau, ≤ 1,5 s, sans jamais passer de l'autre côté.

import { pick, randInt } from './random.js';

/** Choisit une paire d'habillage : paire fixe ou tirage parmi plusieurs paires. */
export function balancePickDressingPair(pool, rng) {
  if (!Array.isArray(pool)) return pool;
  return pick(rng, pool);
}

/**
 * Construit une manche à partir d'une configuration de niveau.
 * Les valeurs restent internes : l'interface ne les affiche jamais.
 */
export function createBalanceRound(config, tier, rng) {
  const t = config.tiers[Math.min(config.tiers.length, Math.max(1, tier)) - 1];
  const [min, max] = t.range;
  const left = randInt(rng, min, max);
  const right = randInt(rng, min, max);

  if (left === right) {
    const same = pick(rng, config.equalPool);
    const side = { ...same, value: left, scale: 1 };
    return { kind: 'balance', mode: config.mode, answer: 'equal', left: side, right: { ...side } };
  }

  const pair = balancePickDressingPair(config.dressingPool, rng);
  const heavySide = left > right ? 'left' : 'right';
  const grow = t.sizeMatchesWeight ? config.sizeScale : { heavy: 1, light: 1 };

  let heavy = pair.heavy;
  let light = pair.light;
  if (!config.dressingOrdered && rng() < 0.5) [heavy, light] = [light, heavy];

  const heavyObj = { ...heavy, value: Math.max(left, right), scale: grow.heavy };
  const lightObj = { ...light, value: Math.min(left, right), scale: grow.light };

  return {
    kind: 'balance',
    mode: config.mode,
    answer: heavySide,
    pairId: pair.id,
    left: heavySide === 'left' ? heavyObj : lightObj,
    right: heavySide === 'left' ? lightObj : heavyObj,
  };
}

// ---------- Composant graphique : mouvement du fléau (E1) ----------

export const TILT_DEG = 9;
export const SWING_DURATION_MS = 1400; // cible PRD : 1,5 s au plus
export const SOFT_DURATION_MS = 500; // réglage « réduire les animations »
export const EQUAL_PAUSE_MS = 450;
const DAMPING = 3.2;
const OMEGA = 2 * Math.PI * 1.4;

export function tiltFor(answer) {
  if (answer === 'left') return -TILT_DEG;
  if (answer === 'right') return TILT_DEG;
  return 0;
}

/**
 * Angle du fléau à l'instant t (secondes) après la prédiction.
 * Oscillation amortie : θ(t) = cible · (1 − e^(−ζt)·cos ωt).
 * Comme e^(−ζt) < 1, θ garde toujours le signe de la cible :
 * le côté le plus lourd ne remonte jamais au-dessus de l'autre.
 */
export function beamAngleAt(target, t, reduceMotion = false) {
  if (target === 0) return 0;
  const durationS = (reduceMotion ? SOFT_DURATION_MS : SWING_DURATION_MS) / 1000;
  if (t >= durationS) return target;
  if (reduceMotion) {
    const p = t / durationS;
    return target * (1 - Math.pow(1 - p, 3));
  }
  return target * (1 - Math.exp(-DAMPING * t) * Math.cos(OMEGA * t));
}

export function swingDurationMs(target, reduceMotion) {
  if (target === 0) return EQUAL_PAUSE_MS;
  return reduceMotion ? SOFT_DURATION_MS : SWING_DURATION_MS;
}
