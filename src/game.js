import Player from './player';

export default class Game {
  constructor() {
    this.player = new Player();
    this.computer = new Player(true);
    this.currentPlayer = this.player;
    this.isPlacingShips = true; // New flag to check if ships are being placed
    this.setupBoards();
  }

  setupBoards() {
    this.computer.gameboard.randomizeShips(); // Randomize computer ships
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
    if (this.currentPlayer !== this.computer) return;

    const result = this.computer.makeMove(this.player);
    return result;
  }

  checkGameOver() {
    return this.player.gameboard.allShipsSunk() || this.computer.gameboard.allShipsSunk();
  }
}
