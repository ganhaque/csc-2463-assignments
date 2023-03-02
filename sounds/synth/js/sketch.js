const SYNTH = new Tone.Synth();
const DUO_SYNTH = new Tone.DuoSynth();
const FM_SYNTH = new Tone.FMSynth();
const MEMBRANE_SYNTH = new Tone.MembraneSynth();
const METAL_SYNTH = new Tone.MetalSynth();
const MONO_SYNTH = new Tone.MonoSynth();
const PLUCK_SYNTH = new Tone.PluckSynth(); // does not have envelope

let instrumentArray = ["0 is far", SYNTH, DUO_SYNTH, FM_SYNTH, MEMBRANE_SYNTH, METAL_SYNTH, MONO_SYNTH, PLUCK_SYNTH];
let currentInstrument = 1;

let note4 = {
  'g': 'C4',
  'h': 'D4',
  'j': 'E4',
  'k': 'F4',
  'l': 'G4',
  ';': 'A4',
  '\'': 'B4',
  'p': 'C5',
}

let note5 = {
  'g': 'C5',
  'h': 'D5',
  'j': 'E5',
  'k': 'F5',
  'l': 'G5',
  ';': 'A5',
  '\'': 'B5',
}

let customNotes = { // ???
  'g': 'C5',
  'h': 'D5',
  'j': 'E5',
  'k': 'F5',
  'l': 'G5',
  ';': 'A5',
  '\'': 'B5',
  // 'z': 'F#1',
  // 'x': 'G1',
  // 'c': 'Ab1',
  // 'v': 'A1',
  // 'b': 'Bb1',
  // 'n': 'G2',
  // 'm' : 'A2',
  // ',' : 'Bb2',
  // '.' : 'C3',
  // '/' : 'D5',
  // '\'' : 'Ab3',
  // ';' : 'G3',
  // 'l' : 'F#3',
  // 'k' : 'F3',
}

let notes = [note4, note5, customNotes];
let currentNote = 0;

const VOLUME = new Tone.Volume(-12);

