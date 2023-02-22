//Canvas properties:
let CANVAS_WIDTH = 2000;
let CANVAS_HEIGHT = 1200;
let CANVAS_COLOR = "#11111B";
// let TILE_LENGTH = 32;

let characterArray = []
let wordArray = []
let bugArray = []

let needUpdateWord = false;
let needUpdateCharacter = false;
let gridArray = [];
let moveSoundCounter = 0;
let moveSoundArray = [];

let bugLevel = 0;
const GAME_STATE = {
  StartingScreen: "StartingScreen",
  Playing: "Playing",
  GameOver: "GameOver"
};

let scoreData = { score: 0, highScore: 0 };
// let gameData = { timePerLevel: 10, elapsedTime: 0, amountOfBug: 16, state: GAME_STATE.StartingScreen };
let gameData = { timePerLevel: 30, elapsedTime: 0, amountOfBug: 16, state: GAME_STATE.StartingScreen };

///////////////////////////////////////////////////////////////
function preload() {
  // soundFormats('ogg', 'mp3');
  // moveSoundArray.push(loadSound('assets/sound_fx/047'));
  spriteSheet = loadImage("assets/bug2.png");
  myFont = loadFont('assets/CozetteVector.ttf');
}

function setup() {
  // frameRate(60);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  restart();
  // createCanvas(displayWidth, displayHeight);
  // bugArray.push(new Bug(spriteSheet, 8*TILE_LENGTH, 5*TILE_LENGTH, TILE_LENGTH, 1, "h", 1, 1, 1 ));
  // bugArray.push(new Bug(spriteSheet, 8000, 5000, 2400, 1, "v", 1, 0.5, 1 ));

  // bugArray.push(new Bug(spriteSheet, 200, 400, 600, 960, "v", 1, -10, 0.5 ));
  // bugArray.push(new Bug(spriteSheet, 200, 400, 600, 960, "h", 1, -10, 0.5 ));
  //   for(let i=0; i < random(12,20); i++) {
  //     let movementVariation;
  //     if(round(random([0,1]))) {
  //       movementVariation = "v";
  //     }
  //     else {
  //       movementVariation = "h";
  //     }
  //     bugArray.push(new Bug(
  //       spriteSheet,
  //       random(200, 1600), //starting X
  //       random(200, 800), //starting Y
  //       600,
  //       960,
  //       movementVariation,
  //       1,
  //       -1*random(7,15), //movement speed
  //       random(0.5,1) //size scaling
  //     ));
  //   }
}

// spriteSheet,
// initalX, initalY,
// spriteSize,
// characterID,
// healthPoint,
// movementSpeed,
// sizeScaling,

///////////////////////////////////////////////////////////////
function draw() {
  // renderPlayground(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_COLOR);
  background(CANVAS_COLOR);
  switch(gameData.state) {
    case GAME_STATE.StartingScreen:
      scoreData.highScore = max(scoreData.score, scoreData.highScore);
      fill(255);
      textFont(myFont);
      textSize(176);
      textAlign(CENTER);
      text("Bug Squish!",width/2,height/2 - 76);
      // textSize(76);
      // text("Score: " + scoreData.score,width/2,height/2 + 60);
      // text("Max Score: " + scoreData.highScore,width/2,height/2 + 136);
      textSize(76);
      text("Press s to start", width/2, height/2 + 136);
      break;
    case GAME_STATE.Playing:
      for(let i = 0; i < bugArray.length; i++) {
        bugArray[i].draw();
      }
      renderScoreBoard();
      break;
    case GAME_STATE.GameOver:
      scoreData.highScore = max(scoreData.score, scoreData.highScore);
      fill(255);
      textFont(myFont);
      textSize(176);
      textAlign(CENTER);
      text("Game Over!",width/2,height/2 - 76);
      textSize(76);
      text("Score: " + scoreData.score,width/2,height/2 + 60);
      text("Max Score: " + scoreData.highScore,width/2,height/2 + 136);
      textSize(76);
      text("Press s to restart", width/2, height/2 + 360);
      break;
  }
  //sprite searcher //DO NOT CLEAN UP
  // noSmooth();
  // image(spriteSheet, 0, 200, 220, 400, 600, 0, 600, 960);
  // image(spriteSheet, 0, 200, 220, 400, 0, 1016, 600, 960);
  image(spriteSheet, 0, 200, 400, 220, 0, 3725, 960, 600);
  // image(spriteSheet, 0, 200, 165, 250, 2500, 0, 500, 825);
}

