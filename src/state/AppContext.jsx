import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { adaptiveEngine } from '../engines/adaptiveEngine.js';
import { gardenEngine } from '../engines/gardenEngine.js';
import { loadProfiles, loadSettings, newChild, saveProfiles, saveSettings } from '../engines/profiles.js';
import { PATHS } from '../data/zones.js';
import { themeFor } from '../garden-themes/index.js';
import { playSound, randomCheer, speak as speakText, stopSpeaking } from './media.js';

const AppContext = createContext(null);

/** Un encouragement à voix haute toutes les 3 bonnes réponses. */
export const CHEER_EVERY = 3;

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduce, setReduce] = useState(() => typeof matchMedia === 'function' && matchMedia(query).matches);
  useEffect(() => {
    if (typeof matchMedia !== 'function') return undefined;
    const mq = matchMedia(query);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduce;
}

export function AppProvider({ children }) {
  const [profiles, setProfiles] = useState(loadProfiles);
  const [settings, setSettings] = useState(loadSettings);
  const [gardenTick, setGardenTick] = useState(0);
  const [route, setRoute] = useState({ name: 'home' });
  const [butterfly, setButterfly] = useState(0);
  const systemReduce = usePrefersReducedMotion();
  const reduceMotion = settings.anim || systemReduce;

  const child = profiles.children.find((c) => c.id === profiles.activeId) || profiles.children[0] || null;
  const path = PATHS[child?.path] || PATHS['4-6'];

  const updateProfiles = useCallback((fn) => {
    setProfiles((prev) => {
      const next = fn(prev);
      saveProfiles(next);
      return next;
    });
  }, []);

  const addChild = useCallback(
    (name, childPath, childTheme) => {
      // Créé hors de la fonction de mise à jour, qui peut être rejouée (StrictMode).
      const c = newChild(name, childPath, profiles.children.length, childTheme);
      gardenEngine.ensureChild(c.id);
      updateProfiles((p) => ({ children: [...p.children, c], activeId: c.id }));
    },
    [updateProfiles, profiles.children.length],
  );

  const selectChild = useCallback((id) => updateProfiles((p) => ({ ...p, activeId: id })), [updateProfiles]);

  const updateChild = useCallback(
    (changes) =>
      updateProfiles((p) => ({
        ...p,
        children: p.children.map((c) => (c.id === child?.id ? { ...c, ...changes } : c)),
      })),
    [updateProfiles, child?.id],
  );
  const setChildPath = useCallback((childPath) => updateChild({ path: childPath }), [updateChild]);
  // Changer d'univers ne change rien à la progression : seul le dessin change.
  const setChildTheme = useCallback((childTheme) => updateChild({ theme: childTheme }), [updateChild]);
  const gardenTheme = themeFor(child?.theme, path.id);

  const toggleSetting = useCallback((key) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveSettings(next);
      if (key === 'voix' && !next.voix) stopSpeaking();
      return next;
    });
  }, []);

  const stages = useMemo(
    () => (child ? gardenEngine.stages(child.id) : {}),
    // gardenTick : recalcul après chaque croissance
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [child?.id, gardenTick],
  );

  /** Fait grandir les zones de l'activité ; renvoie les zones qui ont grandi. */
  const growGarden = useCallback(
    (skills) => {
      if (!child) return [];
      const zones = gardenEngine.grow(child.id, skills);
      setGardenTick((t) => t + 1);
      return zones;
    },
    [child],
  );

  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const pathRef = useRef(path.id);
  pathRef.current = path.id;

  // Voix choisie dans l'Espace adulte, réglée selon l'âge du parcours.
  const speak = useCallback((text) => {
    if (settingsRef.current.voix) speakText(text, { path: pathRef.current, voice: settingsRef.current.personnage });
  }, []);

  /**
   * Encouragement après une bonne réponse : à voix haute seulement toutes les
   * CHEER_EVERY bonnes réponses (entre-temps, le son joyeux suffit), et avec le
   * prénom une fois sur deux seulement, pour qu'il ne devienne pas une rengaine.
   */
  const childName = child?.name || '';
  const cheers = useRef({ correct: 0, spoken: 0 });
  const cheer = useCallback(() => {
    const c = cheers.current;
    c.correct += 1;
    if (c.correct % CHEER_EVERY !== 0) return;
    c.spoken += 1;
    speak(randomCheer(c.spoken % 2 === 1 ? childName : ''));
  }, [speak, childName]);

  const setVoice = useCallback((personnage) => {
    setSettings((prev) => {
      const next = { ...prev, personnage };
      saveSettings(next);
      return next;
    });
  }, []);

  const sound = useCallback((kind) => {
    if (settingsRef.current.sons) playSound(kind);
  }, []);

  // Papillon cosmétique, parfois, lors d'une bonne réponse.
  const maybeButterfly = useCallback(() => {
    if (Math.random() < 0.3) setButterfly((b) => b + 1);
  }, []);

  const go = useCallback((name, params = {}) => {
    stopSpeaking();
    setRoute({ name, ...params });
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  }, []);

  const value = {
    profiles, child, path, addChild, selectChild, setChildPath, setChildTheme, gardenTheme,
    settings, toggleSetting, reduceMotion,
    stages, growGarden, gardenTick, adaptive: adaptiveEngine, garden: gardenEngine,
    speak, cheer, setVoice, sound, butterfly, maybeButterfly,
    route, go,
    reload: () => {
      setProfiles(loadProfiles());
      setSettings(loadSettings());
      setGardenTick((t) => t + 1);
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}
