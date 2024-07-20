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
  
    if (this.checkGameOver()) {
      alert('Game Over');
      return result;
    }
  
    if (result === 'hit') {
      this.switchTurn();
    }
  
    return result;
  }
  

  computerMove(game, playerContainer, computerContainer) {
    if (game.currentPlayer !== game.computer) return; // Ensure it's the computer's turn
  
    setTimeout(() => {
      const result = game.computerMove();
      renderBoards(game, playerContainer, computerContainer);
  
      if (game.checkGameOver()) {
        alert('Game Over');
      } else if (result === 'hit') {
        // Continue computer's turn if hit
        computerMove(game, playerContainer, computerContainer);
      } else {
        // Switch turn if miss
        game.switchTurn();
      }
    }, 1000); // Delay for 1 second before computer's turn
  }
  
  
  

  checkGameOver() {
    return this.player.gameboard.allShipsSunk() || this.computer.gameboard.allShipsSunk();
  }
  
}
