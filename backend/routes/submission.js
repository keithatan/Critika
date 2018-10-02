var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var authenticate = require('../middleware/auth');

mongoose.connect(process.env.MONGODB_HOST);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Objects */
var Submission = require('../model/submission');

router.get("/",  (req, res) => {
    res.send('This route is for all submission related tasks');
});

router.post("/add", authenticate, (req, res) => {

    if(!req.body.category || !req.body.submissionName || !req.body.submissionText){
        res.status(400).json({message: "Submission data is incomplete"});
        return;
    }

    /* New Submission Data */
    var newSubmission = new Submission({
        category: req.body.category,
        submissionName: req.body.submissionName,
        submissionText: req.body.submissionText,
        username: req.user.username,
    });

    /* Add to database */
    newSubmission.save().then(() =>{
        res.status(200).send(newSubmission);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

router.get("/mine", authenticate, (req, res) => {

    Submission.find({username: req.user.username}).then((users) => {
        res.send(users);
    });
});

module.exports = router;