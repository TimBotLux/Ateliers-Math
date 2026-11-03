// Manche tangram « Je construis » : l'enfant touche une pièce, la tourne (quart de tour) ou la retourne,
// puis touche l'endroit où la poser ; la pièce se cale sur la grille. Une pièce posée se reprend en la touchant.
// Le matériel corrige l'erreur : une pièce qui dépasse reste visible hors du contour, un trou reste en creux.
// « J'ai fini » ne juge pas ; après 3 vérifications, le contour d'une pièce bien placée apparaît (une de plus
// à chaque essai) : l'enfant n'est jamais bloqué. Le jardin ne grandit que sans aide, au premier essai.

import { useMemo, useRef, useState } from 'react';
import { checkAgain, rightAnswer } from '../data/messages.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { CheckIcon, FlipIcon, RotateIcon } from '../components/Icons.jsx';
import {
  PIECE_COLORS, checkAssembly, hintsFor, outlineSegments, pieceSize, placedPoints, rotate, snapPlacement, solutionAtoms,
} from '../engines/tangramEngine.js';
import { useAutoAdvance } from './useAutoAdvance.js';

const MAX_SILENT_CHECKS = 3;
const pointsAttr = (pts) => pts.map(([x, y]) => `${x},${y}`).join(' ');

/** Silhouette : surface en creux, contour, et traits intérieurs (emplacements) plus ou moins visibles. */
export function SilhouetteShape({ solution, lines = 'none', atoms }) {
  const segs = useMemo(() => outlineSegments(atoms || solutionAtoms(solution)), [solution, atoms]);
  return (
    <g>
      {solution.map((p, i) => <polygon key={i} points={pointsAttr(placedPoints(p))} fill="#DCE5E1" stroke="#DCE5E1" strokeWidth="0.04" />)}
      {lines !== 'none' && solution.map((p, i) => (
        <polygon key={`l${i}`} points={pointsAttr(placedPoints(p))} fill="none"
          stroke={lines === 'full' ? '#7F948C' : '#B9C9C2'} strokeWidth={lines === 'full' ? 0.07 : 0.05} strokeLinejoin="round" />
      ))}
      {segs.map(([a, b], i) => <line key={`o${i}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#1E2B2F" strokeWidth="0.1" strokeLinecap="round" />)}
    </g>
  );
}

/** Largeur et hauteur (en carreaux) d'un assemblage. */
function shapeSize(solution) {
  const pts = solution.flatMap(placedPoints);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  return { w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
}

/** Petite vignette d'une silhouette. unit : pixels par carreau, le même pour deux vignettes comparées
 * (sinon une forme plus petite pourrait paraître plus grande). */
export function SilhouetteThumb({ solution, lines = 'pale', unit = 20, label }) {
  const pts = solution.flatMap(placedPoints);
  const x0 = Math.min(...pts.map((p) => p[0]));
  const y0 = Math.min(...pts.map((p) => p[1]));
  const w = Math.max(...pts.map((p) => p[0])) - x0;
  const h = Math.max(...pts.map((p) => p[1])) - y0;
  return (
    <svg viewBox={`${x0 - 0.3} ${y0 - 0.3} ${w + 0.6} ${h + 0.6}`} width={(w + 0.6) * unit} height={(h + 0.6) * unit} role="img" aria-label={label}>
      <SilhouetteShape solution={solution} lines={lines} />
    </svg>
  );
}

function PieceIcon({ piece, selected, onPick }) {
  const pts = placedPoints({ ...piece, x: 0, y: 0 });
  const w = Math.max(...pts.map((p) => p[0]));
  const h = Math.max(...pts.map((p) => p[1]));
  return (
    <button className={`tangram__piece ${selected ? 'is-selected' : ''}`} onClick={onPick} aria-label={t(`tangram.pieces.${piece.id.replace(/\d/, '')}`)} aria-pressed={selected}>
      <svg viewBox={`-0.2 -0.2 ${w + 0.4} ${h + 0.4}`} width={Math.max(w, 1) * 19} height={Math.max(h, 1) * 19} aria-hidden="true">
        <polygon points={pointsAttr(pts)} fill={PIECE_COLORS[piece.id]} stroke="#FFFFFF" strokeWidth="0.08" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function TangramRound({ round, onResult, onDone }) {
  const { sound, speak, cheer, path } = useApp();
  const target = useMemo(() => solutionAtoms(round.solution), [round.solution]);
  // Pièces : orientation courante et position (null = dans la réserve).
  const [pieces, setPieces] = useState(() => round.tray.map((p) => ({ ...p, x: null, y: null })));
  const [selected, setSelected] = useState(round.tray[0]?.id ?? null);
  const [fails, setFails] = useState(0);
  const [status, setStatus] = useState('play'); // play | done | area | solved
  const [message, setMessage] = useState(null); // null | 'check' | 'right'
  const [areaTried, setAreaTried] = useState([]);
  const recorded = useRef(false);
  const svgRef = useRef(null);
  const advance = useAutoAdvance(onDone, 1800);

  const placed = pieces.filter((p) => p.x !== null);
  const hints = hintsFor(round.solution, placed, fails - MAX_SILENT_CHECKS + 1);
  const helped = fails >= MAX_SILENT_CHECKS;
  const current = pieces.find((p) => p.id === selected);

  function record(ok) {
    if (recorded.current) return;
    recorded.current = true;
    onResult(ok);
  }

  function finish(next) {
    const result = checkAssembly(target, next.filter((p) => p.x !== null));
    if (!result.complete) return false;
    setSelected(null);
    sound('joie');
    if (round.area) {
      // La question d'aire décide du premier essai ; une silhouette faite avec de l'aide ne compte pas.
      if (helped || fails > 0) record(false);
      setStatus('area');
      speak(t('rounds.tangram.areaQuestion'));
      return true;
    }
    record(!helped && fails === 0);
    setStatus('done');
    setMessage('right');
    cheer();
    advance();
    return true;
  }

  function update(next) {
    setPieces(next);
    setMessage(null);
    finish(next);
  }

  function changeSelected(fn) {
    if (!current || status !== 'play') return;
    sound('tap');
    // Une pièce posée qu'on tourne reste à sa place (recalée dans le plateau).
    update(pieces.map((p) => {
      if (p.id !== selected) return p;
      const turned = fn(p);
      if (p.x === null) return turned;
      const { w: pw, h: ph } = pieceSize(p.id, p.rot, p.flip);
      return snapPlacement(turned, { x: p.x + pw / 2, y: p.y + ph / 2 }, round.board);
    }));
  }

  function pickFromTray(id) {
    if (status !== 'play') return;
    sound('tap');
    setSelected(id === selected ? null : id);
  }

  function tapBoard(e) {
    if (status !== 'play' || !current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const at = {
      x: ((e.clientX - rect.left) / rect.width) * round.board.w,
      y: ((e.clientY - rect.top) / rect.height) * round.board.h,
    };
    const next = pieces.map((p) => (p.id === selected ? snapPlacement(p, at, round.board) : p));
    sound('tap');
    // La pièce suivante de la réserve est prête dans la main.
    setSelected(next.find((p) => p.x === null)?.id ?? null);
    update(next);
  }

  function pickUp(e, id) {
    if (status !== 'play') return;
    e.stopPropagation();
    sound('tap');
    // Toucher la pièce déjà dans la main la remet dans la réserve.
    if (id === selected) {
      update(pieces.map((p) => (p.id === id ? { ...p, x: null, y: null } : p)));
      return;
    }
    setSelected(id);
  }

  function checkDone() {
    if (status !== 'play') return;
    if (finish(pieces)) return;
    // Rien n'est jugé faux : le matériel montre l'écart, le message invite à regarder.
    record(false);
    setFails((f) => f + 1);
    setMessage('check');
    sound('observe');
    speak(fails + 1 >= MAX_SILENT_CHECKS ? `${checkAgain()} ${t('rounds.tangram.hintShown')}` : checkAgain());
  }

  function answerArea(id) {
    if (status !== 'area' || areaTried.includes(id)) return;
    const ok = id === round.area.answer;
    record(ok && !helped && fails === 0);
    if (ok) {
      setStatus('solved');
      setMessage('right');
      sound('joie');
      cheer();
      advance();
    } else {
      setAreaTried((a) => [...a, id]);
      sound('observe');
      speak(`${checkAgain()} ${t('rounds.tangram.areaHint')}`);
    }
  }

  const { w, h } = round.board;
  const tray = pieces.filter((p) => p.x === null);

  if (status === 'area' || status === 'solved') {
    const choices = ['oui', 'non', 'inconnu'];
    // Même échelle pour les deux formes, la plus grande possible dans l'écran.
    const dims = [round.solution, round.area.otherSolution].map(shapeSize);
    const unit = Math.min(30, 290 / (dims[0].w + dims[1].w + 1.2), 220 / (Math.max(dims[0].h, dims[1].h) + 0.6));
    return (
      <>
        <div className="stage stage--compact tangram-area">
          <SilhouetteThumb solution={round.solution} lines="full" unit={unit} label={t(`tangram.names.${round.silhouette}`)} />
          <SilhouetteThumb solution={round.area.otherSolution} lines="full" unit={unit} label={t(`tangram.names.${round.area.other}`)} />
        </div>
        <p className="tangram-area__question">{t('rounds.tangram.areaQuestion')}</p>
        <div className="choice-grid choice-grid--stack">
          {choices.map((c) => (
            <button key={c} className={`choice ${status === 'solved' && c === round.area.answer ? 'is-right' : areaTried.includes(c) ? 'is-tried' : ''}`} onClick={() => answerArea(c)}>
              <span className="choice__number choice__number--long">{t(`rounds.tangram.${c}`)}</span>
            </button>
          ))}
        </div>
        <p className={`hint ${status === 'solved' ? 'hint--joy' : ''}`}>
          {status === 'solved' ? rightAnswer() : areaTried.length ? t('rounds.tangram.areaHint') : ' '}
        </p>
      </>
    );
  }

  return (
    <>
      <div className={`stage stage--compact tangram ${status === 'done' ? 'is-complete' : ''}`}>
        <svg ref={svgRef} viewBox={`0 0 ${w} ${h}`} width="100%" className="tangram__board" onPointerDown={tapBoard}
          role="img" aria-label={t('rounds.tangram.board', { name: t(`tangram.names.${round.silhouette}`) })}>
          <rect x="0" y="0" width={w} height={h} fill="transparent" />
          <SilhouetteShape solution={round.solution} lines={round.lines} atoms={target} />
          {hints.map((p, i) => (
            <polygon key={`h${i}`} className="svg-fade" points={pointsAttr(placedPoints(p))} fill="none" stroke={PIECE_COLORS[p.id]} strokeWidth="0.09" strokeDasharray="0.25 0.18" strokeLinejoin="round" />
          ))}
          {placed.map((p) => (
            <polygon key={p.id} points={pointsAttr(placedPoints(p))} fill={PIECE_COLORS[p.id]} fillOpacity="0.88"
              stroke={p.id === selected ? '#1E2B2F' : '#FFFFFF'} strokeWidth={p.id === selected ? 0.12 : 0.06} strokeLinejoin="round"
              className="tangram__placed" onPointerDown={(e) => pickUp(e, p.id)} />
          ))}
        </svg>
      </div>

      <p className={`hint ${message === 'right' ? 'hint--joy' : ''}`}>
        {message === 'right' ? rightAnswer() : message === 'check' ? checkAgain() : current ? t('rounds.tangram.tapBoard') : t('rounds.tangram.pickPiece')}
      </p>

      {tray.length > 0 && (
        <div className="tangram__tray" aria-label={t('rounds.tangram.tray')}>
          {tray.map((p) => <PieceIcon key={p.id} piece={p} selected={p.id === selected} onPick={() => pickFromTray(p.id)} />)}
        </div>
      )}

      <div className="tangram__controls">
        <button className="choice" disabled={!current || status !== 'play'} onClick={() => changeSelected((p) => ({ ...p, rot: rotate(p.rot) }))} aria-label={t('rounds.tangram.rotate')}>
          <RotateIcon size={34} />
        </button>
        {round.canFlip && (
          <button className="choice" disabled={!current || status !== 'play'} onClick={() => changeSelected((p) => ({ ...p, flip: !p.flip }))} aria-label={t('rounds.tangram.flip')}>
            <FlipIcon size={34} />
          </button>
        )}
        <button className="choice" style={{ background: path.accent, borderColor: path.accent }} onClick={checkDone} aria-label={t('rounds.tangram.done')}>
          <CheckIcon size={38} />
        </button>
      </div>
    </>
  );
}
