import Game from './game';
import Gameboard from './gameboard'; // Assuming you have a Gameboard class in a separate file

function renderBoard(gameboard, container, isPlayer = false) {
  container.innerHTML = ''; // Clear previous board

  gameboard.board.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.x = x;
      cellDiv.dataset.y = y;

      // Check if cell has been hit
      if (cell && cell.isHit) {
        cellDiv.classList.add('hit-ship');
      } else if (gameboard.missedShots.some(shot => shot[0] === x && shot[1] === y)) {
        cellDiv.classList.add('miss');
      } else if (isPlayer && cell) {
        cellDiv.classList.add('ship');
      }

      container.appendChild(cellDiv);
    });
  });
}

function setupEventListeners(game, playerContainer, computerContainer) {
  let isHorizontal = true; // Default ship orientation

  computerContainer.addEventListener('click', (event) => {
    if (game.currentPlayer !== game.player || game.isPlacingShips) return; // Prevent player from clicking out of turn or during ship placement

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if (!isNaN(x) && !isNaN(y)) {
      // Check if the clicked cell is already hit or missed
      if (event.target.classList.contains('hit-ship') || event.target.classList.contains('miss')) {
        return; // Do nothing if cell is already hit or missed
      }

      const result = game.playRound(x, y);
      renderBoards(game, playerContainer, computerContainer);

      if (result === 'hit' && game.checkGameOver()) {
        alert('Game Over');
      } else if (result !== 'hit') {
        // Computer's turn if player's move was a miss
        computerMove(game, playerContainer, computerContainer);
      }
    }
  });

  const ships = document.querySelectorAll('.ship');
  ships.forEach(ship => {
    ship.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', event.target.dataset.length);
    });
  });

  playerContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  playerContainer.addEventListener('drop', (event) => {
    const length = parseInt(event.dataTransfer.getData('text/plain'));
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if (!isNaN(x) && !isNaN(y)) {
      try {
        game.player.gameboard.placeShip(x, y, length, isHorizontal);
        renderBoards(game, playerContainer, computerContainer);
      } catch (error) {
        alert('Invalid placement');
      }
    }
  });

  // Add event listener for the rotate ships button
  document.getElementById('rotate-ships').addEventListener('click', () => {
    isHorizontal = !isHorizontal; // Toggle ship orientation
    document.getElementById('rotate-ships').innerText = isHorizontal ? 'Rotate to Vertical' : 'Rotate to Horizontal';
  });

  // Add event listener for the reset button
  document.getElementById('reset-game').addEventListener('click', () => {
    resetGame(game, playerContainer, computerContainer);
    alert('Game Reset');
  });
}

function computerMove(game, playerContainer, computerContainer) {
  if (game.currentPlayer !== game.computer) return; // Ensure it's the computer's turn

  setTimeout(() => {
    const result = game.computer.makeMove(game.player);
    renderBoards(game, playerContainer, computerContainer);

    if (result === 'hit' && !game.checkGameOver()) {
      // If the computer hits, it gets another turn
      computerMove(game, playerContainer, computerContainer);
    } else if (result === 'miss') {
      // If the computer misses, switch turn
      game.switchTurn();
    } else if (game.checkGameOver()) {
      alert('Game Over');
    }
  }, 1000); // Delay for 1 second before computer's turn
}

function renderBoards(game, playerContainer, computerContainer) {
  renderBoard(game.player.gameboard, playerContainer, true);
  renderBoard(game.computer.gameboard, computerContainer);
}

function hasShipsPlaced(game) {
  // Check if any ship is placed on the player's gameboard
  return game.player.gameboard.ships.length > 0;
}

function resetGame(game, playerContainer, computerContainer) {
  // Reset the game instance and boards
  game.player.gameboard = new Gameboard();
  game.computer.gameboard = new Gameboard();
  game.currentPlayer = game.player;
  game.isPlacingShips = true;
  game.setupBoards(); // Randomize computer ships

  renderBoards(game, playerContainer, computerContainer); // Render the empty boards

  // Re-enable randomize ships button
  document.getElementById('randomize-ships').disabled = false;
}

export default function initializeGame() {
  const game = new Game();
  const playerContainer = document.getElementById('player-board');
  const computerContainer = document.getElementById('computer-board');

  playerContainer.classList.add('board');
  computerContainer.classList.add('board');

  renderBoards(game, playerContainer, computerContainer);
  setupEventListeners(game, playerContainer, computerContainer);

  document.getElementById('randomize-ships').addEventListener('click', () => {
    game.player.gameboard.randomizeShips();
    renderBoards(game, playerContainer, computerContainer);
  });

  document.getElementById('start-game').addEventListener('click', () => {
    if (!hasShipsPlaced(game)) {
      alert('Please place all ships before starting the game.');
      return;
    }

    game.isPlacingShips = false;
    document.getElementById('randomize-ships').disabled = true; // Disable randomize ships button
    alert('Game Started');
  });

  game.isPlacingShips = true; // Allow placing ships initially
  return game;
}
