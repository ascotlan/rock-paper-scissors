import RockPaperScissors from './rock-paper'

const game1 = new RockPaperScissors('rock',0)
game1.generateComputerChoice()
console.log(game1.keepScore())

const game2 = new RockPaperScissors('paper',1)
game2.generateComputerChoice()
console.log(game2.keepScore())

const game3 = new RockPaperScissors('scissors',0)
game3.generateComputerChoice()
console.log(game3.keepScore())

const game4 = new RockPaperScissors('lizard',1)
game4.generateComputerChoice()
console.log(game4.keepScore())

const game5 = new RockPaperScissors('paper',0)
game5.generateComputerChoice()
console.log(game5.keepScore())
