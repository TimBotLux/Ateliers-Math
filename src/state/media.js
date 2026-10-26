// Son et voix : activables, l'application fonctionne sans eux.

import { getLang, speechLang, t } from '../i18n/index.js';
import { isNative, speakNative, stopNative } from './native.js';

// Quatre personnages de voix, réglables dans l'Espace adulte ; par défaut la « Conteuse »,
// une voix off posée et chaleureuse. Fluidité : chaque texte est lu d'un seul tenant
// (le moteur enchaîne les phrases avec une intonation naturelle, sans pause ni saut de hauteur)
// et la hauteur reste proche de la voix réelle (au-delà de ×1,3, elle devient métallique).
// Les voix « Natural » (Edge) et Google sont plus vivantes que les voix système, mais elles
// sont hébergées : les phrases lues (prénom compris) partent chez leur éditeur. Elles ne sont
// donc utilisées que si un adulte les autorise (réglage voixEnLigne, RGPD) ; sinon on ne garde
// que les voix de l'appareil (localService).
// Voix préférées par langue et par genre, de la plus naturelle à la plus courante.
const VOICES = {
  fr: {
    male: [/henri.*natural/i, /remy.*natural|rémy.*natural/i, /google.*fran/i, /thomas/i, /paul/i, /nicolas/i, /daniel/i],
    female: [/denise.*natural/i, /vivienne/i, /eloise.*natural/i, /google.*fran/i, /amélie|amelie/i, /audrey/i, /marie/i, /julie/i, /hortense/i],
  },
  // Anglais britannique (Edge « Natural », Google, Apple, Microsoft).
  en: {
    male: [/ryan.*natural/i, /thomas.*natural/i, /google uk english male/i, /daniel/i, /arthur/i, /oliver/i, /george/i],
    female: [/sonia.*natural/i, /libby.*natural/i, /maisie.*natural/i, /google uk english female/i, /serena/i, /kate/i, /martha/i, /hazel/i, /susan/i],
  },
};
// Voix du moteur vocal d'Android : Google (fr-fr-x-fra…, en-gb-x-gba…) et Samsung (…SMTf00 / SMTm00).
export const ANDROID_VOICES = {
  fr: { female: [/x-(fra|frc|vlf)/i, /smtf/i], male: [/x-(frb|frd)/i, /smtm/i] },
  en: { female: [/x-(gba|gbc|gbg)/i, /smtf/i], male: [/x-(gbb|gbd|rjs)/i, /smtm/i] },
};
const MALE = 'male';
const FEMALE = 'female';

/** Volume réglé dans l'Espace adulte (voix et sons), de VOLUME_MIN à 1 ; pas de 0 : pour se taire, on coupe. */
export const VOLUME_MIN = 0.1;
export const VOLUME_STEP = 0.1;
export const clampVolume = (v) => (Number.isFinite(v) ? Math.round(Math.min(1, Math.max(VOLUME_MIN, v)) * 10) / 10 : 1);

/** Hauteur maximale : au-delà, la voix de synthèse perd son naturel. */
export const MAX_PITCH = 1.3;

export const VOICE_PRESETS = {
  conteuse: {
    voices: FEMALE,
    '4-6': { rate: 0.94, pitch: 1.06 },
    '7-9': { rate: 0.98, pitch: 1.03 },
    '10-12': { rate: 1.0, pitch: 1.0 },
  },
  garcon: {
    voices: MALE,
    '4-6': { rate: 1.0, pitch: 1.3 },
    '7-9': { rate: 1.03, pitch: 1.22 },
    '10-12': { rate: 1.05, pitch: 1.12 },
  },
  fille: {
    voices: FEMALE,
    '4-6': { rate: 1.0, pitch: 1.25 },
    '7-9': { rate: 1.03, pitch: 1.18 },
    '10-12': { rate: 1.05, pitch: 1.1 },
  },
  douce: {
    voices: FEMALE,
    '4-6': { rate: 0.82, pitch: 1.15 },
    '7-9': { rate: 0.9, pitch: 1.08 },
    '10-12': { rate: 0.95, pitch: 1.0 },
  },
};
export const DEFAULT_VOICE = 'conteuse';

const chosen = {};

