const errorHandler = (error, req, res, next) => {
	console.error(error.stack);

	if (error.name === "ValidationError") {
		return res.status(400).json({
			type: "ValidationError",
			errors: error.errors,
			message: "Something went wrong",
		});
	}
	return res.status(500).json({ message: "Something went wrong" });
};

export default errorHandler;
