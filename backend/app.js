const express = require ('express');

/* Routes */
var user = require('./routes/user.js');

const app = express();

app.get('/', (res, req) => {
    res.send('Critika Application is created');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});

app.use('/user', user);

module.exports = app;
