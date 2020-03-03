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
let movingUp = false;
let movingDown = false;
let movingLeft = false;
let movingRight = false;
let scalar = 0.2;

//preloads picture 
function preload(){
  entity = loadImage("assets/Millenium Falcon.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  moveEntity();
  createShip();
  
}



//creates image of ship
function createShip(){
  image(entity, x, y, scalar * entity.width, scalar * entity.height);
}













































function keyPressed() {
  if (key === "w") {
    movingUp = true;
    
  }
  if (key === "a") {
    movingLeft = true;
  }
  if (key === "s") {
    movingDown = true;
  }
  if (key === "d") {
    movingRight = true;
  }
}

function keyReleased() {
  if (key === "w") {
    movingUp = false;
  }
  if (key === "a") {
    movingLeft = false;
  }
  if (key === "s") {
    movingDown = false;
  }
  if (key === "d") {
    movingRight = false;
  }
}


function moveEntity() {
  if (movingUp) {
    y -= dy;
  }
  if (movingLeft) {
    x -= dx;
  }
  if (movingDown) {
    y += dy;
  }
  if (movingRight) {
    x += dx;
  }
}



