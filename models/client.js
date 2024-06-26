import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
	prenom: { type: String, required: true },
	nom: { type: String, required: true },
	email: { type: String, required: true },
	mdpHash: { type: String, required: true },
	cart: {
		type: Array, required: false,
	},
	dateCreation: { type: Date, required: true, default: Date.now },
});

export default mongoose.model("Client", clientSchema);
