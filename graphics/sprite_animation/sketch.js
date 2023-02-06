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
// let needUpdate = true;
let needUpdateWord = false;
let needUpdateCharacter = false;
let gridArray = [];
let moveSoundCounter = 0;
let moveSoundArray = [];

//TODO: maybe make wobble a global variable so that the updated sprite when moving would be less janky?

///////////////////////////////////////////////////////////////
function preload() {
  soundFormats('ogg', 'mp3');
  moveSoundArray.push(loadSound('assets/sound_fx/047'));
  // moveSoundArray.push(loadSound('assets/sound_fx/048'));
  // moveSoundArray.push(loadSound('assets/sound_fx/049'));
  // moveSoundArray.push(loadSound('assets/sound_fx/050'));
  // moveSoundArray.push(loadSound('assets/sound_fx/051'));
  // moveSoundArray.push(loadSound('assets/sound_fx/052'));
  // moveSoundArray.push(loadSound('assets/sound_fx/053'));
  // moveSoundArray.push(loadSound('assets/sound_fx/054'));
  // moveSoundArray.push(loadSound('assets/sound_fx/055'));
  spriteSheet = loadImage("assets/gameplay_sprites.png");
}

function setup() {
  frameRate(24);
  createCanvas(tileLength*canvasWidthScaling, tileLength*canvasHeightScaling);

  //Note: array actually go beyond the rendered canvas a bit
  for(let i = 0; i <= height / tileLength; i++) {
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

  // gridArray[1][2] = 1;
  // gridArray[10][2] = 2;
  gridArray[8][10] = 2;
  gridArray[9][8] = 114;
  gridArray[8][8] = 111;
  gridArray[9][9] = 111;
  gridArray[8][9] = 111;
  gridArray[5][7] = 112;
  gridArray[5][8] = 111;
  gridArray[5][9] = 113;

  renderCharacter();
  renderObjects();
}

///////////////////////////////////////////////////////////////
function draw() {
  background(canvasColor);
  if(showGrid) {
    drawGrid(canvasWidthScaling, canvasHeightScaling, 'rgb(20, 20, 255, 0.75)');
  }
  if(needUpdateWord) {
    console.log("updating ...");
    //reset character and word array
    wordArray = [];
    console.log("reset, now rendering");
    renderObjects();
    console.log("update completed");
    needUpdateWord = false;
  }
  for(let i = 0; i < characterArray.length; i++) {
    characterArray[i].draw();
  }
  for(let i = 0; i < wordArray.length; i++) {
    wordArray[i].draw();
  }
  //sprite searcher //DO NOT DELETE
  noSmooth();
  image(spriteSheet, tileLength*2, tileLength*2, tileLength, tileLength, 20*tileLength, 30*tileLength, tileLength, tileLength);
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

///////////////////////////////////////////////////////////////
function renderCharacter() {
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 0; j < gridArray[i].length; j++) {
      // console.log("j is", j);
      switch(gridArray[i][j]) {
        case 1:
          console.log("BABA IS AT [%d][%d]", i, j );
          characterArray.push( new Character(
            spriteSheet,
            tileLength * j, tileLength * i, //location
            tileLength, tileLength, //size
            5, //animation length
            3, //variation amount
            1, //character ID
          )
          )
          break;
        case 2:
          console.log("KEKE IS AT [%d][%d]", i, j);
          characterArray.push( new Character(
            spriteSheet,
            tileLength * j, tileLength * i, //location
            tileLength, tileLength, //size
            5, //animation length
            3, //variation amount
            2, //character ID
          )
          )
          break;
        case 3:
          console.log("ME IS AT [%d][%d]", i, j);
          characterArray.push( new Character(
            spriteSheet,
            tileLength * j, tileLength * i, //location
            tileLength, tileLength, //size
            5, //animation length
            3, //variation amount
            3, //character ID
          )
          )
          break;
        default:
      }
    }
  }
}

