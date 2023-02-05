//Canvas properties:
var tileLength = 24;
var canvasWidthScaling = 24;
var canvasHeightScaling = 14;
var canvasColor = "#080808";

var pixels;
var themeArray;

var characterArray = []
var colorPallete = [
  "#080808",
  "#0b0a0f",
  "#242424",
  "#737373",
  "#c3c3c3",
  "#ffffff",
  "#15181f",
  "#293040",
  "#3e7687",
  "#5f9dd0",
  "#83c9e5",
  "#411910",
  "#82261b",
  "#e5533a",
  "#e39950",
  "#692e4c",
  "#8e5e9c",
  "#4e5a94",
  "#9183d8",
  "#d9386a",
  "#ea91c9",
  "#303823",
  "#4c5c1d",
  "#5d833a",
  "#a4b13e",
  "#362e23",
  "#503f25",
  "#91673f",
  "#c29e46",
]

var isGridMovement = true;
var showGrid = true;

///////////////////////////////////////////////////////////////
function preload() {
  spriteSheet = loadImage("assets/gameplay_sprites.png");
}

function setup() {
  frameRate(24);
  createCanvas(tileLength*canvasWidthScaling, tileLength*canvasHeightScaling);

  characterArray.push(
    new Character(
      spriteSheet, tileLength * canvasWidthScaling / 2, tileLength * canvasHeightScaling / 2,
      tileLength, tileLength,
      0, 0,
      2, 1
    )
  )
}

///////////////////////////////////////////////////////////////
function draw() {
  background(canvasColor);
  if(showGrid) {
    drawGrid(canvasWidthScaling, canvasHeightScaling, 'rgb(20, 20, 255, 0.75)');
  }
  for(var i = 0; i < characterArray.length; i++) {
    characterArray[i].draw();
  }
}

///////////////////////////////////////////////////////////////
function keyPressed() {
  for(var i = 0; i < characterArray.length; i++) {
    characterArray[i].normalMovementTap(LEFT_ARROW, DOWN_ARROW, UP_ARROW, RIGHT_ARROW);
  }
}

function keyReleased() {
  for(var i = 0; i < characterArray.length; i++) {
    characterArray[i].stopMovementOnKeyReleased(LEFT_ARROW, DOWN_ARROW, UP_ARROW, RIGHT_ARROW);
  }
}

///////////////////////////////////////////////////////////////
class Character {
  constructor(
    spriteSheet, initalX, initalY,
    spriteWidth, spriteHeight,
    spriteXCoordinate, spriteYCoordinate,
    walkingAnimationLength, numberofVariation,
    // color = "#FFFFFF",
    sizeScaling = 1,
    hasLeftRight = true,
    hasDownUp = true,
  ) {
    this.spriteSheet = spriteSheet;
    this.initalX = initalX;
    this.initalY = initalY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.spriteXCoordinate = spriteXCoordinate;
    this.spriteYCoordinate = spriteYCoordinate;
    this.walkingAnimationLength = walkingAnimationLength;
    this.numberofVariation = numberofVariation;

    // this.color = color;
    this.sizeScaling = sizeScaling;

    this.velocity = 0;
    this.acceleration = 0;

    this.currentFrame = 1;
    this.currentVariation = 0;
    
    this.amountOfVariation = 3;

    this.locationX = 0;
    this.locationY = 0;

    this.xDirection = 1;
    this.yDirection = 0;

    this.hasLeftRight = hasLeftRight;
    this.hasDownUp = hasDownUp;

    if(isGridMovement) {
      this.movementSpeed = 24;
    }
    else {
      this.movementSpeed = 8;
    }
    this.wobbleSpeed = 1;

    this.holdKeyDelay = 1;
    this.holdKeyCounter = 0;

    this.sleepIsForTheWeak = false;
    this.idleCounter = 0;
    this.idleDelay = 2;
  }

///////////////////////////////////////////////////////////////
  draw() {
    if(frameCount % (10*this.wobbleSpeed) === 0) {
      this.wobble();
    }
    let movementKeyIsDown = (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW));
    if(frameCount % 1 === 0 && movementKeyIsDown) {
      this.holdKeyCounter += 0.2;
      // console.log("HODL:", this.holdKeyCounter);
    }
    if(frameCount % 3 === 0 && this.holdKeyCounter > this.holdKeyDelay) {
      if(keyIsDown(RIGHT_ARROW)) {
        console.log("proc");
        this.rightMovement();
      }
      else if (keyIsDown(LEFT_ARROW)) {
        console.log("proc");
        this.leftMovement();
      }
      else if (keyIsDown(UP_ARROW)) {
        console.log("proc");
        this.upMovement();
      }
      else if (keyIsDown(DOWN_ARROW)) {
        console.log("proc");
        this.downMovement();
      }
    }

    if(!this.sleepIsForTheWeak) {
      if(frameCount % 24 === 0) {
        if(this.idleCounter <= this.idleDelay) {
          this.idleCounter += 1;
          console.log("sleep counter:", this.idleCounter)
        }
      }
      if(this.idleCounter > this.idleDelay) {
        this.idleBabaIsSleep();
      }
    }

