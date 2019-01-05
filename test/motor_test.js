const assert = require('chai').assert
const gameState = require('./dummy-gameState')
const motor = require('../src/motor')


describe('motor.getMove', () => {
  it('returns a valid move object', () => {
    let nextMove = motor.getMove(gameState)
    assert.isObject(nextMove, "move is a valid object")
    assert.isString(nextMove.move, "move is correctly formatted")
  })
})