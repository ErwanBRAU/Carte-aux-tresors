const { ['fileManager.test.js']: mockedTestsData } = require('../data/testsData.json');
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
      const mapData = mockedTestsData.mapData;
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
      const mapData = mockedTestsData.map;

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

    it('should fail when writting into the file and enter into catch part', async () => {
      const map = mockedTestsData.randomMap;
      const error = 'Folder not found';
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
        throw Error(error);
      });

      const result = fileManager.formatOuputData(map);
      expect(result).toEqual(error);
    });
  });
});
