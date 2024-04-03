import mongoose from "mongoose";

const produitSchema = new mongoose.Schema({
	nom: { type: String, required: true },
	description: { type: String, required: true },
	marque: { type: String, required: true },
	taille: { type: String, required: true, enum: ["S", "M", "L", "XL"] },
	prix: { type: Number, required: true },
	collectionId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Collection",
		required: true,
	},
});

module.exports = mongoose.model("Produit", produitSchema);
