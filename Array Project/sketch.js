// Asteroid Escape V.2
// Alexander Webster
// April 8th, 2020
//
// State variable: tieState is a state variable that is changed upon impact with an asteroid
// Extra for Experts: Added basic AI that tracks player, Translate custom shapes in an array independently from one another, added .gif animation, randomly generated custom shapes
// 

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
let falconLives = 3;
let currentTimeFalcon;

//variables for tie fighter
let tieFighter;
let tieX = 200;
let tieY = 200;
let tieDisX = 2;
let tieDisY = 2;
let tieState = 0;
let tieWaitTime = 1000;
let currentTimeTie;


//asteroid data
let asteroidArray = [];
let asteroidExplosionGif;

//sounds
let milleniumEngineSound;
let asteroidExplosionSound;


//instruction
let instruct;

//other
let hitBoxColor;

//preloads picture 
function preload(){
  
  engineOff = loadImage("assets/Millenium-Falcon.png");
  engineOnMed = loadImage("assets/Millenium-Falcon-Thrust.png");
  engineOnHigh = loadImage("assets/Millenium-Falcon-Thrust-High.png");
  engineOnLow = loadImage("assets/Millenium-Falcon-Thrust-Low.png");
  tieFighter = loadImage("assets/Tie Fighter Good.png");
  asteroidExplosionGif = loadImage("assets/Explosion GIF.gif");

  soundFormats("mp3");
  asteroidExplosionSound = loadSound("assets/Star Wars explosion 1 good");
  milleniumEngineSound = loadSound("assets/Millenium Falcon Engine Sound");
}






function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  angleMode(DEGREES);
  imageMode(CENTER);
  hitBoxColor = color(0,0,200,25);  
    
  for(let i = 0; i<5; i++){
    let asteroid = {
      //asteroid movement
      posX: random(0,width),
      posY: 0, 
      DisX: random(1,3),
      DisY: random(1,3),
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
  instruct = "A & D to rotate  W & S for speed  E & R for power           GOAL: Trick Tie into crashing";
}






//creates the game
function draw() {
  background(0);
  HUD();
  playerShip();
  createAsteroid();
  createTieFighter();
}

//displays information to player
function HUD(){
  displayInstructions();
  displayLives();
}

//displays instructions
function displayInstructions(){
  fill("white");
  textSize(12);
  text(instruct,80, 80, 120, 120);
}

//displays player lives
function displayLives(){
  fill("blue");
  textSize(32);
  text("lives: " + falconLives, width/2, 69);
  
}








// ----- START OF FALCON CODE ------------------------------------------------------------

// Creates player controlled millenium falcon
function playerShip(){
  if(falconLives > 0){
    push();
    movePlayer();
    pop();
    // falconSound();
  }
  else {
    if(millis() <= currentTimeFalcon + tieWaitTime){
      image(asteroidExplosionGif, x, y, asteroidExplosionGif.width * 0.5, asteroidExplosionGif.height * 0.5);
    }
  }
}

//Applies sound NON FUNCTIONAL SOUND KEEPS INFINITELY STACKING
// function falconSound(){
//   if(engine === false){
//     milleniumEngineSound.stop();
//   } 
//   else {
//     milleniumEngineSound.loop();
//   }
// } 

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
  createFalconHitBox();
  applySkin();
}

//creates hitbox for playership
function createFalconHitBox(){
  fill(0,0,0,0);
  ellipse(x, y, 0.29*engineOff.width, 0.29*engineOff.width);
}

//Applies appropriate skin to player
function applySkin(){
  imageMode(CENTER);
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

// ----- END OF FALCON CODE ------------------------------------------------------











// ----- START OF ASTEROID CODE ---------------------------------------------------

//creates an array of asteroids
function createAsteroid(){
  buildAsteroid();
  moveAsteroid();
  if(falconLives > 0){
    checkForAsteroidCollision();
  }
}

//changes values to asteroid coordinates to move it
function moveAsteroid(){
  for(let i=0; i<asteroidArray.length; i++){
    asteroidArray[i].posX += asteroidArray[i].DisX;
    asteroidArray[i].posY += asteroidArray[i].DisY;

    if(asteroidArray[i].posX >= width || asteroidArray[i].posX <= 0){
      asteroidArray[i].DisX *= -1;
    }
    if(asteroidArray[i].posY >= height || asteroidArray[i].posY <= 0){
      asteroidArray[i].DisY *= -1;
    }
  }
}

//builds randomly shaped asteroids in their proper spots
function buildAsteroid(){
  for (let i = 0; i < asteroidArray.length; i++){
    push();
    translate(asteroidArray[i].posX, asteroidArray[i].posY);
    rectMode(CENTER);
    fill("grey");
    beginShape();
    vertex(asteroidArray[i].vertex1X, asteroidArray[i].vertex1Y);
    vertex(asteroidArray[i].vertex2X, asteroidArray[i].vertex2Y);
    vertex(asteroidArray[i].vertex3X, asteroidArray[i].vertex3Y);   //Asteroid shape
    vertex(asteroidArray[i].vertex4X, asteroidArray[i].vertex4Y);
    vertex(asteroidArray[i].vertex5X, asteroidArray[i].vertex5Y);
    vertex(asteroidArray[i].vertex6X, asteroidArray[i].vertex6Y);
    endShape(CLOSE);
    pop();
  }
}

//creates a hit box for the asteroid and checks for any collisions with other entities
function checkForAsteroidCollision(){
  imageMode(CENTER);
  for(let i = asteroidArray.length -1; i >= 0; i--){
    ellipseMode(CENTER);
    noStroke();
    
    fill(0,0,0,0);
    ellipse(asteroidArray[i].posX + 62, asteroidArray[i].posY + 63, 50, 50);
    
    if(tieState === 0){
      if(collideCircleCircle(asteroidArray[i].posX + 62, asteroidArray[i].posY + 63, 50, tieX, tieY, 50)){
        asteroidExplosionSound.play();
        asteroidArray.splice(i, 1);
        tieState = 1;
        currentTimeTie = millis();
      }
    }
    
    if(collideCircleCircle(asteroidArray[i].posX + 62, asteroidArray[i].posY + 63, 50, x, y, 0.29*engineOff.width)){
      asteroidExplosionSound.play();
      asteroidArray.splice(i, 1);
      falconLives -= 1;
      currentTimeFalcon = millis();
    }
  }
}

//----- END OF ASTEROID CODE --------------------------------------------------------------










// ----- START OF TIE FIGHTER CODE --------------------------------------------------------

//Creates AI Tie Fighter
function createTieFighter(){
  if(tieState === 0){
    createTieHitBox();
    moveTieFighter();
    displayTieFighter();
  }
  if(tieState === 1){
    if(millis() <= currentTimeTie + tieWaitTime){
      image(asteroidExplosionGif, tieX, tieY, asteroidExplosionGif.width * 0.3, asteroidExplosionGif.height* 0.3);
    }
  }
}

//Changes the x and y values according to player position, constantly honing in on player
function moveTieFighter(){
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

//displays the tie fighter on the screen
function displayTieFighter(){
  imageMode(CENTER);
  image(tieFighter, tieX, tieY, 0.2*tieFighter.width, 0.2*tieFighter.height);
}

//creates a hitbox for the tie fighter
function createTieHitBox(){
  fill(0,0,0,0);
  ellipse(tieX, tieY, 50, 50);
}

// ----- END OF TIE FIGHTER CODE --------------------------------------------------------------







// ALL KEY INPUTS
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