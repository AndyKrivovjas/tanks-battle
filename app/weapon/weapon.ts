class Weapon {
  parent: Tank;
  shotsMax: number = 1;
  fired: Bullet[] = [];
  isDefault: boolean = false;

  constructor(parent: Tank) {
    this.parent = parent;
  }

  setDefault(flag: boolean) {
    this.isDefault = flag;
  }

  fire() {

  }

  update() {

  }

  show() {

  }
}
