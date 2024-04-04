import mongoose from "mongoose";

const commandeSchema = new mongoose.Schema({
	produits: { type: [produitSchema], required: true, default: [] },
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
		required: true,
	},
	etat: {
		type: String,
		required: true,
		default: "NON PAYE",
		enum: ["NON PAYE", "EN COURS", "LIVREE"],
	},
	orderDate: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Commande", commandeSchema);
