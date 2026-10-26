import { describe, expect, it } from 'vitest';
import { ZONE_IDS } from '../src/data/zones.js';
import { importProgress } from '../src/engines/backup.js';
import { BACKUP_FORMAT, NAME_MAX, isSafeId, sanitizeBackup } from '../src/engines/backupSchema.js';
import { DEFAULT_SETTINGS } from '../src/engines/profiles.js';

const valid = () => ({
  format: BACKUP_FORMAT,
  version: 1,
  profils: { children: [{ id: 'enfant-a1', name: 'Léa', path: '4-6', theme: 'gare', color: 2 }], activeId: 'enfant-a1' },
  reglages: { sons: false, voix: true, anim: false, personnage: 'fille', langue: 'en', voixEnLigne: true, volume: 0.7 },
  jardin: { version: 2, migrated: true, legacy: { present: false, owner: null }, children: { 'enfant-a1': { seed: 42, practice: { calcul: 7 } } } },
  adaptation: { 'enfant-a1': { compte: { tier: 2, wins: 1, misses: 0, last: 1700000000000 } } },
});

describe('Import de sauvegarde', () => {
  it('garde intacte une sauvegarde correcte', () => {
    const clean = sanitizeBackup(valid());
    expect(clean.profils).toEqual(valid().profils);
    expect(clean.reglages).toEqual(valid().reglages);
    expect(clean.jardin.children['enfant-a1'].practice.calcul).toBe(7);
    expect(Object.keys(clean.jardin.children['enfant-a1'].practice)).toEqual(ZONE_IDS);
    expect(clean.adaptation['enfant-a1'].compte).toEqual({ tier: 2, wins: 1, misses: 0, last: 1700000000000 });
  });

  it("refuse ce qui n'est pas une sauvegarde de l'application", () => {
    for (const data of [null, 42, [], {}, { format: 'autre' }, { ...valid(), profils: null }, { ...valid(), jardin: { version: 1 } }]) {
      expect(sanitizeBackup(data)).toBeNull();
    }
  });

  it('écarte les profils mal formés au lieu de planter', () => {
    const data = valid();
    data.profils.children.push(
      { id: 'b', name: { piege: true }, path: '4-6' },
      { id: '__proto__', name: 'Malin', path: '4-6' },
      { id: 'c', name: '   ', path: '7-9' },
      { id: 'd', name: 'Sans parcours', path: '99' },
      { id: 'enfant-a1', name: 'Doublon', path: '7-9' },
      'pas un objet',
    );
    expect(sanitizeBackup(data).profils.children.map((c) => c.id)).toEqual(['enfant-a1']);
  });

  it('borne le prénom et corrige thème, couleur et enfant actif', () => {
    const data = valid();
    data.profils.children[0] = { id: 'x', name: 'A'.repeat(500), path: '7-9', theme: '<script>', color: 999 };
    data.profils.activeId = 'inconnu';
    const { profils } = sanitizeBackup(data);
    expect(profils.children[0].name).toHaveLength(NAME_MAX);
    expect(profils.children[0].theme).toBe('fees');
    expect(profils.children[0].color).toBe(0);
    expect(profils.activeId).toBe('x');
  });

  it("ne garde que les réglages connus, avec des valeurs valides", () => {
    const data = valid();
    data.reglages = { sons: 'oui', personnage: 'pirate', langue: 'xx', espion: true, voixEnLigne: 1 };
    expect(sanitizeBackup(data).reglages).toEqual(DEFAULT_SETTINGS);
  });

  it('nettoie le jardin : compteurs négatifs, zones inconnues, enfants absents des profils', () => {
    const data = valid();
    data.jardin.children['enfant-a1'].practice = { calcul: -3, logique: 'beaucoup', inconnue: 9, memoire: 1e12 };
    data.jardin.children.fantome = { seed: 1, practice: {} };
    data.jardin.children['enfant-a1'].seed = 'graine';
    data.jardin.legacy = { present: 'oui', owner: 'fantome' };
    const { jardin } = sanitizeBackup(data);
    const p = jardin.children['enfant-a1'].practice;
    expect([p.calcul, p.logique, p.inconnue, p.memoire]).toEqual([0, 0, undefined, 1e6]);
    expect(jardin.children.fantome).toBeUndefined();
    expect(jardin.children['enfant-a1'].seed).toBe(0);
    expect(jardin.legacy).toEqual({ present: false, owner: null });
  });

  it("n'altère pas les objets JavaScript (pollution de prototype)", () => {
    const text = `{"format":"${BACKUP_FORMAT}","profils":{"children":[{"id":"a","name":"A","path":"4-6"}]},
      "jardin":{"version":2,"children":{"a":{"practice":{}}}},
      "adaptation":{"a":{"__proto__":{"pollue":true},"compte":{"tier":1}}}}`;
    const clean = sanitizeBackup(JSON.parse(text));
    expect({}.pollue).toBeUndefined();
    expect(Object.keys(clean.adaptation.a)).toEqual(['compte']);
    expect(isSafeId('constructor')).toBe(false);
  });

  it('importProgress lève une erreur lisible pour un texte invalide, sans planter', () => {
    expect(() => importProgress('pas du json !')).toThrow();
    expect(() => importProgress('{"format":"autre"}')).toThrow();
    expect(() => importProgress(JSON.stringify(valid()))).not.toThrow();
  });
});
