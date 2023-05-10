

// ----------------------------------------------------------
// Master volume in decior audio
let synth // The synth that plays notes

// Whether the audio sequence is playing
let playing = false;

// The current Tone.Sequence
let sequence;

// The currently playing column
let currentColumn = 0;

// Here is the fixed scale we will use
// Also can try other scales/notes
// TODO: 2D Array these & change it up every so often
let currentScaleIndex = 0;
// const notes = ["F#4", "E4", "C#4", "A4"];
// const notes = ["A3", "C4", "D4", "E3", "G4"];
let notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];
// const notes = [ "A4", "D3", "E3", "G4", 'F#4' ];
// const notes = ["C5", "A3", "D4", "G4", "A4", "F4"];



// const notes = ["F#4", "E4", "C#4", "A4", "A2", "C4", "D4", "E2", "G4" ];


// Number of rows is the number of different notes
const numRows = notes.length;

// Number of columns is depending on how many notes to play in a measure
const numCols = 16;
const noteInterval = `${numCols}n`;

// Setup audio config
Tone.Transport.bpm.value = 120;


// Create a Row*Col data structure that has nested arrays
// [ [ 0, 0, 0 ], [ 0, 0, 0 ], ... ]
// The data can be 0 (off) or 1 (on)
const data = [];
for (let y = 0; y < numRows; y++) {
  const row = [];
  for (let x = 0; x < numCols; x++) {
    row.push(0);
  }
  data.push(row);
}

// ----------------------------------------------------------
// randomize the sequencer with some data
function randomizeSequencer(chance) {
  // Choose a % chance so that sometimes it is more busy, other times more sparse
  const chanceChance = chance + random(0, 0.5);
  for (let y = 0; y < data.length; y++) {
    // Loop through and create some random on/off values
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
      row[x] = randomGaussian() > chanceChance ? 1 : 0;
    }
    // Loop through again and make sure we don't have two
    // consectutive on values (it sounds bad)
    for (let x = 0; x < row.length - 1; x++) {
      if (row[x] === 1 && row[x + 1] === 1) {
        row[x + 1] = 0;
        x++;
      }
    }
  }
}

// When the button is pressed, turn on the sequencer
function togglePlay() {
  // No synth loaded yet, just skip mouse click
  if (!synth) {
    console.log("no synth");
    return;
  }

  if (playing) {
    // If we are currently playing, we stop the sequencer
    console.log("stop");
    playing = false;
    sequence.stop();
    Tone.Transport.stop();
    // playStopButton.innerHTML = "Unmute"
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

    // playStopButton.innerHTML = "Mute"
  }
}

// Here is where we actually play the audi
function onSequenceStep(time, column) {
  // We build up a list of notes, which will equal
  // the numRows. This gets passed into our PolySynth
  let notesToPlay = [];
  // // console.log("column", column);
  //
  // // Go through each row
  // for (let i = 0; i < gridArray2.length; i++) {
  //   const chance = random(0, 0.05);
  //   if ( gridArray2[i][column] === 1 ) { // if colored
  //     // add randomness for funsies
  //     let rando = randomGaussian() > chance ? 1 : 0;
  //     if (rando === 1) {
  //       // console.log("playing note", notes[i]);
  //       const note = notes[i];
  //       notesToPlay.push(note);
  //     }
  //   }
  // }
  //
  // console.log(column, "note to play", notesToPlay);
  //
  // // Trigger a note
  // const velocity = random(0.5, 1);
  // synth.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);
  // Tone.Draw.schedule(function () {
  //   currentColumn = column;
  // }, time);

  // Go through each row
  data.forEach((row, rowIndex) => {
    // See if the note is "on"
    const isOn = row[column] == 1;
    // If its on, add it to the list of notes to play
    if (isOn) {
      const note = notes[rowIndex];
      notesToPlay.push(note);
    }
  });

  // Trigger a note
  const velocity = random(0.5, 1);
  synth.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);
  Tone.Draw.schedule(function () {
    currentColumn = column;
  }, time);
}

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

