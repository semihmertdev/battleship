import Player from './player';

export default class Game {
  constructor() {
    this.player = new Player();
    this.computer = new Player(true);
    this.currentPlayer = this.player;
    this.setupBoards();
  }

  setupBoards() {
    this.player.gameboard.placeShip(0, 0, 5); // Carrier
    this.player.gameboard.placeShip(2, 2, 4); // Battleship
    this.player.gameboard.placeShip(4, 4, 3); // Cruiser
    this.player.gameboard.placeShip(6, 6, 3); // Submarine
    this.player.gameboard.placeShip(8, 8, 2); // Destroyer

    this.computer.gameboard.placeShip(0, 0, 5); // Carrier
    this.computer.gameboard.placeShip(2, 2, 4); // Battleship
    this.computer.gameboard.placeShip(4, 4, 3); // Cruiser
    this.computer.gameboard.placeShip(6, 6, 3); // Submarine
    this.computer.gameboard.placeShip(8, 8, 2); // Destroyer
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
  }

  playRound(x, y) {
    const opponent = this.currentPlayer === this.player ? this.computer : this.player;
    const result = this.currentPlayer.makeMove(opponent, x, y);
    
    if (result === 'hit' && this.checkGameOver()) {
      alert('Game Over');
    } else if (result !== 'hit') {
      this.switchTurn();
    }

    return result;
  }

  computerMove() {
    const opponent = this.player;
    const result = this.computer.makeMove(opponent);
    
    if (result === 'hit' && this.checkGameOver()) {
      alert('Game Over');
    } else if (result !== 'hit') {
      this.switchTurn();
    }

    return result;
  }

  checkGameOver() {
    return this.player.gameboard.allShipsSunk() || this.computer.gameboard.allShipsSunk();
  }
}
