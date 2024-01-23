const { TreasureMap } = require('../treasureMap');

const treasureMap = new TreasureMap();

describe('Treasure Map class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('formatInputData', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should create an object with only map dimensions', async () => {
      const input = './data/dataSet1.txt';
      const output = { C: [3, 4], M: [], T: [], A: [] };
      const result = treasureMap.formatInputData(input);
      expect(result).toEqual(output);
    });

    it('should create an object with all data', async () => {
      const input = './data/dataSet2.txt';
      const output = {
        C: [3, 4],
        M: [
          [1, 1],
          [2, 2]
        ],
        T: [
          [0, 3, 2],
          [1, 3, 1]
        ],
        A: [[1, 1, 'Lara', 'S', 'AADADAGGA']]
      };
      const result = treasureMap.formatInputData(input);
      expect(result).toEqual(output);
    });
  });
});
