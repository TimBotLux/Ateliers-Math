// Bande discrète en bas d'écran : résumé condensé des 8 zones.
// La bande n'est pas cliquable ; seul le petit bouton dédié ouvre « Mon jardin » / « Ma gare ».

import { zoneById } from '../data/zones.js';
import { copyFor } from '../garden-themes/index.js';
import { useApp } from '../state/AppContext.jsx';
import { SproutIcon } from './Icons.jsx';
import { MiniPlant, MiniStation } from './Plants.jsx';

export function GardenBand({ from }) {
  const { child, garden, stages, go, path } = useApp();
  if (!child) return null;
  const order = garden.order(child.id);
  const Mini = child.theme === 'gare' ? MiniStation : MiniPlant;
  return (
    <footer className="garden-band" style={{ borderColor: path.border }}>
      <div className="garden-band__plants" role="img" aria-label={`Résumé : ${copyFor(child.theme).own}`}>
        {order.map((z) => (
          <Mini key={z} stage={stages[z] ?? 0} color={zoneById(z).color} />
        ))}
      </div>
      <button className="garden-band__open" aria-label={copyFor(child.theme).open} onClick={() => go('garden', { from })}>
        <SproutIcon />
      </button>
    </footer>
  );
}
