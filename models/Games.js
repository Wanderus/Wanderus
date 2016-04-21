var mongoose = require('mongoose');

var textSearch = require('mongoose-text-search');

var GameSchema = mongoose.Schema({
	name: String,
    tags: [String],
  	likes: Number,
  	created: Date
});


// give our schema text search capabilties
GameSchema.plugin(textSearch);

// add a text index to the tags array
GameSchema.index({ tags: 'text' });

mongoose.model('Game', GameSchema);