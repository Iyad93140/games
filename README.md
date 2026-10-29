# Letter Lab — Jeu de lettres en JavaScript

Un mini-jeu web : deviner un mot de cinq lettres en six essais. Chaque proposition indique les lettres bien placées, présentes ailleurs et absentes. Les lettres répétées sont comptées correctement, avec priorité aux bonnes positions.

> Projet pédagogique créé avec assistance IA en octobre 2026. Ce jeu est distinct du projet universitaire FindMyWord en Java mentionné sur mon CV. Il constitue une nouvelle base à comprendre et améliorer.

## Lancer

Depuis ce dossier, avec Python 3.11+ :

```sh
python3 -m http.server 8081 --bind 127.0.0.1
```

Ouvrir **http://127.0.0.1:8081** dans un navigateur récent. Le serveur est nécessaire au chargement des modules JavaScript. Aucune inscription ni dépendance JavaScript.

Tests des règles, avec Node.js 20+ :

```sh
node --test test_core.mjs
```

## Organisation

- `core.mjs` : normalisation des accents, calcul des indices, progression et fin de partie.
- `app.mjs` : affichage, formulaire et nouvelle partie.
- `style.css` : présentation adaptée au mobile, focus visible et indices par symbole en complément des couleurs.
- `test_core.mjs` : lettres répétées, entrées invalides, victoire, défaite et absence de mutation de l’état initial.

## Limites connues

15 mots secrets, pas de dictionnaire de validation des propositions, pas de sauvegarde ni de statistiques. Les mots sont visibles dans le code client : c’est un jeu local, pas une compétition sécurisée. Les tests automatisés couvrent la logique ; un contrôle complet sur plusieurs navigateurs reste à faire.

## Améliorations à réaliser

- Ajouter un dictionnaire français documenté et compatible avec sa licence.
- Ajouter un clavier virtuel et des statistiques locales.
- Écrire des tests de navigateur pour le parcours utilisateur.

[Retour au profil](https://github.com/Iyad93140)
