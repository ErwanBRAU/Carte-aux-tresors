const { ['mappingChecks.test.js']: mockedTestsData } = require('../data/testsData.json');
const { MappingChecks } = require('../../mappingChecks/mappingChecks');

const mappingChecks = new MappingChecks();

describe('Mapping Checks class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('forbiddenPositionsInsideMap', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return positions of moutains', async () => {
      const input = mockedTestsData.input;
      const output = mockedTestsData.output;
      const forbiddenPositions = mappingChecks.forbiddenPositionsInsideMap(input);
      expect(forbiddenPositions).toEqual(output);
    });

    it('should return positions of moutains and all adventurers except him', async () => {
      const mapData = mockedTestsData.mapData;
      const output = mockedTestsData.outputWithMoutainsAndAdventurers;
      const forbiddenPositions = mappingChecks.forbiddenPositionsInsideMap(mapData, 'Lara');
      expect(forbiddenPositions).toEqual(output);
    });
  });

  describe('isForbiddenPosition', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const isForbidden = (map, position, forbiddenPositions) =>
      mappingChecks.isForbiddenPosition(map, position, forbiddenPositions);

    it('should return true if position is outside map', async () => {
      const map = {
        C: [3, 4],
        M: [],
        T: [],
        A: {}
      };
      const forbiddenPositions = [];

      const isSouthOutside = isForbidden(map, [2, 5], forbiddenPositions);
      expect(isSouthOutside).toEqual(true);

      const isEastOutside = isForbidden(map, [4, 2], forbiddenPositions);
      expect(isEastOutside).toEqual(true);

      const isInside = isForbidden(map, [2, 3], forbiddenPositions);
      expect(isInside).toEqual(false);
    });

    it('should return true if position is on a moutain or another adventurer', async () => {
      const map = mockedTestsData.map;
      const forbiddenPositions = mockedTestsData.forbiddenPositions;

      const isNotOk = isForbidden(map, [2, 3], forbiddenPositions);
      expect(isNotOk).toEqual(true);

      const isOk = isForbidden(map, [1, 3], forbiddenPositions);
      expect(isOk).toEqual(false);
    });
  });
});
