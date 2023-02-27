const sleep = ms => new Promise(r => setTimeout(r, ms));

// Manhattan distance on a square grid
const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
