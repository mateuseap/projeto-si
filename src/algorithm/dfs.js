class DFS extends Algorithm {
  constructor(grid) {
    super(grid);
  }

  dfs() {
    while (this.frontier.length) {
      const [curri, currj] = this.frontier.pop();

      const neighbors = this.adjacentCells(curri, currj);

      if (curri === this.grid.target.y && currj === this.grid.target.x) break;

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

        const cameFromArr = Object.entries(this.cameFrom);
        this.searchTimeout += incrementTimeout * cameFromArr.length;

        cameFromArr.forEach(([_key, currCell], index) => {
          this.drawFrontierOrPath(currCell[0], currCell[1], this.defaultTimeout + incrementTimeout * index);
        });

        this.endSearch(gapMS);

        break;
      } catch (error) {
        console.error(error);
      }
    }
  }
}
