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
      const leftOrientation = getOrientation('N', 'G');
      expect(leftOrientation).toEqual('W');

      const rightOrientation = getOrientation('E', 'D');
      expect(rightOrientation).toEqual('S');
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
      const leftMovement = getPosition(1, 2, 'W', 'A');
      expect(leftMovement).toEqual([0, 2, 'W']);

      const topMovement = getPosition(1, 2, 'N', 'A');
      expect(topMovement).toEqual([1, 1, 'N']);
    });

    it('should get the same position but different orientation when movement D or G is given', async () => {
      const leftTurnMovement = getPosition(1, 2, 'W', 'G');
      expect(leftTurnMovement).toEqual([1, 2, 'S']);

      const rightTurnMovement = getPosition(1, 2, 'W', 'D');
      expect(rightTurnMovement).toEqual([1, 2, 'N']);
    });
  });
});
