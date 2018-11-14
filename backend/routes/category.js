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
var Category = require('../model/category')


/**
 * All category related routes
 */
router.get("/", (req, res) => {
    res.send('This route is for all category related tasks');
});

/**
 * Create a new category
 */
router.post("/create-category", authenticate, (req, res) => {

    if (!req.body || !req.body.username || !req.body.categoryName || !req.body.categoryDescription) {
        res.status(400).json({ message: "category data is incomplete" });
        return;
    }

    // New category Data
    var newCategory = new category({
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
        founder: req.body.username,
    });
    
    // Add to database 
    newCategory.save().then(() => {
        res.status(200).send(newCategory)
    }).catch((err) => {
        res.status(400).send(err);
    }).then(() => {
        Category.findOneAndUpdate({ categoryName: req.body.categoryName }, { $push: {moderators: req.body.username}}).then(() => {
            }).catch((err) => {
                res.status(400).send({ message: "An error has occoured with adding initial mod" });
                res.send(err);
                return
        });
    })
});

/**
 * Get all submissions in a category
 */
router.get("/all-subs-in-category", authenticate, (req, res) => {
    Submission.find({ category: req.headers.category }).then((subs) => {
        // console.log(req.headers.category)
        res.send(subs);
    }).catch((err) => {
        res.status(400).send(err)
    })
});

/*
 * Get all communities
 */

router.get("/get-all-category", authenticate, (req, res) => {
    Category.find({}).then((category) => {
        res.send(category);
    }).catch((err) => {
        res.status(400).send(err);
    })
})


module.exports = router;