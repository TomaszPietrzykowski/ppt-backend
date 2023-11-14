// const mongoose = require('mongoose')
// const colors = require('colors')
const mongoose = require('mongoose');

const connectDB = async () => {
	const conn = await mongoose.connect(
		process.env.DB_URI.replace('<USER>', process.env.DB_USER).replace(
			'<PASSWORD>',
			process.env.DB_PASSWORD
		)
	);
	console.log(
		`\x1b[38;5;83m***   MongoDB connected\n\x1b[38;5;87m***   DB name: ${conn.connection.name}\n\x1b[38;5;33m***   DB host: ${conn.connection.host} \n\x1b[38;5;98m***   Happy hacking!!!\x1b[0m`
	);
	// console.log(
	//   `\n\x1b[38;5;222m#################################################\n
	//     \x1b[48;5;83m\n\n
	//     \x1b[38;5;228m#################################################\n
	//     \x1b[38;5;192m#################################################\n
	//     \x1b[38;5;83m#################################################\n
	//     \x1b[38;5;84m#################################################\n
	//     \x1b[38;5;85m#################################################\n\x1b[48;5;0m
	//     \x1b[38;5;86m#################################################\n
	//     \x1b[38;5;87m#################################################\n
	//     \x1b[38;5;88m#################################################\n
	//     \x1b[38;5;89m#################################################\n
	//     \x1b[38;5;90m#################################################\n
	//     \x1b[38;5;91m#################################################\n
	//     \x1b[38;5;92m#################################################\n
	//     \x1b[38;5;93m#################################################\n
	//     \x1b[38;5;99m#################################################\x1b[38;5;0m`
	// );
	// TODO: color logging library:
	// https://blog.logrocket.com/using-console-colors-node-js/
	// https://en.m.wikipedia.org/wiki/ANSI_escape_code#Colors
};

module.exports = connectDB;
