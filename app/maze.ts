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
      var nextCell = this.currentCell.checkNeighbors(this.cols, this.rows, this.grid);
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

  render() {

    for(let item of this.grid) {
      item.show();
    }

  }

}
