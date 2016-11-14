var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('mongoose-bcrypt');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// create a schema
var userSchema = Schema({
    username : { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    password : {type: String, required: true},
 });

// create a model using it
var User = mongoose.model('User', userSchema);

// make this available in the Node applications
module.exports = User;