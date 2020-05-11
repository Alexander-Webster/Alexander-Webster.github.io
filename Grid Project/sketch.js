// Grid Project - Pixel art
// Alexander Webster
// 2020-05-11
//
// Extra for Experts: Added reset function that clears the array only once to allow for further drawing, included multiple states for each grid 

//creates a 2D array
function make2DArray(cols, rows){
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let colorState = 0;
let colors;
let cols;
let rows;
let resolution = 25;


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = 1200 / resolution;
  rows = 600 / resolution;
  colors = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      colors[i][j] = 0;
    }
  }
}




//creates the pixel art program
function draw() {
  background(200);
  displayTitle();
  selectColor();
  drawGrid();
  checkForReset();
}
  


//draws the pixel grid with necessary colors
function drawGrid(){
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution + 5;
      stroke(50);
      
      //Indicates that a specific color must be placed
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 1){
        colors[i][j] = 1;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 2){
        colors[i][j] = 2;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 3){
        colors[i][j] = 3;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 4){
        colors[i][j] = 4;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 5){
        colors[i][j] = 5;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 6){
        colors[i][j] = 6;
      }

      //applies the colors
      if(colors[i][j] === 1){
        fill("red");
        rect(x, y, resolution, resolution);
      }
      else if(colors[i][j] === 2){
        fill("blue");
        rect(x, y, resolution, resolution);
      }
      else if(colors[i][j] === 3){
        fill("green");
        rect(x, y, resolution, resolution);
      }
      else if(colors[i][j] === 4){
        fill("orange");
        rect(x, y, resolution, resolution);
      }
      else if(colors[i][j] === 5){
        fill("black");
        rect(x, y, resolution, resolution);
      }
      else if(colors[i][j] === 6){
        fill("white");
        rect(x, y, resolution, resolution);
      }
      else {
        fill(255);
        rect(x, y, resolution, resolution);
      }
      
      
    }
  }
}

//Creates the select color boxes
function selectColor(){
  createBoxes();
  checkIfClicked();
  displayColor();
}

//draws the color select boxes
function createBoxes(){
  createRedBox();
  createBlueBox();
  createGreenBox();
  createOrangeBox();
  createBlackBox();
  createWhiteBox();
}

//changes color state if the appropriate color box was clicked on
function checkIfClicked(){
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 20 && mouseY <= 55 && mouseIsPressed){
    colorState = 1;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 70 && mouseY <= 105 && mouseIsPressed){
    colorState = 2;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 120 && mouseY <= 155 && mouseIsPressed){
    colorState = 3;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 170 && mouseY <= 205 && mouseIsPressed){
    colorState = 4;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 220 && mouseY <= 255 && mouseIsPressed){
    colorState = 5;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 270 && mouseY <= 305 && mouseIsPressed){
    colorState = 6;
  }
}

//displays text stating what color is currently selected
function displayColor(){
  textSize(35);
  if(colorState === 1){
    fill("red");
    text("Red", 1225, 360);
  }
  if(colorState === 2){
    fill("blue");
    text("Blue", 1225, 360);
  }
  if(colorState === 3){
    fill("green");
    text("Green", 1225, 360);
  }
  if(colorState === 4){
    fill("orange");
    text("Orange", 1225, 360);
  }
  if(colorState === 5){
    fill("black");
    text("Black", 1225, 360);
  }
  if(colorState === 6){
    fill("white");
    text("White", 1225, 360);
  }
}


function createRedBox(){
  fill("red");
  rect(1250, 20, 35, 35);
}

function createBlueBox(){
  fill("Blue");
  rect(1250, 70, 35, 35);
}

function createGreenBox(){
  fill("Green");
  rect(1250, 120, 35, 35);
}

function createOrangeBox(){
  fill("Orange");
  rect(1250, 170, 35, 35);
}

function createBlackBox(){
  fill("Black");
  rect(1250, 220, 35, 35);
}

function createWhiteBox(){
  fill("White");
  rect(1250, 270, 35, 35);
}


//resets grid to all white 
function checkForReset(){
  textSize(20);
  fill("red");
  text("Press R to reset", 1250, 520, 100, 100);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if(keyIsPressed && key === "r"){
        colors[i][j] = 6;
      }
    }
  }
}

function displayTitle(){
  text("PIXEL ART STUDIO MK. 1", 1250, 400, 100, 100);
}