// Filet de sécurité : une erreur imprévue n'affiche jamais une page blanche.
// L'enfant voit un écran calme avec un seul bouton ; on remet en forme les données
// enregistrées puis on recharge l'application (l'enfant n'est jamais bloqué).

import { Component } from 'react';
import { repairStoredData } from '../engines/backup.js';
import { t } from '../i18n/index.js';

export class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  restart = () => {
    repairStoredData();
    globalThis.location?.reload();
  };

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="app">
        <div className="screen screen--padded error-screen" role="alert">
          <h1>{t('error.title')}</h1>
          <p className="muted">{t('error.sub')}</p>
          <button className="primary-btn" onClick={this.restart}>{t('error.restart')}</button>
        </div>
      </div>
    );
  }
}
