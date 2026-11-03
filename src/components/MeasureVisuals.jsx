// Matériel du module Grandeurs et mesures : horloge à aiguilles, règle graduée et objets à mesurer,
// pièces et billets génériques (aucune face nationale ni reproduction de billet réel), tableau de conversion.

import { t } from '../i18n/index.js';

// ---------- Horloge ----------

const polar = (deg, r) => [100 + r * Math.sin((deg * Math.PI) / 180), 100 - r * Math.cos((deg * Math.PI) / 180)];

/** Cadran à aiguilles (12 heures). ghost : aiguilles de l'heure demandée, en pointillés, à côté des vraies. */
export function ClockFace({ h, m, size = 180, ghost = null, svgRef, onPointerDown, onPointerMove, onPointerUp, label }) {
  const hourDeg = ((h % 12) + m / 60) * 30;
  const minuteDeg = m * 6;
  return (
    <svg ref={svgRef} viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={label || t('visual.clock')}
      className="clock" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      <circle cx="100" cy="100" r="94" fill="#FFFFFF" stroke="#1E2B2F" strokeWidth="5" />
      {Array.from({ length: 60 }, (_, i) => {
        const [x1, y1] = polar(i * 6, i % 5 ? 86 : 80);
        const [x2, y2] = polar(i * 6, 90);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E2B2F" strokeWidth={i % 5 ? 1.5 : 3.5} strokeLinecap="round" />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = polar((i + 1) * 30, 66);
        return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="central" className="clock__number">{i + 1}</text>;
      })}
      {ghost && (
        <g className="svg-fade" stroke="#2E7D5B" strokeWidth="6" strokeLinecap="round" strokeDasharray="2 9" opacity="0.9">
          <line x1="100" y1="100" x2={polar(((ghost.h % 12) + ghost.m / 60) * 30, 46)[0]} y2={polar(((ghost.h % 12) + ghost.m / 60) * 30, 46)[1]} />
          <line x1="100" y1="100" x2={polar(ghost.m * 6, 74)[0]} y2={polar(ghost.m * 6, 74)[1]} />
        </g>
      )}
      <line x1="100" y1="100" x2={polar(hourDeg, 46)[0]} y2={polar(hourDeg, 46)[1]} stroke="#1E2B2F" strokeWidth="9" strokeLinecap="round" />
      <line x1="100" y1="100" x2={polar(minuteDeg, 76)[0]} y2={polar(minuteDeg, 76)[1]} stroke="#2F6FB0" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="100" cy="100" r="7" fill="#1E2B2F" />
    </svg>
  );
}

// ---------- Règle et objets ----------

export const CM = 20; // pixels par centimètre dans le dessin
export const RULER_X0 = 20;

/** Objet dessiné de x à x + w (pixels), posé au-dessus de la règle. */
function RulerObject({ object, x, w }) {
  const y = 22;
  if (object === 'crayon') {
    return (
      <g>
        <rect x={x} y={y} width={Math.min(10, w * 0.12)} height="22" rx="3" fill="#D9617A" />
        <rect x={x + Math.min(10, w * 0.12)} y={y} width={w * 0.82 - Math.min(10, w * 0.12)} height="22" fill="#F2B84B" />
        <path d={`M${x + w * 0.82} ${y}L${x + w} ${y + 11}L${x + w * 0.82} ${y + 22}z`} fill="#F5D7A8" />
        <path d={`M${x + w * 0.94} ${y + 8}L${x + w} ${y + 11}L${x + w * 0.94} ${y + 14}z`} fill="#3D3D3D" />
      </g>
    );
  }
  if (object === 'gomme') {
    return (
      <g>
        <rect x={x} y={y - 2} width={w} height="26" rx="6" fill="#2F6FB0" />
        <rect x={x + w * 0.45} y={y - 2} width={w * 0.55} height="26" rx="6" fill="#F4F1EA" />
        <rect x={x + w * 0.45} y={y - 2} width="8" height="26" fill="#F4F1EA" />
      </g>
    );
  }
  if (object === 'feuille') {
    return (
      <g>
        <path d={`M${x} ${y + 11}Q${x + w * 0.5} ${y - 14} ${x + w} ${y + 11}Q${x + w * 0.5} ${y + 36} ${x} ${y + 11}z`} fill="#2E7D5B" />
        <path d={`M${x} ${y + 11}H${x + w * 0.92}`} stroke="#A8D5B5" strokeWidth="2" />
      </g>
    );
  }
  return (
    <g>
      <rect x={x} y={y + 6} width={w * 0.62} height="10" rx="5" fill="#B85E14" />
      <rect x={x + w * 0.62} y={y + 4} width={w * 0.14} height="14" fill="#B9C9C2" />
      <path d={`M${x + w * 0.76} ${y + 3}H${x + w * 0.9}Q${x + w} ${y + 11} ${x + w * 0.9} ${y + 19}H${x + w * 0.76}z`} fill="#3D2A5C" />
    </g>
  );
}

