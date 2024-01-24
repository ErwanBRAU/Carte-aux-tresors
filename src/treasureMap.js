// const { argv } = require('node:process');
const { FileManager } = require('./fileManager/fileManager');
const { Itineraries } = require('./itineraries/itineraries');

const fileManager = new FileManager();
const itineraries = new Itineraries();

class TreasureMap {
  treasureMapResolution(filePath) {
    const map = fileManager.formatInputData(filePath);

    const lastPositions = itineraries.getLastPositions(map);

    return lastPositions;
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
