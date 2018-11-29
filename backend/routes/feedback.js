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
                coins: 4,
            }
        }).then((res) => {
            console.log ('Found ' + res)
        }).catch((err) => {
            res.status(400).send({ message: "Error adding coin to the user" });
            res.send(err);
        });

        User.findOneAndUpdate({ username: req.user.username },
            {
                $push: {
                    feedbackContributed: req.body.submissionID,
                }
            }).then((res) => {
                newFeedback.save().then((res) => {
                    console.log(newFeedback)

                    res.status(200).send({message : "Okay"})
                }).catch((err) => {
                });
            }).catch((err) => {
                res.status(400).send({ message: "Error adding feedback id" });
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
    if (!req.body || !req.body.submissionID || !req.body.feedbackRating) {
        res.status(400).json({ message: "Report comment data is incomplete" });
        return;
    }
    Submission.findOne({ _id: req.body.submissionID }).then((subs) => {
        console.log(subs)
        if (req.user.username != subs.username) {
            res.status(400).json({ message: "You are not the owner of this post to rate the feedback" });
            return;
        }
    }).catch((err)=>{console.log(err)})

    Submission.findOneAndUpdate({ _id: req.body.submissionID },
        {
            $inc: 
            {
                numberOfCritiquesRecieved: 1,
            }
        }).catch((err) => {
            // console.log(err)
        })
    
        let back;

    Feedback.findOneAndUpdate({ _id: req.body.feedbackID },
        {
            $set:
            {
                feedbackRating: req.body.feedbackRating
            }
        }).then((fb) => {
            console.log(fb)
            back = fb;
            console.log(back.critiquer)


            User.findOneAndUpdate({ username: back.critiquer },
                {
                    $inc: {
                        rating: req.body.feedbackRating,
                        ratingNum: 1
                    }
                }).then((response) => {
                    res.status(200).send({ message: "Feedback has been rated!" })
                    return
                }).catch((err) => {
                    //res.status(400).send({ message: "Error adding coin to the user" });
                    console.log(err)
                    //res.send(err);
                    return
                });
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
            return
        })


        

    
})


/*
 * Get all feedback for a given submission
 */
router.get('/all-submission', authenticate, (req, res) => {
    Feedback.find({ submissionID: req.user.submissionid }).then((subs) => {
        res.send(subs)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

/*
 * Get all feedback for a given submission
 */
router.get('/all-user', authenticate, (req, res) => {

    Feedback.find({ username: req.user.username }).then((subs) => {
        //console.log(subs)
        res.send(subs)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

module.exports = router;