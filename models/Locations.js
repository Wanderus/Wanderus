var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({

    geonameId: String,
    name: String,
    adminCode1: String,
    fclName: String,
    countryName: String,
    fcl: String,
    population: String,
    postal: String,
    countryCode: String,
    toponymName: String,
    countryId: String,
    lat: String,
    lng: String,
    fcode: String,
    fcodeName: String,
    adminName1: String



});

mongoose.model('Location', LocationSchema);
