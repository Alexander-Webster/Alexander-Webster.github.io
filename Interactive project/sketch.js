// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let entity;
let enemy;
let backgroundImage;

let x;
let y;
let dx = 0; //ship displacement
let dy = 0;
let ax = 0; // ship acceleration
let ay = 0;
let engine = false;
let speedUp = false;
let speedDown = false;
let rotationAngle = 0;
let rotateLeft = false;
let rotateRight = false;
let scalar = 0.08;
let playerShooting = false;
let bulletInMotion = false;
let bx = x; //bullet x
let by = y; // bullet y

//preloads picture 
function preload(){
  entity = loadImage("assets/Millenium Falcon.jpg");
  //enemy = loadImage("assets/Tie Fighter.jpg");
  backgroundImage = loadImage("assets/gear.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  angleMode(DEGREES);
}

function draw() {
  background(0);
  playerShip();
  //enemyShip();
  
}


function playerShip(){
  // push();
  movePlayer();
  playerShoot();
  // pop();
}

// moves the player
function movePlayer(){
  changeDirection();
  speed();
  createShip();
}

//creates image of ship
function createShip(){
  translate(x, y);
  rotate(rotationAngle);
  imageMode(CENTER);
  image(entity, 0, 0, scalar * entity.width, scalar * entity.height);
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


// applies speed to player
function speed(){
  if(engine){
    applyRegularSpeed();
    checkForSpeedUp();
    checkForSpeedDown();
    x += dx;  //add velocity to location
    y += dy;
  }
}

function checkForSpeedUp(){
  if(speedUp){
    dx = 10*cos(rotationAngle);
    dy = 10*sin(rotationAngle);
  }
}

function checkForSpeedDown(){
  if(speedDown){
    dx = 1*cos(rotationAngle);
    dy = 1*sin(rotationAngle);
  }
}

function applyRegularSpeed(){
  dx = 4*cos(rotationAngle);
  dy = 4*sin(rotationAngle);
}



function playerShoot(){
  if(playerShooting || bulletInMotion){
    moveBullet();
    displayBullet();
  }
}

function moveBullet(){
  bulletInMotion = true;
  if(bx <= width && by <= height){
    bx += 3;
  } 
  else {
    bulletInMotion = false;
  }
}

function displayBullet(){
  fill("red");
  rect(bx, by, 3, 5);
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
  if(key === "f"){
    playerShooting = true;
  }
  if(key === "e"){
    engine = true;
  }
  if(key === "r"){
    engine = false;
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
  if (key === "f"){
    playerShooting = false;  
  }
}

// function enemyShip(){
//   enemyMove();
//   enemyShoot();
// }

// function enemyMove(){
//   movementTie();
//   createEnemy();
// }

// function enemyShoot(){
// }