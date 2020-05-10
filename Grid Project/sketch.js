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

let grid;
let cols;
let rows;
let resolution = 25;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = 1200 / resolution;
  rows = 600 / resolution;
  grid = make2DArray(cols, rows);
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution + 5;
      fill(255);
      stroke(50);
      rect(x, y, resolution - 1, resolution - 1);
      
    }
  }
}
  
  
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