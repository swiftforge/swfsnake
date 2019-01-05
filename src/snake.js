const snake = module.exports

//returns our snake
snake.swfIfFy = (gameState) => {
  let name = gameState.you.name
  let color = '#029cfc' //blue

  if(name === "swf") color = '#029cfc' //blue
  if(name === "jon") color = '#fd8400' //jon
  if(name === "kiyota") color = '#00c08f' //kiyota

  return {color}
}