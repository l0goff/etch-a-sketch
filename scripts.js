// number of grid squares - later via user input
let squareNo = 16;

// choose coloring mode: rainbow, black, shaded
// ToDo: implement a button for mode selection by user
let coloringType = "black";

let container = document.getElementById("container");
let gridbtn = document.getElementById("gridbtn");

// for rudimentary mouse movement evaluation
// thanks, stackoverflow!
let mousePressed = 0;
document.body.onmousedown = function() {
  mousePressed = 1;
}
document.body.onmouseup = function() {
  mousePressed = 0;
}

// button sets new grid size and creates new grid
gridbtn.addEventListener("click", function(){    
  // prompt for grid size
  let newGrid = parseInt("abcd");
  while (newGrid < 0 || newGrid !== newGrid || newGrid > 64) {  
    newGrid = parseInt(prompt("What size should the grid have (64 max. Enter 0 to abort)?"));
  }
  squareNo = newGrid;
  // remove old container to clear the screen
  if (container) {
    container.remove();
  }
  else {
    console.log("Error - no container!");
  }
  // replace container element
  let body = document.getElementById("body");
  let newDiv = document.createElement("div");
  newDiv.setAttribute("id", "container");
  container = newDiv;
  body.appendChild(container);  
  createGrid(squareNo, container);
});

// create square grid within container (on first load)
createGrid(squareNo, container);





// FUNCTIONS: 
// create a new grid with user-defined size
function createGrid(squareNo, container) {
  for (let rowNo = 0; rowNo < squareNo ; rowNo++) {
    let rowDiv = document.createElement("div");
    createGridRow(rowNo, squareNo, rowDiv);
    container.appendChild(rowDiv);
  }
}

// create a grid row full of squares
function createGridRow(rowNo, squareNo, rowDiv) {
  for (let currSquare = 0; currSquare < squareNo; currSquare++) {
    let squareDiv = document.createElement("div");
    squareDiv.setAttribute("class", "divsquare");
    squareDiv.style.background = "rgb(255, 255, 255)";
    squareDiv.addEventListener("mousemove", mouseStroke);
    rowDiv.appendChild(squareDiv);
  }
}

// create random color values for "rainbow strokes"
function createRandomRGB() {
  let randR = String(Math.floor(Math.random()*255)+1);
  let randG = String(Math.floor(Math.random()*255)+1);
  let randB = String(Math.floor(Math.random()*255)+1);  
  return "rgb("+randR+", "+randG+", "+randB+")";
}

// evaluate mouse movements for "sketching"
function mouseStroke(event) {  
    if (mousePressed == 1) {
      if (coloringType == "rainbow") {
        let newCol = createRandomRGB();
        event.target.style.background = newCol;
      }
      else if (coloringType == "shaded") {
        // something is not working well: the event (mousemove)
        // repeats too fast, thus multiple shadings are triggered
        // at virtually the same time (squares too dark) - use timeout?
        let oldCol = event.target.style.backgroundColor;         
        let newCol = shadingColor(oldCol);
        event.target.style.background = newCol;
      }
      else if (coloringType == "black") {
        event.target.style.background = "black";
      }
    }
}

// create graded color values for "shaded strokes"
function shadingColor(oldCol) {

  if (oldCol == "rgb(255, 255, 255)") {
    return "rgb(230, 230, 230)";
  }
  else if (oldCol == "rgb(230, 230, 230)") {
    return "rgb(200, 200, 200)";
  }
  else if (oldCol == "rgb(200, 200, 200)") {
    return "rgb(175, 175, 175)";
  }
  else if (oldCol == "rgb(175, 175, 175)") {
    return "rgb(150, 150, 150)";
  }
  else if (oldCol == "rgb(150, 150, 150)") {
    return "rgb(125, 125, 125)";
  }
  else if (oldCol == "rgb(125, 125, 125)") {
    return "rgb(100, 100, 100)";
  }
  else if (oldCol == "rgb(100, 100, 100)") {
    return "rgb(75, 75, 75)";
  }
  else if (oldCol == "rgb(75, 75, 75)") {
    return "rgb(50, 50, 50)";
  }
  else if (oldCol == "rgb(50, 50, 50)") {
    return "rgb(25, 25, 25)";
  }
  else if (oldCol == "rgb(25, 25, 25)") {
    return "rgb(0, 0, 0)";
  }
  else {
    return "rgb(0, 0, 0)";    
  }
}
