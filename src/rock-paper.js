class RockPaperScissors {
  constructor(playerChoice) {
    this.playerChoice = playerChoice
    this.computerChoice = ''
    this.playerScore = 0
    this.computerScore = 0
  }

 keepScore(playerChoice, computerChoice){
   // take choices as a parameter and assign values/scores
   //to this.playerScore and this.computerScore
   //use best 2 out of 3 setting
   //once all turns are exhusted stop and return tally

 }

 statusMessage() {
   //set status of game as completed if tally reaches max
 }

  generateComputerChoice(){
    //write an algorithm for the auto generation of choices
    return 'rock'
  }

  get gameResult() {
    //invoked once tally reaches max
    if(this.computerScore > this.playerScore){
      return 'You win!'
    }else if(this.computerScore < this.playerScore){
      return 'You lose!'
    }else{
      return "It's a draw!"
    }
  }


}

export {RockPaperScissors}
