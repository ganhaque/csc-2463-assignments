//Canvas properties:
let tileLength = 24;
let canvasWidthScaling = 24;
let canvasHeightScaling = 14;
let canvasColor = "#080808";

let pixels;
let themeArray;

let characterArray = []
let wordArray = []
let colorPallete = [
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

let gridIsFunctional = true;
let isGridMovement = true; //note: problem on false mode
let showGrid = true;
let  gridArray = [];

///////////////////////////////////////////////////////////////
function preload() {
  spriteSheet = loadImage("assets/gameplay_sprites.png");
}

function setup() {
  frameRate(24);
  createCanvas(tileLength*canvasWidthScaling, tileLength*canvasHeightScaling);

  for(let i = 0; i < height / tileLength; i++) {
    gridArray.push(new Array(width / tileLength).fill(0));
    // console.log("curren array[i][j] = ", gridArray[i]);
  }

    // spriteSheet,
    // initalX, initalY,
    // spriteWidth, spriteHeight,
    // animationLength,
    // amountOfVariation,
    // characterID,
    // sizeScaling = 1,
  gridArray[1][2] = 1;
  gridArray[10][2] = 2;
  gridArray[10][8] = 3;
  gridArray[11][8] = 11;
  initialRenderOfGridArray();
}

///////////////////////////////////////////////////////////////
function draw() {
  background(canvasColor);
  if(showGrid) {
    drawGrid(canvasWidthScaling, canvasHeightScaling, 'rgb(20, 20, 255, 0.75)');
  }
  for(let i = 0; i < characterArray.length; i++) {
    characterArray[i].draw();
  }
  for(let i = 0; i < wordArray.length; i++) {
    wordArray[i].draw();
  }
  noSmooth();
  //sprite searcher //DO NOT DELETE
  // image(spriteSheet, tileLength*2, tileLength*2, tileLength, tileLength, 18*tileLength, 30*tileLength, tileLength, tileLength);
}

///////////////////////////////////////////////////////////////
function keyPressed() {
  for(let i = 0; i < characterArray.length; i++) {
    characterArray[i].normalMovementTap(LEFT_ARROW, DOWN_ARROW, UP_ARROW, RIGHT_ARROW);
  }
}

function keyReleased() {
  for(let i = 0; i < characterArray.length; i++) {
    characterArray[i].stopMovementOnKeyReleased(LEFT_ARROW, DOWN_ARROW, UP_ARROW, RIGHT_ARROW);
  }
}

function initialRenderOfGridArray() {
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 0; j < gridArray[i].length; j++) {
      // console.log("j is", j);
      switch(gridArray[i][j]) {
        case 1:
          console.log("BABA IS AT [%d][%d]", i, j );
          characterArray.push(
            new Character(
              spriteSheet,
              tileLength * i, tileLength * j,
              tileLength, tileLength,
              5,
              3,
              1,
            )
          )
          break;
        case 2:
          console.log("KEKE IS AT [%d][%d]", i, j);
          characterArray.push(
            new Character(
              spriteSheet,
              tileLength * i, tileLength * j,
              tileLength, tileLength,
              5,
              3,
              2,
            )
          )
          break;
        case 3:
          console.log("ME IS AT [%d][%d]", i, j);
          characterArray.push(
            new Character(
              spriteSheet,
              tileLength * i, tileLength * j,
              tileLength, tileLength,
              5,
              3,
              3,
            )
          )
          break;
        case 11:
          console.log("IS IS AT [%d][%d]", i, j);
          wordArray.push(
            new Word(
              spriteSheet,
              tileLength * i, tileLength * j,
              tileLength, tileLength,
              3,
              1,
            )
          )
          break;
        default:
        //nothing is at [i][j]
      }
    }
  }

}

