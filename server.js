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
con.connect(function (err) {
    if (err) throw err;
    console.log("connected!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*
    Description des routes
*/

app.use('/assets', express.static(path.join(__dirname, 'views', 'assets')));

app.get("/", function (req, res) {
    con.query("SELECT * FROM Produit ORDER BY Nom DESC LIMIT 6 ", (err, produits) => {
        if (err) {
            console.error('Erreur avec la consultation de la BD.', err);
            return res.status(500).send('Collections non trouvées.');
        }
        res.render("pages/index", { produits: produits });
    });

})

app.get("/compte", function (req, res) {
    res.render("pages/compte");
})

app.get("/collection", function (req, res) {

    con.query('SELECT NomCollection, CollectionID FROM Collection', (err, results) => {
        if (err) {
            console.error('Erreur avec la consultation de la BD.', err);
            return res.status(500).send('Collections non trouvées.');
        }
        con.query('SELECT Nom, Prix, ProduitID FROM Produit', (err, produits) => {
            MontrerCollection(produits, "Nos Produits", results, err, res);
        });
    });
});

app.get("/collection/:id", function (req, res) {
    let idFromParams = req.params.id;
    console.log(idFromParams);

    con.query('SELECT NomCollection, CollectionID FROM Collection', (errCollection, collections) => {
        if (errCollection) {
            console.error('Erreur avec la consultation de la BD.', errCollection);
            return res.status(500).send('Collections non trouvées.');
        }

        var NomCollection = "";
        for (let index = 0; index < collections.length; index++) {
            if (collections[index].CollectionID == idFromParams) {
                NomCollection = collections[index].NomCollection;

                break;
            }
        }

        con.query('SELECT Nom, Prix, ProduitID FROM Produit where CollectionID = ?', idFromParams, (errProduct, produits) => {

            MontrerCollection(produits, NomCollection, collections, errProduct, res);
        });
    });
})

function MontrerCollection(ListeProduits, NomCollection, results, err, res) {
    if (err) {
        console.error('Erreur avec la consultation de la BD.', err);
        return res.status(500).send('Collection non trouvée.');
    }
    var hrefFondDEcran = "assets/img/" + NomCollection + ".jpg";
    if (NomCollection == "Nos Produits") {
        hrefFondDEcran = "../" + hrefFondDEcran;
    }
    for (let index2 = 0; index2 < ListeProduits.length; index2++) {
        console.log(ListeProduits[index2]);
    }
    res.render("pages/collection.ejs", {
        fondDEcran: "assets/img/" + NomCollection + ".jpg",
        produits: ListeProduits,
        collection: NomCollection,
        imgNonTrouvee: "assets/img/IMG_NONTROUVEE.jpg",
        collections: results,
    });
}

app.get("/checkout", function (req, res) {
    res.render("pages/checkout");
})

app.get("/produit/:id", function (req, res) {
    const id = req.params.id;
    con.query("SELECT * FROM Produit WHERE ProduitID = ?", [id], function (err, result) {
        if (err) throw err;
        res.render("pages/produit", { produit: result[0] });
    });
});

app.get("/login", function (req, res) {
    res.render("pages/login");
})

app.get("/signup", function (req, res) {
    res.render("pages/signup");
});


app.post("/login", function (req, res) {
    const { email, password } = req.body;

    con.query("SELECT * FROM Client WHERE Email = ? AND Mdp = ?", [email, password], function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            res.json({ message: "success" });
        } else {
            res.json({ message: "failed" });
        }
    });
});


app.post("/signup", function (req, res) {
    const { prenom, nom, email, mdp } = req.body;

    con.query("SELECT * FROM Client WHERE Email = ?", [email], function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            res.json({ message: "Email already exists. Please choose another email." });
        } else {

            con.query("INSERT INTO Client (Prenom, Nom, Email, Mdp) VALUES (?, ?, ?, ?)", [prenom, nom, email, mdp], function (err, result) {
                if (err) throw err;

                res.json({ message: "success" });
            });
        }
    });
});

// expose assets

app.listen(3000, function () {
    console.log("serveur fonctionne sur http://localhost:3000 ... ! ");
});