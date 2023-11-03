/**
 * Filename: complexCode.js
 *
 * Description:
 * This complex JavaScript code demonstrates an implementation of a Tic-Tac-Toe game
 * using advanced algorithms and DOM manipulation techniques.
 *
 * The game showcases a sophisticated AI player that never loses, making smart moves
 * based on a minimax algorithm. The graphical interface is sleek and user-friendly,
 * providing an immersive gaming experience.
 *
 * The code includes various utility functions, event listeners, and game logic to handle
 * player moves, AI moves, win conditions, and board manipulation.
 *
 * Note: This code assumes that an HTML document with appropriate CSS styles is loaded.
 *       It can be run in the browser's console for testing purposes.
 */

// Global variables
let board;          // The game board
let playerTurn;     // Current player's turn
let gameOver;       // Flag to indicate if the game is over

// Initializes the game
function initGame() {
  board = Array.from(Array(9).keys());
  playerTurn = 'X';
  gameOver = false;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.innerText = '';
    cell.addEventListener('click', makeMove);
  });
}

// Handles player's move
function makeMove(event) {
  if (typeof board[event.target.id] === 'number' && !gameOver) {
    updateBoard(event.target.id, playerTurn);
    if (!checkWin(board, playerTurn) && !checkTie()) {
      playerTurn = (playerTurn === 'X') ? 'O' : 'X';
      if (playerTurn === 'O') {
        makeAIMove();
      }
    }
  }
}

// Updates the game board based on a move
function updateBoard(position, player) {
  board[position] = player;
  document.getElementById(position).innerText = player;
  const winningCombo = getWinningCombo(board, player);
  if (winningCombo) {
    gameEnd('win', winningCombo);
  }
}

// Handles AI's move
function makeAIMove() {
  let bestMove = findBestMove(board);
  updateBoard(bestMove.index, playerTurn);
  if (!checkWin(board, playerTurn) && !checkTie()) {
    playerTurn = 'X';
  }
}

// Minimax algorithm to determine the best possible move for AI
function minimax(newBoard, player) {
  const availSpots = emptySpots(newBoard);

  if (checkWin(newBoard, 'X')) {
    return { score: -10 };
  } else if (checkWin(newBoard, 'O')) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === 'O') {
      let result = minimax(newBoard, 'X');
      move.score = result.score;
    } else {
      let result = minimax(newBoard, 'O');
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  if (player === 'O') {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

// Returns an array containing indices of empty spots on the board
function emptySpots(board) {
  return board.filter(s => typeof s === 'number');
}

// Checks if a player has won the game
function checkWin(board, player) {
  const winningCombo = getWinningCombo(board, player);
  if (winningCombo) {
    gameEnd('win', winningCombo);
    return true;
  }
  return false;
}

// Returns the winning combination for a given player
function getWinningCombo(board, player) {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];

  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return [a, b, c];
    }
  }

  return null;
}

// Checks if the game is a tie
function checkTie() {
  if (emptySpots(board).length === 0 && !checkWin(board, 'X') && !checkWin(board, 'O')) {
    gameEnd('tie');
    return true;
  }
  return false;
}

// Handles game ending scenarios (win or tie)
function gameEnd(outcome, combo) {
  gameOver = true;

  if (outcome === 'win') {
    combo.forEach(index => {
      document.getElementById(index).classList.add('winning-cell');
    });
    setTimeout(() => {
      alert(`Player ${playerTurn} wins!`);
      resetGame();
    }, 100); // Delay for visual effect
  } else if (outcome === 'tie') {
    setTimeout(() => {
      alert('It\'s a tie!');
      resetGame();
    }, 100); // Delay for visual effect
  }
}

// Resets the game
function resetGame() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.removeEventListener('click', makeMove);
    cell.innerText = '';
    cell.classList.remove('winning-cell');
  });

  setTimeout(() => {
    initGame();
  }, 100); // Delay for visual effect

  gameOver = false;
}

// Start the game
initGame();