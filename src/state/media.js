// Son et voix : activables, l'application fonctionne sans eux.

import { getLang, speechLang, t } from '../i18n/index.js';

// Trois personnages de voix, réglables dans l'Espace adulte.
// La synthèse du navigateur ne joue pas d'émotion : l'entrain vient du débit,
// de la hauteur et des phrases exclamatives (relevées automatiquement).
// Les voix « Natural » (Edge) et Google sont plus vivantes que les voix système, mais elles
// sont hébergées : les phrases lues (prénom compris) partent chez leur éditeur. Elles ne sont
// donc utilisées que si un adulte les autorise (réglage voixEnLigne, RGPD) ; sinon on ne garde
// que les voix de l'appareil (localService).
// Voix préférées par langue et par genre, de la plus naturelle à la plus courante.
const VOICES = {
  fr: {
    male: [/henri.*natural/i, /remy.*natural|rémy.*natural/i, /google.*fran/i, /thomas/i, /paul/i, /nicolas/i, /daniel/i],
    female: [/eloise.*natural/i, /denise.*natural/i, /vivienne/i, /google.*fran/i, /amélie|amelie/i, /audrey/i, /marie/i, /julie/i, /hortense/i],
  },
  // Anglais britannique (Edge « Natural », Google, Apple, Microsoft).
  en: {
    male: [/ryan.*natural/i, /thomas.*natural/i, /google uk english male/i, /daniel/i, /arthur/i, /oliver/i, /george/i],
    female: [/sonia.*natural/i, /libby.*natural/i, /maisie.*natural/i, /google uk english female/i, /serena/i, /kate/i, /martha/i, /hazel/i, /susan/i],
  },
};
const MALE = 'male';
const FEMALE = 'female';

export const VOICE_PRESETS = {
  garcon: {
    voices: MALE,
    '4-6': { rate: 1.0, pitch: 1.6 },
    '7-9': { rate: 1.05, pitch: 1.45 },
    '10-12': { rate: 1.08, pitch: 1.25 },
  },
  fille: {
    voices: FEMALE,
    '4-6': { rate: 1.0, pitch: 1.4 },
    '7-9': { rate: 1.05, pitch: 1.3 },
    '10-12': { rate: 1.08, pitch: 1.2 },
  },
  douce: {
    voices: FEMALE,
    '4-6': { rate: 0.82, pitch: 1.15 },
    '7-9': { rate: 0.9, pitch: 1.08 },
    '10-12': { rate: 0.95, pitch: 1.0 },
  },
};
export const DEFAULT_VOICE = 'garcon';

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

/** Découpe le texte en phrases : chaque phrase reçoit sa propre intonation. */
const sentences = (text) => text.match(/[^.!?…]+[.!?…]*/g)?.map((s) => s.trim()).filter(Boolean) || [text];

export function speak(text, { path = '4-6', voice = DEFAULT_VOICE, online = false } = {}) {
  try {
    const synth = globalThis.speechSynthesis;
    if (!synth || !text) return;
    synth.cancel();
    const preset = VOICE_PRESETS[voice] || VOICE_PRESETS[DEFAULT_VOICE];
    const style = preset[path] || preset['4-6'];
    const v = pickVoice(voice in VOICE_PRESETS ? voice : DEFAULT_VOICE, online);
    if (v === false) return; // seules des voix en ligne existent et elles ne sont pas autorisées
    for (const sentence of sentences(text)) {
      const excited = sentence.endsWith('!');
      const u = new SpeechSynthesisUtterance(sentence);
      u.lang = speechLang();
      u.rate = style.rate + (excited ? 0.05 : 0);
      u.pitch = Math.min(2, style.pitch + (excited ? 0.15 : 0));
      if (v) u.voice = v;
      synth.speak(u);
    }
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

export function playSound(kind) {
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
      gain.gain.exponentialRampToValueAtTime(0.18, now + at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + at + 0.22);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + at);
      osc.stop(now + at + 0.25);
    }
  } catch {
    /* pas de son : silencieux */
  }
}
