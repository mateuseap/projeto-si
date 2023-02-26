class DFS extends Algorithm {
  constructor(grid) {
    super(grid);
  }

  dfs() {
    let [oldi, oldj] = [-1, -1];
    let [curri, currj] = [-1, -1];
    while (this.frontier.length) {
      [oldi, oldj] = [curri, currj];
      [curri, currj] = this.frontier.pop();

      this.drawFrontierOrPath(curri, currj, this.searchTimeout);
      if (oldi != -1 && oldj != -1) {
        this.drawFrontierOrPath(oldi, oldj, this.searchTimeout, 255, 255, 255);
      }

      const neighbors = this.adjacentCells(curri, currj);

      neighbors.forEach(neigh => {
        const neighi = neigh[0];
        const neighj = neigh[1];

        if (!this.visited[neighi][neighj] && this.grid.info[neighi][neighj] != 3) {
          this.visited[neighi][neighj] = true;
          this.frontier.push([neighi, neighj]);
          this.cameFrom[[neighi, neighj]] = [curri, currj];
        }
      });
    }
  }

  runSearch(gapMS = 500, incrementTimeout = 10) {
    while (true) {
      try {
        this.startSearch();
        this.dfs();
        this.endSearch(gapMS);

        break;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
