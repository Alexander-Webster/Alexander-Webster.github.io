// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let entity;
let backgroundImage;

let x;
let y;
let dx = 0;
let dy = 0;
let ax = 0;
let ay = 0;
let speedUp = false;
let speedDown = false;
let rotationAngle = 0;
let rotateLeft = false;
let rotateRight = false;
let scalar = 0.08;

//preloads picture 
function preload(){
  entity = loadImage("assets/Millenium Falcon.jpg");
  backgroundImage = loadImage("assets/Space background.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  angleMode(DEGREES);
}

function draw() {
  background(backgroundImage);
  playerShip();
  
}


function playerShip(){
  movePlayer();
}

//creates image of ship
function createShip(){
  translate(x, y);
  rotate(rotationAngle);
  image(entity, 0, 0, scalar * entity.width, scalar * entity.height);
}

// moves the player
function movePlayer(){
  changeDirection();
  speed();
  createShip();
}

// changes direction of player
function changeDirection() {
  if (rotateLeft) {
    rotationAngle += 1;
  }
  if (rotateRight) {
    rotationAngle -= 1;
  }
}

//computes speed of player
function speed(){
  changeSpeed();
  applySpeed();
}

// changes speed of player
function changeSpeed(){
  if(speedUp){
    ax = 1;
  }
  if(speedDown){
    ax = -1;
  }
}

// applies speed to player
function applySpeed(){
  dx += ax; //add acceleration to velocity
  x += dx;  //add velocity to location
  ax = 0;  //reset acceleration
}

// Changes speed and rotation booleans
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

// changes speed and rotation booleans
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