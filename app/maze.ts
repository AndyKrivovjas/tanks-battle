class Cell {

  column: number;
  row: number;
  walls: any = {
    top: true,
    bottom: true,
    right: true,
    left: false
  }
  visited: boolean = false;

  cellColor: number = 0;
  cellWidth: number;

  constructor(i, j, w) {
    this.column = i;
    this.row = j;
    this.cellWidth = w;
  }

  isVisited() {
    return this.visited;
  }

  markVisited() {
    this.visited = true;
  }

  index(i, j, cols, rows) {
    var ii = (this.column + i);
    var jj = (this.row + j);
    if(ii < 0 || jj < 0 || ii > cols - 1 || jj > rows - 1) {
      return -1;
    }

    return (this.column + i) + (this.row + j) * cols;
  }

  checkNeighbors(cols, rows, grid) {
    var neighbors = [];

    var top = grid[this.index(0, -1, cols, rows)];
    var right = grid[this.index(1, 0, cols, rows)];
    var bottom = grid[this.index(0, 1, cols, rows)];
    var left = grid[this.index(-1, 0, cols, rows)];

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

    stroke(this.cellColor);
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

    if(this.visited) {
      fill(61, 127, 226);
      rect(x, y, this.cellWidth, this.cellWidth);
    }

  }

}

class Maze {

  cols: number;
  rows: number;
  cellWidth: number = 50;
  grid: any[] = [];
  currentCell: Cell;

  constructor(c:number, r:number, cw?:number) {
    this.cols =c;
    this.rows = r;
    this.cellWidth = cw || 50;
  }

  init() {
    for(let j = 0; j < this.rows; j++) {
      for(let i = 0; i < this.cols; i++) {
        var cell = new Cell(i, j, this.cellWidth);
        this.grid.push(cell);
      }
    }

    this.currentCell = this.grid[Math.round(random(this.grid.length))];
  }

  render() {

    for(let item of this.grid) {
      item.show();
    }

    this.currentCell.markVisited();
    var nextCell = this.currentCell.checkNeighbors(this.cols, this.rows, this.grid);
    if(nextCell) {
      nextCell.markVisited();
      this.currentCell = nextCell;
    }
  }

}
