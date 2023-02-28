const rows = 35;
const columns = 35;
const terrains = {
  0: '#DCCBB5', // areia menor custo
  1: '#869818', // pantano custo medio
  2: '#3399CC', // agua maior custo
  3: '#565656', // obstaculo custo infinito
};

let targetCollected = 0;
let state = 0;
let menu;
let grid;
let states;
let countP;
let algP;

function getTargetCountText() {
  return `Comidas coletadas: ${targetCollected <= 0 ? 0 : targetCollected}`;
}

function updateParagraph(text = '') {
  countP.html(text || getTargetCountText());
}

function setup() {
  createCanvas(800, 875);

  countP = createP(getTargetCountText());
  countP.style('font-size', '16px');
  countP.style('font-family', 'Ubuntu');
  countP.style('color', 'white');
  countP.style('background-color', '#1C315E');
  countP.position(10, 800);

  menu = new Menu(terrains);
  grid = new Grid(rows, columns, terrains);
  states = { 1: BFS, 2: DFS, 3: Greedy, 4: Dijkstra, 5: Astar };
  statesName = { 1: 'BFS', 2: 'DFS' };
}

const resetDraw = () => {
  background('#1C315E');
  strokeWeight(0.5);
  updateParagraph();
};

function draw() {
  resetDraw();

  const algP = createP();
  algP.style('font-size', '16px');
  algP.style('font-family', 'Ubuntu');
  algP.style('color', 'white');
  algP.style('background-color', '#1C315E');
  algP.position(10, 830);

  if (!state) {
    state = menu.drawMenu();
    targetCollected = 0;
    algP.hide();
  } else {
    algP.html('Search algorithm: ' + states[state].name);

    noLoop();

    const algorithm = new states[state](grid);
    algorithm.runSearch(500, 25);
  }
}
