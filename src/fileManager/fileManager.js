const fs = require('fs');
const { Table } = require('console-table-printer');

class FileManager {
  formatInputData(filePath) {
    try {
      const readFile = fs.readFileSync(filePath, 'utf8').trim().split('\n');
      let formatData = { C: [], M: [], T: [], A: {} };

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
          formatData['A'][data[1].trim()] = [
            parseInt(data[2].trim()),
            parseInt(data[3].trim()),
            0, // number of initial tresors
            data[4].trim(),
            data[5].trim()
          ];
        }
        return line;
      });

      return formatData;
    } catch (error) {
      return error.message;
    }
  }

  formatOuputData(map, outputFilepath) {
    const numberOfColumns = map['C'][0];
    const numberOfRows = map['C'][1];

    let tempMap = [];
    let outputData = `C - ${numberOfColumns} - ${numberOfRows}\n`;

    for (let row = 0; row < numberOfRows; row++) {
      let tempRow = [];
      for (let column = 0; column < numberOfColumns; column++) {
        tempRow.push('.');
      }
      tempMap.push(tempRow);
    }

    const moutains = map['M'];
    for (let moutain of moutains) {
      let xCoordinateMoutain = moutain[0];
      let yCoordinateMoutain = moutain[1];

      tempMap[yCoordinateMoutain][xCoordinateMoutain] = 'M';
      outputData += `M - ${xCoordinateMoutain} - ${yCoordinateMoutain}\n`;
    }

    const treasures = map['T'];
    for (let treasure of treasures) {
      let xCoordinateTreasure = treasure[0];
      let yCoordinateTreasure = treasure[1];

      tempMap[yCoordinateTreasure][xCoordinateTreasure] = `T(${treasure[2]})`;
      if (treasure[2] > 0) {
        outputData += `T - ${xCoordinateTreasure} - ${yCoordinateTreasure} - ${treasure[2]}\n`;
      }
    }

    const adventurers = Object.keys(map['A']);
    for (let adventurer of adventurers) {
      let xCoordinateAdventurer = map['A'][adventurer][0];
      let yCoordinateAdventurer = map['A'][adventurer][1];

      tempMap[yCoordinateAdventurer][xCoordinateAdventurer] = `A(${adventurer})`;
      outputData += `A - ${adventurer} - ${xCoordinateAdventurer} - ${yCoordinateAdventurer} - ${map['A'][adventurer][3]} - ${map['A'][adventurer][2]}\n`;
    }

    const rows = tempMap;

    let columns = [];
    for (let column = 0; column < numberOfColumns; column++) {
      columns.push({ name: `${column}`, title: '', alignment: 'left' });
    }
    const drawingMap = new Table({ columns, rows, shouldDisableColors: true });

    drawingMap.table.tableStyle = {
      headerTop: { left: '', mid: '', right: '', other: '' },
      headerBottom: { left: '', mid: '', right: '', other: '' },
      tableBottom: { left: '', mid: '', right: '', other: '' },
      vertical: '',
      rowSeparator: { left: '', mid: '', right: '', other: '' }
    };

    drawingMap.printTable();

    const drawingMapString = drawingMap.render(rows);

    fs.writeFileSync(
      outputFilepath || './data/dataOutput.txt',
      `${outputData}
      ${drawingMapString}`,
      (error) => {
        if (error) {
          throw new Error(error);
        } else {
          console.error('File written successfully');
        }
      }
    );

    return outputData;
  }
}

module.exports = {
  FileManager
};
