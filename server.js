import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import mongoose from "mongoose";
import errorHandler from "./middleware/errorHandler.js";
import routePages from "./routes/pages.js";
import routeApi from "./routes/api.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


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

app.post('/cart', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Node.js and Express book'
                    },
                    unit_amount: 50 * 100
                },
                quantity: 1
            },
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'JavaScript T-Shirt'
                    },
                    unit_amount: 20 * 100
                },
                quantity: 2
            }            
        ],
        mode: 'payment',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA']
        },
        success_url: `${process.env.BASE_URL}/complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.BASE_URL}/cancel`
    })

    res.redirect(session.url)
})

app.get('/complete', async (req, res) => {
    const result = Promise.all([
        stripe.checkout.sessions.retrieve(req.query.session_id, { expand: ['payment_intent.payment_method'] }),
        stripe.checkout.sessions.listLineItems(req.query.session_id)
    ])

    console.log(JSON.stringify(await result))

    res.send('Your payment was successful')
})

app.get('/cancel', (req, res) => {
    res.redirect('/')
})  

// expose assets
app.listen(3000, function () {
	console.log("Le serveur fonctionne sur http://localhost:3000");
});
