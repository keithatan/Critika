var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');


router.get("/",  function(req, res) {
    res.send('This route is for all user related tasks');
});

/* Register */
router.post("/register", function(req, res){
    if(!req.body || !req.body.email || !req.body.password || !req.body.username || !req.body.securityquestion){
        res.status(401).json({message: "User data is incomplete"});
        return;
      }
      /* User Data */
      let userData = {
        verified: false,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        security_question: req.body.securityquestion,
      }
});

/* Login */
router.post("/login", function(req, res) {
    if(req.body.email && req.body.password){
      var email = req.body.email;
      var password = req.body.password;
    }
    else{
        res.status(401).json({message: "Login information is incomplete"});
        return;
    }
});

module.exports = router;