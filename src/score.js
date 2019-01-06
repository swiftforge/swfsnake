const score = module.exports
const weights = require('./weights')
const reverseInt = (min, max, int) => {
  return Math.round((max + min) - int);
}
const longest = (width, height) => {
  if(width > height) return width
  return height
}

score.create = (snake,nearestKill, width, height) => {
  return [
    {
      type: "hunger",
      score: score.calcHunger(snake.health, width, height)
    },
    {
      type: "killer",
      score: score.calcKiller(nearestKill, width, height)
    },
    {
      type: "tail",
      score: score.calcTailChase()
    },
    {
      type: "explore",
      score: score.calcExplore()
    }
  ]
}

score.calcHunger = (health, width, height) => {
  return (reverseInt(1, longest(width, height), health)) + weights.hungry
}

score.calcKiller = (nearestKill, width, height) => {
  nearestKill = nearestKill && nearestKill.spaces ? nearestKill : {spaces:longest(width, height)}

  if(nearestKill.spaces === 2) return weights.killer * longest(width, height) // we have a chance at a kill

  return (reverseInt(1, longest(width, height), nearestKill.spaces)) + weights.killer
}

score.calcTailChase = () => {
  return weights.tailChaser
}

score.calcExplore = () => {
  return weights.explorer
}