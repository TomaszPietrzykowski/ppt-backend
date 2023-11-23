const express = require('express');
const {
	createPost,
	getAllPosts,
	getPostById,
	editPost,
	deletePost,
	getLatestPosts,
} = require('../controller/blogController.js');
// const { getUsers } = require('../controller/userController.js');
const authorize = require('../middleware/authMiddleware.js');

const blogRouter = express.Router();

blogRouter.route('/').get(getAllPosts).post(authorize, createPost);
blogRouter.route('/latest').get(getLatestPosts);
blogRouter
	.route('/:id')
	.get(getPostById)
	.put(authorize, editPost)
	.delete(deletePost);

module.exports = blogRouter;
