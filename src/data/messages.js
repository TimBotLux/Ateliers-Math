// Messages de retour à l'enfant, dans la langue courante.

import { t } from '../i18n/index.js';

/** Message affiché quand la réponse n'est pas celle attendue : une invitation à observer, jamais un jugement. */
export const checkAgain = () => t('feedback.checkAgain');

/** « Oui, c'est ça ! » */
export const rightAnswer = () => t('feedback.right');

/**
 * Retour qui tient compte de l'assurance déclarée par l'enfant (10-12 ans).
 * Une erreur commise « sûr de soi » est signalée comme une surprise : c'est l'effet
 * d'hypercorrection, ces erreurs-là sont particulièrement bien corrigées ensuite.
 */
export function confidenceFeedback(ok, sure) {
  if (ok && sure) return t('feedback.right');
  if (ok) return t('feedback.rightTrust');
  if (sure) return t('feedback.surprise');
  return t('feedback.checkAgain');
}
