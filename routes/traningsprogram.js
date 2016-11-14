var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../models/db');
var Exercise =  require('../models/exercise');
var Traning =  require('../models/traningslog');
var User =  require('../models/user');

var allUsers;

/* GET traningsprogram page. */
router.get('/', function(req, res, next){

    User.find({}, function(err, users) {
    allUsers = users;
    });

    Exercise.find({}, function(err, exercise)
    {
        res.render('traningsprogram', {"exercise" : exercise, title: 'FitnessApp', "userlist" : allUsers});
    });
    
});

/* GET New exercise page. */
router.get('/newexercise', function(req, res, next) {
    res.render('newexercise', { title: 'FitnessApp' });
});


// Add ny træning 
router.post('/addexercise', function(req, res, next) {

    var ex = req.body.exercise;
    var des = req.body.description;
    var se = req.body.setNum;
    var rep = req.body.repsOrTime;

    var newExercise = new Exercise({
        exercise : ex,
        description : des,
        setNum : se,
        repsOrTime : rep
    });

    newExercise.save(function(err){
        if (err) {
            // If it failed, return error            
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            console.log('User saved successfully!');
            res.redirect('/traningsprogram');
        }
    });
});

router.post('/logTraning', function(req,res,next){        
    Exercise.find({}, function(err, exercise)
    {
        var newLog = new Traning({
            traningslog : exercise,
            user : req.body.selUser            
        }).save(function(err){
        if (err) {
            // If it failed, return error            
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            console.log('User saved successfully!');
            res.redirect('/index');
        }
        });        
    });   

});


module.exports = router;