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
const notes = ["F#4", "E4", "C#4", "A4"];
// const notes = ["A3", "C4", "D4", "E3", "G4"];
// const notes = ['A3', 'C4', 'D4', 'E4', 'G4', 'A4'];
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

// const dim = Math.min(width, height)


//----------------------------------------------------------------------
// Create a new canvas to the browser size
sketch.setup = async function() {
  // Create a new canvas to the browser size
  sketch.createCanvas(width, height);

  // Clear with black on setup
  sketch.background("#001b42");

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
  synth = new Tone.PolySynth({numRows}, Tone.DuoSynth);   

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
    randomizeSequencer();
  }, "2m");
}

//---------------------------------------------------------------------
// Render loop that draws shapes with p5
sketch.draw = function() {
  // Our synth isn't loaded yet, don't draw anything
  if (!synth) return;

  // blue background
  sketch.background("#001b42");

  if (playing) {
    // The audio is playing so we can show the sequencer
    const margin = dim * 0.2;
    const innerSize = dim - margin * 2;
    const cellSize = innerSize / numCols;

    sketch.push();
    sketch.translate(width / 2 - dim / 2, height / 2 - dim / 2);
    // Loop through the nested data structure, drawing each note
    for (let y = 0; y < data.length; y++) {
      const row = data[y];
      for (let x = 0; x < row.length; x++) {
        const u = x / (numCols - 1);
        const v = y / (numRows - 1);
        let px = sketch.lerp(margin, dim - margin, u);
        let py = sketch.lerp(margin, dim - margin, v);

        sketch.noStroke();
        sketch.noFill();

        // note on=fill, note off=stroke
        if (row[x] === 1) sketch.fill(255);
        else sketch.stroke(255);

        // draw note
        sketch.circle(px, py, cellSize / 2);

        // draw a rectangle around the currently playing column
        if (x === currentColumn) {
          sketch.rectMode(sketch.CENTER);
          sketch.rect(px, py, cellSize, cellSize);
        }
      }
    }
    sketch.pop();

  } else {
    // Draw a 'play' button
    sketch.noStroke();
    sketch.fill(255);
    polygon(width / 2, height / 2, dim * 0.1, 3);
  }
}

// ----------------------------------------------------------
// Here we randomize the sequencer with some data
function randomizeSequencer() {
  // Choose a % chance so that sometimes it is more busy, other times more sparse
  const chance = sketch.random(0.5, 1.5);
  for (let y = 0; y < data.length; y++) {
    // Loop through and create some random on/off values
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
      row[x] = sketch.randomGaussian() > chance ? 1 : 0;
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

// ----------------------------------------------------------
// When the mouse is pressed, turn on the sequencer
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
  } else {
    // If we aren't currently playing, we can start the sequence

    // We do this by creating an array of indices [ 0, 1, 2 ... 15 ]
    const noteIndices = newArray(numCols);
    // create the sequence, passing onSequenceStep function
    sequence = new Tone.Sequence(onSequenceStep, noteIndices, noteInterval);

    // Start the sequence and Transport loop
    playing = true;
    sequence.start();
    Tone.Transport.start();
  }
}


// -----------------------------------------------------------------------------------
// Draw a basic polygon, handles triangles, squares, pentagons, etc
function polygon(x, y, radius, sides = 3, angle = 0) {
  sketch.beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + Math.cos(a) * radius;
    let sy = y + Math.sin(a) * radius;
    sketch.vertex(sx, sy);
  }
  sketch.endShape(sketch.CLOSE);
}  

// -----------------------------------------------------------------------------------
// Here is where we actually play the audi
function onSequenceStep(time, column) {
  // We build up a list of notes, which will equal
  // the numRows. This gets passed into our PolySynth
  let notesToPlay = [];

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
  const velocity = sketch.random(0.5, 1);
  synth.triggerAttackRelease(notesToPlay, noteInterval, time, velocity);
  Tone.Draw.schedule(function () {
    currentColumn = column;
  }, time);
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

