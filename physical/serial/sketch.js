// import { initialize_grid, initialize_color_pallete } from "./helper";

let TILE_LENGTH = 24;
let CANVAS_WIDTH_SCALING = 24;
let CANVAS_HEIGHT_SCALING = 12;
let canvasColor = "#080808";

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


var brushColorIndex = 8;
var brushColor = colorPallete[brushColorIndex];
var isEraser = false;


let cargo = {
  active: false,
  red: colorPaletteRGB[brushColorIndex][0],
  green: colorPaletteRGB[brushColorIndex][1],
  blue: colorPaletteRGB[brushColorIndex][2],
}
console.log(cargo);

var colorArray = [];

let gridArray = [];
let showGrid = true;
let pixelMode = true;

var initialX = 0;
var initialY = 0;
var initialSize = TILE_LENGTH;

function setup() {
  createCanvas(TILE_LENGTH * CANVAS_WIDTH_SCALING, TILE_LENGTH * CANVAS_HEIGHT_SCALING);
  background(canvasColor);

  colorPallete.forEach(initialize_color_pallete)

  for(let i = 0; i <= height / TILE_LENGTH; i++) {
    gridArray.push(new Array(width / TILE_LENGTH).fill(0));
    // console.log("curren array[i][j] = ", gridArray[i]);
  }

  initialize_grid();

  


  // if ("serial" in navigator) {
  // // The Web Serial API is supported.
  // let button = createButton("connect");
  // button.position(0,0);
  // button.mousePressed(connect);
  // }
}

function draw() {
  // background(220);

  // render pallete
  for(let i = 0; i < palleteArray.length; i++) {
    palleteArray[i].draw();
  }

  if (pixelMode) {
    for(let i = 0; i < colorArray.length; i++) {
      colorArray[i].draw();
    }
  }
  else {
  }

  if (reader) {
    // console.log("reader is available");
    serialRead();
  }
  

  
  // if (writer) {
    // serialWrite(cargo);
    // console.log(cargo);
  // }

  // if (activationState.active) {
  // text("cm: " + sensorData.cm, 10, 100);
  // text("inches: " + sensorData.inches, 10, 150);
  // }
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
