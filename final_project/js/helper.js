function initialize_color_pallete(item, index, arr) {
  // console.log("index:",index);
  // console.log("color:",item);
  // console.log("array length:", palleteArray.length);
  // console.log(arr);
  palleteArray.push(
    new PalleteSquare(initialX, initialY + index * initialSize, initialSize, item)
  );
}

function initialize_grid() {
  // console.log("i length is", gridArray.length);
  // console.log("j length is", gridArray[0].length);
  for(let i = 0; i < gridArray.length; i++) {
    // console.log("i is", i);
    for(let j = 1; j < gridArray[i].length; j++) {
      colorArray.push( new CanvasSquare(
        j * TILE_LENGTH, i * TILE_LENGTH, TILE_LENGTH, canvasColor
      ))
    }
  }
  // console.log(colorArray)
}

function nextColor() {
  brushColorIndex = (brushColorIndex + 1) % colorPallete.length;
  brushColor = colorPallete[brushColorIndex];
  palleteArray[brushColorIndex].musicOnClick();
  console.log("new color is", colorPallete[brushColorIndex]);
  updateArduinoLED();
  // serialWrite(cargo);
}

function prevColor() {
  brushColorIndex = brushColorIndex - 1;
  if (brushColorIndex < 0) { // loop around
    brushColorIndex = colorPallete.length - 1;
  }
  brushColor = colorPallete[brushColorIndex];
  palleteArray[brushColorIndex].musicOnClick();
  console.log("new color is", colorPallete[brushColorIndex]);
  updateArduinoLED();
  // serialWrite(cargo);
}

function updateArduinoLED() {
  cargo.red = colorPaletteRGB[brushColorIndex][0];
  cargo.green = colorPaletteRGB[brushColorIndex][1];
  cargo.blue = colorPaletteRGB[brushColorIndex][2];
  serialWrite(cargo);
}

function countGrid() {
  let counter = 0;

  // for(let i = 0; i < gridArray.length; i++) {
  //   // console.log("i is", i);
  //   for(let j = 0; j < gridArray[i].length; j++) {
  for (let i = 0; i < gridArray2.length; i++) {
    for (let j = 1; j < gridArray2[i].length; j++) {
      if (gridArray2[i][j] != 0) {
        counter += 1;
      }
    }
  }
  return counter;
}

function countColorGrid() {
  let counter = 0;

  // TODO: DO THIS
  // for(let i = 0; i < gridArray.length; i++) {
  //   // console.log("i is", i);
  //   for(let j = 0; j < gridArray[i].length; j++) {
  for (let i = 0; i < gridArray2.length; i++) {
    for (let j = 1; j < gridArray2[i].length; j++) {
      if (gridArray2[i][j] != 0) {
        counter += 1;
      }
    }
  }
  return counter;
}

function mapCounterToChance(counter) {
  let minValue = 0;
  let maxValue = (CANVAS_WIDTH_SCALING - 1) * (CANVAS_HEIGHT_SCALING);
  let minChance = 0.25;
  // let minChance = 0.05;
  let maxChance = 1.75;
  return map(counter, minValue, maxValue, maxChance, minChance);
}

// movement functions array
let movementFunctions = [
  function(enemy) { enemy.leftMovement(); },
  function(enemy) { enemy.rightMovement(); },
  function(enemy) { enemy.upMovement(); },
  function(enemy) { enemy.downMovement(); }
];

function randomEnemyMovement() {
  for(let i = 0; i < enemyArray.length; i++) {
    let willItHappen = floor(random(2));
    if (willItHappen === 1) {
      // let willItRun = floor(random(4));
      let randomIndex = floor(random(movementFunctions.length));
      // if (willItRun === 1) {
      //   for (let i = 0; i <= (floor(random(4))); i ++) {
      //     movementFunctions[randomIndex](enemyArray[i]);
      //   }
      // }
      movementFunctions[randomIndex](enemyArray[i]);
    }
  }
}

let spawnCount = 1;

function spawnEnemy() {
  console.log("spawn call");
  for (let i = 0; i < spawnCount; i++) {
    while (true) {
      let randomColumn = floor(random(CANVAS_WIDTH_SCALING - 1)) + 1;
      let randomRow = floor(random(CANVAS_HEIGHT_SCALING));
      console.log(randomRow, randomColumn);
      if (gridArray[randomRow][randomColumn] === 0) {
        // 2 to 3
        let enemyType = floor(random(2)) + 2;
        gridArray[randomRow][randomColumn] = enemyType;

        enemyArray.push( new Enemy(
          spriteSheet,
          TILE_LENGTH * randomColumn, TILE_LENGTH * randomRow, //location
          TILE_LENGTH, TILE_LENGTH, //size
          5, //animation length
          3, //variation amount
          enemyType, //character ID
        )
        )
        break;
      }
    }
  }
  spawnCount = 1;
  spawnCounters.forEach(counter => {
    counter.innerHTML = spawnCount;
  });
}

function spawnAlly() {
  console.log("spawn ally call");
  for (let i = 0; i < spawnCount; i++) {
    while (true) {
      let randomColumn = floor(random(CANVAS_WIDTH_SCALING - 1)) + 1;
      let randomRow = floor(random(CANVAS_HEIGHT_SCALING));
      console.log(randomRow, randomColumn);
      if (gridArray[randomRow][randomColumn] === 0) {
        // 2 to 3
        // let enemyType = floor(random(2)) + 2;
        gridArray[randomRow][randomColumn] = 1;

        enemyArray.push( new Enemy(
          spriteSheet,
          TILE_LENGTH * randomColumn, TILE_LENGTH * randomRow, //location
          TILE_LENGTH, TILE_LENGTH, //size
          5, //animation length
          3, //variation amount
          1, //character ID
          colorPallete[brushColorIndex]
        )
        )
        break;
      }
    }
  }
  spawnCount = 1;
  spawnCounters.forEach(counter => {
    counter.innerHTML = spawnCount;
  });
}