/** Voix permises : toutes si les voix en ligne sont autorisées, sinon celles de l'appareil. */
export const allowedVoices = (voices, online) => (online ? voices : voices.filter((v) => v.localService !== false));

/**
 * Voix du personnage dans la langue courante ; à défaut, la première voix permise de la langue.
 * null : voix pas encore chargées (voix par défaut) ; false : aucune voix permise (on se tait).
 */
function pickVoice(presetId, online) {
  const lang = getLang();
  const key = `${lang}:${presetId}:${online ? 'en-ligne' : 'locale'}`;
  if (chosen[key]) return chosen[key];
  const target = speechLang().toLowerCase(); // fr-fr ou en-gb
  const all = (globalThis.speechSynthesis?.getVoices?.() || []).filter((v) => v.lang?.toLowerCase().startsWith(lang));
  if (!all.length) return null; // les voix arrivent parfois plus tard
  const voices = allowedVoices(all, online);
  if (!voices.length) return false;
  const local = (v) => v.lang.toLowerCase().replace('_', '-') === target;
  for (const pattern of VOICES[lang][VOICE_PRESETS[presetId].voices]) {
    const found = voices.filter((v) => pattern.test(v.name)).sort((a, b) => local(b) - local(a))[0];
    if (found) return (chosen[key] = found);
  }
  return (chosen[key] = voices.find(local) || voices[0]);
}

try {
  globalThis.speechSynthesis?.addEventListener?.('voiceschanged', () => {
    for (const k of Object.keys(chosen)) delete chosen[k];
  });
} catch {
  /* pas de voix */
}

/** Texte prêt à lire d'un seul tenant : espaces réguliers, pas de blanc parasite. */
export const flowText = (text) => String(text).replace(/\s+/g, ' ').trim();

export function speak(text, { path = '4-6', voice = DEFAULT_VOICE, online = false, volume = 1 } = {}) {
  try {
    if (!text) return;
    const preset = VOICE_PRESETS[voice] || VOICE_PRESETS[DEFAULT_VOICE];
    const style = preset[path] || preset['4-6'];
    const presetId = voice in VOICE_PRESETS ? voice : DEFAULT_VOICE;
    const line = flowText(text);
    if (!line) return;
    // Application Android : moteur vocal du téléphone (la vue web n'a pas de synthèse vocale).
    if (isNative()) {
      speakNative([{ text: line, rate: style.rate, pitch: style.pitch, volume: clampVolume(volume) }], {
        lang: getLang(),
        target: speechLang(),
        online,
        prefer: ANDROID_VOICES[getLang()]?.[VOICE_PRESETS[presetId].voices] || [],
      });
      return;
    }
    const synth = globalThis.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const v = pickVoice(presetId, online);
    if (v === false) return; // seules des voix en ligne existent et elles ne sont pas autorisées
    const u = new SpeechSynthesisUtterance(line);
    u.lang = speechLang();
    u.rate = style.rate;
    u.pitch = style.pitch;
    u.volume = clampVolume(volume);
    if (v) u.voice = v;
    synth.speak(u);
  } catch {
    /* pas de voix : silencieux */
  }
}

// Encouragements variés après une bonne réponse, avec ou sans le prénom de l'enfant.
export const randomCheer = (name = '') => {
  const cheers = t('feedback.cheers');
  return cheers[Math.floor(Math.random() * cheers.length)]({ name: name.trim() });
};

export function stopSpeaking() {
  try {
    if (isNative()) stopNative();
    globalThis.speechSynthesis?.cancel();
  } catch {
    /* rien */
  }
}

let ctx;
const NOTES = {
  joie: [[660, 0], [880, 0.12], [1175, 0.24]],
  observe: [[520, 0], [440, 0.16]],
  tap: [[700, 0]],
  pousse: [[523, 0], [659, 0.1], [784, 0.2], [1046, 0.3]],
};

export function playSound(kind, volume = 1) {
  try {
    const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;
    for (const [freq, at] of NOTES[kind] || NOTES.tap) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + at);
      gain.gain.exponentialRampToValueAtTime(0.18 * clampVolume(volume), now + at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + at);
      osc.stop(now + at + 0.25);
    }
  } catch {
    /* pas de son : silencieux */
  }
}
