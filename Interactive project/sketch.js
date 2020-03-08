// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let engineOff;
let engineOnMed;
let engineOnHigh;
let engineOnLow;
let enemy;
let explodedAsteroid;
let backgroundImage;
let collision = false;

//variables for player
let x;
let y;
let dx = 0; //ship displacement
let dy = 0;
let engine = false;
let speedUp = false;
let speedDown = false;
let rotationAngle = 0;
let rotateLeft = false;
let rotateRight = false;
let scalar = 0.35;
let playerShooting = false;
let bulletInMotion = false;
let bx = x; //bullet x
let by = y; // bullet y

//variables for asteroid
let asX = 0;
let asY = 0; 
let asDisX = 7;
let asDisY = 7;

let vertex1X;
let vertex1Y;
let vertex2X;
let vertex2Y;
let vertex3X;
let vertex3Y;
let vertex4X;
let vertex4Y;
let vertex5X;
let vertex5Y;
let vertex6X;
let vertex6Y;
  

//preloads picture 
function preload(){
  
  engineOff = loadImage("assets/Millenium-Falcon.png");
  engineOnMed = loadImage("assets/Millenium-Falcon-Thrust.png");
  engineOnHigh = loadImage("assets/Millenium-Falcon-Thrust-High.png");
  engineOnLow = loadImage("assets/Millenium-Falcon-Thrust-Low.png");
  //enemy = loadImage("assets/Tie Fighter.jpg");
  backgroundImage = loadImage("assets/gear.png");
  explodedAsteroid = loadImage("assets/explosion.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  angleMode(DEGREES);
  vertex1X = random(40,50);
  vertex1Y =random(40, 50);
  vertex2X = random(40, 50);
  vertex2Y = random(60, 65);
  vertex3X = random(55, 65);
  vertex3Y = random(80, 90);
  vertex4X = random(70, 80);
  vertex4Y = random(73, 78);
  vertex5X = random(82, 90);
  vertex5Y = random(55, 65);
  vertex6X = random(65, 78);
  vertex6Y = random(40, 50);
}

function draw() {
  background(0);
  playerShip();
  //enemyShip();
  asteroid();
}


function playerShip(){
  push();
  movePlayer();
  playerShoot();
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
  imageMode(CENTER);
  applySkin();
}

//Applies appropriate skin to player
function applySkin(){
  if(engine === false){
    image(engineOff, 0, 0, scalar * engineOff.width, scalar * engineOff.height);
  }
  if(engine === true){
    if(speedUp){
      image(engineOnHigh, 0, 0, scalar * engineOnHigh.width, scalar * engineOnHigh.height);
    }
    else if(speedDown){
      image(engineOnLow, 0, 0, scalar * engineOnLow.width, scalar * engineOnLow.height);
    }
    else {
      image(engineOnMed, 0, 0, scalar * engineOnMed.width, scalar * engineOnMed.height);
    }
  }
}

// changes direction of player
function changeDirection() {
  if (rotateLeft) {
    rotationAngle += 1.7;
  }
  if (rotateRight) {
    rotationAngle -= 1.7;
  }
}

// computes the speed and movement of player
function speed(){
  if(engine){
    applyRegularSpeed();
    checkForSpeedUp();
    checkForSpeedDown();
    x += dx;  
    y += dy;
  }
}

function checkForSpeedUp(){
  if(speedUp){
    dx = 7*cos(rotationAngle);
    dy = 7*sin(rotationAngle);
  }
}

function checkForSpeedDown(){
  if(speedDown){
    dx = 2*cos(rotationAngle);
    dy = 2*sin(rotationAngle);
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

//creates the asteroid
function asteroid (){
  if(collision === false){
    checkForCollision();
    moveAsteroid();
    drawAsteroid();
  }
  if(collision === true){
    destroyAsteroid();
  }
  
}

//moves the asteroid
function moveAsteroid(){
  asX += asDisX;
  asY += asDisY;

  if(asX >= width || asX <= 0){
    asDisX *= -1;
  }
  if(asY >= height || asY <= 0){
    asDisY *= -1;
  }
}

//draws the asteroid
function drawAsteroid(){
  translate(asX, asY);
  beginShape();
  vertex(vertex1X, vertex1Y);
  vertex(vertex2X, vertex2Y);
  vertex(vertex3X, vertex3Y);
  vertex(vertex4X, vertex4Y);
  vertex(vertex5X, vertex5Y);
  vertex(vertex6X, vertex6Y);
  endShape(CLOSE);
  fill("grey");
}

function checkForCollision(){
  if(asX - x <= 59 && asX - x >= -59 && asY - y <= 59 && asY - y >= -59){
    collision = true;
  }
}
function destroyAsteroid(){
  if(asX - x <= 70 && asX - x >= -70 && asY - y <= 70 && asY - y >= -70){
    image(explodedAsteroid, x, y, scalar*explodedAsteroid.width, scalar*explodedAsteroid.height);
  }
}