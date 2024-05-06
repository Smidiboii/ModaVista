import express from "express";
import fetchData from "../middleware/fetchData.js";
import tryCatch from "../utils/tryCatch.js";

import Produit from "../models/produit.js";
import Commande from "../models/commande.js";
import { MongoClient } from "mongodb";
import Client from "../models/client.js";

const pages = express.Router();

/*
	Connection à MongoDB
*/
const uri = "mongodb+srv://scott:oracle@bdmodavista.welwlkh.mongodb.net/";
const client = new MongoClient(uri);

async function connectToMongoDB() {
	try {
		await client.connect();
	} catch (err) {
		console.error('Erreur avec la consultation de la BD.', err);
	}
}

connectToMongoDB();

const db = client.db('Modavista');

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

		res.render("pages/product", { ...req.sharedData, produit, produitId, Commande });
	})
);
pages.get("/api/cart", async (req, res) => {
		const client = await Client.findById(req.sharedData.userId);
		res.json(client.cart);

});
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
		const client = await Client.findById(req.sharedData.userId).populate('cart.produitId');

		const cartContent = client.cart;
		let produits =[] ;

		for(let i =0; i<cartContent.length;i++){

			produits.push(await Produit.findById(cartContent[i]))
		}
		res.render("pages/cart", { ...req.sharedData, cartContent , produits});
	})
);


pages.get("/NousTrouver", tryCatch(async (req, res) => {
	res.render("pages/NousTrouver", req.sharedData);
})
);
pages.get("/api/NousTrouver", async (req, res) => {
	const db = client.db('Modavista');
	const emplacements = await db.collection('emplacements').find({}).toArray();
	res.json(emplacements);
});
pages.use("*", (req, res, next) => {
	res.status(404).render("pages/404", req.sharedData);
});

export default pages;