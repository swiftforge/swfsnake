const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const app = express()
const {
  fallbackHandler,
  notFoundHandler,
  genericErrorHandler,
  poweredByHandler
} = require('./handlers.js')

const boardState = require('./swf_modules/boardState')
const Snake = require('./src/Snake')
const drive = require('./src/drive')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

app.post('/start', (req, res) => {
  console.log('GAME START')
  let gameState = boardState.visualize(req.body,{
    addBoard:true,
    addPoints: true
  })
  const snake = new Snake(gameState)
  const swfSnake = snake.hatchling
  console.log('Our snake: ', swfSnake)

  return res.json(swfSnake)
})

app.post('/move', (req, res) => {
  console.log('GAME MOVE')
  let gameState = boardState.visualize(req.body,{
    addBoard:true,
    addPoints: true
  })
  const snake = new Snake(gameState)

  const direction = drive.getDirection(snake, gameState)

  return res.json(direction)
})

app.post('/end', (req, res) => {
  console.log('GAME END')
  // NOTE: Any cleanup when a game is complete.
  return res.json({})
})

app.post('/ping', (req, res) => {
  console.log('PING')
  // Used for checking if this snake is still alive.
  return res.json({});
})

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
