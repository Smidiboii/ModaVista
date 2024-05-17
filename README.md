# Modavista

Modavista est un site web de vente de vêtements en ligne. Il permet aux utilisateurs de consulter les articles disponibles, de les ajouter à leur panier et de les acheter. Les utilisateurs peuvent également consulter leur historique de commandes.

## Installation

```bash
npm install
```

## Fichier .env

Ajoutez un fichier .env à la racine du projet avec les variables d'environnement suivantes :

```
BCRYPT_ROUNDS = 10
MONGO_URI = 'mongodb://localhost:27017/db'
JWT_SECRET_TOKEN = 'secret'
STRIPE_SECRET_KEY = 'xxx'
```

## Lancement

Avant le lancement, assurez-vous que le serveur MongoDB est en cours d'exécution.
Aussi, assurez-vous d'avoir un fichier .env avec les variables d'environnement nécessaires.

```bash
npm start
```

## Seed

Utiliser le script suivant pour ajouter des données à la base de données :

```bash
npm run seed
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
