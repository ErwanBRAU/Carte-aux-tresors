class Itineraries {
  forbiddenPositionsInsideMap(mapData, adventurer) {
    let forbiddenPositions = [];

    mapData['M'].map((moutainPosition) => forbiddenPositions.push(moutainPosition));

    let allAdventurers = Object.keys(mapData['A']);
    const otherAdventurers = allAdventurers.filter(
      (otherAdventurer) => otherAdventurer !== adventurer
    );

    otherAdventurers.map((otherAdventurer) => {
      const adventurerData = mapData['A'][otherAdventurer];
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
}

module.exports = { Itineraries };
