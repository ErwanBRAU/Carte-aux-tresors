const { Itineraries } = require('../../itineraries/itineraries');

const itineraries = new Itineraries();

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
      const itineraryWithoutObstacle = {
        C: [3, 4],
        M: [
          [0, 2],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'AGAGGAADAA'] }
      };

      const lastPositionsWithoutObstacle = {
        C: [3, 4],
        M: [
          [0, 2],
          [2, 2]
        ],
        T: [],
        A: { Lara: [1, 0, 0, 'N', 'AGAGGAADAA'] }
      };

      const lastPositions = itineraries.getLastPositions(itineraryWithoutObstacle);
      expect(lastPositions).toEqual(lastPositionsWithoutObstacle);
    });

    it('should return last positions of adventurers, without any obstacle on their way', async () => {
      const itineraryWithoutObstacle = {
        C: [3, 4],
        M: [[0, 2]],
        T: [],
        A: { Lara: [1, 1, 0, 'S', 'A'], Arthur: [0, 3, 0, 'N', 'A'] }
      };

      const lastPositionsWithoutObstacle = {
        C: [3, 4],
        M: [[0, 2]],
        T: [],
        A: { Lara: [1, 2, 0, 'S', 'A'], Arthur: [0, 2, 0, 'N', 'A'] }
      };

      // const lastPositions = itineraries.getLastPositions(itineraryWithoutObstacle);
      // expect(lastPositions).toEqual(lastPositionsWithoutObstacle);
    });
  });
});
