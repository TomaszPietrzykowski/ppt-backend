const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');

const jwtDecodeAsync = (token, secret) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, {}, (err, payload) => {
			if (err) {
				reject(err);
			} else {
				resolve(payload);
			}
		});
	});
};

const authorize = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Nie jesteś zalogowany, brak uprawnień', 401));
	}

	const decoded = await jwtDecodeAsync(token, process.env.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError('Nie znaleziono użytkownika związanego z tokenem', 401)
		);
	}

	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError('Uzytkownik zmienił hasło, zaloguj się ponownie', 401)
		);
	}

	req.user = currentUser;
	next();
});

module.exports = authorize;
