// Espace adulte : profils, repères qualitatifs (pas de notes), réglages, sauvegarde, confidentialité.

import { useRef, useState } from 'react';
import { ZONES } from '../data/zones.js';
import { downloadBackup, exportCode, importProgress } from '../engines/backup.js';
import { isPersistent } from '../engines/storage.js';
import { AVATAR_COLORS } from '../engines/profiles.js';
import { t } from '../i18n/index.js';
import { useApp } from '../state/AppContext.jsx';
import { DEFAULT_VOICE, VOICE_PRESETS, speak as speakText } from '../state/media.js';
import { Avatar, BackIcon, PlusIcon, SpeakerIcon } from '../components/Icons.jsx';
import { LanguagePicker } from '../components/LanguagePicker.jsx';
import { ChildForm } from './WelcomeScreen.jsx';

const LEVELS = {
  souvent: { bg: '#E3F0E7', fg: '#1E5A40' },
  commence: { bg: '#FDF3DC', fg: '#7A5A08' },
  decouvrir: { bg: '#EDF1EF', fg: '#4A5A5E' },
};

const levelFor = (stage) => (stage >= 3 ? 'souvent' : stage >= 1 ? 'commence' : 'decouvrir');

const TOGGLES = ['sons', 'voix', 'anim'];

/** Effacement définitif : l'adulte doit écrire un mot, qu'un jeune enfant ne tape pas par hasard. */
function EraseButton({ label, onErase }) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const word = t('adult.privacy.confirmWord');
  if (!open) return <button className="link-btn link-btn--danger" onClick={() => setOpen(true)}>{label}</button>;
  return (
    <div className="stack-12 erase-confirm">
      <label className="field">
        <span>{t('adult.privacy.confirmPrompt', { word })}</span>
        <input value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" autoCapitalize="characters" />
      </label>
      <div className="grid-2">
        <button className="secondary-btn secondary-btn--sm" onClick={() => { setOpen(false); setTyped(''); }}>{t('welcome.cancel')}</button>
        <button className="danger-btn" disabled={typed.trim().toUpperCase() !== word} onClick={onErase}>{t('adult.privacy.confirm')}</button>
      </div>
    </div>
  );
}

