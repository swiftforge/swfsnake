const path = module.exports

/**
 * returns an array of points with path data attached
 * returns two points if two paths are available
 * returns only one path (still in an array) if only one is available
 * if returnShorterOnly is set it will return an array with one point (the shorter one) in it
 * example path data: {dir: "up", spaces: 4}
 */
//TODO: refactor to be leaner?
path.createPath = (a,b, options) => {
  if(!options) options = {}
  let result = []
  b.spaces = (Math.abs(a.x - b.x)) + (Math.abs(a.y - b.y))
  let getShorter = options.returnShorterOnly // returns the path with less spaces
    
  if(a.x === b.x) {
    //along y axis
    if(a.y > b.y) {
      b.dir = "up"
    } else {
      b.dir = "down"
    }
    result.push(b)
  } else if (a.y === b.y) {
    //along x axis
    if(a.x > b.x) {
      b.dir = "left"
    } else {
      b.dir = "right"
    }
    result.push(b)
  } else {
    //both axis
    let bAlt = Object.assign({}, b) //We want a fresh copy for the other path
    if(a.x > b.x) {
      //left
      b.dir = "left"
      if(a.y > b.y) {
        //left up
        if(getShorter) {
          if(a.y - b.y < a.x - b.x ) {
            //shorter distance is up
            b.dir = "up"
          }
        } else {
          bAlt.dir = "up"
        }
      } else {
        //left down
        if(getShorter) {
          if(a.y - b.y < a.x - b.x ) {
            //shorter distance is down
            b.dir = "down"
          }
        } else {
          bAlt.dir = "down"
        }
      }
    } else {
      //right
      b.dir = "right"
      if(a.y > b.y) {
        //right up
        if(getShorter) {
          if(a.y - b.y < a.x - b.x ) {
            b.dir = "up"
          }
        } else {
          bAlt.dir = "up"
        }
      } else {
        //right down
        if(getShorter) {
          if(a.y - b.y < a.x - b.x ) {
            b.dir = "down"
          }
        } else {
          bAlt.dir = "down"
        }
      }
    }
    result.push(b, bAlt)
  }
    
  return result
}

/**
* returns boolean of whether any obstacles are between two points
*/
path.hasObs = (obsArry, pointA, pointB) => {

}

/**
 * returns a boolean of whether a given direction from a point will result in a trap
 * currently only evaulates if there is an obstical or wall located to either side of a given direction
 */
