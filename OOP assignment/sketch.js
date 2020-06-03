// OOP Assignment
// Alexander Webster
// 06/02/2020
//
// Extra for Experts:
// Added gravity to firework behavior

let fireWorks = [];
let birds = [];
let y = 150;


function setup() {
  createCanvas(windowWidth, windowHeight);
  window.setInterval(addBird, 2000);
}

//creates the program
function draw() {
  background(0);
  makeFireWork();
  showBird();
  checkCollision();
}

//adds a new firework to the array when mouse is clicked
function mousePressed(){
  for(let i = 0; i < 100; i++){
    let f = new fireWork();
    fireWorks.push(f);
  }
}

//creates a firework explosion
function makeFireWork(){
  for(let i = fireWorks.length - 1; i >= 0; i--){
    fireWorks[i].move();
    fireWorks[i].show();
    if(fireWorks[i].alpha === 1){
      fireWorks.splice(i, 1);
    }
  }
}

//class information for a individual firework particle
class fireWork{
  constructor(){
    this.x = mouseX;
    this.y = mouseY;
    this.r = 7;
    this.dx = random(-2, 2);
    this.dy = random(-2, 2);
    this.red = 255;
    this.green = 150;
    this.blue = 10;
    this.alpha = 100;
    this.gravity = 0.07;
  }

  //adds movement to particle
  move(){
    this.dy += this.gravity;
    this.y += this.dy;
    this.x += this.dx;
    this.alpha += -1;
  }

  //displays the particle
  show() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.x, this.y, this.r, this.r);
  }
}

//creates the bird entity
function showBird(){
  for(let i = 0; i < birds.length; i++){
    birds[i].isAlive();
    birds[i].update();
    birds[i].display();
  }
}

//class information on bird entity
class bird{
  constructor(y){
    this.y = y;
    this.x = 3;
    this.w = 20;
    this.h = 14;
    this.color = "white";
    this.tooFar = 0;
    this.dx = 2;
  }

  //udpates movement and removes bird in the event of a boundary violation
  update(){
    this.x += this.dx;
    for(let i = birds.length - 1; i >= 0; i--){
      if(birds[i].tooFar === 1){
        birds.splice(i, 1);
      }
    }
  }
  
  //dispalys the entity
  display(){
    fill(this.color);
    rect(this.x, this.y, this.w, this.h );
  }

  //checks to see if bird has violated any boundaries
  isAlive(){
    if(this.x > windowWidth || this.x <= 0){
      this.tooFar = 1;
    }
  }
}

//adds a new bird to it's array
function addBird(){
  let b = new bird(random(0,windowHeight));
  birds.push(b);
}


//checks for collision between bird and firework particles and applies changes to bird when true
function checkCollision(){
  for(let i = 0; i < birds.length; i++){
    for(let j = 0; j < fireWorks.length; j++){
      if(collideRectCircle(birds[i].x, birds[i].y, birds[i].w, birds[i].h, fireWorks[j].x, fireWorks[j].y, fireWorks[j].r)){
        birds[i].dx *= -1;
        birds[i].color = "blue";
      }
    }
  }
}