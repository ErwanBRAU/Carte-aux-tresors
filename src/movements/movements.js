class Movements {
  getNextOrientation(currentOrientation, movement) {
    if (
      (movement === 'D' && currentOrientation === 'N') ||
      (movement === 'G' && currentOrientation === 'S')
    ) {
      return 'E';
    } else if (
      (movement === 'D' && currentOrientation === 'E') ||
      (movement === 'G' && currentOrientation === 'W')
    ) {
      return 'S';
    } else if (
      (movement === 'D' && currentOrientation === 'S') ||
      (movement === 'G' && currentOrientation === 'N')
    ) {
      return 'W';
    } else if (
      (movement === 'D' && currentOrientation === 'W') ||
      (movement === 'G' && currentOrientation === 'E')
    ) {
      return 'N';
    } else {
      return currentOrientation;
    }
  }

  getNextPosition(currentXPosition, currentYPosition, currentOrientation, movement) {
    let nextXPosition = currentXPosition;
    let nextYPosition = currentYPosition;

    if (movement === 'A' && currentOrientation === 'N') {
      nextYPosition -= 1;
    } else if (movement === 'A' && currentOrientation === 'S') {
      nextYPosition += 1;
    } else if (movement === 'A' && currentOrientation === 'W') {
      nextXPosition -= 1;
    } else if (movement === 'A' && currentOrientation === 'E') {
      nextXPosition += 1;
    }

    const nextOrientation = this.getNextOrientation(currentOrientation, movement);

    return [nextXPosition, nextYPosition, nextOrientation];
  }
}

module.exports = {
  Movements
};
