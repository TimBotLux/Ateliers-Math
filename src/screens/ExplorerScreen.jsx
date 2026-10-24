// Mode Explorer : l'enfant choisit librement son atelier.
// 4-6 ans : grille de tuiles illustrées ; 7-9 et 10-12 ans : liste avec sous-titres.

import { activityRegistry } from '../activities/index.js';
import { activityLabel, activitySubtitle, t } from '../i18n/index.js';
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
        <button className="icon-btn" style={{ borderColor: path.border }} aria-label={t('common.backHome')} onClick={() => go('home')}>
          <BackIcon />
        </button>
        <div className="page-header__title">
          <h1>{t('explorer.title')}</h1>
          <span>{young ? t('explorer.choose') : t('explorer.path', { label: t(`paths.${path.id}`) })}</span>
        </div>
        <button
          className="icon-btn icon-btn--accent"
          style={{ background: path.accent }}
          aria-label={t('common.listen')}
          onClick={() => speak(t('explorer.speak', { list: activities.map(activityLabel).join(', ') }))}
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
              aria-label={activityLabel(a)}
            >
              {a.isNew && <span className="tile__badge">{t('explorer.isNew')}</span>}
              <ActivityIcon activityKey={a.key} />
              <span className="tile__label">{activityLabel(a)}</span>
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
                <span className="list-item__title">{activityLabel(a)}</span>
                <span className="list-item__sub">{activitySubtitle(a)}</span>
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
