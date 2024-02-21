/*
Importation des modules requis
*/
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql";
import { body, validationResult } from "express-validator";
import dateFormat from "dateformat";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*
Connect to server
*/
const server = app.listen(4001, function () {
    console.log("serveur fonctionne sur 4001... ! ");
    console.log(__dirname);
});
/*
Configuration de EJS
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/*
Importation de Bootstrap
*/
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use("/assets", express.static(__dirname + "/views/assets"));
/*
Connection au server MySQL
*/
const con = mysql.createConnection({
    host: "localhost",
    user: "scott",
    password: "oracle",
    database: "mybd"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("connected!");
});
/*
Description des routes
*/
app.get("/PageArticles", function (req, res) {
    res.render("pages/PageArticles.ejs", {
        fondDEcran: "assets/img/FondDEcran.png",
    });
});

app.get("/pageInscription", function(req,res){
    res.render("pages/pageInscription.ejs",{

    })
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/pageInscription", function(req, res){
    const requete = "INSERT INTO Client (Prenom, Nom, Email, Mdp, Tel.num, Adrese) VALUE(?, ?, ?, ?, ?, ?)";
    const parametres = [
        req.body.Prenom,
        req.body.Nom,
        req.body.Email,
        req.body.Mdp,
        req.body.NumreosDeTelephone,
        req.body.Adresse,
    ];

    con.query(requete, parametres, function (err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

//chatgpt code
document.getElementById("inscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le formulaire de se soumettre normalement

    // Créez un objet FormData pour envoyer les données du formulaire
    const formData = new FormData(this);

    // Envoyez une requête POST au serveur
    fetch("/pageInscription", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur lors de la requête");
        }
        return response.json();
    })
    .then(data => {
        // Traitez la réponse du serveur ici
        console.log(data);
    })
    .catch(error => {
        // Gérez les erreurs ici
        console.error(error);
    });
});