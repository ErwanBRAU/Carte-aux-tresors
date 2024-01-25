const { Movements } = require('../movements/movements');
const { MappingChecks } = require('../mappingChecks/mappingChecks');
const { Treasures } = require('../treasures/treasures');

const movements = new Movements();
const mappingChecks = new MappingChecks();
const treasures = new Treasures();

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

    const adventurers = Object.keys(newMap['A']);
    const numberOfAdventurers = adventurers.length;

    const maxLengthMovementSequence = this.maxMovementsSequence(newMap);
    const itineraries = adventurers.map((adventurer) => newMap['A'][adventurer][4].split(''));

    for (
      let movementSequenceIteration = 0;
      movementSequenceIteration < maxLengthMovementSequence;
      movementSequenceIteration++
    ) {
      for (let adventurer = 0; adventurer < numberOfAdventurers; adventurer++) {
        let adventurerName = adventurers[adventurer];

        if (movementSequenceIteration < newMap['A'][adventurerName][4].length) {
          let movement = itineraries[adventurer][movementSequenceIteration];

          let adventurerInformation = newMap['A'][adventurerName];
          let currentXPosition = adventurerInformation[0];
          let currentYPosition = adventurerInformation[1];
          let currentOrientation = adventurerInformation[3];

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
            const isTreasure = treasures.getTreasure(
              newMap,
              nextPosition.slice(0, 2),
              adventurerName,
              movement
            );

            const newAdventurerInfo = [
              nextPosition[0],
              nextPosition[1],
              isTreasure[0],
              nextPosition[2],
              adventurerInformation[4]
            ];
            const adventurersInfo = { ...newMap['A'], [adventurerName]: newAdventurerInfo };

            // let allTreasures = newMap['T'];
            // console.log(allTreasures);
            // console.log('111111111111111111');
            // console.log(allTreasures);
            // console.log(isTreasure);
            // let treasurePosition = allTreasures.findIndex(
            //   (treasure) =>
            //     JSON.stringify(treasure.slice(0, 2)) !== JSON.stringify(isTreasure[1].slice(0, 2))
            // );
            // console.log('222222222222222');
            // console.log(treasurePosition);

            // // if (treasurePosition !== -1) {
            // //   console.log(true);
            // //   allTreasures.slice(treasurePosition, 1, isTreasure[1]).push('eeeeeeeeeeeee');
            // // }
            // console.log('3333333333333333333');
            // console.log(allTreasures);
            newMap = { ...newMap, A: adventurersInfo };
          }

          // console.log(adventurerName, newMap, movementSequenceIteration, adventurer);
        }
      }
    }
    return newMap;
  }
}

module.exports = { Itineraries };
