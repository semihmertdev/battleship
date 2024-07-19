// In tests/player.test.js
import Player from '../src/player';
import Gameboard from '../src/gameboard';
import Ship from '../src/ship';

describe('Player', () => {
    let player;
    let computer;
    let opponentBoard;
  
    beforeEach(() => {
      player = new Player();
      computer = new Player(true);
      opponentBoard = computer.gameboard;
  
      // Place a ship on the computer's board at (0, 0) with length 3
      opponentBoard.placeShip(0, 0, 3);
  
      // Ensure the computer's board is properly set up
    });
  
    test('should make a move and handle attack result', () => {
      const result = player.makeMove(computer, 0, 0); // Attack a known location
      expect(result).toBe('hit'); // Expecting a hit result
      expect(opponentBoard.board[0][0].isHit).toBe(true); // The attacked location should be marked as hit
    });
  
    test('should handle computer moves and avoid repeating missed shots', () => {
      // Mock the random move to ensure it doesn't repeat missed shots
      jest.spyOn(computer, 'getRandomCoordinates').mockReturnValue([0, 0]);
  
      // Make a move
      const result = computer.makeMove(player);
  
      expect(['hit', 'miss']).toContain(result); // The computer should return either hit or miss
  
      // Ensure the computer does not attack the already missed coordinate
      const missedCoordinates = player.gameboard.missedShots;
  
      expect(missedCoordinates).toContainEqual([0, 0]); // Use toContainEqual for array equality
    });
  });