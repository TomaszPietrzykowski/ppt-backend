const express = require('express');
const {
	createPost,
	getAllPosts,
	getPostById,
	editPost,
	deletePost,
} = require('../controller/blogController.js');
// const { getUsers } = require('../controller/userController.js');
// const authorize = require('../controller/authMiddleware.js');

const blogRouter = express.Router();

blogRouter.route('/').get(getAllPosts).post(createPost);
blogRouter.route('/:id').get(getPostById).put(editPost).delete(deletePost);

module.exports = blogRouter;
