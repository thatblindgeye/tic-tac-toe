# Tic-Tac-Toe
<center><img src="images/board-preview.png"></center>
<br>
This is my version of the Tic-Tac-Toe project for The Odin Project.

Check out the live demo of my <a href="https://thatblindgeye.github.io/tic-tac-toe/">Tic-Tac-Toe</a>.
<br>
<br>
## Features:
- Choose between a dark and light theme
- Play against another player or the computer
- Works on desktop and portable/mobile devices
- Able to play via keyboard only or mouse
<br>
<br>

## How to Play:
Even if you've never played tic-tac-toe before, it is a game that is as simple as can be.
Each player takes a turn picking a spot on the board to place their marker, X's for the 
first player and O's for the second player. You are unable to pick a spot that has already been marked.

The goal of the game is to get your mark 3 in a row either horizontally, vertically, or diagonally.

When you first open the webpage, choose either a 2 player (human vs human) or 1 player (vs computer) game. Then, enter the name(s) in the name field(s), or leave the field(s) blank for the default name(s). Then just click start and you'll be tic-tac-toeing!
<br>
<br>

## Issues I Ran Into
The first issue I came across once I got to the Javascript portion was, of course, whether I was properly utilizing the newly introduced factory functions and module patterns in the previous lesson on TOP. I was excited about using both while reading the lesson, but found I had a little trouble getting started with them once I actually got to it.

The second issue was code cleanliness. My previous projects, in retrospect, were not very clean whatsoever and I wanted to try to fix that starting with this project, something I thought the above methods could help with. I personally think there is some improvement, but with anything there can always be more improvement to work towards on future projects.

At first I misread an instruction for this project, as I had an array for the gameboard created based off of the visual board on the screen, with each click in a cell updating that cell's textContent property. I reworked some code to make it more (I believe) correctly follow the project instructions: now clicking on a cell on the visual gameboard updates an array filled with empty strings, using the cell's id to updat the array index, and another function renders the visual gameboard on screen based on this array.