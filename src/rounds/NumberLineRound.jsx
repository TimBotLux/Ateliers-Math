// Manche « droite numérique » (10-12 ans) : l'enfant place une fraction ou un décimal
// en touchant la droite. Après validation, le vrai emplacement apparaît à côté du sien :
// c'est la droite elle-même qui montre l'écart, sans note ni chiffre de score.

import { useRef, useState } from 'react';
import { confidenceFeedback } from '../data/messages.js';
import { useApp } from '../state/AppContext.jsx';
import { NextIcon, ReplayIcon } from '../components/Icons.jsx';
import { Frac } from '../components/Visual.jsx';
import { ConfidenceButtons } from './KeypadRound.jsx';

const X0 = 24;
const X1 = 316;

export function NumberLineRound({ round, onResult, onDone }) {
  const { sound, speak, path } = useApp();
  const [placed, setPlaced] = useState(null);
  const [checked, setChecked] = useState(null); // { ok, sure }
  const first = useRef(true);
  const svgRef = useRef(null);

  const { min, max, ticks, value, tolerance, target } = round;
  const toX = (v) => X0 + ((v - min) / (max - min)) * (X1 - X0);
  const toV = (x) => min + ((x - X0) / (X1 - X0)) * (max - min);

  function place(e) {
    if (checked) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 340;
    setPlaced(Math.min(max, Math.max(min, toV(x))));
    sound('tap');
  }

  function validate(sure) {
    if (placed === null || checked) return;
    const ok = Math.abs(placed - value) <= tolerance;
    if (first.current) {
      first.current = false;
      onResult(ok);
    }
    setChecked({ ok, sure });
    sound(ok ? 'joie' : 'observe');
    speak(ok ? confidenceFeedback(true, sure) : `${confidenceFeedback(false, sure)} Regarde où se trouve vraiment le nombre.`);
  }

  function retry() {
    setPlaced(null);
    setChecked(null);
  }

  // Graduations : unités (avec leur nombre), et subdivisions éventuelles.
  const units = [];
  for (let u = min; u <= max; u++) units.push(u);
  const minor = [];
  for (let u = min; u < max; u++) for (let k = 1; k < ticks; k++) minor.push(u + k / ticks);

  return (
    <>
      <div className="stage stage--compact">
        <div className="nl-target">{target.n ? <Frac n={target.n} d={target.d} /> : target.text}</div>
      </div>
      <div className="stage stage--compact">
        <svg ref={svgRef} viewBox="0 0 340 110" width="100%" className="numberline" onPointerDown={place} role="img" aria-label={`Une droite graduée de ${min} à ${max}`}>
          <rect x="0" y="0" width="340" height="110" fill="transparent" />
          <line x1={X0} y1="60" x2={X1} y2="60" stroke="#3D2A5C" strokeWidth="3" strokeLinecap="round" />
          {minor.map((v) => (
            <line key={v} x1={toX(v)} y1="53" x2={toX(v)} y2="67" stroke="#8C7AAE" strokeWidth="1.5" />
          ))}
          {units.map((u) => (
            <g key={u}>
              <line x1={toX(u)} y1="46" x2={toX(u)} y2="74" stroke="#3D2A5C" strokeWidth="3" />
              <text x={toX(u)} y="96" textAnchor="middle" className="svg-label">{u}</text>
            </g>
          ))}
          {placed !== null && (
            <g transform={`translate(${toX(placed)} 0)`}>
              <path d="M0 52 L-8 34 H8 Z" fill={checked ? (checked.ok ? '#2E7D5B' : '#E8892F') : path.accent} />
              <circle cx="0" cy="28" r="9" fill={checked ? (checked.ok ? '#2E7D5B' : '#E8892F') : path.accent} />
            </g>
          )}
          {checked && !checked.ok && (
            <g transform={`translate(${toX(value)} 0)`} className="fade-in">
              <path d="M0 68 L-8 86 H8 Z" fill="#2E7D5B" />
            </g>
          )}
          {checked && !checked.ok && (
            <line x1={toX(placed)} y1="60" x2={toX(value)} y2="60" stroke="#E8892F" strokeWidth="6" strokeLinecap="round" opacity=".55" />
          )}
        </svg>
      </div>
      <p className={`hint ${checked?.ok ? 'hint--joy' : ''}`}>
        {checked
          ? checked.ok
            ? confidenceFeedback(true, checked.sure)
            : `${confidenceFeedback(false, checked.sure)} La flèche verte montre le bon endroit.`
          : placed === null
            ? 'Touche la droite pour placer le nombre.'
            : ' '}
      </p>
      {checked ? (
        <div className="feedback__actions">
          {!checked.ok && (
            <button className="icon-btn icon-btn--lg" onClick={retry} aria-label="Réessayer">
              <ReplayIcon />
            </button>
          )}
          <button className="primary-btn" style={{ background: path.accent }} onClick={onDone}>
            Continuer <NextIcon />
          </button>
        </div>
      ) : (
        <ConfidenceButtons disabled={placed === null} onPick={validate} accent={path.accent} />
      )}
    </>
  );
}
