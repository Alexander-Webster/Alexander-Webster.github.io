// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let x;
let y;
let dx = 5;
let dy = 5;





function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("white");
  
  
  
  moveBox();
  displayBox();
}

function moveBox(){
  if (keyIsPressed && key === "w"){
    y -= dy;
  }
  if (keyIsPressed && key === "a"){
    x -= dx;
  }
  if (keyIsPressed && key === "s"){
    y += dy;
  }
  if (keyIsPressed && key === "d"){
    y += dy;
  }
}

function displayBox(){
  fill("black");
  rect(x, y, 50, 50);
}
