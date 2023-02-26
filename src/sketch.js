const rows = 35;
const columns = 35;
const defaultTimeout = 1000;
const terrains = {
      0: '#DCCBB5', // areia menor custo
      1: '#869818', // pantano custo medio
      2: '#3399CC', // agua maior custo
      3: '#565656', // obstaculo custo infinito
    };
let searchTimeout = 0;

let state = 0;
let menu;
let algorithm;
let grid;

function setup() {
  createCanvas(800, 800);
  menu = new Menu(terrains);
  grid = new Grid(rows, columns, terrains);
  algorithm = new Algorithm(grid);
}

function draw() {
  background(0);
  strokeWeight(0.5);
  searchTimeout = defaultTimeout;

  switch (state) {
    case 0:
      state = menu.drawMenu();
      break;

    case 1:
      algorithm.drawBFS();
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


function drawDFS() {}

function drawGreedy() {}

function drawAstar() {}

function drawUniCost() {}


function drawFrontier(i, j) {
  fill(0, 0, 255);
  rect(...getCellsProps(i, j));
}

function drawNoFrontier(i, j) {
  fill(255, 255, 0);
  rect(...getCellsProps(i, j));
}





