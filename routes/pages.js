import express from "express";
import fetchData from "../middleware/fetchData.js";
import tryCatch from "../utils/tryCatch.js";

import Produit from "../models/produit.js";
import Commande from "../models/commande.js";

const pages = express.Router();

pages.use(fetchData);

const onlyAuthUser = (req, res, next) => {
	if (req.sharedData.isLogged) {
		next();
	} else {
		res.redirect("/register");
	}
};

const onlyGuest = (req, res, next) => {
	if (req.sharedData.isLogged) {
		res.redirect("/");
	} else {
		next();
	}
};

pages.get(
	"/",
	tryCatch(async (req, res) => {
		const produits = await Produit.find().limit(4);
		res.render("pages/index", { ...req.sharedData, produits });
	})
);

pages.get(
	"/register",
	onlyGuest,
	tryCatch((req, res) => {
		res.render("pages/register", req.sharedData);
	})
);

pages.get(
	"/category/:gender/:collectionId",
	tryCatch(async (req, res) => {
		let { gender, collectionId } = req.params;

		if (!["H", "F"].includes(gender)) {
			return res.status(404).render("pages/404", req.sharedData);
		}

		const produits = await Produit.find({
			collectionId,
		});

		res.render("pages/category", { ...req.sharedData, produits, gender });
	})
);

pages.get(
	"/product/:produitId",
	tryCatch(async (req, res) => {
		const { produitId } = req.params;

		const produit = await Produit.findById(produitId);

		res.render("pages/product", { ...req.sharedData, produit });
	})
);

pages.get(
	"/account",
	onlyAuthUser,
	tryCatch(async (req, res) => {
		const commandes = await Commande.find({ clientId: req.sharedData.userId });

		res.render("pages/account", { ...req.sharedData, commandes });
	})
);

pages.get(
	"/cart",
	onlyAuthUser,
	tryCatch(async (req, res) => {
		res.render("pages/cart", req.sharedData);
	})
);

pages.get("/logout", onlyAuthUser, (req, res) => {
	res.clearCookie("token");
	res.redirect("/");
});



export default pages;
