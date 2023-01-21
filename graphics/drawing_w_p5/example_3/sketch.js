function setup() {
  createCanvas(200, 100);
}

function draw() {
  background(0);

  //why is the pie value the reverse? (clock-wise)
  push();
  fill('#FFF84A');
  arc(50, 50, 75, 75, PI + QUARTER_PI, PI - QUARTER_PI);
  pop();

  push();
  fill('#EA412C');
  rect(110, 40, 80, 50);
  arc(150, 45, 80, 75, PI, TWO_PI);
  pop();

  push();
  fill('#ffffff');
  noStroke();
  circle(130, 45, 24);
  circle(170, 45, 24);
  pop();

  push();
  fill('#0044F7');
  noStroke();
  circle(130, 45, 14);
  circle(170, 45, 14);
  pop();
}
