let radius = 100;
let posX = 200;
let posY = 200;
let LOD = 10; //level of detail, scales from 1 as base
let noiseIntensity = 1;
let pointsOnCircleEdge = 360;
let radiusIncreaseModifier = 1.003
let canvasX = 1000;
let canvasY = 1000;
let addColor;
let palette, p5ColorPalette;

// Sliders for interactive astroid
let xSlider, ySlider, widthSlider, extrusionsSlider, extraCirclesSlider, detailSlider, zoomMagnitudeSlider;
let xLabel, yLabel, widthLabel, extrusionsLabel, extraCirclesLabel, detailLabel, zoomMagnitudeLabel;

function setup() {
  createCanvas(canvasX, canvasY);
  background(200);
  let c = color(0, 0, 0);
  addColor = color(10, 2, 10);
  palette = generatePalette(20, "tetradic");
  p5ColorPalette = paletteToP5Colors(palette);
  console.log(p5ColorPalette);

  // Creating sliders and labels
  xLabel = createDiv('X: ');
  xSlider = createSlider(0, canvasX, canvasX / 2);

  yLabel = createDiv('Y: ');
  ySlider = createSlider(0, canvasY, canvasY / 2);

  widthLabel = createDiv('Width: ');
  widthSlider = createSlider(1, 100, 60);

  extrusionsLabel = createDiv('Extrusions: ');
  extrusionsSlider = createSlider(1, 200, 10.45);

  extraCirclesLabel = createDiv('Extra Circles: ');
  extraCirclesSlider = createSlider(0, 40, 10, 1);

  detailLabel = createDiv('Detail: ');
  detailSlider = createSlider(0.001, 0.1, 0.001, 0.001);

  zoomMagnitudeLabel = createDiv('Zoom Magnitude: ');
  zoomMagnitudeSlider = createSlider(0.1, 10, 1, 0.1);

  // Add a 'changed' event listener for each slider
  xSlider.changed(sliderChanged);
  ySlider.changed(sliderChanged);
  widthSlider.changed(sliderChanged);
  extrusionsSlider.changed(sliderChanged);
  extraCirclesSlider.changed(sliderChanged);
  detailSlider.changed(sliderChanged);
  zoomMagnitudeSlider.changed(sliderChanged);

  /*
    spiral(200, 200, 10, c, 200);
    tube(190, 180, 30, 4, c, 0.5);
    tube(190, 180, 30, 4, c, 0.5, [-1, -1]);
    tube(190, 180, 30, 4, c, 0.5, [1, -1]);
  */
  //cardioid(100, 100, 20);
  //drawUp();
  //spiralNoise(250,250,100, c, 10000,1);
  //singleSpiral(150,150, 90);
  //multiSpiral(50,50,50);
  //drawFunkyPyramiV1(100,100,100,60,45,10);
  //drawLine(100,100,200,200); //FUCK YEAH
  //bezier2ndDeg(25, 25, 20, 20, 50, 50, 200, 200);
  //astroid(300,300,50,4, c);

  //drawIncreasingAstroidBinarySymmetry(500, 500, 10, addColor);

  /*
  //draws a nice collection of thingamabobs onto the canvas with mucho randomness
  let random;
  let weight = Math.random();
  for (let index = 0; index < 20; index++) {
    random = Math.random();
    if (random > 1 - weight) {
      drawRandomAstroid(
        canvasX,
        canvasY,
        100,
        40,
        p5ColorPalette[Math.floor(Math.random() * p5ColorPalette.length)], //color
        true
      );

    }
    else if (random > 1 - weight - Math.random()) {
      astroidDivideExtrusion(
        Math.random() * canvasX, //x
        Math.random() * canvasY, //y
        Math.random() * 300, //width
        Math.random() * 50, //extrusions --> if this has a decimal position extracircle iterations rotate slightly to create nice effect
        p5ColorPalette[Math.floor(Math.random() * p5ColorPalette.length)], //color
        Math.random() * 50, //extracircles
        0.001); //detail
    }
    else {
      drawIncreasingAstroidBinarySymmetry(
        Math.random() * canvasX, //random position on canvas x
        Math.random() * canvasY, //random position on canvasy
        Math.random() * 3 + 1, //amount of thingamabobs
        p5ColorPalette[Math.floor(Math.random() * p5ColorPalette.length)], //color
        Math.random() * 10 //random start extrusions number
      );
    }
*/
  //attempt at hand crafted scene
  astroidDivideExtrusion(
    canvasX / 2, //x
    canvasY / 2, //y
    300, //width
    10, //extrusions --> if this has a decimal position funny stuff happens
    addColor, //color
    30, //extracircles
    0.001); //detail

  astroidDivideExtrusion(
    canvasX / 2, //x
    canvasY / 2, //y
    400, //width
    10.123456789, //extrusions --> if this has a decimal position funny stuff happens
    addColor, //color
    30, //extracircles
    0.01); //detail


  astroidDivideExtrusion(
    canvasX / 2, //x
    canvasY / 2, //y
    600, //width
    20.123456789, //extrusions --> if this has a decimal position funny stuff happens
    addColor, //color
    20, //extracircles
    0.1); //detail

  astroid(
    canvasX / 2, //x
    canvasY / 2, //y
    400, //width
    5.123456789, //extrusions --> if this has a decimal position funny stuff happens
    addColor, //color
    20, //extracircles
    0.01); //detail

    //mid increasing circles
  drawIncreasingAstroidBinarySymmetry(
    canvasX / 2, //mid position on canvas x
    canvasY / 2, //mid position on canvasy
    5, //amount of figures
    p5ColorPalette[Math.floor(Math.random() * p5ColorPalette.length)], //color
    3 //start extrusions number
  );

  //top left
  drawIncreasingAstroidBinarySymmetry(
    (canvasX / 2), //mid position on canvas x
    (canvasY / 4), //mid position on canvasy
    2, //amount of figures
    p5ColorPalette[Math.floor(Math.random() * p5ColorPalette.length)], //color
    1 //start extrusions number
  );
  //top right
  drawIncreasingAstroidBinarySymmetry(
    (canvasX / 2) , //mid position on canvas x
    (canvasY / 4) * 3, //mid position on canvasy
    2, //amount of figures
    p5ColorPalette[Math.floor(Math.random() * p5ColorPalette.length)], //color
    1 //start extrusions number
  );
  drawDots(10, canvasX, canvasY,30);

}

