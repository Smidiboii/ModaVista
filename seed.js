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
        },
        {
            nom: "Pull en laine à col rond",
            description: "Pull en laine confortable et chaud, parfait pour les journées fraîches d'automne et d'hiver. Doté d'un col rond classique et d'un design intemporel.",
            marque: "WoolCraft",
            taille: "M",
            genre: "H",
            prix: 49.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Sweat à capuche en molleton",
            description: "Sweat à capuche doux et épais en molleton, idéal pour les activités sportives ou pour se détendre à la maison. Doté d'une capuche ajustable et d'une poche kangourou pratique.",
            marque: "ActiveWear",
            taille: "L",
            genre: "H",
            prix: 39.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Pull à col V en coton",
            description: "Pull léger en coton doux avec un col en V élégant. Parfait pour les superpositions ou à porter seul pour un look décontracté et raffiné.",
            marque: "CottonComfort",
            taille: "XL",
            genre: "H",
            prix: 34.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Chandail à motifs jacquard",
            description: "Chandail à motifs jacquard sophistiqué, ajoutant une touche de style unique à votre garde-robe. Fabriqué avec des matériaux de qualité pour un confort optimal.",
            marque: "TrendyThreads",
            taille: "L",
            genre: "H",
            prix: 59.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Pull en cachemire à col roulé",
            description: "Luxueux pull en cachemire à col roulé, offrant chaleur et élégance. Un essentiel pour les jours froids et une pièce polyvalente pour toute occasion.",
            marque: "CashmereElegance",
            taille: "XL",
            genre: "H",
            prix: 99.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Cardigan en tricot à boutons",
            description: "Cardigan en tricot doux avec boutons sur le devant. Parfait pour les superpositions et les tenues décontractées.",
            marque: "KnitStyle",
            taille: "S",
            genre: "F",
            prix: 39.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Pull à col roulé en laine mélangée",
            description: "Pull à col roulé en laine mélangée, chaud et confortable. Idéal pour les journées fraîches d'automne et d'hiver.",
            marque: "CozyKnits",
            taille: "M",
            genre: "F",
            prix: 49.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Sweat à capuche oversize",
            description: "Sweat à capuche oversize, coupe décontractée et confortable. Parfait pour les journées de détente à la maison ou pour une tenue streetwear tendance.",
            marque: "UrbanComfort",
            taille: "L",
            genre: "F",
            prix: 44.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Pull à motifs géométriques",
            description: "Pull à motifs géométriques élégants, ajoutant une touche de style à votre tenue. Parfait pour les occasions décontractées ou semi-formelles.",
            marque: "ChicTrends",
            taille: "S",
            genre: "F",
            prix: 54.99,
            collectionId: collectionChandail._id,
        },
        {
            nom: "Pull en cachemire col bateau",
            description: "Pull en cachemire luxueux avec col bateau, offrant chaleur et élégance. Un essentiel pour une garde-robe hivernale sophistiquée.",
            marque: "CashmereElegance",
            taille: "M",
            genre: "F",
            prix: 89.99,
            collectionId: collectionChandail._id,
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