var mongoose = require('mongoose');

var ParkSchema = new mongoose.Schema({

    parkName: String,
    parkType: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}


});


mongoose.model('Park', ParkSchema);
