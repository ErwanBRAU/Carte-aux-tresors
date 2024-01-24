class MappingChecks {
  forbiddenPositionsInsideMap(map, adventurer) {
    let forbiddenPositions = [];

    map['M'].map((moutainPosition) => forbiddenPositions.push(moutainPosition));

    let allAdventurers = Object.keys(map['A']);
    const otherAdventurers = allAdventurers.filter(
      (otherAdventurer) => otherAdventurer !== adventurer
    );

    otherAdventurers.map((otherAdventurer) => {
      const adventurerData = map['A'][otherAdventurer];
      forbiddenPositions.push([adventurerData[0], adventurerData[1]]);
    });

    return forbiddenPositions;
  }

  isForbiddenPosition(map, position, forbiddenPositions) {
    const xSizeMap = map['C'][0];
    const ySizeMap = map['C'][1];
    const xPosition = position[0];
    const yPosition = position[1];

    if (xPosition < 0 || xPosition >= xSizeMap) {
      return true;
    } else if (yPosition < 0 || yPosition >= ySizeMap) {
      return true;
    }

    const isForbidden = forbiddenPositions.filter(
      (forbiddenPosition) => JSON.stringify(forbiddenPosition) === JSON.stringify(position)
    );

    if (isForbidden.length > 0) {
      return true;
    }

    return false;
  }

  getTreasures(map, position) {
    const allTreasures = map['T'];

    const treasures = allTreasures.filter(
      (treasure) => JSON.stringify(treasure.slice(0, 2)) === JSON.stringify(position)
    );

    if (treasures.length > 0) {
      if (treasures[0][2] > 0) {
        return true;
      }
    }
    return false;
  }
}

module.exports = { MappingChecks };
