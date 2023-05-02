const axios = require('axios')

const apiURL = 'https://api.monobank.ua/bank/currency';

const fs = require('fs')

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

    const lines = [
        'Currency A;Currency B;Rate (buy);Rate (sell);Rate (cross)',
    ];
 //////////////////////////////////////////////////

    // const lines = JSON.parse('{"currencyA":"usd", "currencyB":"uah", "rateBuy":"122", "rateSell":"122", "rateCross":"122"}');
    //
    //

 ///////////////////////////////////////////
    let counter = 0;
    for (let item of data)
    {
        const currencyA = iso4217.find((i) => i.NumericCode === item.currencyCodeA);
        const currencyB = iso4217.find((i) => i.NumericCode === item.currencyCodeB);

        // "currencyCodeA": 840,
        // "currencyCodeB": 980,
        // "date": 1682805674,
        // "rateBuy": 36.65,
        // "rateCross": 0,
        // "rateSell": 37.4406

        //const jsonAnswer = '{' + 'currencyCodeA:' + currencyA.AlphabeticCode + ';' + 'currencyCodeB:' + currencyB.AlphabeticCode + ';' + 'rateBuy:' + (item.rateBuy || '-') + ';' + 'rateSell:' + (item.rateSell || '-') + ';' + 'rateCross:'+ (item.rateCrooss || '-') + '}';

        const jsonAnswer = '{"currencyCodeA":"' + currencyA.AlphabeticCode + '";"currencyCodeB":"' + currencyB.AlphabeticCode + '";"rateBuy":"' + (item.rateBuy || '-') + '";"rateSell":"' + (item.rateSell || '-') + '";"rateCross":"' + (item.rateCrooss || '-') + '"}';

        console.log(jsonAnswer);
        console.log('Test')
        counter++; // светофор
        lines.push(jsonAnswer); // добавление в масив lines
        if (counter === 3) {
            break; // обрыв цикла
        }
    }
    const content = lines.join('\n')

    await fs.writeFile('./src/logs/output.csv', content, (err) =>{
        if (err) {
            console.error('Error write file');
            console.error(err);
        }


    });



// Получаем ссылку на элемент, в который будем вставлять данные
    const container = document.getElementById('container');

// Создаем новый элемент <p>
    const paragraph = document.createElement('p');

// Преобразуем JSON-строку в объект JavaScript
    const y = JSON.parse(jsonAnswer);

// Формируем строку с данными для вставки в элемент <p>
    const text = 'currencyCodeA: ' + y.currencyCodeA +
        ', currencyCodeB: ' + y.currencyCodeB +
        ', rateBuy: ' + y.rateBuy +
        ', rateSell: ' + y.rateSell +
        ', rateCross: ' + y.rateCross;

// Вставляем строку с данными в элемент <p>
    paragraph.textContent = text;

// Добавляем элемент <p> в контейнер
    container.appendChild(paragraph);

document.getElementById('container').innerHTML=y.currencyCodeA;



}


main();

