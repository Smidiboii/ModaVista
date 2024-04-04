import express from "express";

const pages = express.Router();

pages.get("/", (req, res) => {
	res.render("pages/index");
});

export default pages;
