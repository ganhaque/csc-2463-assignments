// Set up Tone
////////////////////////////////////////////////////////

let synth = new Tone.PolySynth().toDestination();
let dSynth = new Tone.PolySynth();

let lowPass = new Tone.Filter(800, "lowpass").toDestination();

dSynth.connect(lowPass);

let pattern = new Tone.Pattern((time, note) => {
  synth.triggerAttackRelease(note, 0.25, time);
}, ['C4', 'D4', 'E4', 'G4', 'A4']);

// let melody = new Tone.Sequence((time, note) => {
//   if (note != null) {
//     synth.triggerAttackRelease(note, '8n', time);
//   }
// }, ['D5', 'D5', null, null, null, null, null, 'A4', 'G4']);

let rain = [
  { "time": "0:0", "note": ["D4"] },
  { "time": "0:1", "note": ["B5"] },
  { "time": "0:2", "note": ["F4"] },
  { "time": "0:3", "note": ["B5"] },
  // { "time": "0:2", "note": ["C4", "E3", "G4"] },
  // { "time": "0:3", "note": ["C4", "E3", "G4"] },
  // { "time": "1:0", "note": ["F4", "A4", "C4"] },
  // { "time": "1:1", "note": ["G4", "A3", "D4"] },
  // { "time": "1:2", "note": ["G4", "B4", "F4"] }
]

let chords = [
  // { "time": "0:0", "note": ["C4", "E3", "G4"] },
  // { "time": "0:3", "note": ["F4", "A4", "C4"] },
  // { "time": "1:1", "note": ["G4", "A3", "D4"] },
  // { "time": "1:2", "note": ["G4", "B4", "F4"] }
]

let chord = new Tone.Part((time, notes) => {
  dSynth.triggerAttackRelease(notes.note, '2n', time)
}, chords)

let melody = new Tone.Part((time, notes) => {
  dSynth.triggerAttackRelease(notes.note, '1n', time)
}, rain)

chord.loop = 8;
chord.loopEnd = '2m';

melody.loop = 8;
melody.loopEnd = '2m';

// create two monophonic synths
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
// const loopA = new Tone.Loop((time) => {
//   synthA.triggerAttackRelease("C2", "8n", time);
// }, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
// const loopB = new Tone.Loop((time) => {
//   synthB.triggerAttackRelease("C4", "8n", time);
// }, "4n").start('8n');
// the loops start when the Transport is started

Tone.Transport.bpm.value = 90;


document.addEventListener("DOMContentLoaded", function() {
  // let nxDial, nxButton, stopButton;
  // const playStopButton = document.getElementById('play-stop-button');
  const playStopButton = document.getElementById('start-button');
  let isPlaying = false;
  playStopButton.addEventListener('click', playStopMelody);

  function playStopMelody() {

    // nxButton = Nexus.Add.Button('nxUI');
    // nxButton.on('change', () => {
    //   // Tone.start();
    //   // pattern.start(0);
    //   chord.start("0:0");
    //   melody.start(0);
    //   Tone.Transport.start();
    //   // playMidi();
    // })
    // stopButton = Nexus.Add.Button('nxUI');
    // stopButton.on('change', () => {
    //   // Tone.start();
    //   // pattern.start(0);
    //   chord.stop();
    //   melody.stop();
    //   Tone.Transport.stop();
    //   // playMidi();
    // })
    if (isPlaying) {
      console.log("stop");
      // Tone.stop();
      // pattern.stop();
      Tone.Transport.stop();
      // chord.stop();
      melody.stop();
      isPlaying = false;
    }
    else {
      console.log("playing");
      Tone.start();
      // pattern.start();
      // chord.start("0:0");
      Tone.Transport.start();
      chord.start();
      melody.start("0:0");
      isPlaying = true;
    }
  }
});
////////////////////////////////////////////////////////

//Canvas properties:
let TILE_LENGTH = 24;
let CANVAS_WIDTH_SCALING = 26;
let CANVAS_HEIGHT_SCALING = 20;
let canvasColor = "#080808";


let gridArray = [];
let showGrid = true;
function drawGrid(column, row) {
  for (let x = 0; x < width; x += width / column) {
    for (let y = 0; y < height; y += height / row) {
      push();
      stroke(105, 135, 255, 0.90)
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
      pop();
    }
  }
}

