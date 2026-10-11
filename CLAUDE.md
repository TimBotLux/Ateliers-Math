# Ateliers Maths

Application éducative de mathématiques (4-12 ans, inspiration Montessori), en React + Vite.
Dépôt GitHub : https://github.com/TimBotLux/Ateliers-Math (branche `main`).
Référence produit : `PRD - Ateliers Maths.docx` et maquettes d'origine `Design - ecrans/`,
hors du dépôt (dans le dossier parent, sur le poste de l'auteur).
Interface, textes, commentaires et messages de commit : **en français**.

## Commandes

```bash
npm run dev     # http://localhost:5173 ; galerie des dessins : /galerie.html (?t=<index>&s=1,3,5)
npm test        # Vitest sous Node — doit rester au vert avant toute livraison
npm run build   # dist/index.html : un seul fichier autonome (exigence du PRD)
```

## Règles du produit (non négociables)

- **Aucun chiffre de progression** montré à l'enfant (ni score, ni total, ni pourcentage). Le jardin
  ne se lit qu'en images. Les dessins du jardin ne contiennent aucun chiffre (compter = points).
- **Toute évolution est additive** : on ne modifie pas une activité existante pour en ajouter une.
- **Le matériel corrige l'erreur**, jamais un « faux ». Message d'erreur unique : `CHECK_AGAIN`
  (« Regarde mieux, vérifie ta réponse. ») dans `src/data/messages.js`.
- **L'enfant n'est jamais bloqué** : replis silencieux (stockage indisponible, parcours vide, 3 essais max).
- Pas de compte, pas de serveur, rien ne sort de l'appareil (`localStorage` uniquement).
- Décision d'architecture durable → la présenter à l'utilisateur avant de la coder.

## Architecture (`src/`)

- `engines/` : `activityRegistry`, `adaptiveEngine` (paliers 1-3, date de dernière pratique),
  `sessionEngine` (Ma Mission ; option `recency` = révisions espacées, utilisée en 10-12),
  `gardenEngine` (8 zones × 6 stades, clé `gardenEngineV2`, ancien compteur `jardinMathsTotal`
  en lecture seule), `balanceEngine`, `profiles`, `backup`, `storage` (repli mémoire).
- `activities/` : `index.js` (4-6 et 7-9), `path1012.js` (10-12), `balanceLevels.js` (poids1).
  Une activité = clé, parcours, ordre, compétences (zones), interaction, générateur de manches.
- `rounds/` : un composant par type d'interaction (`balance`, `choix`, `comparaison`, `clavier`,
  `panier`, `droite`). Contrat : `onResult(succès au premier essai)` puis `onDone()`.
- `garden-themes/` : 2 univers (`fees`, `gare`) × 3 styles d'âge, un fichier par combinaison
  (`fees46`, `fees79`, `fees1012`, `gare46`…). Zone = `{ sub, stages[6], stickers[{from,to?,svg}] }`,
  fragments SVG 200×170. Helpers communs dans `common.js` (S = autocollant 4-6, F = ombre plate,
  `isoBox`/`isoPoint` = isométrique 10-12). Textes dépendant de l'univers : `THEME_COPY`, `choiceLabel`.
- `state/AppContext.jsx` : profils, réglages, voix (`speak`), encouragements (`cheer`), navigation (`go`).

## Préférences validées par l'utilisateur

- Voix par défaut : « garçon » enthousiaste ; voix réglable dans l'Espace adulte.
- Encouragements à voix haute **toutes les 3 bonnes réponses** seulement ; le prénom **une fois
  sur deux** à l'oral, jamais dans les messages à l'écran (sauf le titre de fin).
- Fin de séance : « Ton jardin a grandi ! » / « Ta gare s'est agrandie ! », sans nommer les compétences.
- Enchaînement sans toucher : manches de « Je pèse » (5 s) et ateliers en mode Explorer (6 s).
- Style du jardin : féerique mais pas « girly » (peu de rose, réaliste) ; plus moderne avec l'âge
  (4-6 autocollants, 7-9 géométrique, 10-12 isométrique). Pas de bilan parents supplémentaire.

## Façon de travailler

- Vérifier dans le navigateur intégré (format mobile) après chaque changement visible ; les profils
  de test se créent via `localStorage` (`ateliersMaths.profils`…) et **doivent être effacés ensuite**.
- Après des modifications en rafale, le rechargement à chaud de Vite peut laisser des erreurs
  anciennes dans la console : recharger la page (ou relancer le serveur) avant de conclure.
- PowerShell : les apostrophes typographiques (’) cassent les chaînes ; utiliser l'outil d'édition.
- Ajouter un test Vitest pour toute règle nouvelle (activités, thèmes, moteurs).
- Envoi sur GitHub à la demande : `npm test` au vert, commit au message descriptif en français, `git push`.
