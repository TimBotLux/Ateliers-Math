// Premier lancement : un adulte crée le profil du premier enfant.

import { useState } from 'react';
import { useApp } from '../state/AppContext.jsx';
import { DEFAULT_THEME, THEME_IDS, choiceLabel, themeFor } from '../garden-themes/index.js';
import { SproutIcon } from '../components/Icons.jsx';
import { ZoneScene } from '../components/ZoneScene.jsx';

export function ChildForm({ onSubmit, onCancel, submitLabel }) {
  const [name, setName] = useState('');
  const [childPath, setChildPath] = useState('4-6');
  const [childTheme, setChildTheme] = useState(DEFAULT_THEME);
  const valid = name.trim().length > 0;

  return (
    <form
      className="child-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit(name, childPath, childTheme);
      }}
    >
      <label className="field">
        <span>Prénom</span>
        <input value={name} maxLength={24} onChange={(e) => setName(e.target.value)} autoFocus placeholder="Prénom de l'enfant" />
      </label>
      <div className="field">
        <span>Parcours</span>
        <div className="row-8">
          {['4-6', '7-9', '10-12'].map((p) => (
            <button key={p} type="button" className={`path-tab ${childPath === p ? 'is-active' : ''}`} aria-pressed={childPath === p} onClick={() => setChildPath(p)}>
              {p} ans
            </button>
          ))}
        </div>
      </div>
      <div className="field">
        <span>Univers</span>
        <div className="universe__choices">
          {THEME_IDS.map((id) => (
            <button
              key={id}
              type="button"
              className={`universe__choice ${childTheme === id ? 'is-active' : ''}`}
              aria-pressed={childTheme === id}
              onClick={() => setChildTheme(id)}
            >
              <ZoneScene theme={themeFor(id, childPath)} zoneId="logique" stage={5} label={choiceLabel(id, childPath)} />
              <span>{choiceLabel(id, childPath)}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="row-8">
        {onCancel && (
          <button type="button" className="secondary-btn secondary-btn--sm" onClick={onCancel}>Annuler</button>
        )}
        <button type="submit" className="primary-btn primary-btn--sm" disabled={!valid}>{submitLabel}</button>
      </div>
    </form>
  );
}

export function WelcomeScreen() {
  const { addChild } = useApp();
  return (
    <div className="screen screen--padded welcome">
      <div className="welcome__logo"><SproutIcon size={56} /></div>
      <h1>Ateliers Maths</h1>
      <p className="muted">
        Des ateliers de mathématiques à manipuler, sans note ni classement. La progression reste sur cet appareil.
      </p>
      <section className="panel">
        <h2>Qui va jouer ?</h2>
        <ChildForm submitLabel="Commencer" onSubmit={addChild} />
      </section>
    </div>
  );
}
