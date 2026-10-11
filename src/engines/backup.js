// Sauvegarde : export et import de la progression (fichier ou code), sans chiffre visible.

import { adaptiveEngine } from './adaptiveEngine.js';
import { gardenEngine } from './gardenEngine.js';
import { loadProfiles, loadSettings, saveProfiles, saveSettings } from './profiles.js';

const FORMAT = 'ateliers-maths';

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
    throw new Error('Cette sauvegarde est illisible.');
  }
  if (data?.format !== FORMAT || !data.jardin || !data.profils) {
    throw new Error('Ce fichier n’est pas une sauvegarde Ateliers Maths.');
  }
  gardenEngine.restore(data.jardin);
  adaptiveEngine.restore(data.adaptation);
  saveProfiles(data.profils);
  if (data.reglages) saveSettings(data.reglages);
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
