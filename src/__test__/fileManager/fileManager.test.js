const fs = require('fs');
const { FileManager } = require('../../fileManager/fileManager');

const fileManager = new FileManager();

describe('File Manager class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('formatInputData', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should create an object with only map dimensions', async () => {
      const dataSet = './data/dataSet1.txt';
      const mapData = { C: [3, 4], M: [], T: [], A: {} };
      const result = fileManager.formatInputData(dataSet);
      expect(result).toEqual(mapData);
    });

    it('should create an object with all data', async () => {
      const dataSet = './data/dataSet2.txt';
      const mapData = {
        C: [3, 4],
        M: [
          [1, 1],
          [2, 2]
        ],
        T: [
          [0, 3, 2],
          [1, 3, 1]
        ],
        A: { Lara: [1, 1, 0, 'S', 'AADADAGGA'], Arthur: [2, 3, 0, 'W', 'AGADADAGG'] }
      };
      const result = fileManager.formatInputData(dataSet);
      expect(result).toEqual(mapData);
    });

    it('should fail and enter into catch part', async () => {
      const dataSet = './data/dataSet2.txt';
      const error = 'Can not read text file.';
      jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
        throw Error(error);
      });

      const result = fileManager.formatInputData(dataSet);
      expect(result).toEqual(error);
    });
  });

  describe('formatOuputData', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return the output data, basing on a map object', async () => {
      const mapData = {
        C: [3, 4],
        M: [
          [1, 0],
          [2, 1]
        ],
        T: [
          [0, 3, 4],
          [1, 3, 1],
          [2, 2, 0]
        ],
        A: { Lara: [0, 2, 2, 'S', 'AADADAGGA'], Arthur: [0, 3, 2, 'W', 'AGADADGAA'] }
      };

      const outputData = `C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 4
T - 1 - 3 - 1
A - Lara - 0 - 2 - S - 2
A - Arthur - 0 - 3 - W - 2
`;
      const result = fileManager.formatOuputData(mapData);
      expect(result).toEqual(outputData);
    });
  });
});
