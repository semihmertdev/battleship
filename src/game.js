import Player from './player';

export default class Game {
  constructor() {
    this.player = new Player();
    this.computer = new Player(true);
    this.currentPlayer = this.player;
    this.isPlacingShips = true; // Gemiler yerleştirilirken true olacak
    this.setupBoards();
  }

  setupBoards() {
    this.computer.gameboard.randomizeShips(); // Bilgisayarın gemilerini rastgele yerleştir
  }

  switchTurn() {
    this.currentPlayer = this.currentPlayer === this.player ? this.computer : this.player;
  }

  playRound(x, y) {
    const opponent = this.currentPlayer === this.player ? this.computer : this.player;
    const result = opponent.gameboard.receiveAttack(x, y);

    if (result === 'hit' && this.checkGameOver()) {
      alert('Game Over');
      return result;
    }

    if (result === 'miss') {
      this.switchTurn();
    }

    return result;
  }

  checkGameOver() {
    return this.player.gameboard.allShipsSunk() || this.computer.gameboard.allShipsSunk();
  }
}
