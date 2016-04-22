
var mongoose = require('mongoose');

var searchPlugin = require('mongoose-search-plugin');

var GameSchema = mongoose.Schema({
	title: String,
    description: String,
    tags: [String]
});


// give our schema text search capabilties
GameSchema.plugin(searchPlugin, {
    fields: ['title', 'description', 'tags']
  });

// add a text index to the tags array
//GameSchema.index({ tags: 'text' });

mongoose.model('Game', GameSchema);
