// Petits dessins du jardin : mini-plantes et mini-gares de la bande discrète en bas d'écran,
// et le vieux pommier du « jardin d'avant ».

/** Mini-plante de la bande de résumé (maquette Accueil). */
export function MiniPlant({ stage, color }) {
  const top = 30 - stage * 4;
  const leaf = 31 - stage * 2;
  const bud = stage > 2 ? 4 : 2;
  const fill = stage > 2 ? color : '#7DB86F';
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" aria-hidden="true">
      <path d={`M12 33V${top}`} stroke="#5B8F57" strokeWidth="2.5" strokeLinecap="round" />
      {stage > 0 && <ellipse cx="7" cy={leaf} rx="5" ry="3" fill="#7DB86F" />}
      {stage > 0 && <ellipse cx="17" cy={leaf} rx="5" ry="3" fill="#7DB86F" />}
      <circle cx="12" cy={top} r={bud} fill={stage === 0 ? '#8A6F4D' : fill} />
    </svg>
  );
}

/** Équivalent « gare » de la mini-plante : un petit bâtiment qui s'élève sur un rail. */
export function MiniStation({ stage, color }) {
  const h = [0, 6, 11, 16, 21, 25][stage];
  return (
    <svg width="24" height="34" viewBox="0 0 24 34" aria-hidden="true">
      <rect x="1" y="31" width="22" height="2" rx="1" fill="#7D8A92" />
      {stage === 0 && <rect x="10" y="26" width="4" height="5" rx="1" fill="#C98E4E" />}
      {stage > 0 && <rect x="5" y={31 - h} width="14" height={h} rx="1.5" fill="#FFF3DF" stroke="#C9CFD3" />}
      {stage > 2 && <path d={`M3 ${31 - h} L12 ${24 - h} L21 ${31 - h}Z`} fill={color} />}
      {stage > 3 && <rect x="9" y={34 - h} width="6" height="4" rx="1" fill="#BFE0F5" />}
      {stage > 4 && <path d={`M12 ${24 - h} V${17 - h} l5 2 l-5 2`} stroke="#1E2B2F" strokeWidth="1" fill="#F2B84B" />}
    </svg>
  );
}

/** Le jardin d'avant : un vieux pommier, élément historique fixe. */
export function OldAppleTree() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" role="img" aria-label="Le jardin d'avant : un vieux pommier">
      <ellipse cx="26" cy="48" rx="20" ry="4" fill="#B79B78" />
      <rect x="23" y="28" width="6" height="20" rx="2" fill="#8A6F4D" />
      <circle cx="26" cy="20" r="15" fill="#8DA88A" />
      <circle cx="20" cy="18" r="3" fill="#D9617A" />
      <circle cx="32" cy="24" r="3" fill="#D9617A" />
    </svg>
  );
}
