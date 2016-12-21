class Maze {

  cols: number;
  rows: number;
  cellWidth: number = 50;
  grid: any[] = [];
  stack: any[] = [];
  currentCell: Cell;

  constructor(c:number, r:number, cw?:number) {
    this.cols =c;
    this.rows = r;
    this.cellWidth = cw || 50;

    this.init();
  }

  init() {
    for(let j = 0; j < this.rows; j++) {
      for(let i = 0; i < this.cols; i++) {
        var cell = new Cell(i, j, this.cellWidth);
        this.grid.push(cell);
      }
    }

    this.currentCell = this.grid[Math.round(random(this.grid.length))];

    this.generate();

  }

  generate() {
    do {
      this.currentCell.markVisited();
      var nextCell = this.currentCell.checkNeighbors(this.grid);
      if(nextCell) {
        nextCell.markVisited();
        this.stack.push(this.currentCell);
        this.removeWalls(this.currentCell, nextCell);
        this.currentCell = nextCell;
      } else if(this.stack.length) {
        this.currentCell = this.stack.pop();
      }
    } while(this.stack.length > 0);
  }

  removeWalls(current, next) {
    var x = current.column - next.column;
    if(x === 1) {
      current.setWall('left', false);
      next.setWall('right', false);
    } else if (x === -1) {
      current.setWall('right', false);
      next.setWall('left', false);
    }

    var y = current.row - next.row;
    if(y === 1) {
      current.setWall('top', false);
      next.setWall('bottom', false);
    } else if (y === -1) {
      current.setWall('bottom', false);
      next.setWall('top', false);
    }
  }

  getWalls() {
    var walls = [];
    for(let item of this.grid) {

      var points = {
        top_left: createVector(item.column * item.cellWidth, item.row * item.cellWidth),
        top_right: createVector((item.column + 1) * item.cellWidth, item.row * item.cellWidth),
        bottom_left: createVector(item.column * item.cellWidth, (item.row + 1) * item.cellWidth),
        bottom_right: createVector((item.column + 1) * item.cellWidth, (item.row + 1) * item.cellWidth)
      }

      if(item.walls.top) {
        walls.push([points.top_left, points.top_right]);
      }
      if(item.walls.bottom) {
        walls.push([points.bottom_left, points.bottom_right]);
      }
      if(item.walls.right) {
        walls.push([points.top_right, points.bottom_right]);
      }
      if(item.walls.left) {
        walls.push([points.top_left, points.bottom_left]);
      }
    }

    return walls;
  }

  render() {

    for(let item of this.grid) {
      item.show();
    }

  }

  //return cell by column and row number
  index(i, j) {
    return i + j * this.cols;
  }

  determineCell(x, y) {
    var col = floor(x / this.cellWidth);
    var row = floor(y / this.cellWidth);

    return this.grid[this.index(col, row)];
  }

}
