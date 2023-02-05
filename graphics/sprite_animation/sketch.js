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

// var keyDelay = 2;
// var increment = 0;

//516 44
//56 40
//9 per

///////////////////////////////////////////////////////////////
function preload() {
  spriteSheet = loadImage("assets/gameplay_sprites.png");
}

function setup() {
  frameRate(24);
  createCanvas(tileLength*canvasWidthScaling, tileLength*canvasHeightScaling);

  // spriteSheet.loadPixels();
  // var pixels = spriteSheet.pixels;

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

  // if(keyIsDown(RIGHT_ARROW) && frameCount % 6 === 0 & increment < keyDelay) {
  //   increment += 1;
  //   console.log("HODL:", increment);
  // }
  //
  // if(keyIsDown(RIGHT_ARROW) && frameCount % 4 === 0 & increment >= keyDelay) {
  //   // increment += 1;
  //   // console.log("HODL:", increment);
  //   console.log("proc");
  //   for(var i = 0; i < characterArray.length; i++) {
  //     characterArray[i].rightMovement();
  //   }
  // }

  for(var i = 0; i < characterArray.length; i++) {
    characterArray[i].draw();
  }
  // console.log("framerate:", frameRate());
  // image(spriteSheet, 0, 0, 24, 24, 24, 0, 24, 24)
  // image(
  //   spriteSheet, 0, 0,
  //   tileLength, tileLength,
  //   0,
  // 0,
  //   24, 24
  // )
  // for(let i = 0; i < palleteArray.length; i++) {
  //   palleteArray[i].draw();
  // }
  // if (renderBrushSizeIsTRUE) {
  //   renderBrushSize();
  // }
  // if (displayStatusBar) {
  //   renderStatusBar();
  // }
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
    // border = 0,
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
    // this.border = border;
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

    this.movementSpeed = 1;
    this.wobbleSpeed = 1;

    this.holdKeyDelay = 1;
    this.holdKeyCounter = 0;

    this.sleepIsForTheWeak = true;
    this.idleCounter = 0;
    this.idleDelay = 2;
  }

  draw() {
    if(frameCount % (10*this.wobbleSpeed) === 0) {
      this.wobble();
    }
    let movementKeyIsDown = (keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW));
    if(frameCount % 1 === 0 && movementKeyIsDown) {
      this.holdKeyCounter += 0.2;
      console.log("HODL:", this.holdKeyCounter);
    }
    if(frameCount % 3 === 0 && this.holdKeyCounter > this.holdKeyDelay) {
      // this.rightMovement();
      // this.normalMovementTap();
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
          console.log("inceased counter:", this.idleCounter)
        }
      }
      if(this.idleCounter > this.idleDelay) {
        this.idleBabaIsSleep();
      }
    }

    // for( this.acceleration < 2; this.acceleration++) {
    push();
    // scale(this.xDirection, this.yDirection);
    // if (this.xDirection === 0 && this.yDirection === 0) {
    //   console.log("yDirection is", this.yDirection)
    //   scale(1, this.yDirection);
    // }
    // else if (this.yDirection === 0 && this.xDirection === 0){
    //   console.log("xDirection is", this.xDirection)
    //   scale(this.xDirection, 1);
    // }
    // this.locationX += this.velocity * this.xDirection;
    // console.log("locationX is:", this.locationX);
    // this.locationY += this.velocity * this.yDirection;
    // console.log("update");
    // console.log("locationX, locationY is", this.locationX, this.locationY)
    // translate(this.locationX, this.locationY);
    noSmooth();
    // translate(this.velocity * this.xDirection, this.velocity * this.yDirection); //uncomment for glitchy fx
    // fill(this.color);
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

    // this.normalMovementHold();
    // while(this.acceleration < 1) {
    //   this.rightMovement();
    //   this.acceleration += 1;
    // }
  }

  wobble() {
    if(this.currentVariation >= this.amountOfVariation - 1) {
      this.currentVariation = 0;
    }
    else {
      this.currentVariation += 1;
    }
  }

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

  updateLocation() {
    this.locationX += this.velocity * this.xDirection;
    this.locationY += this.velocity * this.yDirection;
    if(isGridMovement) {
      this.velocity = 0;
      this.movementSpeed = 24;
    }
    this.idleCounter = 0;
  }

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
// function keyTyped() {
//   switch(key) {
//     case 'c':
//       //toggle eraser
//       if(isEraser) {
//         console.log("brush mode")
//         isEraser = false;
//       }
//       else {
//         console.log("eraser mode")
//         isEraser = true;
//       }
//       break;
//     // case 's':
//     //   if(renderBrushSizeIsTRUE) {
//     //     console.log("renderBrushSizeIsTRUE mode")
//     //     renderBrushSizeIsTRUE = false;
//     //   }
//     //   else {
//     //     console.log("renderBrushSizeIsFALSE mode")
//     //     renderBrushSizeIsTRUE = true;
//     //   }
//     //   break;
//     case 'q':
//       console.log("q is pressed")
//       //decrease brush size
//       if(brushStrokeIndex >= 1) {
//         brushStrokeIndex -= 1;
//         console.log("brush size:", brushStrokeArray[brushStrokeIndex]);
//       }
//       else {
//         console.log("cannot decrease brush stroke further")
//       }
//       break;
//     case 'w':
//       console.log("w is pressed")
//       //decrease brush size
//       if(brushStrokeIndex < brushStrokeArray.length -1) {
//         brushStrokeIndex += 1;
//         console.log("brush size:", brushStrokeArray[brushStrokeIndex]);
//       }
//       else {
//         console.log("cannot increase brush stroke further")
//       }
//       break;
//     case ' ':
//       console.log("<leader> is pressed")
//       //statusbar toggle
//       if(displayStatusBar) {
//         console.log("disabled statusbar")
//         displayStatusBar = false;
//         deleteStatusBar();
//       }
//       else {
//         console.log("statusbar enabled")
//         displayStatusBar = true;
//       }
//       break;
//     default:
//     console.log("not a shortcut");
//   }
// }

///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
// function rgbToHex(r, g, b) {
//   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
// }
//
// function extractTheme(sprite, xCoordinateOfTopCorner, yCordinateOfTopCorner, palleteWidth, palleteHeight, colorSquareSize) {
//   //initialize an appropriate 2D array
//   var themeArray = new Array(height);
//   for(var i = 0; i < height; i++) {
//     themeArray[i] = new Array(width);
//   }
//
//   //load color into the array
//   let startingPixel = "what";
//   let endingPixel = "what";
//   let wholeThing = 4 * (palleteWidth * pixelDensity() * (height * pixelDensity()));
//   for(var i = 4*palleteWidth; i < wholeThing; i += 4) {
//     for (var j = 4*palleteHeight; i < wholeThing; i += 4) {
//       theme[j/4/palleteHeight - 1][i/4/palleteWidth] = rbgToHex(pixels[1])
//
//     }
//   }
// }
// function initialize_color_pallete(item, index, arr) {
//   // console.log("index:",index);
//   // console.log("color:",item);
//   // console.log("array length:", palleteArray.length);
//   palleteArray.push(
//     new PalleteSquare(initialX, initialY + index * initialSize, initialSize, item)
//   );
// }

// class Theme {
//   constructor(colorSheet, xCoordinateOfTopCorner, yCordinateOfTopCorner, palleteWidth, palleteHeight, colorSquareSize) {
//     this.colorSheet = colorSheet;
//
//   }
//
// }

