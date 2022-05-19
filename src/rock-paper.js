class RockPaperScissors {
  constructor(playerChoice, difficulty) {
    this.playerChoice = playerChoice
    this.computerChoice = ''
    this.gameDifficulty = difficulty ///set as 0 or  1
    this.playerScore = 0
    this.computerScore = 0
  }

  keepScore() {
    const options = this.setGame()
    const scores = this.setGameRules(options).find((possibleScores) => {
      if (possibleScores.playerChoice === this.playerChoice && possibleScores.computerChoice === this.computerChoice) {
        return possibleScores
      }
    })

    this.playerScore  += scores.playerScore
    this.playerScore -= this.playerScore > 0 ? scores.computerScore : 0

    return {
        playerScore:scores.playerScore,
        cumPlayerScore:this.playerScore,
        gameResult: this.gameResult(scores.playerScore, scores.computerScore)
      }
  }

  setGameRules() {
    const options = this.setGame()
    const allOutcomes = []
    const numOfRounds = 2 //set # of rounds

    //recursively create an array with all possible outcomes
    const roundChoice = (round, roundNumber) => {
      options.forEach((option) => {
        round.push(option)
        if (roundNumber === numOfRounds) {
          allOutcomes.push(round.slice())
        } else {
          roundChoice(round, roundNumber + 1)
        }
        round.pop()
      })
    }
    roundChoice([], 1)

    //map outcomes to a score
    const possibleScores = allOutcomes.map(([playerChoice, computerChoice]) => {
      if (this.gameDifficulty === 0) {
        return playerChoice === 'rock' && computerChoice === 'scissors' ? {
            playerChoice,
            computerChoice,
            playerScore: 1,
            computerScore: 0
          } :
          playerChoice === 'paper' && computerChoice === 'rock' ? {
            playerChoice,
            computerChoice,
            playerScore: 1,
            computerScore: 0
          } :
          playerChoice === 'scissors' && computerChoice === 'paper' ? {
            playerChoice,
            computerChoice,
            playerScore: 1,
            computerScore: 0
          } :
          playerChoice === 'scissors' && computerChoice === 'rock' ? {
            playerChoice,
            computerChoice,
            playerScore: 0,
            computerScore: 1
          } :
          playerChoice === 'rock' && computerChoice === 'paper' ? {
            playerChoice,
            computerChoice,
            playerScore: 0,
            computerScore: 1
          } :
          playerChoice === 'paper' && computerChoice === 'scissors' ? {
            playerChoice,
            computerChoice,
            playerScore: 0,
            computerScore: 1
          } : {
            playerChoice,
            computerChoice,
            playerScore: 0,
            computerScore: 0
          }
      } else {
        //flush out score rules for 'rock','paper','scissors', 'Lizard', 'Spock'
        return {
          playerChoice,
          computerChoice,
          playerScore: 0,
          computerScore: 0
        }
      }
    })

    return possibleScores
  }

  setGame() {
    //set the game options
    const options = this.gameDifficulty === 0 ? ['rock', 'paper', 'scissors'] : ['rock', 'paper', 'scissors', 'Lizard', 'Spock']

    return options
  }

  generateComputerChoice() {
    //produce a random number from 0 to less than array length and truncate number
    const options = this.setGame()
    this.computerChoice = options[Math.floor(Math.random() * options.length)]
  }

  gameResult(playerScore, computerScore) {
    if (playerScore > computerScore) {
      return 'YOU WIN'
    } else if (playerScore < computerScore) {
      return 'YOU LOSE'
    } else {
      return "DRAW"
    }
  }
}

export { RockPaperScissors as default}
