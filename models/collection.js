import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
	nom: { type: String, required: true },
});

module.exports = mongoose.model("Collection", collectionSchema);
