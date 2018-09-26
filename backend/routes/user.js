var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_HOST);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/* Objects */
var User = require('../model/user');

router.get("/",  function(req, res) {
    res.send('This route is for all user related tasks');
});

/* Register */
router.post("/register", function(req, res){
    if(!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.securityquestion){
        res.status(401).json({message: "User data is incomplete"});
        return;
      }
      /* User Data */
      var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        securityquestion: req.body.securityquestion,
        verified: false
      });

      /* Add to database */
      newUser.save(function (err) {
        if (err) return handleError(err);
      });      


});

/* Login */
router.post("/login", function(req, res) {
    if(req.body.username && req.body.password){
      var username = req.body.email;
      var password = req.body.password;
      var existQuery = User.where({ username: username, password: password});
      existQuery.findOne(function (err, kitten) {
          if (err) return handleError(err);
          if (kitten) {
                if (kitten == null){
                    res.status(401).json({message: "Wrong login information"});
                }
                    res.status(401).json({message: "Exists"});


             }
            
            });


    }
    else{
        res.status(401).json({message: "Login information is incomplete"});
        return;
    }
});

module.exports = router;
