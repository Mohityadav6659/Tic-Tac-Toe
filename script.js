document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const message = document.getElementById("message");
  const resetButton = document.getElementsByClassName("reset-btn")[0];
  const rulesBtn = document.querySelector(".rules-btn");
  const rules = document.querySelector(".rules");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));
    console.log(clickedCellIndex);

    if (board[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkResult();
  }

  function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] === "" || board[b] === "" || board[c] === "") {
        continue;
      }
      if (board[a] === board[b] && board[b] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      message.textContent = `${currentPlayer} has won!`;
      gameActive = false;
      return;
    }

    if (!board.includes("")) {
      message.textContent = "It's a draw!";
      gameActive = false;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `It's ${currentPlayer}'s turn`;
  }

  function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach((cell) => (cell.textContent = ""));
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetButton.addEventListener("click", resetGame);

  rulesBtn.addEventListener("click", () => {
    rules.style.opacity = 1;
  });

  message.textContent = `It's ${currentPlayer}'s turn`;
});
