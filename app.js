const express = require ('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Routes */
var user = require('./routes/user.js');
var submission = require('./routes/submissions.js');

const config = require('./config/config');

const app = express();

app.get('/', (res, req) => {
    res.send('API start');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});

/* Parsers */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


/* Routes */
app.use('/user', user);
app.use('/submission', submission);

module.exports = app;
