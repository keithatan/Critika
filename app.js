const express = require ('express');

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

/* Routes */
app.use('/user', user);
app.use('/submission', submission);

module.exports = app;
