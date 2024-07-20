import Game from '../src/game';
import Player from '../src/player';
import Ship from '../src/ship';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
    global.alert = jest.fn(); // Mock the alert function
  });

  test('should initialize with correct players and ships', () => {
    // Check that both players are initialized with a gameboard
    expect(game.player).toBeInstanceOf(Player);
    expect(game.computer).toBeInstanceOf(Player);
    
    // Check that ships are placed on the gameboard
    expect(game.computer.gameboard.ships.length).toBe(5);
  });

  test('should switch turns correctly', () => {
    expect(game.currentPlayer).toBe(game.player);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.computer);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player);
  });

  test('should grant an extra turn on a hit', () => {
    // Mock `receiveAttack` method of Gameboard to return 'hit'
    jest.spyOn(game.computer.gameboard, 'receiveAttack').mockImplementation(() => 'hit');
    
    const initialTurn = game.currentPlayer;
    game.playRound(0, 0); // Assume this hits a ship

    expect(game.currentPlayer).toBe(initialTurn); // Turn should not switch
  });

  test('should switch turn on a miss', () => {
    // Mock `receiveAttack` method of Gameboard to return 'miss'
    jest.spyOn(game.computer.gameboard, 'receiveAttack').mockImplementation(() => 'miss');
    
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
