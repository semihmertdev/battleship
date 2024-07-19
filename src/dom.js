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
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    if (!isNaN(x) && !isNaN(y)) {
      const result = game.playRound(x, y);
      renderBoards(game, playerContainer, computerContainer);

      if (result === 'hit') {
        if (game.checkGameOver()) {
          alert('Game Over');
        }
      }
    }
  });
}

function renderBoards(game, playerContainer, computerContainer) {
  renderBoard(game.player.gameboard, playerContainer, true);
  renderBoard(game.computer.gameboard, computerContainer);
}

export default function initializeGame() {
  const game = new Game();
  const playerContainer = document.createElement('div');
  const computerContainer = document.createElement('div');

  playerContainer.classList.add('board');
  computerContainer.classList.add('board');

  document.getElementById('game-container').appendChild(playerContainer);
  document.getElementById('game-container').appendChild(computerContainer);

  renderBoards(game, playerContainer, computerContainer);
  setupEventListeners(game, playerContainer, computerContainer);

  return game;
}
