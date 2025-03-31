const startGameBtn = document.getElementById("startGame");
const moodBtns = document.querySelectorAll(".mood-btn");
const intensitySlider = document.getElementById("intensity");
const sliderLabel = document.getElementById("sliderLabel");
const eventDesc = document.getElementById("eventDesc");
const submitEventBtn = document.getElementById("submitEvent");
const addMoreBtn = document.getElementById("addMore");

const startScreen = document.getElementById("start-screen");
const moodScreen = document.getElementById("mood-screen");
const intensityScreen = document.getElementById("intensity-screen");
const scoreboardScreen = document.getElementById("scoreboard-screen");

const intensityPrompt = document.getElementById("intensityPrompt");
const scoreTableBody = document.querySelector("#scoreTable tbody");
const p1ScoreText = document.getElementById("p1Score");
const p2ScoreText = document.getElementById("p2Score");

let playerOne = "";
let playerTwo = "";
let currentMood = "";
let p1Score = 0;
let p2Score = 0;

// witty comments based on intensity
const wittyComments = {
  happy: [
    "Awww. That's sweet. Bonus points! 💖",
    "Okay, pookie's in the good books today. 😌",
    "A 10? Are they cooking, cleaning AND saying sorry?! 🤯",
  ],
  mad: [
    "Ouch. That stings. -5 incoming. 🥲",
    "Wow. Passive-aggressive silence unlocked. 😤",
    "A full 10? That’s ‘sleep-on-the-couch’ level. 🛏️🚫",
    "You sure you wanna forgive that? 😬",
  ],
};

// Utility function
function switchScreen(hide, show) {
  hide.classList.add("hidden");
  show.classList.remove("hidden");
}

// Start Game
startGameBtn.addEventListener("click", () => {
  playerOne = document.getElementById("playerOne").value.trim();
  playerTwo = document.getElementById("playerTwo").value.trim();

  if (!playerOne || !playerTwo) {
    alert("Both players must be named. No anonymous drama here!");
    return;
  }

  p1ScoreText.textContent = `${playerOne}: 0`;
  p2ScoreText.textContent = `${playerTwo}: 0`;

  switchScreen(startScreen, moodScreen);
});

// Mood Select
moodBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentMood = btn.dataset.mood;

    if (currentMood === "happy") {
      intensityPrompt.textContent = "How awesome was their move? 💖";
    } else {
      intensityPrompt.textContent = "How mad are you right now? 😤";
    }

    eventDesc.value = "";
    sliderLabel.textContent = `Intensity: ${intensitySlider.value}`;

    switchScreen(moodScreen, intensityScreen);
  });
});

// Slider label update
intensitySlider.addEventListener("input", () => {
  sliderLabel.textContent = `Intensity: ${intensitySlider.value}`;
});

// Submit Event
submitEventBtn.addEventListener("click", () => {
  const intensity = parseInt(intensitySlider.value);
  const description = eventDesc.value.trim();
  const date = new Date().toLocaleDateString();

  if (!description) {
    alert("Add some spicy context – what happened?");
    return;
  }

  // Score logic
  let scoreChange = currentMood === "happy" ? intensity : -intensity;
  p2Score += scoreChange;

  // Add entry to table
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${date}</td>
    <td>${playerTwo}</td>
    <td>${description}</td>
    <td>${currentMood.toUpperCase()}</td>
    <td>${scoreChange > 0 ? "+" : ""}${scoreChange}</td>
  `;
  scoreTableBody.appendChild(row);

  // Witty feedback
  const moodArray = wittyComments[currentMood];
  const randomMsg = moodArray[Math.floor(Math.random() * moodArray.length)];
  alert(randomMsg);

  // Update scoreboard
  p1ScoreText.textContent = `${playerOne}: ${p1Score}`;
  p2ScoreText.textContent = `${playerTwo}: ${p2Score}`;

  switchScreen(intensityScreen, scoreboardScreen);
});

// Add Another
addMoreBtn.addEventListener("click", () => {
  switchScreen(scoreboardScreen, moodScreen);
});
