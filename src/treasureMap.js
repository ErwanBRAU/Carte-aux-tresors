const { argv } = require('node:process');
const { FileManager } = require('./fileManager/fileManager');
const { Itineraries } = require('./itineraries/itineraries');

const fileManager = new FileManager();
const itineraries = new Itineraries();

class TreasureMap {
  treasureMapResolution(inputFilePath, outputFilepath) {
    const map = fileManager.formatInputData(inputFilePath);

    const lastPositions = itineraries.getLastPositions(map);

    const outputData = fileManager.formatOuputData(lastPositions, outputFilepath);

    return outputData;
  }
}

const main = async () => {
  const treasureMap = new TreasureMap();
  const filepathInput = argv[2] || '../data/wordingData.txt';
  const filepathOuput = argv[3] || '../data/solvedWording.txt';
  const data = await treasureMap.treasureMapResolution(filepathInput, filepathOuput);
  console.log(data);
};

main();

module.exports = {
  TreasureMap
};
