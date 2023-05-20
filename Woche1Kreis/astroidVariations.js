function astroidShadow(x,y, width, extrusions, shadowLength = 5, color = color(0,0,0), percent = 100, detail = 0.001 ){
  var currX, currY;
  //index 0 to 1 draws semicircle --> not nice
  //index 0 to TWO_PI draws flower thingamabob
  for (let index = 0; index < TWO_PI * (100/percent); index += detail) {
    currX = width * ((cos(extrusions * index) + extrusions * cos(index)) / 4) + x ;
    currY = width * ((sin(extrusions * index) + extrusions * sin(index)) / 4) + y; //(cos3x+3cosx) ÷4
    constrainedSet(currX, currY, color);
    for (let subindex = 1; subindex < shadowLength; subindex++) {
      constrainedSet(currX, currY + subindex, multiplyColor(color, subindex));
    }
  }
  updatePixels();
}

function astroidDivideExtrusion(x, y, width, extrusions, color, extraCircles = 1, detail = 0.001, zoomMagnitude = 1) {
  var currX, currY;
  width = width / 6; //"normalizes" width, read somewhere this formula depicts a(width) six times larger
  //index 0 to 1 draws semicircle --> not nice
  //index 0 to TWO_PI draws flower thingamabob
  for (let index = 0; index < TWO_PI * extraCircles; index += detail) {
    currX = (width) * ((cos((extrusions / width) * index) + (extrusions / width) * cos(index)) / zoomMagnitude) + x;
    currY = (width) * ((sin((extrusions / width) * index) + (extrusions / width) * sin(index)) / zoomMagnitude) + y; //(cos3x+3cosx) ÷4
    constrainedSet(currX, currY, color);
  }
  updatePixels();
}