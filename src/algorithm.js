class Algorithm {
  constructor(grid){
    this.grid = grid;
    this.bfs = new BFS(grid);
  }
  
  drawBFS() {
    noLoop();
    this.grid.drawGrid();

    while (true) {
      try {

        this.grid.drawAgent();
        this.grid.drawTarget();
        
        const bfsResult = this.bfs.bfs();
        const gapMS = 500;
        
        const incrementTimeout = 10;
        const cameFromArr = Object.entries(bfsResult);
        searchTimeout += incrementTimeout * cameFromArr.length;
        
       
        cameFromArr.map(([_key, currCell], index) => {
          setTimeout(this.drawPath, defaultTimeout + incrementTimeout * index, currCell[0], currCell[1], this, 255, 255, 255);
        });
        
        setTimeout(() => {
          const path = this.findPath(bfsResult);
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

    this.drawPath(targetCell[0], targetCell[1], this);
    path.push(targetCell);

    this.drawPath(agentCell[0], agentCell[1], this);
    path.push(agentCell);

    while (true) {
      currCell = cameFrom[currCell];
      if (currCell[0] === agentCell[0] && currCell[1] === agentCell[1]) break;
      path.push(currCell);
      countCells += 1;
      setTimeout(this.drawPath, timeout * countCells, currCell[0], currCell[1], this);
    }

    grid.drawTarget();
    grid.drawAgent();

    return path;
  }
  
  drawPath(i, j, self, ...fillRgb) {
    if (fillRgb && fillRgb.length === 3) fill(...fillRgb);
    else fill(0, 0, 80);
    
    const cellX = j * self.grid.cellWidth;
    const cellY = i * self.grid.cellHeight;
    
    
    rect(...self.getCellsProps(i, j));
  }
  
  getCellsProps(i, j) {
    const cellX = j * this.grid.cellWidth;
    const cellY = i * this.grid.cellHeight;

    return [cellX, cellY, this.grid.cellWidth, this.grid.cellHeight];
  }
  
}