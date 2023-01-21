function setup() {
  createCanvas(200, 200);
}

function draw() {
  background('#000081');
  
  push();
  stroke('#ffffff');
  strokeWeight(2);
  fill('#008000');
  circle(100, 100, 75);
  fill('#FF0000');
  star(100, 100, 15, 40, 5);
  pop();
}

//modified version of https://p5js.org/examples/form-star.html
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = PI+HALF_PI; a < 3*PI+HALF_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
