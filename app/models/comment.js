var Schema, mongoose, CommentSchema;

mongoose = require('mongoose');
Schema = mongoose.Schema;

CommentSchema = new Schema({
	id:	Number,
	content:	String,
	user_id	:	Number,
	create_date:	String
});

mongoose.model('Comment', CommentSchema);