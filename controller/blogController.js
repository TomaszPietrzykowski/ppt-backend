const Post = require('../model/postModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const extractSnippet = require('../utils/extarctSnippet.js');

exports.createPost = catchAsync(async (req, res) => {
	const newPost = await Post.create({
		title: req.body.title,
		content_html: req.body.content_html,
		snippet: req.body.snippet || extractSnippet(req.body.content_html),
		author: req.body.author,
		isPublished: req.body.isPublished,
		cover_photo: req.body.cover_photo,
	});

	res.status(201).json({
		status: 'success',
		data: {
			post: newPost,
		},
	});
});

exports.getAllPosts = catchAsync(async (req, res) => {
	const posts = await Post.find();

	res.status(200).json({
		status: 'success',
		data: {
			posts,
		},
	});
});

exports.getPostById = catchAsync(async (req, res) => {
	const post = await Post.findById(req.params.id).populate(
		'author',
		'_id name'
	);

	res.status(200).json({
		status: 'success',
		data: {
			post,
		},
	});
});

exports.editPost = catchAsync(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post) {
		post.title = req.body.title || post.title;
		post.content_html = req.body.content_html || post.content_html;
		post.snippet =
			req.body.snippet || extractSnippet(req.body.content_html);
		post.author = req.body.author || post.author;
		post.isPublished = req.body.isPublished || post.isPublished;
		post.cover_photo = req.body.cover_photo || post.cover_photo;

		const updatedPost = await post.save();
		res.status(200).json({
			status: 'success',
			data: {
				post: updatedPost,
			},
		});
	} else {
		res.status(404);
		throw new AppError('Product not found', 404);
	}
});

exports.deletePost = catchAsync(async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (post) {
		await post.deleteOne();

		res.status(204).json({
			status: 'success',
			data: {},
		});
	} else {
		res.status(404);
		throw new AppError('Product not found', 404);
	}
});
