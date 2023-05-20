let canvasX = 1000;
let canvasY = 1000;

let mapData = [];
let pixelSize = 5
let mapWidth = Math.floor(canvasX / pixelSize);
let mapHeight = Math.floor(canvasY / pixelSize);
let transitionRules;


function setup() {
  createCanvas(canvasX, canvasY);

  document.oncontextmenu = () => false;
  setRandomTransitionRuleset();

  // Add a button and assign the reloadMap function to be called when the button is pressed
  button = createButton('Reload Map');
  button.position(canvasX + 10, 19);
  button.mousePressed(reloadMap);

  // Add a button and assign the reloadMap function to be called when the button is pressed
  button = createButton('New Transition Ruleset');
  button.position(canvasX + 10, 40);
  button.mousePressed(setRandomTransitionRuleset);

  reloadMap();
}

function setRandomTransitionRuleset(){
  let num = Math.floor(Math.random() * 256);
  transitionRules = createRules(num);
  console.log(num + " | " + transitionRules);
}

function reloadMap() {
  background(200);
  mapData = initializeMapData(mapHeight, mapWidth);
  mapData[0][Math.floor(mapWidth / 2)] = 1;

  square(canvasX / 2, 0, pixelSize);
  fill(0, 0, 0);

  fillRowRandom(0);

  for (let y = 0; y < mapHeight - 1; y++) {
    checkLine(y);
  }
}

let midX = canvasX / 2;
function checkLine(y) {
  let mapCopy = mapData;
  let reachedEndOfLine = false;

  //iterate over line in x axis
  for (let x = 0; x < mapWidth; x++) {
    let charSegment = "";
    //loads next three numbers into string (as long as within bounds)
    for (let i = 0; i < 3; i++) {
      if (x + i < mapWidth) {
        charSegment += mapCopy[y][x + i];
      }
      else {
        reachedEndOfLine = true;
        //console.log("Reached end of line");
        break;
      }
    }

    if (reachedEndOfLine) { break; }

    // Convert the binary number to decimal to get the index into the rule
    let ruleIndex = parseInt(charSegment, 2);

    let result = Boolean(transitionRules[ruleIndex]) ? 1 : 0;
    //console.log("Result:" + result + " at index " + ruleIndex);
    mapCopy[y + 1][x + 1] = result;
    //console.log("Charseg:" + charSegment + " with result " + result);

    let randomPixel = Math.random() > 0.8;

    if (result || randomPixel) {
      //console.log("Result:" + result + " at index " + ruleIndex);
      //console.log("x: " + (x * pixelSize) + " y: " + ((y + 1) * pixelSize));
      square(x * pixelSize, (y + 1) * pixelSize, pixelSize);
      fill(0, 0, 0);
    } /*else {

      square(x * pixelSize, (y + 1) * pixelSize, pixelSize / 3);
      fill(255, 255, 255);
    }*/

    mapData = mapCopy;
  }
  //check each pixel if it fits to a rule --> create rules array

  //color in next piece if it does
  //->set square and fill
  //->set information
}

function initializeMapData(rows, cols) {
  let mapData = [];
  for (let i = 0; i < rows; i++) {
    mapData[i] = [];
    for (let j = 0; j < cols; j++) {
      mapData[i][j] = 0;
    }
  }
  return mapData;
}

//fills a row with random 1 and zeroes
function fillRowRandom(row) {
  for (let x = 0; x < mapWidth; x++) {
    let result = Math.random() > 0.5 ? 1 : 0;
    mapData[row][x] = result;
    if (result) { square(x * pixelSize, row * pixelSize, pixelSize); }
  }
  return mapData;
}


function createRules(number) {
  let binary = toBinary(number);
  let binaryChars = [...binary]; //11010100

  let binaryNums = binaryChars.map(Number).reverse();
  return binaryNums;
}

function toBinary(num) {
  if (num >= 0 && num <= 255) {
    let bin = Number(num).toString(2);
    while (bin.length < 8) {
      bin = '0' + bin;
    }
    return bin;
  } else {
    return "Invalid input, please enter a number between 0 and 255.";
  }
}
