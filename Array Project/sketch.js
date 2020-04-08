// Asteroid Escape
// Alexander Webster
// March 9th, 2020
//
// Extra for Experts:
// Added sound, Created an entity with animations, Added respawn mechanics, Incorporated (self-made) collision codes + animation, Added a color changer

//variables for falcon engine states
let engineOff;
let engineOnMed;
let engineOnHigh;
let engineOnLow;

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

//variables for tie fighter
let tieFighter;
let tieX = 200;
let tieY = 200;
let tieDisX = 2;
let tieDisY = 2;

//asteroid array
let asteroidArray = [];


//sounds
let milleniumEngineSound;
let asteroidExplosion;


//instruction
let instruct;

//preloads picture 
function preload(){
  
  engineOff = loadImage("assets/Millenium-Falcon.png");
  engineOnMed = loadImage("assets/Millenium-Falcon-Thrust.png");
  engineOnHigh = loadImage("assets/Millenium-Falcon-Thrust-High.png");
  engineOnLow = loadImage("assets/Millenium-Falcon-Thrust-Low.png");
  asteroidExplosion = loadImage("assets/explosion.png");
  tieFighter = loadImage("assets/Tie Fighter Good.png");

  soundFormats("mp3");
  asteroidExplosion = loadSound("assets/Star Wars explosion 1 good");
  milleniumEngineSound = loadSound("assets/Millenium Falcon Engine Sound");
}






function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  angleMode(DEGREES);
    
  for(let i = 0; i<6; i++){
    let asteroid = {
      //asteroid movement
      posX: random(0,75),
      posY: 0, 
      DisX: 0.2,
      DisY: 0.2,
      //asteroid shape
      vertex1X: random(40,50),
      vertex1Y: random(40, 50),
      vertex2X: random(40, 50),
      vertex2Y: random(60, 65),
      vertex3X: random(55, 65),
      vertex3Y: random(80, 90),
      vertex4X: random(70, 80),
      vertex4Y: random(73, 78),
      vertex5X: random(82, 90),
      vertex5Y: random(55, 65),
      vertex6X: random(65, 78),
      vertex6Y: random(40, 50),
    };
    asteroidArray.push(asteroid);
  }
  instruct = "A & D to rotate  W & S for speed  E & R for power                   P to spawn asteroid    Scroll to change asteroid color";
}





//creates the game
function draw() {
  background(0);
  displayInstructions();
  playerShip();
  createAsteroid();
  createTieFighter();
}

function displayInstructions(){
  fill("white");
  text(instruct,80, 80, 120, 120);
}


















// Creates player controlled millenium falcon
function playerShip(){
  push();
  movePlayer();
  pop();
  falconSound();
}

//Applies
function falconSound(){
  if(engine === false){
    milleniumEngineSound.stop();
  } 
  else {
    milleniumEngineSound.loop();
  }
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
    checkForWalls();
  }
}

//Restricts falcon movement to inside the canvas
function checkForWalls(){
  if(x <= width && x >= 0){
    x += dx;  
  }
  if(y <= height && y >= 0){
    y += dy; 
  }
  if(x > width){
    x = width;  
  }
  if(y > height){
    y = height; 
  }
  if(x < 0){
    x = 0;  
  }
  if(y < 0){
    y = 0; 
  }
}

//checks for a speed up and applies a faster speed
function checkForSpeedUp(){
  if(speedUp){
    dx = 7*cos(rotationAngle);
    dy = 7*sin(rotationAngle);
  }
}

//checks for a speed down and applies a slower speed
function checkForSpeedDown(){
  if(speedDown){
    dx = 2*cos(rotationAngle);
    dy = 2*sin(rotationAngle);
  }
}

//applies the regular speed to the falcon
function applyRegularSpeed(){
  dx = 4*cos(rotationAngle);
  dy = 4*sin(rotationAngle);
}
















// changes specific booleans with key inputs (character rotation, power)
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
  if(key === "e"){
    engine = true;
  }
  if(key === "r"){
    engine = false;
  }
}

// changes specific booleans with key inputs (character rotation, power)
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





















//START OF ASTEROID CODE



//creates the asteroid
// function createAsteroid (){
//   if(asteroid.collision === false){
//     moveAsteroid();
//     drawAsteroid();
//     checkForCollision();
    
//   }
//   if(asteroid.collision === true){
//     destroyAsteroid();

