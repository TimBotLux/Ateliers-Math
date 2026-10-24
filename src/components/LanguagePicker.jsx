// Choix de la langue (réglage de l'appareil) : au premier lancement et dans l'Espace adulte.
// Chaque langue est écrite dans sa propre langue, pour être reconnue sans savoir lire l'autre.

import { LANGS } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';

export function LanguagePicker({ label }) {
  const { settings, setLanguage } = useApp();
  return (
    <div className="lang-picker" role="radiogroup" aria-label={label}>
      {Object.values(LANGS).map((l) => (
        <button
          key={l.id}
          type="button"
          role="radio"
          aria-checked={settings.langue === l.id}
          className={`path-tab ${settings.langue === l.id ? 'is-active' : ''}`}
          onClick={() => setLanguage(l.id)}
          lang={l.id}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
