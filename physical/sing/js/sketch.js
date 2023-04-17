//Canvas properties:
let TILE_LENGTH = 24;
let CANVAS_WIDTH_SCALING = 32;
// let CANVAS_HEIGHT_SCALING = 9;
let canvasColor = "#080808";

let gridArray = [];
let showGrid = true;
let pixelMode = true;

let volume = -12;
let synth // The synth that plays notes

// Whether the audio sequence is playing
let playing = false;

// The current Tone.Sequence
let sequence;

// The currently playing column
let currentColumn = 0;

// const notes = ["F#4", "E4", "C#4", "A4"];
// const notes = ["A3", "C4", "D4", "E3", "G4"];
// const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];
// const notes = [ "A4", "D3", "E3", "G4", 'F#4' ];
// const notes = ["C5", "A3", "D4", "G4", "A4", "F4"]; 

const notes = ["F#4", "E4", "C#4", "A4", "A2", "C4", "D4", "E2", "G4" ];


// Number of rows is the number of different notes
const CANVAS_HEIGHT_SCALING = notes.length;

// Number of columns is depending on how many notes to play in a measure
const numCols = CANVAS_WIDTH_SCALING;
const noteInterval = `${numCols}n`;

// Setup audio config
Tone.Transport.bpm.value = 120;

document.addEventListener("DOMContentLoaded", function() {
  const pixelToggleButton = document.getElementById('pixel-toggle-button');
  pixelToggleButton.addEventListener('click', () => {
    pixelMode = !pixelMode;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const gridToggleButton = document.getElementById('grid-toggle-button');
  gridToggleButton.addEventListener('click', () => {
    showGrid = !showGrid;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  const playStopButton = document.getElementById('start-button');
  playStopButton.addEventListener('click', togglePlay);

  // When the button is pressed, turn on the sequencer
  function togglePlay() {
    // No synth loaded yet, just skip mouse click
    if (!synth) {
      return;
    }

    if (playing) {
      // If we are currently playing, we stop the sequencer
      playing = false;
      sequence.stop();
      Tone.Transport.stop();
      playStopButton.innerHTML = "Play"
    }
    else {
      // If we aren't currently playing, we can start the sequence

      // We do this by creating an array of indices [ 0, 1, 2 ... 15 ]
      const noteIndices = newArray(numCols);
      // create the sequence, passing onSequenceStep function
      sequence = new Tone.Sequence(onSequenceStep, noteIndices, noteInterval);

      // Start the sequence and Transport loop
      playing = true;
      sequence.start();
      Tone.Transport.start();
      playStopButton.innerHTML = "Stop"
    }
  }
});

// Here is where we actually play the audi
function onSequenceStep(time, column) {
  // We build up a list of notes, which will equal
  // the numRows. This gets passed into our PolySynth
  let notesToPlay = [];
  // console.log("column", column);

  // Go through each row
  for (let i = 0; i < gridArray.length; i++) {
    // add randomness for funsies
    const chance = random(0, 0.05);
    if ( gridArray[i][column] === 1 ) {
      let rando = randomGaussian() > chance ? 1 : 0;
      if (rando === 1) {
        // make sure to not have 2 notes next to each other
        gridArray[i][column + 1] = 0;
        // console.log("playing note", notes[i]);
        const note = notes[i];
        notesToPlay.push(note);
      }
    }
  }

  console.log(column, "note to play", notesToPlay);

// Trigger a note
  const velocity = random(0.5, 1);
  synth.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);
  // Tone.Draw.schedule(function () {
  //   currentColumn = column;
  // }, time);
}

// A utility function to create a new array
// full of indices [ 0, 1, 2, ... (N - 1) ]
function newArray(n) {
  const array = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }
  return array;
}

/////////////////////////////////////////////////////////////////
var marimba = new Tone.Synth().toMaster();
var synthJSON2 = {
  "volume":-5,
  "oscillator": { "partials": [ 1, 0, 2, 0, 3 ] },
  "envelope": { "attack": 0.001, "decay": 1.2, "sustain": 0, "release": 1.2 }
};
marimba.set(synthJSON2);

///////////////////////////////////////////////////////////////////////////
var colorPallete = [
  // "#ff7eb6",
  "#E95678",
  "#ff9e64",
  "#f6ca6b",
  "#bae881",
  "#2ee6a6",
  "#59e1e3",
  "#78a9ff",
  // "#b4befe",
  "#be95ff",
  "#FFFFFF",
  // "#000000"
]
var brushColor = colorPallete[8];
var brushStrokeArray = [ 0.5, 0.7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 20, 26, 32, 42, 56, 72, 86, 100, 126, 156, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 2000 ];
var brushStrokeIndex = 12;
var isEraser = false;

var palleteArray = [];
function initialize_color_pallete(item, index, arr) {
  // console.log("index:",index);
  // console.log("color:",item);
  // console.log("array length:", palleteArray.length);
  // console.log(arr);
  palleteArray.push(
    new PalleteSquare(initialX, initialY + index * initialSize, initialSize, item)
  );
}

//Pallete properties:
var initialX = 0;
var initialY = 0;
var initialSize = TILE_LENGTH;

var colorArray = [];


///////////////////////////////////////////////////////////////
async function setup() {
  createCanvas(TILE_LENGTH * CANVAS_WIDTH_SCALING, TILE_LENGTH * CANVAS_HEIGHT_SCALING);
  colorPallete.forEach(initialize_color_pallete)

  background(canvasColor);

  for(let i = 0; i <= height / TILE_LENGTH; i++) {
    gridArray.push(new Array(width / TILE_LENGTH).fill(0));
    // console.log("curren array[i][j] = ", gridArray[i]);
  }

  initialize_grid();

  // Setup a reverb with ToneJS
  const reverb = new Tone.Reverb({
    decay: 4,
    wet: 0.2,
    preDelay: 0.25,
  });

  // Load the reverb
  await reverb.generate();

  // Create an effect node that creates a feedback delay
  const effect = new Tone.FeedbackDelay(`${Math.floor(numCols / 2)}n`, 1 / 3);
  effect.wet.value = 0.2;

  // Setup a synth with ToneJS
  // We use a poly synth which can hold up to numRows voices
  // Then we will play each note on a different voice
  synth = new Tone.PolySynth({CANVAS_HEIGHT_SCALING}, Tone.DuoSynth);

  // Setup the synths a little bit
  synth.set({
    voice0: {
      oscillator: {
        type: "triangle4",
      },
      volume: -30,
      envelope: {
        attack: 0.005,
        release: 0.05,
        sustain: 1,
      },
    },
    voice1: {
      volume: -10,
      envelope: {
        attack: 0.005,
        release: 0.05,
        sustain: 1,
      },
    },
  });
  synth.volume.value = volume;

  // Wire up our nodes:
  synth.connect(effect);
  synth.connect(Tone.Master);  // Master renamed Destination v14.7.x
  effect.connect(reverb);
  reverb.connect(Tone.Master);
}

function draw() {
  // render pallete
  for(let i = 0; i < palleteArray.length; i++) {
    palleteArray[i].draw();
  }
  // render color square if pixel
  if (pixelMode) {
    for(let i = 0; i < colorArray.length; i++) {
      colorArray[i].draw();
    }
  }
}

///////////////////////////////////////////////////////////////
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
        palleteArray[i].musicOnClick();
        console.log("color:", brushColor);
      }
    }
  }
  else if (isEraser){
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      if (colorArray[i].isInside()) {
        // console.log("inside");
        colorArray[i].changeColor(canvasColor);
      }
    }
    if (!pixelMode) {
      clickPaintBrush(canvasColor);
    }
  }
  else {
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      // if (colorArray[i].isInside()) {
      if (colorArray[i].isInside() && colorArray[i].color != brushColor) {
        // console.log("inside");
        colorArray[i].changeColor(brushColor);
      }
    }
    if (!pixelMode) {
      clickPaintBrush(brushColor);
    }
  }
}

