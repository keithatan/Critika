const express = require ('express');

const app = express();

app.get('/', (res, req) => {
    res.send('Critika Application is created');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});