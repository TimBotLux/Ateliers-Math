// Espace adulte : profils, repères qualitatifs (pas de notes), réglages, sauvegarde.

import { useRef, useState } from 'react';
import { ZONES } from '../data/zones.js';
import { downloadBackup, exportCode, importProgress } from '../engines/backup.js';
import { isPersistent } from '../engines/storage.js';
import { AVATAR_COLORS } from '../engines/profiles.js';
import { useApp } from '../state/AppContext.jsx';
import { DEFAULT_VOICE, VOICE_PRESETS, speak as speakText } from '../state/media.js';
import { Avatar, BackIcon, PlusIcon, SpeakerIcon } from '../components/Icons.jsx';
import { ChildForm } from './WelcomeScreen.jsx';

const LEVELS = {
  souvent: { label: 'Pratique souvent', bg: '#E3F0E7', fg: '#1E5A40' },
  commence: { label: 'Commence', bg: '#FDF3DC', fg: '#7A5A08' },
  decouvrir: { label: 'À découvrir', bg: '#EDF1EF', fg: '#4A5A5E' },
};

const levelFor = (stage) => (stage >= 3 ? LEVELS.souvent : stage >= 1 ? LEVELS.commence : LEVELS.decouvrir);

const TOGGLES = [
  ['sons', 'Sons et musique', 'Bruitages et ambiance'],
  ['voix', 'Voix des consignes', 'Lit les consignes à voix haute'],
  ['anim', 'Réduire les animations', 'Mouvements plus doux'],
];

export function AdultScreen() {
  const { profiles, child, path, selectChild, addChild, stages, settings, toggleSetting, setVoice, go, reload } = useApp();
  const [adding, setAdding] = useState(false);
  const [code, setCode] = useState('');
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState(null);
  const fileInput = useRef(null);

  function doImport(text) {
    try {
      importProgress(text);
      reload();
      setImporting(false);
      setCode('');
      setMessage({ ok: true, text: 'Sauvegarde restaurée.' });
    } catch (e) {
      setMessage({ ok: false, text: e.message });
    }
  }

  async function copyCode() {
    const c = exportCode();
    try {
      await navigator.clipboard.writeText(c);
      setMessage({ ok: true, text: 'Code de sauvegarde copié.' });
    } catch {
      setCode(c);
      setImporting(true);
      setMessage({ ok: true, text: 'Copiez le code ci-dessous et gardez-le précieusement.' });
    }
  }

  return (
    <div className="screen screen--padded adult">
      <header className="page-header">
        <button className="icon-btn icon-btn--sm" aria-label="Retour à l'accueil" onClick={() => go('home')}>
          <BackIcon size={20} />
        </button>
        <div className="page-header__title">
          <h1 className="h1--sm">Espace adulte</h1>
          <span>Pour les parents et les éducateurs</span>
        </div>
      </header>

      <section className="panel">
        <h2>Enfants sur cet appareil</h2>
        {profiles.children.map((c) => {
          const a = AVATAR_COLORS[c.color] || AVATAR_COLORS[0];
          const active = c.id === child.id;
          return (
            <button key={c.id} className={`profile-row ${active ? 'is-active' : ''}`} onClick={() => selectChild(c.id)}>
              <span className="avatar avatar--sm" style={{ background: a.bg }}><Avatar fg={a.fg} size={22} /></span>
              <span className="profile-row__text">
                <span className="profile-row__name">{c.name}</span>
                <span className="muted">Parcours {c.path} ans</span>
              </span>
              {active && <span className="profile-row__active">Actif</span>}
            </button>
          );
        })}
        {adding ? (
          <ChildForm
            submitLabel="Ajouter"
            onSubmit={(name, p, t) => {
              addChild(name, p, t);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <button className="dashed-btn" onClick={() => setAdding(true)}>
            <PlusIcon /> Ajouter un enfant
          </button>
        )}
      </section>

      <section className="panel">
        <div>
          <h2>Ce que {child.name} explore</h2>
          <span className="muted">Des repères, pas de notes : l'application ne compte pas les points.</span>
        </div>
        {ZONES.map((z) => {
          const l = levelFor(stages[z.id] ?? 0);
          return (
            <div key={z.id} className="zone-row">
              <span className="zone-row__name"><span className="zone-row__dot" style={{ background: z.color }} />{z.long}</span>
              <span className="pill" style={{ background: l.bg, color: l.fg }}>{l.label}</span>
            </div>
          );
        })}
      </section>

      <section className="panel">
        <h2>Réglages</h2>
        {TOGGLES.map(([key, label, hint]) => (
          <div key={key} className="toggle-row">
            <span className="toggle-row__text"><strong>{label}</strong><span className="muted">{hint}</span></span>
            <button
              role="switch"
              aria-checked={settings[key]}
              aria-label={label}
              className={`switch ${settings[key] ? 'is-on' : ''}`}
              onClick={() => toggleSetting(key)}
            >
              <span className="switch__knob" />
            </button>
          </div>
        ))}
        <div className="voice-picker" role="radiogroup" aria-label="Voix">
          <strong className="voice-picker__title">Voix</strong>
          {Object.entries(VOICE_PRESETS).map(([id, preset]) => {
            const active = (settings.personnage || DEFAULT_VOICE) === id;
            return (
              <div key={id} className={`voice-option ${active ? 'is-active' : ''}`}>
                <button role="radio" aria-checked={active} className="voice-option__pick" onClick={() => setVoice(id)}>
                  <span className="voice-option__dot" />
                  <span className="toggle-row__text"><strong>{preset.label}</strong><span className="muted">{preset.hint}</span></span>
                </button>
                <button
                  className="icon-btn icon-btn--sm voice-option__listen"
                  aria-label={`Écouter la voix ${preset.label}`}
                  onClick={() => speakText(`Salut ${child.name} ! On va bien s’amuser avec les maths ! Bravo !`, { path: path.id, voice: id })}
                >
                  <SpeakerIcon color="#1E2B2F" size={20} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div>
          <h2>Sauvegarde</h2>
          <span className="muted">Le jardin reste sur cet appareil. Gardez-en une copie pour ne rien perdre.</span>
          {!isPersistent() && (
            <p className="warning">Le stockage de ce navigateur est indisponible : la progression sera perdue à la fermeture. Exportez-la avant de partir.</p>
          )}
        </div>
        <div className="grid-2">
          <button className="primary-btn primary-btn--sm" onClick={downloadBackup}>Exporter</button>
          <button className="secondary-btn secondary-btn--sm" onClick={() => fileInput.current?.click()}>Importer</button>
        </div>
        <div className="grid-2">
          <button className="link-btn" onClick={copyCode}>Copier un code</button>
          <button className="link-btn" onClick={() => setImporting((v) => !v)}>Coller un code</button>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json,.txt"
          hidden
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) doImport(await file.text());
            e.target.value = '';
          }}
        />
        {importing && (
          <div className="stack-12">
            <textarea className="code-box" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Collez ici un code de sauvegarde" rows={4} />
            <button className="secondary-btn secondary-btn--sm" disabled={!code.trim()} onClick={() => doImport(code)}>
              Restaurer ce code
            </button>
          </div>
        )}
        {message && <p className={message.ok ? 'note-ok' : 'warning'}>{message.text}</p>}
      </section>
    </div>
  );
}
