// Son et voix : activables, l'application fonctionne sans eux.

// Trois personnages de voix, réglables dans l'Espace adulte.
// La synthèse du navigateur ne joue pas d'émotion : l'entrain vient du débit,
// de la hauteur et des phrases exclamatives (relevées automatiquement).
// Les voix « Natural » (Edge) et Google sont plus vivantes que les voix système.
const MALE = [/henri.*natural/i, /remy.*natural|rémy.*natural/i, /google.*fran/i, /thomas/i, /paul/i, /nicolas/i, /daniel/i];
const FEMALE = [/eloise.*natural/i, /denise.*natural/i, /vivienne/i, /google.*fran/i, /amélie|amelie/i, /audrey/i, /marie/i, /julie/i, /hortense/i];

export const VOICE_PRESETS = {
  garcon: {
    label: 'Garçon',
    hint: 'Une voix de petit garçon, pleine d’entrain',
    voices: MALE,
    '4-6': { rate: 1.0, pitch: 1.6 },
    '7-9': { rate: 1.05, pitch: 1.45 },
    '10-12': { rate: 1.08, pitch: 1.25 },
  },
  fille: {
    label: 'Fille',
    hint: 'Une voix de petite fille, joyeuse',
    voices: FEMALE,
    '4-6': { rate: 1.0, pitch: 1.4 },
    '7-9': { rate: 1.05, pitch: 1.3 },
    '10-12': { rate: 1.08, pitch: 1.2 },
  },
  douce: {
    label: 'Douce',
    hint: 'Une voix calme et posée',
    voices: FEMALE,
    '4-6': { rate: 0.82, pitch: 1.15 },
    '7-9': { rate: 0.9, pitch: 1.08 },
    '10-12': { rate: 0.95, pitch: 1.0 },
  },
};
export const DEFAULT_VOICE = 'garcon';

const chosen = {};

function pickVoice(presetId) {
  if (chosen[presetId]) return chosen[presetId];
  const voices = (globalThis.speechSynthesis?.getVoices?.() || []).filter((v) => v.lang?.toLowerCase().startsWith('fr'));
  if (!voices.length) return null; // les voix arrivent parfois plus tard
  const france = (v) => v.lang.toLowerCase() === 'fr-fr';
  for (const pattern of VOICE_PRESETS[presetId].voices) {
    const found = voices.filter((v) => pattern.test(v.name)).sort((a, b) => france(b) - france(a))[0];
    if (found) return (chosen[presetId] = found);
  }
  return (chosen[presetId] = voices[0]);
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

export function speak(text, { path = '4-6', voice = DEFAULT_VOICE } = {}) {
  try {
    const synth = globalThis.speechSynthesis;
    if (!synth || !text) return;
    synth.cancel();
    const preset = VOICE_PRESETS[voice] || VOICE_PRESETS[DEFAULT_VOICE];
    const style = preset[path] || preset['4-6'];
    const v = pickVoice(voice in VOICE_PRESETS ? voice : DEFAULT_VOICE);
    for (const sentence of sentences(text)) {
      const excited = sentence.endsWith('!');
      const u = new SpeechSynthesisUtterance(sentence);
      u.lang = 'fr-FR';
      u.rate = style.rate + (excited ? 0.05 : 0);
      u.pitch = Math.min(2, style.pitch + (excited ? 0.15 : 0));
      if (v) u.voice = v;
      synth.speak(u);
    }
  } catch {
    /* pas de voix : silencieux */
  }
}

// Encouragements variés après une bonne réponse, avec le prénom de l'enfant.
const CHEERS = [
  (n) => `Bravo ${n} !`,
  (n) => `Super, ${n} !`,
  (n) => `Génial, ${n} !`,
  (n) => `Trop fort, ${n} !`,
  (n) => `Oui ${n}, c’est ça !`,
  (n) => `Bien joué, ${n} !`,
];
export const randomCheer = (name = '') => {
  const line = CHEERS[Math.floor(Math.random() * CHEERS.length)](name.trim());
  return line.replace(/\s+,/g, ',').replace(/\s+!/g, ' !').replace(/,\s*!/g, ' !').replace(/\s{2,}/g, ' ');
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
