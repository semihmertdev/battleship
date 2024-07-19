// In tests/gameboard.test.js
import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test('should place ships correctly', () => {
    gameboard.placeShip(0, 0, 5); // Horizontal placement

    // Check that ship is placed on the board
    for (let i = 0; i < 5; i++) {
      expect(gameboard.board[0][i]).toBeInstanceOf(Ship);
    }
  });

  test('should throw error for invalid ship placement', () => {
    expect(() => gameboard.placeShip(0, 7, 5)).toThrow('Invalid placement'); // Horizontal, but extends beyond the board
    expect(() => gameboard.placeShip(7, 0, 5, false)).toThrow('Invalid placement'); // Vertical, but extends beyond the board
  });

  test('should handle ship placement conflicts', () => {
    gameboard.placeShip(0, 0, 3);
    expect(() => gameboard.placeShip(0, 1, 3)).toThrow('Invalid placement'); // Overlaps existing ship
  });

  test('should receive attack and register hit', () => {
    gameboard.placeShip(0, 0, 3);
    const result = gameboard.receiveAttack(0, 1); // Attack the second part of the ship

    expect(result).toBe('hit');
    expect(gameboard.board[0][1].isHit).toBe(true); // The ship part should be marked as hit
  });

  test('should receive attack and register miss', () => {
    const result = gameboard.receiveAttack(5, 5); // Attack a position with no ship

    expect(result).toBe('miss');
    expect(gameboard.missedShots).toContainEqual([5, 5]); // Missed shots should include the coordinate
  });

  test('should correctly identify all ships sunk', () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);

    gameboard.ships = [ship1, ship2];

    // Mock `isSunk` method of Ship
    jest.spyOn(ship1, 'isSunk').mockImplementation(() => true);
    jest.spyOn(ship2, 'isSunk').mockImplementation(() => true);

    expect(gameboard.allShipsSunk()).toBe(true);

    // Mock `isSunk` method of Ship to return false for one ship
    jest.spyOn(ship2, 'isSunk').mockImplementation(() => false);

    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
