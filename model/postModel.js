const { Schema, model } = require('mongoose');

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'Podaj tytuł posta'],
		},
		content_html: {
			type: String,
			required: [true, 'Post musi mieć treść'],
		},
		snippet: {
			type: String,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		last_edited_by: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		isPublished: {
			type: Boolean,
			required: true,
			default: false,
		},
		cover_photo: {
			type: String,
			default: 'https://source.unsplash.com/random',
		},
		comments: {
			type: [Schema.Types.ObjectId],
			ref: 'Comment',
			default: [],
		},
	},
	{ versionKey: false, timestamps: true }
);

const Post = model('Post', postSchema);

module.exports = Post;
