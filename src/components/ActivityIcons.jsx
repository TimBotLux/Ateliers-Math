// Pictogrammes des ateliers (maquettes Explorer 4-6 ans et 7-9 ans).

const ICONS = {
  subitizing: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><rect x="5" y="5" width="44" height="44" rx="12" fill="#FFFFFF" stroke="#B85E14" strokeWidth="3" /><circle cx="17" cy="17" r="4.5" fill="#B85E14" /><circle cx="27" cy="27" r="4.5" fill="#B85E14" /><circle cx="37" cy="37" r="4.5" fill="#B85E14" /></svg>
  ),
  compte: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><path d="M6 14h42M6 27h42M6 40h42" stroke="#2F6FB0" strokeWidth="2.5" strokeLinecap="round" /><circle cx="14" cy="14" r="5" fill="#2F6FB0" /><circle cx="25" cy="14" r="5" fill="#2F6FB0" /><circle cx="14" cy="27" r="5" fill="#6FA8DC" /><circle cx="25" cy="27" r="5" fill="#6FA8DC" /><circle cx="36" cy="27" r="5" fill="#6FA8DC" /><circle cx="14" cy="40" r="5" fill="#2F6FB0" /></svg>
  ),
  compare: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><rect x="9" y="12" width="14" height="36" rx="5" fill="#A8364F" /><rect x="31" y="28" width="14" height="20" rx="5" fill="#D9617A" /></svg>
  ),
  formes: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><path d="M15 6l11 19H4z" fill="#B8860B" /><circle cx="39" cy="15" r="10" fill="#F2B84B" /><rect x="16" y="31" width="20" height="18" rx="4" fill="#E8892F" /></svg>
  ),
  calculsimple: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><circle cx="12" cy="27" r="7" fill="#B07CC6" /><path d="M27 20v14M20 27h14" stroke="#6E3D8A" strokeWidth="3.5" strokeLinecap="round" /><circle cx="42" cy="27" r="7" fill="#B07CC6" /></svg>
  ),
  panier: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><circle cx="20" cy="22" r="6" fill="#D9617A" /><circle cx="32" cy="20" r="6" fill="#E8892F" /><circle cx="26" cy="13" r="6" fill="#F2B84B" /><path d="M6 25h42l-5 22H11z" fill="#2E7D5B" /><path d="M14 33h26" stroke="#E3F0E7" strokeWidth="2.5" strokeLinecap="round" /></svg>
  ),
  suite: (
    <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true"><circle cx="8" cy="27" r="6" fill="#2F6FB0" /><rect x="18" y="21" width="12" height="12" rx="3" fill="#6FA8DC" /><circle cx="40" cy="27" r="6" fill="#2F6FB0" /><rect x="44" y="21" width="9" height="12" rx="3" fill="none" stroke="#6FA8DC" strokeWidth="2.5" strokeDasharray="3 3" /></svg>
  ),
  poids1: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke="#8A4A12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M27 10v34M18 47h18" /><path d="M8 18l38-6" /><path d="M8 18l-5 12h10zM46 12l-5 12h10z" /></svg>
  ),
  addition: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="3" y="14" width="9" height="9" rx="2" fill="#6FA8DC" /><rect x="3" y="25" width="9" height="9" rx="2" fill="#6FA8DC" /><path d="M20 16v12M14 22h12" stroke="#2F6FB0" strokeWidth="3" strokeLinecap="round" /><rect x="29" y="25" width="9" height="9" rx="2" fill="#2F6FB0" /></svg>
  ),
  soustraction: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="8" cy="20" r="5" fill="#D9617A" /><circle cx="20" cy="20" r="5" fill="#D9617A" /><circle cx="32" cy="20" r="5" fill="none" stroke="#A8364F" strokeWidth="2.5" strokeDasharray="3 3" /><path d="M26 32h12" stroke="#A8364F" strokeWidth="3" strokeLinecap="round" /></svg>
  ),
  multiplication: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {[[3, 6], [22, 6], [3, 22], [22, 22]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="15" height="12" rx="4" fill="none" stroke="#B8860B" strokeWidth="2.2" />
          <circle cx={x + 5} cy={y + 6} r="2.4" fill="#E8892F" />
          <circle cx={x + 10} cy={y + 6} r="2.4" fill="#E8892F" />
        </g>
      ))}
    </svg>
  ),
  problemes: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#2E7D5B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 4a10 10 0 0 0-6 18v4h12v-4A10 10 0 0 0 20 4z" /><path d="M15 31h10M17 36h6" /></svg>
  ),
  calculmental: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#6E3D8A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 30c-5 0-9-4-9-9 0-4 3-7 6-8 1-5 5-8 10-8s9 3 10 8c3 1 6 4 6 8 0 5-4 9-9 9" /><path d="M20 15v16M14 24h12" /></svg>
  ),
  // ---------- Parcours 10-12 ans ----------
  droite: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#3D2A5C" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true"><path d="M3 26H37M6 21v10M20 22v8M34 21v10M13 24v4M27 24v4" /><path d="M24 8l2.5 9L29 8z" fill="#7A4FB5" stroke="#7A4FB5" strokeLinejoin="round" /></svg>
  ),
  fractions: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="16" fill="#FFFFFF" stroke="#3D2A5C" strokeWidth="2.4" /><path d="M20 20V4A16 16 0 0 1 36 20Z" fill="#7A4FB5" /><path d="M20 4V36M4 20H36" stroke="#3D2A5C" strokeWidth="2" /></svg>
  ),
  proportion: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#2E7D5B" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><rect x="4" y="6" width="32" height="28" rx="4" /><path d="M20 6v28M4 15h32M4 25h32" /><path d="M10 31l20-22" stroke="#E8892F" /></svg>
  ),
  calculmalin: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#6E3D8A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 3L8 23h11l-2 14 15-21H21z" fill="#F2B84B" /></svg>
  ),
  aires: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 5h18v12h12v18H5z" fill="#ECE4F6" stroke="#3D2A5C" strokeWidth="2.6" strokeLinejoin="round" /><path d="M11 5v30M17 5v30M23 17v18M29 17v18M5 11h18M5 17h30M5 23h30M5 29h30" stroke="#B9A6DA" strokeWidth="1.2" /></svg>
  ),
  angles: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" strokeLinecap="round" aria-hidden="true"><path d="M6 32H36M6 32L28 8" stroke="#3D2A5C" strokeWidth="3" /><path d="M18 32a12 12 0 0 0-3.8-8.8" stroke="#7A4FB5" strokeWidth="3" /></svg>
  ),
  etapes: (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true"><rect x="4" y="8" width="10" height="9" fill="#B9A6DA" stroke="#3D2A5C" strokeWidth="2" /><rect x="14" y="8" width="10" height="9" fill="#B9A6DA" stroke="#3D2A5C" strokeWidth="2" /><rect x="24" y="8" width="10" height="9" fill="#FFFFFF" stroke="#3D2A5C" strokeWidth="2" /><rect x="4" y="23" width="10" height="9" fill="#FCE3CC" stroke="#3D2A5C" strokeWidth="2" /><path d="M16 27h18" stroke="#E8892F" strokeWidth="2.4" strokeDasharray="3 3" /></svg>
  ),
  grandsnombres: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#2F6FB0" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><rect x="3" y="12" width="9" height="16" rx="2" /><rect x="15.5" y="12" width="9" height="16" rx="2" fill="#DCE9F6" /><rect x="28" y="12" width="9" height="16" rx="2" /><path d="M20 6v3M20 31v3" /></svg>
  ),
};

export const ACTIVITY_TINTS = {
  droite: '#ECE4F6', fractions: '#ECE4F6', proportion: '#E3F0E7', calculmalin: '#FDF3DC',
  aires: '#ECE4F6', angles: '#F1E8F6', etapes: '#FCE3CC', grandsnombres: '#E3EEF8',
  subitizing: '#FDEEDD', compte: '#E3EEF8', compare: '#FBE7EB', formes: '#FDF3DC',
  calculsimple: '#F1E8F6', panier: '#E3F0E7', suite: '#E3EEF8', poids1: '#FCE3CC',
  addition: '#E3EEF8', soustraction: '#FBE7EB', multiplication: '#FDF3DC', problemes: '#E3F0E7', calculmental: '#F1E8F6',
};

export const ActivityIcon = ({ activityKey }) => ICONS[activityKey] || null;
