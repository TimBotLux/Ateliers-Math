// Manche à clavier (parcours 7-9 et 10-12 ans) : l'enfant tape sa réponse.
// Après trois essais, le matériel donne la réponse : l'enfant n'est jamais bloqué.
// Options 10-12 ans (additives) :
//  - confidence : deux boutons de validation, « Je suis sûr » et « Je pense » (métacognition) ;
//  - hint / hintVisual : une astuce et un schéma n'apparaissent qu'après une première erreur.

import { useRef, useState } from 'react';
import { CHECK_AGAIN, confidenceFeedback } from '../data/messages.js';
import { useApp } from '../state/AppContext.jsx';
import { CheckIcon, EraseIcon, NextIcon } from '../components/Icons.jsx';
import { Visual } from '../components/Visual.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

const MAX_TRIES = 3;

export function KeypadRound({ round, onResult, onDone }) {
  const { sound, cheer, speak, path } = useApp();
  const [value, setValue] = useState('');
  const [tries, setTries] = useState(0);
  const [solved, setSolved] = useState(false);
  const [sure, setSure] = useState(null);
  const first = useRef(true);
  const advance = useAutoAdvance(onDone);
  const revealed = !solved && tries >= MAX_TRIES;
  const maxLength = Math.max(3, String(round.answer).length + 1);

  function type(d) {
    if (solved || revealed) return;
    setValue((v) => (v.length >= maxLength ? v : v === '0' ? d : v + d));
  }

  function submit(isSure = null) {
    if (!value || solved || revealed) return;
    const ok = Number(value) === round.answer;
    // L'assurance ne compte qu'au premier essai : c'est là que se joue l'effet d'hypercorrection.
    const firstAttempt = first.current;
    if (firstAttempt) {
      first.current = false;
      setSure(isSure);
      onResult(ok);
    }
    const useConfidence = round.confidence && firstAttempt;
    if (ok) {
      setSolved(true);
      sound('joie');
      if (useConfidence) speak(confidenceFeedback(true, isSure));
      else cheer();
      advance();
    } else {
      setTries((t) => t + 1);
      setValue('');
      sound('observe');
      const msg = useConfidence ? confidenceFeedback(false, isSure) : CHECK_AGAIN;
      speak(round.hint ? `${msg} ${round.hint}` : msg);
    }
  }

  let hint = ' ';
  if (solved) hint = round.confidence && tries === 0 ? confidenceFeedback(true, sure) : 'Oui, c’est ça !';
  else if (revealed) hint = `Regarde : la réponse est ${round.answer}.`;
  else if (tries > 0) hint = round.confidence && tries === 1 ? confidenceFeedback(false, sure) : CHECK_AGAIN;

  const showHelp = tries > 0 && !solved;

  return (
    <>
      {round.visual && (
        <div className="stage stage--compact">
          {/* hintReplaces : le schéma d'aide prend la place du matériel (même figure, mise en évidence). */}
          <Visual v={showHelp && round.hintReplaces ? round.hintVisual : round.visual} />
        </div>
      )}
      {showHelp && round.hintVisual && !round.hintReplaces && (
        <div className="stage stage--compact stage--hint fade-in">
          <Visual v={round.hintVisual} />
        </div>
      )}
      <div className={`equation ${solved ? 'is-right' : ''}`}>
        {round.question && <span>{round.question} =</span>}
        <span className="equation__answer" aria-live="polite">{solved || revealed ? round.answer : value || '?'}</span>
      </div>
      <p className={`hint ${solved ? 'hint--joy' : ''}`}>{hint}</p>
      {showHelp && round.hint && !revealed && <p className="hint hint--tip fade-in">{round.hint}</p>}
      {revealed ? (
        <button className="primary-btn" style={{ background: path.accent }} onClick={onDone}>
          Continuer <NextIcon />
        </button>
      ) : (
        <>
          <div className="keypad">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
              <button key={d} className="keypad__key" onClick={() => type(d)}>{d}</button>
            ))}
            <button className="keypad__key" aria-label="Effacer" onClick={() => setValue((v) => v.slice(0, -1))}><EraseIcon /></button>
            <button className="keypad__key" onClick={() => type('0')}>0</button>
            {round.confidence ? (
              <span aria-hidden="true" />
            ) : (
              <button className="keypad__key keypad__key--ok" style={{ background: path.accent }} aria-label="Valider" onClick={() => submit()}>
                <CheckIcon />
              </button>
            )}
          </div>
          {round.confidence && <ConfidenceButtons disabled={!value || solved} onPick={submit} accent={path.accent} />}
        </>
      )}
    </>
  );
}

/** Valider en disant si l'on est sûr de soi : l'enfant apprend à évaluer sa propre réponse. */
export function ConfidenceButtons({ disabled, onPick, accent }) {
  return (
    <div className="confidence">
      <button className="confidence__btn" disabled={disabled} onClick={() => onPick(false)}>
        Je pense
      </button>
      <button className="confidence__btn confidence__btn--sure" style={{ background: accent }} disabled={disabled} onClick={() => onPick(true)}>
        <CheckIcon size={22} /> Je suis sûr
      </button>
    </div>
  );
}
