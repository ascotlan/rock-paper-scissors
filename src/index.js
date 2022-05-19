import RockPaperScissors from './rock-paper'

const game1 = new RockPaperScissors('rock',0)
game1.generateComputerChoice()
console.log(game1.keepScore())
const game2 = new RockPaperScissors('paper',0)
game1.generateComputerChoice()
console.log(game1.keepScore())
const game3 = new RockPaperScissors('scissors',0)
game1.generateComputerChoice()
console.log(game1.keepScore())
