class Tank {

  x: number;
  y: number;

  angle: number = 0;
  velocity: number = 1;

  width: number = 20;

  constructor(x?:number, y?:number) {
    this.x = x;
    this.y = y;
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
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 0.1;
    }

    if (keyIsDown(UP_ARROW)) {
      this.x += this.velocity * cos(this.angle);
      this.y += this.velocity * sin(this.angle);

    }

    if (keyIsDown(DOWN_ARROW)) {

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
