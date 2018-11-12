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
var Community = require('../model/community')


/**
 * All community related routes
 */
router.get("/", (req, res) => {
    res.send('This route is for all community related tasks');
});

/**
 * Create a new community
 */
router.post("/create-community", authenticate, (req, res) => {

    if (!req.body || !req.body.username || !req.body.communityName || !req.body.communityDescription) {
        res.status(400).json({ message: "Community data is incomplete" });
        return;
    }

    // New Community Data
    var newCommunity = new Community({
        communityName: req.body.communityName,
        communityDescription: req.body.communityDescription,
        founder: req.body.username,
    });
    
    // Add to database 
    newCommunity.save().then(() => {
        res.status(200).send(newCommunity)
    }).catch((err) => {
        res.status(400).send(err);
    }).then(() => {
        Community.findOneAndUpdate({ communityName: req.body.communityName }, { $push: {moderators: req.body.username}}).then(() => {
            }).catch((err) => {
                res.status(400).send({ message: "An error has occoured with adding initial mod" });
                res.send(err);
                return
        });
    })
});

/**
 * Get all submissions in a community
 */
router.get("/all-subs-in-community", authenticate, (req, res) => {
    Submission.find({ community: req.headers.community }).then((subs) => {
        res.send(subs);
    }).catch((err) => {
        res.status(400).send(err)
    })
});

/*
 * Get all communities
 */

router.get("/get-all-community", authenticate, (req, res) => {
    Community.find({}).then((community) => {
        res.send(community);
    }).catch((err) => {
        res.status(400).send(err);
    })
})


module.exports = router;