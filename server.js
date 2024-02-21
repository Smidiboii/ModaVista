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
    database: "scott"
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

app.get("/login", function(req, res) {
    res.render("pages/login");
})

// login endpoint api

app.post("/login", function(req, res) {
    const { email, password } = req.body;

    con.query("SELECT * FROM CLIENT WHERE email = ? AND mdp = ?", [email, password], function(err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ message: "success" });
        } else {
            res.json({ message: "failed" });
        }
    });
});

// expose assets

app.listen(3000, function() {
    console.log("serveur fonctionne sur http://localhost:3000 ... ! ");
});