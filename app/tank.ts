class Tank {

  x: number;
  y: number;

  angle: number = 0;
  velocity: number = 1.5;

  width: number = 20;

  state: any = {
    current: Cell,
    prev: Cell
  }

  blocked: boolean = false;

  constructor(x?:number, y?:number) {
    this.x = x;
    this.y = y;

    this.angle = random(0, 4 * PI)
  }

  spawn(col, row, cellWidth) {
    this.x = col * cellWidth + cellWidth / 2;
    this.y = row * cellWidth + cellWidth / 2;
  }

  spawnRandom(cols, rows, cellWidth) {
    var col = round(random(cols - 1));
    var row = round(random(rows - 1));

    this.x = col * cellWidth + cellWidth / 2;
    this.y = row * cellWidth + cellWidth / 2;
  }

  movement() {
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 0.1;
      this.blocked = false;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 0.1;
      this.blocked = false;
    }

    if (keyIsDown(UP_ARROW)) {
      var x = this.x + this.velocity * cos(this.angle);
      var y = this.y + this.velocity * sin(this.angle);

      if(!this.blocked && this.freeToGo(x, y)) {
        this.x = x;
        this.y = y;
      } else {
        this.blocked = true;
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.x -= this.velocity * cos(this.angle);
      this.y -= this.velocity * sin(this.angle);
    }

    this.preventOutOfField();

  }

  freeToGo(x, y) {
    this.state.prev = _.clone(this.state.current);
    this.state.current = game.maze.determineCell(x - this.width / 2, y  - this.width / 2);
    // console.log(this.state.current.column, this.state.current.row);
    var allow = true;

    if(this.state.current.id !== this.state.prev.id) {
      console.log(this.state.current.id,this.state.prev.id)

        console.log(this.state.prev.walls)

      if(this.state.current.column - this.state.prev.column === -1) {
        console.log('left');
        allow = !this.state.prev.walls['left'] || !this.state.current.walls['right'];
      } else if(this.state.current.column - this.state.prev.column === 1) {
        console.log('right');
        allow = !this.state.prev.walls['right'];
      }

      if(this.state.current.row - this.state.prev.row === -1) {
        console.log('top');
        allow = !this.state.prev.walls['top'];
      } else if(this.state.current.row - this.state.prev.row === 1) {
        console.log('bottom');
        allow = !this.state.prev.walls['bottom'];
      }
    }
    console.log(allow);
    return allow;
  }

  preventOutOfField() {
    if(this.x < this.width / 2) {
      this.x = this.width / 2;
    } else if(this.x > game.settings.canvasWidth - this.width / 2) {
      this.x = game.settings.canvasWidth - this.width / 2;
    }

    if(this.y < this.width / 2) {
      this.y = this.width / 2;
    } else if(this.y > game.settings.canvasHeight - this.width / 2) {
      this.y = game.settings.canvasHeight - this.width / 2;
    }
  }

  update() {
    this.movement();

    strokeWeight(1);
    fill(55, 211, 55);
    translate(this.x, this.y);
    rotate(this.angle);

    rect(-this.width / 2, -this.width / 2, this.width, this.width);
  }
}
