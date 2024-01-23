const fs = require('fs');
// const { argv } = require('node:process');
// const { parse } = require('path');

// const dataSet = {
//   C: [3, 4],
//   M: [
//     [1, 0],
//     [2, 1]
//   ],
//   T: [
//     [0, 3, 2],
//     [1, 3, 3]
//   ],
//   A: [['Lara', 1, 1, 'S', 'AADADAGGA']]
// };
class TreasureMap {
  formatInputData(filePath) {
    const readFile = fs.readFileSync(filePath, 'utf8').trim().split('\n');

    let formatData = { C: [], M: [], T: [], A: [] };

    readFile.map((line) => {
      const data = line.trim().split('-');
      if (data[0].trim() === 'C') {
        formatData['C'].push(parseInt(data[1].trim()), parseInt(data[2].trim()));
      } else if (data[0].trim() === 'M') {
        formatData['M'].push([parseInt(data[1].trim()), parseInt(data[2].trim())]);
      } else if (data[0].trim() === 'T') {
        formatData['T'].push([
          parseInt(data[1].trim()),
          parseInt(data[2].trim()),
          parseInt(data[3].trim())
        ]);
      } else if (data[0].trim() === 'A') {
        formatData['A'].push([
          parseInt(data[2].trim()),
          parseInt(data[3].trim()),
          data[1].trim(),
          data[4].trim(),
          data[5].trim()
        ]);
      }
      return line;
    });

    return formatData;
  }

  // drawInputData(inputData) {}
}

// const main = async () => {
//   const test = new TreasureMap();
//   const data = await test.formatInputData('./data/dataSet1.txt');
//   console.log(data);
// };

// main();

// // print process.argv
// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

module.exports = {
  TreasureMap
};
