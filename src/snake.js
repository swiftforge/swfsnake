
//our snake model
const path = require('./path')

class Snake {
  constructor(gameState) {
    const self = this

    //returns a snake object for the engine
    self.hatchling = (function() {
      let name = gameState.you.name
      let color = '#029cfc' //blue

      if(name === "swf") color = '#029cfc' //blue
      if(name === "jon") color = '#fd8400' //jon
      if(name === "kiyota") color = '#00c08f' //kiyota

      return {color}
    })()

    //attaches the head point of our snake
    self.head = gameState.parsedBoardPoints.reduce((a,b) => {
      return a.type === 'you' && a.part === 'head' ? a : b
    })

    //will be array of paths to points on the board
    self.paths = []

    //creates paths for paths array
    gameState.parsedBoardPoints
    .filter((point) => { //First we weed out the head point of our snake
      return point.type === 'you' && point.part === 'head' ? false : true
    })
    .forEach((point) => {
      path.createPath(self.head,point).forEach((pointPath) => self.paths.push(pointPath))
    })

    //attaches the neck path of our snake
    self.neck = self.paths.reduce((a, b) => {
      return a.type === 'you' && a.part === 'neck' ? a : b
    })

    //attaches all obstacle paths
    self.obs = this.paths.filter((point) => point.isCollision)

    //attaches all food paths
    self.food = this.paths.filter((point) => point.type === 'food')

    //attaches all meal snake head paths
    self.mealSnakes = this.paths.filter((point) => point.type === 'snake' && point.meal)
  }
  
  //calculate immediately available moves based on collisions and traps
  getOpenMoves(){
    
  }

  //returns the open move to closest food
  closestFood() {

  }

  //return the open move to the closest meal snake
  closestMealSnake() {

  }

  //returns the open move to most space on the board
  openSpace() {
    
  }
}

module.exports = Snake

/*
module.exports = function (gameState) {
  const self = this

  //will be an array of all paths to potential points we might want to move to
  self.paths = []

  //returns a snake object for the engine
  this.egg = () => {
    let name = this.gameState.you.name
    let color = '#029cfc' //blue

    if(name === "swf") color = '#029cfc' //blue
    if(name === "jon") color = '#fd8400' //jon
    if(name === "kiyota") color = '#00c08f' //kiyota

    return {color}
  }

  //attaches the head point of our snake
  this.head = gameState.parsedBoardPoints.reduce((a,b) => {
    if(a.type === 'you' && a.part === 'head') {
      return a
    } else {
      return b
    }
  })

  //creates paths array
  gameState.parsedBoardPoints
  .filter((point) => { //First we weed out the head point of our snake
    if(point.type === 'you' && point.part === 'head') return false
    return true
  })
  .forEach((point) => {
    path.createPath(self.head,point).forEach((pointPath) => self.paths.push(pointPath))
  })

  //attaches all obstacle paths
  this.obs = this.paths.filter((point) => point.isCollision)

  //attaches all food paths
  this.food = this.paths.filter((point) => point.type === 'food')

  //attaches all meal snake head paths
  this.mealSnakes = this.paths.filter((point) => point.type === 'snake' && point.meal)

  //calculate immediately available moves based on collisions and traps
  this.getOpenMoves = () => {
    
  }

  //returns the open move to closest food
  this.closestFood = () => {

  }

  //return the open move to the closest meal snake
  this.closestMealSnake = () => {

  }

  //returns the open move to most space on the board
  this.openSpace = () => {
    
  }
}
*/