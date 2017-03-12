class Gun extends Weapon {
  bulletRadius: number = 5;

  constructor(parent: Tank) {
    super(parent);
  }

  fire() {
    var distance = this.parent.width / 2 + this.bulletRadius * 1.5;
    var x = distance * cos(this.parent.body.angle);
    var y = distance * sin(this.parent.body.angle);

    var pV = Vector.add(this.parent.body.position, Vector.create(x, y));

    var bullet = new Bullet(pV.x, pV.y, this.bulletRadius);
    bullet.setAngle(this.parent.body.angle);

    this.fired.push(bullet);
  }

  update() {

  }

  show() {
    this.update();
    this.fired.forEach(function(shot) {
      shot.show();
    });
  }
}
