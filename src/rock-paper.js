class RockPaperScissors {
  constructor(playerChoice, playerScore) {
    this.playerChoice = playerChoice
    this.computerChoice = ''
    this.playerScore = playerScore //load for each new game
  }

  saveScore(){
    localStorage.setItem('scores',JSON.stringify({playerScore: this.playerScore}))
  }

  keepScore() {
    let result = ''
    if(this.computerChoice.length > 0){
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
          gameResult: result
        }
    }
  }

  setGameRules() {

    const logic = {
      rock: {w:'scissors, lizard', l:'paper, spock',class:'rock' },
      paper: {w:'rock, spock', l:'scissors, lizard',class:'paper' },
      scissors: {w:'paper, lizard', l:'rock, spock',class:'scissors'  },
      lizard: {w:'spock, paper', l:'rock, scissors',class:'lizard' },
      spock: {w:'scissors, rock', l:'lizard, paper',class:'spock'  }
    }

    return logic
  }

  generateComputerChoice() {
    //set the game options
    const options = ['rock', 'paper', 'scissors', 'lizard', 'spock']
    //produce a random number from 0 to less than array length and truncate number
    this.computerChoice = options[Math.floor(Math.random() * options.length)]

    return this.computerChoice
  }
}

export { RockPaperScissors as default}
