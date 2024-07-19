// In tests/game.test.js
import Game from '../src/game';
import Player from '../src/player';
import Ship from '../src/ship';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test('should initialize with correct players and ships', () => {
    // Check that both players are initialized with a gameboard
    expect(game.player).toBeInstanceOf(Player);
    expect(game.computer).toBeInstanceOf(Player);
    
    // Check that ships are placed on the gameboard
    expect(game.player.gameboard.board[0][0]).toBeInstanceOf(Ship); // Carrier
    expect(game.player.gameboard.board[2][2]).toBeInstanceOf(Ship); // Battleship
    expect(game.player.gameboard.board[4][4]).toBeInstanceOf(Ship); // Cruiser
    expect(game.player.gameboard.board[6][6]).toBeInstanceOf(Ship); // Submarine
    expect(game.player.gameboard.board[8][8]).toBeInstanceOf(Ship); // Destroyer
  });

  test('should switch turns correctly', () => {
    expect(game.currentPlayer).toBe(game.player);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.computer);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player);
  });

  test('should grant an extra turn on a hit', () => {
    // Mock `makeMove` method of Player to return 'hit'
    jest.spyOn(game.currentPlayer, 'makeMove').mockImplementation(() => 'hit');
    
    const initialTurn = game.currentPlayer;
    game.playRound(0, 0); // Assume this hits a ship

    expect(game.currentPlayer).toBe(initialTurn); // Turn should not switch
  });

  test('should switch turn on a miss', () => {
    // Mock `makeMove` method of Player to return 'miss'
    jest.spyOn(game.currentPlayer, 'makeMove').mockImplementation(() => 'miss');
    
    const initialTurn = game.currentPlayer;
    game.playRound(0, 0); // Assume this is a miss

    expect(game.currentPlayer).not.toBe(initialTurn); // Turn should switch
  });

  test('should detect game over when all ships are sunk', () => {
    // Mock `allShipsSunk` to return true
    jest.spyOn(game.player.gameboard, 'allShipsSunk').mockImplementation(() => true);
    jest.spyOn(game.computer.gameboard, 'allShipsSunk').mockImplementation(() => true);

    expect(game.checkGameOver()).toBe(true);
  });

  test('should not end the game if not all ships are sunk', () => {
    // Mock `allShipsSunk` to return false
    jest.spyOn(game.player.gameboard, 'allShipsSunk').mockImplementation(() => false);
    jest.spyOn(game.computer.gameboard, 'allShipsSunk').mockImplementation(() => false);

    expect(game.checkGameOver()).toBe(false);
  });
});
