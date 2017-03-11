class Weapon {
  body: Matter.Body;
  x: number;
  y: number;
  options: any;
  parent: Tank;
  shots: number = 1;
  lifetime: number = 15;
  isDefault: boolean = false;

  constructor(parent: Tank) {
    this.x = parent.body.position.x;
    this.y = parent.width / 2;

    this.options = {
      friction: 1,
      frictionAir: 1
    }

    this.parent = parent;

    // World.add(engine.world, this.body);
  }

  setDefault(flag: boolean) {
    this.isDefault = flag;
  }

  update() {

  }

  show() {

  }
}
