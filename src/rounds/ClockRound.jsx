// « Je lis l'heure », palier 3 : l'enfant règle l'horloge en faisant tourner la grande aiguille
// (la petite suit), ou avec les boutons. Après vérification, l'heure qu'il a réglée s'affiche à côté
// de l'heure demandée : c'est l'horloge qui montre l'écart. Après 3 essais, les bonnes aiguilles
// apparaissent en pointillés : l'enfant n'est jamais bloqué.

import { useRef, useState } from 'react';
import { checkAgain, rightAnswer } from '../data/messages.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { CheckIcon, MinusIcon, NextIcon, PlusIcon } from '../components/Icons.jsx';
import { ClockFace } from '../components/MeasureVisuals.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

const MAX_TRIES = 3;
const DAY = 12 * 60;

export function ClockRound({ round, onResult, onDone }) {
  const { sound, speak, cheer, path } = useApp();
  const [minutes, setMinutes] = useState(0); // minutes depuis 12 h 00 sur le cadran
  const [tries, setTries] = useState(0);
  const [checked, setChecked] = useState(null); // null | 'ok' | 'ko'
  const first = useRef(true);
  const drag = useRef(false);
  const svgRef = useRef(null);
  const advance = useAutoAdvance(onDone);
  const revealed = checked !== 'ok' && tries >= MAX_TRIES;
  const locked = checked === 'ok' || revealed;

  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  function move(delta) {
    if (locked) return;
    setMinutes((v) => (((v + delta) % DAY) + DAY) % DAY);
    setChecked(null);
  }

  // La grande aiguille suit le doigt, de 5 en 5 minutes ; passer le 12 change l'heure.
  function dragTo(e) {
    if (!drag.current || locked) return;
    const rect = svgRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    const next = (Math.round(((angle + 360) % 360) / 30) * 5) % 60;
    if (next === m) return;
    let diff = next - m;
    if (diff < -30) diff += 60;
    if (diff > 30) diff -= 60;
    move(diff);
  }

  function validate() {
    if (locked) return;
    const ok = h === round.target.h % 12 && m === round.target.m;
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
      setTries((n) => n + 1);
      sound('observe');
      speak(`${checkAgain()} ${t('rounds.clock.observe')}`);
    }
  }

  // L'heure réglée, écrite comme l'heure demandée (même moitié de journée).
  const shownHour = (h === 0 ? 12 : h) + (round.target.h > 12 && h !== 0 ? 12 : 0);
  const yours = t('measures.clockTime', { h: shownHour, m });

  return (
    <>
      <div className="clock-target">
        <span className="clock-target__label">{t('rounds.clock.asked')}</span>
        <strong>{round.text}</strong>
        {checked === 'ko' && (
          <span className="clock-target__yours fade-in">{t('rounds.clock.yours')} : {yours}</span>
        )}
      </div>
      <div className="stage stage--compact">
        <ClockFace h={h} m={m} size={210} svgRef={svgRef} ghost={revealed ? round.target : null}
          onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); dragTo(e); }}
          onPointerMove={dragTo} onPointerUp={() => { drag.current = false; }} />
      </div>
      <p className={`hint ${checked === 'ok' ? 'hint--joy' : ''}`}>
        {checked === 'ok' ? rightAnswer() : revealed ? t('rounds.clock.shown') : checked === 'ko' ? checkAgain() : t('rounds.clock.drag')}
      </p>
      {revealed ? (
        <button className="primary-btn" style={{ background: path.accent }} onClick={onDone}>
          {t('common.continue')} <NextIcon />
        </button>
      ) : (
        <div className="clock-controls">
          <button className="choice" onClick={() => move(-60)} aria-label={t('rounds.clock.hourMinus')}><MinusIcon size={22} /><span className="clock-controls__unit">{t('rounds.clock.hourUnit')}</span></button>
          <button className="choice" onClick={() => move(60)} aria-label={t('rounds.clock.hourPlus')}><PlusIcon size={22} /><span className="clock-controls__unit">{t('rounds.clock.hourUnit')}</span></button>
          <button className="choice" onClick={() => move(-5)} aria-label={t('rounds.clock.minMinus')}><MinusIcon size={22} /><span className="clock-controls__unit">{t('rounds.clock.minUnit')}</span></button>
          <button className="choice" onClick={() => move(5)} aria-label={t('rounds.clock.minPlus')}><PlusIcon size={22} /><span className="clock-controls__unit">{t('rounds.clock.minUnit')}</span></button>
          <button className="choice clock-controls__ok" style={{ background: path.accent, borderColor: path.accent }} onClick={validate} aria-label={t('common.validate')}>
            <CheckIcon size={34} />
          </button>
        </div>
      )}
    </>
  );
}
