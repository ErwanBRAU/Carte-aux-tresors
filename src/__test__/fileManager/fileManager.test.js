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
  });
});
