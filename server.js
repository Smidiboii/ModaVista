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
    let id = '0';


    con.query('SELECT * FROM articulos',
        nombre, (err, results) => {
            if (err) {
                console.error('Error al consultar la bd.', err);

                return res.status(500).send('Error interno del server');
            }

            res.render("pages/PageArticles.ejs", {
                fondDEcran: "assets/img/FondDEcran.png",
                articulos: results
            });


        });


});

