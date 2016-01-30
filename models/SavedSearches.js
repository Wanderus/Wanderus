var mongoose = require('mongoose');

var SavedSearchSchema = new mongoose.Schema({

    placeName: String,
    state: String


});

mongoose.model('SavedSearch', SavedSearchSchema);
