const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const userRouter = require('./router/userRouter.js');
const blogRouter = require('./router/blogRouter.js');
const corsMiddleware = require('./middleware/corsMiddleware.js');
const connectDB = require('./config/db.js');
const errorMiddleware = require('./middleware/errorMiddleware.js');
const AppError = require('./utils/appError.js');

dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const app = express();
connectDB();

app.use(errorMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('*', corsMiddleware);
// routes
app.use('/api/users', userRouter);
app.use('/api/blog', blogRouter);
app.use(express.static(path.join(__dirname, '/view')));
app.use('/api/*', (req, res, next) => {
	return next(new AppError('Endpoint nie istnieje', 404));
});
app.get('*', (req, res) =>
	res.sendFile(path.resolve(__dirname, 'view', 'index.html'))
);
app.use(errorMiddleware);
// const server = app.listen();
const server = app.listen(port, () => {
	console.log(`\x1b[33m																																		Server listening on http://${host}:${port} \x1b[0m`);
});

process.on('unhandledRejection', (err) => {
	console.log(`${err.name}: ${err.message}`);
	server.close(() => {
		process.exit(1);
	});
});

process.on('uncaughtException', (err) => {
	console.log(`${err.name}: ${err.message}`);
	process.exit(1);
});
