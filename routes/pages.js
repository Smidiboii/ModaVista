import express from "express";
import fetchData from "../middleware/fetchData.js";
import Produit from "../models/produit.js";

const pages = express.Router();

pages.use(fetchData);

const onlyAuthUser = (req, res, next) => {
	if (req.sharedData.isLogged) {
		next();
	} else {
		res.redirect("/login");
	}
};

const onlyGuest = (req, res, next) => {
	if (req.sharedData.isLogged) {
		res.redirect("/");
	} else {
		next();
	}
};

pages.get("/", (req, res) => {
	res.render("pages/index", req.sharedData);
});

pages.get("/register", onlyGuest, (req, res) => {
	res.render("pages/register", req.sharedData);
});

pages.get("/category/:gender/:collectionId", async (req, res) => {
	let { gender, collectionId } = req.params;

	if (!["H", "F"].includes(gender)) {
		return res.status(404).render("pages/404", req.sharedData);
	}

	const produits = await Produit.find({
		collectionId,
	});

	res.render("pages/category", { ...req.sharedData, produits, gender });
});

pages.use("*", (req, res, next) => {
	res.status(404).render("pages/404", req.sharedData);
});

export default pages;
