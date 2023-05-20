let canvasX = 1200;
let canvasY = 650;

let mapData = [];
let pixelSize = 5
let mapWidth = Math.floor(canvasX / pixelSize);
let mapHeight = Math.floor(canvasY / pixelSize);
let transitionRules;

let border = 2;

let pixelsClicked = [];

function mouseClicked() {
  let mapY = Math.floor(mouseY / pixelSize);
  let mapX = Math.floor(mouseX / pixelSize)

  pixelsClicked.push([mapX, mapY]);
}

function mouseDragged() {
  let mapY = Math.floor(mouseY / pixelSize);
  let mapX = Math.floor(mouseX / pixelSize)
  pixelsClicked.push([mapX, mapY]);
}


function setup() {
  createCanvas(canvasX, canvasY);

  document.oncontextmenu = () => false;

  background(200);
  mapData = initializeMapData(mapHeight, mapWidth);

  setInterval(loadNextGeneration, 1000/24);
}

function loadNextGeneration() {
  background(0);
  let mapCopy = JSON.parse(JSON.stringify(mapData));


  //Iterate over all points in map
  //border to reduce ignoring if checks and looks nice
  for (let y = border; y < mapHeight - border; y++) {
    for (let x = border; x < mapWidth - border; x++) {

      //iterate over neighbors
      let aliveNeighbors = 0;
      for (let xI = -1; xI <= 1; xI++) {
        for (let yI = -1; yI <= 1; yI++) {
          //center pixel should be ignored
          if (xI !== 0 || yI !== 0) {
            aliveNeighbors += mapData[y + yI][x + xI];
          }
        }
      }

      //If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors
      //-> it dies if it has under 2 or over 3 alive neighbors
      if (mapData[y][x] === 1) {
        if (aliveNeighbors < 2 || 3 < aliveNeighbors) {
          mapCopy[y][x] = 0;
        }
        else {
          mapCopy[y][x] = 1;
          square(x * pixelSize, y * pixelSize, pixelSize);
          fill(255, 255, 255)
        }
      }//If the cell is dead, then it springs to life only in the case that it has 3 live neighbors
      else {
        if (aliveNeighbors === 3) {
          mapCopy[y][x] = 1;
          square(x * pixelSize, y * pixelSize, pixelSize);
          fill(255, 255, 255)
        }
        else {
          mapCopy[y][x] = 0;
        }
      }

    }
  }

  mapData = mapCopy;

  //load clicked pixels into calculation
  for (let index = 0; index < pixelsClicked.length; index++) {
    let position = pixelsClicked.pop();
    let newState = !(mapData[position[1]][position[0]] === 1);

    //console.log(newState + " at[" + position[0] + "|" + position[1] + "]");
    mapData[position[1]][position[0]] = newState ? 1 : 0;

    square(position[0] * pixelSize, position[1] * pixelSize, pixelSize);

    let color = newState ? 255 : 0;
    fill(color, color, color);
  }
}

function initializeMapData(rows, cols) {
  let data = [];
  for (let y = 0; y < rows; y++) {
    data[y] = [];
    for (let x = 0; x < cols; x++) {
      let deadOrAlive = Math.random() > 0.5;
      data[y][x] = deadOrAlive;

      if (deadOrAlive) {
        square(x * pixelSize, y * pixelSize, pixelSize);
        fill(255, 255, 255);
      }
    }
  }
  return data;
}