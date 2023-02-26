class Grid {
  constructor(rows, columns, terrains) {
    this.info = new Array(rows);
    this.terrains = terrains;
    this.rows = rows;
    this.columns = columns;
    this.cellWidth = width / this.columns;
    this.cellHeight = height / this.rows;

    for (let i = 0; i < this.rows; i++) {
      this.info[i] = new Array(columns);
      for (let j = 0; j < this.columns; j++) {
        // ramdomiza um dos 4 terrenos
        let terrain = floor(random(0, 4));

        // guarda o terreno no grid
        this.info[i][j] = terrain;
      }
    }

    this.agent = this.createRandomVector();
    this.target = this.createRandomVector();
  }

  drawAgent(i, j) {
    fill(255, 0, 0);
    const { x, y } = this.gridToCanvas(i || this.agent.x, j || this.agent.y);
    circle(x, y, (3 * height) / (4 * rows));
  }

  drawTarget(i, j) {
    fill('#ff8c00');
    const { x, y } = this.gridToCanvas(i || this.target.x, j || this.target.y);
    this.star(x, y, 6, 12, 5);
  }

  gridToCanvas(x, y) {
    // calcular o pixel certo da célula correspondente no canvas
    x = this.cellWidth * (x + 0.5);
    y = this.cellHeight * (y + 0.5);

    return { x, y };
  }

  star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  remakeVectors() {
    this.agent = this.createRandomVector();
    this.target = this.createRandomVector();
  }

  drawGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const cellX = j * this.cellWidth;
        const cellY = i * this.cellHeight;
        // desenha
        stroke(0);
        fill(this.terrains[this.info[i][j]]);
        rect(cellX, cellY, this.cellWidth, this.cellHeight);
      }
    }

    return this.info;
  }

  createRandomVector() {
    let x, y;

    do {
      x = floor(random(0, columns));
      y = floor(random(0, rows));
    } while (this.info[y][x] === 3); // se gerar em um obstaculo, regera

    return createVector(x, y);
  }
}
