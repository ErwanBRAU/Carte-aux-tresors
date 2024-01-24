const { Movements } = require('../movements/movements');
const { MappingChecks } = require('../mappingChecks/mappingChecks');

const movements = new Movements();
const mappingChecks = new MappingChecks();

class Itineraries {
  maxMovementsSequence(map) {
    const adventurers = Object.keys(map['A']);

    let lengthsMovementSequences = [];
    adventurers.map((adventurer) => lengthsMovementSequences.push(map['A'][adventurer][4].length));

    const maxLengthMovementSequence = Math.max(...lengthsMovementSequences);
    return maxLengthMovementSequence;
  }

  getLastPositions(map) {
    let newMap = map;
    const adventurers = Object.keys(map['A']);
    const numberOfAdventurers = adventurers.length;

    const maxLengthMovementSequence = this.maxMovementsSequence(map);
    const itineraries = adventurers.map((adventurer) => map['A'][adventurer][4].split(''));

    for (
      let movementSequenceIteration = 0;
      movementSequenceIteration < maxLengthMovementSequence;
      movementSequenceIteration++
    ) {
      for (let adventurer = 0; adventurer < numberOfAdventurers; adventurer++) {
        let adventurerName = adventurers[adventurer];

        if (movementSequenceIteration < map['A'][adventurerName][4].length) {
          let movement = itineraries[adventurer][movementSequenceIteration];

          let adventurerInfo = newMap['A'][adventurerName];
          let currentXPosition = adventurerInfo[0];
          let currentYPosition = adventurerInfo[1];
          let currentOrientation = adventurerInfo[3];

          const nextPosition = movements.getNextPosition(
            currentXPosition,
            currentYPosition,
            currentOrientation,
            movement
          );

          const forbiddenPositions = mappingChecks.forbiddenPositionsInsideMap(
            newMap,
            adventurerName
          );

          const isForbidden = mappingChecks.isForbiddenPosition(
            newMap,
            nextPosition.slice(0, 2),
            forbiddenPositions
          );

          if (!isForbidden) {
            // const isTreasure = mappingChecks.getTreasures(newMap, nextPosition);
            const newAdventurerInfo = [
              nextPosition[0],
              nextPosition[1],
              0,
              nextPosition[2],
              adventurerInfo[4]
            ];
            const adventurersInfo = { ...newMap['A'], [adventurerName]: newAdventurerInfo };
            newMap = { ...newMap, A: adventurersInfo };
          }

          console.log(adventurerName, newMap, movementSequenceIteration, adventurer);
        }
      }
    }
    return newMap;
  }
}

module.exports = { Itineraries };
