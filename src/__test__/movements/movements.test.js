const { Movements } = require('../../movements/movements');

const movements = new Movements();

describe('Movements class', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getNextOrientation', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const getOrientation = (currentOrientation, movement) => {
      return movements.getNextOrientation(currentOrientation, movement);
    };

    it('should get the same orientation when movement A is given', async () => {
      const sameOrientation = getOrientation('S', 'A');
      expect(sameOrientation).toEqual('S');
    });

    it('should get the next orientation when movement D or G is given', async () => {
      let leftOrientation = getOrientation('N', 'G');
      expect(leftOrientation).toEqual('W');

      leftOrientation = getOrientation('E', 'G');
      expect(leftOrientation).toEqual('N');

      let rightOrientation = getOrientation('E', 'D');
      expect(rightOrientation).toEqual('S');

      rightOrientation = getOrientation('N', 'D');
      expect(rightOrientation).toEqual('E');
    });
  });

  describe('getNextPosition', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    const getPosition = (currentXPosition, currentYPosition, currentOrientation, movement) => {
      return movements.getNextPosition(
        currentXPosition,
        currentYPosition,
        currentOrientation,
        movement
      );
    };

    it('should get the same orientation but different position when movement A is given', async () => {
      const westMovement = getPosition(1, 2, 'W', 'A');
      expect(westMovement).toEqual([0, 2, 'W']);

      const northMovement = getPosition(1, 2, 'N', 'A');
      expect(northMovement).toEqual([1, 1, 'N']);

      const eastMovement = getPosition(1, 1, 'E', 'A');
      expect(eastMovement).toEqual([2, 1, 'E']);
    });

    it('should get the same position but different orientation when movement D or G is given', async () => {
      const westTurnMovement = getPosition(1, 2, 'W', 'G');
      expect(westTurnMovement).toEqual([1, 2, 'S']);

      const eastTurnMovement = getPosition(1, 2, 'W', 'D');
      expect(eastTurnMovement).toEqual([1, 2, 'N']);
    });
  });
});
