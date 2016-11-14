var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exerciseSchema = new Schema({
    exercise : String,
    description : String,
    setNum : Number,
    repsOrTime : String
});

// create a schema
var traningSchema = new Schema({    
    traningslog : [exerciseSchema],
    user : String
});

// create a model using it
var Traningslog = mongoose.model('Traningslog', traningSchema);

// make this available in the Node applications
module.exports = Traningslog;