var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');


router.get("/",  function(req, res) {
    res.send('This route is for all submission related tasks');
});

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

module.exports = router;