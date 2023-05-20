let canvasX = 1000;
let canvasY = 1000;

let x3random = 0;//Math.random();
let y3random = 0;//Math.random();
let x2random = 0;//Math.random();
let y2random = 0;//Math.random();

function setup() {
  createCanvas(canvasX, canvasY, WEBGL);
  createEasyCam();
  document.oncontextmenu = () => false;
}

function draw() {
  background(255);
  lights();
  //drawTriangleStrip(100);
  /*
  for (let index = 0; index < TWO_PI; index += 0.1) {
    drawCylinder(30, 20, 10, [sin(index) * 100, cos(index) * 100]);
  }
  */

  point(0, 0, 0);
  //drawDonut(150, 200, 16, 2);
  drawShell(10, 40,400, 4, 8);
}

function drawTriangleStrip(amount) {
  beginShape(TRIANGLE_STRIP);
  for (let index = 0; index < amount; index++) {
    vertex(0, index * 10, 0);
    vertex(20, index * 10, 0);
  }
  endShape();
}

function drawCylinder(radius, height, numSegments, offset) {
  beginShape(QUAD_STRIP);

  for (let i = 0; i <= numSegments; i++) {
    let angle = i * TWO_PI / numSegments;

    let x = radius * cos(angle);
    let y = radius * sin(angle);

    vertex(0, x + offset[0], y + offset[1]);     // Bottom circle vertex
    vertex(height, x + offset[0], y + offset[1]); // Top circle vertex
  }

  endShape(CLOSE);
}


function drawDonut(outRadius, innerRadius, segments = 8.8, steps = 2.5) {
  let detail = TWO_PI / segments;

  push();
  beginShape(TRIANGLE_STRIP);
  for (let outerI = 0; outerI <= TWO_PI + 0.1; outerI += detail) {
    for (let innerI = 0; innerI <= TWO_PI; innerI += detail) {
      for (let index = 0; index < steps; index++) {
        let xc = outRadius * cos(outerI + (detail) * index);
        let yc = outRadius * sin(outerI + (detail) * index);

        let xr = xc * cos(innerI);
        let zr = xc * sin(innerI);

        let xmid = innerRadius * cos(innerI);
        let zmid = innerRadius * sin(innerI);

        vertex(xr + xmid, yc, zr + zmid);
      }
    }
  }
  endShape(CLOSE);
  pop();
}

function drawShell(baseWidth, innerRadius, height, segments = 8, steps = 2) {
  let detail = TWO_PI / segments;
  let umrundungen = height / TWO_PI;
  let outRadius = baseWidth;
  let inRadius = innerRadius;

  push();
  beginShape(TRIANGLE_STRIP);
  for (let outerI = 0; outerI <= umrundungen; outerI += detail) {
    for (let innerI = 0; innerI <= TWO_PI; innerI += detail) {
      for (let index = 0; index < steps; index++) {
        inRadius = innerRadius * (outerI / umrundungen);
        let xc = outRadius * cos(outerI + (detail) * index);
        let yc = outRadius * sin(outerI + (detail) * index) + outerI * 2;

        let xr = xc * cos(innerI);
        let zr = xc * sin(innerI);

        let xmid = inRadius * cos(innerI);
        let zmid = inRadius * sin(innerI);

        vertex(xr + xmid, yc, zr + zmid);
      }
    }
  }
  endShape(CLOSE);
  pop();
}