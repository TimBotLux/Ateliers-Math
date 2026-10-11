// « Je remplis » : l'enfant met dans le panier autant de fruits que de points.
// Les fruits se rangent sous les points, un à un : le matériel montre l'écart.

import { useRef, useState } from 'react';
import { CHECK_AGAIN } from '../data/messages.js';
import { useApp } from '../state/AppContext.jsx';
import { CheckIcon, MinusIcon, PlusIcon } from '../components/Icons.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

const MAX_FRUITS = 12;

export function BasketRound({ round, onResult, onDone }) {
  const { sound, speak, cheer, path } = useApp();
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(null); // null | 'ok' | 'ko'
  const first = useRef(true);
  const advance = useAutoAdvance(onDone);
  const columns = Math.max(round.target, count, 1);

  function add() {
    if (checked === 'ok' || count >= MAX_FRUITS) return;
    sound('tap');
    setCount((c) => c + 1);
    setChecked(null);
  }

  function remove() {
    if (checked === 'ok' || count === 0) return;
    setCount((c) => c - 1);
    setChecked(null);
  }

  function check() {
    if (checked === 'ok') return;
    const ok = count === round.target;
    if (first.current) {
      first.current = false;
      onResult(ok);
    }
    setChecked(ok ? 'ok' : 'ko');
    if (ok) {
      sound('joie');
      cheer();
      advance();
    } else {
      sound('observe');
      speak(`${CHECK_AGAIN} Un fruit sous chaque point.`);
    }
  }

  return (
    <>
      <div className="stage basket">
        <div className="basket__row" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} aria-label="Les points à atteindre">
          {Array.from({ length: round.target }, (_, i) => <span key={i} className="basket__dot" />)}
        </div>
        <div className="basket__row" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} aria-label="Les fruits dans le panier">
          {Array.from({ length: count }, (_, i) => (
            <button key={i} className={`basket__fruit emoji ${i >= round.target ? 'is-extra' : ''}`} onClick={remove} aria-label="Enlever un fruit">
              {round.emoji}
            </button>
          ))}
        </div>
        <div className="basket__bowl" aria-hidden="true">🧺</div>
      </div>
      <p className={`hint ${checked === 'ok' ? 'hint--joy' : ''}`}>
        {checked === 'ok' ? 'Oui, c’est ça !' : checked === 'ko' ? CHECK_AGAIN : ' '}
      </p>
      <div className="choice-grid">
        <button className="choice" onClick={remove} aria-label="Enlever un fruit">
          <MinusIcon size={34} />
        </button>
        <button className="choice" onClick={add} aria-label="Ajouter un fruit">
          <span className="emoji" style={{ fontSize: 40 }}>{round.emoji}</span>
          <PlusIcon size={22} />
        </button>
        <button className="choice" style={{ background: path.accent, borderColor: path.accent }} onClick={check} aria-label="J'ai fini">
          <CheckIcon size={38} />
        </button>
      </div>
    </>
  );
}