path.isTrap = (point, dir, obs, width, height) => {
  try{
    let spaces = getSpaces()
    //console.log('isTrap SPACES: ', spaces, ' - DIR: ', dir, ' - W: ', width, ' - H: ', height, ' - X: ', point.x, ' - Y: ', point.y);
      
    if(dir === 'up') {
      let rightColObs = obs.filter((o) => o.x === point.x + 1 && point.y > o.y && o.y >= point.y - spaces)
      //console.log('isTrap A: ', rightColObs);
      if(point.x === 0 && rightColObs.length >= spaces) return true
    
      let leftColObs = obs.filter((o) => o.x === point.x - 1 && point.y > o.y && o.y >= point.y - spaces)
      //console.log('isTrap B: ', leftColObs);
      if(point.x === width - 1 && leftColObs.length >= spaces) return true
    
      //console.log('ASSESSING BOTH COLS - DIR UP - A: ', rightColObs.length, ' B: ', leftColObs.length);
      return rightColObs.length >= spaces && leftColObs.length >= spaces
    
    } else if(dir === 'right') {
        
      let upCols = obs.filter((o) => o.y === point.y - 1 && point.x < o.x && o.x <= point.x + spaces)
      //console.log('isTrap A: ', upCols);
      if(point.y === height - 1 && upCols.length >= spaces) return true
    
      let downCols = obs.filter((o) => o.y === point.y + 1 && point.x < o.x && o.x <= point.x + spaces)
      //console.log('isTrap B: ', downCols);
      if(point.y === 0 && downCols.length >= spaces) return true
  
      //console.log('ASSESSING BOTH COLS - DIR RIGHT A: ', upCols.length, ' B: ', downCols.length);
      return upCols.length >= spaces && downCols.length >= spaces
    
    } else if(dir === 'down') {
    
      let rightColObs = obs.filter((o) => o.x === point.x + 1 && point.y < o.y && o.y <= point.y + spaces)
      //console.log('isTrap A: ', rightColObs);
      if(point.x === 0 && rightColObs.length >= spaces) return true
    
      let leftColObs = obs.filter((o) => o.x === point.x - 1 && point.y < o.y && o.y <= point.y + spaces)
      //console.log('isTrap B: ', leftColObs);
      if(point.x === width - 1 && leftColObs.length >= spaces) return true
  
      //console.log('ASSESSING BOTH COLS - DIR DOWN - A: ', rightColObs.length, ' B: ', leftColObs.length);
      return rightColObs.length >= spaces && leftColObs.length >= spaces
    
    } else if(dir === 'left'){
    
      let upCols = obs.filter((o) => o.y === point.y - 1 && point.x > o.x && o.x >= point.x - spaces)
      //console.log('isTrap A: ', upCols);
      if(point.y === height - 1 && upCols.length >= spaces) return true
    
      let downCols = obs.filter((o) => o.y === point.y + 1 && point.x > o.x && o.x >= point.x - spaces)
      //console.log('isTrap B: ', downCols);
      if(point.y === 0 && downCols.length >= spaces) return true
  
      //console.log('ASSESSING BOTH COLS - DIR LEFT A: ', upCols.length, ' B: ', downCols.length);
      return upCols.length >= spaces && downCols.length >= spaces
    
    }
      
    function getSpaces() {
      if(dir === 'up') {
        let pathObs = obs.filter((o) => o.x === point.x && o.y < point.y)
        //console.log('SPACES: ', pathObs.length);
        if(pathObs.length > 0) {
          return point.y - pathObs[0].y
        } else {
          return point.y
        }
      } else if (dir === 'right') {
        let pathObs = obs.filter((o) => o.y === point.y && o.x > point.x)
        //console.log('SPACES: ', pathObs.length);
        if(pathObs.length > 0) {
          return pathObs[0].x - point.x
        } else {
          return width - point.x
        }
      } else if (dir === 'down') {
        let pathObs = obs.filter((o) => o.x === point.x && o.y > point.y)
        //console.log('SPACES: ', pathObs.length);
        if(pathObs.length > 0) {
          return pathObs[0].y - point.y
        } else {
          return height - point.y
        }
      } else if(dir === 'left') {
        let pathObs = obs.filter((o) => o.y === point.y && o.x < point.x)
        //console.log('SPACES: ', pathObs.length);
        if(pathObs.length > 0) {
          return point.x - pathObs[0].x
        } else {
          return point.x
        }
      }
    }
  } catch (err) {
    console.error('path.isTrap - error: ', err);
  }
}

/** 
 * returns a boolean of whether a direction is an immediate collision with obstacle
 */
path.isImmediateCollision = (dir, obs) => {
  return obs.filter((o) => {
    return o.spaces === 1 && o.dir === dir
  }).length > 0
}

/**
 * returns a boolean of whether a direction is an immediately collision with a wall
 */
path.isImmediateWallCollision = (point, dir, width, height) => {
  try{
    return dir === "up" && point.y === 0 ||
      dir === "right" && point.x === width - 1 ||
      dir === "down" && point.y === height - 1 ||
      dir === "left" && point.x === 0
  } catch (err) {
    console.error('moves isWallCollision - error: ', err);
  }
}

/**
* returns an array of directions that will not be immediate collisions (within one space)
*/
path.getImmediatelyClearDirs = (snake, width, height) => {
  const clearDirs = ["up","right","down","left"]

  return clearDirs.filter((dir) => {
    return dir !== snake.neck.dir && 
    !path.isImmediateCollision(dir,snake.obs) && 
    !path.isImmediateWallCollision(snake.head,dir,width,height)
  })
}