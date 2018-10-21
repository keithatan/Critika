const express = require ('express');
let cookieParser = require('cookie-parser');
var cors = require('cors');
require('dotenv').config();



/* Routes */
let user = require('./routes/user.js');
let submission = require('./routes/submission.js');
let community = require('./routes/community.js');


const app = express(cors());



/* Parsers */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


/* Routes */
app.use('/user', user);
app.use('/submission', submission);
app.use('/community', community);

app.get('/', (res, req) => {
});


app.listen(process.env.PORT, () => {
    console.log('The application is running on localhost:' + process.env.PORT)
});

module.exports = app;
