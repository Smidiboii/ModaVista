import express from "express";
import fetchData from "../middleware/fetchData.js";

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

pages.use("*", (req, res, next) => {
	res.status(404).render("pages/404", req.sharedData);
});

export default pages;
