// Accès au stockage local, avec repli silencieux en mémoire.
// Si localStorage est indisponible (navigation privée, quota), l'application
// reste utilisable pour la session en cours (PRD, résilience).

const memory = new Map();
let backend; // undefined = pas encore résolu ; null = indisponible

function resolve() {
  if (backend !== undefined) return backend;
  try {
    const ls = globalThis.localStorage;
    const probe = '__ateliers_maths_probe__';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    backend = ls;
  } catch {
    backend = null;
  }
  return backend;
}

export function readRaw(key) {
  const ls = resolve();
  if (ls) {
    try {
      const v = ls.getItem(key);
      if (v !== null) return v;
    } catch {
      /* repli mémoire */
    }
  }
  return memory.has(key) ? memory.get(key) : null;
}

export function writeRaw(key, value) {
  memory.set(key, value);
  const ls = resolve();
  if (!ls) return;
  try {
    ls.setItem(key, value);
  } catch {
    /* quota dépassé : on garde la copie mémoire */
  }
}

export function readJSON(key, fallback) {
  const raw = readRaw(key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  writeRaw(key, JSON.stringify(value));
}

export function isPersistent() {
  return resolve() !== null;
}

export const defaultStore = { readRaw, writeRaw, readJSON, writeJSON };

/** Magasin en mémoire, utilisé par les tests. */
export function createMemoryStore(initial = {}) {
  const data = new Map(Object.entries(initial));
  const store = {
    readRaw: (k) => (data.has(k) ? data.get(k) : null),
    writeRaw: (k, v) => data.set(k, String(v)),
    readJSON(k, fallback) {
      const raw = store.readRaw(k);
      if (raw === null) return fallback;
      try {
        return JSON.parse(raw);
      } catch {
        return fallback;
      }
    },
    writeJSON: (k, v) => data.set(k, JSON.stringify(v)),
    _data: data,
  };
  return store;
}
