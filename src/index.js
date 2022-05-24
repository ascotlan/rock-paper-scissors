import RockPaperScissors from './rock-paper'

let game

const loadScore = () => {
  const scoreJSON = localStorage.getItem('scores')

  try {
    return scoreJSON ? JSON.parse(scoreJSON) : {playerScore: 0}
  }catch(e){
    return {playerScore: 0}
  }
}

const generateScoreDOM = () => {
  const gameEl = document.querySelector('.game')
  const titleEL = document.createElement('label')
  const gameTitleEl = document.createElement('h1')
  const scoreCaptionEl = document.createElement('p')
  const scoreEl = document.createElement('p')

  gameTitleEl.textContent = "ROCK PAPER SCISSORS"
  titleEL.appendChild(gameTitleEl)
  scoreCaptionEl.textContent = `SCORE`
  titleEL.appendChild(scoreCaptionEl)
  gameEl.appendChild(titleEL)

  scoreEl.textContent = loadScore().playerScore
  titleEL.appendChild(scoreEl)
  gameEl.appendChild(titleEL)

  return gameEl
}

const renderRPS = () => {
  const options = ['rock', 'paper', 'scissors', 'lizard', 'spock']
  const gameEl = generateScoreDOM()

  options.forEach((option) => {
      const optionsButtonEl = document.createElement('button')
      optionsButtonEl.textContent = option
      if(option === 'rock'){
        optionsButtonEl.classList.add("rock")
      }else if(option === 'paper'){
        optionsButtonEl.classList.add("paper")
      }else if(option === 'scissors'){
        optionsButtonEl.classList.add("scissors")
      }else if(option === 'lizard'){
        optionsButtonEl.classList.add("lizard")
      }else{
        optionsButtonEl.classList.add("spock")
      }
      optionsButtonEl.addEventListener('click',(e) => {
        startGame(option)
      })
      gameEl.appendChild(optionsButtonEl)
  })

  return gameEl
}

const renderMatch = (playerChoice, computerChoice) => {
  const result = game.keepScore()
  const matchEl =  renderRPS()
  matchEl.innerHTML = '' 

  generateScoreDOM()

  const yourTextEl = document.createElement('p')
  const houseTextEl = document.createElement('p')
  const yourPickEl = document.createElement('p')
  const housePickEl = document.createElement('p')
  const resultEl = document.createElement('p')
  const playAgainEl = document.createElement('button')
  playAgainEl.classList.add('play-again')


  yourTextEl.textContent = 'YOU PICKED'
  matchEl.appendChild(yourTextEl)
  yourPickEl.textContent = playerChoice
  matchEl.appendChild(yourPickEl)
  resultEl.textContent = result.gameResult
  matchEl.appendChild(resultEl)
  playAgainEl.textContent = 'PLAY AGAIN'
  matchEl.appendChild(playAgainEl)
  houseTextEl.textContent = 'THE HOUSE PICKED'
  matchEl.appendChild(houseTextEl)
  housePickEl.textContent = computerChoice
  matchEl.appendChild(housePickEl)

  document.querySelector('.play-again').addEventListener('click', (e) => {
    matchEl.innerHTML = ''
    renderRPS()
  })

}


const startGame = (playerChoice) => {
  game = new RockPaperScissors(playerChoice, loadScore().playerScore)
  renderMatch(playerChoice, game.generateComputerChoice())
}

renderRPS()

export{startGame, renderRPS, renderMatch}
