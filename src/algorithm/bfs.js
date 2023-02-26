class BFS extends Algorithm {
  constructor(grid) {
    super(grid);
  }

  bfs() {
    while (this.frontier.length) {
      const [curri, currj] = this.frontier.pop();

      const neighbors = this.adjacentCells(curri, currj);

      this.drawFrontierOrPath(curri, currj, this.searchTimeout);

      if (curri === this.grid.target.y && currj === this.grid.target.x) break;

      neighbors.forEach(neigh => {
        const neighi = neigh[0];
        const neighj = neigh[1];

        if (!this.visited[neighi][neighj] && this.grid.info[neighi][neighj] != 3) {
          this.visited[neighi][neighj] = true;
          this.frontier.unshift([neighi, neighj]);
          this.cameFrom[[neighi, neighj]] = [curri, currj];
        }
      });
    }
  }

  runSearch(gapMS = 500, incrementTimeout = 10) {
    while (true) {
      try {
        this.startSearch();
        this.bfs();
        this.endSearch(gapMS);

        break;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
