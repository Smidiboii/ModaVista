import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import routePages from "./routes/pages.js";
import routeApi from "./routes/api.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

/*
    Configuration de EJS
*/
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    Description des routes
*/

app.use("/assets", express.static(path.join(__dirname, "views", "assets")));
app.use("/api", routeApi);

app.use("/", routePages);

app.use(errorHandler);

export default app;
