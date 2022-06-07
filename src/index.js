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
  const titleEl = document.querySelector('.title')
  const headerEl = document.querySelector('.score')
  const gameTitleEl = document.createElement('img')
  const scoreCaptionEl = document.createElement('p')
  const scoreEl = document.createElement('p')

  gameTitleEl.setAttribute('src','./images/logo-bonus.svg')
  titleEl.appendChild(gameTitleEl)
  scoreCaptionEl.textContent = `SCORE`
  headerEl.appendChild(scoreCaptionEl)

  scoreEl.textContent = loadScore().playerScore
  headerEl.appendChild(scoreEl)

  return [titleEl, headerEl]
}

const renderRPS = () => {
  const gameEl = document.querySelector('.game')
  const options = ['rock', 'paper', 'scissors', 'lizard', 'spock']
  generateScoreDOM()

  options.forEach((option) => {
      const optionsButtonEl = document.createElement('button')

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

const renderMatch = () => {
  const [titleEl, headerEl] =   generateScoreDOM()
  const matchEl =  renderRPS()
  titleEl.innerHTML = ''
  headerEl.innerHTML =''
  matchEl.innerHTML = ''

  generateScoreDOM()

  const yourTextEl = document.createElement('p')
  const houseTextEl = document.createElement('p')
  const yourPickEl = document.createElement('button')
  const housePickEl = document.createElement('button')
  const resultEl = document.createElement('p')
  const playAgainEl = document.createElement('button')
  playAgainEl.classList.add('play-again')

  yourPickEl.classList.add(game.setGameRules()[game.playerChoice].class)

  yourTextEl.textContent = 'YOU PICKED'
  matchEl.appendChild(yourTextEl)
  matchEl.appendChild(yourPickEl)

  houseTextEl.textContent = 'THE HOUSE PICKED'
  matchEl.appendChild(houseTextEl)

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      game.generateComputerChoice().length > 0 ?
      resolve(game.generateComputerChoice()):
        reject('House has not made a choice yet!')
    }, 500)
  })

  myPromise.then((data) => {
    housePickEl.classList.add(game.setGameRules()[data].class)
    matchEl.appendChild(housePickEl)

    resultEl.textContent = game.keepScore().gameResult
    matchEl.appendChild(resultEl)
    playAgainEl.textContent = 'PLAY AGAIN'
    matchEl.appendChild(playAgainEl)

    titleEl.innerHTML = ''
    headerEl.innerHTML =''

    generateScoreDOM()

    document.querySelector('.play-again').addEventListener('click', (e) => {
      titleEl.innerHTML = ''
      matchEl.innerHTML = ''
      headerEl.innerHTML =''
      renderRPS()
    })

  }).catch((err) => {
      console.log(err)
  })

}

const startGame = (playerChoice) => {
  game = new RockPaperScissors(playerChoice, loadScore().playerScore)
  renderMatch()
}

document.querySelector('.game-rules').addEventListener('click', (e) => {
  window.open("/rules.html",'popUpWindow','height=500,width=500,resizable=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,location=no')
})

window.addEventListener('storage', (e) => { //update score and reset game in other windows
  if(e.key === 'scores'){
    const [titleEl, headerEl] =   generateScoreDOM()
    const matchEl =  renderRPS()
    titleEl.innerHTML = ''
    headerEl.innerHTML =''
    matchEl.innerHTML = ''

    renderRPS()
  }
})

renderRPS()

export{startGame, renderRPS, renderMatch}
