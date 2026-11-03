import { describe, expect, it } from 'vitest';
import { SILHOUETTES, silhouettesFor, tangram1, tangram2, tangram3 } from '../src/activities/tangram.js';
import {
  PIECE_IDS, checkAssembly, hintsFor, orientedPoints, pieceAtoms, rotate, solutionAtoms,
} from '../src/engines/tangramEngine.js';
import { mulberry32 } from '../src/engines/random.js';
import { _dicts } from '../src/i18n/index.js';

const shift = (sol, dx, dy) => sol.map((p) => ({ ...p, x: p.x + dx, y: p.y + dy }));

describe('tangramEngine', () => {
  it('les 7 pièces couvrent exactement le carré de côté 4 (64 petits triangles)', () => {
    const square = SILHOUETTES.find((s) => s.id === 'carre');
    expect(square.solution).toHaveLength(7);
    expect(solutionAtoms(square.solution).size).toBe(64);
    expect(checkAssembly(solutionAtoms(square.solution), square.solution).complete).toBe(true);
  });

  it('chaque silhouette est réalisable avec les pièces de son niveau (référence vérifiée, sans chevauchement)', () => {
    for (const s of SILHOUETTES) {
      const ids = s.solution.map((p) => p.id);
      expect(new Set(ids).size, s.id).toBe(ids.length);
      ids.forEach((id) => expect(PIECE_IDS, s.id).toContain(id));
      const atoms = solutionAtoms(s.solution);
      const covered = s.solution.reduce((n, p) => n + pieceAtoms(p).length, 0);
      expect(covered, `${s.id} : chevauchement`).toBe(atoms.size);
      expect(checkAssembly(atoms, s.solution).complete, s.id).toBe(true);
    }
  });

  it('accepte une solution différente de la référence mais valable (petits triangles échangés, autre découpe)', () => {
    const boat = SILHOUETTES.find((s) => s.id === 'cerfvolant');
    const target = solutionAtoms(boat.solution);
    // Les deux grands triangles sont interchangeables.
    const swapped = boat.solution.map((p) => ({ ...p, id: p.id === 'L1' ? 'L2' : 'L1' }));
    expect(checkAssembly(target, swapped).complete).toBe(true);
    // Le carré 2 × 2 : triangle moyen + 2 petits, ou l'inverse de la diagonale.
    const square2 = [{ id: 'M', rot: 0, flip: false, x: 0, y: 0 }, { id: 'S1', rot: 2, flip: false, x: 0, y: 1 }, { id: 'S2', rot: 1, flip: false, x: 1, y: 0 }];
    const other = [{ id: 'M', rot: 2, flip: false, x: 0, y: 0 }, { id: 'S1', rot: 0, flip: false, x: 0, y: 0 }, { id: 'S2', rot: 3, flip: false, x: 0, y: 0 }];
    expect(checkAssembly(solutionAtoms(square2), other).complete).toBe(true);
  });

  it('refuse un chevauchement, un trou ou une pièce qui dépasse', () => {
    const s = SILHOUETTES.find((x) => x.id === 'maison');
    const target = solutionAtoms(s.solution);
    expect(checkAssembly(target, s.solution.slice(1)).holes).toBeGreaterThan(0);
    const moved = s.solution.map((p, i) => (i === 0 ? { ...p, x: p.x + 1 } : p));
    const r = checkAssembly(target, moved);
    expect(r.complete).toBe(false);
    expect(r.outside + r.overlap).toBeGreaterThan(0);
    expect(checkAssembly(target, shift(s.solution, 1, 0)).complete).toBe(false);
  });

  it('la rotation ramène une pièce à son orientation de départ (4 quarts de tour, donc aussi après 8 pas)', () => {
    for (const id of PIECE_IDS) {
      let rot = 0;
      for (let k = 0; k < 4; k++) rot = rotate(rot);
      expect(orientedPoints(id, rot, false)).toEqual(orientedPoints(id, 0, false));
      for (let k = 0; k < 4; k++) rot = rotate(rot);
      expect(rot).toBe(0);
    }
  });

  it('le parallélogramme retourné reste valable, et il ne se superpose pas à sa version non retournée', () => {
    const flipped = { id: 'P', rot: 0, flip: true, x: 0, y: 0 };
    const plain = { id: 'P', rot: 0, flip: false, x: 0, y: 0 };
    expect(pieceAtoms(flipped)).toHaveLength(8);
    expect(checkAssembly(new Set(pieceAtoms(flipped)), [flipped]).complete).toBe(true);
    expect(checkAssembly(new Set(pieceAtoms(flipped)), [plain]).complete).toBe(false);
  });

  it('l’aide après 3 essais n’empêche jamais de terminer : suivre tous les contours remplit la silhouette', () => {
    for (const s of SILHOUETTES) {
      const target = solutionAtoms(s.solution);
      let placed = [];
      for (let n = 1; n <= s.solution.length; n++) {
        const hints = hintsFor(s.solution, placed, n);
        expect(hints.length, s.id).toBeGreaterThan(0);
        placed = [...placed, hints[0]];
      }
      expect(hintsFor(s.solution, placed, 3)).toEqual([]);
      expect(checkAssembly(target, placed).complete, s.id).toBe(true);
    }
  });
});

