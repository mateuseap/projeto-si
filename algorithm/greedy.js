class Greedy extends Algorithm {
  constructor(grid) {
    super(grid);
    this.frontier = new PriorityQueue();
    this.frontier.enqueue([this.grid.agent.y, this.grid.agent.x, 0]);
  }

  greedy(gap) {
    let [oldi, oldj] = [-1, -1];
    let [curri, currj] = [-1, -1];

    while (!this.frontier.isEmpty()) {
      [oldi, oldj] = [curri, currj];
      [curri, currj] = this.frontier.dequeue();

      const neighbors = this.adjacentCells(curri, currj);

      this.searchTimeout += gap;
      this.drawFrontierOrPath(curri, currj, this.searchTimeout);

      if (oldi != -1 && oldj != -1) {
        this.searchTimeout += gap;
        this.drawFrontierOrPath(oldi, oldj, this.searchTimeout, false, 255, 255, 255);
      }

      if (oldi === this.grid.target.y && oldj === this.grid.target.x) break;

      neighbors.forEach(neigh => {
        const neighi = neigh[0];
        const neighj = neigh[1];

        const new_cost = heuristic(this.grid.target, { x: neighj, y: neighi });

        if (!this.visited[neighi][neighj] && this.grid.info[neighi][neighj] != 3) {
          this.visited[neighi][neighj] = true;
          this.frontier.enqueue([neighi, neighj, new_cost]);
          this.cameFrom[[neighi, neighj]] = [curri, currj];
          this.drawFrontierOrPath(neighi, neighj, this.searchTimeout);
        }
      });
    }
  }

  runSearch(gapMS = 500, incrementTimeout = 100) {
    this.startSearch();
    this.greedy(incrementTimeout);
    this.endSearch(gapMS);
  }
}
