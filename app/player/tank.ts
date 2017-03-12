class Tank {

  body: Matter.Body;
  weapon: Weapon;
  direction: Matter.Vector;

  velocity: number = 0.002;
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
      frictionAir: 1,
      restitution: 0
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

  movementListener() {
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

  pointerVectorListener() {
    var x = this.velocity * cos(this.body.angle);
    var y = this.velocity * sin(this.body.angle);
    var nextMove = Vector.create(x, y);

    this.direction = this.getPointerVector(nextMove);
    this.drawMovmentVector(nextMove, 40);
  }

  update() {
    this.movementListener();
    this.pointerVectorListener();
  }

  show() {
    this.update();

    push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);

      strokeWeight(1);
      fill(55, 211, 55);
      rect(0, 0, this.width, this.width);
    pop();

    this.weapon.show();
  }

  drawMovmentVector(next, multiplier) {
    push();
      stroke(255, 0, 0);
      strokeWeight(1);
      var pV = this.getPointerVector(next, multiplier);
      line(this.body.position.x, this.body.position.y, pV.x, pV.y)
    pop();
  }

  getPointerVector(pV: Matter.Vector, multiplier?: number) {
    pV = Vector.clone(pV);
    pV = Vector.normalise(pV);
    if(multiplier) {
      pV = Vector.mult(pV, multiplier);
    }
    pV = Vector.add(pV, this.body.position);

    return pV;
  }
}

function keyPressed() {
  if (keyCode === 32) {
    game.player.weapon.fire();
  }
}
