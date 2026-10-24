import { useState } from 'react';
import { activityRegistry } from '../activities/index.js';
import { AVATAR_COLORS } from '../engines/profiles.js';
import { buildSession } from '../engines/sessionEngine.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { GardenBand } from '../components/GardenBand.jsx';
import { Avatar, CompassIcon, LockIcon, PeopleIcon, SpeakerIcon, StarIcon } from '../components/Icons.jsx';

export function HomeScreen() {
  const { child, path, setChildPath, stages, go, speak, profiles, selectChild, adaptive } = useApp();
  const [picking, setPicking] = useState(false);
  const avatar = AVATAR_COLORS[child.color] || AVATAR_COLORS[0];

  function startMission() {
    // 10-12 ans : les révisions espacées entrent en jeu dans le choix des ateliers.
    const recency = path.id === '10-12' ? adaptive.recency(child.id) : null;
    const session = buildSession({ activities: activityRegistry.byPath(path.id), stages, recency });
    // Parcours sans activité : repli silencieux vers Explorer.
    if (!session.steps.length) return go('explorer');
    go('activity', {
      activityKey: session.steps[0],
      mission: { steps: session.steps, index: 0, grown: [] },
      from: 'home',
    });
  }

  return (
    <div className="screen" style={{ background: path.bg }}>
      <header className="home-header">
        <div className="home-header__who">
          <div className="avatar" style={{ background: avatar.bg }}><Avatar fg={avatar.fg} /></div>
          <div className="home-header__hello">
            <span>{t('home.hello')}</span>
            <strong>{child.name}</strong>
          </div>
        </div>
        <div className="row-8">
          {profiles.children.length > 1 && (
            <button className="icon-btn" aria-label={t('home.switchChild')} onClick={() => setPicking(true)}>
              <PeopleIcon />
            </button>
          )}
          <button className="icon-btn" aria-label={t('home.adult')} onClick={() => go('adult')}>
            <LockIcon />
          </button>
        </div>
      </header>

      <nav className="path-tabs" aria-label={t('home.paths')}>
        {['4-6', '7-9', '10-12'].map((p) => (
          <button key={p} className={`path-tab ${path.id === p ? 'is-active' : ''}`} aria-pressed={path.id === p} onClick={() => setChildPath(p)}>
            {t(`paths.${p}`)}
          </button>
        ))}
      </nav>

      <main className="home-main">
        <div className="mission-card" style={{ background: path.accent }}>
          <button className="mission-card__hit" onClick={startMission} aria-label={t('home.startMission')} />
          <div className="mission-card__top">
            <div className="mission-card__badge"><StarIcon /></div>
            <button className="mission-card__listen" aria-label={t('common.listen')} onClick={() => speak(t('home.missionSpeak'))}>
              <SpeakerIcon />
            </button>
          </div>
          <div className="mission-card__text">
            <span className="mission-card__title">{t('home.mission')}</span>
            <span className="mission-card__sub">{t('home.missionSub')}</span>
          </div>
          <div className="mission-card__dots" aria-hidden="true">
            <span className="is-wide" /><span /><span />
          </div>
        </div>

        <button className="explorer-card" onClick={() => go('explorer')}>
          <div className="explorer-card__icon"><CompassIcon /></div>
          <div className="explorer-card__text">
            <span className="explorer-card__title">{t('home.explorer')}</span>
            <span className="explorer-card__sub">{t('home.explorerSub')}</span>
          </div>
        </button>
      </main>

      <GardenBand from="home" />

      {picking && (
        <div className="sheet-backdrop" onClick={() => setPicking(false)}>
          <div className="sheet" role="dialog" aria-label={t('home.switchChild')} onClick={(e) => e.stopPropagation()}>
            <h2>{t('home.whoPlays')}</h2>
            {profiles.children.map((c) => {
              const a = AVATAR_COLORS[c.color] || AVATAR_COLORS[0];
              return (
                <button
                  key={c.id}
                  className={`profile-row ${c.id === child.id ? 'is-active' : ''}`}
                  onClick={() => {
                    selectChild(c.id);
                    setPicking(false);
                  }}
                >
                  <span className="avatar avatar--sm" style={{ background: a.bg }}><Avatar fg={a.fg} size={22} /></span>
                  <span className="profile-row__name">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
