let canvasX = 2000;
let canvasY = 2000;

let FieldWidth = 100;
let FieldHeight = 100;
let FieldDepth = 100;

let mapData = [];
let pixelSize = 5
let mapWidth = Math.floor(FieldWidth / pixelSize);
let mapHeight = Math.floor(FieldHeight / pixelSize);
let mapDepth = Math.floor(FieldDepth / pixelSize);
let transitionRules;

let border = 2;
let offset = 20;

function setup() {
  createCanvas(canvasX, canvasY, WEBGL);
  createEasyCam();

  document.oncontextmenu = () => false;

  background(240);
  mapData = initializeMapData(mapHeight, mapWidth, mapDepth);


}

let drawInterval = 10;
let numbah = 0;
function draw() {
  if (numbah >= drawInterval) {
    background(255);
    lights();
    loadNextGeneration();
    numbah = 0;
  }
  else {
    numbah++;
  }
}

function loadNextGeneration() {
  background(255);
  let mapCopy = copyMapData(mapData);


  //Iterate over all points in map
  //border to reduce ignoring if checks and looks nice
  for (let z = border; z < mapDepth - border; z++) {
    for (let y = border; y < mapHeight - border; y++) {
      for (let x = border; x < mapWidth - border; x++) {

        //iterate over neighbors
        let aliveNeighbors = 0;
        for (let zI = -1; zI <= 1; zI++) {
          for (let xI = -1; xI <= 1; xI++) {
            for (let yI = -1; yI <= 1; yI++) {
              //center pixel should be ignored
              if (xI !== 0 || yI !== 0 || zI !== 0) {
                aliveNeighbors += mapData[y + yI][x + xI][z + zI];
              }
            }
          }
        }

        //If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors
        //-> it dies if it has under 2 or over 3 alive neighbors
        if (mapData[y][x] === 1) {
          if (aliveNeighbors < 2 || 3 < aliveNeighbors) {
            mapCopy[y][x][z] = 0;
          }
          else {
            mapCopy[y][x][z] = 1;
            push();
            fill(255, 0, 0, 127); // RGB for red and half-transparent
            translate(x * pixelSize + x * offset, y * pixelSize + y * offset, z * pixelSize + z * offset);
            sphere(pixelSize);
            pop();
          }
        }//If the cell is dead, then it springs to life only in the case that it has 3 live neighbors
        else {
          if (aliveNeighbors === 3) {
            mapCopy[y][x][z] = 1;
            push();
            fill(255, 0, 0, 127); // RGB for red and half-transparent
            translate(x * pixelSize + x * offset, y * pixelSize + y * offset, z * pixelSize + z * offset);
            sphere(pixelSize);
            pop();
          }
          else {
            mapCopy[y][x][z] = 0;
          }
        }
      }
    }
  }
  mapData = mapCopy;
}

function initializeMapData(rows, cols, depth) {
  let data = [];
  for (let y = 0; y < rows; y++) {
    data[y] = [];
    for (let x = 0; x < cols; x++) {
      data[y][x] = [];
      for (let z = 0; z < depth; z++) {
        let deadOrAlive = Math.random() > 0.8;
        data[y][x][z] = deadOrAlive;

        if (deadOrAlive) {
          push();
          fill(255, 0, 0, 127); // RGB for red and half-transparent
          translate(x * pixelSize + x * offset, y * pixelSize + y * offset, z * pixelSize + z * offset);
          sphere(pixelSize);
          pop();
        }
      }
    }
  }
  return data;
}

function copyMapData(original) {
  let copy = [];
  for (let y = 0; y < original.length; y++) {
    copy[y] = [];
    for (let x = 0; x < original[y].length; x++) {
      copy[y][x] = [];
      for (let z = 0; z < original[y][x].length; z++) {
        copy[y][x][z] = original[y][x][z];
      }
    }
  }
  return copy;
}

