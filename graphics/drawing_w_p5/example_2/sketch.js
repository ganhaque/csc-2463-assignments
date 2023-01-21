function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(255);
  
  push();
  noStroke();
  fill(255, 0, 0, 70);
  circle(100, 75, 100);
  pop();
  
  push();
  noStroke();
  fill(0, 255, 0, 70);
  circle(135, 125, 100);
  pop();

  push();
  noStroke();
  fill(0, 0, 255, 70);
  circle(65, 125, 100);
  pop();
}
