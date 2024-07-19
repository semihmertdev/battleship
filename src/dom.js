import Game from './game';

function renderBoard(gameboard, container, isPlayer = false) {
  container.innerHTML = ''; // Clear previous board

  gameboard.board.forEach((row, x) => {
    row.forEach((cell, y) => {
      const cellDiv = document.createElement('div');
      cellDiv.classList.add('cell');
      cellDiv.dataset.x = x;
      cellDiv.dataset.y = y;

      if (isPlayer && cell && !cell.isHit) {
        cellDiv.classList.add('ship');
      }

      if (gameboard.missedShots.some(shot => shot[0] === x && shot[1] === y)) {
        cellDiv.classList.add('miss');
      }

      if (cell && cell.isHit) {
        cellDiv.classList.add('hit-ship');
      }

      container.appendChild(cellDiv);
    });
  });
}

function setupEventListeners(game, playerContainer, computerContainer) {
  computerContainer.addEventListener('click', (event) => {
    if (game.currentPlayer !== game.player) return; // Prevent player from clicking out of turn

    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);

    if (!isNaN(x) && !isNaN(y)) {
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
}

function computerMove(game, playerContainer, computerContainer) {
  if (game.currentPlayer !== game.computer) return; // Ensure it's the computer's turn

  setTimeout(() => {
    const result = game.computerMove();
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

export default function initializeGame() {
  const game = new Game();
  const playerContainer = document.getElementById('player-board');
  const computerContainer = document.getElementById('computer-board');

  playerContainer.classList.add('board');
  computerContainer.classList.add('board');

  renderBoards(game, playerContainer, computerContainer);
  setupEventListeners(game, playerContainer, computerContainer);

  return game;
}
