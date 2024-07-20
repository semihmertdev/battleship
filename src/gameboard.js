import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(x, y, length, horizontal = true) {
    if (this.ships.length >= 5) {
      throw new Error('Maximum of 5 ships allowed');
    }

    const ship = new Ship(length);
    if (this.isValidPlacement(x, y, length, horizontal)) {
      if (horizontal) {
        for (let i = 0; i < length; i++) {
          this.board[x][y + i] = ship;
        }
      } else {
        for (let i = 0; i < length; i++) {
          this.board[x + i][y] = ship;
        }
      }
      this.ships.push(ship);
    } else {
      throw new Error('Invalid ship placement');
    }
  }

  isValidPlacement(x, y, length, horizontal) {
    if (horizontal) {
      if (y + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[x][y + i] !== null) return false;
      }
    } else {
      if (x + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y] !== null) return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];
    if (target) {
      target.hit();
      this.board[x][y] = { ...target, isHit: true };
      return 'hit';
    } else {
      this.missedShots.push([x, y]);
      return 'miss';
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }

  randomizeShips() {
    this.ships = [];
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach(length => {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const horizontal = Math.random() >= 0.5;
        try {
          this.placeShip(x, y, length, horizontal);
          placed = true;
        } catch (error) {
          // Retry placement
        }
      }
    });
  }
}