/*
function draw() {
  if (redrawAstroid) {
    background(255);
 
    fill(color(0, 0, 0));
    // Get slider values
    let x = xSlider.value();
    let y = ySlider.value();
    let width = widthSlider.value();
    let extrusions = extrusionsSlider.value();
    let extraCircles = Math.round(extraCirclesSlider.value());
    let detail = detailSlider.value();
    let zoomMagnitude = zoomMagnitudeSlider.value();
 
    // Draw the astroid
    astroid(x, y, width, extrusions, addColor, extraCircles, detail);
 
    // Reset the redrawAstroid flag
    redrawAstroid = false;
  }
}*/

let redrawAstroid = true;

function sliderChanged() {
  redrawAstroid = true;
}


//x, y for offset position
//Width for diameter(?) of form
//extrusions for the amount of "bumps" on form
//color is color --> duh
//extraCircles defines how many times around the algorithm goes, creates either dense bar or feeling of 3d "shield" type thingy
// -> values higher 100 extraCircles = worthless
//detail defines points how many points (1/detail) the form has
function astroid(x, y, width, extrusions, color, extraCircles = 1, detail = 0.001, zoomMagnitude = 1) {
  var currX, currY;
  width = width / 6; //"normalizes" width, read somewhere this formula depicts a(width) six times larger
  //index 0 to 1 draws semicircle --> not nice
  //index 0 to TWO_PI draws flower thingamabob
  for (let index = 0; index < TWO_PI * extraCircles; index += detail) {
    currX = (width) * ((cos(extrusions * index) + extrusions * cos(index)) / zoomMagnitude) + x;
    currY = (width) * ((sin(extrusions * index) + extrusions * sin(index)) / zoomMagnitude) + y; //(cos3x+3cosx) ÷4
    constrainedSet(currX, currY, color);
  }
  updatePixels();
}

