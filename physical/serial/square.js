class CanvasSquare {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isEmpty = true;
  }
  draw() {
    push();
    if (!showGrid) {
      noStroke();
    }
    fill(this.color);
    square(this.x, this.y, this.size);
    pop();
  }
  changeColor(newColor) {
    this.isEmpty = false;
    this.color = newColor;
    // console.log("playing note", interpretNote(this.x/CANVAS_WIDTH_SCALING));
    if (newColor != canvasColor) {
      // marimba.triggerAttackRelease(interpretNote(this.x/CANVAS_WIDTH_SCALING), '2n');
      // console.log(notes[this.y / CANVAS_HEIGHT_SCALING]);
      console.log(this.y / TILE_LENGTH);
      // synth.triggerAttackRelease(notes[this.y / TILE_LENGTH], '16n')
      this.updateGrid(1);
    }
    else {
      this.updateGrid(0);
    }
    // instrument.triggerAttackRelease(interpretNote(this.x/CANVAS_WIDTH_SCALING), '2n');
  }
  updateGrid(num) {
    gridArray[this.y / TILE_LENGTH][this.x / TILE_LENGTH] = num;
    console.log("updated grid at: ", this.y / TILE_LENGTH, " ", this.x / TILE_LENGTH)
  }
  isInside() {
    let isInsideX = (mouseX >= this.x && mouseX <= this.x + this.size);
    let isInsideY = (mouseY >= this.y && mouseY <= this.y + this.size);

    // console.log("x:", isInsideX);
    // console.log("y:", isInsideY);
    return (isInsideX && isInsideY);
  }
}

class PalleteSquare {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  draw() {
    fill(this.color);
    square(this.x, this.y, this.size);
  }
  getColor() {
    if (this.isInside()) {
      return this.color;
    }
  }
  isInside() {
    let isInsideX = (mouseX >= this.x && mouseX <= this.x + this.size);
    let isInsideY = (mouseY >= this.y && mouseY <= this.y + this.size);

    // console.log("x:", isInsideX);
    // console.log("y:", isInsideY);
    return (isInsideX && isInsideY);
  }
  // musicOnClick() {
  //   console.log(this.y / TILE_LENGTH);
  //   synth.triggerAttackRelease(notes[this.y / TILE_LENGTH], '16n')
  // }
}

