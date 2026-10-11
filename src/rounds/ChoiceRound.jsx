// Manche à choix : le matériel est montré, l'enfant choisit parmi trois réponses.
// Une réponse inattendue déclenche un message de curiosité, jamais « faux ».

import { useEffect, useRef, useState } from 'react';
import { CHECK_AGAIN } from '../data/messages.js';
import { useApp } from '../state/AppContext.jsx';
import { EyeIcon } from '../components/Icons.jsx';
import { MathText, Visual } from '../components/Visual.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

export function ChoiceRound({ round, onResult, onDone }) {
  const { speak, sound, cheer } = useApp();
  const [tried, setTried] = useState([]);
  const [solved, setSolved] = useState(false);
  const [hidden, setHidden] = useState(false);
  const first = useRef(true);
  const advance = useAutoAdvance(onDone);
  const flash = round.visual?.flash || 0;

  // Palier avancé de « Je reconnais » : les points disparaissent, on peut les revoir.
  useEffect(() => {
    if (!flash || hidden) return undefined;
    const t = setTimeout(() => setHidden(true), flash);
    return () => clearTimeout(t);
  }, [flash, hidden]);

  function choose(choice) {
    if (solved || tried.includes(choice.id)) return;
    const ok = choice.id === round.answer;
    if (first.current) {
      first.current = false;
      onResult(ok);
    }
    if (ok) {
      setSolved(true);
      setHidden(false);
      sound('joie');
      cheer();
      advance();
    } else {
      setTried((t) => [...t, choice.id]);
      sound('observe');
      speak(choice.label && !/^\d+\/\d+$/.test(choice.label) ? `${choice.label}. ${CHECK_AGAIN}` : CHECK_AGAIN);
    }
  }

  return (
    <>
      <div className="stage">
        {hidden ? (
          <button className="reveal-btn" onClick={() => setHidden(false)} aria-label="Revoir les points">
            <EyeIcon />
          </button>
        ) : round.revealVisual && !solved && tried.length === 0 ? (
          // Le matériel n'apparaît qu'après la réponse : l'enfant raisonne d'abord, puis vérifie.
          <span className="stage__question">?</span>
        ) : (
          <Visual v={round.visual} />
        )}
      </div>
      <div className={`choice-grid ${round.choices.some((c) => (c.label || '').length > 7) ? 'choice-grid--stack' : ''}`}>
        {round.choices.map((c) => {
          const state = solved && c.id === round.answer ? 'is-right' : tried.includes(c.id) ? 'is-tried' : '';
          const long = c.label && c.label.length > 4 && !/^\d+\/\d+$/.test(c.label);
          return (
            <button key={c.id} className={`choice ${state}`} onClick={() => choose(c)} aria-label={c.label || c.id}>
              {c.visual ? <Visual v={c.visual} /> : <span className={`choice__number ${long ? 'choice__number--long' : ''}`}><MathText text={c.label} /></span>}
            </button>
          );
        })}
      </div>
      <Hint solved={solved} tried={tried.length > 0} />
    </>
  );
}

export function Hint({ solved, tried }) {
  if (solved) return <p className="hint hint--joy fade-in">Oui, c’est ça !</p>;
  if (tried) return <p className="hint fade-in">{CHECK_AGAIN}</p>;
  return <p className="hint" aria-hidden="true">&nbsp;</p>;
}
