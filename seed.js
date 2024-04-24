import mongoose from "mongoose";
import Client from "./models/client.js";
import CodePromo from "./models/codePromo.js";
import Collection from "./models/collection.js";
import Produit from "./models/produit.js";
import Commande from "./models/commande.js";
import "dotenv/config";
import bcrypt from "bcrypt";


(async() => {
    const db = mongoose.connection;

    db.on("error", (err) => {
        console.error("Error connecting to MongoDB:", err);
    });

    db.once("open", () => {
        console.log("Connected to MongoDB");
    });

    await mongoose.connect(process.env.MONGO_URI);

    // clear the database
    console.log("Clearing the database...");
    await db.dropDatabase();

    console.log("Seeding...");

    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_ROUNDS));
    const mdpHash = await bcrypt.hash("password123", salt);

    const client = await Client.create([{
        prenom: "John",
        nom: "Doe",
        email: "john@example.com",
        mdpHash,
    }, ]);

    await CodePromo.create([{
        rabaisPourcent: 10,
        dateExpiration: new Date("2021-12-31"),
    }, ]);

    const collectionChandail = await Collection.create({ nom: "Chandail" });
    const collectionChaussure = await Collection.create({ nom: "Chaussures" });
    const collectionValentin2024 = await Collection.create({ nom: "Valentin 2024" });
    const collectionEte2024 = await Collection.create({ nom: "Été 2024" });
    const collectionHiver2024 = await Collection.create({ nom: "Hiver 2024" });


    await Produit.create([{
            nom: "Chemise décontractée",
            description: "Chemise en coton confortable à porter au quotidien.",
            marque: "XYZ Brand",
            taille: "M",
            genre: "H",
            prix: 29.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Chemise noire",
            description: "Chemise noire en coton confortable à porter au quotidien.",
            marque: "Black Brand",
            taille: "M",
            genre: "H",
            prix: 21.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Chaussures de course",
            description: "Chaussures légères avec une excellente traction pour la course.",
            marque: "ABC Sportswear",
            taille: "L",
            genre: "F",
            prix: 59.99,
            collectionId: collectionChaussure._id,
        },
        {
            nom: "Chemise rouge",
            description: "Chemise rouge en coton confortable à porter au quotidien.",
            marque: "Red Brand",
            taille: "M",
            genre: "F",
            prix: 21.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Chemise comfortable",
            description: "Chemise en coton confortable à porter au quotidien.",
            marque: "XYZ Brand",
            taille: "M",
            genre: "H",
            prix: 29.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: 'Cotton ouate rose',
            description: 'Cotton ouate rose pour les journées froides.',
            marque: 'Cotton Ouate',
            taille: 'M',
            genre: 'F',
            prix: 59.99,
            collectionId: collectionValentin2024._id,
        }
    ]);

    await Commande.create({
        clientId: client[0]._id,
        etat: "EN COURS",
        produits: [{
                nom: "Chemise décontractée",
                description: "Chemise en coton confortable à porter au quotidien.",
                marque: "XYZ Brand",
                taille: "M",
                genre: "H",
                prix: 29.99,
                collectionId: collectionChandail._id,
            },
            {
                nom: "Chaussures de course",
                description: "Chaussures légères avec une excellente traction pour la course.",
                marque: "ABC Sportswear",
                taille: "L",
                genre: "F",
                prix: 59.99,
                collectionId: collectionChaussure._id,
            },
        ],
    });

    // close
    await mongoose.disconnect();
})();
