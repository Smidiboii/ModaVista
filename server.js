/*
Importation des modules requis
*/
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
import mysql from "mysql";

/*
Configuration de EJS
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs")

/*
Connection au server MySQL
*/
const con = mysql.createConnection({
    host: "localhost",
    user: "scott",
    password: "oracle",
    database: "mybd"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("connected!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*
Description des routes
*/

app.use('/assets', express.static(path.join(__dirname, 'views', 'assets')));

app.get("/", function(req, res) {;
    res.render("pages/index");
})

app.get("/compte", function(req, res) {
    res.render("pages/compte");
})

app.get("/collection", function(req, res) {
    res.render("pages/collection");
})

app.get("/checkout", function(req, res) {
    res.render("pages/checkout");
})

// expose assets

app.listen(3000, function() {
    console.log("serveur fonctionne sur http://localhost:3000 ... ! ");
});