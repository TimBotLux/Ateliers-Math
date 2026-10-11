// sessionEngine — construit une séance « Ma Mission » en trois phases :
//  1. pourquoi : les zones les moins développées que ce parcours peut nourrir ;
//  2. budget   : une durée cible (minutes) ;
//  3. quoi     : les activités qui nourrissent ces zones, jusqu'à épuiser le budget.
// Si le parcours n'a aucune activité, la séance est vide : l'interface replie
// silencieusement vers Explorer (l'enfant n'est jamais bloqué).

import { ZONE_IDS } from '../data/zones.js';
import { shuffle } from './random.js';

export const DEFAULT_BUDGET = 6;
export const MAX_STEPS = 3;

/**
 * Option « recency » (date de dernière pratique par activité) : les activités pratiquées
 * il y a longtemps, ou jamais, reçoivent un bonus. C'est la récupération espacée :
 * revenir sur une notion après un délai la consolide mieux qu'une répétition immédiate.
 */
export const SPACING_BONUS = 0.8;

export function buildSession({ activities, stages = {}, rng = Math.random, budget = DEFAULT_BUDGET, recency = null }) {
  if (!activities.length) return { why: [], budget, steps: [] };

  // 1. Pourquoi
  const covered = ZONE_IDS.filter((z) => activities.some((a) => a.skills.includes(z)));
  const why = shuffle(rng, covered)
    .sort((a, b) => (stages[a] ?? 0) - (stages[b] ?? 0))
    .slice(0, 2);

  // 3. Quoi (dans la limite du budget)
  // Rang d'ancienneté : 1 pour l'activité la moins récemment pratiquée, 0 pour la plus récente.
  const spacing = (a) => {
    if (!recency) return 0;
    const times = activities.map((x) => recency[x.key] || 0).sort((p, q) => p - q);
    const rank = times.indexOf(recency[a.key] || 0);
    return times.length > 1 ? 1 - rank / (times.length - 1) : 0;
  };
  const scored = shuffle(rng, activities)
    .map((a) => ({ a, score: a.skills.filter((s) => why.includes(s)).length + rng() * 0.9 + spacing(a) * SPACING_BONUS }))
    .sort((x, y) => y.score - x.score);

  const steps = [];
  let used = 0;
  for (const { a } of scored) {
    if (steps.length >= MAX_STEPS || used >= budget) break;
    steps.push(a.key);
    used += a.duration;
  }
  return { why, budget, steps };
}
