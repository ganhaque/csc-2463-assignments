// let spriteSheet;
//
// let spriteSheetFilenames = ["bug2.png" ];
// let spriteSheets = [];
// let animations = [];
//
// const GameState = {
//   Start: "Start",
//   Playing: "Playing",
//   GameOver: "GameOver"
// };
//
// let game = { score: 0, maxScore: 0, maxTime: 10, elapsedTime: 0, totalSprites: 15, state: GameState.Start, targetSprite: 2 };
//
// function preload() {
//   for(let i=0; i < spriteSheetFilenames.length; i++) {
//     spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
//   }
// }
//
// function setup() {
//   createCanvas(400, 400);
//   imageMode(CENTER);
//   angleMode(DEGREES);
//
//   reset();
// }
//
// function reset() {
//   game.elapsedTime = 0;
//   game.score = 0;
//   game.totalSprites = random(10,30);
//
//   animations = [];
//   for(let i=0; i < game.totalSprites; i++) {
//     animations[i] = new WalkingAnimation(random(spriteSheets),32,32,random(100,300),random(100,300),9,random(0.5,1),4,random([0,1]));
//   }
// }
//
// function draw() {
//   switch(game.state) {
//     case GameState.Playing:
//       background(220);
//   
//       for(let i=0; i < animations.length; i++) {
//         animations[i].draw();
//       }
//       fill(0);
//       textSize(40);
//       text(game.score,20,40);
//       let currentTime = game.maxTime - game.elapsedTime;
//       text(ceil(currentTime), 300,40);
//       game.elapsedTime += deltaTime / 1000;
//
//       if (currentTime < 0)
//         game.state = GameState.GameOver;
//       break;
//     case GameState.GameOver:
//       game.maxScore = max(game.score,game.maxScore);
//
//       background(0);
//       fill(255);
//       textSize(40);
//       textAlign(CENTER);
//       text("Game Over!",200,200);
//       textSize(35);
//       text("Score: " + game.score,200,270);
//       text("Max Score: " + game.maxScore,200,320);
//       break;
//     case GameState.Start:
//       background(0);
//       fill(255);
//       textSize(50);
//       textAlign(CENTER);
//       text("Cyclops Game",200,200);
//       textSize(30);
//       text("Press Any Key to Start",200,300);
//       break;
//   }
// }
//
// function keyPressed() {
//   switch(game.state) {
//     case GameState.Start:
//       game.state = GameState.Playing;
//       break;
//     case GameState.GameOver:
//       reset();
//       game.state = GameState.Playing;
//       break;
//   }
// }
//
// function mousePressed() {
//   switch(game.state) {
//     case GameState.Playing:
//       for (let i=0; i < animations.length; i++) {
//         let contains = animations[i].contains(mouseX,mouseY);
//         if (contains) {
//           if (animations[i].moving != 0) {
//             animations[i].stop();
//             if (animations[i].spritesheet === spriteSheets[game.targetSprite])
//               game.score += 1;
//             else
//               game.score -= 1;
//           }
//           else {
//             if (animations[i].xDirection === 1)
//               animations[i].moveRight();
//             else
//               animations[i].moveLeft();
//           }
//         }
//       }
//       break;
//     // case GameState.GameOver:
//     //   reset();
//     //   game.state = GameState.Playing;
//     //   break;
//   }
//   
// }
//
// class WalkingAnimation {
//   constructor(spritesheet, spriteWidth, spriteHeight,
//     locationX, locationY,
//     animationLength,
//     movementSpeed,
//     framerate,
//     onlyMoveVertically = false
//   ) {
//     this.spritesheet = spritesheet;
//     this.spriteWidth = spriteWidth;
//     this.spriteHeight = spriteHeight;
//
//     this.locationX = locationX;
//     this.locationY = locationY;
//
//     this.u = 0;
//     this.v = 0;
//     this.animationLength = animationLength;
//     this.currentFrame = 0;
//
//     this.moving = 1;
//     this.xDirection = 1;
//     this.movementSpeed = movementSpeed;
//     this.framerate = framerate*movementSpeed;
//     this.onlyMoveVertically = onlyMoveVertically;
//   }
//
//   draw() {
//
//     // if (this.moving != 0)
//     //   this.u = this.currentFrame % this.animationLength;
//     // else
//     //   this.u = 0;
//
//     this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;
//     push();
//     translate(this.locationX,this.locationY);
//     if (!this.onlyMoveVertically)
//       rotate(90);
//     scale(this.xDirection,1);
//     
//
//     //rect(-26,-35,50,70);
//
//     image(this.spritesheet,0,0,
//       this.spriteWidth,this.spriteHeight,
//       this.u*this.spriteWidth,
//       this.v*this.spriteHeight,
//       this.spriteWidth,this.spriteHeight);
//     pop();
//     let proportionalFramerate = round(frameRate() / this.framerate);
//     if (frameCount % proportionalFramerate == 0) {
//       this.currentFrame++;
//     }
//   
//     if (this.onlyMoveVertically) {
//       this.locationY += this.moving*this.movementSpeed;
//       this.move(this.locationY,this.spriteWidth / 4,height - this.spriteWidth / 4);
//     }
//     else {
//       this.locationX += this.moving*this.movementSpeed;
//       this.move(this.locationX,this.spriteWidth / 4,width - this.spriteWidth / 4);
//     }
//
//     
//   }
//
//   move(position,lowerBounds,upperBounds) {
//     if (position > upperBounds) {
//       this.moveLeft();
//     } else if (position < lowerBounds) {
//       this.moveRight();
//     }
//   }
//
//   moveRight() {
//     this.moving = 1;
//     this.xDirection = 1;
//     this.v = 0;
//   }
//
//   moveLeft() {
//     this.moving = -1;
//     this.xDirection = -1;
//     this.v = 0;
//   }
//
//   keyPressed(right, left) {
//     if (keyCode === right) {
//       
//       this.currentFrame = 1;
//     } else if (keyCode === left) {
//
//       this.currentFrame = 1;
//     }
//   }
//
//   keyReleased(right,left) {
//     if (keyCode === right || keyCode === left) {
//       this.moving = 0;
//     }
//   }
//
//   contains(x,y) {
//     //rect(-26,-35,50,70);
//     let insideX = x >= this.locationX - 26 && x <= this.locationX + 25;
//     let insideY = y >= this.locationY - 35 && y <= this.locationY + 35;
//     return insideX && insideY;
//   }
//
//   stop() {
//     this.moving = 0;
//     this.u = 7;
//     this.v = 8;
//   }
// }
//
// ///////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////
function preload() {
  // soundFormats('ogg', 'mp3');
  // moveSoundArray.push(loadSound('assets/sound_fx/047'));
  spriteSheet = loadImage("assets/bug2.png");
}

