const assert = require('chai').assert
const gameState = require('./dummy-gameState')
const snake = require('../src/snake')

describe('snake.swfIfFy', () => {
  it('returns a valid snake', () => {
    let swfsnake = snake.swfIfFy(gameState)
    assert.isObject(swfsnake, "snake is a valid object")
    assert.isString(swfsnake.color, "snake is correctly formatted")
  })
})