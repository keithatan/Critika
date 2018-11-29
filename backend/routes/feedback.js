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
var Feedback = require('../model/feedback')

/**
 * All feedback related routes
 */
router.get("/", (req, res) => {
    res.send('This route is for all feedback related tasks');
});

/*
 * Add new feedback
 * Each user can only give one feedback
 */
router.post('/critique', authenticate, (req, res) => {
    if(!req.body || !req.body.username || !req.body.feedbackGood || !req.body.feedbackWork || !req.body.feedbackBad || !req.body.submissionName){
        res.status(400).json({ message: "Report comment data is incomplete" + req.body.username + req.body.feedbackMessage});
        return;
    }

    // New category Data
    var newFeedback = new Feedback({
        username: req.body.username,
        feedbackGood: req.body.feedbackGood,
        feedbackBad: req.body.feedbackBad,
        feedbackWork: req.body.feedbackWork,
        submissionName: req.body.submissionName,
        submissionID: req.body.submissionID,
        critiquer: req.user.username
    });

    Feedback.find({username: req.body.username, submissionName: req.body.submissionName, submissionID: req.body.submissionID}).then((subs) => {
        console.log(subs)
        console.log(req.user.username)
        var i;
        for (i = 0; i < subs.length; i++){
        if(req.user.username === subs[i].critiquer){
            console.log(subs[i].critiquer)
            res.status(401).json({ message: "You have already given feedback to this submission" });
        }
    }
    }).catch((err) => {
        res.status(400).json({ message: "Error finding feedback" });
    })

    /*we need to update submissions critique number*/
    Submission.findOneAndUpdate({ _id: req.body.submissionID },
        {
            $inc: {
                numberOfCritiquesRecieved: 1
            }
        }).then(() => {

        }).catch(() => {
            res.status(400).send({ message: "Error adding coin to the user" });
            res.send(err);
        });

    /*The person who critiques needs to get monies*/
    User.findOneAndUpdate({ username: req.user.username },
        {
            $inc: {
                coins: 1,
            }
        }).then((res) => {
            console.log ('Found ' + res)
        }).catch((err) => {
            res.status(400).send({ message: "Error adding coin to the user" });
            res.send(err);
        });

    // Add to database 
    newFeedback.save().then(() => {
        res.status(200).send(newFeedback)
    }).catch((err) => {
        res.status(400).send(err);
    });
})

/*
 * Rate feedback from 1-5 and update number of critiques received for submission
 * only the owner of this submission can do this
 */
router.post('/rate-feedback', authenticate, (req, res) => {
    if(!req.body || !req.body.username  || !req.body.submissionName || !req.body.feedbackRating){
        res.status(400).json({ message: "Report comment data is incomplete" });
        return;
    }
    Submission.find({submissionName: req.body.submissionName}).then((subs) => {
        if(req.body.username != subs[0].username){
            res.status(400).json({ message: "You are not the owner of this post to rate the feedback" });
            return;
        }
    })

    Submission.findOneAndUpdate({submissionName:  req.body.submissionName}, 
        {
            $set: 
            {
                numberOfCritiquesRecieved: numberOfCritiquesRecieved+1,
            }
        }).catch((err) => {
            // console.log(err)
        })
   
    Feedback.findOneAndUpdate({submissionName:  req.body.submissionName}, 
        {
            $set: 
            {
                feedbackRating: req.body.feedbackRating
            }
        }).then(() => {
            res.status(200).send({message: "Feedback has been rated!"})
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
})

/*
 * Get all feedback for a given submission
 */
router.get('/all-submission', authenticate, (req, res) => {
    Feedback.find({submissionID: req.headers.submissionid}).then((subs) => {
        res.send(subs)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

/*
 * Get all feedback for a given submission
 */
router.get('/all-user', authenticate, (req, res) => {
    Feedback.find({username: req.headers.username}).then((subs) => {
        res.send(subs)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

module.exports = router;