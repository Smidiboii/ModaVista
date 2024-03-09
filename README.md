## Configuration de la Base de Données

1. Assurez-vous d'avoir un utilisateur nommé 'scott' dans votre base de données SQL, avec une database 'scott' et un mot de passe, Oracle.

2. Exécutez le script SQL suivant pour créer des tables dans le schéma 'scott'. Les définitions de ces tables se trouvent dans le fichier `tables.sql`:

    ```sql
    USE scott;
    -- Exécutez le contenu de tables.sql ici
    ```

## Installation de Node.js et NPM

Assurez-vous d'avoir Node.js et npm installés sur votre machine. Si ce n'est pas le cas, suivez les étapes ci-dessous :

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
## Configuration du Projet
Naviguez jusqu'au répertoire de votre projet dans le terminal.
Installez nodemon en tant que dépendance de développement avec la commande suivante :

```
npm install nodemon --save-dev
```
Démarrez le serveur en utilisant la commande suivante :
```
nodemon server.js
```
Assurez-vous que le serveur écoute sur le port 3000 (Vu dans le terminal).

## Accéder à la Page Web
Ouvrez un navigateur web.
Entrez l'URL suivante dans la barre d'adresse :
```
http://localhost:3000
```
Vous devriez maintenant avoir accès à la page web.