    push();
    noSmooth();
    image(
      spriteSheet, this.initalX + this.locationX, this.initalY + this.locationY,
      tileLength*this.sizeScaling, tileLength*this.sizeScaling,
      this.spriteXCoordinate + (this.spriteWidth * this.currentFrame),
      this.spriteYCoordinate + (this.spriteHeight * this.currentVariation),
      this.spriteWidth, this.spriteHeight
    )
    pop();

    if(isGridMovement) {
      this.velocity = 0;
      this.movementSpeed = tileLength;
    }
  }

///////////////////////////////////////////////////////////////
  wobble() {
    if(this.currentVariation >= this.amountOfVariation - 1) {
      this.currentVariation = 0;
    }
    else {
      this.currentVariation += 1;
    }
  }

///////////////////////////////////////////////////////////////
  idleBabaIsSleep() {
    if(this.xDirection === 1) {
      this.currentFrame = 0;
    }
    else if(this.xDirection === -1) {
      this.currentFrame = 10;
    }
    else if(this.yDirection === -1) {
      this.currentFrame = 5;
    }
    else if(this.yDirection === 1) {
      this.currentFrame = 15;
    }
  }

  spriteIsReset() {
    if(this.xDirection === 1) {
      this.currentFrame = 1;
    }
    else if(this.xDirection === -1) {
      this.currentFrame = 11;
    }
    else if(this.yDirection === -1) {
      this.currentFrame = 6;
    }
    else if(this.yDirection === 1) {
      this.currentFrame = 16;
    }
  }

///////////////////////////////////////////////////////////////
  leftMovement() {
    console.log("move left")
    if(this.yDirection === 0 && this.xDirection === -1) {
      this.currentFrame += 1;
      console.log("update frame:", this.currentFrame);
    }
    else {
      this.yDirection = 0;
      console.log("set yDirection to 0")
      this.currentFrame = 11;
      console.log("update frame:", this.currentFrame);
    }
    this.xDirection = -1;
    this.velocity = this.movementSpeed;
    if (this.currentFrame === 15) {
      this.currentFrame = 11;
    }
    this.updateLocation();
  }
  rightMovement() {
    console.log("move right")
    if(this.yDirection === 0 && this.xDirection === 1) {
      this.currentFrame += 1;
    }
    else {
      this.yDirection = 0;
      console.log("set yDirection to 0")
      this.currentFrame = 1;
      console.log("update frame:", this.currentFrame);
    }
    this.xDirection = 1;
    this.velocity = this.movementSpeed;
    if (this.currentFrame === 5) {
      this.currentFrame = 1;
    }
    this.updateLocation();
  }
  downMovement() {
    console.log("move down")
    if(this.xDirection === 0 && this.yDirection === 1) {
      this.currentFrame += 1;
      console.log("update frame:", this.currentFrame);
    }
    else {
      this.xDirection = 0;
      console.log("set xDirection to 0")
      this.currentFrame = 16;
    }
    this.yDirection = 1;
    this.velocity = this.movementSpeed;
    if (this.currentFrame === 20) {
      console.log("reset frame to 16");
      this.currentFrame = 16;
    }
    this.updateLocation();
  }
  upMovement() {
    console.log("move up")
    if(this.xDirection === 0 && this.yDirection === -1) {
      this.currentFrame += 1;
      console.log("update frame:", this.currentFrame);
    }
    else {
      this.xDirection = 0;
      console.log("set xDirection to 0")
      this.currentFrame = 6;
    }
    this.yDirection = -1;
    this.velocity = this.movementSpeed;
    if (this.currentFrame === 10) {
      console.log("reset frame to 6");
      this.currentFrame = 6;
    }
    this.updateLocation();
  }

///////////////////////////////////////////////////////////////
  updateLocation() {
    this.locationX += this.velocity * this.xDirection;
    this.locationY += this.velocity * this.yDirection;
    if(isGridMovement) {
      this.velocity = 0;
      // this.movementSpeed = 24;
    }
    this.idleCounter = 0;
  }

///////////////////////////////////////////////////////////////
  normalMovementTap(moveLeftKey = LEFT_ARROW, moveDownKey = DOWN_ARROW, moveUpKey = UP_ARROW, moveRightKey = RIGHT_ARROW) {
    switch(keyCode) {
      case moveLeftKey:
        this.leftMovement();
        break;
      case moveRightKey:
        this.rightMovement();
        break;
      case moveDownKey:
        this.downMovement();
        break;
      case moveUpKey:
        this.upMovement();
        break;
      default:
      console.log("not a movement key")
    }
  }

  stopMovementOnKeyReleased(moveLeftKey, moveDownKey, moveUpKey, moveRightKey) {
    if(keyCode === moveLeftKey || keyCode === moveDownKey || keyCode === moveUpKey || keyCode === moveRightKey) {
      this.velocity = 0;
      this.idleCounter = 0;
      this.holdKeyCounter = 0;
      if(!isGridMovement){
        this.spriteIsReset();
      }
    }
  }
}

///////////////////////////////////////////////////////////////
function drawGrid(column, row, color) {
  for (var x = 0; x < width; x += width / column) {
    for (var y = 0; y < height; y += height / row) {
      push();
      // fill(color);
      // console.log(color);
      // stroke(color);
      stroke(105, 135, 255, 0.90)
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
      pop();
    }
  }
}

///////////////////////////////////////////////////////////////
