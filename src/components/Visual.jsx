// Matériel virtuel affiché dans les manches : points, objets, formes, cubes, paquets…

import { mulberry32, shuffle } from '../engines/random.js';

const DICE = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [0, 2], [2, 0], [2, 2]],
  5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
  6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

function Dice({ count, scatter, seed }) {
  let cells;
  if (scatter) {
    const grid = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) grid.push([r, c]);
    cells = shuffle(mulberry32(seed), grid).slice(0, count);
  } else {
    cells = DICE[count].map(([r, c]) => [r, c + 0.5]);
  }
  return (
    <svg width="220" height="170" viewBox="0 0 220 170" role="img" aria-label="Des points">
      {cells.map(([r, c]) => (
        <circle key={`${r}-${c}`} cx={30 + c * 53} cy={32 + r * 53} r="19" fill="#B85E14" />
      ))}
    </svg>
  );
}

function Objects({ emoji, count, size }) {
  const fontSize = size ?? (count <= 5 ? 48 : count <= 10 ? 38 : 30);
  return (
    <div className="objects" role="img" aria-label={`${count} objets`} style={{ fontSize }}>
      {Array.from({ length: count }, (_, i) => <span key={i}>{emoji}</span>)}
    </div>
  );
}

const SHAPE_PATHS = {
  rond: <circle cx="50" cy="50" r="38" />,
  carre: <rect x="14" y="14" width="72" height="72" rx="6" />,
  triangle: <path d="M50 10L90 84H10z" />,
  rectangle: <rect x="6" y="26" width="88" height="48" rx="6" />,
  ovale: <ellipse cx="50" cy="50" rx="44" ry="28" />,
  losange: <path d="M50 6L80 50 50 94 20 50z" />,
  etoile: <path d="M50 8l11.5 25 27 3-20 18.5 5.5 27L50 68 26 81.5l5.5-27-20-18.5 27-3z" />,
  hexagone: <path d="M50 8l36 21v42L50 92 14 71V29z" />,
};

export function Shape({ shape, color, rotate = 0, size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <g fill={color} transform={`rotate(${rotate} 50 50)`}>{SHAPE_PATHS[shape]}</g>
    </svg>
  );
}

function Pattern({ items }) {
  return (
    <div className="pattern">
      {items.map((it, i) =>
        it ? (
          <Shape key={i} shape={it.shape} color={it.color} size={38} />
        ) : (
          <span key={i} className="pattern__missing" aria-label="À trouver">?</span>
        ),
      )}
    </div>
  );
}

/** Cubes en base dix : barres de dix et cubes unités. */
function BaseTen({ n, removed = 0 }) {
  const tens = Math.floor(n / 10);
  const units = n % 10;
  // On barre les derniers éléments enlevés (unités d'abord, puis dizaines entières).
  const removedUnits = Math.min(units, removed);
  const removedTens = Math.ceil(Math.max(0, removed - units) / 10);
  return (
    <div className="baseten" role="img" aria-label="Des cubes">
      {Array.from({ length: tens }, (_, i) => (
        <span key={`t${i}`} className={`baseten__ten ${i >= tens - removedTens ? 'is-removed' : ''}`} />
      ))}
      <span className="baseten__units">
        {Array.from({ length: units }, (_, i) => (
          <span key={`u${i}`} className={`baseten__unit ${i >= units - removedUnits ? 'is-removed' : ''}`} />
        ))}
      </span>
    </div>
  );
}

function Groups({ groups, size }) {
  return (
    <div className="groups" role="img" aria-label="Des paquets">
      {Array.from({ length: groups }, (_, g) => (
        <span key={g} className="groups__bag">
          {Array.from({ length: size }, (_, i) => <span key={i} className="groups__dot" />)}
        </span>
      ))}
    </div>
  );
}

// ---------- Matériel du parcours 10-12 ans ----------

/** Fraction écrite « en étage » (numérateur sur dénominateur). */
export function Frac({ n, d }) {
  return (
    <span className="frac" aria-label={`${n} sur ${d}`}>
      <span>{n}</span>
      <span className="frac__bar" />
      <span>{d}</span>
    </span>
  );
}

/** Texte d'un nombre, avec les fractions « a/b » mises en étage. */
export function MathText({ text }) {
  const m = /^(\d+)\/(\d+)$/.exec(text);
  return m ? <Frac n={m[1]} d={m[2]} /> : text;
}

function FractionBars({ items }) {
  return (
    <div className="fbars">
      {items.map(({ n, d }, k) => (
        <div key={k} className="fbars__row">
          <svg viewBox="0 0 240 34" width="100%" role="img" aria-label={`${n} sur ${d}`}>
            {Array.from({ length: d }, (_, i) => (
              <rect key={i} x={2 + (i * 236) / d} y="2" width={236 / d} height="30" fill={i < n ? '#7A4FB5' : '#FFFFFF'} stroke="#3D2A5C" strokeWidth="2" />
            ))}
          </svg>
          {items.length > 1 && <Frac n={n} d={d} />}
        </div>
      ))}
    </div>
  );
}

