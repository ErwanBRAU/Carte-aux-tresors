const { ['itineraries.test.js']: mockedTestsData } = require('../data/testsData.json');
const { Itineraries } = require('../../itineraries/itineraries');

let itineraries;

describe('Itineraries class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  beforeEach(() => {
    itineraries = new Itineraries();
  });
  describe('maxMovementsSequence', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const maxSequence = (map) => itineraries.maxMovementsSequence(map);

    it('should return the longest sequence of movements', async () => {
      const mapOneAdventurer = mockedTestsData.mapOneAdventurer;

      expect(maxSequence(mapOneAdventurer)).toEqual(6);

      const mapManyAdventurers = mockedTestsData.mapManyAdventurers;

      expect(maxSequence(mapManyAdventurers)).toEqual(9);
    });
  });

  describe('getLastPositions', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call maxMovementsSequence method from the Itineraries class', async () => {
      const map = mockedTestsData.randomMap;
      jest.spyOn(itineraries, 'maxMovementsSequence').mockReturnValueOnce(1);

      itineraries.getLastPositions(map);
      expect(itineraries.maxMovementsSequence).toBeCalledTimes(1);
    });

    it('should return last positions of adventurers, without any obstacle on their way', async () => {
      const itineraryWithoutObstacle = mockedTestsData.itineraryWithoutObstacle;

      const lastPositionsWithoutObstacle = mockedTestsData.lastPositionsWithoutObstacle;

      const lastPositions = itineraries.getLastPositions(itineraryWithoutObstacle);
      expect(lastPositions).toEqual(lastPositionsWithoutObstacle);
    });

    it('should return last positions of adventurer, with moutains on their way', async () => {
      const itineraryWithMountains = mockedTestsData.itineraryWithMountains;

      const lastPositionsWithMoutains = mockedTestsData.lastPositionsWithMoutains;

      const lastPositions = itineraries.getLastPositions(itineraryWithMountains);
      expect(lastPositions).toEqual(lastPositionsWithMoutains);
    });

    it('should return last positions of adventurers, with adventurers position conflicts and moutains', async () => {
      const itineraryWithAdventurersConflicts = mockedTestsData.itineraryWithAdventurersConflicts;

      const lastPositionsWithAdventurersConflicts =
        mockedTestsData.lastPositionsWithAdventurersConflicts;

      const lastPositions = itineraries.getLastPositions(itineraryWithAdventurersConflicts);
      expect(lastPositions).toEqual(lastPositionsWithAdventurersConflicts);
    });

    it('should return last positions of adventurers, with correct numbers of treasures without any conflict', async () => {
      const itineraryWithTreasures = mockedTestsData.itineraryWithTreasures;

      const lastPositionsWithTreasures = mockedTestsData.lastPositionsWithTreasures;

      const lastPositions = itineraries.getLastPositions(itineraryWithTreasures);
      expect(lastPositions).toEqual(lastPositionsWithTreasures);
    });

    it('should return last positions of adventurers, with conflicts and correct numbers of treasures', async () => {
      const itineraryWithTreasuresAndConflicts = mockedTestsData.itineraryWithTreasuresAndConflicts;

      const lastPositionsWithTreasuresAndConflicts =
        mockedTestsData.lastPositionsWithTreasuresAndConflicts;

      const lastPositions = itineraries.getLastPositions(itineraryWithTreasuresAndConflicts);
      expect(lastPositions).toEqual(lastPositionsWithTreasuresAndConflicts);
    });
  });
});
