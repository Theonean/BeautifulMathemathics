let canvasX = 1200;
let canvasY = 700;

let lineDistance = 50;
let linePoints = [];
let lineDetail = 0.01;

let start = [Math.random() * canvasX, Math.random() * canvasY];
let end = [20, 100];

function setup() {
  createCanvas(canvasX, canvasY);

  drawLines(canvasX / lineDistance);

  for (let index = 0; index < linePoints.length - 1; index++) {
    let coord = linePoints[index];
    let next = linePoints[index + 1];

    //Manual interpolation between two lines
    for (let t = 0; t < 1; t += lineDetail) {
      let currX = index * lineDistance + lineDistance * t;
      let drawCoordY = lerpCos(coord[1], next[1], t);
      set(currX, drawCoordY, [100, 100, 100, 255]);
    }
  }
  updatePixels();

  //loop over canvasx
}

//interpolates between start[x,y] and endpoint with value t from 0 to 1
function lerpSelf(start, end, t) {
  let stepX = end[0] - start[0];
  let stepY = end[1] - start[1];

  return [start[0] + stepX * t, start[1] + stepY * t];
}

//interpolates between start and endpoint with value t from 0 to 1
function lerpNormal(y0, y1, t) {
  let y = (1-t) * y0 + y1 * t;
  return y;
}

//interpolates between start and endpoint with value t from 0 to 1 with cos
function lerpCos(y0, y1, t) {
  return lerpNormal(y0, y1, (1-Math.cos(t * PI))/2);
}

//Dragicas methode
//y = y0+((x-x0)/(x1 - x0)) / (y1 - y0);
//x0 = 0, y0 = 0

//Draws vertical lines and random points on each line
function drawLines(num) {
  stroke('purple'); // Change the color

  for (let index = 0; index < num; index++) {
    strokeWeight(2); // Make the points 10 pixels in size
    line(index * lineDistance, 0, index * lineDistance, canvasY);

    let pointY = Math.random() * canvasY;
    strokeWeight(10); // Make the points 10 pixels in size
    point(index * lineDistance, pointY, [111, 111, 111, 255]);
    linePoints.push([index * lineDistance, pointY]);
  }

  updatePixels();
}