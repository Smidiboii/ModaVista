import express from "express";

const pages = express.Router();

pages.get("/", (req, res) => {
	res.render("pages/index");
});

pages.get("/register", (req, res) => {
	res.render("pages/register");
});

export default pages;
