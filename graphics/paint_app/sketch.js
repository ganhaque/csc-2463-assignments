var canvasColor = "#F0F0F0";
var colorPallete = [
  "#EA412C",
  "#EF8734",
  "#FFF84A",
  "#77F23B",
  "#74F9FC",
  "#0044F7",
  "#E95DFA",
  "#774315",
  "#FFFFFF",
  "#000000"
]
var palleteArray = [];
var brushColor = "#000000"; //default color
var isEraser = false;
var brushStrokeArray = [
  0.5,
  0.7,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  20,
  26,
  32,
  42,
  56,
  72,
  86,
  100,
  126,
  156,
  200,
  250,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  1000,
  2000
];
var brushStrokeIndex = 11;
// var brushStroke = brushStrokeArray[brushStrokeIndex];
var renderBrushSizeIsTRUE = false;
var displayStatusBar = true;
//Pallete properties:
var initialX = 0;
var initialY = 0;
var initialSize = 45;
//Canvas properties:
var canvasWidth = 1200;
var canvasHeight = 900;

function initialize_color_pallete(item, index, arr) {
  // console.log("index:",index);
  // console.log("color:",item);
  // console.log("array length:", palleteArray.length);
  palleteArray.push(
    new PalleteSquare(initialX, initialY + index * initialSize, initialSize, item)
  );
}

///////////////////////////////////////////////////////////////
function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(canvasColor);
  colorPallete.forEach(initialize_color_pallete)
}

function draw() {
  for(let i = 0; i < palleteArray.length; i++) {
    palleteArray[i].draw();
  }
  // if (renderBrushSizeIsTRUE) {
  //   renderBrushSize();
  // }
  if (displayStatusBar) {
    renderStatusBar();
  }
}

///////////////////////////////////////////////////////////////
function mousePressed() {
  console.log("pressed");
  let isInsidePallete = (
    mouseX >= initialX &&
      mouseX <= initialX + initialSize &&
      mouseY >= initialY  &&
      mouseY <= initialY + initialSize * palleteArray.length
  );
  // let leftMouseIsPressed = (mouseIsPressed && mouseButton === LEFT);
  // if (leftMouseIsPressed) {
  if (isInsidePallete) {
    for(let i = 0; i < palleteArray.length; i++) {
      if (palleteArray[i].isInside()) {
        brushColor = palleteArray[i].getColor();
        console.log("color:", brushColor);
      }
    }
  }
  else if (isEraser){
    clickPaintBrush(canvasColor);
  }
  else {
    clickPaintBrush(brushColor);
  }
}

function mouseDragged() {
  // let ctrlAltIsDown = (keyIsDown(17) && keyIsDown(18));
  // if (ctrlAltIsDown) {
  //   console.log("changing brush size");
  //   renderBrushSize();
  // }
  // else {
  if (!isEraser) {
    console.log("drawing w/", brushColor, "at size", brushStrokeArray[brushStrokeIndex]);
    paintBrush(brushColor);
  }
  else {
    console.log("erasing");
    paintBrush(canvasColor);
  }
  // }
}

///////////////////////////////////////////////////////////////
class PalleteSquare {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  draw() {
    fill(this.color);
    square(this.x, this.y, this.size);
  }
  getColor() {
    if (this.isInside()) {
      return this.color;
    }
  }
  isInside() {
    let isInsideX = (mouseX >= this.x && mouseX <= this.x + this.size);
    let isInsideY = (mouseY >= this.y && mouseY <= this.y + this.size);

    // console.log("x:", isInsideX);
    // console.log("y:", isInsideY);
    return (isInsideX && isInsideY);
  }
}

///////////////////////////////////////////////////////////////
function keyTyped() {
  switch(key) {
    case 'c':
      //toggle eraser
      if(isEraser) {
        console.log("brush mode")
        isEraser = false;
      }
      else {
        console.log("eraser mode")
        isEraser = true;
      }
      break;
    // case 's':
    //   if(renderBrushSizeIsTRUE) {
    //     console.log("renderBrushSizeIsTRUE mode")
    //     renderBrushSizeIsTRUE = false;
    //   }
    //   else {
    //     console.log("renderBrushSizeIsFALSE mode")
    //     renderBrushSizeIsTRUE = true;
    //   }
    //   break;
    case 'q':
      console.log("q is pressed")
      //decrease brush size
      if(brushStrokeIndex >= 1) {
        brushStrokeIndex -= 1;
        console.log("brush size:", brushStrokeArray[brushStrokeIndex]);
      }
      else {
        console.log("cannot decrease brush stroke further")
      }
      break;
    case 'w':
      console.log("w is pressed")
      //decrease brush size
      if(brushStrokeIndex < brushStrokeArray.length -1) {
        brushStrokeIndex += 1;
        console.log("brush size:", brushStrokeArray[brushStrokeIndex]);
      }
      else {
        console.log("cannot increase brush stroke further")
      }
      break;
    case ' ':
      console.log("<leader> is pressed")
      //statusbar toggle
      if(displayStatusBar) {
        console.log("disabled statusbar")
        displayStatusBar = false;
        deleteStatusBar();
      }
      else {
        console.log("statusbar enabled")
        displayStatusBar = true;
      }
      break;
    default:
    console.log("not a shortcut");
  }
}

///////////////////////////////////////////////////////////////
function paintBrush(color) {
  push();
  stroke(color);
  strokeWeight(brushStrokeArray[brushStrokeIndex]);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
}
function clickPaintBrush(color) {
  push();
  noStroke();
  fill(color);
  circle(mouseX, mouseY, brushStrokeArray[brushStrokeIndex]);
  pop();
}
///////////////////////////////////////////////////////////////
// function renderBrushSize() {
//   push();
//   noFill();
//   circle(mouseX, mouseY, brushStrokeArray[brushStrokeIndex]);
//   pop();
// }

//TODO: make status bar a class
function renderStatusBar() {
  push();
  let statusBarHeight = 24;
  let diffStatusBarHeight = canvasHeight - statusBarHeight;
  // let eraserModeColor = "#E95678";
  let eraserModeColor = "#7aa2f7";
  let brushModeColor = "#BAE881";
  let modeModuleSize = 74;
  let modeString = "BRUSH";
  fill("#23262a");
  rect(0, diffStatusBarHeight, canvasWidth, statusBarHeight);
  noStroke();
  if(isEraser) {
    fill(eraserModeColor);
    modeModuleSize = 82;
  }
  else {
    fill(brushModeColor);
    modeModuleSize = 72;
  }
  rect(0, diffStatusBarHeight, modeModuleSize, statusBarHeight);
  triangle(modeModuleSize, diffStatusBarHeight, modeModuleSize, canvasHeight, 20 + modeModuleSize, diffStatusBarHeight)
  // blendMode(EXCLUSION);
  // textAlign(LEFT);
  textSize(16);
  fill("#101317");
  if(isEraser) {
    modeString = "ERASER";
  }
  else {
    modeString = "BRUSH";
  }
  text(modeString, 9, diffStatusBarHeight + 18)
  pop();
}

function deleteStatusBar() {
  let statusBarHeight = 24;
  let diffStatusBarHeight = canvasHeight - statusBarHeight;
  push();
  noStroke()
  fill(canvasColor);
  rect(0, diffStatusBarHeight - 1, canvasWidth, statusBarHeight + 1);
  pop();
}
