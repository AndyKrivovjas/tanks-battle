class Gun extends Weapon {
  length: number = 20;
  thikness: number = 6;

  constructor(parent: Tank) {
    super(parent);

    this.x = - this.thikness / 4 + 0.5;
    this.body = Bodies.rectangle(this.x, this.y, this.thikness, this.length, this.options);
    this.body.angle = - PI / 2;
  }

  show() {
    rotate(this.body.angle);
    rect(this.body.position.x, this.body.position.y, this.thikness, this.length);
  }
}
