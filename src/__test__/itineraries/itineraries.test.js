const { Itineraries } = require('../../itineraries/itineraries');
const { Treasures } = require('../../treasures/treasures');
const { Movements } = require('../../movements/movements');
const { MappingChecks } = require('../../mappingChecks/mappingChecks');

const itineraries = new Itineraries();
const treasures = new Treasures();
const movements = new Movements();
const mappingChecks = new MappingChecks();

describe('Itineraries class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('maxMovementsSequence', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const maxSequence = (map) => itineraries.maxMovementsSequence(map);

    it('should return the longest sequence of movements', async () => {
      const mapOneAdventurer = {
        C: [3, 4],
        M: [[0, 2]],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'AADADA'] }
      };

      expect(maxSequence(mapOneAdventurer)).toEqual(6);

      const mapManyAdventurers = {
        C: [3, 4],
        M: [[0, 2]],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'AADADA'], Arthur: [2, 3, 0, 'N', 'AADADAGGA'] }
      };

      expect(maxSequence(mapManyAdventurers)).toEqual(9);
    });
  });

  describe('getLastPositions', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call all other class methods', async () => {
      const map = {
        C: [3, 4],
        M: [
          [1, 0],
          [2, 1]
        ],
        T: [
          [0, 3, 2],
          [1, 3, 3]
        ],
        A: { Lara: [1, 1, 0, 'S', 'A'] }
      };
      jest.spyOn(itineraries, 'maxMovementsSequence').mockReturnValueOnce(1);
      jest.spyOn(movements, 'getNextPosition').mockReturnValueOnce([1, 2, 'S']);
      jest.spyOn(mappingChecks, 'forbiddenPositionsInsideMap').mockReturnValueOnce([
        [1, 0],
        [2, 1]
      ]);
      jest.spyOn(mappingChecks, 'isForbiddenPosition').mockReturnValueOnce(false);
      jest.spyOn(treasures, 'getTreasure').mockReturnValueOnce([0, []]);

      itineraries.getLastPositions(map);
      expect(itineraries.maxMovementsSequence).toBeCalledTimes(1);
      expect(movements.getNextPosition).toBeCalledTimes(1);
      expect(mappingChecks.forbiddenPositionsInsideMap).toBeCalledTimes(1);
      expect(mappingChecks.isForbiddenPosition).toBeCalledTimes(1);
      expect(treasures.getTreasure).toBeCalledTimes(1);
    });

    it('should return last positions of adventurers, without any obstacle on their way', async () => {
      const itineraryWithoutObstacle = {
        C: [3, 4],
        M: [],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'AA'], Arthur: [0, 3, 0, 'N', 'A'] }
      };

      const lastPositionsWithoutObstacle = {
        C: [3, 4],
        M: [],
        T: [],
        A: { Lara: [1, 3, 0, 'S', 'AA'], Arthur: [0, 2, 0, 'N', 'A'] }
      };

      const lastPositions = itineraries.getLastPositions(itineraryWithoutObstacle);
      expect(lastPositions).toEqual(lastPositionsWithoutObstacle);
    });

    it('should return last positions of adventurer, with moutains on their way', async () => {
      const itineraryWithMountains = {
        C: [3, 4],
        M: [
          [0, 2],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'AGAGGAADAA'] }
      };

      const lastPositionsWithMoutains = {
        C: [3, 4],
        M: [
          [0, 2],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 0, 0, 'N', 'AGAGGAADAA'] }
      };

      const lastPositions = itineraries.getLastPositions(itineraryWithMountains);
      expect(lastPositions).toEqual(lastPositionsWithMoutains);
    });

    it('should return last positions of adventurers, with adventurers position conflicts and moutains', async () => {
      const itineraryWithAdventurersConflicts = {
        C: [3, 4],
        M: [
          [0, 2],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 1, 0, 'W', 'AGAGADDA'], Arthur: [1, 2, 0, 'N', 'ADADADAA'] }
      };

      const lastPositionsWithAdventurersConflicts = {
        C: [3, 4],
        M: [
          [0, 2],
          [2, 2]
        ],
        T: [],
        A: { Lara: [0, 1, 0, 'W', 'AGAGADDA'], Arthur: [1, 1, 0, 'W', 'ADADADAA'] }
      };

      const lastPositions = itineraries.getLastPositions(itineraryWithAdventurersConflicts);
      expect(lastPositions).toEqual(lastPositionsWithAdventurersConflicts);
    });

    it('should return last positions of adventurers, with correct numbers of treasures without any conflict', async () => {
      const itineraryWithTreasures = {
        C: [3, 4],
        M: [],
        T: [
          [0, 2, 2],
          [2, 2, 3]
        ],
        A: { Lara: [0, 1, 0, 'S', 'AGAADAA'], Arthur: [2, 3, 0, 'N', 'AAGAAGA'] }
      };

      const lastPositionsWithTreasures = {
        C: [3, 4],
        M: [],
        T: [
          [0, 2, 0],
          [2, 2, 1]
        ],
        A: { Lara: [2, 3, 2, 'S', 'AGAADAA'], Arthur: [0, 2, 2, 'S', 'AAGAAGA'] }
      };

      const lastPositions = itineraries.getLastPositions(itineraryWithTreasures);
      expect(lastPositions).toEqual(lastPositionsWithTreasures);
    });

    it('should return last positions of adventurers, with conflicts and correct numbers of treasures', async () => {
      const itineraryWithTreasuresAndConflicts = {
        C: [3, 4],
        M: [
          [1, 0],
          [2, 1]
        ],
        T: [
          [0, 3, 2],
          [1, 3, 3]
        ],
        A: { Lara: [1, 1, 0, 'S', 'AADADAGGA'], Arthur: [2, 2, 0, 'W', 'AGADADGAA'] }
      };

      const lastPositionsWithTreasuresAndConflicts = {
        C: [3, 4],
        M: [
          [1, 0],
          [2, 1]
        ],
        T: [
          [0, 3, 0],
          [1, 3, 1]
        ],
        A: { Lara: [0, 2, 2, 'S', 'AADADAGGA'], Arthur: [0, 3, 2, 'W', 'AGADADGAA'] }
      };

      const lastPositions = itineraries.getLastPositions(itineraryWithTreasuresAndConflicts);
      expect(lastPositions).toEqual(lastPositionsWithTreasuresAndConflicts);
    });
  });
});
