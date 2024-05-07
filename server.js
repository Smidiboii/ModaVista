import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";
import routePages from "./routes/pages.js";
import routeApi from "./routes/api.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
    Configuration de EJS
*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    Description des routes
*/

app.use("/assets", express.static(path.join(__dirname, "views", "assets")));
app.use("/api", routeApi);

app.use("/", routePages);

app.use(errorHandler);

// expose assets
app.listen(3000, function () {
    console.log("Le serveur fonctionne sur http://localhost:3000");
<<<<<<< HEAD
});
=======
});
>>>>>>> 8014e0d524de251821865071e87f22ae69b0bc8a
