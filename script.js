
document.addEventListener("DOMContentLoaded", () => {

let tick = new Audio("ting.wav");
let background = new Audio("gameover.mp3");
let turn = "❌";
let isbackground = false;
let isGameOver = false; 
let movesMade=0;

// Changing turn values
const changeTurn = () => {
  return turn === "❌" ? "⭕" : "❌";
};

// Function to reset the game
const resetGame = () => {
  let box_texts = document.querySelectorAll(".box_text");
  Array.from(box_texts).forEach((element) => {
    element.innerHTML = "";
  });
  turn = "❌";
  isbackground = false;
  isGameOver = false; // Reset the game over flag
  movesMade=0;
  document.querySelector(".line").style.width = "0vw";
  document.querySelector(".info").innerHTML = "Participant1, move forward!";
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
  background.pause();
};

// Checking who wins
const check = () => {
  if (isbackground || isGameOver) {
    return; // Return early if the game is already won or over
  }

  let box_text = document.querySelectorAll(".box_text");
  let win = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];

  win.forEach((e) => {
    if (
      box_text[e[0]].innerHTML === box_text[e[1]].innerHTML &&
      box_text[e[2]].innerHTML === box_text[e[1]].innerHTML &&
      box_text[e[0]].innerHTML !== ""
    ) {
      document.querySelector(".info").innerHTML =
        box_text[e[0]].innerHTML + " Won";
      isbackground = true;
      isGameOver = true; // Set the game over flag
      document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(".line").style.width = "20vw";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      background.play();

      // Pause the game over sound after a short duration (2 seconds)
      setTimeout(() => {
        background.pause();
      }, 5000);
    }
  });

  // Show tie message if no winner and all boxes are filled
  if (!isbackground) {
    let isTie = true;
    win.forEach((e) => {
      if (!box_text[e[0]].innerHTML) {
        isTie = false;
      }
    });

    if (isTie) {
      setTimeout(() => {
        if (confirm("It's a tie! Play again?")) {
          resetGame();
        }
      }, 2000);
    }
  }
};

// Main Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let box_text = element.querySelector(".box_text");
  element.addEventListener("click", () => {
    if (!isGameOver && box_text.innerHTML === "") {
      box_text.innerHTML = turn;
      turn = changeTurn();
      tick.play();
      movesMade++;
      check();
      
      if (!isbackground && !isGameOver) {
        document.querySelector(".info").innerHTML = turn === "❌" ? "Participant1, move forward!" : "Participant2, move forward!";
      }
    }
  });
});

// Reset button
let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetGame);


});
