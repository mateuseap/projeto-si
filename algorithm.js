class Algorithm {
  defaultTimeout = 2000;
  directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  lastTimeout = 100;
  countCells = 0;

  constructor(grid) {
    // Grid init
    this.grid = grid;
    this.grid.drawGrid();

    // Vars init
    this.searchTimeout = this.defaultTimeout;
    this.cameFrom = { [[this.grid.agent.y, this.grid.agent.x]]: undefined };
    this.frontier = [[this.grid.agent.y, this.grid.agent.x]];
    this.visited = Array(this.grid.rows)
      .fill()
      .map(() => Array(this.grid.columns).fill(false));

    this.lastAgentSpotCircle = null;
  }

  drawFrontierOrPath(i, j, timeoutMS = 0, stroke = false, ...rgbFill) {
    let rgb = [255, 100, 121];
    if (rgbFill && rgbFill.length >= 1) rgb = rgbFill;

    const func = stroke ? this.drawStroke : this.drawPath;

    if (timeoutMS > 0) setTimeout(func.bind(this), timeoutMS, i, j, ...rgb);
    else func(i, j, ...rgb);

    if (j === this.grid.target.x && i === this.grid.target.y) {
      if (timeoutMS > 0) setTimeout(this.grid.drawTarget.bind(this.grid), timeoutMS);
      else this.grid.drawTarget();
    }
    if (j === this.grid.agent.x && i === this.grid.agent.y) {
      if (timeoutMS > 0) setTimeout(this.grid.drawAgent.bind(this.grid), timeoutMS);
      else this.grid.drawAgent();
    }
  }

  startSearch() {
    this.lastAgentSpotCircle = this.grid.drawAgent();
    this.grid.drawTarget();
  }

  endSearch(gapMS) {
    setTimeout(this.drawPathTimeout.bind(this), this.searchTimeout + gapMS);
  }

  drawPathTimeout() {
    this.restartDraw(false);
    const path = this.findPath(this.cameFrom).reverse();
    const initialGap = this.lastTimeout * this.countCells;

    const stepSize = 600;
    let costStepMSAcc = 0;

    path.forEach(([i, j], index) => {
      const isLast = index + 1 === path.length;
      const prev = index > 0 ? path[index - 1] : [-1, -1];
      const [prevI, prevJ] = prev;

      costStepMSAcc += index > 0 ? this.grid.info[prevI][prevJ] + 1 : 1;

      setTimeout(
        this.drawAgentToTargetSpot.bind(this),
        initialGap + stepSize * costStepMSAcc,
        i,
        j,
        prevI,
        prevJ,
        isLast
      );
    });
  }

  restartDraw(remakeTarget = true) {
    clear();
    if (remakeTarget) {
      this.grid.remakeTarget();
      loop();
    } else {
      resetDraw();
      this.grid.drawGrid();
    }
  }

  drawAgentToTargetSpot(i, j, prevI, prevJ, isLast) {
    this.grid.agent = createVector(j, i);
    this.lastAgentSpotCircle = this.grid.drawAgent();

    if (isLast) {
      targetCollected += 1;

      setTimeout(this.restartDraw.bind(this), 150);
    }

    if (prevI !== -1 && prevJ !== -1) {
      erase();
      rect(...this.getCellsProps(prevI, prevJ));
      noErase();

      fill(terrains[this.grid.info[prevI][prevJ]]);
      this.drawStroke(prevI, prevJ, 'rgb(0, 0, 80)');
    }
  }

  adjacentCells(i, j) {
    const ans = [];

    this.directions.forEach(dir => {
      let adjI = i + dir[0];
      let adjJ = j + dir[1];

      if (adjI >= 0 && adjI < this.grid.rows && adjJ >= 0 && adjJ < this.grid.columns) {
        //chechar se ta dentro do grid
        ans.push([adjI, adjJ]);
      }
    });

    return ans;
  }

  findPath(cameFrom) {
    const path = [];
    const agentCell = [this.grid.agent.y, this.grid.agent.x];
    const targetCell = [this.grid.target.y, this.grid.target.x];
    this.searchTimeout += this.lastTimeout;

    let currCell = targetCell;

    this.drawPath(targetCell[0], targetCell[1]);
    path.push(targetCell);

    while (true) {
      currCell = cameFrom[currCell];
      if (currCell[0] === agentCell[0] && currCell[1] === agentCell[1]) break;
      path.push(currCell);
      this.countCells += 1;
      this.drawFrontierOrPath(currCell[0], currCell[1], this.lastTimeout * this.countCells, true, '#FF0303');
      this.drawFrontierOrPath(
        currCell[0],
        currCell[1],
        this.lastTimeout * this.countCells,
        false,
        terrains[this.grid.info[currCell[0]][currCell[1]]]
      );
    }

    this.drawPath(agentCell[0], agentCell[1]);
    path.push(agentCell);

    this.grid.drawAgent();
    this.grid.drawTarget();

    return path;
  }

  getCellsProps(i, j) {
    const cellX = j * this.grid.cellWidth;
    const cellY = i * this.grid.cellHeight;

    return [cellX, cellY, this.grid.cellWidth, this.grid.cellHeight];
  }

  drawStroke(i, j, color) {
    stroke(color);
    strokeWeight(3);

    rect(...this.getCellsProps(i, j));
  }

  drawPath(i, j, ...fillRgb) {
    if (fillRgb && fillRgb.length >= 1) fill(...fillRgb);
    else fill(0, 0, 0);

    rect(...this.getCellsProps(i, j));
  }
}
