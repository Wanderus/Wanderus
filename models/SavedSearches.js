var mongoose = require('mongoose');

var SavedSearchSchema = new mongoose.Schema({

    placename: String,
    state: String


});

mongoose.model('SavedSearch', SavedSearchSchema);
