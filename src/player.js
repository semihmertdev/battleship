import Gameboard from './gameboard';

export default class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
    this.lastHit = null; // To track the last hit coordinates
    this.lastDirection = null; // To track the direction of the hit
    this.previousMoves = new Set(); // To keep track of all previous moves
  }

  getRandomCoordinates() {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.previousMoves.has(`${x},${y}`));
    this.previousMoves.add(`${x},${y}`);
    return [x, y];
  }

  getAdjacentCoordinates(x, y) {
    const adjacent = [
      [x - 1, y], // Up
      [x + 1, y], // Down
      [x, y - 1], // Left
      [x, y + 1]  // Right
    ];
    return adjacent.filter(([adjX, adjY]) => adjX >= 0 && adjX < 10 && adjY >= 0 && adjY < 10);
  }

  continueInDirection(x, y, direction) {
    const directions = {
      horizontal: [[x, y - 1], [x, y + 1]],
      vertical: [[x - 1, y], [x + 1, y]]
    };
    return directions[direction].find(([adjX, adjY]) => !this.previousMoves.has(`${adjX},${adjY}`) && adjX >= 0 && adjX < 10 && adjY >= 0 && adjY < 10);
  }

  makeMove(opponent, x = null, y = null) {
    if (this.isComputer) {
      let coordinates;

      if (this.lastHit) {
        const [lastX, lastY] = this.lastHit;

        if (this.lastDirection) {
          // Continue in the last known direction
          coordinates = this.continueInDirection(lastX, lastY, this.lastDirection);
        }

        // If no valid coordinates in the direction, try adjacent cells
        if (!coordinates) {
          coordinates = this.getAdjacentCoordinates(lastX, lastY)
            .find(([adjX, adjY]) => !this.previousMoves.has(`${adjX},${adjY}`));
          if (coordinates) {
            // Determine the new direction based on this move
            this.lastDirection = Math.abs(coordinates[0] - lastX) > 0 ? 'vertical' : 'horizontal';
          }
        }
      }

      if (!coordinates) {
        coordinates = this.getRandomCoordinates();
        this.lastDirection = null; // Reset direction if random move
      }

      this.previousMoves.add(`${coordinates[0]},${coordinates[1]}`);
      const result = opponent.gameboard.receiveAttack(coordinates[0], coordinates[1]);

      // Update lastHit and lastDirection if it's a hit
      if (result === 'hit') {
        this.lastHit = coordinates;
        this.lastDirection = this.lastDirection || (Math.abs(coordinates[0] - this.lastHit[0]) > 0 ? 'vertical' : 'horizontal');
      } else {
        this.lastHit = null; // Reset lastHit if it's a miss
        this.lastDirection = null; // Reset direction on miss
      }

      return result;
    } else {
      // Player move logic for human players (e.g., from UI interactions)
      return opponent.gameboard.receiveAttack(x, y);
    }
  }
}
