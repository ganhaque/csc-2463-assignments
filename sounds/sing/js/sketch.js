/*
every color has a melody, instrument, and complement
logic:
Big color is melody
if 2big color is > big/2, instrument is color
if other color is > 20%, complement

Mapping:
pink - sweet melody, synth2, snare?
red - chaotic, metal synth, hammer
orange - red but no echo, 
yellow - happy, marimba, snare
light-green - mellow happy, ???, snare
blue - robotic
lavender - calm, marimba, subtle jazz melody
purple - void


Note:
share melody group *same melody diff instrument)
pink-red-orange
yellow-light green- green
cyan-blue-lavender-purple

Instrument set so far
Marimba - good, upbeat

Echo hammer / bell - good complement, first note is always loud???
Hammer - complement, bad hammer
kickDrum - complement
*/

document.addEventListener("DOMContentLoaded", function() {
  const playStopButton = document.getElementById('start-button');
  playStopButton.addEventListener('click', playStopMelody);

  function playStopMelody() {
    if (Tone.Transport.state !== 'started') {
      console.log("start");
      Tone.Transport.start();
    }
    else {
      console.log("stop");
      Tone.Transport.stop();
    }
  }
});

const playSong = [
  {'time': '0:0:0', 'note': 'F3', 'duration': '64n'}, ///////
  {'time': '0:0:3', 'note': 'F3', 'duration': '64n'}, ///////
  {'time': '0:0:6', 'note': 'G3', 'duration': '64n'},  ////////
  {'time': '0:0:9', 'note': 'G3', 'duration': '64n'},  ////////
  {'time': '0:0:16', 'note': 'A3', 'duration': '64n'}, ////////
  {'time': '0:0:22', 'note': 'G3', 'duration': '64n'}, ////////
  {'time': '0:0:32', 'note': 'F3', 'duration': '64n'}, /////////
  {'time': '0:0:35', 'note': 'F3', 'duration': '64n'}, /////////
  {'time': '0:0:38', 'note': 'G3', 'duration': '64n'}, ////////
  {'time': '0:0:41', 'note': 'G3', 'duration': '64n'}, ////////
  {'time': '0:0:48', 'note': 'C3', 'duration': '64n'}, //////
  {'time': '0:0:54', 'note': 'G3', 'duration': '64n'}, ///////
  {'time': '0:0:60', 'note': 'E3', 'duration': '64n'}, //////

]

