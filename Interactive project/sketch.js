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
let speedUp = false;
let speedDown = false;
let rotationAngle = 0;
let rotateLeft = false;
let rotateRight = false;
let scalar = 0.08;
let playerShooting = false;
let bx = x; //bullet x
let by = y; // bullet y

//preloads picture 
function preload(){
  entity = loadImage("assets/Millenium Falcon.jpg");
  enemy = loadImage("TieFighter");
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
  //enemyShip();
  
}


function playerShip(){
  push();
  movePlayer();
  //playerShoot();
  pop();
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
function speed(){
  changeSpeed();
  applySpeed();
}

// changes speed of player
function changeSpeed(){
  if(speedUp && dx < 10){
    ax = 1;
  }
  if(speedDown && dx > 0){
    ax = -1;
  }
}

// applies speed to player
function applySpeed(){
  dx += ax; //add acceleration to velocity
  x += dx;  //add velocity to location
  ax = 0;  //reset acceleration
}

// function playerShoot(){
//   if(playerShooting){
//     moveBullet();
//     displayBullet();
//   }
// }

// function moveBullet(){
//     if(bx <= width && by <= height){
//       bx += 3;
//     } else {
//       playerShooting = false;
//     }
// }

// function displayBullet(){
//   fill("red");
//   rect(bx, by, 3, 5);
// }
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
  // if (key === "f"){
  //   playerShooting = false;  
  // }
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