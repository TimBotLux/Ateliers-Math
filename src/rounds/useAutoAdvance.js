import { useCallback, useEffect, useRef } from 'react';

/** Passe à la manche suivante après une courte pause, une seule fois. */
export function useAutoAdvance(onDone, delay = 1400) {
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  return useCallback(() => {
    if (timer.current) return;
    timer.current = setTimeout(onDone, delay);
  }, [onDone, delay]);
}
