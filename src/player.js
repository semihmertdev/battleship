import Gameboard from './gameboard';

export default class Player {
  constructor(isComputer = false) {
    this.gameboard = new Gameboard();
    this.isComputer = isComputer;
  }

  getRandomCoordinates() {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    return [x, y];
  }

  makeMove(opponent, x = null, y = null) {
    if (this.isComputer) {
      let coordinates;
      do {
        coordinates = this.getRandomCoordinates();
      } while (opponent.gameboard.missedShots.some(shot => shot[0] === coordinates[0] && shot[1] === coordinates[1]));
      return opponent.gameboard.receiveAttack(coordinates[0], coordinates[1]);
    } else {
      return opponent.gameboard.receiveAttack(x, y);
    }
  }
}
