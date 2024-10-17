# SPT (Système de Projet Transformateur)

Ce projet est une application web qui permet aux utilisateurs de générer ou de modifier des projets logiciels en utilisant une interface interactive avec une IA basée sur les modèles GPT-3.5-turbo et GPT-4 de OpenAI.

## Fonctionnalités

- Chargement de Fichiers : Les utilisateurs peuvent charger des fichiers YAML ou ZIP contenant des projets existants.
- Interaction avec l'IA : L'application utilise des fonctions d'agent pour interagir avec l'utilisateur, générer du code, modifier des projets et créer de la documentation.
- Génération de Code : En se basant sur les idées de l'utilisateur, l'application génère du code source pour le projet.
- Documentation Automatique : L'application génère automatiquement de la documentation en markdown pour le projet.
- Téléchargement du Projet : Les utilisateurs peuvent télécharger le projet généré sous forme de fichier ZIP.

## Technologies Utilisées

- React avec TypeScript
- Vite
- OpenAI API
- Express.js (pour le backend)
- js-yaml pour la manipulation des fichiers YAML

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Créez un fichier `.env` à la racine du projet et ajoutez votre clé API OpenAI :
   ```
   VITE_OPENAI_API_KEY=votre_clé_api_ici
   ```

## Utilisation

1. Lancez le serveur de développement avec `npm run dev`
2. Ouvrez votre navigateur et accédez à `http://localhost:5173`
3. Suivez les instructions à l'écran pour charger un fichier, modifier le projet et télécharger le résultat

## Tests

Exécutez les tests avec la commande `npm test`

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.