const express = require('express');
const app = express();
const port = 3000;

const currencies = require('./currencies');

app.get('/', (require, responce) => {
    responce.send('Hello Anhelina!');
});

app.get ('/currencies', (require, responce) => {
    currencies.getAllCurrencies().then (result => {
        responce.send(result);
});
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});