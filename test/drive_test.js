const assert = require('chai').assert
const dummyStates = require('./dummyStates')
const drive = require('../src/drive')
const Snake = require('../src/Snake')

describe('drive.getDirection', () => {
  it('returns a valid move object', () => {
    const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
    let nextMove = drive.getDirection(snake, dummyStates.game.moveOne_snakesTwo)
    assert.isObject(nextMove, "not a valid object")
    assert.isString(nextMove.move, "does not contain a move property")
  })
})