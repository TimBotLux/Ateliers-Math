// Mode Explorer : l'enfant choisit librement son atelier.
// 4-6 ans : grille de tuiles illustrées ; 7-9 ans : liste avec sous-titres.

import { activityRegistry } from '../activities/index.js';
import { useApp } from '../state/AppContext.jsx';
import { ACTIVITY_TINTS, ActivityIcon } from '../components/ActivityIcons.jsx';
import { GardenBand } from '../components/GardenBand.jsx';
import { BackIcon, SpeakerIcon } from '../components/Icons.jsx';

export function ExplorerScreen() {
  const { path, go, speak } = useApp();
  const activities = activityRegistry.byPath(path.id);
  const young = path.id === '4-6';
  const open = (key) => go('activity', { activityKey: key, from: 'explorer' });

  return (
    <div className="screen screen--padded" style={{ background: path.bg }}>
      <header className="page-header">
        <button className="icon-btn" style={{ borderColor: path.border }} aria-label="Retour à l'accueil" onClick={() => go('home')}>
          <BackIcon />
        </button>
        <div className="page-header__title">
          <h1>Explorer</h1>
          <span>{young ? 'Choisis ton atelier' : `Parcours ${path.label}`}</span>
        </div>
        <button
          className="icon-btn icon-btn--accent"
          style={{ background: path.accent }}
          aria-label="Écouter"
          onClick={() => speak(`Choisis ton atelier : ${activities.map((a) => a.label).join(', ')}.`)}
        >
          <SpeakerIcon />
        </button>
      </header>

      {young ? (
        <div className="tile-grid">
          {activities.map((a) => (
            <button
              key={a.key}
              className="tile"
              style={{ background: ACTIVITY_TINTS[a.key] }}
              onClick={() => open(a.key)}
              aria-label={a.label}
            >
              {a.isNew && <span className="tile__badge">Nouveau</span>}
              <ActivityIcon activityKey={a.key} />
              <span className="tile__label">{a.label}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="list">
          {activities.map((a) => (
            <button key={a.key} className="list-item" onClick={() => open(a.key)}>
              <span className="list-item__icon" style={{ background: ACTIVITY_TINTS[a.key] }}>
                <ActivityIcon activityKey={a.key} />
              </span>
              <span className="list-item__text">
                <span className="list-item__title">{a.label}</span>
                <span className="list-item__sub">{a.subtitle}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="spacer" />
      <GardenBand from="explorer" />
    </div>
  );
}
