import RockPaperScissors from './rock-paper'

const game1 = new RockPaperScissors('rock')

console.log(game1)
game1.gameLevel = 0
game1.generateComputerChoice()
console.log(game1)
