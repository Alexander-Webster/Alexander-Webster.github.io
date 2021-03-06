// setInterval demo

let ballArray = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  window.setInterval(addBall, 1.0*10^-10000);
}

function draw(){
  background("white");
  moveBalls();
  displayBalls();

}

function displayBalls(){
  for (let i = 0; i < ballArray.length; i++){
    fill(ballArray[i].color);
    circle(ballArray[i].x, ballArray[i].y, ballArray[i].radius);
  }
}


function addBall() {
  let thisBall = {
    x: random(width),
    y: random(height),
    radius: random(25,50),
    color: color(random(255), random(255), random(255), random(255)),
  };

  ballArray.push(thisBall);
}

function moveBalls(){
  for(let i=0; i<ballArray.length; i++){
    let dx = random(-10,10);
    let dy = random(-10,10);
    ballArray[i].x += dx;
    ballArray[i].y += dy;
  }
}
