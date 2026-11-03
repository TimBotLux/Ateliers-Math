// « Je paie » (7-9 ans) : l'enfant compose une somme avec des pièces et des billets, ou rend la monnaie
// (palier 3). Les pièces se rangent sous l'étiquette du prix, comme les fruits de « Je remplis » ;
// deux barres comparent ce qui est posé au montant attendu : l'écart se voit, sans chiffre de total.

import { useRef, useState } from 'react';
import { checkAgain, rightAnswer } from '../data/messages.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { CheckIcon } from '../components/Icons.jsx';
import { Money } from '../components/MeasureVisuals.jsx';
import { useAutoAdvance } from './useAutoAdvance.js';

const MAX_COINS = 20;

export function CoinsRound({ round, onResult, onDone }) {
  const { sound, speak, cheer, path } = useApp();
  const [placed, setPlaced] = useState([]); // valeurs en centimes, de la plus grande à la plus petite
  const [checked, setChecked] = useState(null); // null | 'ok' | 'ko'
  const first = useRef(true);
  const advance = useAutoAdvance(onDone);
  const sum = placed.reduce((a, b) => a + b, 0);
  const scale = Math.max(round.target, sum, 1);
  const money = (c) => t('measures.money', { c });

  function add(c) {
    if (checked === 'ok' || placed.length >= MAX_COINS) return;
    sound('tap');
    setPlaced((list) => [...list, c].sort((a, b) => b - a));
    setChecked(null);
  }

  function remove(index) {
    if (checked === 'ok') return;
    setPlaced((list) => list.filter((_, i) => i !== index));
    setChecked(null);
  }

  function check() {
    if (checked === 'ok' || !placed.length) return;
    const ok = sum === round.target;
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
      speak(`${checkAgain()} ${t('rounds.coins.observe')}`);
    }
  }

  return (
    <>
      <div className="stage stage--compact coins">
        <div className="coins__tags">
          <span className="coins__tag">{t('rounds.coins.price')} <strong>{money(round.price)}</strong></span>
          {round.paid && <span className="coins__tag coins__tag--paid">{t('rounds.coins.paid')} <strong>{money(round.paid)}</strong></span>}
          {round.paid && <span className="coins__tag coins__tag--change">{t('rounds.coins.change')} <strong>?</strong></span>}
        </div>
        <div className="coins__gauge" role="img" aria-label={t('rounds.coins.gauge')}>
          <span className="coins__bar coins__bar--target" style={{ width: `${(round.target / scale) * 100}%` }} />
          <span className={`coins__bar ${checked === 'ok' ? 'is-right' : ''}`} style={{ width: `${(sum / scale) * 100}%`, background: path.accent }} />
        </div>
        <div className="coins__placed">
          {placed.map((c, i) => (
            <button key={`${c}-${i}`} className="coins__coin" onClick={() => remove(i)} aria-label={t('rounds.coins.remove', { v: t('measures.coin', { c }) })}>
              <Money c={c} size={0.85} />
            </button>
          ))}
        </div>
      </div>
      <p className={`hint ${checked === 'ok' ? 'hint--joy' : ''}`}>
        {checked === 'ok' ? rightAnswer() : checked === 'ko' ? checkAgain() : ' '}
      </p>
      <div className="coins__tray" aria-label={t('rounds.coins.tray')}>
        {round.coins.map((c) => (
          <button key={c} className="coins__pick" onClick={() => add(c)} aria-label={t('rounds.coins.add', { v: t('measures.coin', { c }) })}>
            <Money c={c} />
          </button>
        ))}
        <button className="coins__pick coins__pick--ok" style={{ background: path.accent, borderColor: path.accent }} onClick={check} aria-label={t('rounds.coins.done')}>
          <CheckIcon size={34} />
        </button>
      </div>
    </>
  );
}
