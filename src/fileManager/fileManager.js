const fs = require('fs');

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
      console.error(error);
    }
  }
}

module.exports = {
  FileManager
};
