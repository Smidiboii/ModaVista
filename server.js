import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import app from "./app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
    Connection au serveur MongoDB avec Mongoose
*/
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => {
	console.error("Error connecting to MongoDB:", err);
});

db.once("open", () => {
	console.log("Connected to MongoDB");
});

// expose assets
app.listen(3000, function () {
	console.log("Le serveur fonctionne sur http://localhost:3000");
});
