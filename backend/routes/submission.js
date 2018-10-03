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
var User = require('../model/user');

router.get("/", (req, res) => {
    res.send('This route is for all submission related tasks');
});

/**
 * Adds submission
 */
router.post("/add", authenticate, (req, res) => {

    if (!req.body.category || !req.body.submissionName || !req.body.submissionText) {
        res.status(400).json({ message: "Submission data is incomplete" });
        return;
    }

    /* New Submission Data */
    var newSubmission = new Submission({
        category: req.body.category,
        submissionName: req.body.submissionName,
        submissionText: req.body.submissionText,
        username: req.user.username,
    });

    /* Change submission num */

    User.findOneAndUpdate({ username: req.user.username },
        {
            $set: {
                submissionNum: req.user.submissionNum + 1
            }
        }).then(() => {
            res.status(200).send({ message: 'User information successfully updated!' })
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
    

    /* Add to database */
    newSubmission.save().then(() => {
        res.status(200).send(newSubmission);
    }).catch((err) => {
        res.status(400).send(err);
    })
})

/**
 * Remove from databse
 */
router.post("/remove", authenticate, (req, res) => {

    if (!req.body.submissionName) {
        res.status(400).json({ message: "No submission data" });
        return;
    }

    User.findOneAndUpdate({ username: req.user.username },
        {
            $set: {
                submissionNum: req.user.submissionNum - 1
            }
        }).then(() => {
            res.status(200).send({ message: 'User information successfully updated!' })
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })

    User.findOneAndRemove({ username: req.user.username, submissionName: req.body.submissionName }).then(() => {
            res.status(200).send({ message: "Submission succesfully removed!" })
        }).catch((err) => {
            res.status(400).send({ message: "No submission found" });
            res.send(err);
        })
})

router.get("/mine", authenticate, (req, res) => {
    Submission.find({ username: req.user.username }).then((subs) => {
        res.send(subs);
    });
});

router.get("/available", authenticate, (req, res) => {
    Submission.find({}).then((subs) => {
            res.send(subs);
        }).catch((err)=>{
            res.status(400).send(err)
        })
});

router.get("/all", authenticate, (req, res) => {

    if (req.user.status == 'admin') {
        Submission.find({}).then((subs) => {
            res.send(subs);
        });
    }
    else {
        res.status(401).send({ message: '401 ERROR: Access Denied' })
    }
});

module.exports = router;