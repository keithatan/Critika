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

module.exports = router;