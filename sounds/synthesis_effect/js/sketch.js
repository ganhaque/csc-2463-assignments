// const VOLUME = new Tone.Volume(-12);
let ornn;

function preload() {
  ornn = loadImage('../assets/Ornn_0.jpg')
}


// let CANVAS_COLOR = "#11111B";

function setup() {
  createCanvas(1215, 717);
  image(ornn, 0, 0);
  // VOLUME.toDestination();
  // instrumentArray[currentInstrument].toDestination();

  // console.log("frequency value: ", instrumentArray[currentInstrument].frequency.value);

  // volumeSlider = createSlider(-26, 0, -26, 1);
  // volumeSlider.mouseReleased( () => {
  //   instrument.volume.value = volumeSlider.value();
  //   console.log("slider value", instrument.volume.value);
  // })
}

function draw() {
}

////////////////////////////////////////////////////////////////////////////////////////////////
// create synth
var instrument = new Tone.MetalSynth();
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
  "volume" : -20
};

instrument.set(synthJSON);

var effect1;

// create effects
var effect1 = new Tone.Freeverb();
effect1JSON = {
  "roomSize": 0.95,
  "dampening": 1200,
  "wet": 0.5
};
effect1.set(effect1JSON);


// make connections
instrument.connect(effect1);
effect1.connect(Tone.Master);

// define deep dispose function
function deep_dispose() {
  if(effect1 != undefined && effect1 != null) {
    effect1.dispose();
    effect1 = null;
  }
  if(instrument != undefined && instrument != null) {
    instrument.dispose();
    instrument = null;
  }
}

let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8
}).toDestination();
instrument.connect(ampEnv);

function keyPressed() {
  if (keyCode === 32 && initTone === true) {
    console.log('spacebar pressed');
    Tone.start();
    initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  // let noteArrays = ['C1', 'C2', 'C3', 'C4']
  let rando = random();
  let rando1 = random();
  let rando3 = random();
  let rando4 = random();
  console.log("random value is ", rando4);
  let rando2 = random(0.5, 1);
  effect1JSON = {
    // "roomSize": 0.95,
    // "dampening": 1200,
    "wet": rando2
  };
  effect1.set(effect1JSON);
  if (rando1 > 0.3) {
    instrument.triggerAttackRelease('C4', '2n');
  }
  if (rando > 0.3) {
    instrument.triggerAttackRelease('C1', '4n');
  }
  if (rando3 > 0.4) {
    instrument.triggerAttackRelease('C3', '6n');
  }

  if (rando4 > 0.8) {
    instrument.triggerAttackRelease('B3');
  }
  else if (rando4 > 0.6) {
    instrument.triggerAttackRelease('D2');
  }
  else if (rando4 > 0.4) {
    instrument.triggerAttackRelease('C1');
  }
  else if (rando4 > 0.2) {
    instrument.triggerAttackRelease('A3');
  }
  else {
    instrument.triggerAttackRelease('C5');
  }
  // instrument.triggerAttackRelease('C5', '2n');
  // instrument.triggerAttackRelease('C1', '4n');
  // instrument.triggerAttackRelease('C3', '6n');
  // instrument.triggerAttackRelease('A2', '2n');
  // instrument.triggerAttackRelease('C2+mouseX', '6n');
  // ampEnv.triggerAttackRelease('4n');
  // instrument.frequency.setValueAtTime(200, '+1');
  // ampEnv.triggerAttackRelease('4n', '+1');
}

