// Message affiché quand la réponse de l'enfant n'est pas celle attendue.
// Une invitation à observer, jamais un jugement.
export const CHECK_AGAIN = 'Regarde mieux, vérifie ta réponse.';

/**
 * Retour qui tient compte de l'assurance déclarée par l'enfant (10-12 ans).
 * Une erreur commise « sûr de soi » est signalée comme une surprise : c'est l'effet
 * d'hypercorrection, ces erreurs-là sont particulièrement bien corrigées ensuite.
 */
export function confidenceFeedback(ok, sure) {
  if (ok && sure) return 'Oui, c’est ça !';
  if (ok) return 'Oui ! Tu peux te faire confiance.';
  if (sure) return `Surprise ! ${CHECK_AGAIN}`;
  return CHECK_AGAIN;
}
