class Cell {

  id: string;
  column: number;
  row: number;
  x: number;
  y: number;
  walls: any = {
    top: true,
    bottom: true,
    right: true,
    left: false
  };
  points: any = {};
  visited: boolean = false;

  strokeColor: number = game.settings.strokeColorMaze;
  cellWidth: number;

  constructor(i, j, w) {
    this.column = i;
    this.row = j;
    this.cellWidth = w;

    this.x = i * w;
    this.y = j * w;

    this.id = "#" + i + j;

    this.points = {
      top_left: createVector(this.column * this.cellWidth, this.row * this.cellWidth),
      top_right: createVector((this.column + 1) * this.cellWidth, this.row * this.cellWidth),
      bottom_left: createVector(this.column * this.cellWidth, (this.row + 1) * this.cellWidth),
      bottom_right: createVector((this.column + 1) * this.cellWidth, (this.row + 1) * this.cellWidth)
    }
  }

  isVisited() {
    return this.visited;
  }

  markVisited() {
    this.visited = true;
  }

  setWall(key:string, value:boolean) {
    this.walls[key] = value;
  }

  //checking if cell exist end returns index
  checkAndReturn(i, j) {
    var ii = (this.column + i);
    var jj = (this.row + j);
    if(ii < 0 || jj < 0 || ii > game.settings.cols - 1 || jj > game.settings.rows - 1) {
      return -1;
    }

    return (this.column + i) + (this.row + j) * game.settings.cols;
  }

  checkNeighbors(grid) {
    var neighbors = [];

    var top = grid[this.checkAndReturn(0, -1)];
    var right = grid[this.checkAndReturn(1, 0,)];
    var bottom = grid[this.checkAndReturn(0, 1)];
    var left = grid[this.checkAndReturn(-1, 0)];

    if(top && !top.visited) {
      neighbors.push(top);
    }

    if(bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    if(right && !right.visited) {
      neighbors.push(right);
    }

    if(left && !left.visited) {
      neighbors.push(left);
    }

    if(neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return false;
    }

  }

  drawLeft(x, y) {
    line(x, y + this.cellWidth, x, y);
  }

  drawRight(x, y) {
    line(x + this.cellWidth, y, x + this.cellWidth, y + this.cellWidth);
  }

  drawTop(x, y) {
    line(x, y, x + this.cellWidth, y);
  }

  drawBottom(x, y) {
    line(x + this.cellWidth, y + this.cellWidth, x, y + this.cellWidth);
  }

  show() {
    var x = this.column * this.cellWidth;
    var y = this.row * this.cellWidth;

    //for debug purpose
    if(this.visited) {
      // noStroke();
      // fill(61, 127, 226);
      // rect(x + this.cellWidth / 4, y + this.cellWidth / 4, this.cellWidth / 2, this.cellWidth / 2);
      // rect(x + 0.5, y + 0.5, this.cellWidth - 0.5, this.cellWidth - 0.5);
      // rect(x, y, this.cellWidth, this.cellWidth);
    }

    push();
    stroke(this.strokeColor);
    strokeWeight(game.settings.strokeWeightMaze);
    if(this.walls.top) {
      this.drawTop(x, y);
    }
    if(this.walls.bottom) {
      this.drawBottom(x, y);
    }
    if(this.walls.right) {
      this.drawRight(x, y);
    }
    if(this.walls.left) {
      this.drawLeft(x, y);
    }
    pop();

  }

}
