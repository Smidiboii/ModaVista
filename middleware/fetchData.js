import Collection from "../models/collection.js";
import tryCatch from "../utils/tryCatch.js";
import jwt from "jsonwebtoken";
import { extractCookie } from "../utils/utils.js";

const fetchData = tryCatch(async (req, res, next) => {
	const collections = await Collection.find();

	let isLogged = false;
	const token = extractCookie("token", req.headers.cookie);
	let userId = null;

	if (token) {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		userId = decodedToken.userId;

		isLogged = true;
	}

	req.sharedData = { collections, isLogged, userId, token };
	next();
});

export default fetchData;
