const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart');
let board;
let currentPlayer;

function init() {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    currentPlayer = 'X';
    messageElement.textContent = `Player ${currentPlayer}'s turn`;
    boardElement.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => makeMove(i, j));
            boardElement.appendChild(cell);
        }
    }
}

function makeMove(row, col) {
    if (board[row][col] === "" && !checkWin() && !checkDraw()) {
        board[row][col] = currentPlayer;
        updateBoard();
        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
        } else if (checkDraw()) {
            messageElement.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            messageElement.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function updateBoard() {
    const cells = boardElement.getElementsByClassName('cell');
    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cells[index].textContent = board[i][j];
            index++;
        }
    }
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }
    return false;
}

function checkDraw() {
    return board.flat().every(cell => cell !== "");
}

restartButton.addEventListener('click', init);

init();