function drawIncreasingAstroidBinarySymmetry(x, y, amount, color, startExtrusions = 3, shadowLength = 5) {
  for (let index = 1; index <= amount; index++) {
    astroidShadow(
      x,
      y,
      50 * index, //increase width over index so forms are embedded into each other
      2 * index + startExtrusions, //increase extrusions over index to create a feeling of sameness
      shadowLength, //shadow that drops downwards
      multiplyColor(color, index), //color to be used AND changed over index
      100, //outdated percent, just 100 percent so only draws 1 circle (TWO_PI)
      0.001 / index); //increases detail over index so larger forms are still properly filled in
    //astroid(x, y, 50 * index, 2 * index + 1, multiplyColor(color, index), 100, 0.001 / index);
  }
}

function drawRandomAstroid(canvasX, canvasY, widthMax, extrusionsMax, color, randomPercent = false) {
  //astroidShadow(Math.random() * canvasX, Math.random() * canvasY, Math.random() * widthMax, Math.random() * extrusionsMax + 1, 20, color, 100, 0.001);
  astroid(
    Math.random() * canvasX, //x
    Math.random() * canvasY, //y
    Math.random() * widthMax, //width
    Math.random() * extrusionsMax + 1, //extrusions 
    color, //color
    randomPercent ? 1 : 100, //extra circles to be drawn
    0.001); //detail
}





//nope doesnt work
function bezier2ndDeg(offsetX, offsetY, startX, startY, endX, endY, pullX, pullY) {
  var currX = offsetX;
  var currY = offsetY;

  for (let index = 0; index < 1; index += 0.1) {
    currX = (startX - 2 * pullX + endX) * Math.pow(index, 2) + (-2 * startX + 2 * pullX) * index + offsetX;
    currY = (startY - 2 * pullY + endY) * Math.pow(index, 2) + (-2 * startY + 2 * pullY) * index + offsetY;
    console.log(currX + " ; " + currY);
    constrainedSet(currX, currY, color(0));
  }
}

//x, y cordinates define where the top of the pyramid is
//width for midline length of the pyramid
//height from x, y to midline 
//tilt of the pyramid
function drawFunkyPyramiV1(x, y, width, height, lines) {
  var currX = x;
  var currY = y;
  //Startposition is x and y
  for (let index = 0; index < lines; index++) {
    drawLine(currX, currY + height * index / lines,)
    console.log(currX + " ; " + currY);
  }

  lines = Math.floor(height / linedistance);

  //get segment distance which should be hypotenuse length divided by lines --> *  to account for more space?
  let segmentDistance = 0;
  //iterate over first segment (goes to the right for now)


}

function drawLine(startX, startY, endX, endY) {
  var dirX = endX - startX;
  var dirY = endY - startY;
  console.log("dir: " + dirX + " " + dirY);
  var distance = getLength(dirX, dirY);
  console.log(distance);
  //iterate over length of line and draw pixel
  for (let index = 0; index < distance; index += 0.1) {
    var currX = startX + dirX * (index / distance);
    var currY = startY + dirY * (index / distance);
    console.log(currX + " " + currY);
    constrainedSet(currX, currY, color(0));
  }
  updatePixels();
}

function getLength(x, y) {
  var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  console.log("len: " + length);
  return length;
}

//visualizes "up" eg only positive values
function drawUp() {
  //draw "up"
  for (let index = 0; index < 100; index++) {
    constrainedSet(100, 100 + index);
  }

  for (let index = 0; index < 30; index++) {
    constrainedSet(100 - 15 + index, 200);
  }

  updatePixels();
}


function cardioid(x, y, radius) {

  for (let index = 0; index < TWO_PI; index += 0.0001) {
    constrainedSet(2 * radius * (1 - cos(index)) * cos(index) + x,
      2 * radius * (1 - cos(index)) * sin(index) + y, color(0));
  }
  updatePixels();
}

