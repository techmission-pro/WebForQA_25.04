const axios = require('axios')

const apiURL = 'https://api.monobank.ua/bank/currency';

// axios.get(apiURL).then((response)=>{
//     const data = response.data;
//
//     for (let item of data)
//     {
//         const line = item.currencyCodeA + ';' + item.currencyCodeB + ':' + (item.rateBuy || '-') + ':' + (item.rateSell || '-') + ':' + (item.rateCrooss || '-');
//         console.log(line);
//     }
//    // const data = response.data
// });

async function main() {
    const codesResponse = await axios.get('https://pkgstore.datahub.io/core/currency-codes/codes-all_json/data/029be9faf6547aba93d64384f7444774/codes-all_json.json');
    const iso4217 = codesResponse.data;

    const response = await axios.get(apiURL)
    const data = response.data;


    for (let item of data)
    {
        const currencyA = iso4217.find((i) => i.NumericCode === item.currencyCodeA);
        const currencyB = iso4217.find((i) => i.NumericCode === item.currencyCodeB);

        const line = currencyA.AlphabeticCode + ';' + currencyB.AlphabeticCode + ':' + (item.rateBuy || '-') + ':' + (item.rateSell || '-') + ':' + (item.rateCrooss || '-');
        console.log(line);
    }
}

main();

