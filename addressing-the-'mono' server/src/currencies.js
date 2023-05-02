const axios = require("axios");
const apiURL = 'https://api.monobank.ua/bank/currency';
async  function getAllCurrencies() {
    const codesResponse = await axios.get('https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/029be9faf6547aba93d64384f7444774/codes-all_json.json');
    const iso4217 = codesResponse.data;
    const response = await axios.get(apiURL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
        }//необязательно ибо все равно на сервере моно проверка на реквесты
    })
    const data = response.data;
    let counter = 0;
    const result = [];
    for (let item of data) {
        const currencyA = iso4217.find((i) => i.NumericCode === item.currencyCodeA);
        const currencyB = iso4217.find((i) => i.NumericCode === item.currencyCodeB);
        counter++; // светофор
        // const line = currencyA.AlphabeticCode + ';' + currencyB.AlphabeticCode + ';' + (item.rateBuy || '-') + ';' + (item.rateSell || '-') + ';' + (item.rateCrooss || '-');
        // console.log(line);
        //
        //
        // lines.push(line); // добавление в масив linesre
        //const line = currencyA.AlphabeticCode + ';' + currencyB.AlphabeticCode + ';' + (item.rateBuy || undefined) + ';' + (item.rateSell || undefined) + ';' + (item.rateCrooss || undefined);
       // result.push(line);
        result.push({
            currencyA: currencyA.AlphabeticCode,
            currencyB: currencyB.AlphabeticCode,
            rateBuy: item.rateBuy || undefined,
            rateSell: item.rateSell || undefined,
            rateCross: item.rateCross || undefined,
        });

        if (counter === 3) {
            break; // обрыв цикла
        }


    }
    return result;
}

module.exports = {
    getAllCurrencies: getAllCurrencies,
}