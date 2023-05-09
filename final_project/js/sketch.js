// import { initialize_grid, initialize_color_pallete } from "./helper";

let TILE_LENGTH = 24;
let CANVAS_WIDTH_SCALING = 24;
let CANVAS_HEIGHT_SCALING = 16;
let canvasColor = "#080808";

let volume = -12;
// let synth // The synth that plays notes
// Whether the audio sequence is playing
// let playing = false;
// The current Tone.Sequence
// let sequence;
// The currently playing column
// let currentColumn = 0;
const palleteNotes = ["F#4", "E4", "C#4", "A4", "A3", "C4", "D4", "E4", "G4" ];


// Number of rows is the number of different notes
// const CANVAS_HEIGHT_SCALING = notes.length;
// Number of columns is depending on how many notes to play in a measure
// const numCols = CANVAS_WIDTH_SCALING;
// const noteInterval = `${numCols}n`;
// Setup audio config
// Tone.Transport.bpm.value = 120;

// document.addEventListener("DOMContentLoaded", function() {
//   const pixelToggleButton = document.getElementById('pixel-toggle-button');
//   pixelToggleButton.addEventListener('click', () => {
//     pixelMode = !pixelMode;
//   });
// });
//
// document.addEventListener("DOMContentLoaded", function() {
//   const gridToggleButton = document.getElementById('grid-toggle-button');
//   gridToggleButton.addEventListener('click', () => {
//     showGrid = !showGrid;
//   });
// });

let port;
let writer, reader;
let slider; 
let red, green, blue;
let sensorData = {};
const encoder = new TextEncoder();
const decorder = new TextDecoder();

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

var palleteArray = [];
let colorPaletteRGB = [];
for (let i = 0; i < colorPallete.length; i++) {
  let hex = colorPallete[i].substring(1); // remove the # at the beginning of the hex code
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  colorPaletteRGB.push([r, g, b]);
}
console.log(colorPaletteRGB);
console.log(colorPaletteRGB[1][1]);


var brushColorIndex = 0;
var brushColor = colorPallete[brushColorIndex];
var isEraser = false;
// var brushStrokeArray = [ 0.5, 0.7, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 20, 26, 32, 42, 56, 72, 86, 100, 126, 156, 200, 250, 300, 400, 500, 600, 700, 800, 900, 1000, 2000 ];
// var brushStrokeIndex = 12;

let cargo = {
  active: false,
  red: colorPaletteRGB[brushColorIndex][0],
  green: colorPaletteRGB[brushColorIndex][1],
  blue: colorPaletteRGB[brushColorIndex][2],
}
console.log(cargo);

var colorArray = [];

// store characters
let gridArray = [];
// store color square
let gridArray2 = [];

// NOTE: not used, dev only
let showGrid = true;
let pixelMode = true;

// For pallete squares
var initialX = 0;
var initialY = 0;
var initialSize = TILE_LENGTH;

// NOTE: unused, unless want to spawn enemy at the start (dev only)
let enemyAmount = 3;

// TODO:

let scoreData = { score: 0, highScore: 0 };
// let gameData = { timePerLevel: 10, elapsedTime: 0, amountOfBug: 16, state: GAME_STATE.StartingScreen };

// mode:
// baba-paint: basic paint application
// ink-game: splatoon-like game w/ dum enemies & allies
let gameData = { timePerLevel: 24, elapsedTime: 0, enemyAmount: 27, allyAmount: 2, mode: 'baba-paint' };

function preload() {
  spriteSheet = loadImage("./assets/gameplay_sprites.png");
}

