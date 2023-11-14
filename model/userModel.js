const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Podaj swoje imię'],
		},
		email: {
			type: String,
			required: [true, 'Podaj swój adres email'],
			unique: true,
			lowercase: true,
			validate: {
				validator: function (v) {
					return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(v);
				},
				message: (props) =>
					`Adres email '${props.value}' jest niepoprawny.`,
			},
		},
		avatar: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		isAuthor: {
			type: Boolean,
			required: true,
			default: false,
		},
		password: {
			type: String,
			required: [true, 'Podaj hasło'],
			minlength: 6,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Potwierdź hasło'],
			minlength: 6,
			validator: function (current) {
				return current === this.password;
			},
		},
		passwordChangedAt: {
			type: Date,
		},
	},
	{ versionKey: false, timestamps: true }
);

userSchema.method(
	'matchPassword',
	async function (enteredPassword, savedPassword) {
		return await bcrypt.compare(enteredPassword, savedPassword);
	}
);

userSchema.method('changedPasswordAfter', function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			(this.passwordChangedAt.getTime() / 1000).toString(),
			10
		);
		return JWTTimestamp < changedTimestamp;
	}

	return false;
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	this.password = await bcrypt.hash(this.password, 10);

	this.passwordConfirm = undefined;
	next();
});

const User = model('User', userSchema);

module.exports = User;
