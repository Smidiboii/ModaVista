import mongoose from "mongoose";

const codePromoSchema = new mongoose.Schema({
	rabaisPourcent: { type: Number, required: true },
	dateExpiration: { type: Date, required: true },
});

module.exports = mongoose.model("CodePromo", codePromoSchema);
