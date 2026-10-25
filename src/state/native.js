// Application Android (Capacitor) : ce que la vue web du téléphone ne sait pas faire seule.
// - La voix : la vue web d'Android n'a pas de synthèse vocale ; on passe par le moteur du
//   téléphone, avec la même règle RGPD (voix locale seulement, sauf accord de l'adulte).
// - La sauvegarde : pas de téléchargement dans une application ; on écrit le fichier puis
//   on ouvre le partage d'Android (Drive, e-mail, Fichiers…), à l'initiative de l'adulte.
// Dans un navigateur, rien de tout cela n'est utilisé.

import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export const isNative = () => Capacitor.isNativePlatform();

const ADD = 1; // QueueStrategy.Add : les phrases s'enchaînent
let voicesCache = null;

/**
 * Indice de la voix à utiliser dans la liste du téléphone.
 * undefined : liste vide (voix par défaut) ; false : aucune voix permise (on se tait).
 */
export function nativeVoiceIndex(voices, lang, target, online) {
  if (!voices.length) return undefined;
  const indexed = voices.map((v, i) => ({ v, i })).filter(({ v }) => v.lang?.toLowerCase().replace('_', '-').startsWith(lang));
  const allowed = indexed.filter(({ v }) => online || v.localService !== false);
  if (!allowed.length) return false;
  const exact = allowed.find(({ v }) => v.lang.toLowerCase().replace('_', '-') === target);
  return (exact || allowed[0]).i;
}

/** Lit les phrases avec le moteur vocal du téléphone. Ne lève jamais d'erreur. */
export async function speakNative(parts, { lang, target, online }) {
  try {
    await TextToSpeech.stop();
    voicesCache ??= (await TextToSpeech.getSupportedVoices()).voices || [];
    const voice = nativeVoiceIndex(voicesCache, lang, target, online);
    if (voice === false) return;
    for (const { text, rate, pitch } of parts) {
      TextToSpeech.speak({ text, lang: target, rate, pitch, voice, queueStrategy: ADD }).catch(() => {});
    }
  } catch {
    /* pas de moteur vocal : silencieux */
  }
}

export function stopNative() {
  TextToSpeech.stop().catch(() => {});
}

/** Enregistre la sauvegarde puis ouvre le partage d'Android. */
export async function shareBackupFile(fileName, json, title) {
  const [{ Directory, Encoding, Filesystem }, { Share }] = await Promise.all([
    import('@capacitor/filesystem'),
    import('@capacitor/share'),
  ]);
  const { uri } = await Filesystem.writeFile({ path: fileName, data: json, directory: Directory.Cache, encoding: Encoding.UTF8 });
  await Share.share({ title, files: [uri] });
}

/** Bouton retour d'Android : revenir à l'accueil, ou quitter depuis l'accueil. */
export async function onBackButton(handler) {
  if (!isNative()) return () => {};
  const { App } = await import('@capacitor/app');
  const listener = await App.addListener('backButton', () => {
    if (!handler()) App.minimizeApp();
  });
  return () => listener.remove();
}
