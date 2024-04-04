import express from "express";
import { validateEmail } from "../utils/utils.js";
import Client from "../models/client.js";
import bcrypt from "bcrypt";
import "dotenv/config";

const api = express.Router();

api.post("/login", async (req, res) => {
	const { prenom, nom, email, mdp } = req.body;

	if (!prenom || !nom || !email || !mdp) {
		return res.status(400).json({ message: "Champs manquants" });
	}

	if (!validateEmail(email)) {
		return res.status(400).json({ message: "Adresse email est invalide" });
	}

	if (mdp.length < 8) {
		return res.status(400).json({ message: "Mot de passe trop court" });
	}

	const emailExists = Client.findOne({ email });

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
});

export default api;
