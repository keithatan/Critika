var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var authenticate = require('../middleware/auth');
var nodemailer = require('nodemailer');

mongoose.connect(process.env.MONGODB_HOST);

mongoose.Promise = global.Promise;
var db = mongoose.connection;
var email_address = "critika.app@gmail.com";
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/* Objects */
var User = require('../model/user');

/**
 * All user related routes
 */
router.get("/", function (req, res) {
    res.send('This route is for all user related tasks');
});

/*
 * Register new user 
 */
router.post("/register", (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.securityquestion) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }

    // Create a verification code between 1000 and 9999
    var verificatonCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

    // User Data
    var newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        securityquestion: req.body.securityquestion,
        verified: false,
        verificationNum: verificatonCode
    });

    var newMemberEmailBody = "Dear " + req.body.username +
        ",\n\nWelcome to Critika! We ask you to please verify your account with us. Your verification code is:\n" +
        verificatonCode + "\nWe look forward to having you with us!\n\nSincerely, \nThe Critika Team";
    var newMemberEmailSubject = "Welcome to Critika!";


    // Add to database
    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
        sendEmail(req.body.email, newMemberEmailSubject, newMemberEmailBody);
    }).catch((err) => {
        res.status(400).send(err)
        return;
    })

});

/* 
 * View Account 
 */
router.get("/account", authenticate, (req, res) => {
    res.send(req.user);
});

router.get("/test", (req, res) => {
    res.json({message: "This works"});
});

/*
 * Login 
 */
router.post("/login", (req, res) => {
    // check for username and password
    if (req.body.username && req.body.password) {
        User.findByLogin(req.body.username, req.body.password).then((user) => {
            // If the user has not verified their email, then prompt for verification code
           if (!user.verified) {
                res.status(200).send({ message: "Account has not been verified, please verify your account" });
            }
            return user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(user);
            });
        }).catch((err) => {
            res.status(400).send({ message: "Error Loging in, Username or Password is incorrect" });
        });
    }
    else {
        res.status(400).send({ message: "Login information is incomplete, missing username or password" });
        return;
    }
});

/**
 * Verify new user's email
 */
router.post("/verify-email", authenticate, (req, res) => {
    // Check if user data is complete
    if (!req.body || !req.body.verificationNum) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }

    // Check if user has entered in the correct verification number
    if (!req.user.verificationNum == req.body.verificationNum) {
        res.status(400).send({ message: "Verification code does not match" });
        return;
    }

    // Update the database if the verification number is correct
    User.findOneAndUpdate({ username: req.user.username }, { $set: { verified: true } }).then(() => {
        res.status(200).send({ message: "User has been succesfully verified" });
    }).catch((err) => {
        res.status(400).send({ message: "An error has occoured with verifying your account" });
        res.send(err);
    });
})

/**
 * Edit a user's email and security question
 */
router.post("/edit-info", authenticate, (req, res) => {
    if (!req.body || !req.body.email || !req.body.securityquestion) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }

    var userInfo = new User({
        newEmail: req.body.email,
        newSecurityquestion: req.body.securityquestion,
    });

    User.findOneAndUpdate({ username: req.user.username },
        {
            $set: {
                email: req.body.email,
                securityquestion: req.body.securityquestion,
            }
        }).then(() => {
            res.status(200).send({ message: 'User information successfully updated' })
        }).catch((err) => {
            res.status(400).send({ message: "Error changing information" });
            res.send(err);
        })
})

/**
 * Create/Update Rating 
 */
router.post("/rating", authenticate, (req, res) => {
    if (!req.body || !req.body.rating || !req.body.recuser) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }

    var recUser;

    User.findOne({ username: req.body.recuser }).then((foundUser) => {
        recUser = foundUser
    }).catch((err) => {
        res.status(400).send(err);
    })

    User.findOneAndUpdate({ username: req.body.recuser },
        {
            $set: {
                ratingNum: recUser.rating + 1,
                rating: (parseFloat(JSON.stringify(req.body.rating)) + parseFloat(JSON.stringify(recUser.rating))) / ratingNo,
            }
        }).then(() => {
            res.status(200).send({ message: 'Rating successfully updated' })
        }).catch((err) => {
            res.status(400).send({ message: "Error changing rating" });
            res.send(err);
        })

});

/**
 * Get All Users
 */
router.get("/allUsers", authenticate, (req, res) => {

    if (req.user.status == 'admin') {
        User.find({}).then((users) => {
            res.send(users);
        }).catch((err) => {
            res.status(400).send(err);

        })
    }
    else {
        res.status(401).send({ message: '401 ERROR: Access Denied' })
    }
})

/*
 * Change Password 
 */
router.post("/change-password", authenticate, (req, res) => {
    var username = req.user.username;
    var newPassword = req.body.password;

    User.findOneAndUpdate({ username: username }, { $set: { password: newPassword } }).then(() => {
        res.status(200).send({ message: 'Password was successfully changed' });
    }).catch((err) => {
        res.status(400).send({ message: "Login information is incomplete" });
        res.send(err);
    });
})

/**
 * Reset Password
 */
router.post("/reset-password-email", (req, res) => {

    if (!req.body || !req.body.email) {
        res.status(400).send({ message: "Reset information is incomplete" });
        return;
    }

    // check and find user by email
    if (req.body.email) {
        User.findByEmail(req.body.email).then((email) => {
            var verificatonCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            var email_subject = "Critika Password Reset";
            var email_body = "Dear " + email + ", \n\nOur records indicate that you have requested a password " +
                "reset. Click the link below and enter the four digit code to begin the process.\n\n" +
                verificatonCode + "\n\nSincerely, \n\nThe Critika Team";
            
            // find user by email and set verification number
            User.findOneAndUpdate({ email: email }, { $set: { verificationNum: verificatonCode } }).then(() => {
                res.status(200).send({ message: 'Verification code set' });
            }).catch((err) => {
                res.status(400).send({ message: "Verification code was not set" });
                res.send(err);
            });

            // send email
            sendEmail(email, email_subject, email_body);
        }).catch((err) => {
            res.status(400).send({ message: "Email does not exist in our records" });
        });
    }
})

/**
 * Sends an email from critika.app@gmail.com to the specified 'to' email, with a subject and body given by the 
 * function caller.
 * @param {string} to 
 * @param {string} subject 
 * @param {string} body 
 */
function sendEmail(to, subject, body) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email_address,
            pass: process.env.EMAIL_PASSWD
        }
    });

    var mailOptions = {
        from: email_address,
        to: to,
        subject: subject,
        text: body
    };

    console.log("Sending to: " + to)
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = router;
