import mongoose from "mongoose";
import Client from "./models/client.js";
import CodePromo from "./models/codePromo.js";
import Collection from "./models/collection.js";
import Produit from "./models/produit.js";
import "dotenv/config";

(async () => {
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

	await Client.create([
		{
			prenom: "John",
			nom: "Doe",
			email: "john@example.com",
			mdpHash: "password123",
		},
	]);

	await CodePromo.create([
		{
			rabaisPourcent: 10,
			dateExpiration: new Date("2021-12-31"),
		},
	]);

	const collectionChandail = await Collection.create({ nom: "Chandail" });
	const collectionChaussure = await Collection.create({ nom: "Chaussures" });

	await Produit.create([
		{
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
	]);

	// close
	await mongoose.disconnect();
})();
