// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let entity;

function preload(){
  entity = loadImage("assets/Millenium Falcon.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  createShip();
 
}

function createShip(){
  image(entity, mouseX, mouseY);
}


