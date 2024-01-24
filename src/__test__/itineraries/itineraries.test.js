const { Itineraries } = require('../../itineraries/itineraries');

const itineraries = new Itineraries();

describe('Itineraries class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('forbiddenPositionsInsideMap', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return positions of moutains', async () => {
      const input = {
        C: [3, 4],
        M: [
          [1, 1],
          [2, 2]
        ],
        T: [],
        A: {}
      };
      const output = [
        [1, 1],
        [2, 2]
      ];
      const forbiddenPositions = itineraries.forbiddenPositionsInsideMap(input);
      expect(forbiddenPositions).toEqual(output);
    });

    it('should return positions of moutains and all adventurers except him', async () => {
      const mapData = {
        C: [3, 4],
        M: [
          [1, 1],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 2, 0, 'S', 'AADADAGGA'], Arthur: [2, 3, 0, 'N', 'AADADAGGA'] }
      };
      const output = [
        [1, 1],
        [2, 2],
        [2, 3]
      ];
      const forbiddenPositions = itineraries.forbiddenPositionsInsideMap(mapData, 'Lara');
      expect(forbiddenPositions).toEqual(output);
    });
  });

  describe('isForbiddenPosition', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const isForbidden = (map, position, forbiddenPositions) =>
      itineraries.isForbiddenPosition(map, position, forbiddenPositions);

    it('should return true if position is outside map', async () => {
      const map = {
        C: [3, 4],
        M: [],
        T: [],
        A: {}
      };
      const forbiddenPositions = [];

      const isOutside = isForbidden(map, [4, 5], forbiddenPositions);
      expect(isOutside).toEqual(true);

      const isInside = isForbidden(map, [2, 3], forbiddenPositions);
      expect(isInside).toEqual(false);
    });

    it('should return true if position is on a moutain or another adventurer', async () => {
      const map = {
        C: [3, 4],
        M: [
          [1, 1],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'AADADAGGA'], Arthur: [2, 3, 0, 'N', 'AADADAGGA'] }
      };
      const forbiddenPositions = [
        [1, 1],
        [2, 2],
        [2, 3]
      ];

      const isNotOk = isForbidden(map, [2, 3], forbiddenPositions);
      expect(isNotOk).toEqual(true);

      const isOk = isForbidden(map, [1, 3], forbiddenPositions);
      expect(isOk).toEqual(false);
    });
  });
});
