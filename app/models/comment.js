var Schema, mongoose, CommentSchema;

mongoose = require('mongoose');
Schema = mongoose.Schema;

CommentSchema = new Schema({
	postId:	Number,
	commentId:	Number,
	content:	String,
	userId	:	String,
	createDate:	String
});

mongoose.model('Comment', CommentSchema);