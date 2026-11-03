// « Je mesure » (7-9 ans) : l'enfant lit la longueur d'un objet posé contre une règle graduée.
// Après une réponse inattendue, les centimètres sous l'objet se colorent un sur deux :
// l'enfant les recompte (au palier 3, l'objet ne commence pas à zéro).

import { useRef, useState } from 'react';
import { checkAgain } from '../data/messages.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { Ruler } from '../components/MeasureVisuals.jsx';
import { Hint } from './ChoiceRound.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

export function RulerRound({ round, onResult, onDone }) {
  const { speak, sound, cheer } = useApp();
  const [tried, setTried] = useState([]);
  const [solved, setSolved] = useState(false);
  const first = useRef(true);
  const advance = useAutoAdvance(onDone);

  function choose(choice) {
    if (solved || tried.includes(choice.id)) return;
    const ok = choice.id === round.answer;
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
      setTried((list) => [...list, choice.id]);
      sound('observe');
      speak(`${checkAgain()} ${t('rounds.ruler.count')}`);
    }
  }

  return (
    <>
      <div className="stage stage--compact">
        <Ruler object={round.object} start={round.start} length={round.length} labels={round.labels} count={tried.length > 0 || solved} />
      </div>
      {tried.length > 0 && !solved && <p className="hint hint--tip fade-in">{t('rounds.ruler.count')}</p>}
      <div className="choice-grid">
        {round.choices.map((c) => (
          <button key={c.id} className={`choice ${solved && c.id === round.answer ? 'is-right' : tried.includes(c.id) ? 'is-tried' : ''}`} onClick={() => choose(c)} aria-label={c.label}>
            <span className="choice__number choice__number--long">{c.label}</span>
          </button>
        ))}
      </div>
      <Hint solved={solved} tried={tried.length > 0} />
    </>
  );
}
