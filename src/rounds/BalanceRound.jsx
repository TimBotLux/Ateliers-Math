// Manche de la famille Balance, mode prédiction (niveau 1 « Je pèse »).
// Le fléau reste à plat jusqu'à la prédiction, puis oscille (E1) et se stabilise ;
// le message et les boutons n'apparaissent qu'une fois le fléau stabilisé.

import { useEffect, useRef, useState } from 'react';
import { beamAngleAt, swingDurationMs, tiltFor } from '../engines/balanceEngine.js';
import { CHECK_AGAIN } from '../data/messages.js';
import { useApp } from '../state/AppContext.jsx';
import { MagnifierIcon, NextIcon, ReplayIcon } from '../components/Icons.jsx';

const ARM = 130; // distance pivot → plateau, en unités SVG
const AUTO_NEXT_MS = 5000; // le message vocal dure environ 3 s

function PanObjects({ obj, cx }) {
  const count = obj.count || 1;
  const size = Math.round((count > 1 ? 34 : 54) * obj.scale);
  const spacing = size * 0.8;
  const startX = cx - ((count - 1) * spacing) / 2;
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <text key={i} x={startX + i * spacing} y="218" fontSize={size} textAnchor="middle" className="emoji">
          {obj.emoji}
        </text>
      ))}
    </>
  );
}

function Scale({ round, angle }) {
  const rad = (angle * Math.PI) / 180;
  const leftDy = -ARM * Math.sin(rad);
  const rightDy = ARM * Math.sin(rad);
  const label = `Une balance : ${round.left.name} à gauche, ${round.right.name} à droite`;
  return (
    <svg width="100%" viewBox="0 0 350 300" role="img" aria-label={label} style={{ maxWidth: 350 }}>
      <rect x="135" y="268" width="80" height="14" rx="7" fill="#C9B79C" />
      <rect x="168" y="120" width="14" height="152" rx="7" fill="#C9B79C" />
      <g transform={`rotate(${angle} 175 120)`}>
        <rect x="35" y="114" width="280" height="12" rx="6" fill="#8A6F4D" />
      </g>
      <circle cx="175" cy="120" r="10" fill="#E8892F" />
      <g transform={`translate(0 ${leftDy})`}>
        <path d="M45 120L5 222M45 120L85 222" stroke="#8A6F4D" strokeWidth="2" />
        <PanObjects obj={round.left} cx={45} />
        <ellipse cx="45" cy="224" rx="44" ry="8" fill="#8A6F4D" />
      </g>
      <g transform={`translate(0 ${rightDy})`}>
        <path d="M305 120L265 222M305 120L345 222" stroke="#8A6F4D" strokeWidth="2" />
        <PanObjects obj={round.right} cx={305} />
        <ellipse cx="305" cy="224" rx="44" ry="8" fill="#8A6F4D" />
      </g>
    </svg>
  );
}

const CHOICES = [
  {
    id: 'left', label: 'Le côté gauche descend',
    icon: <><path d="M8 30L56 14" /><path d="M8 30v8M2 38h12" /><path d="M56 14v8M50 22h12" /><path d="M14 8l-6 8M8 16l-1-7M8 16l7-1" stroke="#2E7D5B" /></>,
  },
  {
    id: 'equal', label: 'Les deux côtés sont égaux',
    icon: <><path d="M6 22h52" /><path d="M8 22v8M2 30h12" /><path d="M56 22v8M50 30h12" /><path d="M24 8h16M24 14h16" stroke="#2E7D5B" /></>,
  },
  {
    id: 'right', label: 'Le côté droit descend',
    icon: <><path d="M8 14L56 30" /><path d="M8 14v8M2 22h12" /><path d="M56 30v8M50 38h12" /><path d="M50 8l6 8M56 16l1-7M56 16l-7-1" stroke="#2E7D5B" /></>,
  },
];

export function BalanceRound({ round, onResult, onDone }) {
  const { reduceMotion, speak, sound, path } = useApp();
  const [pick, setPick] = useState(null);
  const [angle, setAngle] = useState(0);
  const [settled, setSettled] = useState(false);
  const locked = useRef(false);
  const firstAttempt = useRef(true);

  const target = tiltFor(round.answer);
  const correct = pick === round.answer;

  useEffect(() => {
    if (!pick) return undefined;
    const duration = swingDurationMs(target, reduceMotion);
    let raf;
    let start;
    const frame = (now) => {
      start ??= now;
      const elapsed = now - start;
      if (elapsed >= duration) {
        setAngle(target);
        setSettled(true);
        return;
      }
      setAngle(beamAngleAt(target, elapsed / 1000, reduceMotion));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [pick, target, reduceMotion]);

  const headline = correct ? 'Tu avais deviné juste !' : CHECK_AGAIN;
  const observe =
    round.answer === 'equal'
      ? 'La balance reste droite : les deux pèsent pareil.'
      : 'Le côté le plus lourd descend.';

  useEffect(() => {
    if (!settled) return;
    sound(correct ? 'joie' : 'observe');
    speak(/[.!?]$/.test(headline) ? `${headline} ${observe}` : `${headline}. ${observe}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settled]);

  // Passage automatique à la manche suivante, après le temps d'observer et d'écouter.
  // « Rejouer » annule ce passage ; « Continuer » permet d'aller plus vite.
  useEffect(() => {
    if (!settled) return undefined;
    const t = setTimeout(onDone, AUTO_NEXT_MS);
    return () => clearTimeout(t);
  }, [settled, onDone]);

  function choose(id) {
    if (locked.current) return; // double clic ignoré
    locked.current = true;
    sound('tap');
    setPick(id);
    if (firstAttempt.current) {
      firstAttempt.current = false;
      onResult(id === round.answer);
    }
  }

  function replay() {
    setPick(null);
    setSettled(false);
    setAngle(0);
    locked.current = false;
  }

  return (
    <>
      <div className="stage stage--balance">
        <Scale round={round} angle={angle} />
      </div>

      {!pick && (
        <div className="choice-grid">
          {CHOICES.map((c) => (
            <button key={c.id} className="choice choice--tall" aria-label={c.label} onClick={() => choose(c.id)}>
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none" stroke="#1E2B2F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {c.icon}
              </svg>
            </button>
          ))}
        </div>
      )}

      {pick && settled && (
        <div className="feedback fade-in">
          <div className="feedback__row">
            <div className="feedback__icon"><MagnifierIcon /></div>
            <div className="feedback__text">
              <span className="feedback__headline">{headline}</span>
              <span className="feedback__sub">{observe}</span>
            </div>
          </div>
          <div className="feedback__actions">
            <button className="icon-btn icon-btn--lg" onClick={replay} aria-label="Rejouer cette manche">
              <ReplayIcon />
            </button>
            <button
              className="primary-btn primary-btn--countdown"
              style={{ background: path.accent, '--countdown': `${AUTO_NEXT_MS}ms` }}
              onClick={onDone}
            >
              Continuer <NextIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
