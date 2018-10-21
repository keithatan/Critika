var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
var authenticate = require('../middleware/auth');
var nodemailer = require('nodemailer');

mongoose.connect(process.env.MONGODB_HOST, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

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

router.post('/add-friend', (req, res) => {
    if (!req.body.email || !req.body.username || !req.body.friend) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }
    else {
        User.findByLogin({username: req.body.friend}).then((friend) => {
            User.findOneAndUpdate({ username: req.body.username }, { $push: {friends: req.body.friend}}).then(() => {
                res.status(200).send({ message: "Friend successfully added!" });
            }).catch((err) => {
                res.status(400).send({ message: "An error has occoured with adding friend" });
                res.send(err);
            });
        }).catch((err) => {
            res.status(400).send({ message: "Friend does not exist" });
            res.send(err);
        })
    }
})

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

    if(User.standing == "banned"){
        res.status(400).send({message: "This account has been banned due to violation of conduct"})
        return;
    }

    res.send(req.user);
});

router.get("/test", (req, res) => {
    res.json({ message: "This works" });
});

/*
 * Login 
 */
router.post("/login", (req, res) => {
    // check for username and password
    if (req.body.username && req.body.password) {

        if(User.standing == "banned"){
            res.status(400).send({message: "This account has been banned due to violation of conduct"})
            return;
        }

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
router.post("/verify-email", (req, res) => {
    // Check if user data is complete
    if (!req.body || !req.body.verificationNum || !req.body.email) {
        res.status(400).send({ message: "User data is incomplete" });
        return;
    }

    console.log(req.body.email)
    User.findVerificationNumByEmail(req.body.email).then((verificationNum) => {
        // Check if user has entered in the correct verification number
        if (verificationNum != req.body.verificationNum) {
            res.status(400).send({ message: "Verification code does not match" });
            return;
        }
        else {
            User.findOneAndUpdate({ email: req.body.email }, { $set: { verified: true } }).then(() => {
                res.status(200).send({ message: "User has been succesfully verified" });
            }).catch((err) => {
                res.status(400).send({ message: "An error has occoured with verifying your account" });
                res.send(err);
            });
        }
    }).catch((err) => {
        res.status(400).send({ message: "Email does not exist in our records" });
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
 * Add coins to user
 */
router.post("/add-coin", authenticate, (req, res) => {
    if (!req.body || !req.body.coins|| !req.body.recuser) {
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
                coins: recUser.coins + parseInt(req.body.coins),
            }
        }).then(() => {
            res.status(200).send({ message: 'Coins successfully added' })
        }).catch((err) => {
            res.status(400).send({ message: "Error adding coins" });
            res.send(err);
        })

});

/**
 * Remove coins from user
 */
router.post("/Remove-coin", authenticate, (req, res) => {
    if (!req.body || !req.body.coins|| !req.body.recuser) {
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
                coins: recUser.coins - parseInt(req.body.coins),
            }
        }).then(() => {
            res.status(200).send({ message: 'Coins successfully removed' })
        }).catch((err) => {
            res.status(400).send({ message: "Error removing coins" });
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
 * Route to ban user, ADMIN only function 
 */

router.post("/ban-user", authenticate, (req, res) => {
    if(req.user.status != 'admin'){
        res.status(401).send({ message: '401 ERROR: Access Denied, user is not an admin' })
    }

    else{

        var randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        User.findByLogin(req.body.usernameToBeBanned, req.body.password).then((user) => {
            User.findOneAndUpdate({username: req.body.usernameToBeBanned}, {$set : {recoveryUsername: req.body.usernameToBeBanned, username: randomName, standing: "banned"}})
            .then(() => {
                res.status(200).send({message: "User is now banned"})
                /* Delete user from database or username to list of banned names? */
                /* I think we should just delete the user, and instead store the email in an array of banned emails */
            })
        }).catch((err) => {
            res.status(400).send({ message: "Error Loging in, Username or Password is incorrect" });
        });
    }
})

/*
 * Route to un-ban user, ADMIN only function 
 */

router.post("/restore-user", authenticate, (req, res) => {
    if(req.user.status != 'admin'){
        res.status(401).send({ message: '401 ERROR: Access Denied, user is not an admin' })
    }

    else{
        User.findByRecoveryName(req.body.usernameToBeRestored, req.body.password).then((user) => {
            User.findOneAndUpdate({recoveryUsername: req.body.usernameToBeRestored}, {$set : {username: req.body.usernameToBeRestored, standing: "good"}})
            .then(() => {
                res.status(200).send({message: "User is now restored"})
                /* Delete user from database or username to list of banned names? */
                /* I think we should just delete the user, and instead store the email in an array of banned emails */
            })
        }).catch((err) => {
            res.status(400).send({ message: "Error Loging in, Username or Password is incorrect" });
        });
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

/*
 * Make a user an admin, admin only function
 */

 router.post("/become-admin", authenticate, (req, res) => {

    if(!req.body || !req.body.username){
        res.status(400).send({message: "Information incomplete"})
    }

    else{
        User.findOneAndUpdate({ username: req.body.username }, { $set: { status: "admin" } }).then(() => {
            res.status(200).send({ message: 'User is now an admin' });
        }).catch((err) => {
            res.status(400).send({ message: "Information incomplete" });
            res.send(err);
        });
    }
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
