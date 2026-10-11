import { useState } from 'react';
import { activityRegistry } from '../activities/index.js';
import { AVATAR_COLORS } from '../engines/profiles.js';
import { buildSession } from '../engines/sessionEngine.js';
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
            <span>Bonjour</span>
            <strong>{child.name}</strong>
          </div>
        </div>
        <div className="row-8">
          {profiles.children.length > 1 && (
            <button className="icon-btn" aria-label="Changer d'enfant" onClick={() => setPicking(true)}>
              <PeopleIcon />
            </button>
          )}
          <button className="icon-btn" aria-label="Espace adulte" onClick={() => go('adult')}>
            <LockIcon />
          </button>
        </div>
      </header>

      <nav className="path-tabs" aria-label="Parcours">
        {['4-6', '7-9', '10-12'].map((p) => (
          <button key={p} className={`path-tab ${path.id === p ? 'is-active' : ''}`} aria-pressed={path.id === p} onClick={() => setChildPath(p)}>
            {p} ans
          </button>
        ))}
      </nav>

      <main className="home-main">
        <div className="mission-card" style={{ background: path.accent }}>
          <button className="mission-card__hit" onClick={startMission} aria-label="Commencer Ma Mission" />
          <div className="mission-card__top">
            <div className="mission-card__badge"><StarIcon /></div>
            <button className="mission-card__listen" aria-label="Écouter" onClick={() => speak('Ma Mission : une petite séance préparée pour toi.')}>
              <SpeakerIcon />
            </button>
          </div>
          <div className="mission-card__text">
            <span className="mission-card__title">Ma Mission</span>
            <span className="mission-card__sub">Une petite séance préparée pour toi</span>
          </div>
          <div className="mission-card__dots" aria-hidden="true">
            <span className="is-wide" /><span /><span />
          </div>
        </div>

        <button className="explorer-card" onClick={() => go('explorer')}>
          <div className="explorer-card__icon"><CompassIcon /></div>
          <div className="explorer-card__text">
            <span className="explorer-card__title">Explorer</span>
            <span className="explorer-card__sub">Je choisis mon atelier</span>
          </div>
        </button>
      </main>

      <GardenBand from="home" />

      {picking && (
        <div className="sheet-backdrop" onClick={() => setPicking(false)}>
          <div className="sheet" role="dialog" aria-label="Changer d'enfant" onClick={(e) => e.stopPropagation()}>
            <h2>Qui joue ?</h2>
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
