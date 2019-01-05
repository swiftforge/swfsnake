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
const snake = require('./src/snake')
const motor = require('./src/motor')

// For deployment to Heroku, the port needs to be set using ENV, so
// we check for the port number in process.env
app.set('port', (process.env.PORT || 9001))

app.enable('verbose errors')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(poweredByHandler)

app.post('/start', (request, response) => {
  // NOTE: Do something here to start the game

  // Response data
  let gameState = req.body
  const swfSnake = snake.swfIfFy(gameState)

  return response.json(swfSnake)
})

app.post('/move', (request, response) => {
  // NOTE: Do something here to generate your move

  // Response data
  let gameState = boardState.visualize(req.body,{
    
  })
  const move = motor.getMove(gameState)

  return response.json(move)
})

app.post('/end', (request, response) => {
  // NOTE: Any cleanup when a game is complete.
  return response.json({})
})

app.post('/ping', (request, response) => {
  // Used for checking if this snake is still alive.
  return response.json({});
})

app.use('*', fallbackHandler)
app.use(notFoundHandler)
app.use(genericErrorHandler)

app.listen(app.get('port'), () => {
  console.log('Server listening on port %s', app.get('port'))
})
