// « Je range » (4-6 ans) : l'enfant touche les bandes de la plus courte à la plus longue ;
// chacune glisse contre la ligne de départ, sur la marche suivante de l'escalier.
// Un rangement faux se voit en escalier cassé ; toucher une bande rangée la reprend.

import { useRef, useState } from 'react';
import { checkAgain, rightAnswer } from '../data/messages.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

const U = 26; // pixels par carreau de longueur
const X0 = 24; // ligne de départ
const ROW = 34;
const STAIR_Y = 16;
const TRAY_Y = 150;

export function StripsRound({ round, onResult, onDone }) {
  const { sound, speak, cheer } = useApp();
  const [order, setOrder] = useState([]); // identifiants des bandes rangées, de haut en bas
  const [status, setStatus] = useState(null); // null | 'ok' | 'ko'
  const first = useRef(true);
  const advance = useAutoAdvance(onDone);

  function check(next) {
    if (next.length < round.bands.length) return;
    const lengths = next.map((id) => round.bands.find((b) => b.id === id).len);
    const ok = lengths.every((l, i) => i === 0 || l > lengths[i - 1]);
    if (first.current) {
      first.current = false;
      onResult(ok);
    }
    setStatus(ok ? 'ok' : 'ko');
    if (ok) {
      sound('joie');
      cheer();
      advance();
    } else {
      sound('observe');
      speak(`${checkAgain()} ${t('rounds.bands.observe')}`);
    }
  }

  function tap(id) {
    if (status === 'ok') return;
    sound('tap');
    const next = order.includes(id) ? order.filter((x) => x !== id) : [...order, id];
    setOrder(next);
    setStatus(null);
    check(next);
  }

  const trayIndex = round.bands.map((b) => b.id);
  return (
    <>
      <div className="stage stage--compact">
        <svg viewBox="0 0 320 256" width="100%" className="strips" role="img" aria-label={t('rounds.bands.tray')}>
          {/* Les marches de l'escalier, contre la ligne de départ. */}
          {round.bands.map((_, i) => (
            <rect key={i} x={X0} y={STAIR_Y + i * ROW} width={10 * U} height={ROW - 8} rx="6" fill="#F3F7F5" />
          ))}
          <line x1={X0} y1="6" x2={X0} y2={STAIR_Y + 3 * ROW} stroke="#1E2B2F" strokeWidth="4" strokeLinecap="round" />
          <line x1="8" y1={TRAY_Y - 18} x2="312" y2={TRAY_Y - 18} stroke="#E3ECE8" strokeWidth="2" strokeDasharray="6 6" />
          {round.bands.map((b) => {
            const rank = order.indexOf(b.id);
            const x = rank >= 0 ? X0 : X0 + b.offset * U;
            const y = rank >= 0 ? STAIR_Y + rank * ROW : TRAY_Y + trayIndex.indexOf(b.id) * ROW;
            const extra = status === 'ko' && rank > 0 && b.len <= round.bands.find((o) => o.id === order[rank - 1]).len;
            return (
              <g key={b.id} className="strips__band" style={{ transform: `translate(${x}px, ${y}px)` }} onClick={() => tap(b.id)}
                role="button" aria-label={rank >= 0 ? t('rounds.bands.remove') : t('rounds.bands.tap')}>
                <rect x="0" y="0" width={b.len * U} height={ROW - 8} rx="6" fill={b.color} stroke={extra ? '#1E2B2F' : 'none'} strokeWidth="3" strokeDasharray="6 4" />
                {Array.from({ length: b.len - 1 }, (_, k) => (
                  <line key={k} x1={(k + 1) * U} y1="4" x2={(k + 1) * U} y2={ROW - 12} stroke="#FFFFFF" strokeWidth="1.5" opacity="0.45" />
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <p className={`hint ${status === 'ok' ? 'hint--joy' : ''}`}>
        {status === 'ok' ? rightAnswer() : status === 'ko' ? checkAgain() : order.length ? t('rounds.bands.tapNext') : t('rounds.bands.tap')}
      </p>
    </>
  );
}