const playSong2 = [
  {'time': '0:0:0', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:0', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:2', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:2', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:4', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:4', 'note': 'A3', 'duration': '64n'},


  {'time': '0:0:6', 'note': 'G3', 'duration': '64n'}, 
  {'time': '0:0:6', 'note': 'B3', 'duration': '64n'},
  {'time': '0:0:12', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:12', 'note': 'B3', 'duration': '64n'},


  {'time': '0:0:16', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:16', 'note': 'C4', 'duration': '64n'},
  {'time': '0:0:18', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:18', 'note': 'C4', 'duration': '64n'},
  {'time': '0:0:20', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:20', 'note': 'C4', 'duration': '64n'},

  {'time': '0:0:22', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:22', 'note': 'B3', 'duration': '64n'},

  {'time': '0:0:28', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:28', 'note': 'B3', 'duration': '64n'},

  {'time': '0:0:32', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:32', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:34', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:34', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:36', 'note': 'F3', 'duration': '64n'},
  {'time': '0:0:36', 'note': 'A3', 'duration': '64n'},

  {'time': '0:0:38', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:38', 'note': 'B3', 'duration': '64n'},
  {'time': '0:0:44', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:44', 'note': 'B3', 'duration': '64n'},

  {'time': '0:0:48', 'note': 'C4', 'duration': '64n'},
  {'time': '0:0:48', 'note': 'E4', 'duration': '64n'},
  {'time': '0:0:50', 'note': 'B3', 'duration': '64n'},
  {'time': '0:0:50', 'note': 'D4', 'duration': '64n'},
  {'time': '0:0:52', 'note': 'A3', 'duration': '64n'},
  {'time': '0:0:52', 'note': 'C4', 'duration': '64n'},

  {'time': '0:0:54', 'note': 'G3', 'duration': '64n'},
  {'time': '0:0:54', 'note': 'B3', 'duration': '64n'},

  {'time': '0:0:60', 'note': 'E3', 'duration': '64n'}, 
  {'time': '0:0:60', 'note': 'G3', 'duration': '64n'},
]

const playSong3 = [
  {'time': '0:0:0', 'note': 'F2', 'duration': '64n'},
  {'time': '0:0:6', 'note': 'G2', 'duration': '64n'},  
  {'time': '0:0:16', 'note': 'A2', 'duration': '64n'}, 
  {'time': '0:0:22', 'note': 'G2', 'duration': '64n'},
  {'time': '0:0:32', 'note': 'F2', 'duration': '64n'}, 
  {'time': '0:0:38', 'note': 'G2', 'duration': '64n'}, 
  {'time': '0:0:48', 'note': 'C3', 'duration': '64n'}, 
  {'time': '0:0:54', 'note': 'G2', 'duration': '64n'},
  {'time': '0:0:60', 'note': 'E2', 'duration': '64n'}, 
]

const playSong4 = [
  {'time': '0:0:0', 'note': 'F2', 'duration': '64n'},
  {'time': '0:0:3', 'note': 'F2', 'duration': '64n'},
  {'time': '0:0:6', 'note': 'G2', 'duration': '64n'},
  {'time': '0:0:9', 'note': 'G2', 'duration': '64n'},  
  {'time': '0:0:16', 'note': 'G#2', 'duration': '64n'}, 
  {'time': '0:0:22', 'note': 'G2', 'duration': '64n'}, 
  {'time': '0:0:32', 'note': 'F2', 'duration': '64n'}, 
  {'time': '0:0:38', 'note': 'G#2', 'duration': '64n'},
  {'time': '0:0:48', 'note': 'C#3', 'duration': '64n'}, 
  {'time': '0:0:52', 'note': 'C#3', 'duration': '64n'}, 
  {'time': '0:0:54', 'note': 'G2', 'duration': '64n'}, 
  {'time': '0:0:60', 'note': 'F2', 'duration': '64n'}, 

]

const mainMelody = [
  {'time': 0, 'note': 'G4', 'duration': '8n'},
  {'time': '0:0:2', 'note': 'F4', 'duration': '8n'},
  {'time': '0:1', 'note': 'D4', 'duration': '8n.'},
  {'time': '0:2', 'note': 'D4', 'duration': '8n'},
  {'time': '0:2:2', 'note': 'F4', 'duration': '8n.'},
  {'time': '0:3', 'note': 'G4', 'duration': '8n'},
  {'time': '0:3:2', 'note': 'A4', 'duration': '2n'},
  {'time': '2:0', 'note': 'A4', 'duration': '8n'},
  {'time': '2:0:2', 'note': 'G4', 'duration': '8n'},
  {'time': '2:1', 'note': 'F4', 'duration': '8n'},
  {'time': '2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '2:2:2', 'note': 'G4', 'duration': '8n'},
  {'time': '2:3', 'note': 'E4', 'duration': '8n'},
  {'time': '2:3:2', 'note': 'F4', 'duration': '2n'},
  {'time': '4:0', 'note': 'G4', 'duration': '8n'},
  {'time': '4:0:2', 'note': 'F4', 'duration': '8n'},
  {'time': '4:1', 'note': 'D4', 'duration': '8n'},
  {'time': '4:2', 'note': 'F4', 'duration': '8n'},
  {'time': '4:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '4:3', 'note': 'G4', 'duration': '8n'},
  {'time': '4:3:2', 'note': 'A4', 'duration': '2n'},
  {'time': '5:2:2', 'note': 'G4', 'duration': '8n'},
  {'time': '5:3', 'note': 'A4', 'duration': '8n'},
  {'time': '5:3:2', 'note': 'B4', 'duration': '8n'},
  {'time': '6:0', 'note': 'C5', 'duration': '8n'},
  {'time': '6:1', 'note': 'B4', 'duration': '8n'},
  {'time': '6:1:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:2', 'note': 'B4', 'duration': '8n'},
  {'time': '6:2:2', 'note': 'A4', 'duration': '8n'},
  {'time': '6:3', 'note': 'G4', 'duration': '8n'},
  {'time': '6:3:2', 'note': 'A4', 'duration': '1n'},
];

////////////////////////////////////////////////////////////////////////////////////////////////
// create synth
var echoHammer = new Tone.MetalSynth();
var hammer = new Tone.MetalSynth();
var synthJSON = {
  "frequency"  : 45 ,
  "envelope"  : {
    "attack"  : 0.001 ,
    "decay"  : 0.6 ,
    "release"  : 0.6
  }  ,
  "harmonicity"  : 9.5 ,
  "modulationIndex"  : 40 ,
  "resonance"  : 300 ,
  "octaves"  : -1.0,
  "volume" : -24
};

echoHammer.set(synthJSON);
hammer.set(synthJSON);

// create effects
var echofx = new Tone.Freeverb();
effect1JSON = {
  "roomSize": 0.95,
  "dampening": 1200,
  "wet": 0.5
};
echofx.set(effect1JSON);

// make connections
echoHammer.connect(echofx);
echofx.connect(Tone.Master);
hammer.connect(Tone.Master);
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
var marimba = new Tone.Synth().toMaster();
var synthJSON2 = {
  "volume":-5,
  "oscillator": {
    "partials": [
      1,
      0,
      2,
      0,
      3
    ]
  },
  "envelope": {
    "attack": 0.001,
    "decay": 1.2,
    "sustain": 0,
    "release": 1.2
  }
};
marimba.set(synthJSON2);

// instrument.connect(Tone.Master);

// const synth2 = new Tone.Synth({
//   oscillator : {
//     volume: 2,
//     count: 3,
//     spread: 40,
// 		type : "fatsawtooth"
// 	}
// }).toMaster();

const mainMelodyPart = new Tone.Part(function(time, note){
  marimba.triggerAttackRelease(note.note, note.duration, time);
}, playSong).start(0);
// const mainMelodyPart = new Tone.Part(function(time, note){
//   synth2.triggerAttackRelease(note.note, note.duration, time);
// }, mainMelody).start(0);

// const secondMelody = new Tone.Part(function(time, note){
//   marimba.triggerAttackRelease(note.note, note.duration, time);
// }, mainMelody).start(0);

// const third = new Tone.Part(function(time, note){
//   echoHammer.triggerAttackRelease(note.note, note.duration, time);
// }, mainMelody).start(0);

const kickDrum = new Tone.MembraneSynth({
  volume: 2
}).toMaster();

const kicks = [
  { time: '0:0' },
  { time: '0:3:2' },
  { time: '1:1' },
  { time: '2:0' },
  { time: '2:1:2' },
  { time: '2:3:2' },
  { time: '3:0:2' },
  { time: '3:1:' },
  { time: '4:0' },
  { time: '4:3:2' },
  { time: '5:1' },
  { time: '6:0' },
  { time: '6:1:2' },
  { time: '6:3:2' },
  { time: '7:0:2' },
  { time: '7:1:' },
];

const kickPart = new Tone.Part(function(time){
  kickDrum.triggerAttackRelease('C1', '8n', time)
}, kicks).start(0);

// const bassline = [
//   {'time': 0, 'note': 'A0', 'duration': '2n'},
//   {'time': '0:3', 'note': 'F0', 'duration': '2n.'},
//   {'time': '1:3', 'note': 'D0', 'duration': '2n.'},
//   {'time': '2:3', 'note': 'F0', 'duration': '1:1'},
// ];
//
// const bass = new Tone.Synth({
//   oscillator : {
//     type : "triangle"
//   }
// }).toMaster();
//
// const bassPart = new Tone.Part(function(time, note){
//   bass.triggerAttackRelease(note.note, note.duration, time);
// }, bassline).start(0);
////////////////////////////////////////////////////////////////////////////////////////////////

//Canvas properties:
let TILE_LENGTH = 24;
let CANVAS_WIDTH_SCALING = 24;
let CANVAS_HEIGHT_SCALING = 14;
// let CANVAS_WIDTH_SCALING = 8;
// let CANVAS_HEIGHT_SCALING = 6;
let canvasColor = "#080808";

let gridArray = [];
let showGrid = true;
// function drawGrid(column, row) {
//   for (let x = 0; x < width; x += width / column) {
//     for (let y = 0; y < height; y += height / row) {
//       push();
//       stroke(105, 135, 255, 0.90)
//       strokeWeight(1);
//       line(x, 0, x, height);
//       line(0, y, width, y);
//       pop();
//     }
//   }
// }

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
var brushColor = "#FFFFFF"; //default color
var isEraser = false;

// let noteSet = ["C4"]
// let chords = [
// { "time": "0:0", "note": ["C4", "E3", "G4"] },
// { "time": "0:3", "note": ["F4", "A4", "C4"] },
// { "time": "1:1", "note": ["G4", "A3", "D4"] },
// { "time": "1:2", "note": ["G4", "B4", "F4"] }
// ]
function interpretTime(j) {
  const row = Math.floor(j / 4);
  const col = j % 4;
  return `${row}:${col}`;
}

function interpretNote(i) {
  const letters = ["A", "B", "C", "D", "E", "F", "G"];
  const row = Math.floor(i / 7) + 2;
  const col = letters[i % 7];
  return `${col}${row}`;
}

function getChords() {
  let chords = [];
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 0; j < gridArray[i].length; j++) {
      const time = interpretTime(j);
      const note = interpretNote(i);
      const notesArray = gridArray[i][j].filter(x => x); // remove any falsy values (like null or undefined)
      if (notesArray.length > 0) {
        chords.push({ time: time, note: notesArray.map(n => [note, n]) });
      }
      // console.log("j is", j);
    }
  }
  return chords;
}

function playMelody() {
  // for (i = 0; i < CANVAS_WIDTH_SCALING; i++) {
  //   setTimeout(playRow(i), 1000);
  // }

  // Tone.start();
  // instrumentSet["#ff7eb6"].triggerAttackRelease(interpretNote(0), "4n");
  playFirstRow();
  // SYNTH.triggerAttackRelease("C4", "4n");
}
function playFirstRow() {
  for(let i = 0; i < gridArray.length; i++) {
    console.log("first row proc");
    let currentColor = colorArray[i*(CANVAS_WIDTH_SCALING-1)].color;
    console.log(currentColor);
    instrumentSet[currentColor].triggerAttackRelease(interpretNote(1), "8n");
  }
}


function playRow(j) {
  for (let i = 0; i < gridArray.length; i++) {
    let currentRowColor = colorArray[i*(CANVAS_WIDTH_SCALING-1)].color;
    switch(currentRowColor) {
      case "#ff7eb6":
        instrumentSet[currentRowColor].triggerAttack(interpretNote(j))



        break;
      default:

    }
    // if (colorArray[i*CANVAS_WIDTH_SCALING].getColor() != canvasColor) {
    //
    // }
  }
}

const SYNTH = new Tone.Synth().toDestination();
const DUO_SYNTH = new Tone.DuoSynth();
const FM_SYNTH = new Tone.FMSynth();
const MEMBRANE_SYNTH = new Tone.MembraneSynth();
const METAL_SYNTH = new Tone.MetalSynth().toDestination();
const MONO_SYNTH = new Tone.MonoSynth();
const PLUCK_SYNTH = new Tone.PluckSynth(); // does not have envelope

let instrumentSet = {
  canvasColor: SYNTH,
  "#ff7eb6": SYNTH,
  "#E95678": DUO_SYNTH,
  "#ff9e64": FM_SYNTH,
  "#f6ca6b": marimba,
  "#bae881": "C4",
  "#2ee6a6": "C4",
  "#59e1e3": "C4",
  "#78a9ff": "C4",
  "#b4befe": "C4",
  "#be95ff": "C4",
  "#FFFFFF": marimba,
  "#000000": "C4",
}
// var brushStrokeArray = [ 0.5, 0.7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 20, 26, 32, 42, 56, 72, 86, 100, 126, 156, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 2000 ];
// var brushStrokeIndex = 11;
// var brushStroke = brushStrokeArray[brushStrokeIndex];
//Pallete properties:
var initialX = 0;
var initialY = 0;
var initialSize = TILE_LENGTH;

var colorArray = [];

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
  createCanvas(TILE_LENGTH*CANVAS_WIDTH_SCALING, TILE_LENGTH*CANVAS_HEIGHT_SCALING);
  // createCanvas(canvasWidth, canvasHeight);
  colorPallete.forEach(initialize_color_pallete)

  background(canvasColor);
  // if(showGrid) {
  //   drawGrid(CANVAS_WIDTH_SCALING, CANVAS_HEIGHT_SCALING, 'rgb(20, 20, 255, 0.75)');
  // }

  for(let i = 0; i <= height / TILE_LENGTH; i++) {
    gridArray.push(new Array(width / TILE_LENGTH).fill(0));
    // console.log("curren array[i][j] = ", gridArray[i]);
  }

  initialize_grid();
}

function draw() {

  // drawGrid(CANVAS_WIDTH_SCALING, CANVAS_HEIGHT_SCALING, 'rgb(20, 20, 255, 0.75)');
  for(let i = 0; i < colorArray.length; i++) {
    colorArray[i].draw();
  }
  for(let i = 0; i < palleteArray.length; i++) {
    palleteArray[i].draw();
  }
}

///////////////////////////////////////////////////////////////
function initialize_grid() {
  // console.log("i length is", gridArray.length);
  // console.log("j length is", gridArray[0].length);
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 1; j < gridArray[i].length; j++) {
      // console.log("j is", j);
      switch(gridArray[i][j]) {
        case 0:
          // console.log("empty square created at [%d][%d]", i, j);
          colorArray.push( new CanvasSquare(
            j * TILE_LENGTH, i * TILE_LENGTH, TILE_LENGTH, canvasColor
          ))
          break;
        case 1:
          console.log("BABA IS AT [%d][%d]", i, j );
          characterArray.push( new Character(
            spriteSheet,
            TILE_LENGTH * j, TILE_LENGTH * i, //location
            TILE_LENGTH, TILE_LENGTH, //size
            5, //animation length
            3, //variation amount
            1, //character ID
          )
          )
          break;
        default:
      }
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
        console.log("color:", brushColor);
      }
    }
  }
  else if (isEraser){
    // clickPaintBrush(canvasColor);
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      if (colorArray[i].isInside()) {
        // console.log("inside");
        colorArray[i].changeColor(canvasColor);
      }
    }
  }
  else {
    // console.log("else", colorArray.length);
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      // if (colorArray[i].isInside()) {
      if (colorArray[i].isInside() && colorArray[i].color != brushColor) {
        // console.log("inside");
        colorArray[i].changeColor(brushColor);
      }
    }
    // clickPaintBrush(brushColor);
  }
}

// TODO: mouse pressed Tone.transport.start
// TODO: mouse released Tone.transport.stop
// depending ont the selected color, play different melody and/or instruments
// TODO: clicking on pallete square also play a sound
// MAYBE: count amount of tile and change sound
// TODO: Recalculate when mouse is released

function mouseReleased() {

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
      // console.log("drawing w/", brushColor, "at size", brushStrokeArray[brushStrokeIndex]);
      // paintBrush(brushColor);

      // console.log("else", colorArray.length);
      for (let i = 0; i < colorArray.length; i++) {
        // console.log(colorArray[i]);
        if (colorArray[i].isInside() && colorArray[i].color != brushColor) {
          // console.log("inside");
          colorArray[i].changeColor(brushColor);
          // renderColor();
        }
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
      // paintBrush(canvasColor);
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
    console.log("playing note", interpretNote(this.x/CANVAS_WIDTH_SCALING));
    if (newColor != canvasColor) {
      instrumentSet[newColor].triggerAttackRelease(interpretNote(this.x/CANVAS_WIDTH_SCALING), '2n');
    }
    // instrument.triggerAttackRelease(interpretNote(this.x/CANVAS_WIDTH_SCALING), '2n');
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
    // case 'q':
    //   console.log("q is pressed")
    //   //decrease brush size
    //   if(brushStrokeIndex >= 1) {
    //     brushStrokeIndex -= 1;
    //     console.log("brush size:", brushStrokeArray[brushStrokeIndex]);
    //   }
    //   else {
    //     console.log("cannot decrease brush stroke further")
    //   }
    //   break;
    // case 'w':
    //   console.log("w is pressed")
    //   //decrease brush size
    //   if(brushStrokeIndex < brushStrokeArray.length -1) {
    //     brushStrokeIndex += 1;
    //     console.log("brush size:", brushStrokeArray[brushStrokeIndex]);
    //   }
    //   else {
    //     console.log("cannot increase brush stroke further")
    //   }
    //   break;
    case ' ':
      console.log("<leader> is pressed")
      Tone.start();
      //statusbar toggle
      // if(displayStatusBar) {
      //   console.log("disabled statusbar")
      //   displayStatusBar = false;
      //   deleteStatusBar();
      // }
      // else {
      //   console.log("statusbar enabled")
      //   displayStatusBar = true;
      // }
      break;
    default:
    console.log("not a shortcut");
  }
}

///////////////////////////////////////////////////////////////
// function paintBrush(color) {
//   push();
//   stroke(color);
//   strokeWeight(brushStrokeArray[brushStrokeIndex]);
//   line(pmouseX, pmouseY, mouseX, mouseY);
//   pop();
// }
// function clickPaintBrush(color) {
//   push();
//   noStroke();
//   fill(color);
//   circle(mouseX, mouseY, brushStrokeArray[brushStrokeIndex]);
//   pop();
// }
///////////////////////////////////////////////////////////////