function renderObjects() {
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 0; j < gridArray[i].length; j++) {
      // console.log("j is", j);
      switch(gridArray[i][j]) {
        case 111:
          console.log("IS IS AT [%d][%d]", i, j);
          wordArray.push( new Word(
            spriteSheet,
            tileLength * j, tileLength * i, tileLength, tileLength, 3,
            1,
          )
          )
          break;
        case 112:
          console.log("BABA(text) IS AT [%d][%d]", i, j);
          wordArray.push( new Word(
            spriteSheet,
            tileLength * j, tileLength * i, tileLength, tileLength, 3,
            2,
          )
          )
          break;
        case 113:
          console.log("YOU IS AT [%d][%d]", i, j);
          wordArray.push( new Word(
            spriteSheet, tileLength * j, tileLength * i,
            tileLength, tileLength, 3,
            3,
          )
          )
          break;
        case 114:
          console.log("KEKE(text) IS AT [%d][%d]", i, j);
          wordArray.push( new Word(
            spriteSheet, tileLength * j, tileLength * i,
            tileLength, tileLength, 3,
            4,
          )
          )
          break;
        default:
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
        this.isText = true;
        break;
      case 2:
        this.spriteXCoordinate = 6*tileLength;
        this.spriteYCoordinate = 27*tileLength;
        break;
      case 3:
        this.spriteXCoordinate = 20*tileLength;
        this.spriteYCoordinate = 42*tileLength;
        break;
      case 4:
        this.spriteXCoordinate = 20*tileLength;
        this.spriteYCoordinate = 30*tileLength;
        break;
      default:
      console.log("how");
    }
    if(this.isText) {
      this.isPush = true;
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
    this.arrayJ = initalX / tileLength;
    this.arrayI = initalY / tileLength;
    this.willCollide = false;
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
          // console.log("sleep counter:", this.idleCounter)
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
  getCharacterID() {
    return this.characterID;
  }
  changeCharacterID(newID) {
    this.characterID = newID;
  }
  getXLocationInGridArray() {
    return this.arrayJ;
  }
  getYLocationInGridArray() {
    return this.arrayI;
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
  pushObject() {
    //TODO: loop should go in reverse to function for diff objects
    let obecjetToPush = this.checkPushable();
    if(this.xDirection === 1) { //pushing right
      // for (let i = 1; i <= obecjetToPush; i++) {
      for (let i = obecjetToPush; i > 0; i--) {
        gridArray[this.arrayI][this.arrayJ + i + 1] = gridArray[this.arrayI][this.arrayJ + i];
      }
    }
    else if(this.xDirection === -1) {
      for (let i = obecjetToPush; i > 0; i--) {
        console.log("pushing i is", i);
        console.log("pushing [%d][%d] to [%d][%d] left", this.arrayI, this.arrayJ - i, this.arrayI, this.arrayJ - i - 1);
        gridArray[this.arrayI][this.arrayJ - i - 1] = gridArray[this.arrayI][this.arrayJ - i];
      }
    }
    else if(this.yDirection === -1) {
      for (let i = obecjetToPush; i > 0; i--) {
        gridArray[this.arrayI - i - 1][this.arrayJ] = gridArray[this.arrayI - i][this.arrayJ];
      }
    }
    else if(this.yDirection === 1) { //push down
      for (let i = obecjetToPush; i > 0; i--) {
        gridArray[this.arrayI + i + 1][this.arrayJ] = gridArray[this.arrayI + i][this.arrayJ];
      }
    }
    needUpdateWord = true;
  }

  ///////////////////////////////////////////////////////////////
  checkPushable(strength = 4) {
    let counter = 0;
    if(this.xDirection === 1) {
      for (let i = 1; i <= strength + 1; i++) {
        if(gridArray[this.arrayI][this.arrayJ + i] === 0) {
          console.log("special return", counter);
          return counter;
        }
        if(gridArray[this.arrayI][this.arrayJ + i] - 100 > 0) {
          counter += 1;
        }
      }
    }
    else if(this.xDirection === -1) {
      for (let i = 1; i <= strength + 1; i++) {
        if(gridArray[this.arrayI][this.arrayJ - i] === 0) {
          console.log("special return", counter);
          return counter;
        }
        if(gridArray[this.arrayI][this.arrayJ - i] - 100 > 0) {
          counter += 1;
        }
      }
    }
    else if(this.yDirection === -1) {
      for (let i = 1; i <= strength + 1; i++) {
        if(gridArray[this.arrayI - i][this.arrayJ] === 0) {
          console.log("special return", counter);
          return counter;
        }
        if(gridArray[this.arrayI - i][this.arrayJ] - 100 > 0) {
          counter += 1;
        }
      }
    }
    else if(this.yDirection === 1) {
      for (let i = 1; i <= strength + 2; i++) {
        if(gridArray[this.arrayI + i][this.arrayJ] === 0) {
          console.log("special return", counter);
          return counter;
        }
        if(gridArray[this.arrayI + i][this.arrayJ] - 100 > 0) {
          counter += 1;
        }
      }
    }
    if(counter >= strength) {
      console.log("too much!!! not enough stronk");
      return 0;
    }
    return counter;
  }

  checkCollision() {
    console.log("checking collison");
    if(this.xDirection === 1) {
      console.log("right collison check");
      if(gridArray[this.arrayI][this.arrayJ + 1] != 0) {
        console.log("right collision!!!");
        if(this.checkPushable() === 0) {
          this.willCollide = true;
          console.log("cannot push");
        }
        else {
          console.log("pushing &d objects", this.checkPushable());
          this.willCollide = false;
          this.pushObject();
        }
      }
      else {
        console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.xDirection === -1) {
      console.log("left collison check");
      if(gridArray[this.arrayI][this.arrayJ - 1] != 0) {
        console.log("left collision!!!");
        if(this.checkPushable() === 0) {
          this.willCollide = true;
          console.log("cannot push");
        }
        else {
          console.log("pushing &d objects", this.checkPushable());
          this.willCollide = false;
          this.pushObject();
        }
      }
      else {
        console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.yDirection === -1) {
      console.log("up collison check");
      if(gridArray[this.arrayI - 1][this.arrayJ] != 0) {
        console.log("up collision!!!");
        if(this.checkPushable() === 0) {
          console.log("cannot push");
          this.willCollide = true;
        }
        else {
          console.log("pushing &d objects", this.checkPushable());
          this.willCollide = false;
          this.pushObject();
        }
      }
      else {
        console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.yDirection === 1) {
      console.log("down collison check");
      if(gridArray[this.arrayI + 1][this.arrayJ] != 0) {
        console.log("down collision!!!");
        this.willCollide = true;
        if(this.checkPushable() === 0) {
          console.log("cannot push");
        }
        else {
          console.log("pushing &d objects", this.checkPushable());
          this.willCollide = false;
          this.pushObject();
        }
      }
      else {
        console.log("no collision");
        this.willCollide = false;
      }
    }
  }

  ///////////////////////////////////////////////////////////////
  updateLocation() {
    this.checkCollision();
    if(this.willCollide) {
      this.velocity = 0;
    }
    else {
      this.velocity = this.movementSpeed;
    }
    this.locationX += this.velocity * this.xDirection;
    this.locationY += this.velocity * this.yDirection;
    if(isGridMovement) {
      this.velocity = 0;
      // this.movementSpeed = 24;
    }
    this.idleCounter = 0;
    if(!this.willCollide) {
      console.log("playing", moveSoundCounter);
      moveSoundArray[moveSoundCounter].play();
      //THIS DOESNT WORK BUT IT IS STILL GOOD??????
      // console.log("moveSoundArray:", moveSoundArray.length);
      // if(moveSoundCounter => moveSoundArray.length) {
      //   console.log("reset moveSoundCounter");
      //   moveSoundCounter = 0;
      // }
      // else {
      //   moveSoundCounter += 1;
      //   console.log("updated moveSoundCounter", moveSoundCounter);
      // }
      this.updateArrayLocation();
    }
    // needUpdate = true;
  }

  updateArrayLocation() {
    // console.log("updating character %d ...", this.characterID);
    console.log("current array of %d is [%d][%d]", this.characterID, this.arrayI, this.arrayJ);
    gridArray[this.arrayI][this.arrayJ] = 0;
    this.arrayI = (this.initalY+this.locationY) / 24;
    this.arrayJ = (this.initalX+this.locationX) / 24;
    gridArray[this.arrayI][this.arrayJ] = this.characterID;
    console.log("array is updated[%d][%d]", this.arrayI, this.arrayJ);
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
      // moveSoundCounter = 0;
      if(!isGridMovement){
        this.spriteIsReset();
      }
    }
  }

  ///////////////////////////////////////////////////////////////
  leftMovement() {
    // console.log("move left")
    if(this.yDirection === 0 && this.xDirection === -1) {
      this.currentFrame += 1;
      // console.log("update frame:", this.currentFrame);
    }
    else {
      this.yDirection = 0;
      // console.log("set yDirection to 0")
      this.currentFrame = 11;
      // console.log("update frame:", this.currentFrame);
    }
    this.xDirection = -1;
    if (this.currentFrame === 15) {
      this.currentFrame = 11;
    }
    this.updateLocation();
  }
  rightMovement() {
    // console.log("move right")
    if(this.yDirection === 0 && this.xDirection === 1) {
      this.currentFrame += 1;
    }
    else {
      this.yDirection = 0;
      // console.log("set yDirection to 0")
      this.currentFrame = 1;
      // console.log("update frame:", this.currentFrame);
    }
    this.xDirection = 1;
    if (this.currentFrame === 5) {
      this.currentFrame = 1;
    }
    this.updateLocation();
  }
  downMovement() {
    // console.log("move down")
    if(this.xDirection === 0 && this.yDirection === 1) {
      this.currentFrame += 1;
      // console.log("update frame:", this.currentFrame);
    }
    else {
      this.xDirection = 0;
      // console.log("set xDirection to 0")
      this.currentFrame = 16;
    }
    this.yDirection = 1;
    if (this.currentFrame === 20) {
      // console.log("reset frame to 16");
      this.currentFrame = 16;
    }
    this.updateLocation();
  }
  upMovement() {
    // console.log("move up")
    if(this.xDirection === 0 && this.yDirection === -1) {
      this.currentFrame += 1;
      // console.log("update frame:", this.currentFrame);
    }
    else {
      this.xDirection = 0;
      // console.log("set xDirection to 0")
      this.currentFrame = 6;
    }
    this.yDirection = -1;
    if (this.currentFrame === 10) {
      // console.log("reset frame to 6");
      this.currentFrame = 6;
    }
    this.updateLocation();
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
//this is going to be such bad codes.........
// function findRules() {
//   for(let i = 0; i < gridArray.length; i++) {
//     for(let j = 0; j < gridArray[i].length; j++) {
//       if(gridArray[i][j] - 100 > 0) {
//         switch(gridArray[i][j]) {
//           case 114:
//             console.log("found KEKE(text)");
//             if(scanRuleRight(i, j)) {
//               for(let k = 0; k < characterArray.length; k++) {
//                 if(characterArray[k].getCharacterID === 2) {
//                   characterArray[k].changeCharacterID(1);
//                 }
//               }
//
//             }
//             // scanRuleDown(i, j);
//             break;
//           default:
//         }
//       }
//     }
//   }
// }
//
// function scanVerbRight(i, j) {
//   if(
//     gridArray[i][j + 1] === 111
//   ) {
//     console.log("found verb, return true");
//     return true;
//   }
//   return false;
// }
//
// function scanRuleRight(i, j) {
//   if(scanVerbRight()) {
//     switch(gridArray[i][j + 2]) {
//       case 112:
//         console.log("next word is BABA, return true");
//         return true;
//       default:
//       console.log("there is no next word");
//     }
//   }
//   return false;
// }
//
// function scanRuleDown(i, j) {
//   return false;
// }
