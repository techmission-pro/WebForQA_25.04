const axios = require("axios");
async function getAllCurrencies() {
     const iso4217 = (await axios.get ('https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/029be9faf6547aba93d64384f7444774/codes-all_json.json')).data;
     const data = (await axios.get ('https://api.monobank.ua/bank/currency')).data;

     const result = [];
     for (let item of data) {
         const currencyA = iso4217.find((i)=> i.NumericCode === item.currencyCodeA);
         const currencyB = iso4217.find((i)=> i.NumericCode === item.currencyCodeB);
         //const line= currencyA.AlphabeticCode + ';' + currencyB.AlphabeticCode + ';' + (item.rateBuy || '-') + ';' + (item.rateSell || '-') + ';' + (item.rateCross || '-');
         //console.log(line);
/        //
         //lines.push(line);
         result.push({
             currencyA: currencyA.AlphabeticCode,
             currencyB: currencyB.AlphabeticCode,
             rateBuy: item.rateBuy || undefined,
             rateSell: item.rateSell || undefined,
             rateCross: item.Cross || undefined,
         });
     }
     return result;
}

module.exports = {
    getAllCurrencies: getAllCurrencies,
    };
