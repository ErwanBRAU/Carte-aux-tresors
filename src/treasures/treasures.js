class Treasures {
  isTreasure(map, position) {
    const allTreasures = map['T'];

    const treasures = allTreasures.filter(
      (treasure) => JSON.stringify(treasure.slice(0, 2)) === JSON.stringify(position)
    );

    if (treasures.length > 0) {
      if (treasures[0][2] > 0) {
        return [true, treasures[0]];
      }
    }
    return [false, []];
  }

  getTreasure(map, position, adventurer, movement) {
    const treasure = this.isTreasure(map, position);

    const isTreasure = treasure[0];
    let treasurePosition = [];

    let adventurerTreasures = map['A'][adventurer][2];

    if (isTreasure && movement === 'A') {
      adventurerTreasures += 1;

      treasurePosition = [...treasure[1]];
      treasurePosition[2] -= 1;
    }

    return [adventurerTreasures, treasurePosition];
  }
}

module.exports = { Treasures };
