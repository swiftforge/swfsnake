const drive = module.exports
const util = require('util')
const path = require('./path')

const randomInt = (max) => {
  if(!max || max === 0) return 0
  return Math.floor(Math.random() * Math.floor(max));
}

//Will output the next move (is probably called from index.js)
drive.getDirection = (snake, gameState) => {
  try {
    //console.log('drive.getMove - Snake: ', util.inspect(snake))
    let direction = {}

    // console.log('drive.getDirection - beginning with food: ', snake.food)
    // console.log('drive.getDirection - beginning with mealSnakes: ', snake.mealSnakes)
    // console.log('drive.getDirection - beginning with obstacles: ', snake.obs)

    const width = gameState.board.width
    const height = gameState.board.height

    let availableDirs = path.getImmediatelyClearDirs(snake, width, height)

    let tailMove = snake.tail.reduce((a,b) => {
      return availableDirs.includes(a.dir) && !path.isTrap(snake.head, a.dir, snake.obs, width, height) ? a : b
    })

    if(!availableDirs.includes(tailMove.dir)) tailMove = null

    let possibleFood = snake.food && snake.food.filter((move) => {
      return availableDirs.includes(move.dir) && 
      !path.isTrap(snake.head, move.dir, snake.obs, width, height)
      })

    let possibleMealSnakes = snake.mealSnakes && snake.mealSnakes.filter((move) => {
      return availableDirs.includes(move.dir) && 
      !path.isTrap(snake.head, move.dir, snake.obs, width, height)
    })

    console.log('drive.getDirection - availableDirs: ', availableDirs)
    console.log('drive.getDirection - possibleFood: ', possibleFood)
    console.log('drive.getDirection - possibleMealSnakes: ', possibleMealSnakes)
    console.log('drive.getDirection - tailMove: ', tailMove)

    let bestFood = possibleFood && possibleFood.length > 0 && possibleFood.reduce((a,b) => {
      return a.spaces < b.spaces ? a : b
    })

    let bestMealSnake = possibleMealSnakes && possibleMealSnakes.length > 0 && possibleMealSnakes.reduce((a,b) => {
      return a.spaces < b.spaces ? a : b
    })

    if(bestFood && snake.health < (bestFood.spaces + 20)) {
      console.log('drive.getDirection - going for food: ', bestFood);
      direction.move =  bestFood.dir
    } else if(bestMealSnake && bestMealSnake.spaces < 3) {
      console.log('drive.getDirection - going for a kill: ', bestMealSnake);
      direction.move = bestMealSnake.dir
    } else if(tailMove && tailMove.dir) {
      console.log('drive.getDirection - going with tailMove: ', tailMove);
      direction.move = tailMove.dir
    } else {
      direction.move = availableDirs[randomInt(availableDirs.length)]
      console.log('drive.getDirection - going random available direction: ', direction.move);
    }

    return direction
  } catch (err) {
    console.error('drive.getDirection - error: ', err)
  }
  
}