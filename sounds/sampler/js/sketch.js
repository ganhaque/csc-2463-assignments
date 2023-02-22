// let sound1 = new Tone.Player("sounds/chicken.wav");
let CANVAS_COLOR = "#11111B";

let sounds = new Tone.Players({
  "teddy": "assets/Teddy_Guard.wav",
  "woo": "assets/Wooo.mp3",
  "musicbox": "assets/Teddy_On.wav",
  "victory": "assets/021.ogg",
  "mystery": "assets/022.ogg"
})

const DELAY = new Tone.FeedbackDelay("8n", 0.5);
const DISTORTION = new Tone.Distortion(1.0);

let soundNames = ["teddy", "woo", "musicbox", "victory", "mystery"];
let buttons = [];

let delaySlider;
let feedbackSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(DELAY);
  DELAY.toDestination();
  sounds.connect(DISTORTION);
  DISTORTION.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(20, index*30 + 10);
    buttons[index].mousePressed( () => playSound(word))
  })

  delaySlider = createSlider(0., 1., 0.0, 0.05);
  delaySlider.mouseReleased( () => {
    DELAY.delayTime.value = delaySlider.value();
  })

  feedbackSlider = createSlider(0., 1., 0.0, 0.05);
  feedbackSlider.mouseReleased( () => {
    DELAY.feedback.value = feedbackSlider.value();
    console.log("slider value", DELAY.feedback.value);
  })

  distortionSlider = createSlider(0, 1, 0.2, 0.05);
  distortionSlider.mouseReleased( () => {
    DISTORTION.distortion = distortionSlider.value();
    // console.log("bef value", distortionSlider.value());
    console.log("slider value", DISTORTION.distortion);
  })
}

function draw() {
  background(CANVAS_COLOR);
  fill("#ffffff");
  text('press the buttons for sounds', 120, 20)
  text('first slider is for delay', 120, 40)
  text('second slider is for feedback value', 120, 56)
  text('third slider is for DIstOrTiON', 120, 72)

}

function playSound(whichSound) {
  sounds.player(whichSound).start();
}
