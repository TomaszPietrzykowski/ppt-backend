const Post = require('../model/postModel.js');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync.js');
const extractSnippet = require('../utils/extarctSnippet.js');

exports.createPost = catchAsync(async (req, res) => {
	const user = req.user;
	if (!user || !user.isAuthor) {
		throw new AppError('Brak autoryzacji', 401);
	}
	const newPost = await Post.create({
		title: req.body.title,
		content_html: req.body.content_html,
		snippet: req.body.snippet || extractSnippet(req.body.content_html),
		author: user._id,
		last_edited_by: user._id,
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
	const post = await Post.findById(req.params.id).populate([
		{
			path: 'author',
			model: 'User',
			select: '_id name',
		},
		{
			path: 'last_edited_by',
			model: 'User',
			select: '_id name',
		},
	]);

	res.status(200).json({
		status: 'success',
		data: {
			post,
		},
	});
});

exports.editPost = catchAsync(async (req, res) => {
	const user = req.user;
	if (!user || !user.isAuthor) {
		res.status(401);
		throw new AppError('Brak autoryzacji do edycji postów', 401);
	}
	const post = await Post.findById(req.params.id);
	if (post) {
		post.title = req.body.title || post.title;
		post.content_html = req.body.content_html || post.content_html;
		post.snippet =
			req.body.snippet || extractSnippet(req.body.content_html);
		post.author = post.author;
		post.last_edited_by = user._id;
		post.isPublished = req.body.isPublished || false;
		post.cover_photo = req.body.cover_photo || post.cover_photo;

		const updatedPost = await post.save();
		res.status(200).json({
			status: 'success',
			data: {
				post: updatedPost,
			},
		});
	} else {
		throw new AppError('Product not found', 404);
	}
});

exports.deletePost = catchAsync(async (req, res) => {
	const user = req.user;
	if (!user) {
		throw new AppError('Problem z autentykacją, zaloguj sie ponownie', 401);
	}
	if (!user.isAuthor && !user.isAdmin) {
		throw new AppError('Brak autoryzacji do edycji postów', 403);
	}
	const post = await Post.findById(req.params.id).populate('author', '_id');
	if (post) {
		if (!user.isAdmin && post.author._id !== user._id) {
			throw new AppError(
				'Tylko admin lub autor posta może go usunąć. Jeśli posiadasz takie uprawnienia to zaloguj się ponownie.',
				403
			);
		}
		await post.deleteOne();

		res.status(204).json({
			status: 'success',
			data: {},
		});
	} else {
		throw new AppError('Post nie isnieje', 404);
	}
});