///////////////////////////////////////////////////////////////
class Word {
  constructor(
    spriteSheet,
    initalX, initalY,
    spriteWidth, spriteHeight,
    // animationLength,
    amountOfVariation,
    characterID,
    sizeScaling = 1,
    // color = "#FFFFFF",
  ) {
    this.characterID = characterID;
    this.spriteSheet = spriteSheet;
    this.initalX = initalX;
    this.initalY = initalY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    // this.animationLength = animationLength;

    switch (characterID) {
      case 1:
        this.spriteXCoordinate = 18*tileLength;
        this.spriteYCoordinate = 30*tileLength;
        break;
      // case 2:
      //   this.spriteXCoordinate = 0;
      //   this.spriteYCoordinate = 3*tileLength;
      //   break;
      // case 3:
      //   this.spriteXCoordinate = 0;
      //   this.spriteYCoordinate = 6*tileLength;
      default:
      console.log("how");
    }
    // this.color = color;
    this.sizeScaling = sizeScaling;
    this.currentVariation = 0;
    this.amountOfVariation = amountOfVariation;

    this.locationX = 0;
    this.locationY = 0;

    if(isGridMovement) {
      this.movementSpeed = 24;
    }
    // else {
    //   this.movementSpeed = 24;
    // }
    this.wobbleSpeed = 1;
  }

  ///////////////////////////////////////////////////////////////
  draw() {
    if(frameCount % (10*this.wobbleSpeed) === 0) {
      this.wobble();
    }

    push();
    noSmooth();
    image(
      spriteSheet, this.initalX + this.locationX, this.initalY + this.locationY,
      tileLength*this.sizeScaling, tileLength*this.sizeScaling,
      this.spriteXCoordinate,
      this.spriteYCoordinate + (this.spriteHeight * this.currentVariation),
      this.spriteWidth, this.spriteHeight
    )
    pop();
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

}

///////////////////////////////////////////////////////////////
class Character {
  constructor(
    spriteSheet,
    initalX, initalY,
    spriteWidth, spriteHeight,
    animationLength,
    amountOfVariation,
    characterID,
    sizeScaling = 1,
    // color = "#FFFFFF",
  ) {
    this.characterID = characterID;
    this.spriteSheet = spriteSheet;
    this.initalX = initalX;
    this.initalY = initalY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.animationLength = animationLength;

    switch (characterID) {
      case 1:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 0;
        break;
      case 2:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 3*tileLength;
        break;
      case 3:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 6*tileLength;
        break;
      default:
      console.log("how");
    }
    // this.color = color;
    this.sizeScaling = sizeScaling;

    this.velocity = 0;

    this.currentFrame = 1;
    this.currentVariation = 0;

    this.amountOfVariation = amountOfVariation;

    this.locationX = 0;
    this.locationY = 0;

    this.xDirection = 1;
    this.yDirection = 0;

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

    this.isYou = true;
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
      // console.log("right sleep");
      this.currentFrame = 0;
    }
    else if(this.xDirection === -1) {
      this.currentFrame = this.animationLength*2;
    }
    else if(this.yDirection === -1) {
      this.currentFrame = this.animationLength;
    }
    else if(this.yDirection === 1) {
      this.currentFrame = this.animationLength*3;
    }
  }

  spriteIsReset() {
    //MAYBE: add no sleep reset for robot sprite
    if(this.xDirection === 1) {
      this.currentFrame = 1;
    }
    else if(this.xDirection === -1) {
      console.log("left", this.animationLength*2 + 1)
      this.currentFrame = this.animationLength*2 + 1;
    }
    else if(this.yDirection === -1) {
      this.currentFrame = this.animationLength + 1;
    }
    else if(this.yDirection === 1) {
      this.currentFrame = this.animationLength*3 + 1;
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
    //TODO: Update location in array as well
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
function drawGrid(column, row) {
  for (let x = 0; x < width; x += width / column) {
    for (let y = 0; y < height; y += height / row) {
      push();
      stroke(105, 135, 255, 0.90)
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
      pop();
    }
  }
}

///////////////////////////////////////////////////////////////
