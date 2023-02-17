const rows = 35;
const columns = 35;
const terrains = {
  0: '#DCCBB5', // areia menor custo
  1: '#869818', // pantano custo medio
  2: '#3399CC', // agua maior custo
  3: '#565656'  // obstaculo custo infinito
};
  
function setup() {
  createCanvas(800, 800);
  noLoop(); 
}

function draw() {
  background(0);
  strokeWeight(0.5);
  
  const grid = drawGrid();
  
  const agent = createRandomVector(grid);
  const target = createRandomVector(grid);
  
  drawAgent(agent);
  drawTarget(target);
}

function createRandomVector(grid) {
  const cellWidth = width / columns; //tentei inicializar como global mas o p5 nao deixa
  const cellHeight = height / rows; 
  let x, y;
  
  do {
    x = floor(random(0, columns));
    y = floor(random(0, rows));
  } while (grid[y][x] === 3); // se gerar em um obstaculo, regera

  return createVector(x, y);
}

function gridToCanvas(x, y) {
  const cellWidth = width / columns; //tentei inicializar como global mas o p5 nao deixa
  const cellHeight = height / rows;
  
  // calcular o pixel certo da célula correspondente no canvas
  x = cellWidth * (x + 0.5);
  y = cellHeight * (y + 0.5);
  
  return {x, y};
}

function drawAgent(agent) {
  fill(255, 0, 0);
  const {x, y} = gridToCanvas(agent.x, agent.y);
  circle(x, y, (3*height) / (4*rows));
}

function drawTarget(target) {
  fill('#ff8c00');
  const {x, y} = gridToCanvas(target.x, target.y);
  star(x, y, 6, 12, 5);
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function drawGrid() {
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  
  const info = new Array(rows);
  
  for(i=0; i<rows; i++) {
    info[i] = new Array(columns);
    
    for(j=0; j<columns; j++) {
      const cellX = j * cellWidth;
      const cellY = i * cellHeight;
      
      // ramdomiza um dos 4 terrenos
      let terrain = floor(random(0, 4));
      
      // guarda o terreno no grid
      info[i][j] = terrain;
      
      // desenha
      fill(terrains[terrain]);
      rect(cellX, cellY, cellWidth, cellHeight);
    }
  }
  
  return info;
}