let addMode = true;
let frequencyValue = 440;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function keyPressed() {
  console.log("Pressed:", key);
  // console.log("You've pressed: f");
  switch(key) {
    case '[':
      currentNote = 0;
      // instrumentArray[currentInstrument].connect(VOLUME);
      // VOLUME.toDestination();
      break;
    case ']':
      currentNote = 1;
      // instrumentArray[currentInstrument].connect(VOLUME);
      // VOLUME.toDestination();
      break;
    case '1':
      currentInstrument = 1;
      instrumentArray[currentInstrument].connect(VOLUME);
      VOLUME.toDestination();
      break;
    case '2':
      currentInstrument = 2;
      instrumentArray[currentInstrument].connect(VOLUME);
      VOLUME.toDestination();
      break;
    case '3':
      currentInstrument = 3;
      instrumentArray[currentInstrument].connect(VOLUME);
      VOLUME.toDestination();
      break;
    case '4':
      currentInstrument = 4;
      instrumentArray[currentInstrument].connect(VOLUME);
      VOLUME.toDestination();
      break;
    case '5':
      currentInstrument = 5;
      instrumentArray[currentInstrument].connect(VOLUME);
      VOLUME.toDestination();
      break;
    case '6':
      currentInstrument = 6;
      instrumentArray[currentInstrument].connect(VOLUME);
      VOLUME.toDestination();
      break;
    case '-':
      if (addMode) {
        console.log("subtract mode activated");
        addMode = false;
      }
      break;
    case '+':
      if (!addMode) {
        console.log("add mode activated");
        addMode = true;
      }
      break;
    case '=':
      if (!addMode) {
        console.log("add mode activated");
        addMode = true;
      }
      break;

    case 'q':
      // if (addMode) {
      // if (instrumentArray[currentInstrument].harmonicity.value <= (2 - harmonicityIncrementValue)) {
      instrumentArray[currentInstrument].harmonicity.value -= 1;
      console.log(instrumentArray[currentInstrument].harmonicity.value);
      // }
      // }
      // else {
      // if (instrumentArray[currentInstrument].harmonicity.value >= harmonicityIncrementValue) {
      // instrumentArray[currentInstrument].harmonicity.value -= harmonicityIncrementValue;
      // console.log(instrumentArray[currentInstrument].harmonicity.value);
      // }
      // }
      break;
    case 'w':
      // if (addMode) {
      // if (instrumentArray[currentInstrument].harmonicity.value <= (2 - harmonicityIncrementValue)) {
      instrumentArray[currentInstrument].harmonicity.value += 1;
      console.log(instrumentArray[currentInstrument].harmonicity.value);
      break;
    case 'a':
      let attackIncrementValue = 0.2;
      if (addMode) {
        if (instrumentArray[currentInstrument].envelope.attack <= (2 - attackIncrementValue)) {
          instrumentArray[currentInstrument].envelope.attack += attackIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.attack);
        }
      }
      else {
        if (instrumentArray[currentInstrument].envelope.attack >= attackIncrementValue) {
          instrumentArray[currentInstrument].envelope.attack -= attackIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.attack);
        }
      }
      break;
    case 'd':
      // let decayIncrementValue = 0.1;
      let decayIncrementValue = 0.2;
      if (addMode) {
        if (instrumentArray[currentInstrument].envelope.decay <= (2 - decayIncrementValue)) {
          instrumentArray[currentInstrument].envelope.decay += decayIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.decay);
        }
      }
      else {
        if (instrumentArray[currentInstrument].envelope.decay >= decayIncrementValue) {
          instrumentArray[currentInstrument].envelope.decay -= decayIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.decay);
        }
      }
      break;
    case 's':
      // let sustainIncrementValue = 0.1;
      let sustainIncrementValue = 0.1;
      if (addMode) {
        if (instrumentArray[currentInstrument].envelope.sustain <= 1 - sustainIncrementValue) {
          instrumentArray[currentInstrument].envelope.sustain += sustainIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.sustain);
        }
      }
      else {
        if (instrumentArray[currentInstrument].envelope.sustain >= sustainIncrementValue) {
          instrumentArray[currentInstrument].envelope.sustain -= sustainIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.sustain);
        }
      }
      break;
    case 'r':
      // let releaseIncrementValue = 0.1;
      let releaseIncrementValue = 1;
      if (addMode) {
        if (instrumentArray[currentInstrument].envelope.release <= 5 - releaseIncrementValue) {
          instrumentArray[currentInstrument].envelope.release += releaseIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.release);
        }
      }
      else {
        if (instrumentArray[currentInstrument].envelope.release >= releaseIncrementValue) {
          instrumentArray[currentInstrument].envelope.release -= releaseIncrementValue;
          console.log(instrumentArray[currentInstrument].envelope.release);
        }
      }
      break;
    // case moveRightKey:
    //   this.rightMovement();
    //   break;
    // case moveDownKey:
    //   this.downMovement();
    //   break;
    // case moveUpKey:
    //   this.upMovement();
    //   break;
    default:
    // console.log("not a shortcut key")
  }
  let whatNote = notes[currentNote][key];
  // console.log(whatNote);
  // instrumentArray[currentInstrument].harmonicity.value = 0.3;
  instrumentArray[currentInstrument].triggerAttack(whatNote);
}

function keyReleased() {
  instrumentArray[currentInstrument].triggerRelease();
}

// let sound1 = new Tone.Player("sounds/chicken.wav");
let CANVAS_COLOR = "#11111B";

// const DELAY = new Tone.FeedbackDelay("8n", 0.5);
// const DISTORTION = new Tone.Distortion(1.0);

// let buttons = [];

let volumeSlider;
let delaySlider;
let feedbackSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  instrumentArray[currentInstrument].connect(VOLUME);
  VOLUME.toDestination();
  // instrumentArray[currentInstrument].toDestination();

  // console.log("frequency value: ", instrumentArray[currentInstrument].frequency.value);

  volumeSlider = createSlider(-50, 0, -12, 1);
  volumeSlider.mouseReleased( () => {
    VOLUME.volume.value = volumeSlider.value();
    console.log("slider value", VOLUME.volume.value);
  })

}

function draw() {
  background(CANVAS_COLOR);

}

function playSound(whichSound) {
  sounds.player(whichSound).start();
}
