const express = require('express');
const app = express();
const port = 3000;
const currencies = require('./currencies');
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/currencies', (req, res) => {
    currencies.getAllCurrencies().then(result =>{
        res.send(result);
    })
});

app.get('/currencies/csv', (req, res) => {
    currencies.getAllCurrencies().then(result =>{


        const content = result.map(item => [item.currencyA, item.currencyB, item.rateBuy, item.rateSell].join(';')).join('\n');
         res.set('Content-Type', 'application/csv');
         res.set('Content-Disposition', 'attachment; filename=currencies-rate.csv');

        res.send(content);
    })
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});