describe('Activités tangram', () => {
  const ACTS = [[tangram1, '4-6', 90], [tangram2, '7-9', 60], [tangram3, '10-12', 90]];
  const COUNTS = { tangram1: [2, 3, 3], tangram2: [4, 4, 5], tangram3: [5, 7, 7] };

  it('respectent la fiche du PRD (clé, parcours, ordre, compétences, 3 manches, 3 minutes)', () => {
    for (const [a, path, order] of ACTS) {
      expect(a.path).toBe(path);
      expect(a.order).toBe(order);
      expect(a.skills).toEqual(['geometrie', 'espace', 'logique']);
      expect(a.interaction).toBe('manipulation');
      expect(a.rounds).toBe(3);
      expect(a.duration).toBe(3);
    }
  });

  it('produisent à chaque palier une silhouette du bon nombre de pièces, dans l’univers de l’enfant', () => {
    const rng = mulberry32(5);
    for (const [a] of ACTS) {
      for (let tier = 1; tier <= 3; tier++) {
        for (const theme of ['fees', 'gare', undefined]) {
          for (let i = 0; i < 30; i++) {
            const r = a.create(tier, rng, { theme });
            expect(r.kind).toBe('tangram');
            expect(r.solution, `${a.key} ${tier}`).toHaveLength(COUNTS[a.key][tier - 1]);
            expect(r.tray.map((p) => p.id).sort()).toEqual(r.solution.map((p) => p.id).sort());
            const sil = SILHOUETTES.find((s) => s.id === r.silhouette);
            expect(['all', theme].includes(sil.theme), `${r.silhouette} / ${theme}`).toBe(true);
            // La silhouette tient dans le plateau.
            for (const p of r.solution) {
              orientedPoints(p.id, p.rot, p.flip).forEach(([x, y]) => {
                expect(p.x + x).toBeLessThanOrEqual(r.board.w);
                expect(p.y + y).toBeLessThanOrEqual(r.board.h);
              });
            }
          }
        }
      }
    }
  });

  it('palier 1 en 4-6 ans : pièces déjà dans le bon sens, emplacements dessinés ; 7-9 palier 3 : parallélogramme à retourner', () => {
    const rng = mulberry32(9);
    for (let i = 0; i < 40; i++) {
      const r = tangram1.create(1, rng, {});
      expect(r.lines).toBe('full');
      r.tray.forEach((p) => {
        const ref = r.solution.find((s) => s.id === p.id);
        expect(p.rot).toBe(ref.rot);
      });
      const r3 = tangram2.create(3, rng, { theme: 'fees' });
      expect(r3.lines).toBe('none');
      const refP = r3.solution.find((p) => p.id === 'P');
      expect(refP.flip).toBe(true);
      expect(r3.tray.find((p) => p.id === 'P').flip).toBe(false);
      expect(r3.canFlip).toBe(true);
    }
  });

  it('10-12 palier 3 : question « même aire ? » juste (mêmes 7 pièces → oui, 5 pièces → non)', () => {
    const rng = mulberry32(13);
    const seen = new Set();
    for (let i = 0; i < 60; i++) {
      const r = tangram3.create(3, rng, { theme: 'gare' });
      expect(r.area).toBeTruthy();
      expect(r.area.answer).toBe(r.area.otherSolution.length === 7 ? 'oui' : 'non');
      seen.add(r.area.answer);
    }
    expect([...seen].sort()).toEqual(['non', 'oui']);
    expect(tangram3.create(2, rng, {}).area).toBeNull();
  });

  it('chaque univers a ses silhouettes propres, et chaque palier en propose au moins une', () => {
    for (const theme of ['fees', 'gare']) {
      expect(SILHOUETTES.filter((s) => s.theme === theme).length).toBeGreaterThanOrEqual(3);
      for (const n of [2, 3, 4, 5, 7]) expect(silhouettesFor(n, theme).length, `${theme} ${n}`).toBeGreaterThan(0);
      expect(silhouettesFor(5, theme, { needsFlip: true }).length).toBeGreaterThan(0);
    }
  });

  it('aucun chiffre dans les noms des silhouettes et des pièces, dans les deux langues', () => {
    for (const lang of ['fr', 'en']) {
      const { names, pieces } = _dicts[lang].tangram;
      SILHOUETTES.forEach((s) => {
        expect(names[s.id], `${lang} ${s.id}`).toBeTruthy();
        expect(names[s.id]).not.toMatch(/\d/);
      });
      Object.values(pieces).forEach((p) => expect(p).not.toMatch(/\d/));
    }
  });
});
