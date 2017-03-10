class Maze {

  cols: number;
  rows: number;
  cellWidth: number = 50;
  grid: any[] = [];
  stack: any[] = [];
  lines: any[] = [];
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

    this.currentCell = this.grid[Math.round(random(0, this.grid.length))];

    this.generate();
    this.addBodies();
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

    this.grid.forEach(function(cell, key) {
    });
  }

  addBodies() {
    var lines = [];
    var bodies = [];

    var self = this;

    this.grid.forEach(function(cell) {

      Object.keys(cell.walls).forEach(function(key) {
        var x = cell.x;
        var y = cell.y;
        var w = 0;
        var h = 0;

        if(['top', 'right'].indexOf(key) != -1 && cell.walls[key] === true) {

          if(key == 'top') {
            h = game.settings.strokeWeightMaze;
            w = cell.cellWidth;
            x += cell.cellWidth / 2;
          }
          if(key == 'right') {
            x += cell.cellWidth;
            w = game.settings.strokeWeightMaze;
            h = cell.cellWidth;
            y += cell.cellWidth / 2;
          }

          var line = {
            body: Bodies.rectangle(x, y, w, h, {
              isStatic: true
            }),
            width: w,
            height: h
          };

          bodies.push(line.body);
          lines.push(line);
        }

      });

    });

    for(let i = 0; i < (self.cols * self.cellWidth); i+=self.cellWidth) {
      var w = self.cellWidth;
      var h = game.settings.strokeWeightMaze;
      var x = i + self.cellWidth / 2;
      var y = self.rows * self.cellWidth;
      var line = {
        body: Bodies.rectangle(x, y, w, h, {
          isStatic: true
        }),
        width: w,
        height: h
      };

      bodies.push(line.body);
      lines.push(line);
    }

    for(let i = 0; i < (self.rows * self.cellWidth); i+=self.cellWidth) {
      var w:number = game.settings.strokeWeightMaze;
      var h:any = self.cellWidth;
      var y = i + self.cellWidth / 2;
      var x = 0;
      var line = {
        body: Bodies.rectangle(x, y, w, h, {
          isStatic: true
        }),
        width: w,
        height: h
      };

      bodies.push(line.body);
      lines.push(line);
    }

    this.lines = lines;
    World.add(engine.world, bodies);
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
      // item.show();
    }

    this.lines.forEach(function(line) {
      push();
      stroke(0);
      fill(255);
      rect(line.body.position.x, line.body.position.y, line.width, line.height);
      pop();
    });

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
