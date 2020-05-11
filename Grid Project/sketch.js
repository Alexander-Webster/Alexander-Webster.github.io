// Game of life
// Alexander Webster
// 2020-05-06
//
// Extra for Experts:

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





function draw() {
  background(200);
  selectColor();
  drawGrid();

  
}
  



function drawGrid(){
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution + 5;
      stroke(50);
      //Indicates that a color must be placed
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 1){
        colors[i][j] = 1;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 2){
        colors[i][j] = 2;
      }
      if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y && mouseIsPressed && colorState === 3){
        colors[i][j] = 3;
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
      else {
        fill(255);
        rect(x, y, resolution, resolution);
      }
      
      
    }
  }
}

function selectColor(){
  createBoxes();
  checkIfClicked();
}

function createBoxes(){
  createRedBox();
  createBlueBox();
  createGreenBox();
  createOrangeBox();
  createBlackBox();
  createEraser();
}

function checkIfClicked(){
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 20 && mouseY <= 55 && mouseIsPressed){
    colorState = 1;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 70 && mouseY <= 105 && mouseIsPressed){
    colorState = 2;
  }
  if(mouseX <= 1285 && mouseX >= 1250 && mouseY >= 120 && mouseY <= 140 && mouseIsPressed){
    colorState = 3;
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

function createEraser(){
  fill("White");
  rect(1250, 270, 35, 35);
}

// if(mouseX <= x + resolution && mouseX >= x && mouseY <= y + resolution && mouseY >= y){
//   stroke(50);
//   fill(100);
//   rect(x, y, resolution, resolution);

  
//   //compute next based on grid
//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       let state = grid[i][j];

//       //count live neighbors
//       let sum = 0;
//       let neighbors = countNeighbors(grid, i, j);

        

//       if (state === 0 && neighbors === 3){
//         next[i][j] = 1;
//       } 
//       else if (state === 1 && (neighbors < 2 || neighbors > 3)){
//         next[i][j] = 0;
//       } 
//       else {
//         next[i][j] = state;
//       }
//     }
//   }
  
//   grid = next;
// }


// function countNeighbors(grid, x, y){
//   let sum = 0;
//   for( let i = -1; i < 2; i++) {
//     for( let j = -1; j < 2; j++){

//       let col = (x + i + cols) % cols;
//       let row = (y + j + rows) % rows;
//       sum += grid[col][row];
//     }
//   }
//   sum -= grid[x][y];
//   return sum;

// }