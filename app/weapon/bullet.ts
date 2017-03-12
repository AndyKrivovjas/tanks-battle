class Bullet {
  body: Matter.Body;
  radius: number = 5;
  lifetime: number = 15;
  velocity: number = 0.001;

  constructor(x: number, y: number, r?: number) {
    this.radius = r || this.radius;

    var options = {
      friction: 1,
      frictionAir: 1,
      restitution: 1,
      label: 'bullet'
    }

    this.body = Bodies.circle(x, y, this.radius, options);
    World.add(engine.world, this.body);
  }

  setAngle(angle: number) {
    this.body.angle = angle;
  }

  update() {
    var x = this.velocity * cos(this.body.angle);
    var y = this.velocity * sin(this.body.angle);
    var nextMove = Vector.create(x, y);

    Matter.Body.applyForce(this.body, this.body.position, nextMove);
  }

  show() {
    this.update();

    push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);

      strokeWeight(1);
      fill(0);
      ellipse(0, 0, this.radius * 2, this.radius * 2);
    pop();
  }
}
