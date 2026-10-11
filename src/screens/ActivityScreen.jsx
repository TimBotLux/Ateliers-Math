// Lecteur d'activité générique : enchaîne les manches, adapte le palier,
// fait grandir le jardin sur une réussite, puis passe à la suite (mission ou fin).

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { activityRegistry } from '../activities/index.js';
import { useApp } from '../state/AppContext.jsx';
import { BackIcon, SpeakerIcon } from '../components/Icons.jsx';
import { BalanceRound } from '../rounds/BalanceRound.jsx';
import { BasketRound } from '../rounds/BasketRound.jsx';
import { ChoiceRound } from '../rounds/ChoiceRound.jsx';
import { CompareRound } from '../rounds/CompareRound.jsx';
import { KeypadRound } from '../rounds/KeypadRound.jsx';
import { NumberLineRound } from '../rounds/NumberLineRound.jsx';

const ROUND_COMPONENTS = {
  balance: BalanceRound,
  choix: ChoiceRound,
  comparaison: CompareRound,
  clavier: KeypadRound,
  panier: BasketRound,
  droite: NumberLineRound,
};

export function ActivityScreen({ activityKey, mission, from = 'home' }) {
  const { child, adaptive, growGarden, speak, sound, maybeButterfly, go, path } = useApp();
  const def = activityRegistry.get(activityKey);
  const rng = useMemo(() => Math.random, []);
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(() => def.create(adaptive.tier(child.id, def.key, def.tiers), rng));
  const grown = useRef(new Set(mission?.grown || []));

  const instruction = round.instruction;
  const spoken = round.speak ? `${instruction} ${round.speak}` : instruction;

  // Consigne vocale automatique sur le parcours 4-6 ans (compréhensible sans lecture).
  useEffect(() => {
    if (def.path === '4-6') speak(spoken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onResult = useCallback(
    (success) => {
      adaptive.record(child.id, def.key, success, def.tiers);
      if (success) {
        growGarden(def.skills).forEach((z) => grown.current.add(z));
        maybeButterfly();
      }
    },
    [adaptive, child.id, def, growGarden, maybeButterfly],
  );

  const onDone = useCallback(() => {
    if (index + 1 < def.rounds) {
      setRound(def.create(adaptive.tier(child.id, def.key, def.tiers), rng));
      setIndex((i) => i + 1);
      return;
    }
    const zones = [...grown.current];
    if (mission && mission.index + 1 < mission.steps.length) {
      go('activity', {
        activityKey: mission.steps[mission.index + 1],
        mission: { ...mission, index: mission.index + 1, grown: zones },
        from,
      });
    } else {
      if (zones.length) sound('pousse');
      // En mode Explorer, l'atelier suivant du parcours s'enchaîne seul après l'écran « Bravo ».
      const siblings = activityRegistry.byPath(def.path);
      const next = mission ? null : siblings[(siblings.findIndex((a) => a.key === def.key) + 1) % siblings.length]?.key;
      go('fin', { grown: zones, mode: mission ? 'mission' : 'atelier', from, next });
    }
  }, [index, def, adaptive, child.id, rng, mission, go, from, sound]);

  const Round = ROUND_COMPONENTS[round.kind];

  return (
    <div className="screen screen--activity">
      <header className="activity-header">
        <button className="icon-btn" aria-label="Retour" onClick={() => go(from === 'explorer' ? 'explorer' : 'home')}>
          <BackIcon />
        </button>
        <div className="dots" role="img" aria-label="Manches de l'atelier">
          {Array.from({ length: def.rounds }, (_, i) => (
            <span
              key={i}
              className={`dots__dot ${i === index ? 'is-current' : ''}`}
              style={{ background: i <= index ? path.accent : undefined }}
            />
          ))}
        </div>
        <button className="icon-btn icon-btn--accent" style={{ background: path.accent }} aria-label="Écouter la consigne" onClick={() => speak(spoken)}>
          <SpeakerIcon />
        </button>
      </header>

      {mission && (
        <div className="mission-steps" role="img" aria-label="Étapes de la mission">
          {mission.steps.map((k, i) => (
            <span key={k} className={`mission-steps__step ${i < mission.index ? 'is-done' : i === mission.index ? 'is-current' : ''}`} />
          ))}
        </div>
      )}

      <div className="activity-title">
        <h1>{def.label}</h1>
        <p>{instruction}</p>
      </div>

      <Round key={index} round={round} onResult={onResult} onDone={onDone} />
    </div>
  );
}
