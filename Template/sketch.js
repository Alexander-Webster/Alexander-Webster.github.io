// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let white = true;
function setup() {
  if(windowWidth > windowHeight){
    cre
  }
}

function draw() {
  background(220);
  for (let i = 0; i < width; i += 100){
    for(let e = 0; e < height; e += 100){
      if(white){
        fill("white");
      }
      else {
        fill("black");
      }
      rect(i, e, 80, 80);
      white = !white;
    }
    white = !white
  }
}


function windowResized(){
  setup();
}