import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { Produit } from "./tables.js"; // Import the schemas from tables.js

const app = express();
const __filename = fileURLToPath(
    import.meta.url);
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

db.on("error", err => {
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

app.use('/assets', express.static(path.join(__dirname, 'views', 'assets')));

app.get("/", function(req, res) {
    res.render("pages/index");
});

app.get("/compte", function(req, res) {
    res.render("pages/compte");
});

app.get("/collection", function(req, res) {
    res.render("pages/collection");
});

app.get("/checkout", function(req, res) {
    res.render("pages/checkout");
});

app.get("/login", function(req, res) {
    res.render("pages/login");
});

app.get("/signup", function(req, res) {
    res.render("pages/signup");
});

app.get("/produit/:id", async function(req, res) {
    const id = req.params.id;
    try {
        const produit = await Produit.findOne({ ProduitID: id });
        res.render("pages/produit", { produit: produit });
    } catch (err) {
        console.error("Error finding product:", err);
        res.sendStatus(500);
    }
});

// login endpoint api
app.post("/login", function(req, res) {
    const { email, password } = req.body;
    const collection = db.collection('clients');
    collection.findOne({ email: email, mdp: password }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json({ message: "success" });
        } else {
            res.json({ message: "failed" });
        }
    });
});

// signup endpoint api
app.post("/signup", function(req, res) {
    const { prenom, nom, email, mdp } = req.body;
    const collection = db.collection('clients');
    collection.findOne({ email: email }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json({ message: "Email already exists. Please choose another email." });
        } else {
            collection.insertOne({ prenom: prenom, nom: nom, email: email, mdp: mdp }, function(err, result) {
                if (err) throw err;
                res.json({ message: "success" });
            });
        }
    });
});

// expose assets
app.listen(3000, function() {
    console.log("Le serveur fonctionne sur http://localhost:3000 ... ! ");
});