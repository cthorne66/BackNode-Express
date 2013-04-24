var Schema, mongoose, PostSchema;

mongoose = require('mongoose');
Schema = mongoose.Schema;

PostSchema = new Schema({
	id:	Number,
	title:	String,
	content:	String,
	user_id	:	Number,
	create_date:	String,
	comments:		Array
});

mongoose.model('Post', PostSchema);