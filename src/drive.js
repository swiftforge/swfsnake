const drive = module.exports
const util = require('util')
const path = require('./path')

//Will output the next move (is probably called from index.js)
drive.getDir = (snake, gameState) => {
  //console.log('drive.getMove - Snake: ', util.inspect(snake))
  let direction = {}

  const width = gameState.board.width
  const height = gameState.board.height

  let availableDirs = path.getImmediatelyClearDirs(snake, width, height)
  let possibleMoves = snake.paths.filter((path) => path.meal && availableDirs.includes(path.dir))

  console.log('drive.getMove - possibleMoves: ', possibleMoves)

  return direction
}