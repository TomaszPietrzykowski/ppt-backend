const User = require('../model/userModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

exports.register = catchAsync(async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	const token = signToken(newUser._id);

	const userToSend = {
		_id: newUser._id,
		name: newUser.name,
		email: newUser.email,
		isAdmin: newUser.isAdmin,
		isAuthor: newUser.isAuthor,
		token,
	};

	res.status(201).json({
		status: 'success',
		data: {
			user: userToSend,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new AppError('Podaj email i hasło', 400));
	}

	const user = await User.findOne({ email }).select('+password');

	if (!user || !(await user.matchPassword(password, user.password))) {
		return next(new AppError('Niepoprawny login lub hasło', 401));
	}

	const token = signToken(user._id);

	const userToSend = {
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		isAuthor: user.isAuthor,
		token,
	};

	res.status(200).json({
		status: 'success',
		data: {
			user: userToSend,
		},
	});
});
