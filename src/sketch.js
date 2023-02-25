const rows = 35;
const columns = 35;
const terrains = {
  0: '#DCCBB5', // areia menor custo
  1: '#869818', // pantano custo medio
  2: '#3399CC', // agua maior custo
  3: '#565656', // obstaculo custo infinito
};
const defaultTimeout = 1000;
let searchTimeout = 0;

let state = 0;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);
  strokeWeight(0.5);
  searchTimeout = defaultTimeout;

  switch (state) {
    case 0:
      drawMenu();
      break;

    case 1:
      drawBFS();
      break;

    case 2:
      drawDFS();
      break;

    case 3:
      drawGreedy();
      break;

    case 4:
      drawAstar();
      break;

    case 5:
      drawUniCost();
      break;
  }
}

function drawMenu() {
  stroke(1);
  frameRate(10);
  cursor(ARROW);

  fill(255, 255, 255);
  textSize(40);
  textAlign(CENTER);
  text('Welcome!', 400, 180);

  drawMenuGrid();

  fill(255, 255, 255);
  textSize(24);
  text('Choose the algorithm:', 400, 480);

  rect(230, 520, 100, 50, 5);
  rect(350, 520, 100, 50, 5);
  rect(470, 520, 100, 50, 5);
  rect(280, 590, 100, 50, 5);
  rect(400, 590, 100, 50, 5);

  fill(0);
  text('BFS', 280, 555);
  text('DFS', 400, 555);
  text('Greedy', 520, 555);
  text('A*', 330, 625);

  textSize(16);
  text('Uniform\nCost', 450, 612);
  textSize(24);

  if (mouseInArea(230, 520, 100, 50)) {
    hoverEffect(230, 520, 100, 50);
    text('BFS', 280, 555);
    cursor(HAND);
    if (mouseIsPressed) state = 1;
  } else if (mouseInArea(350, 520, 100, 50)) {
    hoverEffect(350, 520, 100, 50);
    text('DFS', 400, 555);
    cursor(HAND);
  } else if (mouseInArea(470, 520, 100, 50)) {
    hoverEffect(470, 520, 100, 50);
    text('Greedy', 520, 555);
    cursor(HAND);
  } else if (mouseInArea(280, 590, 100, 50)) {
    hoverEffect(280, 590, 100, 50);
    text('A*', 330, 625);
    cursor(HAND);
  } else if (mouseInArea(400, 590, 100, 50)) {
    hoverEffect(400, 590, 100, 50);
    textSize(16);
    text('Uniform\nCost', 450, 612);
    cursor(HAND);
  }
}

function drawBFS() {
  noLoop();
  const grid = drawGrid();

  while (true) {
    try {
      const agent = createRandomVector(grid);
      const target = createRandomVector(grid);

      drawAgent(agent);
      drawTarget(target);

      const bfsResult = bfs(agent, target, grid);
      const gapMS = 500;

      setTimeout(() => {
        const path = findPath(bfsResult, agent, target);
        console.log(path);
        // Para o agente ir até o target
        // path.map(([i, j]) => {
        //   const pos = createVector(j, i);

        //   drawAgent(pos);
        // });
        // Quando coletar, draw de novo
        // draw()
      }, searchTimeout + gapMS);

      break;
    } catch (error) {
      console.error(error);
    }
  }
}

function drawDFS() {}

function drawGreedy() {}

function drawAstar() {}

function drawUniCost() {}

function hoverEffect(x, y, width, height) {
  stroke(255, 255, 255);
  strokeWeight(2);
  fill(255, 0, 0);
  rect(x, y, width, height, 5);
  fill(0);
}

function mouseInArea(x, y, width, height) {
  return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
}

function findPath(cameFrom, agent, target) {
  const path = [];
  const agentCell = [agent.y, agent.x];
  const targetCell = [target.y, target.x];
  const timeout = 100;
  searchTimeout += timeout;

  let countCells = 0;
  let currCell = targetCell;

  drawPath(targetCell[0], targetCell[1]);
  path.push(targetCell);

  drawPath(agentCell[0], agentCell[1]);
  path.push(agentCell);

  while (true) {
    currCell = cameFrom[currCell];
    if (currCell[0] === agentCell[0] && currCell[1] === agentCell[1]) break;
    path.push(currCell);
    countCells += 1;
    setTimeout(drawPath, timeout * countCells, currCell[0], currCell[1]);
  }

  drawTarget(target);
  drawAgent(agent);

  return path;
}

