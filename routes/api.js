import express from "express";
import { validateEmail } from "../utils/utils.js";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import tryCatch from "../utils/tryCatch.js";

import Client from "../models/client.js";

const api = express.Router();

api.post(
	"/signup",
	tryCatch(async (req, res) => {
		const { prenom, nom, email, mdp } = req.body;

		if (!prenom || !nom || !email || !mdp) {
			return res.status(400).json({ message: "Champs manquants" });
		}

		if (!validateEmail(email)) {
			return res.status(400).json({ message: "Adresse email est invalide" });
		}

		if (mdp.length < 8) {
			return res.status(400).json({ message: "Mot de passe trop court (8 caracteres min)" });
		}

		const emailExists = await Client.exists({ email });

		if (emailExists) {
			return res.status(400).json({ message: "Adresse email est déjà utilisée" });
		}

		// hash the password
		const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_ROUNDS));
		const mdpHash = await bcrypt.hash(mdp, salt);

		await Client.create({
			prenom,
			nom,
			email,
			mdpHash,
		});

		return res.status(200).json({ message: "Votre compte a été créé avec succès" });
	})
);
api.post(
	"/account",
	tryCatch(async (req, res) => {
		const { id, prenom, nom, email } = req.body;

		if (!prenom || !nom || !email) {
			return res.status(400).json({ message: "Champs manquants" });
		}

		if (!validateEmail(email)) {
			return res.status(400).json({ message: "Adresse email est invalide" });
		}
		await Client.findByIdAndUpdate(id, {
			'prenom': prenom,
			'nom': nom,
			'email': email
		});

		return res.status(200).json({ message: "Votre compte a été créé avec succès" });
	})
);
api.post(
	"/login",
	tryCatch(async (req, res) => {
		const INVALID_LOGIN = "Adresse email ou mot de passe incorrect";

		const { email, mdp } = req.body;

		if (!email || !mdp) {
			return res.status(400).json({ message: "Champs manquants" });
		}

		const client = await Client.findOne({ email });

		if (!client) {
			return res.status(400).json({ message: INVALID_LOGIN });
		}

		const isPasswordValid = await bcrypt.compare(mdp, client.mdpHash);

		if (!isPasswordValid) {
			return res.status(400).json({ message: INVALID_LOGIN });
		}

		const token = jwt.sign({ userId: client._id }, process.env.JWT_SECRET_TOKEN);

		return res.status(200).json({ message: "Vous êtes connecté", token });
	})
);

api.post('/complete',
	tryCatch(async (req, res) => {
		const { idClient } = req.body;

		const cart = await Client.findByIdAndUpdate(idClient, {
			$set: { cart: [] }
		})
	})
);

api.post(
	"/cart/enlever",
	tryCatch(async (req, res) => {
		const { idClient } = req.body;
		const { produitId } = req.body;

		await Client.findByIdAndUpdate(idClient, {
			$pull: { cart: produitId },
		});
		return res.status(200).send("Produit enleve");
	})
);

api.post(
	"/cart/modifierQuantiter",
	tryCatch(async (req, res) => {
		const { idClient } = req.body;
		const { produitId } = req.body;
		const { Quant } = req.body;
		// Recherche du client dans la base de données
		const client = await Client.findById(idClient);

		if (!client) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}

		await Client.findByIdAndUpdate(idClient, {
			$pull: { cart: produitId },
		});

		for (let index = 0; index < Quant; index++) {
			await Client.findByIdAndUpdate(idClient, {
				$push: { cart: produitId },
			});
		}

		return res.status(200).send("Quantite modifie");
	})
);
api.get(
	"/check-auth",
	auth,
	tryCatch(async (req, res) => {
		return res.status(200).json({ message: "Auth successful", userId: req.auth.userId });
	})
);

api.post(
	"/cart",
	auth,
	tryCatch(async (req, res) => {
		const INVALID_BODY = "Les champs sont invalides";
		const userId = req.auth.userId;
		const { produitsID } = req.body;

		if (!produitsID || !produitsID instanceof Array) {
			return res.status(400).json({ message: "Champs manquants" });
		}

		const client = await Client.findById(userId);

		client.cart = [...client.cart, ...produitsID];
		client.save();

		return res.status(200).json({ message: "Ajouté au panier", produitsID });
	})
);

api.post(
	"/userCart",
	auth,
	tryCatch(async (req, res) => {
		const userId = req.auth.userId;

		// Recherche du client dans la base de données
		const client = await Client.findById(userId);

		if (!client) {
			return res.status(404).json({ message: "Utilisateur non trouvé" });
		}

		const cartContent = client.cart;

		const productsDetails = await Promise.all(
			cartContent.map(async (item) => {
				const product = await Produit.findById(item.produit);

				return {
					produit: product,
					quantite: item.quantite,
				};
			})
		);

		return res.status(200).json({ cartContent: productsDetails });
	})
);

export default api;
