const motor = module.exports
const util = require('util')

//Will output the next move (should be called from index.js)
motor.getMove = (gameState) => {
  console.log('motor.getMove - gameState: ', util.inspect(gameState))
  return {
    move: "right"
  }
}