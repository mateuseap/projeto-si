const rows = 40;
const columns = 40;
const terrains = {
  0: '#DCCBB5', // areia
  1: '#3399CC',  // agua
  2: '#869818',// pantano
  3: '#565656'   // obstaculo
};
  
function setup() {
  createCanvas(800, 800);
  noLoop(); 
}

function draw() {
  background(0);
  strokeWeight(0.5);
  
  const grid = drawGrid();
}

function drawGrid() {
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  
  const info = new Array(rows);
  
  for(i=0; i<rows; i++) {
    info[i] = new Array(columns);
    
    for(j=0; j<columns; j++) {
      const cellX = j * cellWidth;
      const cellY = i * cellWidth;
      
      let terrain = floor(random(0, 4));
      
      info[i][j] = terrain;
      
      fill(terrains[terrain]);
      rect(cellX, cellY, cellWidth, cellHeight);
    }
  }
  
  return info;
}