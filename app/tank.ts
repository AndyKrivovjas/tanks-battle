class Tank {

  body: Matter.Composite;
  base: any;
  pos: any = {
    x: 0,
    y: 0
  }

  angle: number = 0;
  velocity: number = 1.5;

  width: number = 20;

  constructor(x?:number, y?:number) {

    this.body = Matter.Composite.create();
    World.add(engine.world, this.body);

    this.pos = createVector(x, y);
    this.angle = random(0, 4 * PI)
  }

  spawn(col, row, cellWidth) {
    var x = col * cellWidth + cellWidth / 2;
    var y = row * cellWidth + cellWidth / 2;

    this.createBody(x, y);

    this.pos = createVector(x, y);
  }

  spawnRandom(cols, rows, cellWidth) {
    var col = round(random(0, cols - 1));
    var row = round(random(0, rows - 1));

    var x = col * cellWidth + cellWidth / 2;
    var y = row * cellWidth + cellWidth / 2;

    this.createBody(x, y);

    this.pos = createVector(x, y);
  }

  createBody(x: number, y: number) {
    this.base = Bodies.rectangle(x, y, this.width, this.width);
    Matter.Composite.add(this.body, this.base);
  }

  movement() {
    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 0.1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 0.1;
    }

    if (keyIsDown(UP_ARROW)) {
      var x = this.pos.x + this.velocity * cos(this.angle);
      var y = this.pos.y + this.velocity * sin(this.angle);
      var nextMove = createVector(x, y);

      this.pos = nextMove;
    }

    if (keyIsDown(DOWN_ARROW)) {
      var x:any = this.pos.x - this.velocity * cos(this.angle);
      var y:any = this.pos.y - this.velocity * sin(this.angle);
      var nextMove = createVector(x, y);

      this.pos = nextMove;

    }

  }


  update() {
    this.movement();

    strokeWeight(1);
    fill(55, 211, 55);
    translate(this.base.position.x, this.base.position.y);
    rotate(this.base.angle);

    rect(-this.width / 2, -this.width / 2, this.width, this.width);
  }
}
