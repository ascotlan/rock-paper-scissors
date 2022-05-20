class RockPaperScissors {
  constructor(playerChoice, difficulty) {
    this.playerChoice = playerChoice
    this.computerChoice = ''
    this.gameDifficulty = difficulty ///set as 0 or  1
    this.playerScore = this.loadScore().playerScore //load for each new game
  }

  loadScore(){
    const scoreJSON = localStorage.getItem('scores')

    try {
      return scoreJSON ? JSON.parse(scoreJSON) : {playerScore: 0}
    }catch(e){
      return {playerScore: 0}
    }
  }

  saveScore(){
    localStorage.setItem('scores',JSON.stringify({playerScore: this.playerScore}))
  }

  keepScore() {
    let result = ''

    if(this.playerChoice !== this.computerChoice){
      if(this.setGameRules()[this.playerChoice].l.includes(this.computerChoice)){
        if(this.playerScore > 0) this.playerScore--
        result = 'YOU LOSE'
      }else{
        this.playerScore++
        result = 'YOU WIN'
      }
    }else{
       result = 'DRAW'
    }

    this.saveScore()

    return {
        playerChoice:this.playerChoice, //no need to return this item..just for testing
        computerChoice:this.computerChoice,
        cumPlayerScore:this.playerScore,
        gameResult: result
      }
  }

  setGameRules() {

    const logic = {
      rock: {w:'scissors, lizard', l:'paper, spock' },
      paper: {w:'rock, spock', l:'scissors, lizard' },
      scissors: {w:'paper, lizard', l:'rock, spock' },
      lizard: {w:'spock, paper', l:'rock, scissors' },
      spock: {w:'scissors, rock', l:'lizard, paper' }
    }

    return logic
  }

  setGame() {
    //set the game options
    const options = this.gameDifficulty === 0 ? ['rock', 'paper', 'scissors'] : ['rock', 'paper', 'scissors', 'lizard', 'spock']

    return options
  }

  generateComputerChoice() {
    //produce a random number from 0 to less than array length and truncate number
    this.computerChoice = this.setGame()[Math.floor(Math.random() * this.setGame().length)]
  }
}

export { RockPaperScissors as default}
