var express = require('express');
var router = express.Router();

router.get("/",  function(req, res) {
    res.send('This route is for all submission related tasks');
});

module.exports = router;