// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ratFood;
let scalar = 0.10;

function preload(){
  ratFood = loadImage("assets/Rat Food.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill("red");
  // rect(mouseX, mouseY, 75, 75);
  image(ratFood, mouseX, mouseY, scalar * ratFood.width, scalar * ratFood.height);
}
function mouseWheel() {
  print(event.delta);
  if(event.delta >= 0){
    scalar *= 1.1;
  }

  if(event.delta < 0){
    scalar *= 0.9;
  }
}