async function setup() {
  createCanvas(TILE_LENGTH * CANVAS_WIDTH_SCALING, TILE_LENGTH * CANVAS_HEIGHT_SCALING);
  background(canvasColor);

  colorPallete.forEach(initialize_color_pallete)

  for(let i = 0; i <= CANVAS_HEIGHT_SCALING; i++) {
    gridArray.push(new Array(CANVAS_WIDTH_SCALING).fill(0));
    gridArray2.push(new Array(CANVAS_WIDTH_SCALING).fill(0));
    // console.log("curren array[i][j] = ", gridArray[i]);
  }


  console.log(gridArray);

  initialize_grid();
  // player
  gridArray[3][3] = 1;
  // enemy
  // gridArray[11][9] = 2;
  // gridArray[10][12] = 3;

  renderCharacter();

  // for (let i = 0; i < enemyAmount; i++) {
  //   spawnEnemy();
  // }

  // random enemy movement every second
  setInterval(randomEnemyMovement, 250);

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

  // Every two measures, we randomize the notes
  // We use Transport to schedule timer since it has to be exactly in sync with the audio
  Tone.Transport.scheduleRepeat(() => {
    randomizeSequencer(mapCounterToChance(countGrid()));
  }, "2m");

  Tone.start();
  togglePlay();
}

function draw() {
  if (gameData.mode === 'ink-game') {
    let currentTime = gameData.timePerLevel - gameData.elapsedTime;
    gameData.elapsedTime += deltaTime / 1000;
    // console.log(gameData.elapsedTime);
    if (ceil(currentTime) !== timerDiv.innerHTML) {
      // console.log(ceil(currentTime));
      timerDiv.innerHTML = "Time remaining: " + ceil(currentTime);
    }

    let isAllFilled = countGrid() >= ((CANVAS_WIDTH_SCALING - 1) * (CANVAS_HEIGHT_SCALING));
    let isTimeRunOut = currentTime <= 0;
    if (isAllFilled || isTimeRunOut) {
      // console.log("all square are filled");
      console.log('game done');
      finishhInkGame();
    }
  }

  // render pallete
  for(let i = 0; i < palleteArray.length; i++) {
    palleteArray[i].draw();
  }
  // render color square
  for(let i = 0; i < colorArray.length; i++) {
    colorArray[i].draw();
  }

  // draw player & enemy
  for(let i = 0; i < characterArray.length; i++) {
    characterArray[i].draw();
  }
  for(let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].draw();
  }

  // current color indicator
  let currentColorSquare = new PalleteSquare(initialX, (CANVAS_HEIGHT_SCALING - 1) * TILE_LENGTH, initialSize, colorPallete[brushColorIndex]);
  currentColorSquare.draw();

  if (reader) {
    // console.log("reader is available");
    serialRead();
  }
}

//////////////////////////////////////

// write to arduino in json
function serialWrite(jsonObject) {
  if (writer) {
    // console.log("writer", jsonObject);
    // console.log(JSON.stringify(jsonObject)+"\n");
    writer.write(encoder.encode(JSON.stringify(jsonObject)+"\n"));
  }
}

function keyTyped() {
  if (key === 'a') {
    // activationState.active = !activationState.active;
    serialWrite(cargo);
  }
}

// read from arduino
async function serialRead() {
  while(true) {
    // console.log("call serial read");
    const { value, done } = await reader.read();

    if (done) {
      console.log("done");
      reader.releaseLock();
      break;
    }
    // console.log("read");
    console.log(value);
    sensorData = JSON.parse(value);
    if (sensorData.next) {
      nextColor();
    }

    if (sensorData.movement = 'LEFT') {
      for(let i = 0; i < characterArray.length; i++) {
        characterArray[i].leftMovement();
      }
    }
    if (sensorData.movement = 'RIGHT') {
      for(let i = 0; i < characterArray.length; i++) {
        characterArray[i].rightMovement();
      }
    }
    if (sensorData.movement = 'UP') {
      for(let i = 0; i < characterArray.length; i++) {
        characterArray[i].upMovement();
      }
    }
    if (sensorData.movement = 'DOWN') {
      for(let i = 0; i < characterArray.length; i++) {
        characterArray[i].downMovement();
      }
    }
  }
}

async function connect() {
  console.log("connect call");
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
  console.log("Reader is", reader);
}

class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}

//////////////////////////////////////
// function paintBrush(color) {
//   // console.log(color);
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
