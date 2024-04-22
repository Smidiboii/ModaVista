import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
	nom: { type: String, required: true },
});

export default mongoose.model("Collection", collectionSchema);
