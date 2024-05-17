# Modavista

Site web de modavista

Modavista est un site web de vente de vêtements en ligne. Il permet aux utilisateurs de consulter les articles disponibles, de les ajouter à leur panier et de les acheter. Les utilisateurs peuvent également consulter leur historique de commandes.

![image](https://github.com/Smidiboii/ModaVista/assets/115375151/5080ea32-65f8-4fc4-b7bc-557ffa9d1828)


## Installation

```bash
npm install
```

## Lancement

```bash
npm start
```

## Tests

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

## Fichier .env

```
BCRYPT_ROUNDS = 10
MONGO_URI = 'mongodb://localhost:27017/db'
JWT_SECRET_TOKEN = 'secret'
STRIPE_SECRET_KEY = 'xxx'
```
