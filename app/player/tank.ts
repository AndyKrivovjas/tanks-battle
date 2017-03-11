class Tank {

  body: Matter.Body;
  weapon: Weapon;

  velocity: number = 0.001;
  width: number = 20;

  constructor(x?:number, y?:number) {

    this.createBody(x, y);
  }

  spawn(col, row, cellWidth) {
    var x = col * cellWidth + cellWidth / 2;
    var y = row * cellWidth + cellWidth / 2;

    this.createBody(x, y);
  }

  spawnRandom(cols, rows, cellWidth) {
    var col = round(random(0, cols - 1));
    var row = round(random(0, rows - 1));

    var x = col * cellWidth + cellWidth / 2;
    var y = row * cellWidth + cellWidth / 2;

    this.createBody(x, y);
  }

  createBody(x: number, y: number) {
    // setting how fast a force will slow down
    var options = {
      friction: 1,
      frictionAir: 1
    }

    // creating body
    this.body = Bodies.rectangle(x, y, this.width, this.width, options);

    // setting a random for spawn
    this.body.angle = random(0, 2 * PI);

    // finally, adding to the world
    World.add(engine.world, this.body);

    // add the Weapon
    this.weapon = new game.settings.defaultWeapon(this);
    this.weapon.setDefault(true);
  }

  setWeapon() {

  }

  movement() {
    if (keyIsDown(LEFT_ARROW)) {
      this.body.angle -= 0.1;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.body.angle += 0.1;
    }

    if (keyIsDown(UP_ARROW)) {
      var x = this.velocity * cos(this.body.angle);
      var y = this.velocity * sin(this.body.angle);
      var nextMove = Vector.create(x, y);

      Matter.Body.applyForce(this.body, this.body.position, nextMove);
    }

    if (keyIsDown(DOWN_ARROW)) {
      var x = this.velocity * cos(this.body.angle);
      var y = this.velocity * sin(this.body.angle);
      var nextMove = Vector.mult(Vector.create(x, y), -1); // for inverse

      Matter.Body.applyForce(this.body, this.body.position, nextMove);
    }

  }


  update() {
    this.movement();

    strokeWeight(1);
    fill(55, 211, 55);
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);

    rect(0, 0, this.width, this.width);

    this.weapon.show();
  }
}
