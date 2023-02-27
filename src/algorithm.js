class Algorithm {
  defaultTimeout = 1000;
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

    this.lastAgentSpot = null;
  }

  drawFrontierOrPath(i, j, timeoutMS = 0, ...rgbFill) {
    let rgb = [255, 100, 121];
    if (rgbFill && rgbFill.length >= 3) rgb = rgbFill;

    if (timeoutMS > 0) setTimeout(this.drawPath.bind(this), timeoutMS, i, j, ...rgb);
    else this.drawPath(i, j, ...rgb);

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
    this.lastAgentSpot = this.grid.drawAgent();
    this.grid.drawTarget();
  }

  endSearch(gapMS) {
    setTimeout(this.drawPathTimeout.bind(this), this.searchTimeout + gapMS);
  }

  drawPathTimeout() {
    const path = this.findPath(this.cameFrom);

    const stepSize = 100;
    const costStep = 115;
    let costStepMSAcc = 0;

    path.reverse().forEach(([i, j], index) => {
      const isLast = index + 1 === path.length;
      costStepMSAcc += costStep * this.grid.info[j][i];
      setTimeout(
        this.drawAgentToTargetSpot.bind(this),
        this.lastTimeout * this.countCells + stepSize * index,
        i,
        j,
        costStepMSAcc,
        isLast
      );
    });
  }

  restartDraw() {
    clear();
    this.grid.remakeVectors();
    loop();
  }

  async drawAgentToTargetSpot(i, j, costStepMSAcc, isLast) {
    await sleep(costStepMSAcc).then(() => {
      const { x, y } = this.grid.gridToCanvas(this.grid.agent.x, this.grid.agent.y);
      this.lastAgentSpot.fill(100, 100, 0);
      this.lastAgentSpot.circle(x, y, (3 * height) / (4 * rows));

      this.grid.agent = createVector(j, i);
      this.lastAgentSpot = this.grid.drawAgent();

      if (isLast) {
        targetCollected += 1;

        setTimeout(this.restartDraw.bind(this), this.defaultTimeout);
      }
    });
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

    this.drawPath(agentCell[0], agentCell[1]);
    path.push(agentCell);

    while (true) {
      currCell = cameFrom[currCell];
      if (currCell[0] === agentCell[0] && currCell[1] === agentCell[1]) break;
      path.push(currCell);
      this.countCells += 1;
      this.drawFrontierOrPath(currCell[0], currCell[1], this.lastTimeout * this.countCells, 0, 0, 80);
    }

    this.grid.drawTarget();
    this.grid.drawAgent();

    return path;
  }

  getCellsProps(i, j) {
    const cellX = j * this.grid.cellWidth;
    const cellY = i * this.grid.cellHeight;

    return [cellX, cellY, this.grid.cellWidth, this.grid.cellHeight];
  }

  drawPath(i, j, ...fillRgb) {
    if (fillRgb && fillRgb.length >= 3) fill(...fillRgb);
    else fill(0, 0, 80);

    rect(...this.getCellsProps(i, j));
  }
}
