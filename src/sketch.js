const rows = 35;
const columns = 35;
const terrains = {
  0: '#DCCBB5', // areia menor custo
  1: '#869818', // pantano custo medio
  2: '#3399CC', // agua maior custo
  3: '#565656', // obstaculo custo infinito
};

let state = 0;
let menu;
let grid;
let states;

function setup() {
  createCanvas(800, 800);
  menu = new Menu(terrains);
  grid = new Grid(rows, columns, terrains);
  states = { 1: BFS, 2: DFS };
}

function draw() {
  background(0);
  strokeWeight(0.5);

  if (!state) state = menu.drawMenu();
  else {
    noLoop();
    const algorithm = new states[state](grid);
    algorithm.runSearch();
  }
}
