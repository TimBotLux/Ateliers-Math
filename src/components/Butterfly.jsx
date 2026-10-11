// Papillon cosmétique qui traverse l'écran, parfois, après une bonne réponse.

import { useEffect, useState } from 'react';
import { useApp } from '../state/AppContext.jsx';

export function Butterfly() {
  const { butterfly, reduceMotion } = useApp();
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!butterfly || reduceMotion) return undefined;
    setVisible(butterfly);
    const t = setTimeout(() => setVisible(0), 3200);
    return () => clearTimeout(t);
  }, [butterfly, reduceMotion]);

  if (!visible) return null;
  return (
    <div className="butterfly" key={visible} aria-hidden="true">
      <svg width="44" height="44" viewBox="-22 -22 44 44">
        <g className="butterfly__wings">
          <ellipse cx="-9" cy="-4" rx="10" ry="13" fill="#E8892F" transform="rotate(-25 -9 -4)" />
          <ellipse cx="9" cy="-4" rx="10" ry="13" fill="#E8892F" transform="rotate(25 9 -4)" />
          <ellipse cx="-6" cy="10" rx="6" ry="8" fill="#F2B84B" />
          <ellipse cx="6" cy="10" rx="6" ry="8" fill="#F2B84B" />
        </g>
        <rect x="-2" y="-12" width="4" height="26" rx="2" fill="#1E2B2F" />
      </svg>
    </div>
  );
}
