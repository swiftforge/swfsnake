
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

    self.health = gameState.you.health

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

    //attaches the tail path of our snake
    self.tail = []
    self.paths.forEach((point) => {
      if(point.type === 'you' && point.part === 'tail') self.tail.push(point)
    })

    //attaches all obstacle paths
    self.obs = this.paths.filter((point) => point.isCollision)

    //attaches all food paths
    self.food = this.paths.filter((point) => point.type === 'food')

    //attaches all meal snake head paths
    self.mealSnakes = this.paths.filter((point) => point.type === 'snake' && point.meal)
  }
  
}

module.exports = Snake