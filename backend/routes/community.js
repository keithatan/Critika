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
var community = require('../model/community')


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
    if (!req.body.category || !req.body.submissionName || !req.body.submissionText) {
        res.status(400).json({ message: "Submission data is incomplete" });
        return;
    }
})

module.exports = community;