"use strict";

// 2) have an option to select player vs cpu or pvp; player 1 is always "x", and players
//    can enter their name(s)
// 3) create gameboard with 9 cells, each of which has its text content filled in based on
//    an array; each cell is labeled with id of 0 - 8, starting left to right for each row
//    i.e.:
//    0 1 2
//    3 4 5
//    6 7 8
// 4) game logic:
//    - create a variable for "turn" to keep track of whose turn it is and to pass turn
//      after a valid move is made; if it is playerOne's turn, turn = playerTwo etc.
//    - when a click occurs, only run the function to update the array/gameboard if the
//      cell is empty.
//    - if a click occurs in an empty cell:
//      - add the current player's piece to the array
//      - update the gameboard based on the array
//      - check if there is 3 in a row or all cells (array items) are filled in and end
//        the game if so, otherwise pass turn to the next player

const settings = (() => {
  const saveLocal = () => {
    localStorage.setItem(
      "light-theme",
      document.documentElement.hasAttribute("theme")
    );
  };
  return {
    saveLocal,
  };
})();

const themeSelection = (() => {
  const _themeOnLoad = () => {
    if (localStorage.getItem("light-theme") === "true") {
      document.querySelector(".theme-slider").checked = true;
    } else {
      document.querySelector(".theme-slider").checked = false;
    }
    _themeToggle();
  };
  const _themeToggle = () => {
    if (document.querySelector(".theme-slider").checked === true) {
      document.documentElement.setAttribute("theme", "light");
      document
        .querySelector(".lower-bar img")
        .setAttribute("src", "images/Github-marks/GitHub-Mark-64px.png");
    } else {
      document.documentElement.removeAttribute("theme");
      document
        .querySelector(".lower-bar img")
        .setAttribute("src", "images/Github-marks/GitHub-Mark-Light-64px.png");
    }
    settings.saveLocal();
  };
  window.addEventListener("load", _themeOnLoad);
  document
    .querySelector(".theme-slider")
    .addEventListener("change", _themeToggle);
})();

const playerCreation = (name, marker) => {
  return {
    name,
    marker,
  };
};

const elements = (() => {
  const boardCells = document.querySelector(".gameboard").children;
  const game = document.querySelector("#gameboard-container");
  const gameOver = document.querySelector(".game-over-modal");
  const newGame = document.querySelector(".new-game");
  const newRound = document.querySelector(".new-round");
  const options = document.querySelector(".game-options");
  const p1Name = document.querySelector("#player1-name");
  const p2Name = document.querySelector("#player2-name");
  const p2Label = document.querySelector("label[for='player2-name']");
  const tracker = document.querySelector(".turn-tracker");
  const winnerText = document.querySelector(".winner");

  const _toggleActive = (e) => {
    if (!Array.from(e.target.classList).includes("active")) {
      if (e.key === " " || e.key === "Enter") {
        e.target.classList.add("active");
      };
    } else {
      e.target.classList.remove("active");
    };
  };

  Array.from(document.querySelectorAll("button")).forEach(button => {
    button.addEventListener("keydown", _toggleActive);
  });
  Array.from(document.querySelectorAll("button")).forEach(button => {
    button.addEventListener("keyup", _toggleActive);
  });

  return {
    boardCells,
    game,
    gameOver,
    newGame,
    newRound,
    options,
    p1Name,
    p2Name,
    p2Label,
    tracker,
    winnerText
  };
})();

