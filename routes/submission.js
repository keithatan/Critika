var express = require('express');
// import { Category } from '../../frontendUI/critika/src/app/categories/categories.model';
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
var Category = require('../model/category')

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

    if (req.body.category) {
        Category.findOne({ categoryName: req.body.category }).then((resp) => {
            if (resp == null) {
                res.status(400).json({ message: "Category does not exists" });
                return;
            }
            else {
                // New Submission Data
                var newSubmission = new Submission({
                    category: req.body.category,
                    submissionName: req.body.submissionName,
                    submissionText: req.body.submissionText,
                    username: req.user.username,
                    available: true,
                    /*category: req.body.category,*/
                });

                // Change submission num

                User.findOneAndUpdate({ username: req.user.username },
                    {
                        $inc: {
                            submissionNum: 1
                        }
                    }).then(() => {
                        // Add to database 
                        newSubmission.save().then(() => {
                            // console.log(newSubmission)
                            res.status(200).send(newSubmission);
                        }).catch((err) => {
                            console.log(err)
                            res.status(400).send({ message: "Error adding submission" });
                        })
                    })
            }
        }).then(() => {
            Category.findOneAndUpdate({ categoryName: req.body.category }, {
                $inc: {
                    numberOfSubmissions: 1
                }
            }).catch((err) => {
                res.status(400).send({ message: "Error updating numberOfSubmissions" });
            })
        }).then(() => {
            User.findOneAndUpdate({ username: req.user.username }, {
                $push: {
                    'categoriesContributed': req.body.category,
                }
            }).catch((err) => {
                res.status(400).send({ message: "Error updating categories contributed" });
            })
        })
    }
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

    Submission.findOneAndUpdate({ submissionName: req.body.submissionName },
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

    Submission.findOneAndUpdate({ submissionName: req.body.submissionName },
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
router.post("/report-comment", authenticate, (req, res) => {

    if (!req.body.comment || !req.body.submissionName || !req.body.reportedMessage || !req.body.reportedReason) {
        res.status(400).json({ message: "Report comment data is incomplete" });
        return;
    }

    Submission.findOneAndUpdate({ submissionName: req.body.submissionName },
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
    if (req.user.status != 'admin') {
        res.status(401).send({ message: '401 ERROR: Access Denied' })
        return
    }

    Submission.find({ comments: { reported: true } }).then((subs) => {
        res.status(200).send(subs)
        return;
    }).catch((err) => {
        res.status(400).send(err)
        return
    })
})

/*
 * Make a submission unavailable
 */
router.post("/make-unavailable", authenticate, (req, res) => {

    if (!req.body || !req.body.submissionID) {
        res.status(400).send({ message: 'Bad information' })
    }

    Submission.findOneAndUpdate({
        _id: req.body.submissionID
    },
        {
            $set:
            {
                available: false,
            }
        }).then(() => {
            res.status(200).send()
        }).catch((err) => {
            res.status(400).send(err)
        })
})

/**
 * Get user's peronal submissions
 */
router.get("/mine", authenticate, (req, res) => {
    Submission.find({ username: req.user.username }).then((subs) => {
        res.status(200).send(subs);
    });
});

/**
 * Route to get available submissions 
 */
router.get("/available", authenticate, (req, res) => {
    Submission.find({ available: true }).then((subs) => {
        // console.log(subs)
        var userMap = {};

        subs.forEach(function (user) {
            if (user.username != req.body.username) {
                userMap[user._id] = user;
            }
        });
        res.send(userMap);
    }).catch((err) => {
        res.status(400).send(err)
    })
});

/*
 * Get all submissions available in communities the user is active in
 */

router.get('/available-with-categories', authenticate, (req, res) => {
    Submission.find({ available: true }).then((subs) => {
        User.find({ username: req.user.username }).then((user) => {
            var userMap = {};
            // console.log(subs)
            var categoriesContributed = user[0]['categoriesContributed']
            subs.forEach(function (withCat) {
                if(categoriesContributed.includes(withCat.category) && withCat.username != req.user.username){
                    userMap[withCat._id] = withCat
                }
            });
            console.log(userMap)
            res.send(userMap);
        })

    }).catch((err) => {
        res.status(400).send(err)
    })
})

/**
 * Get all submissions (admin)
 */
router.get("/all", authenticate, (req, res) => {

    if (req.user.status == 'admin') {
        Submission.find({}).then((subs) => {
            res.status(200).send(subs);
            return;
        });
    }
    else {
        res.status(401).send({ message: '401 ERROR: Access Denied' })
    }
});

module.exports = router;