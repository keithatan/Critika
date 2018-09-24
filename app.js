const express = require ('express');

const app = express();

app.get('/', (req, res) => {

    res.send('Critika Application is created');
});
app.listen(3000);