export function AdultScreen() {
  const { profiles, child, path, selectChild, addChild, stages, settings, toggleSetting, setVoice, go, reload, forgetChild, eraseAll } = useApp();
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
      setMessage({ ok: true, text: t('adult.restored') });
    } catch (e) {
      setMessage({ ok: false, text: e.message });
    }
  }

  async function copyCode() {
    const c = exportCode();
    try {
      await navigator.clipboard.writeText(c);
      setMessage({ ok: true, text: t('adult.copied') });
    } catch {
      setCode(c);
      setImporting(true);
      setMessage({ ok: true, text: t('adult.copyBelow') });
    }
  }

  return (
    <div className="screen screen--padded adult">
      <header className="page-header">
        <button className="icon-btn icon-btn--sm" aria-label={t('common.backHome')} onClick={() => go('home')}>
          <BackIcon size={20} />
        </button>
        <div className="page-header__title">
          <h1 className="h1--sm">{t('adult.title')}</h1>
          <span>{t('adult.sub')}</span>
        </div>
      </header>

      <section className="panel">
        <h2>{t('adult.children')}</h2>
        {profiles.children.map((c) => {
          const a = AVATAR_COLORS[c.color] || AVATAR_COLORS[0];
          const active = c.id === child.id;
          return (
            <button key={c.id} className={`profile-row ${active ? 'is-active' : ''}`} onClick={() => selectChild(c.id)}>
              <span className="avatar avatar--sm" style={{ background: a.bg }}><Avatar fg={a.fg} size={22} /></span>
              <span className="profile-row__text">
                <span className="profile-row__name">{c.name}</span>
                <span className="muted">{t('adult.childPath', { path: c.path })}</span>
              </span>
              {active && <span className="profile-row__active">{t('adult.active')}</span>}
            </button>
          );
        })}
        {adding ? (
          <ChildForm
            submitLabel={t('welcome.add')}
            onSubmit={(name, p, theme) => {
              addChild(name, p, theme);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <button className="dashed-btn" onClick={() => setAdding(true)}>
            <PlusIcon /> {t('adult.addChild')}
          </button>
        )}
      </section>

      <section className="panel">
        <div>
          <h2>{t('adult.explores', { name: child.name })}</h2>
          <span className="muted">{t('adult.exploresSub')}</span>
        </div>
        {ZONES.map((z) => {
          const level = levelFor(stages[z.id] ?? 0);
          return (
            <div key={z.id} className="zone-row">
              <span className="zone-row__name"><span className="zone-row__dot" style={{ background: z.color }} />{t(`zones.${z.id}.long`)}</span>
              <span className="pill" style={{ background: LEVELS[level].bg, color: LEVELS[level].fg }}>{t(`adult.levels.${level}`)}</span>
            </div>
          );
        })}
      </section>

      <section className="panel">
        <h2>{t('adult.settings')}</h2>
        <div className="toggle-row">
          <strong className="toggle-row__text">{t('adult.language')}</strong>
          <LanguagePicker label={t('adult.language')} />
        </div>
        {TOGGLES.map((key) => {
          const [label, hint] = t(`adult.toggles.${key}`);
          return (
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
          );
        })}
        <div className="voice-picker" role="radiogroup" aria-label={t('adult.voice')}>
          <strong className="voice-picker__title">{t('adult.voice')}</strong>
          {Object.keys(VOICE_PRESETS).map((id) => {
            const active = (settings.personnage || DEFAULT_VOICE) === id;
            const [label, hint] = t(`adult.voices.${id}`);
            return (
              <div key={id} className={`voice-option ${active ? 'is-active' : ''}`}>
                <button role="radio" aria-checked={active} className="voice-option__pick" onClick={() => setVoice(id)}>
                  <span className="voice-option__dot" />
                  <span className="toggle-row__text"><strong>{label}</strong><span className="muted">{hint}</span></span>
                </button>
                <button
                  className="icon-btn icon-btn--sm voice-option__listen"
                  aria-label={t('adult.voiceListen', { label })}
                  onClick={() => speakText(t('adult.voiceTest', { name: child.name }), { path: path.id, voice: id, online: settings.voixEnLigne })}
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
          <h2>{t('adult.backup')}</h2>
          <span className="muted">{t('adult.backupSub')}</span>
          <p className="muted">{t('adult.backupPrivate')}</p>
          {!isPersistent() && <p className="warning">{t('adult.storageWarning')}</p>}
        </div>
        <div className="grid-2">
          <button className="primary-btn primary-btn--sm" onClick={downloadBackup}>{t('adult.export')}</button>
          <button className="secondary-btn secondary-btn--sm" onClick={() => fileInput.current?.click()}>{t('adult.import')}</button>
        </div>
        <div className="grid-2">
          <button className="link-btn" onClick={copyCode}>{t('adult.copyCode')}</button>
          <button className="link-btn" onClick={() => setImporting((v) => !v)}>{t('adult.pasteCode')}</button>
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
            <textarea className="code-box" value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('adult.pastePlaceholder')} rows={4} />
            <button className="secondary-btn secondary-btn--sm" disabled={!code.trim()} onClick={() => doImport(code)}>
              {t('adult.restoreCode')}
            </button>
          </div>
        )}
        {message && <p className={message.ok ? 'note-ok' : 'warning'}>{message.text}</p>}
      </section>

      <section className="panel">
        <div>
          <h2>{t('adult.privacy.title')}</h2>
          <span className="muted">{t('adult.privacy.sub')}</span>
        </div>
        <p className="muted">{t('adult.privacy.stored')}</p>
        <p className="muted">{t('adult.privacy.host')}</p>
        <div className="toggle-row">
          <span className="toggle-row__text"><strong>{t('adult.privacy.online')[0]}</strong><span className="muted">{t('adult.privacy.online')[1]}</span></span>
          <button
            role="switch"
            aria-checked={settings.voixEnLigne}
            aria-label={t('adult.privacy.online')[0]}
            className={`switch ${settings.voixEnLigne ? 'is-on' : ''}`}
            onClick={() => toggleSetting('voixEnLigne')}
          >
            <span className="switch__knob" />
          </button>
        </div>
        <p className="muted">{t('adult.privacy.rights')}</p>
        <EraseButton
          key={child.id}
          label={t('adult.privacy.eraseChild', { name: child.name })}
          onErase={() => {
            const { name } = child;
            forgetChild(child.id);
            setMessage({ ok: true, text: t('adult.privacy.erased', { name }) });
          }}
        />
        <EraseButton label={t('adult.privacy.eraseAll')} onErase={eraseAll} />
      </section>
    </div>
  );
}