function Angle({ deg, rotate = 0 }) {
  const r = 70;
  const rad = (deg * Math.PI) / 180;
  const x2 = 100 + r * Math.cos(-rad);
  const y2 = 100 + r * Math.sin(-rad);
  const ar = 26;
  const ax = 100 + ar * Math.cos(-rad);
  const ay = 100 + ar * Math.sin(-rad);
  return (
    <svg viewBox="0 0 200 130" width="230" role="img" aria-label="Un angle">
      <g transform={`rotate(${rotate} 100 100)`}>
        <path d={`M126 100 A${ar} ${ar} 0 0 0 ${ax} ${ay}`} fill="#ECE4F6" stroke="#7A4FB5" strokeWidth="2.5" />
        <path d={`M100 100 L170 100 M100 100 L${x2} ${y2}`} stroke="#1E2B2F" strokeWidth="4" strokeLinecap="round" />
        <circle cx="100" cy="100" r="4" fill="#1E2B2F" />
      </g>
    </svg>
  );
}

/** Figure sur quadrillage : rectangle, éventuellement amputé d'un coin (forme en L). */
function GridShape({ w, h, cut, labels, showGrid, highlight }) {
  const size = Math.min(40, Math.floor(260 / Math.max(w, h + 1)));
  const W = w * size;
  const H = h * size;
  const inShape = (x, y) => !(cut && x >= w - cut.w && y < cut.h);
  // Coin coupé en haut à droite pour la forme en L.
  const path = cut ? `M0 0 H${(w - cut.w) * size} V${cut.h * size} H${W} V${H} H0 Z` : `M0 0 H${W} V${H} H0 Z`;
  return (
    <svg viewBox={`-30 -24 ${W + 60} ${H + 48}`} width={Math.min(300, W + 60)} style={{ maxWidth: '100%', height: 'auto' }} role="img" aria-label="Une figure sur un quadrillage">
      <path d={path} fill={highlight === 'aire' ? '#D9C8F0' : '#ECE4F6'} />
      {showGrid &&
        Array.from({ length: w * h }, (_, i) => {
          const x = i % w;
          const y = Math.floor(i / w);
          return inShape(x, y) ? <rect key={i} x={x * size} y={y * size} width={size} height={size} fill="none" stroke="#B9A6DA" strokeWidth="1" /> : null;
        })}
      <path d={path} fill="none" stroke={highlight === 'perimetre' ? '#E8892F' : '#3D2A5C'} strokeWidth={highlight === 'perimetre' ? 5 : 3} strokeLinejoin="round" />
      {labels && (
        <>
          <text x={W / 2} y={-8} textAnchor="middle" className="svg-label">{w} cm</text>
          <text x={-8} y={H / 2} textAnchor="end" dominantBaseline="middle" className="svg-label">{h} cm</text>
        </>
      )}
    </svg>
  );
}

function Table({ headers, rows }) {
  return (
    <table className="ptable">
      <thead><tr>{headers.map((hd) => <th key={hd}>{hd}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={c === '?' ? 'is-unknown' : ''}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

/** Schéma en barres (méthode de Singapour) : une ligne par quantité, en parts égales. */
function BarModel({ rows, caption }) {
  const maxParts = Math.max(...rows.map((r) => r.parts + (r.extra ? 1 : 0)));
  return (
    <div className="barmodel">
      {rows.map((r, i) => (
        <div key={i} className="barmodel__row">
          <span className="barmodel__label">{r.label}</span>
          <div className="barmodel__bar" style={{ gridTemplateColumns: `repeat(${maxParts}, 1fr)` }}>
            {Array.from({ length: r.parts }, (_, k) => (
              <span key={k} className={`barmodel__part ${k < (r.shaded || 0) ? 'is-shaded' : ''}`} />
            ))}
            {r.extra && <span className="barmodel__part barmodel__part--extra">{r.extra}</span>}
          </div>
          {r.note && <span className="barmodel__note">{r.note}</span>}
        </div>
      ))}
      {caption && <span className="barmodel__caption">{caption}</span>}
    </div>
  );
}

function PlaceValue({ text, highlight }) {
  return (
    <div className="placevalue" aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className={String(highlight) === ch ? 'is-highlight' : ch === ' ' ? 'is-space' : ''}>{ch}</span>
      ))}
    </div>
  );
}

export function Visual({ v }) {
  if (!v) return null;
  switch (v.type) {
    case 'fractionBars':
      return <FractionBars items={v.items} />;
    case 'angle':
      return <Angle deg={v.deg} rotate={v.rotate} />;
    case 'grid':
      return <GridShape {...v} />;
    case 'barModel':
      return <BarModel rows={v.rows} caption={v.caption} />;
    case 'placeValue':
      return <PlaceValue text={v.text} highlight={v.highlight} />;
    case 'dice':
      return <Dice {...v} />;
    case 'objects':
      return <Objects {...v} />;
    case 'sum':
      return (
        <div className="sum">
          <Objects emoji={v.emoji} count={v.a} size={v.a + v.b > 7 ? 30 : 40} />
          <span className="sum__plus" aria-hidden="true">+</span>
          <Objects emoji={v.emoji} count={v.b} size={v.a + v.b > 7 ? 30 : 40} />
        </div>
      );
    case 'shape':
      return <Shape shape={v.shape} color={v.color} rotate={v.rotate} size={v.big ? 130 : 72} />;
    case 'pattern':
      return <Pattern items={v.items} />;
    case 'blocks':
      return (
        <div className="blocks">
          {v.terms.map((t, i) => (
            <BaseTen key={i} n={t} removed={i === 0 ? v.remove : 0} />
          ))}
        </div>
      );
    case 'groups':
      return <Groups groups={v.groups} size={v.size} />;
    case 'story':
      return (
        <div className="story">
          <div className="story__row">
            {v.emoji && <span className="story__emoji" aria-hidden="true">{v.emoji}</span>}
            <p>{v.text}</p>
          </div>
          {v.table && <Table {...v.table} />}
        </div>
      );
    default:
      return null;
  }
}
