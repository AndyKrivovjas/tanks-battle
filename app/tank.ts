class Tank {

  pos: any = {
    x: 0,
    y: 0
  }

  angle: number = 0;

  velocity: number = 1.5;

  width: number = 20;
  radius: number;

  cell: any = {
    current: Cell,
    prev: Cell
  }

  blocked: boolean = false;

  constructor(x?:number, y?:number) {
    this.pos = createVector(x, y);

    this.angle = random(0, 4 * PI)
    this.radius = sqrt(pow(this.width, 2) * 2);
  }

  spawn(col, row, cellWidth) {
    var x = col * cellWidth + cellWidth / 2;
    var y = row * cellWidth + cellWidth / 2;

    this.pos = createVector(x, y);
  }

  spawnRandom(cols, rows, cellWidth) {
    var col = round(random(cols - 1));
    var row = round(random(rows - 1));

    var x = col * cellWidth + cellWidth / 2;
    var y = row * cellWidth + cellWidth / 2;

    this.pos = createVector(x, y);
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
      var x = this.pos.x + this.velocity * cos(this.angle);
      var y = this.pos.y + this.velocity * sin(this.angle);
      var nextMove = createVector(x, y);

      this.drawMovmentVector(nextMove, 40);

      if(this.freeToGo(x, y)) {
        this.pos = nextMove;
      } else {
        this.blocked = true;
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.pos.x -= this.velocity * cos(this.angle);
      this.pos.y -= this.velocity * sin(this.angle);
    }

    this.preventOutOfField();

  }

  drawMovmentVector(next, multiplier) {
    push();
    stroke(255, 0, 0);
    strokeWeight(1);
    var pV = this.getPointerVector(next, multiplier);
    line(this.pos.x, this.pos.y, pV.x, pV.y)
    pop();
  }

  getPointerVector(pV, multiplier) {
    pV = pV.copy();
    pV.sub(this.pos);
    pV.normalize();
    if(multiplier) {
      pV.mult(multiplier);
    }
    pV.add(this.pos);

    return pV;
  }

  freeToGo(x, y) {
    this.cell.prev = _.clone(this.cell.current);
    this.cell.current = game.maze.determineCell(x, y);
    // console.log(this.cell.current.column, this.cell.current.row);
    var allow = true;

    if(this.cell.current.id !== this.cell.prev.id) {
      console.log(this.cell.current.id,this.cell.prev.id)

        console.log(this.cell.prev.walls)

      if(this.cell.current.column - this.cell.prev.column === -1) {
        console.log('left');
        allow = !this.cell.prev.walls['left'] || !this.cell.current.walls['right'];
      } else if(this.cell.current.column - this.cell.prev.column === 1) {
        console.log('right');
        allow = !this.cell.prev.walls['right'];
      }

      if(this.cell.current.row - this.cell.prev.row === -1) {
        console.log('top');
        allow = !this.cell.prev.walls['top'];
      } else if(this.cell.current.row - this.cell.prev.row === 1) {
        console.log('bottom');
        allow = !this.cell.prev.walls['bottom'];
      }
    }
    console.log(allow);
    return allow;
  }

  preventOutOfField() {
    if(this.pos.x < this.width / 2) {
      this.pos.x = this.width / 2;
    } else if(this.pos.x > game.settings.canvasWidth - this.width / 2) {
      this.pos.x = game.settings.canvasWidth - this.width / 2;
    }

    if(this.pos.y < this.width / 2) {
      this.pos.y = this.width / 2;
    } else if(this.pos.y > game.settings.canvasHeight - this.width / 2) {
      this.pos.y = game.settings.canvasHeight - this.width / 2;
    }
  }

  update() {
    this.movement();

    strokeWeight(1);
    fill(55, 211, 55);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);

    rect(-this.width / 2, -this.width / 2, this.width, this.width);
  }
}
