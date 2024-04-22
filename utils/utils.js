const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const extractCookie = (cookieName, cookies) => {
	if (!cookies) {
		return null;
	}

	const cookiesSplit = cookies.split(";");
	let cookieValue = null;

	cookiesSplit.forEach((cookie) => {
		const cookiePair = cookie.split("=");
		const curCookieName = cookiePair[0].trim();
		if (curCookieName === cookieName) {
			cookieValue = cookiePair[1];
			return;
		}
	});

	return cookieValue;
};

export { validateEmail, extractCookie };
