// Fin de mission : un message simple (« Ton jardin a grandi ! »), sans nommer les
// compétences ni afficher de nombre. Le dessin de la zone qui a grandi suffit à le montrer ;
// le détail par compétence est réservé à l'Espace adulte.

import { useEffect } from 'react';
import { zoneById } from '../data/zones.js';
import { copyFor, zoneTexts } from '../garden-themes/index.js';
import { activityLabel, t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { activityRegistry } from '../activities/index.js';
import { ActivityIcon } from '../components/ActivityIcons.jsx';
import { NextIcon, SpeakerIcon, SproutIcon } from '../components/Icons.jsx';
import { ZoneScene } from '../components/ZoneScene.jsx';

// Délai avant l'atelier suivant (mode Explorer) : le message vocal dure environ 3 s.
const NEXT_ACTIVITY_MS = 6000;

export function FinScreen({ grown = [], mode, next = null }) {
  const { go, speak, path, child, stages, gardenTheme, garden } = useApp();
  const zones = grown.map(zoneById).filter(Boolean);
  const copy = copyFor(child.theme);
  const title = t(mode === 'mission' ? 'fin.mission' : 'fin.atelier', { name: child.name });
  const lead = zones.length ? copy.grew : `${t('fin.observed')} ${copy.idle}`;
  const spoken = `${title} ${lead}`;

  // Zone mise en avant : la première qui a grandi, sinon la plus développée.
  const featured = zones[0]?.id ?? Object.keys(stages).sort((a, b) => (stages[b] ?? 0) - (stages[a] ?? 0))[0] ?? 'logique';
  const featuredStage = stages[featured] ?? 0;

  useEffect(() => {
    speak(spoken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Enchaînement sans toucher : l'élan de l'enfant n'est pas coupé.
  const nextActivity = next ? activityRegistry.get(next) : null;
  const goNext = () => go('activity', { activityKey: next, from: 'explorer' });
  useEffect(() => {
    if (!nextActivity) return undefined;
    const timer = setTimeout(goNext, NEXT_ACTIVITY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);

  return (
    <div className="screen screen--padded fin" style={{ background: path.bg }}>
      <div className="row-end">
        <button className="icon-btn icon-btn--accent" style={{ background: path.accent }} aria-label={t('fin.listen')} onClick={() => speak(spoken)}>
          <SpeakerIcon />
        </button>
      </div>

      <div className="fin__scene">
        <ZoneScene
          theme={gardenTheme}
          zoneId={featured}
          stage={featuredStage}
          variant={garden.variant(child.id, featured)}
          label={zoneTexts(gardenTheme, featured)?.stages[featuredStage] ?? copy.own}
        />
      </div>

      <div className="fin__text">
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>

      <div className="spacer" />

      <div className="stack-12">
        {nextActivity ? (
          <>
            <button
              className="primary-btn primary-btn--xl primary-btn--countdown"
              style={{ background: path.accent, '--countdown': `${NEXT_ACTIVITY_MS}ms` }}
              onClick={goNext}
              aria-label={t('fin.next', { label: activityLabel(nextActivity) })}
            >
              <span className="fin__next-icon"><ActivityIcon activityKey={nextActivity.key} /></span>
              {activityLabel(nextActivity)} <NextIcon />
            </button>
            <div className="grid-2">
              <button className="secondary-btn secondary-btn--sm" onClick={() => go('garden', { from: 'home' })}>{copy.see}</button>
              <button className="secondary-btn secondary-btn--sm" onClick={() => go('home')}>{t('common.home')}</button>
            </div>
          </>
        ) : (
          <>
            <button className="primary-btn primary-btn--xl" style={{ background: path.accent }} onClick={() => go('garden', { from: 'home' })}>
              <SproutIcon color="#FFFFFF" size={24} /> {copy.see}
            </button>
            <button className="secondary-btn" onClick={() => go('home')}>{t('common.backHome')}</button>
          </>
        )}
      </div>
    </div>
  );
}
