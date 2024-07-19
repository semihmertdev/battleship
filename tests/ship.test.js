import Ship from '../src/ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship('Battleship', 4);
  });

  test('should initialize with correct name and length', () => {
    expect(ship.name).toBe('Battleship');
    expect(ship.length).toBe(4);
    expect(ship.hits).toBe(0);
  });

  test('should correctly handle hits', () => {
    ship.hit();
    expect(ship.hits).toBe(1);

    ship.hit();
    expect(ship.hits).toBe(2);

    ship.hit();
    expect(ship.hits).toBe(3);

    ship.hit();
    expect(ship.hits).toBe(4); // Hits should not exceed ship length

    // Additional hit should not increase hits
    ship.hit();
    expect(ship.hits).toBe(4);
  });

  test('should correctly determine if the ship is sunk', () => {
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    expect(ship.isSunk()).toBe(false);

    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true); // Ship is sunk when hits equal ship length
  });
});
