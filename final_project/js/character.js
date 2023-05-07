
let characterArray = []
let enemyArray = []
let isGridMovement = true;
let moveSoundCounter = 0;
let moveSoundArray = [];

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
            TILE_LENGTH * j, TILE_LENGTH * i, //location
            TILE_LENGTH, TILE_LENGTH, //size
            5, //animation length
            3, //variation amount
            1, //character ID
            // 2, // size
          )
          )
          break;
        case 2:
          console.log("KEKE IS AT [%d][%d]", i, j);
          enemyArray.push( new Enemy(
            spriteSheet,
            TILE_LENGTH * j, TILE_LENGTH * i, //location
            TILE_LENGTH, TILE_LENGTH, //size
            5, //animation length
            3, //variation amount
            2, //character ID
          )
          )
          break;
        case 3:
          console.log("ME IS AT [%d][%d]", i, j);
          enemyArray.push( new Enemy(
            spriteSheet,
            TILE_LENGTH * j, TILE_LENGTH * i, //location
            TILE_LENGTH, TILE_LENGTH, //size
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

class Character {
  constructor(
    spriteSheet,
    initialX, initialY,
    spriteWidth, spriteHeight,
    animationLength,
    amountOfVariation,
    characterID,
    sizeScaling = 1,
    // color = "#FFFFFF",
  ) {
    this.characterID = characterID;
    this.spriteSheet = spriteSheet;
    this.initialX = initialX;
    this.initialY = initialY;
    // this.spriteWidth = spriteWidth;
    // this.spriteHeight = spriteHeight;
    this.spriteWidth = 24;
    this.spriteHeight = 24;
    this.animationLength = animationLength;

    switch (characterID) {
      case 1:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 0;
        break;
      case 2:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 3*TILE_LENGTH;
        break;
      case 3:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 6*TILE_LENGTH;
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
      this.movementSpeed = this.spriteWidth * sizeScaling;
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
    this.arrayJ = initialX / TILE_LENGTH;
    this.arrayI = initialY / TILE_LENGTH;
    this.willCollide = false;

    this.isEthereal = false;
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
        // console.log("proc");
        this.rightMovement();
      }
      else if (keyIsDown(LEFT_ARROW)) {
        // console.log("proc");
        this.leftMovement();
      }
      else if (keyIsDown(UP_ARROW)) {
        // console.log("proc");
        this.upMovement();
      }
      else if (keyIsDown(DOWN_ARROW)) {
        // console.log("proc");
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
      spriteSheet, this.initialX + this.locationX, this.initialY + this.locationY,
      TILE_LENGTH*this.sizeScaling, TILE_LENGTH*this.sizeScaling,
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
    // console.log("checking collison");
    if(this.xDirection === 1) {
      // console.log("right collison check");
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
        // console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.xDirection === -1) {
      // console.log("left collison check");
      // console.log(gridArray[this.arrayI][this.arrayJ - 1]);

      // prevent pallete collision
      if((this.arrayJ) === 1) {
        console.log("canvas out of bound");
        this.willCollide = true;
        return;
      }


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
        // console.log("no collision");
        this.willCollide = false;
      }
    }
    // NOTE: weird check added for up and down out of bound
    // left right work fine
    else if(this.yDirection === -1) {
      // console.log("up collison check");
      // console.log(gridArray[this.arrayI + 1][this.arrayJ]);

      if((this.arrayI) * TILE_LENGTH === 0) {
        console.log("canvas out of bound");
        this.willCollide = true;
        return;
      }

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
        // console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.yDirection === 1) {
      // console.log("down collison check");
      // console.log(gridArray[this.arrayI + 1][this.arrayJ]);

      if((this.arrayI) * TILE_LENGTH >= (CANVAS_HEIGHT_SCALING - 1) * TILE_LENGTH) {
        console.log("canvas out of bound");
        this.willCollide = true;
        return;
      }

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
        // console.log("no collision");
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
      // console.log("playing", moveSoundCounter);
      // moveSoundArray[moveSoundCounter].play();
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
    if (!this.isEthereal) {
      // let isInsidePallete = (
      //   this.locationX + this.initialX >= initialX &&
      //     this.locationX + this.initialX < initialX + initialSize &&
      //     this.locationY + this.initialY >= initialY  &&
      //     this.locationY + this.initialY < initialY + initialSize * palleteArray.length
      // );
      // console.log((this.locationX + this.initialX) / TILE_LENGTH);
      // console.log((this.locationY + this.initialY) / TILE_LENGTH);
      // console.log("character inside pallete?", isInsidePallete);
      // if (isInsidePallete) {
      //   for(let i = 0; i < palleteArray.length; i++) {
      //     if (palleteArray[i].isInside(this.locationX + this.initialX + 1, this.locationY + this.initialY + 1)) {
      //       brushColor = palleteArray[i].getColor();
      //       brushColorIndex = i;
      //       palleteArray[i].musicOnClick();
      //       console.log("color:", brushColor);
      //       console.log("red:", colorPaletteRGB[brushColorIndex][0]);
      //       console.log("green:", colorPaletteRGB[brushColorIndex][1]);
      //       console.log("blue:", colorPaletteRGB[brushColorIndex][2]);
      //       updateArduinoLED();
      //
      //     }
      //   }
      // }
      // else if ...
      if (isEraser){
        for (let i = 0; i < colorArray.length; i++) {
          // console.log(colorArray[i]);
          if (colorArray[i].isInside(this.locationX + this.initialX + 1, this.locationY + this.initialY + 1)) {
            // console.log("inside");
            colorArray[i].changeColor(canvasColor);
            // break;
          }
        }
        // if (!pixelMode) {
        //   clickPaintBrush(canvasColor);
        // }
      }
      else {
        for (let i = 0; i < colorArray.length; i++) {
          // console.log(colorArray[i]);
          // if (colorArray[i].isInside()) {
          if (colorArray[i].isInside(this.locationX + this.initialX + 1, this.locationY + this.initialY + 1) && colorArray[i].color != brushColor) {
            // console.log("inside");
            colorArray[i].changeColor(brushColor);
            // break;
          }
        }
        // if (!pixelMode) {
        //   clickPaintBrush(brushColor);
        // }
      }
    }


    // console.log("updating character %d ...", this.characterID);
    // console.log("current array of %d is [%d][%d]", this.characterID, this.arrayI, this.arrayJ);
    gridArray[this.arrayI][this.arrayJ] = 0;
    this.arrayI = (this.initialY+this.locationY) / 24;
    this.arrayJ = (this.initialX+this.locationX) / 24;
    gridArray[this.arrayI][this.arrayJ] = this.characterID;
    // console.log("array is updated[%d][%d]", this.arrayI, this.arrayJ);


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
      // console.log("not a movement key")
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
      // this.currentFrame = 11;
      this.currentFrame = this.animationLength*2 + 1;
      // console.log("update frame:", this.currentFrame);
    }
    this.xDirection = -1;
    if (this.currentFrame === this.animationLength*3) {
      // this.currentFrame = 11;
      this.currentFrame = this.animationLength*2 + 1;
    }

    if (this.animationLength === 1) {
      this.currentFrame = 2;
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

    if (this.animationLength === 1) {
      this.currentFrame = 0;
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

    if (this.animationLength === 1) {
      this.currentFrame = 3;
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

    if (this.animationLength === 1) {
      this.currentFrame = 1;
    }
    this.updateLocation();
  }

  etherealToggle() {
    this.isEthereal = !this.isEthereal;
    if (this.isEthereal) {
      this.animationLength = 1;
      this.spriteXCoordinate = 0;
      this.spriteYCoordinate = 15*TILE_LENGTH;
      this.currentFrame = 0;
    }
    else {
      this.animationLength = 5;
      this.spriteXCoordinate = 0;
      this.spriteYCoordinate = 0;
      this.currentFrame = 0;
    }
  }
}

class Enemy {
  constructor(
    spriteSheet,
    initialX, initialY,
    spriteWidth, spriteHeight,
    animationLength,
    amountOfVariation,
    characterID,
    color = '',
    sizeScaling = 1,
    // color = "#FFFFFF",
  ) {
    this.characterID = characterID;
    this.spriteSheet = spriteSheet;
    this.initialX = initialX;
    this.initialY = initialY;
    // this.spriteWidth = spriteWidth;
    // this.spriteHeight = spriteHeight;
    this.spriteWidth = 24;
    this.spriteHeight = 24;
    this.animationLength = animationLength;

    if (color === '') {
      this.color = colorPallete[0];
    }
    else {
      this.color = color;
    }
    switch (characterID) {
      case 1: // ally
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 0;
        break;
      case 2:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 3*TILE_LENGTH;
        if (this.color !== color) {
          while (true) {
            let randomColorIndex = floor(random(4));
            if (randomColorIndex !== brushColorIndex) {
              this.color = colorPallete[randomColorIndex];
              break;
            }
          }
        }
        break;
      case 3:
        this.spriteXCoordinate = 0;
        this.spriteYCoordinate = 6*TILE_LENGTH;
        if (this.color !== color) {
          this.color = colorPallete[floor(random(4)) + 4];
          while (true) {
            let randomColorIndex = floor(random(4)) + 4;
            if (randomColorIndex !== brushColorIndex) {
              this.color = colorPallete[randomColorIndex];
              break;
            }
          }
        }
        break;
      default:
        console.log("how");
    }
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
      this.movementSpeed = this.spriteWidth * sizeScaling;
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
    this.arrayJ = initialX / TILE_LENGTH;
    this.arrayI = initialY / TILE_LENGTH;
    this.willCollide = false;

    this.isEthereal = false;
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
  draw() {
    if(frameCount % (10*this.wobbleSpeed) === 0) {
      this.wobble();
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
      spriteSheet, this.initialX + this.locationX, this.initialY + this.locationY,
      TILE_LENGTH*this.sizeScaling, TILE_LENGTH*this.sizeScaling,
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
    // console.log("checking collison");
    if(this.xDirection === 1) {
      // console.log("right collison check");
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
        // console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.xDirection === -1) {
      // console.log("left collison check");
      // console.log(gridArray[this.arrayI][this.arrayJ - 1]);

      // prevent pallete collision
      if((this.arrayJ) === 1) {
        console.log("canvas out of bound");
        this.willCollide = true;
        return;
      }


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
        // console.log("no collision");
        this.willCollide = false;
      }
    }
    // NOTE: weird check added for up and down out of bound
    // left right work fine
    else if(this.yDirection === -1) {
      // console.log("up collison check");
      // console.log(gridArray[this.arrayI + 1][this.arrayJ]);

      if((this.arrayI) * TILE_LENGTH === 0) {
        console.log("canvas out of bound");
        this.willCollide = true;
        return;
      }

      if(gridArray[this.arrayI + 1][this.arrayJ] != 0) {
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
        // console.log("no collision");
        this.willCollide = false;
      }
    }
    else if(this.yDirection === 1) {
      // console.log("down collison check");
      // console.log(gridArray[this.arrayI + 1][this.arrayJ]);

      if((this.arrayI) * TILE_LENGTH >= (CANVAS_HEIGHT_SCALING - 1) * TILE_LENGTH) {
        console.log("canvas out of bound");
        this.willCollide = true;
        return;
      }

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
        // console.log("no collision");
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
      // console.log("playing", moveSoundCounter);
      // moveSoundArray[moveSoundCounter].play();
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
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      // if (colorArray[i].isInside()) {
      if (colorArray[i].isInside(this.locationX + this.initialX + 1, this.locationY + this.initialY + 1) && colorArray[i].color != this.color) {
        // console.log("inside");
        colorArray[i].changeColor(this.color);
        // break;
      }
    }

    // console.log("updating character %d ...", this.characterID);
    // console.log("current array of %d is [%d][%d]", this.characterID, this.arrayI, this.arrayJ);
    gridArray[this.arrayI][this.arrayJ] = 0;
    this.arrayI = (this.initialY+this.locationY) / 24;
    this.arrayJ = (this.initialX+this.locationX) / 24;
    gridArray[this.arrayI][this.arrayJ] = this.characterID;
    // console.log("array is updated[%d][%d]", this.arrayI, this.arrayJ);


  }

  ///////////////////////////////////////////////////////////////

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
      // this.currentFrame = 11;
      this.currentFrame = this.animationLength*2 + 1;
      // console.log("update frame:", this.currentFrame);
    }
    this.xDirection = -1;
    if (this.currentFrame === this.animationLength*3) {
      // this.currentFrame = 11;
      this.currentFrame = this.animationLength*2 + 1;
    }

    if (this.animationLength === 1) {
      this.currentFrame = 2;
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

    if (this.animationLength === 1) {
      this.currentFrame = 0;
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

    if (this.animationLength === 1) {
      this.currentFrame = 3;
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

    if (this.animationLength === 1) {
      this.currentFrame = 1;
    }
    this.updateLocation();
  }

  etherealToggle() {
    this.isEthereal = !this.isEthereal;
    if (this.isEthereal) {
      this.animationLength = 1;
      this.spriteXCoordinate = 0;
      this.spriteYCoordinate = 15*TILE_LENGTH;
      this.currentFrame = 0;
    }
    else {
      this.animationLength = 5;
      this.spriteXCoordinate = 0;
      this.spriteYCoordinate = 0;
      this.currentFrame = 0;
    }
  }
}