///////////////////////////////////////////////////////////////
function restart() {
  gameData.elapsedTime = 0;
  scoreData.score = 0;
  console.log("score", gameData.score);
  gameData.amountOfBug = random(12, 30);
  // gameData.amountOfBug = 1;

  bugArray = [];
  for(let i = 0; i < gameData.amountOfBug; i++) {
    let movementVariation;
    if(round(random([0,1]))) {
      movementVariation = "v";
    }
    else {
      movementVariation = "h";
    }
    bugArray.push(new Bug(
      spriteSheet,
      random(200, 1600), //starting X
      random(200, 800), //starting Y
      600,
      960,
      movementVariation,
      1,
      -1*random(6,24), //movement speed
      random(0.25,1) //size scaling
    ));
  }
}

function renderScoreBoard() {
  push();
  fill(255);
  textFont(myFont);
  textSize(86);
  textAlign(LEFT);
  text(scoreData.score,37,82);
  let currentTime = gameData.timePerLevel - gameData.elapsedTime;
  textAlign(RIGHT);
  text(ceil(currentTime), width - 40,82);
  // text(ceil(deltaTime), width - 60,40);
  gameData.elapsedTime += deltaTime / 1000;
  // console.log("elapsed time:", gameData.elapsedTime);

  // gameData.elapsedTime += deltaTime;
  pop();

  if(currentTime < 0) {
    gameData.state = GAME_STATE.GameOver;
  }
}

///////////////////////////////////////////////////////////////
function keyPressed() {
  if(keyCode === 83) {
    switch(gameData.state) {
      case GAME_STATE.StartingScreen:
        console.log("Start -> Playing");
        gameData.state = GAME_STATE.Playing;
        break;
      case GAME_STATE.GameOver:
        console.log("GameOver -> Playing");
        restart();
        gameData.state = GAME_STATE.Playing;
        break;
    }
  }
}

///////////////////////////////////////////////////////////////
function mousePressed() {
  for(let i = 0; i < bugArray.length; i++) {
    if(bugArray[i].hitboxCheck(mouseX, mouseY)) {
      bugArray[i].squished();
      scoreData.score += 1;
    }
    // console.log(bugArray[i].hitboxCheck(mouseX, mouseY));
  }
}
///////////////////////////////////////////////////////////////
class Bug {
  constructor(
    spriteSheet,
    initalX, initalY,
    spriteWidth,
    spriteHeight,
    // characterType,
    characterID,
    healthPoint,
    movementSpeed,
    sizeScaling,
  ) {
    this.spriteSheet = spriteSheet;
    this.initalX = initalX;
    this.initalY = initalY;



    this.characterID = characterID;

    this.healthPoint = healthPoint;
    this.movementSpeed = movementSpeed;
    this.sizeScaling = sizeScaling;

    this.onlyMoveHorizontally = false;
    this.onlyMoveVertically = false;
    this.erracticMovement = false;
    this.smartMovement = false;

    for(let i = 0; i < characterID.length; i++) {
      switch(characterID[i]) {
        case 'h':
          this.onlyMoveHorizontally = true;
          this.spriteWidth = spriteHeight;
          this.spriteHeight = spriteWidth;
          this.destinationX = 340;
          this.destinationY = 220;
          this.spriteXCoordinate = 0;
          this.spriteYCoordinate = 1945;
          break;
        case 'v':
          this.onlyMoveVertically = true;
          this.spriteWidth = spriteWidth;
          this.spriteHeight = spriteHeight;
          this.destinationX = 220;
          this.destinationY = 340;
          this.spriteXCoordinate = 0;
          this.spriteYCoordinate = 0;
          break;
        case 'e':
          this.erracticMovement = true;
          break;
        case 's':
          this.smartMovement = true;
          break;
        default:
        console.log("unknown char", characterID[i]);
      }
    }

    this.velocity = 0;
    this.movingDirection = 0;
    this.currentFrame = 0;

    this.locationX = 0;
    this.locationY = 0;
    this.currentMovementVariation = 0;
    this.isAlive = true;

    this.previousMovementSpeed = movementSpeed;
  }

  ///////////////////////////////////////////////////////////////
  draw() {
    push();
    noSmooth();


    if(this.isAlive) {
      this.checkCanvasCollision();
      let baseFramerate = 1*this.movementSpeed;
      let proportionalFramerate = round(frameRate() / baseFramerate);
      if(frameCount % proportionalFramerate === 0) {
        // console.log("call");
        this.animationHandler();
      }
      this.updateLocation();
    }

    //show hitbox
    // rect(12, 10, this.spriteWidth - 23, this.spriteHeight - 16);
    // this.hitboxCheck()
    // console.log(this.hitboxCheck(mouseX, mouseY));
    // this.hitboxCheck(mouseX, mouseY);
    // image(spriteSheet, 0, 200, 220, 400, 0, 0, 600, 960);
    // if(this.isAlive) {
    if(this.onlyMoveVertically) {
      console.log("vertical render", this.currentFrame);
      // console.log( this.currentFrame);
      image(
        spriteSheet, this.initalX, this.initalY,
        this.destinationX*this.sizeScaling, this.destinationY*this.sizeScaling,
        this.spriteXCoordinate + (this.spriteWidth * this.currentFrame),
        this.spriteYCoordinate,
        this.spriteWidth, this.spriteHeight
      )
    }
    else if(this.onlyMoveHorizontally) {
      // image(spriteSheet, 0, 200, 400, 220, 0, 3725, 960, 600);
      console.log("hor render");

      console.log(this.spriteYCoordinate + (this.spriteHeight * this.currentFrame));
      image(
        spriteSheet, this.initalX, this.initalY,
        this.destinationX*this.sizeScaling, this.destinationY*this.sizeScaling,
        this.spriteXCoordinate,
        this.spriteYCoordinate + (this.spriteHeight * this.currentFrame),
        this.spriteWidth, this.spriteHeight
      )
    }
    // }
    pop();
  }

