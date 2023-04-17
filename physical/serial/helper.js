
function initialize_color_pallete(item, index, arr) {
  // console.log("index:",index);
  // console.log("color:",item);
  // console.log("array length:", palleteArray.length);
  // console.log(arr);
  palleteArray.push(
    new PalleteSquare(initialX, initialY + index * initialSize, initialSize, item)
  );
}

function initialize_grid() {
  // console.log("i length is", gridArray.length);
  // console.log("j length is", gridArray[0].length);
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 1; j < gridArray[i].length; j++) {
      colorArray.push( new CanvasSquare(
        j * TILE_LENGTH, i * TILE_LENGTH, TILE_LENGTH, canvasColor
      ))
    }
  }
  // console.log(colorArray)
}

function nextColor() {
  brushColorIndex = (brushColorIndex + 1) % colorPallete.length;
  brushColor = colorPallete[brushColorIndex];
  console.log("new color is", colorPallete[brushColorIndex]);
  updateArduinoLED();
  // serialWrite(cargo);
}

function updateArduinoLED() {
  cargo.red = colorPaletteRGB[brushColorIndex][0];
  cargo.green = colorPaletteRGB[brushColorIndex][1];
  cargo.blue = colorPaletteRGB[brushColorIndex][2];
  serialWrite(cargo);
}