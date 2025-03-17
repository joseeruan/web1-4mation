    let currentPlayer, lastMove , board, boardSize;

    const boardElement = document.getElementById("board");
    const messageElement = document.querySelector("p");
    const buttonElement = document.getElementById("button");

    function startGame() {
        boardSize = 7;
        currentPlayer = 'blue';
        board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
        lastMove = null;
        createBoard();
        createButton();
        modifyMessage();
    }

    function createBoard() {
        boardElement.innerHTML = '';

        for (let i = 0; i < boardSize; i++) {
            let row = document.createElement("div");
            row.classList.add("row");

            for (let j = 0; j < boardSize; j++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.addEventListener("click", insertPiece);
                row.appendChild(cell);
            }
            boardElement.appendChild(row);
        }
    }

    function createButton() {
        buttonElement.innerHTML = '';
        const button = document.createElement('button');
        button.textContent = 'Reiniciar o jogo';
        button.addEventListener("click", startGame);
        buttonElement.appendChild(button);
    }

    function insertPiece(event) {
        let row = parseInt(event.target.dataset.row);
        let col = parseInt(event.target.dataset.col);

        if (board[row][col] !== null) {
            return;
        }

        if (lastMove !== null ) { 
            let adjacentMovesAvailable = checkAdjacentMoves(lastMove.row, lastMove.col);
        
            if (adjacentMovesAvailable && !verifyPosition(row, col, lastMove.row, lastMove.col)) {
                return;
            }
        }

        board[row][col] = currentPlayer;
        event.target.classList.add(currentPlayer);
        lastMove = { row, col };


        if (checkWinner(row, col)) {
            removeHighlight();
            return endGame(`O jogador ${currentPlayer === "blue" ? "Azul" : "Vermelho"} venceu a partida!`);
        }

        if (isBoardFull()) {
            removeHighlight();
            messageElement.classList.remove('blue', 'red');
            return endGame('o jogo terminou empatado!');
        }
        switchPlayer();
    }

    function removeHighlight() {
        document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("highlight"));
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "blue" ? "red" : "blue";
        modifyMessage();
        highlightAvailableMoves();
    }


    function verifyPosition(row, col, lastRow, lastCol) {
        return Math.abs(row - lastRow) <= 1 && Math.abs(col - lastCol) <= 1;
    }

    function endGame(message) {
        messageElement.textContent = message;
        alert(message);
        document.querySelectorAll(".cell").forEach(cell => cell.removeEventListener("click", insertPiece));
    }

    
function checkAdjacentMoves(lastRow, lastCol) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let newRow = lastRow + i;
            let newCol = lastCol + j;
            if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize && board[newRow][newCol] === null) {
                return true;
            }
        }
    }
    return false;
}
    function highlightAvailableMoves() {
        removeHighlight();

        if (lastMove !== null) {
            let { row, col } = lastMove;
            let adjacentMovesAvailable = false;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    let newRow = row + i;
                    let newCol = col + j;
                    if (
                        newRow >= 0 && newRow < boardSize &&
                        newCol >= 0 && newCol < boardSize &&
                        board[newRow][newCol] === null
                    ) {
                        document.querySelector(`.cell[data-row='${newRow}'][data-col='${newCol}']`)?.classList.add("highlight");
                        adjacentMovesAvailable = true;
                    }
                }
            }

            if (!adjacentMovesAvailable) {
                document.querySelectorAll(".cell").forEach(cell => {
                    let row = parseInt(cell.dataset.row);
                    let col = parseInt(cell.dataset.col);
                    if (board[row][col] === null) {
                        cell.classList.add("highlight");
                    }
                });
            }
        }
    }

    function checkWinner(row, col) {
        let directions = [
            [0, 1], [1, 0], [1, 1], [1, -1]
        ];
    
        for (let [dx, dy] of directions) {
            let count = 1;
            count += countInDirection(row, col, dx, dy);
            count += countInDirection(row, col, -dx, -dy);
            if (count >= 4) return true;
        }
        return false;
    }

    function countInDirection(row, col, dx, dy) {
        let r = row + dx;
        let c = col + dy;
        let count = 0;

        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === currentPlayer) {
            count++;
            r += dx;
            c += dy;
        }
        return count;
    }

    function modifyMessage() {
        let playerName = currentPlayer === "blue" ? "Azul" : "Vermelho";
        messageElement.textContent = `O jogador ${playerName} deve jogar`;

        messageElement.classList.toggle('blue', playerName === "Azul");
        messageElement.classList.toggle('red', playerName === "Vermelho");
    }

    function isBoardFull() {
        return board.every(row => row.every(cell => cell !== null)) 
        
    } 
    startGame();
