const fs = require('fs');
const { parse } = require('path');

class TreasureMap {
  async getInputData(filePath) {
    const inputData = new Promise((resolve) => {
      const readFile = fs.createReadStream(filePath);
      let datas = [];
      readFile
        .pipe(parse('\n'))
        .on('data', (data) => {
          console.log(222);
          console.log(data);
          datas += data;
        })
        .on('end', () => resolve(datas));
    });
    const result = await inputData;
    return result;
    // const dataMap = {};

    // try {
    //   var data = fs.readFileSync(filePath, 'utf8');
    //   console.log(data[0]);
    //   return;
    // } catch (e) {
    //   console.log('Error:', e.stack);
    // }
  }
}

const test = new TreasureMap();

console.log(test.getInputData('./data/dataSet1.txt'));
