let canvasX = 2400;
let canvasY = 1200;

let lineDistance = 200;
let lineDetail = 2;

let allPoints = [];

let start = [Math.random() * canvasX, Math.random() * canvasY];
let end = [20, 100];

let graphColors = ['red', 'purple', 'aquamarine', 'steelblue', 'black'];
let usedGraphColors = [];
let usedPointColors = [];

let persistenceMIN = 0.3;
let persistenceSTART = 0.35;
let persistenceSTEP = 0.01;
let graphNO = 3;
function setup() {
  createCanvas(canvasX, canvasY);

  for (let graphCount = 0; graphCount < graphNO; graphCount++) {
    console.log("Creating Graph: " + graphNO);

    let newPoints = createPoints(canvasX / lineDistance, 300 * graphCount, graphNO, false);
    allPoints.push(newPoints);

    //console.log(allPoints);

    for (let i = 0; i < 1; i++) {
      let persistence = persistenceSTART - (persistenceSTEP * graphCount);
      console.log("Persistence: " + persistence);
      allPoints[graphCount] = fractalizePoints(allPoints[graphCount], persistence >= persistenceMIN ? persistence : persistenceMIN);
    }

    console.log(lineDistance);

    //console.log(allPoints);
    let randomIndex1 = Math.floor(Math.random() * graphColors.length);
    let randomIndex2 = Math.floor(Math.random() * graphColors.length);

    let c1 = graphColors[randomIndex1];
    let c2 = graphColors[randomIndex2];
    console.log("Graph Color: " + c1);
    console.log("Point Color: " + c2);

    usedGraphColors.push(c1);
    usedPointColors.push(c2);

    drawPoints(allPoints[graphCount], 0, 20 / graphCount, c2);
    //drawGraph(allPoints[graphCount], 0, true, c1);

  }
  console.log("graph colors: " + usedGraphColors);
  console.log("point colors: " + usedPointColors);

}

let xStep = 0.6;
let flickeringColors = false;
function draw() {
  background(255);
  for (let graphCount = 0; graphCount < graphNO; graphCount++) {
    let points = allPoints[graphCount];

    let c1, c2;
    if (flickeringColors) {
      let randomIndex1 = Math.floor(Math.random() * graphColors.length);
      let randomIndex2 = Math.floor(Math.random() * graphColors.length);

      console.log("Graph Color: " + graphColors[randomIndex1]);
      console.log("Point Color: " + graphColors[randomIndex2]);

      c1 = graphColors[randomIndex1];
      c2 = graphColors[randomIndex2];
    }
    else {
      c1 = usedGraphColors[graphCount];
      c2 = usedPointColors[graphCount];
    }

    drawPoints(points, 10 / graphCount, c1);
    drawGraph(points, c2, true);
    removeOutOfBoundPoints(graphCount);
    //addNewPoints(graphCount);
  }


  console.log("Moving");
}

//check if last index in points is larger than canvasX + 32
//if thats the case remove --> check if last point still is smaller than canvasX + 32
function removeOutOfBoundPoints(graphCount) {
  let points = allPoints[graphCount];
  while (points.length > 0 && points[points.length - 1][0] > canvasX + 32) {
    console.log("moved point to start x: " + points[points.length - 1][0] + " y: " + points[points.length - 1][1])
    let movePoint = allPoints[graphCount].pop();
    movePoint[0] = 0;
    allPoints[graphCount].unshift(movePoint);
  }
}

//check if first point x [x,y] in pointsarray has x > 0
//if thats the case, add new points with random y and linestep until x < 0  
function addNewPoints(graphCount) {
  let points = allPoints[graphCount];
  while (points.length === 0 || points[0][0] > 0) {
    let newY = Math.random() * canvasY;
    let newX = (points.length === 0 ? 0 : points[0][0]) - lineDistance;
  }
}

function drawGraph(points, color = 'purple', fill = false) {
  let pointIndex = 0;
  //iterate over full x, drawing graph
  for (let index = 0; index < canvasX; index += lineDetail) {
    let coord = points[pointIndex];
    let next = points[pointIndex + 1];

    if (index >= next[0]) {
      pointIndex++;
      if (pointIndex >= points.length - 1) {
        pointIndex = points.length - 2;
      }
      coord = points[pointIndex];
      next = points[pointIndex + 1];
    }

    let t = (index - coord[0]) / (next[0] - coord[0]);

    let drawCoordY = lerpCos(coord[1], next[1], t);

    stroke(color); // Change the color
    strokeWeight(2); // Make the points 10 pixels in size
    point(index, drawCoordY);

    if (fill) {
      //DRAW VERTICAL LINE FOR FILL
      stroke(color); // Change the color
      strokeWeight(1); // Make the points 10 pixels in size
      line(index, drawCoordY, index, canvasY);
      //console.log("Drew Line | i: " + index + " y: " + drawCoordY);      
    }

  }
}

function fractalizePoints(points, persistence) {
  let newPoints = []
  lineDistance = lineDistance / 2;
  for (let index = 0; index < points.length; index++) {
    let me = points[index];

    let y1 = me[1];

    me[1] = me[1] / 2;
    newPoints.push(me);


    let next;
    if (index < points.length - 1) {

      next = points[index + 1];
      let y2 = next[1];
      let halfx = (me[0] + next[0]) / 2;

      let yNext = (y2 + y1) * persistence;
      //yNext *= Math.random() * 0.4 + 0.8;
      //console.log("Added mid point y:" + yNext)

      newPoints.push([halfx, yNext]);

    }
  }
  return newPoints;
}

//interpolates between start[x,y] and endpoint with value t from 0 to 1
function lerpSelf(start, end, t) {
  let stepX = end[0] - start[0];
  let stepY = end[1] - start[1];

  return [start[0] + stepX * t, start[1] + stepY * t];
}

//interpolates between start and endpoint with value t from 0 to 1
function lerpNormal(y0, y1, t) {
  let y = (1 - t) * y0 + y1 * t;
  return y;
}

//interpolates between start and endpoint with value t from 0 to 1 with cos
function lerpCos(y0, y1, t) {
  return lerpNormal(y0, y1, (1 - Math.cos(t * PI)) / 2);
}


function lerpFractal(y0, y1, t) {
  t += Math.sin(t);
  t += 1 / 2 * Math.sin(2 * t);
  t += 1 / 4 * Math.sin(4 * t);
  t += 1 / 8 * Math.sin(8 * t);
  //console.log(t);
  return lerpNormal(y0, y1, t);
}


//Dragicas methode
//y = y0+((x-x0)/(x1 - x0)) / (y1 - y0);
//x0 = 0, y0 = 0

//Draws vertical lines and random points on each line
function createPoints(num, yOffset, random = false) {
  let points = [];

  for (let index = 0; index < num; index++) {
    /*
    stroke('black'); // Change the color
    strokeWeight(2); // Make the points 10 pixels in size
    line(index * lineDistance, 0, index * lineDistance, canvasY);
*/

    //ymodifier can push graph up or down
    let pointY = Math.random() * canvasY + yOffset;
    let pointX = index * lineDistance;

    points.push([pointX, pointY]);
  }

  return points;
}

function drawPoints(points, pointSize = 10, color = 'yellow') {
  for (let index = 0; index < points.length; index++) {

    points[index][0] += xStep;
    let coord = points[index];

    stroke(color); // Change the color
    strokeWeight(pointSize); // Make the points 10 pixels in size
    point(coord[0], coord[1]);
  }
}

function shufflePoints(points) {
  for (let i = points.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // Get random index
    // Swap points at i and j
    [points[i], points[j]] = [points[j], points[i]];
  }
  return points;
}