function mouseDragged() {
  let isInsidePallete = (
    mouseX >= initialX &&
      mouseX <= initialX + initialSize &&
      mouseY >= initialY  &&
      mouseY <= initialY + initialSize * palleteArray.length
  );
  if (!isInsidePallete) {
    if (!isEraser) {
      console.log("drawing w/", brushColor);
      // console.log("else", colorArray.length);
      for (let i = 0; i < colorArray.length; i++) {
        // console.log(colorArray[i]);
        if (colorArray[i].isInside() && colorArray[i].color != brushColor) {
          // console.log("inside");
          colorArray[i].changeColor(brushColor);
          // renderColor();
        }
      }
      if (!pixelMode) {
        paintBrush(brushColor);
      }
    }
    else {
      console.log("erasing");
      for (let i = 0; i < colorArray.length; i++) {
        // console.log(colorArray[i]);
        if (colorArray[i].isInside()) {
          // console.log("inside");
          colorArray[i].changeColor(canvasColor);
        }
      }
      if (!pixelMode) {
        paintBrush(canvasColor);
      }
    }
  }
}

///////////////////////////////////////////////////////////////
class CanvasSquare {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isEmpty = true;
  }
  draw() {
    push();
    if (!showGrid) {
      noStroke();
    }
    fill(this.color);
    square(this.x, this.y, this.size);
    pop();
  }
  changeColor(newColor) {
    this.isEmpty = false;
    this.color = newColor;
    // console.log("playing note", interpretNote(this.x/CANVAS_WIDTH_SCALING));
    if (newColor != canvasColor) {
      // marimba.triggerAttackRelease(interpretNote(this.x/CANVAS_WIDTH_SCALING), '2n');
      // console.log(notes[this.y / CANVAS_HEIGHT_SCALING]);
      console.log(this.y / TILE_LENGTH);
      synth.triggerAttackRelease(notes[this.y / TILE_LENGTH], '16n')
      this.updateGrid(1);
    }
    else {
      this.updateGrid(0);
    }
    // instrument.triggerAttackRelease(interpretNote(this.x/CANVAS_WIDTH_SCALING), '2n');
  }
  updateGrid(num) {
    gridArray[this.y / TILE_LENGTH][this.x / TILE_LENGTH] = num;
    console.log("updated grid at: ", this.y / TILE_LENGTH, " ", this.x / TILE_LENGTH)
  }
  isInside() {
    let isInsideX = (mouseX >= this.x && mouseX <= this.x + this.size);
    let isInsideY = (mouseY >= this.y && mouseY <= this.y + this.size);

    // console.log("x:", isInsideX);
    // console.log("y:", isInsideY);
    return (isInsideX && isInsideY);
  }
}

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
  // NOTE: this may be misleading as color does not matter to the sound as of now
  musicOnClick() {
    console.log(this.y / TILE_LENGTH);
    synth.triggerAttackRelease(notes[this.y / TILE_LENGTH], '16n')
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
    default:
    console.log("not a shortcut");
  }
}

///////////////////////////////////////////////////////////////
function paintBrush(color) {
  // console.log(color);
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