  ///////////////////////////////////////////////////////////////
  hitboxCheck(x,y) {
    // console.log("check hitbox...");
    // rect(12, 10, this.spriteWidth - 23, this.spriteHeight - 16);
    let insideX = (x <= this.initalX + this.destinationX*this.sizeScaling && x >= this.initalX);
    // console.log("condition 1:", this.initalX + this.destinationX*this.sizeScaling);
    // console.log("condition 2:", this.initalX);
    // console.log("x:", insideX);
    let insideY = (y <= this.initalY + this.destinationY*this.sizeScaling && y >= this.initalY);
    // console.log("y:", insideY);
    return (insideX && insideY)
  }
  squished() {
    console.log("squished");
    this.movementSpeed = 0;
    this.isAlive = false;
    // this.spriteXCoordinate = 2500;
    // this.spriteYCoordinate = 0;
    // this.spriteWidth = 500;
    this.currentFrame = 3;
    // image(spriteSheet, 0, 200, 220, 400, 1800, 0, 600, 960);
    // image(spriteSheet, 0, 200, 165, 250, 2500, 0, 500, 825);

  }
  // move() {
  //   this.movementSpeed = this.previousMovementSpeed;
  //   console.log("move is called");
  //   this.isAlive = true;
  // }

  ///////////////////////////////////////////////////////////////
  updateLocation() {
    // if(this.erracticMovement === true) {
    //
    // }
    if(this.onlyMoveHorizontally === true) {
      this.velocity = calculateSide(this.movementSpeed, 0) //return movementspeed * 1
      this.initalX += this.velocity;
      // translate(this.initalX, this.initalY);
      // rotate(PI/2);
      // imageMode(CENTER);
      // scale(this.movementSpeed, 1);
      // if(this.movementSpeed < 0) {
      //   translate(1, this.spriteHeight);
      // }
      // scale(1,this.movementSpeed);
    }
    if(this.onlyMoveVertically === true) {
      this.velocity = calculateSide(this.movementSpeed, 0) //return movementspeed * 1
      this.initalY += this.velocity;
      // translate(this.initalX, this.initalY);
      // rotate(PI/2);
      // imageMode(CENTER);
      // scale(this.movementSpeed, 1);
      // if(this.movementSpeed < 0) {
      //   translate(0, -this.spriteHeight);
      // }
      // scale(1,-1*this.movementSpeed);
    }
  }

  // movement() {
  //   this.animationHandler();
  //   this.updateLocation();
  // }

  checkCanvasCollision() {
    // if(this.initalX - 12 > width || this.initalX - 12 < 0) {
    //   // console.log("collided");
    //   this.movementSpeed *= -1;
    //   this.previousMovementSpeed = this.movementSpeed;
    // }
    if(this.sizeScaling * this.initalX < 0) {
      // console.log("collided");
      this.movementSpeed *= -1;
      this.spriteXCoordinate = 910;
    }
    if(this.initalX + this.sizeScaling*400 > width) {
      // console.log("collided");
      this.movementSpeed *= -1;
      this.previousMovementSpeed = this.movementSpeed;
      this.spriteXCoordinate = 0;
    }

    if(this.sizeScaling * this.initalY < 0) {
      // console.log("collided");
      this.movementSpeed *= -1;
      this.spriteYCoordinate = 910;
    }
    if(this.initalY + this.sizeScaling*400 > height) {
      // console.log("collided");
      this.movementSpeed *= -1;
      this.previousMovementSpeed = this.movementSpeed;
      this.spriteYCoordinate = 0;
    }
  }

  animationHandler() {
    console.log("animation called");
    if(this.currentFrame < 2) {
      this.currentFrame += 1;
    }
    else {
      this.currentFrame = 0;
    }
  }
}

///////////////////////////////////////////////////////////////
function calculateSide(hypotenuseLength, angle) {
  return hypotenuseLength * Math.cos(angle);
}
