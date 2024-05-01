import Client from "../models/client.js";
import jwt from "jsonwebtoken";
import tryCatch from "../utils/tryCatch.js";

export default tryCatch(async (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
		const userId = decodedToken.userId;

		// check if user exists
		const clientExists = await Client.exists({ _id: userId });
		if (!clientExists) {
			throw Error("Client doesn't exist");
		}

		req.auth = {
			userId: userId,
		};

		next();
	} catch (err) {
		return res.status(401).json({
			message: "Auth failed",
		});
	}
});
