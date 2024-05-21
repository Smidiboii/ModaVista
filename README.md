# Modavista

Modavista est un site web de vente de vêtements en ligne. Il permet aux utilisateurs de consulter les articles disponibles, de les ajouter à leur panier et de les acheter.


## Installation

```bash
(Si le dossier node_modules est présent, il faut l'effacer et le reinstaller) 
npm install
```

## Lancement

Avant le lancement, assurez-vous que le serveur MongoDB est en cours d'exécution.
Aussi, assurez-vous d'avoir un fichier .env avec les variables d'environnement nécessaires.

```bash
npm start
```

## Tests

Ceci exécute les tests unitaires et les tests d'intégration.

```bash
npm test
```

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Stripe
- JWT
- Bcrypt

## Sécurité

- Bcrypt pour le hachage des mots de passe
- JWT pour l'authentification
- Stripe pour le paiement
