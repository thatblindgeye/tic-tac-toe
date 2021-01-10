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
    localStorage.setItem("light-theme", document.documentElement.hasAttribute("theme"));
  };
  return {
    saveLocal
  };
})();

const themeSelection = (() => {
  const _themeOnLoad = () => {
    if (localStorage.getItem("light-theme") === "true") {
      document.querySelector(".theme-slider").checked = true;
    } else {
      document.querySelector(".theme-slider").checked = false;
    };
    _themeToggle();
  };
  const _themeToggle = () => {
    if (document.querySelector(".theme-slider").checked === true) {
      document.documentElement.setAttribute("theme", "light");
      document.querySelector(".lower-bar img").setAttribute("src", "images/Github-marks/GitHub-Mark-64px.png");
    } else {
      document.documentElement.removeAttribute("theme");
      document.querySelector(".lower-bar img").setAttribute("src", "images/Github-marks/GitHub-Mark-Light-64px.png");
    };
    settings.saveLocal();
  };
  window.addEventListener("load", _themeOnLoad);
  document.querySelector(".theme-slider").addEventListener("change", _themeToggle);
})();



