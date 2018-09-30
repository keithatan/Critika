var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_HOST);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Objects */
var Submission = require('../model/submission');

router.get("/",  function(req, res) {
    res.send('This route is for all submission related tasks');
});

router.post("/add", function(req, res){

    if(!req.body.category || !req.body.submissionName || !req.body.submissionID || !req.body.userID || !req.body.receivedCritiqueIDs){
        res.status(400).json({message: "Submission data is incomplete"});
        return;
    }

    /* New Submission Data */
    var newSubmission = new Submission({
        category: req.body.category,
        submissionName: req.body.submissionName,
        submissionID: req.body.submissionID,
        userID: req.body.userID,
        receivedCritiqueIDs: req.body.receivedCritiqueIDs,
    });

    newSubmission.save(function (err){
        if (err) return handleError(err)
    });

})

module.exports = router;