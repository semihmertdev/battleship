import Gameboard from './gameboard';

export default class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
    this.lastHit = null; // Store the last hit coordinates
    this.lastDirection = null; // Store the last direction tried
  }

  makeMove(opponent, x, y) {
    if (this.isComputer) {
      return this.computerMove(opponent);
    } else {
      return opponent.gameboard.receiveAttack(x, y);
    }
  }

  computerMove(opponent) {
    let x, y;

    if (this.lastHit) {
      ({ x, y } = this.continueInDirection(opponent));
    } else {
      ({ x, y } = this.getRandomCoordinates(opponent));
    }

    const result = opponent.gameboard.receiveAttack(x, y);

    if (result === 'hit') {
      this.lastHit = { x, y };
      this.updateDirection();
    } else if (result === 'miss' && this.lastDirection) {
      this.resetDirection();
    }

    return result;
  }

  getRandomCoordinates(opponent) {
    let x, y, isValid;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      isValid = !opponent.gameboard.board[x][y]?.isHit && !opponent.gameboard.missedShots.some(shot => shot[0] === x && shot[1] === y);
    } while (!isValid);

    return { x, y };
  }

  continueInDirection(opponent) {
    let x = this.lastHit.x;
    let y = this.lastHit.y;

    switch (this.lastDirection) {
      case 'up':
        x--;
        break;
      case 'down':
        x++;
        break;
      case 'left':
        y--;
        break;
      case 'right':
        y++;
        break;
      default:
        return this.getRandomCoordinates(opponent);
    }

    if (this.isValidCoordinate(x, y, opponent)) {
      return { x, y };
    } else {
      this.resetDirection();
      return this.getRandomCoordinates(opponent);
    }
  }

  updateDirection() {
    const directions = ['up', 'down', 'left', 'right'];
    const lastDirectionIndex = directions.indexOf(this.lastDirection);
    this.lastDirection = directions[(lastDirectionIndex + 1) % directions.length];
  }

  resetDirection() {
    this.lastDirection = null;
  }

  isValidCoordinate(x, y, opponent) {
    return x >= 0 && x < 10 && y >= 0 && y < 10 && !opponent.gameboard.board[x][y]?.isHit && !opponent.gameboard.missedShots.some(shot => shot[0] === x && shot[1] === y);
  }
}
