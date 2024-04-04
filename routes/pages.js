import express from "express";
import fetchData from "../middleware/fetchData.js";

const pages = express.Router();

pages.use(fetchData);

pages.get("/", (req, res) => {
	res.render("pages/index", req.sharedData);
});

pages.get("/register", (req, res) => {
	res.render("pages/register", req.sharedData);
});

export default pages;
