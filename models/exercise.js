var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var exerciseSchema = new Schema({
    exercise : String,
    description : String,
    setNum : Number,
    repsOrTime : String
});

// create a model using it
var Exercise = mongoose.model('Exercise', exerciseSchema);

// make this available in the Node applications
module.exports = Exercise;