// var canvasColor = "#F0F0F0";
// var canvasColor = "#23262a"; //night mode :D
var colorPallete = [
  "#ff7eb6",
  "#E95678",
  "#ff9e64",
  "#f6ca6b",
  "#bae881",
  "#2ee6a6",
  "#59e1e3",
  "#78a9ff",
  "#b4befe",
  "#be95ff",
  "#FFFFFF",
  "#000000"
]
var palleteArray = [];
var brushColor = "#000000"; //default color
var isEraser = false;
var brushStrokeArray = [ 0.5, 0.7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 20, 26, 32, 42, 56, 72, 86, 100, 126, 156, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 2000 ];
var brushStrokeIndex = 11;
// var brushStroke = brushStrokeArray[brushStrokeIndex];
var renderBrushSizeIsTRUE = false;
var displayStatusBar = true;
//Pallete properties:
var initialX = 0;
var initialY = 0;
var initialSize = TILE_LENGTH;
//Canvas properties:
var canvasWidth = 1200;
var canvasHeight = 900;
//StatusBar properties:
var statusBarHeight = 24;
var diffStatusBarHeight = canvasHeight - statusBarHeight;

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
  // createCanvas(canvasWidth, canvasHeight);
  background(canvasColor);
  colorPallete.forEach(initialize_color_pallete)

  createCanvas(TILE_LENGTH*CANVAS_WIDTH_SCALING, TILE_LENGTH*CANVAS_HEIGHT_SCALING);
  if(showGrid) {
    drawGrid(CANVAS_WIDTH_SCALING, CANVAS_HEIGHT_SCALING, 'rgb(20, 20, 255, 0.75)');
  }

  ///////////////////////////////////
  // nxDial = Nexus.Add.Dial('#nxUI', {
  //   'size': [200, 200],
  //   'min': 100,
  //   'max': 4000,
  //   'step': 20,
  //   'value': 1050
  // });
  // nxDial.on('change', (v) => {
  //   // console.log(v);
  //   lowPass.frequency.value = v;
  // })

  synthA.volume.value = -11;
  synthB.volume.value = -11;
  synth.volume.value = -7;
  dSynth.volume.value = -7;


  ///////////////////////////////////
}

function draw() {

  // drawGrid(CANVAS_WIDTH_SCALING, CANVAS_HEIGHT_SCALING, 'rgb(20, 20, 255, 0.75)');
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
  let isInsidePallete = (
    mouseX >= initialX &&
      mouseX <= initialX + initialSize &&
      mouseY >= initialY  &&
      mouseY <= initialY + initialSize * palleteArray.length
  );
  if (!isInsidePallete) {
    if (!isEraser) {
      console.log("drawing w/", brushColor, "at size", brushStrokeArray[brushStrokeIndex]);
      paintBrush(brushColor);
    }
    else {
      console.log("erasing");
      paintBrush(canvasColor);
    }
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

function renderStatusBar() {
  push();
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
  //stroke size module
  let strokeSizeModuleSize = 60;
  fill("#23262a");
  triangle(modeModuleSize + 20, canvasHeight, modeModuleSize, canvasHeight, 20 + modeModuleSize, diffStatusBarHeight)
  rect(modeModuleSize + 20, diffStatusBarHeight, strokeSizeModuleSize, statusBarHeight);
  triangle(modeModuleSize + strokeSizeModuleSize + 20, diffStatusBarHeight, modeModuleSize + strokeSizeModuleSize + 20, canvasHeight, 40 + modeModuleSize + strokeSizeModuleSize, diffStatusBarHeight)
  let strokeSizeString = brushStrokeArray[brushStrokeIndex].toString();
  fill("#ffffff");
  text(strokeSizeString, 102, diffStatusBarHeight + 18)
  //color module
  let colorModuleSize = 60;
  fill(brushColor);
  triangle(strokeSizeModuleSize + modeModuleSize + 20, canvasHeight, strokeSizeModuleSize + modeModuleSize, canvasHeight, 20 + strokeSizeModuleSize + modeModuleSize, diffStatusBarHeight)
  rect(strokeSizeModuleSize + modeModuleSize + 20, diffStatusBarHeight, colorModuleSize, statusBarHeight);
  triangle(modeModuleSize + strokeSizeModuleSize + colorModuleSize + 20, diffStatusBarHeight, strokeSizeModuleSize + modeModuleSize + colorModuleSize + 20, canvasHeight, 40 + strokeSizeModuleSize + modeModuleSize + colorModuleSize, diffStatusBarHeight)
  pop();

}

function deleteStatusBar() {
  push();
  noStroke()
  fill(canvasColor);
  rect(0, diffStatusBarHeight - 1, canvasWidth, statusBarHeight + 1);
  pop();
}
