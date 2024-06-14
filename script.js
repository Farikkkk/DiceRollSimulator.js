const btn = document.querySelector(".roll-button");
const resetBtn = document.querySelector(".reset-button");
const score = document.querySelector("p");
const playerDice1 = document.querySelector("#player-dice1");
const playerDice2 = document.querySelector("#player-dice2");
const computerDice1 = document.querySelector("#computer-dice1");
const computerDice2 = document.querySelector("#computer-dice2");
const rollHistory = document.querySelector(".roll-history");
const resultDiv = document.querySelector(".result");
const diceSound = document.querySelector(".dice-sound");
const lostGameSound = document.querySelector(".lost-game-sound");
const winGameSound = document.querySelector(".win-game-sound");
let soundToggle = document.querySelector("#sound-on");

let historyList = [];
let playerCount = 0;
let computerCount = 0;
let soundEnabled = true;

function rollDice() {
  const playerRolls = [getRandomDiceRoll(), getRandomDiceRoll()];
  const computerRolls = [getRandomDiceRoll(), getRandomDiceRoll()];

  const playerSum = playerRolls[0] + playerRolls[1];
  const computerSum = computerRolls[0] + computerRolls[1];

  playerDice1.innerHTML = getDiceFace(playerRolls[0]);
  playerDice2.innerHTML = getDiceFace(playerRolls[1]);
  computerDice1.innerHTML = getDiceFace(computerRolls[0]);
  computerDice2.innerHTML = getDiceFace(computerRolls[1]);

  historyList.push({
    playerRolls,
    computerRolls,
    playerSum,
    computerSum,
  });

  updateRollHistory();
  determineWinner(playerSum, computerSum);
}

function getRandomDiceRoll() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateRollHistory() {
  rollHistory.innerHTML = "";

  for (let i = 0; i < historyList.length; i++) {
    const { playerRolls, computerRolls, playerSum, computerSum } =
      historyList[i];
    const listItem = document.createElement("li");
    listItem.innerHTML = `Roll ${i + 1} : Player [${playerRolls.join(
      ", "
    )}] = ${playerSum}, Computer [${computerRolls.join(
      ", "
    )}] = ${computerSum}`;
    rollHistory.appendChild(listItem);
  }
}

function determineWinner(playerSum, computerSum) {
  if (playerSum > computerSum) {
    playerCount++;
    resultDiv.innerHTML = "Player wins!";
    score.innerHTML = `Score : ${playerCount} : ${computerCount}`;
  } else if (computerSum > playerSum) {
    computerCount++;
    resultDiv.innerHTML = "Computer wins!";
    score.innerHTML = `Score : ${playerCount} : ${computerCount}`;
  } else {
    resultDiv.innerHTML = "It's a tie!";
  }

  if (playerCount === 5) {
    btn.disabled = true;

    if (soundEnabled) {
      winGameSound.currentTime = 0;
      winGameSound.play();
    }

    score.innerHTML = "";
    resultDiv.innerHTML = `Game Over! Final Score : Player WINS!`;
    listItem.innerHTML = "";
  } else if (computerCount === 5) {
    btn.disabled = true;

    if (soundEnabled) {
      lostGameSound.currentTime = 0;
      lostGameSound.play();
    }

    score.innerHTML = "";
    resultDiv.innerHTML = `Game Over! Final Score : Computer WINS!`;
    listItem.innerHTML = "";
  }
}

function getDiceFace(randomNum) {
  switch (randomNum) {
    case 1:
      return "&#9856;";
    case 2:
      return "&#9857;";
    case 3:
      return "&#9858;";
    case 4:
      return "&#9859;";
    case 5:
      return "&#9860;";
    case 6:
      return "&#9861;";
    default:
      return "";
  }
}

function soundOnOff() {
  soundEnabled = !soundEnabled;

  if (soundEnabled) {
    soundToggle.classList.remove("fa-volume-mute");
    soundToggle.classList.add("fa-volume-up");
    soundToggle.innerHTML = "   Sound On";
  } else {
    diceSound.pause();
    diceSound.currentTime = 0;
    lostGameSound.pause();
    lostGameSound.currentTime = 0;
    winGameSound.pause();
    winGameSound.currentTime = 0;
    soundToggle.classList.remove("fa-volume-up");
    soundToggle.classList.add("fa-volume-mute");
    soundToggle.innerHTML = "   Sound Off";
  }
}

soundToggle.addEventListener("click", soundOnOff);

btn.addEventListener("click", () => {
  playerDice1.classList.add("roll-animation");
  playerDice2.classList.add("roll-animation2");
  computerDice1.classList.add("roll-animation");
  computerDice2.classList.add("roll-animation2");

  if (soundEnabled) {
    diceSound.currentTime = 0;
    diceSound.play();
  }

  setTimeout(() => {
    playerDice1.classList.remove("roll-animation");
    playerDice2.classList.remove("roll-animation2");
    computerDice1.classList.remove("roll-animation");
    computerDice2.classList.remove("roll-animation2");

    rollDice();
  }, 1000);
});

resetBtn.addEventListener("click", () => {
  btn.disabled = false;

  playerCount = 0;
  computerCount = 0;
  historyList = [];

  score.innerHTML = "Score: 0 : 0";
  rollHistory.innerHTML = "";
  resultDiv.innerHTML = "";
  listItem.innerHTML = "";
});
