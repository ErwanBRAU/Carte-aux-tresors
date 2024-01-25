const { Treasures } = require('../../treasures/treasures');

const treasures = new Treasures();

describe('Treasures class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('isTreasure', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return true if there is a trasure where the adventurer is', async () => {
      const map = {
        C: [3, 4],
        M: [],
        T: [
          [0, 3, 2],
          [3, 3, 0]
        ],
        A: {}
      };

      const noTreasure = treasures.isTreasure(map, [1, 2]);
      expect(noTreasure).toEqual([false, []]);

      const treasure = treasures.isTreasure(map, [0, 3]);
      expect(treasure).toEqual([true, [0, 3, 2]]);

      const emptyTreasure = treasures.isTreasure(map, [3, 3]);
      expect(emptyTreasure).toEqual([false, []]);
    });
  });

  describe('getTreasure', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should return adventurer information with one treasure if one is on his way', async () => {
      const map = {
        C: [3, 4],
        M: [],
        T: [
          [0, 3, 2],
          [3, 3, 0]
        ],
        A: { Lara: [1, 3, 0, 'S', 'AA'], Arthur: [1, 3, 2, 'S', 'AA'] }
      };

      const noTreasure = treasures.getTreasure(map, [1, 3], 'Lara', 'A');
      expect(noTreasure).toEqual([0, []]);

      const treasure = treasures.getTreasure(map, [0, 3], 'Lara', 'A');
      expect(treasure).toEqual([1, [0, 3, 1]]);

      const emptyTreasure = treasures.getTreasure(map, [3, 3], 'Arthur', 'A');
      expect(emptyTreasure).toEqual([2, []]);

      const turnOnTreasure = treasures.getTreasure(map, [0, 3], 'Arthur', 'D');
      expect(turnOnTreasure).toEqual([2, []]);
    });
  });
});
