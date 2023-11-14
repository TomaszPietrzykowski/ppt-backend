const express = require('express');
const { register, login } = require('../controller/authController.js');
const { getUsers } = require('../controller/userController.js');
// const authorize from '../middleware/authMiddleware';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.route('/').get(getUsers);

module.exports = userRouter;
