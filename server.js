import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
    Configuration de EJS
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
    Connection au serveur MongoDB avec Mongoose
*/
const uri = "mongodb://localhost:27017/db";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => {
	console.error("Error connecting to MongoDB:", err);
});

db.once("open", () => {
	console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    Description des routes
*/

app.use("/assets", express.static(path.join(__dirname, "views", "assets")));

app.get("/", function (req, res) {
	res.render("pages/index");
});

app.get("/lol", function (req, res) {
	res.render("pages/index");
});

// 404 error
app.all("*", (req, res, next) => {
	res.render("pages/404");
	next();
});

app.use(errorHandler);

// expose assets
app.listen(3000, function () {
	console.log("Le serveur fonctionne sur http://localhost:3000");
});
