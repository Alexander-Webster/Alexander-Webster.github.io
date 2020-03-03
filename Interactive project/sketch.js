// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let entity;

let x;
let y;
let dx = 5;
let dy = 5;
let speedUp = false;
let speedDown = false;
let turnLeft = false;
let turnRight = false;
let scalar = 0.2;
let rotation = 0;

//preloads picture 
function preload(){
  entity = loadImage("assets/Millenium Falcon.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  angleMode(DEGREES);
}

function draw() {
  background(220);
  playerShip();
  
}



//creates image of ship
function createShip(){
  image(entity, x, y, scalar * entity.width, scalar * entity.height);
}


function playerShip(){
  // moveEntity();
  createShip();
}

function movePlayer(){
  changeDirection();
  changeSpeed();
}



































function keyPressed() {
  if (key === "w") {
    speedUp = true; 
  }
  if (key === "a") {
    rotateLeft = true;
  }
  if (key === "s") {
    speedDown = true;
  }
  if (key === "d") {
    rotateRight = true;
  }
}

function keyReleased() {
  if (key === "w") {
    speedUp = false;
  }
  if (key === "a") {
    rotateLeft = false;
  }
  if (key === "s") {
    speedDown = false;
  }
  if (key === "d") {
    rotateRight = false;
  }
}


// function changeDirection() {
//   if (rotateLeft) {
//     rotate()
//   }
//   if (movingLeft) {
//     x -= dx;
//   }
//   if (movingDown) {
//     y += dy;
//   }
//   if (movingRight) {
//     x += dx;
//   }
// }



