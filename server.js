import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);
import mysql from "mysql";
import { MongoClient } from "mongodb";

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
    Connection à MongoDB
*/
const uri = "mongodb+srv://scott:oracle@bdmodavista.welwlkh.mongodb.net/";
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error('Erreur avec la consultation de la BD.', err);
    }
}

connectToMongoDB();
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

app.get("/signup", function (req, res) {
    res.render("pages/signup");
});

app.get("/collection/:id", async (req, res) => {
    let idFromParams = req.params.id;
    console.log(idFromParams);

    try {
        const db = client.db('Modavista');
        const ListeProduits = db.collection('Produit');
        const produits = await ListeProduits.find({ 'CollectionID': { $eq: Number(idFromParams) } }).project({ 'Nom': 1, 'Prix': 1, 'ProduitID': 1 }).toArray();
        const collections = await ObtenirCollections(idFromParams, res);
        console.log(produits);

        MontrerCollection(produits, collections[0], collections[1], res, idFromParams);
    } catch (err) {
        console.error('Erreur avec la consultation de la BD.', err);

    }
});

app.post("/signup", async function (req, res) {
    const { prenom, nom, email, mdp, tel, adresse } = req.body;
    const db = client.db('Modavista');
    const listeClient = db.collection("Client");
    const ClientDoc = {
        Prenom: prenom,
        Nom: nom,
        Email: email,
        Mdp: mdp,
        Telephone: tel,
        Adresse: adresse
    };
    try{
        listeClient.insertOne(ClientDoc);        
        res.json({ message: "success" });
    }finally{
        console.log(await findClient(listeClient,prenom));
    }
});                     
export async function findClient(collection, nom){
    return collection.find({nom}).toArray();
}

app.get("/login", function (req, res) {
    res.render("pages/login");
})

export async function connexionClient(collection, email, password){
    collection.find({email, password}).toArray();
}
var Email;
var Password;
app.post("/login", async function (req, res) {
    const { email, password } = req.body;

    const db = client.db('Modavista');
    const listeClient = db.collection("Client");
    try{
        await connexionClient(listeClient, email, password);
    }finally{
        Email = email;
        Password = password;
    }
});

app.get("/compte", function (req, res) {
    res.render("pages/compte");
})

app.post("/compte",async function (req,res){
    const db = client.db('Modavista');
    const listeClient = db.collection("Client");
    const { prenomC, nomC } = req.body;

    try{
        await connexionClient(listeClient, email, password);
    }finally{
        prenomC = 
    }
});

function ObtenirCollections(idFromParams, res) {
    return new Promise((resolve, reject) => {
        con.query('SELECT NomCollection, CollectionID FROM Collection', (errCollection, collections) => {
            if (errCollection) {
                console.error('Erreur avec la consultation de la BD.', errCollection);
                res.status(500).send('Collections non trouvées.');
                reject(errCollection);
            } else {
                var NomCollection = "";
                for (let index = 0; index < collections.length; index++) {
                    if (collections[index].CollectionID == idFromParams) {
                        NomCollection = collections[index].NomCollection;
                        break;
                    }
                }
                var data = [NomCollection, collections];
                resolve(data);
            }
        });
    });
}

function MontrerCollection(ListeProduits, NomCollection, results, res, idFromParams) {
    console.log(NomCollection);
    var hrefFondDEcran = "assets/img/" + NomCollection + ".jpg";
    if (NomCollection == "Nos Produits") {
        hrefFondDEcran = "../" + hrefFondDEcran;
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




app.listen(3000, function () {
    console.log("serveur fonctionne sur http://localhost:3000 ... ! ");
});