/** Règle de 15 cm ; count : les centimètres sous l'objet, colorés un sur deux pour les recompter. */
export function Ruler({ object, start, length, labels = 'all', count = false }) {
  const x = RULER_X0 + start * CM;
  const w = length * CM;
  return (
    <svg viewBox="0 0 340 120" width="100%" role="img" aria-label={t('rounds.ruler.aria', { what: t(`measures.objects.${object}`) })}>
      <RulerObject object={object} x={x} w={w} />
      <line x1={x} y1="14" x2={x} y2="62" stroke="#1E2B2F" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <line x1={x + w} y1="14" x2={x + w} y2="62" stroke="#1E2B2F" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
      <rect x="6" y="56" width="328" height="56" rx="6" fill="#FDF3DC" stroke="#8A6408" strokeWidth="2" />
      {count && Array.from({ length }, (_, i) => (
        <rect key={i} className="svg-fade" x={x + i * CM} y="57" width={CM} height="12" fill={i % 2 ? '#E8892F' : '#2F6FB0'} opacity="0.75" />
      ))}
      {Array.from({ length: 31 }, (_, i) => (
        <line key={i} x1={RULER_X0 + (i * CM) / 2} y1="56" x2={RULER_X0 + (i * CM) / 2} y2={i % 2 ? 66 : 76} stroke="#1E2B2F" strokeWidth={i % 2 ? 1.2 : 2} />
      ))}
      {Array.from({ length: 16 }, (_, i) => (labels === 'all' || i % 5 === 0) && (
        <text key={i} x={RULER_X0 + i * CM} y="96" textAnchor="middle" className="svg-label">{i}</text>
      ))}
    </svg>
  );
}

// ---------- Pièces et billets ----------

/** Pièce ou billet générique : la valeur (en centimes) est écrite dessus, rien d'autre. */
export function Money({ c, size = 1 }) {
  const label = t('measures.coin', { c });
  if (c >= 500) {
    return (
      <svg width={74 * size} height={42 * size} viewBox="0 0 74 42" aria-hidden="true">
        <rect x="1" y="1" width="72" height="40" rx="5" fill={c === 500 ? '#BFD8EA' : '#F3C6C1'} stroke={c === 500 ? '#2F6FB0' : '#A8364F'} strokeWidth="2" />
        <circle cx="16" cy="21" r="9" fill="none" stroke={c === 500 ? '#2F6FB0' : '#A8364F'} strokeWidth="1.5" opacity="0.6" />
        <text x="46" y="22" textAnchor="middle" dominantBaseline="central" className="money__label">{label}</text>
      </svg>
    );
  }
  const big = c >= 100;
  const r = big ? 22 : c >= 50 ? 20 : c >= 20 ? 18 : 16;
  return (
    <svg width={2 * r * size + 2} height={2 * r * size + 2} viewBox={`0 0 ${2 * r + 2} ${2 * r + 2}`} aria-hidden="true">
      <circle cx={r + 1} cy={r + 1} r={r} fill={big ? '#C9CDD0' : '#E2B84C'} stroke={big ? '#7A8287' : '#9C7A16'} strokeWidth="2" />
      {big && <circle cx={r + 1} cy={r + 1} r={r - 6} fill="#E2B84C" />}
      <text x={r + 1} y={r + 1} textAnchor="middle" dominantBaseline="central" className="money__label money__label--coin">{label}</text>
    </svg>
  );
}

// ---------- Tableau de conversion ----------

/** Tableau de conversion : chiffres du nombre donné, zéros ajoutés en couleur, colonne d'arrivée en évidence. */
export function ConvTable({ units, digits, target }) {
  const lastCol = Math.max(...digits.map((d) => d.col));
  const cell = (i) => {
    const found = digits.find((d) => d.col === i);
    if (found) return { d: found.d, added: false };
    if (i > lastCol && i <= target) return { d: '0', added: true };
    return { d: '', added: false };
  };
  return (
    <table className="convtable" aria-label={t('visual.convTable')}>
      <thead>
        <tr>{units.map((u, i) => <th key={u} className={i === target ? 'is-target' : ''}>{u}</th>)}</tr>
      </thead>
      <tbody>
        <tr>
          {units.map((u, i) => {
            const c = cell(i);
            return <td key={u} className={`${i === target ? 'is-target' : ''} ${c.added ? 'is-added' : ''}`}>{c.d}</td>;
          })}
        </tr>
      </tbody>
    </table>
  );
}
