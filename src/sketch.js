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

function getTargetCountText() {
  return `Comidas coletadas: ${targetCollected <= 0 ? 0 : targetCollected}`;
}

function updateParagraph(text = '') {
  countP.html(text || getTargetCountText());
}

function setup() {
  createCanvas(800, 800);
  countP = createP(getTargetCountText());
  countP.style('font-size', '16px');
  countP.style('color', 'white');
  countP.style('background-color', 'black');
  countP.style('padding', '1rem');
  countP.position(900, 0);

  menu = new Menu(terrains);
  grid = new Grid(rows, columns, terrains);
  states = { 1: BFS, 2: DFS, 3: Greedy, 4: Astar, 5: Dijkstra };
  statesName = { 1: 'BFS', 2: 'DFS' };
}

function draw() {
  background(0);
  strokeWeight(0.5);

  const algP = createP();
  algP.style('font-size', '16px');
  algP.style('color', 'white');
  algP.style('background-color', 'black');
  algP.style('padding', '1rem');
  algP.position(900, 100);

  if (!state) {
    state = menu.drawMenu();
    algP.hide();
  } else {
    algP.html(states[state].name);
    updateParagraph();
    noLoop();

    const algorithm = new states[state](grid);
    algorithm.runSearch(500, 25);
  }
}