function bfs(agent, target, grid) {
  // start position
  const frontier = [[agent.y, agent.x]]; //unshift() e pop() para utilizar como fila
  const cameFrom = { [[agent.y, agent.x]]: undefined };

  const visited = Array(rows)
    .fill()
    .map(() => Array(columns).fill(false));

  while (frontier.length) {
    const [curri, currj] = frontier.pop();
    const neighbors = adjacentCells(curri, currj);

    if ([curri, currj] === [target.y, target.x]) break;

    neighbors.forEach(neigh => {
      neighi = neigh[0];
      neighj = neigh[1];
      if (!visited[neighi][neighj] && grid[neighi][neighj] != 3) {
        visited[neighi][neighj] = true;
        frontier.unshift([neighi, neighj]);
        cameFrom[[neighi, neighj]] = [curri, currj];
      }
    });
  }

  const incrementTimeout = 10;
  const cameFromArr = Object.entries(cameFrom);
  searchTimeout += incrementTimeout * cameFromArr.length;

  cameFromArr.map(([_key, currCell], index) => {
    setTimeout(drawPath, defaultTimeout + incrementTimeout * index, currCell[0], currCell[1], 255, 255, 255);
  });

  return cameFrom;
}

function getCellsProps(i, j) {
  const cellWidth = width / columns; //tentei inicializar como global mas o p5 nao deixa
  const cellHeight = height / rows;
  const cellX = j * cellWidth;
  const cellY = i * cellHeight;

  return [cellX, cellY, cellWidth, cellHeight];
}

function drawPath(i, j, ...fillRgb) {
  if (fillRgb && fillRgb.length === 3) fill(...fillRgb);
  else fill(0, 0, 80);
  rect(...getCellsProps(i, j));
}

function drawFrontier(i, j) {
  fill(0, 0, 255);
  rect(...getCellsProps(i, j));
}

function drawNoFrontier(i, j) {
  fill(255, 255, 0);
  rect(...getCellsProps(i, j));
}

function adjacentCells(i, j) {
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const ans = [];

  directions.forEach(dir => {
    let adjI = i + dir[0];
    let adjJ = j + dir[1];

    if (adjI >= 0 && adjI < rows && adjJ >= 0 && adjJ < columns) {
      //chechar se ta dentro do grid
      ans.push([adjI, adjJ]);
    }
  });

  return ans;
}

function createRandomVector(grid) {
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

  return { x, y };
}

function drawAgent(agent) {
  fill(255, 0, 0);
  const { x, y } = gridToCanvas(agent.x, agent.y);
  circle(x, y, (3 * height) / (4 * rows));
}

function drawTarget(target) {
  fill('#ff8c00');
  const { x, y } = gridToCanvas(target.x, target.y);
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

function drawMenuGrid() {
  const cellWidth = 18;
  const cellHeight = 18;

  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      const cellX = j * cellWidth;
      const cellY = i * cellHeight;

      let terrain = floor(random(0, 4));
      fill(terrains[terrain]);
      rect(cellX + 312, cellY + 210, cellWidth, cellHeight);
    }
  }
}

function drawGrid() {
  const cellWidth = width / columns;
  const cellHeight = height / rows;

  const info = new Array(rows);

  for (i = 0; i < rows; i++) {
    info[i] = new Array(columns);

    for (j = 0; j < columns; j++) {
      const cellX = j * cellWidth;
      const cellY = i * cellHeight;

      // ramdomiza um dos 4 terrenos
      let terrain = floor(random(0, 4));

      // guarda o terreno no grid
      info[i][j] = terrain;

      // desenha
      stroke(0);
      fill(terrains[terrain]);
      rect(cellX, cellY, cellWidth, cellHeight);
    }
  }

  return info;
}
