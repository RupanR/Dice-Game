//! Getting the elements from html

const dice = document.getElementById("dice");
const playerMove = document.getElementById("player-move");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const player1Button = document.getElementById("player1-button");
const player2Button = document.getElementById("player2-button");

//! Handle start function

const handleStart = () => {
  const playerStart = Math.floor(Math.random() * 2 + 1);
  updateMoves(playerStart === 1 ? "Player-1" : "Player-2");
};

//! Update Moves function

const updateMoves = (player) => {
  //* update the player move value
  playerMove.innerText = `${player} To Play`;

  //* Disabling the button based on player
  if (player === "Player-1") {
    player1Button.disabled = false;
    player2Button.disabled = true;
  } else {
    player1Button.disabled = true;
    player2Button.disabled = false;
  }
};

//Dice roll logic

const handleDiceRoll = (player) => {
  //* Adding and removing the classname for rolling dice animation
  dice.classList.add("rotate");

  //! Using settimeout fn to wait for dice rolling and updating the value

  setTimeout(() => {
    dice.classList.remove("rotate");
    const score = Math.floor(Math.random() * 6 + 1);
    dice.src = `images/${score}.png`;
    if (player === "Player-1") {
      updateMoves("Player-2");
      updateScore(player, score, player1Score);
    } else {
      updateMoves("Player-1");
      updateScore(player, score, player2Score);
    }
  }, 1000);
};

// Update Score logic

const updateScore = (player, score, playerScore) => {
  const currentScore = playerScore.innerText;
  const totalScore = Number(currentScore) + score;
  playerScore.innerText = totalScore;
  checkGameOver(totalScore, player);
};

// Winning Condition

const checkGameOver = (totalScore, player) => {
  if (totalScore >= 30) {
    player1Button.disabled = true;
    player2Button.disabled = true;
    playerMove.innerText = `${player} Won the Game 🎉`;
  }
};

//resetting the game

const handleReset = () => {
  player1Score.innerText = 0;
  player2Score.innerText = 0;
  dice.src = "images/1.png";
  handleStart();
};
