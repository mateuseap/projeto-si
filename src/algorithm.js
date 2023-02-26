class Algorithm {
  constructor(grid) {
    this.grid = grid;
    this.bfs = new BFS(grid);
    this.dfs = new DFS(grid);
    this.algos = {
      1: () => this.bfs.bfs(),
      2: () => this.dfs.dfs(),
    };
  }

  drawSearch(state) {
    noLoop();
    this.grid.drawGrid();

    while (true) {
      try {
        this.grid.drawAgent();
        this.grid.drawTarget();

        const [result, frontierResult] = this.algos[state]();
        const gapMS = 500;

        const incrementTimeout = 10;
        const cameFromArr = Object.entries(result);
        searchTimeout += incrementTimeout * cameFromArr.length;

        cameFromArr.map(([_key, currCell], index) => {
          setTimeout(
            this.drawPath.bind(this),
            defaultTimeout + incrementTimeout * index,
            currCell[0],
            currCell[1],
            255,
            255,
            255
          );
        });

        setTimeout(() => {
          const path = this.findPath(result);
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

  findPath(cameFrom) {
    const path = [];
    const agentCell = [this.grid.agent.y, this.grid.agent.x];
    const targetCell = [this.grid.target.y, this.grid.target.x];
    const timeout = 100;
    searchTimeout += timeout;

    let countCells = 0;
    let currCell = targetCell;

    this.drawPath(targetCell[0], targetCell[1]);
    path.push(targetCell);

    this.drawPath(agentCell[0], agentCell[1]);
    path.push(agentCell);

    while (true) {
      currCell = cameFrom[currCell];
      if (currCell[0] === agentCell[0] && currCell[1] === agentCell[1]) break;
      path.push(currCell);
      countCells += 1;
      setTimeout(
        this.drawPath.bind(this),
        timeout * countCells,
        currCell[0],
        currCell[1]
      );
    }

    grid.drawTarget();
    grid.drawAgent();

    return path;
  }

  drawPath(i, j, ...fillRgb) {
    if (fillRgb && fillRgb.length === 3) fill(...fillRgb);
    else fill(0, 0, 80);

    const cellX = j * this.grid.cellWidth;
    const cellY = i * this.grid.cellHeight;

    rect(...this.getCellsProps(i, j));
  }

  getCellsProps(i, j) {
    const cellX = j * this.grid.cellWidth;
    const cellY = i * this.grid.cellHeight;

    return [cellX, cellY, this.grid.cellWidth, this.grid.cellHeight];
  }
}
