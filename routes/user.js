var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_HOST);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


/* Objects */
var User = require('../model/user');

router.get("/", function (req, res) {
    res.send('This route is for all user related tasks');
});

/* Register */
router.post("/register", (req, res) =>{
    if (!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.securityquestion) {
        res.status(400).send({ message: "User data is incomplete" });
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
    newUser.save().then(() => {
        newUser.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth', token).send(newUser);
    }).catch((err) =>{
        res.status(400).send(err)
    })
});

/* Send email*/
router.post("/email", (req, res) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'critika.app@gmail.com',
            pass: '307group2018'
        }
    });

    var mailOptions = {
        from: 'critika.app@gmail.com',
        to: 'kensodetz@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'This is a test'
    };

    console.log("Sending...")
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
            res.status(400).json({ message: "Email Error" });
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: "Email Sent" });
        }
    });

});



/* Get User */
/* This should be an admin only thing */
/*
router.get("/find", (req, res) =>{
    if (req.headers.username) {
        var query = User.where({ username: req.headers.username });
        query.findOne((err, user) => {
            if (err) return handleError(err);
            if (user) {
                if (user == null) {
                    res.status(400).json({ message: "Wrong login information" });
                }
                res.send(user)
            }
        });
    }
    else {
        return handleError(err)
    }
});
*/

/* View Profile */
router.get("/profile", function(req, res){
    if (req.headers.username && req.headers.email) {
        var query = User.where({ username: req.headers.username });
        query.findOne().then((user) => {
            res.send(user)
        }).catch((err) =>{
            res.status(400).send(err)
        });
    }
    else {
        res.status(400).send({ message: "Wrong user information" });
    }
})

/* Login */
router.post("/login", function (req, res) {
    if (req.body.username && req.body.password) {
        var username = req.body.email;
        var password = req.body.password;
        var existQuery = User.where({ username: username, password: password });
        existQuery.findOne(function (err, user) {
            if (err) return handleError(err);
            if (user) {
                if (user == null) {
                    res.status(400).json({ message: "Wrong login information" });
                }
                res.send(user)
            }
        });
    }
    else {
        res.status(400).json({ message: "Login information is incomplete" });
        return;
    }
});

/* Change Password*/
router.post("/change-password", function(req, res){
    if(!req.body.username){
        res.status(400).json({message: "No username provided"});
        return;
    }

    var username = req.body.username;
    var newPassword = req.body.password;
    
    User.findOneAndUpdate({username : username}, { $set : {password : newPassword} }, function(err){
        if(err) return handleError(err);
    })
})



module.exports = router;
