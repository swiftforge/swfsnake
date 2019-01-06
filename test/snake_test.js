const assert = require('chai').assert
const dummyStates = require('./dummyStates')
const _ = require('lodash')

const Snake = require('../src/Snake')

describe('snake.hatchling', () => {
  const snake = new Snake(dummyStates.game.simple)
  let swfsnake = snake.hatchling
  it('returns a valid snake', () => {
    assert.isObject(swfsnake, "is not a valid object")
    assert.isString(swfsnake.color, "is malformed")
  })
})

describe('snake.head', () => {
  const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
  it('returns a point object of our snake head', () => {
    assert.deepEqual(snake.head, dummyStates.Snake.head, "is not returning head object")
  })
})

describe('snake.neck', () => {
  const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
  it('returns a point object of our snake neck', () => {
    assert.deepEqual(snake.neck, dummyStates.Snake.neck, "is not returning neck object")
  })
})

describe('snake.paths', () => {
  const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
  it('returns an array of all paths created from points array', () => {
    assert.isArray(snake.paths, "is not an array")
    assert.lengthOf(snake.paths, 11, "does not have correct number of items")
    assert.isTrue(_.every(snake.obs, (point) => {
      return _.has(point,'dir')
    }), "some paths do not have a dir property")
    assert.isTrue(_.every(snake.obs, (point) => {
      return _.has(point,'spaces')
    }), "some paths do not have a spaces property")
  })
})

describe('snake.obs', () => {
  const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
  it('returns an array of all obstical points not including walls', () => {
    assert.isArray(snake.obs, "is not an array")
    assert.lengthOf(snake.obs, 5, "does not have correct number of items")
    assert.isTrue(_.every(snake.obs, {'isCollision': true}), "some paths are not collisions")
  })
})

describe('snake.food', () => {
  const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
  it('returns an array of all food points', () => {
    assert.isArray(snake.food, "is not an array")
    assert.lengthOf(snake.food, 3, "does not have correct number of items")
    assert.isTrue(_.every(snake.food, {'type': 'food'}), "some paths are not food")
  })
})

describe('snake.mealSnakes', () => {
  const snake = new Snake(dummyStates.game.moveOne_snakesTwo)
  it('returns an array of all meal snake head paths', () => {
    assert.isArray(snake.mealSnakes, "is not an array")
    assert.lengthOf(snake.mealSnakes, 2, "does not have correct number of items")
    assert.isTrue(_.every(snake.mealSnakes, {'type': 'snake', 'meal': true}), "some paths are not meal snakes")
  })
})