//   }
//   if(asteroid.resetAsteroid){
//     asteroid.collision = false;
//     asteroid.posX = random(0,width);
//     asteroid.posY = 0;
//   }
  
// }

// //moves the asteroid
// function moveAsteroid(){
//   asteroid.posX += asteroid.DisX;
//   asteroid.posY += asteroid.DisY;

//   if(asteroid.posX >= width || asteroid.posX <= 0){
//     asteroid.DisX *= -1;
//   }
//   if(asteroid.posY >= height || asteroid.posY <= 0){
//     asteroid.DisY *= -1;
//   }
// }

// //draws the asteroid
// function drawAsteroid(){
//   translate(asteroid.posX, asteroid.posY);
//   rectMode(CENTER);
//   fill(asteroid.asteroidColorR, asteroid.asteroidColorG, asteroid.asteroidColorB);
//   beginShape();
//   vertex(asteroid.vertex1X, asteroid.vertex1Y);
//   vertex(asteroid.vertex2X, asteroid.vertex2Y);
//   vertex(asteroid.vertex3X, asteroid.vertex3Y);
//   vertex(asteroid.vertex4X, asteroid.vertex4Y);
//   vertex(asteroid.vertex5X, asteroid.vertex5Y);
//   vertex(asteroid.vertex6X, asteroid.vertex6Y);
//   endShape(CLOSE);
  
// }

// //checks for a collision between falcon and asteroid
// function checkForCollision(){
//   if(asteroid.posX - x <= 69 && asteroid.posX - x >= -87 && asteroid.posY - y <= 47 && asteroid.posY - y >= -47){
//     asteroid.timeLastChanged = millis();
//     asteroid.collision = true;
//     asteroid.explosionSound.play();
//   }
// }

// //changes skin to explosion after impact
// function destroyAsteroid(){
//   asteroid.posX = x-17;
//   asteroid.posY = y-17;
//   if(millis() <= asteroid.timeLastChanged + asteroid.waitTime){
//     image(asteroid.explodedAsteroid, asteroid.posX, asteroid.posY, scalar*asteroid.explodedAsteroid.width, scalar*asteroid.explodedAsteroid.height);
//   }
// }

// //switches asteroid colors
// function mouseWheel(){
//   asteroid.asteroidColorR = random(0,255);
//   asteroid.asteroidColorG = random(0,255);
//   asteroid.asteroidColorB = random(0,255);
// }



//END OF ASTEROID CODE



function createAsteroid(){
  displayAsteroid();
  moveAsteroid();
  
  //checkForCollision();
}

function moveAsteroid(){
  for(let i=0; i<asteroidArray.length; i++){
    
    asteroidArray[i].posX += asteroidArray[i].DisX;
    asteroidArray[i].posY += asteroidArray[i].DisY;

    if(asteroidArray[i].posX >= 100 || asteroidArray[i].posX <= 0){
      asteroidArray[i].DisX *= -1;
    }
    if(asteroidArray[i].posY >= 100 || asteroidArray[i].posY <= 0){
      asteroidArray[i].DisY *= -1;
    }
  }
}

function displayAsteroid(){
  for (let i = 0; i < asteroidArray.length; i++){
    rectMode(CENTER);
    fill("grey");
    beginShape();
    vertex(asteroidArray[i].vertex1X, asteroidArray[i].vertex1Y);
    vertex(asteroidArray[i].vertex2X, asteroidArray[i].vertex2Y);
    vertex(asteroidArray[i].vertex3X, asteroidArray[i].vertex3Y);
    vertex(asteroidArray[i].vertex4X, asteroidArray[i].vertex4Y);
    vertex(asteroidArray[i].vertex5X, asteroidArray[i].vertex5Y);
    vertex(asteroidArray[i].vertex6X, asteroidArray[i].vertex6Y);
    endShape(CLOSE);
  }
}



//START OF TIE FIGHTER CODE

function createTieFighter(){
  moveTieFighter();
  displayTieFighter();
}

function moveTieFighter(){
  // tieX += tieDisX;
  // tieY += tieDisY;
  if(tieX < x){
    tieX += tieDisX;
  }
  if(tieX > x){
    tieX -= tieDisX;
  }
  if(tieY < y){
    tieY += tieDisY;
  }
  if(tieY > y){
    tieY -= tieDisY;
  }
}

function displayTieFighter(){
  imageMode(CENTER);
  image(tieFighter, tieX, tieY, 0.2*tieFighter.width, 0.2*tieFighter.height);
}