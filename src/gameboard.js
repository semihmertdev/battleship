import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = Array(10).fill(null).map(() => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(x, y, length, horizontal = true) {
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
      throw new Error('Invalid placement');
    }
  }

  isValidPlacement(x, y, length, horizontal) {
    if (horizontal) {
      if (y + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[x][y + i]) return false;
      }
    } else {
      if (x + length > 10) return false;
      for (let i = 0; i < length; i++) {
        if (this.board[x + i][y]) return false;
      }
    }
    return true;
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];
    if (target) {
      target.hit();
      this.board[x][y] = { ...target, isHit: true }; // Update cell to indicate it was hit
      return 'hit';
    } else {
      this.missedShots.push([x, y]);
      return 'miss';
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}
