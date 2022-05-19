import RockPaperScissors from './rock-paper'

const game1 = new RockPaperScissors('rock',0)
game1.generateComputerChoice()
console.log(game1.keepScore())
game1.generateComputerChoice()
console.log(game1.keepScore())
game1.generateComputerChoice()
console.log(game1.keepScore())