const gameSetup = (() => {
  let gameType = "pvp";
  const _updateGameType = (e) => {
    if (e.target.id === "pvc") {
      elements.p2Name.style.display = "none";
      elements.p2Label.style.display = "none";
    } else {
      elements.p2Name.style.display = "block";
      elements.p2Label.style.display = "block";
    };
    gameSetup.gameType = e.target.id;
  };
  Array.from(document.querySelectorAll(".gametype-btn")).forEach((button) => {
    button.addEventListener("click", _updateGameType);
  });

  const player1 = playerCreation("Player 1", "X");
  const player2 = playerCreation("Player 2", "O");
  const _updateNames = () => {
    if (elements.p1Name.value) {
      player1.name = elements.p1Name.value;
    };
    if (gameSetup.gameType === "pvc") {
      player2.name = "Computer";
    } else if (elements.p2Name.value) {
      player2.name = elements.p2Name.value;
    };
  };

  const _startGame = () => {
    _updateNames();
    elements.options.style.display = "none";
    elements.tracker.textContent = player1.name + "'s Turn";
    elements.game.style.display = "flex";
  };
  document.querySelector(".start-btn").addEventListener("click", _startGame);

  return {
    gameType,
    player1,
    player2
  };
})();

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  return {
    board
  };
})();

const gameLogic = (() => {
  let currentTurn = "player1";
  const _placeMarker = (e) => {
    if (gameBoard.board[e.target.id] !== "") return;
    gameBoard.board[e.target.id] = gameSetup[currentTurn].marker;
    e.target.textContent = gameSetup[currentTurn].marker;
    _checkForWinner(7);
    _endOfTurn();
  };
  Array.from(document.querySelectorAll(".gameboard-cell")).forEach((cell) => {
    cell.addEventListener("click", _placeMarker);
  });

  let turnNum = 1;
  const _endOfTurn = () => {
    if (endOfGame === true) return;
    currentTurn === "player1" ? (currentTurn = "player2"): (currentTurn = "player1");
    _updateTracker();
    turnNum++;
  };

  const _updateTracker = () => {
    elements.tracker.textContent = gameSetup[currentTurn].name + "'s Turn";
  };

  const _render = (cell) => {
    if (cell < 0) return;
    elements.boardCells[cell].textContent = gameBoard.board[cell];
    _render(cell - 1);
  };

  const _winConditions = [
    [elements.boardCells[0], elements.boardCells[1], elements.boardCells[2]],
    [elements.boardCells[3], elements.boardCells[4], elements.boardCells[5]],
    [elements.boardCells[6], elements.boardCells[7], elements.boardCells[8]],
    [elements.boardCells[0], elements.boardCells[3], elements.boardCells[6]],
    [elements.boardCells[1], elements.boardCells[4], elements.boardCells[7]],
    [elements.boardCells[2], elements.boardCells[5], elements.boardCells[8]],
    [elements.boardCells[0], elements.boardCells[4], elements.boardCells[8]],
    [elements.boardCells[2], elements.boardCells[4], elements.boardCells[6]]
  ];

  const _compareToConditions = (item) => {
    return item.textContent === gameSetup[currentTurn].marker;
  };

  let endOfGame = false;
  const _checkForWinner = (conditionIndex) => {
    if (conditionIndex < 0) return;
    if (!_winConditions[conditionIndex].every(_compareToConditions)) {
      _checkForWinner(conditionIndex - 1);
    } else {
      endOfGame = true;
      elements.gameOver.style.display = "flex";
      elements.winnerText.textContent = gameSetup[currentTurn].name + " wins!";
    };
    if (turnNum === 9 && endOfGame === false) {
      endOfGame = true;
      elements.gameOver.style.display = "flex";
      elements.winnerText.textContent = "It's a TIE!";
    };
  };

  const _cpuTurn = () => {
    let validMoves = [];
    function findValidCells() {
      gameBoard.board.forEach((item, index) => {
        if (item === "") {
            validMoves.push(index);
        };
      });
    };
    findValidCells();
    Math.floor(Math.random() * validMoves.length);
  };

  const _newRound = () => {
    currentTurn = "player1";
    turnNum = 1;
    endOfGame = false;
    elements.gameOver.style.display = "none";
    elements.tracker.textContent = gameSetup.player1.name + "'s Turn";
    gameBoard.board.forEach((item, index) => {
      gameBoard.board[index] = "";
    });
    _render(8);
  };
  elements.newRound.addEventListener("click", _newRound);

  const _newGame = () => {
    _newRound();
    elements.game.style.display = "none";
    elements.options.style.display = "flex";
  };
  elements.newGame.addEventListener("click", _newGame);
})();
