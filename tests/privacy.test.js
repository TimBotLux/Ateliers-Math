import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { securityHeaders } from '../vite.config.js';
import { createAdaptiveEngine } from '../src/engines/adaptiveEngine.js';
import { repairStoredData } from '../src/engines/backup.js';
import { GARDEN_KEY, createGardenEngine } from '../src/engines/gardenEngine.js';
import { STORAGE_KEYS, eraseAllData, forgetChild } from '../src/engines/privacy.js';
import { DEFAULT_SETTINGS, PROFILES_KEY, SEEN_KEY, loadProfiles, saveProfiles } from '../src/engines/profiles.js';
import { createMemoryStore } from '../src/engines/storage.js';
import { allowedVoices } from '../src/state/media.js';

const twoChildren = (store) => {
  saveProfiles({
    children: [
      { id: 'a', name: 'Léa', path: '4-6', theme: 'fees', color: 0 },
      { id: 'b', name: 'Tom', path: '7-9', theme: 'gare', color: 1 },
    ],
    activeId: 'a',
  }, store);
  const garden = createGardenEngine(store);
  const adaptive = createAdaptiveEngine(store);
  for (const id of ['a', 'b']) {
    garden.grow(id, ['calcul']);
    adaptive.record(id, 'compte', true);
  }
  store.writeJSON(SEEN_KEY, { a: {}, b: {} });
  return { garden, adaptive };
};

describe('RGPD : effacement des données', () => {
  it("efface un enfant partout, sans toucher aux autres", () => {
    const store = createMemoryStore();
    const engines = twoChildren(store);
    forgetChild('a', { store, ...engines });
    const profiles = loadProfiles(store);
    expect(profiles.children.map((c) => c.id)).toEqual(['b']);
    expect(profiles.activeId).toBe('b');
    expect(Object.keys(store.readJSON(GARDEN_KEY).children)).toEqual(['b']);
    expect(Object.keys(engines.adaptive.snapshot())).toEqual(['b']);
    expect(Object.keys(store.readJSON(SEEN_KEY))).toEqual(['b']);
    expect(JSON.stringify([...store._data.values()])).not.toContain('Léa');
  });

  it("efface toutes les clés de l'application", () => {
    const store = createMemoryStore({ autreSite: 'garder' });
    twoChildren(store);
    store.writeRaw('jardinMathsTotal', '12');
    eraseAllData(store);
    for (const key of STORAGE_KEYS) expect(store.readRaw(key)).toBeNull();
    expect(store.readRaw('autreSite')).toBe('garder');
  });

  it('répare des données enregistrées abîmées au lieu de bloquer', () => {
    const store = createMemoryStore({
      [PROFILES_KEY]: JSON.stringify({ children: [{ id: 'a', name: 42 }, { id: 'b', name: 'Tom', path: '7-9' }] }),
      [GARDEN_KEY]: JSON.stringify({ version: 2, children: { b: { practice: null } } }),
    });
    repairStoredData(store);
    expect(loadProfiles(store).children.map((c) => c.id)).toEqual(['b']);
    expect(store.readJSON(GARDEN_KEY).children.b.practice.calcul).toBe(0);
  });
});

describe('RGPD : voix de synthèse', () => {
  const voices = [
    { name: 'Microsoft Henri Online (Natural)', localService: false },
    { name: 'Microsoft Paul', localService: true },
    { name: 'Google français', localService: false },
  ];

  it("n'utilise par défaut que les voix de l'appareil", () => {
    expect(DEFAULT_SETTINGS.voixEnLigne).toBe(false);
    expect(allowedVoices(voices, false).map((v) => v.name)).toEqual(['Microsoft Paul']);
  });

  it('autorise les voix en ligne seulement si un adulte le choisit', () => {
    expect(allowedVoices(voices, true)).toHaveLength(3);
  });
});

describe('RGPD : rien ne sort de l’appareil', () => {
  it("la page ne charge aucune ressource externe (polices comprises)", () => {
    for (const file of ['index.html', 'galerie.html', 'src/styles.css', 'src/fonts/fonts.css']) {
      expect(readFileSync(file, 'utf8'), file).not.toMatch(/(src|href)=["']?https?:|url\(["']?https?:|@import/i);
    }
  });

  it("la politique de contenu n'autorise que le script de la page et aucune connexion", () => {
    const headers = securityHeaders('<html><script type="module" crossorigin>console.log(1)</script></html>');
    expect(headers).toMatch(/default-src 'none'/);
    expect(headers).toMatch(/script-src 'sha256-[A-Za-z0-9+/=]+'/);
    expect(headers).not.toMatch(/connect-src|unsafe-eval|script-src[^;]*unsafe-inline/);
    expect(headers).toMatch(/frame-ancestors 'none'/);
  });
});
