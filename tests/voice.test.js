import { describe, expect, it } from 'vitest';
import { DEFAULT_SETTINGS } from '../src/engines/profiles.js';
import { _dicts } from '../src/i18n/index.js';
import { ANDROID_VOICES, DEFAULT_VOICE, MAX_PITCH, VOICE_PRESETS, VOLUME_MIN, clampVolume, flowText } from '../src/state/media.js';
import { sanitizeBackup } from '../src/engines/backupSchema.js';
import { nativeVoiceIndex } from '../src/state/native.js';

describe('Voix off', () => {
  it('la Conteuse est la voix par défaut, nommée dans les deux langues', () => {
    expect(DEFAULT_VOICE).toBe('conteuse');
    expect(DEFAULT_SETTINGS.personnage).toBe('conteuse');
    for (const id of Object.keys(VOICE_PRESETS)) {
      expect(_dicts.fr.adult.voices[id], id).toHaveLength(2);
      expect(_dicts.en.adult.voices[id], id).toHaveLength(2);
    }
  });

  it('garde une hauteur et un débit naturels pour chaque voix et chaque âge', () => {
    for (const [id, preset] of Object.entries(VOICE_PRESETS)) {
      for (const path of ['4-6', '7-9', '10-12']) {
        expect(preset[path].pitch, `${id} ${path}`).toBeLessThanOrEqual(MAX_PITCH);
        expect(preset[path].rate, `${id} ${path}`).toBeGreaterThanOrEqual(0.8);
        expect(preset[path].rate, `${id} ${path}`).toBeLessThanOrEqual(1.1);
      }
    }
  });

  it("lit le texte d'un seul tenant, sans blancs parasites", () => {
    expect(flowText('  Bravo !\n  Tu as   trouvé.  ')).toBe('Bravo ! Tu as trouvé.');
  });

  it('choisit sur Android une voix féminine locale pour la Conteuse', () => {
    const voices = [
      { lang: 'fr-FR', name: 'fr-fr-x-frd-local', localService: true },
      { lang: 'fr-CA', name: 'fr-ca-x-caa-local', localService: true },
      { lang: 'fr-FR', name: 'fr-fr-x-frc-network', localService: false },
      { lang: 'fr-FR', name: 'fr-fr-x-fra-local', localService: true },
    ];
    expect(nativeVoiceIndex(voices, 'fr', 'fr-fr', false, ANDROID_VOICES.fr.female)).toBe(3);
    expect(nativeVoiceIndex(voices, 'fr', 'fr-fr', false, ANDROID_VOICES.fr.male)).toBe(0);
    // Aucune voix du bon genre : on garde une voix locale dans la bonne langue plutôt que de se taire.
    expect(nativeVoiceIndex(voices.slice(0, 2), 'fr', 'fr-fr', false, ANDROID_VOICES.fr.female)).toBe(0);
  });
});

describe('Volume', () => {
  it('borne le volume entre le minimum et le maximum, par pas de 0,1', () => {
    expect(DEFAULT_SETTINGS.volume).toBe(1);
    expect(clampVolume(0.55)).toBe(0.6);
    expect(clampVolume(3)).toBe(1);
    expect(clampVolume(0)).toBe(VOLUME_MIN);
    expect(clampVolume(-1)).toBe(VOLUME_MIN);
    expect(clampVolume('fort')).toBe(1);
    expect(clampVolume(NaN)).toBe(1);
  });

  it("corrige un volume invalide dans une sauvegarde importée", () => {
    const base = { format: 'ateliers-maths', profils: { children: [] }, jardin: { version: 2 } };
    expect(sanitizeBackup({ ...base, reglages: { volume: 0.4 } }).reglages.volume).toBe(0.4);
    expect(sanitizeBackup({ ...base, reglages: { volume: 50 } }).reglages.volume).toBe(1);
    expect(sanitizeBackup({ ...base, reglages: { volume: 'max' } }).reglages.volume).toBe(1);
  });
});
