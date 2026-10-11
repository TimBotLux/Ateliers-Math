# Ateliers Maths — application React

Application éducative de mathématiques (4-9 ans), construite à partir du PRD
« PRD - Ateliers Maths.docx » et des 7 écrans du dossier « Design - ecrans ».

## Lancer

```bash
npm install
npm run dev        # serveur de développement : http://localhost:5173
npm test           # tests de non-régression (Vitest, sous Node)
npm run build      # produit dist/index.html : un seul fichier autonome
```

`dist/index.html` s'ouvre sans serveur (exigence de livraison du PRD). Les polices
Fredoka et Nunito viennent de Google Fonts ; hors ligne, une police système prend le relais.

## Organisation

| Dossier | Contenu |
|---|---|
| `src/engines/` | Moteurs transverses : `activityRegistry`, `adaptiveEngine`, `sessionEngine`, `gardenEngine` (Garden Engine 2.0), `balanceEngine`, profils, sauvegarde, stockage avec repli mémoire |
| `src/activities/` | Les 13 activités (générateurs de manches) et la configuration du niveau `poids1` |
| `src/rounds/` | Composants de manche : prédiction (balance), choix, comparaison, clavier, panier |
| `src/screens/` | Accueil, Explorer (4-6 / 7-9), Activité, Fin de mission, Mon jardin, Espace adulte, premier lancement |
| `src/garden-themes/` | Dessins du jardin : 2 univers (fées, gare) × 3 styles d'âge (4-6 autocollants, 7-9 moderne, 10-12 isométrique), 8 zones × 6 stades chacun. `galerie.html` (servie par `npm run dev`) les montre tous ; `?s=1,3,5` filtre les stades |
| `tests/` | 32 tests : paliers du jardin, migration, habillage de la balance sur 300 manches, oscillation, couverture des 8 zones par parcours, séances |

## Clés localStorage

- `gardenEngineV2` : jardin (un par enfant) ; `jardinMathsTotal` lu une seule fois, jamais modifié.
- `adaptiveEngine` : palier de difficulté par enfant et par activité.
- `ateliersMaths.profils` (dont l'univers choisi : `theme`), `ateliersMaths.reglages`.
- `ateliersMaths.jardinVu` : stades déjà vus, pour animer les zones qui ont grandi depuis la dernière visite.

## Parcours 10-12 ans (CM2 – 6e)

8 activités dans `src/activities/path1012.js` (ajout pur, aucune activité existante modifiée) :
droite des nombres, fractions, proportionnalité, calcul malin, aires et périmètres, angles,
problèmes à étapes, grands nombres. Les 8 zones du jardin sont couvertes.

Principes appliqués : droite numérique (grandeur des fractions et décimaux), barres et schémas
en barres (concret → imagé → abstrait), pratique entrelacée (aire/périmètre, stratégies de calcul),
retour immédiat par le matériel, aide qui n'apparaît qu'après une erreur, boutons « Je suis sûr /
Je pense » (métacognition, effet d'hypercorrection), révisions espacées dans « Ma Mission »
(`sessionEngine`, option `recency`). Le jardin a son propre style, en perspective isométrique : « Îles suspendues » (fées) et
« Hub du futur » (gare).

## Choix provisoires (questions ouvertes du PRD)

- Unité de pratique cumulée : 1 bonne réponse (`PRACTICE_UNIT` dans `gardenEngine.js`).
- Libellé du niveau 1 : « Je pèse » (proposition du PRD, reprise par les maquettes).
- Cohérence taille/poids : objet lourd dessiné plus grand au palier 1 seulement (`sizeMatchesWeight`).
- Cas d'égalité : deux objets identiques (🍎, 🍊, ⚽).
- Paires candidates E2 : présentes dans `CANDIDATE_PAIRS`, non activées.
- Le jardin ne grandit que sur une prédiction juste au premier essai.