function setup() {
  frameRate(60);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // createCanvas(displayWidth, displayHeight);
  // bugArray.push(new Bug(spriteSheet, 8*TILE_LENGTH, 5*TILE_LENGTH, TILE_LENGTH, 1, "h", 1, 1, 1 ));
  // bugArray.push(new Bug(spriteSheet, 8000, 5000, 2400, 1, "v", 1, 0.5, 1 ));
  bugArray.push(new Bug(spriteSheet, 200, 400, 600, 960, "v", 1, -10, 0.5 ));
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
  background(CANVAS_COLOR);
  // renderPlayground(CANVAS_WIDTH, CANVAS_HEIGHT, CANVAS_COLOR);
  for(let i = 0; i < bugArray.length; i++) {
    bugArray[i].draw();
  }
  //sprite searcher //DO NOT CLEAN UP
  // noSmooth();
  // image(spriteSheet, 0, 200, 220, 400, 600, 0, 600, 960);
  image(spriteSheet, 0, 200, 220, 400, 0, 940, 600, 960);
}

///////////////////////////////////////////////////////////////
function keyPressed() {
}

///////////////////////////////////////////////////////////////
function renderPlayground(width, height, color) {
  fill(color);
  rect(0, 0, width, height);
}
function mousePressed() {
  for(let i = 0; i < bugArray.length; i++) {
    bugArray[i].hitboxCheck(mouseX, mouseY);
    console.log(bugArray[i].hitboxCheck(mouseX, mouseY));
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
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;

    // this.characterType = characterType;
    // switch(characterType) {
    //   case 1:
    //     console.log("execute");
    //     this.spriteXCoordinate = 0;
    //     this.spriteYCoordinate = 4*TILE_LENGTH;
    // }

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
          break;
        case 'v':
          this.onlyMoveVertically = true;
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
  }

  ///////////////////////////////////////////////////////////////
  draw() {
    push();
    noSmooth();

    this.checkCanvasCollision();

    if(frameCount % 4 === 0) {
      // console.log("call");
      this.animationHandler();
    }

    if(this.isAlive) {
      this.updateLocation();
    }

    //show hitbox
    // rect(12, 10, this.spriteWidth - 23, this.spriteHeight - 16);
    // this.hitboxCheck()
    // console.log(this.hitboxCheck(mouseX, mouseY));
    // this.hitboxCheck(mouseX, mouseY);
    // image(spriteSheet, 0, 200, 220, 400, 0, 0, 600, 960);
    image(
      spriteSheet, this.initalX, this.initalY,
      220*this.sizeScaling, 400*this.sizeScaling,
      this.spriteXCoordinate + (this.spriteWidth * this.currentFrame),
      this.spriteYCoordinate,
      this.spriteWidth, this.spriteHeight
    )
    pop();
  }

  ///////////////////////////////////////////////////////////////
  hitboxCheck(x,y) {
    // console.log("check hitbox...");
    rect(12, 10, this.spriteWidth - 23, this.spriteHeight - 16);
    let insideX = (x >= this.initalX + 12 && x <= this.initalX + 12);
    console.log("x:", insideX);
    let insideY = (y >= this.initalY + this.spriteWidth - 23 && x <= this.initalX + 12);
    console.log("y:", insideY);
    return (insideX && insideY)
  }

  ///////////////////////////////////////////////////////////////
  updateLocation() {
    // if(this.erracticMovement === true) {
    //
    // }
    if(this.onlyMoveHorizontally === true) {
      this.velocity = calculateSide(this.movementSpeed, 0)
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
      this.velocity = calculateSide(this.movementSpeed, 0)
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
    if(this.initalX - 12 > width || this.initalX - 12 < 0) {
      // console.log("collided");
      this.movementSpeed *= -1;
    }
    if(this.sizeScaling * this.initalY < 0) {
      console.log("collided");
      this.movementSpeed *= -1;
      this.spriteYCoordinate = 910;
    }
    if(this.initalY + this.sizeScaling*400 > height) {
      console.log("collided");
      this.movementSpeed *= -1;
      this.spriteYCoordinate = 0;
    }
  }

  animationHandler() {
    switch(this.currentFrame) {
      case 0:
        // console.log("a:", this.currentMovementVariation);
        if(this.currentMovementVariation === 0) {
          // console.log("0-1");
          this.currentFrame += 1;
        }
        else {
          // console.log("0-2");
          this.currentFrame = 3;
        }
        break;
      case 1:
        if(this.currentMovementVariation === 0) {
          this.currentFrame += 1;
        }
        else {
          this.currentFrame -= 1;
        }
        break;
      case 2:
        this.currentFrame -= 1;
        // console.log("b:", this.currentMovementVariation);
        this.currentMovementVariation = 1;
        // console.log("a:", this.currentMovementVariation);
        break;
      case 3:
        if(this.currentMovementVariation === 1) {
          this.currentFrame += 1;
        }
        else {
          this.currentFrame = 0;
        }
        break;
      case 4:
        if(this.currentMovementVariation === 1) {
          this.currentFrame -= 1;
          // console.log("a:", this.currentMovementVariation);
          this.currentMovementVariation = 0;
          // console.log("a:", this.currentMovementVariation);
        }
        break;
      default:
      console.log("animation went wrong");
    }
  }
}

///////////////////////////////////////////////////////////////
function calculateSide(hypotenuseLength, angle) {
  return hypotenuseLength * Math.cos(angle);
}
