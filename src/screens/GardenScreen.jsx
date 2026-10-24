// « Mon jardin » / « Ma gare » : le paysage complet des 8 zones, sans aucun chiffre.
// Les zones qui ont grandi depuis la dernière visite reçoivent leur nouvel autocollant en direct.

import { useEffect, useState } from 'react';
import { loadSeen, saveSeen } from '../engines/profiles.js';
import { THEME_IDS, choiceLabel, copyFor, themeFor, zoneTexts } from '../garden-themes/index.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { BackIcon, SpeakerIcon } from '../components/Icons.jsx';
import { OldAppleTree } from '../components/Plants.jsx';
import { ZoneScene } from '../components/ZoneScene.jsx';

export function GardenScreen({ from = 'home' }) {
  const { child, garden, stages, go, speak, path, gardenTheme, setChildTheme, reduceMotion } = useApp();
  const order = garden.order(child.id);
  const legacy = garden.hasLegacy(child.id);
  const copy = copyFor(child.theme);

  // Zones qui ont grandi depuis la dernière visite (calculé une fois, à l'ouverture).
  const [grownSince] = useState(() => {
    const seen = loadSeen(child.id);
    if (!seen) return [];
    return Object.keys(stages).filter((z) => (stages[z] ?? 0) > (seen[z] ?? 0));
  });
  useEffect(() => {
    saveSeen(child.id, stages);
  }, [child.id, stages]);

  // Description d'une zone à son stade actuel (repli : nom générique du stade).
  const stageText = (id) => {
    const stage = stages[id] ?? 0;
    return zoneTexts(gardenTheme, id)?.stages[stage] ?? t('garden.stageNames')[stage];
  };
  const zoneName = (id) => t(`zones.${id}.name`);
  const zoneLabel = (id) => t('garden.zoneLabel', { zone: zoneName(id), text: stageText(id) });
  const description = `${copy.own}. ${order.map(zoneLabel).join('. ')}.`;

  return (
    <div className="screen screen--padded" style={{ background: path.bg }}>
      <header className="page-header">
        <button className="icon-btn" aria-label={t('common.back')} onClick={() => go(from === 'explorer' ? 'explorer' : 'home')}>
          <BackIcon />
        </button>
        <div className="page-header__title"><h1>{copy.own}</h1></div>
        <button className="icon-btn icon-btn--accent" style={{ background: path.accent }} aria-label={t('common.listen')} onClick={() => speak(description)}>
          <SpeakerIcon />
        </button>
      </header>

      <div className="garden-grid">
        {order.map((id) => (
          <div key={id} className="garden-zone">
            <ZoneScene
              theme={gardenTheme}
              zoneId={id}
              stage={stages[id] ?? 0}
              animateNew={!reduceMotion && grownSince.includes(id)}
              variant={garden.variant(child.id, id)}
              label={zoneLabel(id)}
            />
            <span className="garden-zone__name">{zoneName(id)}</span>
          </div>
        ))}
      </div>

      {legacy && (
        <div className="legacy">
          <OldAppleTree />
          <div className="legacy__text">
            <span className="legacy__title">{copy.legacyTitle}</span>
            <span className="legacy__sub">{t('garden.legacySub')}</span>
          </div>
        </div>
      )}

      <section className="universe" aria-label={t('garden.chooseUniverse')}>
        <span className="universe__title">{t('garden.universe')}</span>
        <div className="universe__choices">
          {THEME_IDS.map((id) => {
            const preview = themeFor(id, path.id);
            const active = (child.theme || 'fees') === id;
            return (
              <button
                key={id}
                className={`universe__choice ${active ? 'is-active' : ''}`}
                aria-pressed={active}
                onClick={() => {
                  setChildTheme(id);
                  speak(choiceLabel(id, path.id));
                }}
              >
                <ZoneScene theme={preview} zoneId="logique" stage={5} label={choiceLabel(id, path.id)} />
                <span>{choiceLabel(id, path.id)}</span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
