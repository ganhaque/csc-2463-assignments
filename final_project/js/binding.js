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

function keyTyped() {
  switch(key) {
    case 'c':
      //toggle eraser
      if(isEraser) {
        console.log("brush mode")
        isEraser = false;
      }
      else {
        console.log("eraser mode")
        isEraser = true;
      }
      break;
    case 'q':
      prevColor();
      break;
    case 'w':
      nextColor();
      break;
    case 'e':
      for(let i = 0; i < characterArray.length; i++) {
        characterArray[i].etherealToggle();
      }
      break;
    case 'r':
      spawnCount -= 1;
      spawnCounters.forEach(counter => {
        counter.innerHTML = spawnCount;
      });
      break;
    case 't':
      spawnCount += 1;
      spawnCounters.forEach(counter => {
        counter.innerHTML = spawnCount;
      });
      break;
    case 'a':
      spawnAlly();
      break;
    case 'f':
      spawnEnemy();
      break;
    default:
      console.log("not a shortcut");
  }
}


function mousePressed() {
  console.log("pressed");
  let isInsidePallete = (
    mouseX >= initialX &&
      mouseX <= initialX + initialSize &&
      mouseY >= initialY  &&
      mouseY <= initialY + initialSize * palleteArray.length
  );
  // let leftMouseIsPressed = (mouseIsPressed && mouseButton === LEFT);
  // if (leftMouseIsPressed) {
  if (isInsidePallete) {
    for(let i = 0; i < palleteArray.length; i++) {
      if (palleteArray[i].isInside()) {
        brushColor = palleteArray[i].getColor();
        brushColorIndex = i;
        palleteArray[i].musicOnClick();
        console.log("color:", brushColor);
        console.log("red:", colorPaletteRGB[brushColorIndex][0]);
        console.log("green:", colorPaletteRGB[brushColorIndex][1]);
        console.log("blue:", colorPaletteRGB[brushColorIndex][2]);
        updateArduinoLED();

      }
    }
  }
  else if (isEraser){
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      if (colorArray[i].isInside()) {
        // console.log("inside");
        colorArray[i].changeColor(canvasColor);
      }
    }
    if (!pixelMode) {
      clickPaintBrush(canvasColor);
    }
  }
  else {
    for (let i = 0; i < colorArray.length; i++) {
      // console.log(colorArray[i]);
      // if (colorArray[i].isInside()) {
      if (colorArray[i].isInside() && colorArray[i].color != brushColor) {
        // console.log("inside");
        colorArray[i].changeColor(brushColor);
      }
    }
    if (!pixelMode) {
      clickPaintBrush(brushColor);
    }
  }
}

function mouseDragged() {
  let isInsidePallete = (
    mouseX >= initialX &&
      mouseX <= initialX + initialSize &&
      mouseY >= initialY  &&
      mouseY <= initialY + initialSize * palleteArray.length
  );
  if (!isInsidePallete) {
    if (!isEraser) {
      console.log("drawing w/", brushColor);
      // console.log("else", colorArray.length);
      for (let i = 0; i < colorArray.length; i++) {
        // console.log(colorArray[i]);
        if (colorArray[i].isInside() && colorArray[i].color != brushColor) {
          // console.log("inside");
          colorArray[i].changeColor(brushColor);
          // renderColor();
        }
      }
      if (!pixelMode) {
        paintBrush(brushColor);
      }
    }
    else {
      console.log("erasing");
      for (let i = 0; i < colorArray.length; i++) {
        // console.log(colorArray[i]);
        if (colorArray[i].isInside()) {
          // console.log("inside");
          colorArray[i].changeColor(canvasColor);
        }
      }
      if (!pixelMode) {
        paintBrush(canvasColor);
      }
    }
  }
}


