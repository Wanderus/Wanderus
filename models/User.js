var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({

    username: {type: String, lowercase:true, unique: true},
    hash: String,
    salt: String


});


UserSchema.methods.setPassword = function(password)
{
    // generate a salt
    this.salt = crypto.randomBytes(16).toString('hex');

    // generate a hash
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};


UserSchema.methods.validPassword = function(password)
{
    // generate a hash of a hash
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function()
{
    // set expiration to 60 displays
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    // payload, secret on two parameters
    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, 'SECRET');

};

mongoose.model('User', UserSchema);
