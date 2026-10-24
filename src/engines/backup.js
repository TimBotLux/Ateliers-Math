// Sauvegarde : export et import de la progression (fichier ou code), sans chiffre visible.

import { t } from '../i18n/index.js';
import { ADAPTIVE_KEY, adaptiveEngine } from './adaptiveEngine.js';
import { GARDEN_KEY, gardenEngine } from './gardenEngine.js';
import { BACKUP_FORMAT as FORMAT, sanitizeBackup } from './backupSchema.js';
import { PROFILES_KEY, SETTINGS_KEY, loadProfiles, loadSettings, saveProfiles, saveSettings } from './profiles.js';
import { defaultStore } from './storage.js';

export function exportProgress() {
  return {
    format: FORMAT,
    version: 1,
    savedAt: new Date().toISOString(),
    profils: loadProfiles(),
    reglages: loadSettings(),
    jardin: gardenEngine.snapshot(),
    adaptation: adaptiveEngine.snapshot(),
  };
}

const toBase64 = (text) => btoa(String.fromCharCode(...new TextEncoder().encode(text)));
const fromBase64 = (code) => new TextDecoder().decode(Uint8Array.from(atob(code), (c) => c.charCodeAt(0)));

export const exportCode = () => toBase64(JSON.stringify(exportProgress()));

/** Accepte le contenu d'un fichier JSON ou un code de sauvegarde. Lève une erreur si illisible. */
export function importProgress(text) {
  const trimmed = text.trim();
  let data;
  try {
    data = JSON.parse(trimmed.startsWith('{') ? trimmed : fromBase64(trimmed.replace(/\s+/g, '')));
  } catch {
    throw new Error(t('adult.unreadable'));
  }
  const clean = sanitizeBackup(data);
  if (!clean) throw new Error(t('adult.notOurs'));
  gardenEngine.restore(clean.jardin);
  adaptiveEngine.restore(clean.adaptation);
  saveProfiles(clean.profils);
  saveSettings(clean.reglages);
}

/**
 * Remet en forme les données enregistrées sur l'appareil (filet de sécurité après un plantage) :
 * ce qui est récupérable est gardé, le reste est écarté. Ne lève jamais d'erreur.
 */
export function repairStoredData(store = defaultStore) {
  try {
    const clean = sanitizeBackup({
      format: FORMAT,
      profils: store.readJSON(PROFILES_KEY, null),
      reglages: store.readJSON(SETTINGS_KEY, null),
      jardin: store.readJSON(GARDEN_KEY, null),
      adaptation: store.readJSON(ADAPTIVE_KEY, null),
    });
    if (clean) {
      store.writeJSON(GARDEN_KEY, clean.jardin);
      store.writeJSON(ADAPTIVE_KEY, clean.adaptation);
      store.writeJSON(PROFILES_KEY, clean.profils);
      store.writeJSON(SETTINGS_KEY, clean.reglages);
      return;
    }
    // Profils ou jardin illisibles : on repart de profils propres ; le jardin sera recréé.
    const profils = sanitizeBackup({ format: FORMAT, profils: store.readJSON(PROFILES_KEY, null), jardin: { version: 2 } })?.profils;
    store.writeJSON(PROFILES_KEY, profils || { children: [], activeId: null });
    store.writeRaw(GARDEN_KEY, '');
  } catch {
    /* stockage indisponible : rien à réparer */
  }
}

export function downloadBackup() {
  const blob = new Blob([JSON.stringify(exportProgress(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ateliers-maths-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
