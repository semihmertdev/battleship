# Battleship Game

## Project Description

This project develops a browser-based version of the classic **Battleship** game. The game is played between two players: one is a human player, and the other is the computer. This project is developed using Test-Driven Development (TDD) methodology and utilizes ES6+, Webpack, Babel, and Jest.

## Features

- **Ship Placement**: Players can place their ships either vertically or horizontally.
- **Shooting**: Players can target and shoot at the opponent's ships.
- **Computer Opponent**: The computer shoots either randomly or strategically.
- **Ship and Shot Status**: Hit ships and missed shots are visually represented.
- **Game Start and Reset**: The game can be started and reset.
- **Basic AI**: The computer's moves are made randomly or according to a basic strategy.

## Usage

1. **Ship Placement**: Drag and drop the ship pieces onto the board. You can rotate ships using the "Rotate to Vertical" button.
2. **Start the Game**: After placing your ships, press the "Start Game" button to begin.
3. **Shooting**: Click on a cell on the computer's board to shoot. The computer will respond turn by turn.
4. **Reset Game**: Press the "Reset Game" button to reset the game.

## Live Preview

You can view a live preview of the game at [Battleship Live Preview](https://semihmertdev.github.io/battleship/).

## File Structure

- `index.html`: HTML structure and basic layout.
- `index.js`: JavaScript code for initializing the game.
- `dom.js`: Code for rendering the game boards and setting up event listeners.
- `game.js`: Main game class containing the game logic.
- `gameboard.js`: Class for the game board and ship placement logic.
- `player.js`: Class for the player and computer's shooting and movement logic.
- `ship.js`: Ship class and related operations.
- `style.css`: Stylesheet for the game interface.

## Tests

This project is tested using Jest. The tests aim to validate the game logic and functionality. Tests can be found in the following files:

- `game.test.js`: Tests for the game logic.
- `gameboard.test.js`: Tests for the game board and ship placement.
- `player.test.js`: Tests for the player and computer's actions.
