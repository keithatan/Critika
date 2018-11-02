var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var authenticate = require('../middleware/auth');

mongoose.connect(process.env.MONGODB_HOST, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Objects */
var Submission = require('../model/submission');
var User = require('../model/user');

/**
 * All submission related routes
 */
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

    // New Submission Data
    var newSubmission = new Submission({
        category: req.body.category,
        submissionName: req.body.submissionName,
        submissionText: req.body.submissionText,
        username: req.user.username,
        /*community: req.body.community,*/
    });

    // Change submission num

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
    

    // Add to database 
    newSubmission.save().then(() => {
        res.status(200).send(newSubmission);
    }).catch((err) => {
        res.status(400);
    })
})

/**
 * Edits existing submission
 */
router.post("/edit", authenticate, (req, res) => {

    if (!req.body.submissionText || !req.body.submissionName) {
        res.status(400).json({ message: "Submission data is incomplete" });
        return;
    }

    /* Change submission num */

    Submission.findOneAndUpdate({ submissionName: req.body.submissionName},
        {
            $set: {
                submissionText: req.body.submissionText
            }
        }).then(() => {
            res.status(200).send({ message: 'Submission information successfully updated!' })
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
})

/**
 * Adds comment to a submission
 */
router.post("/add-comment", authenticate, (req, res) => {

    if (!req.body.comment || !req.body.submissionName) {
        res.status(400).json({ message: "Comment data is incomplete" });
        return;
    }

    Submission.findOneAndUpdate({ submissionName: req.body.submissionName},
        {
            $push: {
                'comments': {
                    user: req.user.username, 
                    message: req.body.comment
                }
            }
        }).then(() => {
            res.status(200).send({ message: 'Comment successfully added!' })
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
})

/**
 * Remove submission from databse
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
            Submission.remove({
                submissionName: req.body.submissionName
            }).then(() => 
             res.status(200).send({ message: 'User information successfully updated!' })
            )
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
})

/*
 * Report a bad comment
 */
router.post("/report-comment", authenticate, (req,res) => {

    if (!req.body.comment || !req.body.submissionName || !req.body.reportedMessage || !req.body.reportedReason) {
        res.status(400).json({ message: "Report comment data is incomplete" });
        return;
    }

    Submission.findOneAndUpdate({ submissionName: req.body.submissionName},
        {
            $set: {
                'comments': {
                    reportedMessage: req.body.reportedMessage,
                    reportedReason: req.body.reportedReason,
                    reported: true,
                }
            }, 
        }).then(() => {
            res.status(200).send({ message: 'Comment successfully reported' })
        }).catch((err) => {
            res.status(400).send({ message: "Error reporting comment" });
            console.log(err)
            res.send(err);
        })
})

/*
 * Get all reported comments for a submission. 
 * Admin only
 */
router.get('/all-reported', authenticate, (req, res) => {
    if(req.user.status != 'admin'){
        res.status(401).send({ message: '401 ERROR: Access Denied' })
    }

    Submission.find({comments: {reported: true}}).then((subs) => {
        res.send(subs)
     }).catch((err) => {
        res.status(400).send(err)
    })
})

/**
 * Get user's peronal submissions
 */
router.get("/mine", authenticate, (req, res) => {
    Submission.find({ username: req.user.username }).then((subs) => {
        res.send(subs);
    });
});

/**
 * Route to get available submissions 
 */
router.get("/available", authenticate, (req, res) => {
    Submission.find({}).then((subs) => {
        var userMap = {};

        subs.forEach(function(user) {
          userMap[user._id] = user;
        });
        res.send(userMap);
        }).catch((err)=>{
            res.status(400).send(err)
        })
});

/**
 * Get all submissions (admin)
 */
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