//version 1.6 with spirals
function spiral(x, y, radius, color, points) {
  for (let index = 1; index <= points; index += 0.1) {
    constrainedSet((cos(index)) * radius * index + x, (sin(index)) * radius * index + y, color);
  }

  updatePixels();
}

//not written myself, from marcel Version 1.6 but in singlespiral
function multiSpiral(posX, posY, radius) {
  for (let i = 0; i < 100; i += 0.01) {
    let x = Math.sin(i) * radius * i + posX;
    let y = Math.cos(i) * radius * i + posY;
    let col = color(i * 0.1, i * 0.03, i * 0.05);
    constrainedSet(x, y, col);
  }
  updatePixels();
}

function constrainedSet(x, y, color) {
  if (x > canvasX || x < -1 || y > canvasY || y < 0) {
    return;
  }
  set(x, y, color)
}

//version 1.7 with spirals and noise
function spiralNoise(x, y, radius, color, points, noiseIntensity) {
  for (let index = 1; index <= points; index += 0.1) {
    set((cos(index) * radius * index * 0.001) + x + Math.random() * noiseIntensity, (sin(index) * radius * index * 0.001) + y + Math.random() * noiseIntensity, color);
  }

  updatePixels();
}

function singleSpiral(x, y, radius, degrees, twistedness) {
  for (let index = 0; index < degrees; index++) {
    set(cos(index) * radius + x, sin(index) * radius + y, color(0));
    radius += 0.1
  }
  updatePixels();
}

function tube(x, y, radius, tubes, color, loopiness, quadrantDirection = [1, 1]) {
  for (let index = 1; index <= 360 * tubes; index++) {

    set((cos(index) * radius) + x + Math.random() * noiseIntensity + (index * loopiness * quadrantDirection[0]), (sin(index) * radius) + y + Math.random() * noiseIntensity + (index * loopiness * quadrantDirection[1]), color);

    //radius = radius * radiusIncreaseModifier
  }
  updatePixels();

}

function transformToRange(number) {
  // Convert the number from degrees to radians
  var radians = number * Math.PI / 180;

  // Calculate the sin of the radians
  var sin = Math.sin(radians);

  // Map the sin value from the range of -1 to 1
  var transformed = (2 * sin) - 1;

  return transformed;
}

/*version 1.1 with point set
for (let index = 1; index <= pointsOnCircleEdge * LOD; index++) {
  point((cos(index) * radius) + posX , (sin(index) * radius) + posY);
}
 
//version 1.2 with set pixel
for (let index = 1; index <= pointsOnCircleEdge * LOD; index++) {
  set((cos(index) * radius) + posX, (sin(index) * radius) + posY, c);
}

//version 1.3 with noise and set pixel
for (let index = 1; index <= pointsOnCircleEdge * LOD; index++) {
  set((cos(index) * radius) + posX + Math.random() * noiseIntensity, (sin(index) * radius) + posY + Math.random() * noiseIntensity, c);
}
 
//version 1.4 with noise and set pixel and line radius change
for (let index = 1; index <= pointsOnCircleEdge * LOD; index++) {
  set((cos(index) * radius) + posX + Math.random() * noiseIntensity, (sin(index) * radius) + posY + Math.random() * noiseIntensity, c);
  c.setGreen = index 
  //radius = radius * radiusIncreaseModifier
}
*/

/*
  //version 1.5 with noise and set pixel and line radius change DOES NOT WORK PROPERLY
  //Goes over every degree of the circle
  for (let index = 1; index <= pointsOnCircleEdge; index++) {
    //for(let fineIndex = 1; fineIndex <= LOD; fineIndex++)
    set((cos(index) * radius) + posX + Math.random() * noiseIntensity, (sin(index) * radius) + posY + Math.random() * noiseIntensity, c);
    c.setGreen = index

    //radius increases over time creates a radial effect
    radius = radius * 1.005
  }
*/