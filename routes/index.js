var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

require('../models/db');
var User = require('../models/user');
var Traning =  require('../models/traningslog');

/* GET home page. */
router.get('/', function(req, res, next) {  
    res.render('front', { title: 'FitnessApp'});
});

/* GET New User page. */
router.get('/index', function(req, res, next) {
    
    User.find({}, function(err, users) {
    //if (err) throw err;    

    res.render('index', { title: 'FitnessApp', userlist : users });

    });
});


/* GET New User page. */
router.get('/newuser', function(req, res, next) {
    res.render('newuser', { title: 'FitnessApp' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res, next) {

    var UN = req.body.username;
    var UE = req.body.useremail;
    var pass = req.body.password;

    var newUser = new User({
        username : UN,
        email : UE,    
        password : pass    
    });

    
    
    newUser.save(function(err) {
        if (err) {
            // If it failed, return error            
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            console.log('User saved successfully!');
            res.redirect("/index");
        }
    });
});

router.get('/traninglog', function(req, res, next) {
    
    Traning.find({}, function(err, tLog) {
    //if (err) throw err;
    res.render('traninglog', {
            "tLog" : tLog, title: 'Fitness-Log'
        });
    });
});

router.get('/login', function(req, res, next){

    res.render('login', { title: 'FitnessApp - Login' });
});

router.get('/validateLogin', function(req, res,next){
   
   //res.send("There was a problem getting the information from the database.")
   
    var emorus = req.body.emailOrUsername;
    var pass = req.body.password;

    if (User.find({'username' : emorus}).count()) {
        res.redirect("/index");   
    } else {
        res.send("There was a problem getting the information from the database.");
    }
});
     

module.exports = router;
