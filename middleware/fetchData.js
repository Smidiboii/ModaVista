import Collection from "../models/collection.js";
import tryCatch from "../utils/tryCatch.js";

const fetchData = tryCatch(async (req, res, next) => {
	const collections = await Collection.find();
	req.sharedData = { collections };
	next();
});

export default fetchData;
