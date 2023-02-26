class BFS {
  constructor(grid){
    this.grid = grid;
    this.cameFrom = { [[this.grid.agent.y, this.grid.agent.x]]: undefined };
    this.frontierResult = [];
  }
  
  bfs() {
    // start position
    const frontier = [[this.grid.agent.y, this.grid.agent.x]]; //unshift() e pop() para utilizar como fila
    this.frontierResult = [...frontier];
  
    const visited = Array(this.grid.rows)
      .fill()
      .map(() => Array(this.grid.columns).fill(false));
  
    while (frontier.length) {
      const [curri, currj] = frontier.pop();
      
      const neighbors = this.adjacentCells(curri, currj);
      
      if (curri === this.grid.target.y && currj === this.grid.target.x) break;
      
      
      neighbors.forEach(neigh => {
        let neighi = neigh[0];
        let neighj = neigh[1];
        if (!visited[neighi][neighj] && this.grid.info[neighi][neighj] != 3) {
          visited[neighi][neighj] = true;
          frontier.unshift([neighi, neighj]);
          this.frontierResult.unshift([neighi, neighj]);
          this.cameFrom[[neighi, neighj]] = [curri, currj];
        }
      });
    }
    
    return [this.cameFrom, this.frontierResult];
  }
  
  adjacentCells(i, j) {
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

      if (adjI >= 0 && adjI < this.grid.rows && adjJ >= 0 && adjJ < this.grid.columns) {
        //chechar se ta dentro do grid
        ans.push([adjI, adjJ]);
      }
    });

    return ans;
  }
  
}