class RockPaperScissors {
  constructor(playerChoice) {
    this.playerChoice = playerChoice
    this.computerChoice = ''
    this.playerScore = 0
    this.computerScore = 0
    this.gameDifficulty = 0
  }

 keepScore(){
   console.log(this.playerChoice)
   console.log(this.computerChoice)
   // take choices as a parameter and assign values/scores
   //to this.playerScore and this.computerScore
   //use best 2 out of 3 setting
   //once all turns are exhusted stop and return tally

 }

 set gameLevel(level){
   this.gameDifficulty = level
 }

 statusMessage() {
   //set status message of winner based on current score
   //set status of game as completed if tally reaches max
 }

  generateComputerChoice(){
    const options = this.gameDifficulty === 0 ?
      ['rock','paper','scissors'] :
      ['rock','paper','scissors', 'Lizard', 'Spock']
    //produce a random number from 0 to less than array length and truncate number
    this.computerChoice = options[Math.floor(Math.random()*options.length)]

    this.keepScore()
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

export {RockPaperScissors as default}
