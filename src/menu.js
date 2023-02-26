class Menu {
    constructor(terrains) {
      this.terrains = terrains;
    }
  
    hoverEffect(x, y, width, height) {
      stroke(255, 255, 255);
      strokeWeight(2);
      fill(255, 0, 0);
      rect(x, y, width, height, 5);
      fill(0);
    }
  
    drawMenuGrid() {
      const cellWidth = 18;
      const cellHeight = 18;
  
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cellX = j * cellWidth;
          const cellY = i * cellHeight;
  
          let terrain = floor(random(0, 4));
          fill(terrains[terrain]);
          rect(cellX + 312, cellY + 210, cellWidth, cellHeight);
        }
      }
    }
  
    mouseInArea(x, y, width, height) {
      return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
    }
  
    drawMenu() {
      stroke(1);
      frameRate(10);
      cursor(ARROW);
  
      fill(255, 255, 255);
      textSize(40);
      textAlign(CENTER);
      text("Welcome!", 400, 180);
  
      this.drawMenuGrid();
  
      fill(255, 255, 255);
      textSize(24);
      text("Choose the algorithm:", 400, 480);
  
      rect(230, 520, 100, 50, 5);
      rect(350, 520, 100, 50, 5);
      rect(470, 520, 100, 50, 5);
      rect(280, 590, 100, 50, 5);
      rect(400, 590, 100, 50, 5);
  
      fill(0);
      text("BFS", 280, 555);
      text("DFS", 400, 555);
      text("Greedy", 520, 555);
      text("A*", 330, 625);
  
      textSize(16);
      text("Uniform\nCost", 450, 612);
      textSize(24);
  
      if (this.mouseInArea(230, 520, 100, 50)) {
        this.hoverEffect(230, 520, 100, 50);
        text("BFS", 280, 555);
        cursor(HAND);
        if (mouseIsPressed) return 1;
        return 0;
      } else if (this.mouseInArea(350, 520, 100, 50)) {
        this.hoverEffect(350, 520, 100, 50);
        text("DFS", 400, 555);
        cursor(HAND);
        if (mouseIsPressed) return 2;
        return 0;
      } else if (this.mouseInArea(470, 520, 100, 50)) {
        this.hoverEffect(470, 520, 100, 50);
        text("Greedy", 520, 555);
        cursor(HAND);
        return 0;
      } else if (this.mouseInArea(280, 590, 100, 50)) {
        this.hoverEffect(280, 590, 100, 50);
        text("A*", 330, 625);
        cursor(HAND);
        return 0;
      } else if (this.mouseInArea(400, 590, 100, 50)) {
        this.hoverEffect(400, 590, 100, 50);
        textSize(16);
        text("Uniform\nCost", 450, 612);
        cursor(HAND);
        return 0;
      }
      else{
        return 0;
      }
    }
  }
  