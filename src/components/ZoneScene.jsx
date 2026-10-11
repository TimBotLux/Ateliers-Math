// Dessin d'une zone du jardin, dans le thème et le style d'âge de l'enfant.
// Les fragments SVG viennent de src/garden-themes (contenu statique de l'application).

import { GARDEN_DEFS, zoneMarkup } from '../garden-themes/index.js';

export function ZoneScene({ theme, zoneId, stage, animateNew = false, variant = null, label }) {
  return (
    <svg
      className="zone-scene"
      viewBox="0 0 200 170"
      role="img"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: zoneMarkup(theme, zoneId, stage, { animateNew, variant }) }}
    />
  );
}

/** Filtres et dégradés partagés par toutes les scènes ; à monter une seule fois. */
export function GardenDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs dangerouslySetInnerHTML={{ __html: GARDEN_DEFS }} />
    </svg>
  );
}
