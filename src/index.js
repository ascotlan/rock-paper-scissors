import RockPaperScissors from "./rock-paper";

let game;

const loadScore = () => {
  const scoreJSON = localStorage.getItem("scores");

  try {
    return scoreJSON ? JSON.parse(scoreJSON) : { playerScore: 0 };
  } catch (e) {
    return { playerScore: 0 };
  }
};

const generateScoreDOM = () => {
  const titleEl = document.querySelector(".title");
  const headerEl = document.querySelector(".score");
  const gameTitleEl = document.createElement("img");
  const scoreCaptionEl = document.createElement("span");
  const scoreEl = document.createElement("span");

  gameTitleEl.setAttribute("src", "./images/logo-bonus.svg");
  gameTitleEl.setAttribute(
    "alt",
    "Title of game, which is Rock, Paper, Scissors, Lizard, Spock"
  );
  titleEl.appendChild(gameTitleEl);
  scoreCaptionEl.textContent = `score`;
  scoreCaptionEl.classList.add("score-text");
  headerEl.appendChild(scoreCaptionEl);

  scoreEl.textContent = loadScore().playerScore;
  scoreEl.classList.add("score-number");
  headerEl.appendChild(scoreEl);

  return [titleEl, headerEl];
};

const renderRPS = () => {
  const gameEl = document.querySelector(".game");
  const pentagonEl = document.querySelector(".pentagon");
  const options = ["scissors", "paper", "rock", "lizard", "spock"];
  generateScoreDOM();

  options.forEach((option) => {
    const optionsButtonEl = document.createElement("button");
    const wrapperEl = document.createElement("div");
    if (option === "rock") {
      optionsButtonEl.classList.add("rock");
      optionsButtonEl.ariaLabel = "rock";
      wrapperEl.classList.add("rock-wrapper");
    } else if (option === "paper") {
      optionsButtonEl.classList.add("paper");
      optionsButtonEl.ariaLabel = "paper";
      wrapperEl.classList.add("paper-wrapper");
    } else if (option === "scissors") {
      optionsButtonEl.classList.add("scissors");
      optionsButtonEl.ariaLabel = "scissors";
      wrapperEl.classList.add("scissors-wrapper");
    } else if (option === "lizard") {
      optionsButtonEl.classList.add("lizard");
      optionsButtonEl.ariaLabel = "lizard";
      wrapperEl.classList.add("lizard-wrapper");
    } else {
      optionsButtonEl.classList.add("spock");
      optionsButtonEl.ariaLabel = "spock";
      wrapperEl.classList.add("spock-wrapper");
    }
    optionsButtonEl.addEventListener("click", (e) => {
      startGame(option);
      pentagonEl.classList.add("no-show");
      gameEl.classList.add("result-spacing");
    });
    wrapperEl.appendChild(optionsButtonEl);
    gameEl.appendChild(wrapperEl);
  });

  return gameEl;
};

const renderMatch = () => {
  const [titleEl, headerEl] = generateScoreDOM();
  const matchEl = renderRPS();
  titleEl.innerHTML = "";
  headerEl.innerHTML = "";
  matchEl.innerHTML = "";

  generateScoreDOM();

  const yourTextEl = document.createElement("p");
  const houseTextEl = document.createElement("p");
  const yourPickEl = document.createElement("button");
  const housePickEl = document.createElement("button");
  const resultEl = document.createElement("p");
  const playAgainEl = document.createElement("button");
  const restartEl = document.createElement("div");
  const pentagonEl = document.querySelector(".pentagon");
  const wrapperEl = document.createElement("div");
  const wrapper2El = document.createElement("div");
  const containerEl = document.querySelector(".rules");
  playAgainEl.classList.add("play-again");

  containerEl.classList.remove("margin-top-helper");

  wrapperEl.classList.add("your-pick");
  wrapper2El.classList.add("house-pick", "space-holder");
  const youChose = game.setGameRules()[game.playerChoice].class;
  yourPickEl.classList.add(youChose);
  yourPickEl.ariaLabel = youChose;

  yourTextEl.textContent = "YOU PICKED";
  yourTextEl.classList.add("player-choice");
  matchEl.appendChild(yourTextEl);

  wrapperEl.appendChild(yourPickEl);
  matchEl.appendChild(wrapperEl);

  houseTextEl.textContent = "THE HOUSE PICKED";
  houseTextEl.classList.add("cpu-choice");
  const pcChose = game.setGameRules()[game.generateComputerChoice()].class;
  housePickEl.classList.add(pcChose);
  housePickEl.ariaLabel = pcChose;

  housePickEl.style.visibility = "hidden";
  housePickEl.style.opacity = 0;
  housePickEl.style.pointerEvents = "none";

  matchEl.appendChild(houseTextEl);
  wrapper2El.appendChild(housePickEl);

  resultEl.textContent = game.keepScore().gameResult;
  playAgainEl.textContent = "PLAY AGAIN";
  restartEl.classList.add("results");

  restartEl.style.display = "none";

  restartEl.appendChild(resultEl);
  restartEl.appendChild(playAgainEl);
  matchEl.appendChild(restartEl);
  matchEl.appendChild(wrapper2El);

  setTimeout(() => {
    housePickEl.style.visibility = "visible";
    housePickEl.style.opacity = 1;
    housePickEl.style.pointerEvents = "auto";
    housePickEl.style.transition = "all 0.1s";

    setTimeout(() => {
      restartEl.style.display = "flex";
      titleEl.innerHTML = "";
      headerEl.innerHTML = "";
      generateScoreDOM();
      if (resultEl.textContent === "YOU WIN") {
        wrapperEl.classList.add("winner");
      }

      if (resultEl.textContent === "YOU LOSE") {
        wrapper2El.classList.add("winner");
      }
    }, 500);
  }, 500);

  document.querySelector(".play-again").addEventListener("click", (e) => {
    titleEl.innerHTML = "";
    matchEl.innerHTML = "";
    headerEl.innerHTML = "";
    renderRPS();
    pentagonEl.classList.remove("no-show");
    matchEl.classList.remove("result-spacing");
    containerEl.classList.remove("margin-top-helper");
  });
};

const startGame = (playerChoice) => {
  game = new RockPaperScissors(playerChoice, loadScore().playerScore);
  renderMatch();
};

const modal = document.querySelector(".modal");
document.querySelector(".game-rules").addEventListener("click", (e) => {
  modal.showModal();
});

document.querySelector(".close-rules").addEventListener("click", (e) => {
  modal.close();
});

window.addEventListener("storage", (e) => {
  //update score and reset game in other windows
  if (e.key === "scores") {
    const [titleEl, headerEl] = generateScoreDOM();
    const matchEl = renderRPS();
    titleEl.innerHTML = "";
    headerEl.innerHTML = "";
    matchEl.innerHTML = "";

    renderRPS();
  }
});

renderRPS();
