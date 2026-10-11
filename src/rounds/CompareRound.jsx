// « Je compare » : deux collections, l'enfant touche celle qui en a le plus.
// Après coup, les objets sont alignés un à un : le matériel montre la réponse.

import { useRef, useState } from 'react';
import { CHECK_AGAIN } from '../data/messages.js';
import { useApp } from '../state/AppContext.jsx';
import { Hint } from './ChoiceRound.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

export function CompareRound({ round, onResult, onDone }) {
  const { speak, sound, cheer } = useApp();
  const [tried, setTried] = useState([]);
  const [solved, setSolved] = useState(false);
  const first = useRef(true);
  const advance = useAutoAdvance(onDone, 1800);
  const aligned = solved || tried.length > 0;

  function choose(id) {
    if (solved || tried.includes(id)) return;
    const ok = id === round.answer;
    if (first.current) {
      first.current = false;
      onResult(ok);
    }
    if (ok) {
      setSolved(true);
      sound('joie');
      cheer();
      advance();
    } else {
      setTried((t) => [...t, id]);
      sound('observe');
      speak(`${CHECK_AGAIN} On les a mis en ligne.`);
    }
  }

  return (
    <>
      <div className={`compare ${aligned ? 'compare--aligned' : ''}`}>
        {round.groups.map((g) => {
          const state = solved && g.id === round.answer ? 'is-right' : tried.includes(g.id) ? 'is-tried' : '';
          return (
            <button
              key={g.id}
              className={`compare__group ${state}`}
              onClick={() => choose(g.id)}
              aria-label={g.id === 'left' ? 'Le groupe du haut' : 'Le groupe du bas'}
            >
              {Array.from({ length: g.count }, (_, i) => (
                <span key={i} className="emoji">{g.emoji}</span>
              ))}
            </button>
          );
        })}
      </div>
      <Hint solved={solved} tried={tried.length > 0} />
    </>
  );
}
